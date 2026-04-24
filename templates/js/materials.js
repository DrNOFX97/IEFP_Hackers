        // ── MATERIALS (Firestore) ───────────────────────────────────────
        async function getMaterials(key) {
            if (materialsCache[key]) return materialsCache[key];
            try {
                const doc = await db.collection('materials').doc(key).get();
                const list = doc.exists ? (doc.data().items || []) : [];
                materialsCache[key] = list;
                return list;
            } catch(e) { return []; }
        }

        function getYouTubeId(url) {
            try {
                const u = new URL(url);
                if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
                if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
            } catch {}
            return null;
        }

        function renderMaterials(list) {
            const el = document.getElementById('session-materials-list');
            if (!el) return;
            if (!list || list.length === 0) {
                el.innerHTML = `<div class="no-materials">Sem materiais adicionados ainda.<br>Usa o formulário acima para adicionar links ou ficheiros.</div>`;
                return;
            }
            el.innerHTML = list.map((m, i) => {
                if (m.url && isSafeUrl(m.url) && (m.type === 'video' || getYouTubeId(m.url))) {
                    const safeLabel = escapeHtml(m.label || m.url);
                    const safeSize  = m.size ? escapeHtml(m.size) : '';
                    const ytId      = getYouTubeId(m.url);
                    const playerHtml = ytId
                        ? `<iframe src="https://www.youtube.com/embed/${escapeHtml(ytId)}"
                                   frameborder="0" allowfullscreen
                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                                   style="width:100%;aspect-ratio:16/9;display:block;"></iframe>`
                        : `<video controls preload="none" style="width:100%;max-height:360px;display:block;">
                               <source src="${escapeHtml(m.url)}" type="${m.url.endsWith('.webm') ? 'video/webm' : 'video/mp4'}">
                           </video>`;
                    return `
                        <div class="material-video-wrap">
                            <div class="material-video-header" data-action="toggle-video" data-idx="${i}">
                                <span class="material-icon">🎬</span>
                                <div class="material-info">
                                    <div class="material-label">${safeLabel}</div>
                                    ${safeSize ? `<div class="material-url">📎 ${safeSize}</div>` : ''}
                                </div>
                                <div class="material-video-actions">
                                    <button class="material-btn open" data-action="open-mat" data-mat="${i}" title="Abrir em separador">↗</button>
                                    <button class="material-btn delete" data-action="del-mat" data-mat="${i}" title="Remover">✕</button>
                                </div>
                                <span class="material-video-toggle">▶ ver</span>
                            </div>
                            <div class="material-video-player" id="video-player-${i}">${playerHtml}</div>
                        </div>`;
                }
                // PDF — thumbnail card that opens modal
                if (m.type === 'pdf' && m.url) {
                    const safeLabel = escapeHtml(m.label || 'documento.pdf');
                    const safeUrl   = escapeHtml(m.url);
                    return `
                        <div class="material-item pdf-thumb" data-action="open-pdf" data-pdf-url="${safeUrl}" data-pdf-label="${safeLabel}" title="Clica para visualizar">
                            <div class="pdf-thumb-preview">📄</div>
                            <div class="pdf-thumb-footer">
                                <div class="material-info">
                                    <div class="material-label">${safeLabel}</div>
                                    ${m.size ? `<div class="pdf-thumb-meta">PDF · ${escapeHtml(m.size)}</div>` : '<div class="pdf-thumb-meta">PDF</div>'}
                                </div>
                                <div class="material-actions">
                                    <button class="material-btn delete" data-action="del-mat" data-mat="${i}" title="Remover">✕</button>
                                </div>
                            </div>
                        </div>`;
                }
                // Other types — whole card is clickable if it has a URL
                const isUpload  = m.url && m.url.includes('firebasestorage');
                const clickable = m.url && isSafeUrl(m.url);
                const cardAttrs = clickable ? `data-action="open-mat" data-mat="${i}" role="link" tabindex="0"` : '';
                return `
                    <div class="material-item${clickable ? ' clickable-card' : ''}" ${cardAttrs}>
                        <span class="material-icon">${getTypeIcon(m.type)}</span>
                        <div class="material-info">
                            <div class="material-label">${escapeHtml(m.label || m.url)}</div>
                            ${!isUpload && m.url ? `<div class="material-url">${escapeHtml(m.url)}</div>` : ''}
                            ${m.size ? `<div class="material-url">📎 ${escapeHtml(m.size)}</div>` : ''}
                        </div>
                        <div class="material-actions">
                            ${clickable ? `<span class="material-btn open" aria-hidden="true">↗</span>` : ''}
                            <button class="material-btn delete" data-action="del-mat" data-mat="${i}" title="Remover">✕</button>
                        </div>
                    </div>`;
            }).join('');
            el.querySelectorAll('[data-action]').forEach(node => {
                node.addEventListener('click', e => {
                    const act = node.dataset.action;
                    if (act === 'del-mat' || act === 'open-mat') e.stopPropagation();
                    if (act === 'toggle-video') { toggleVideo(node); return; }
                    const idx = parseInt(node.dataset.mat ?? node.dataset.idx);
                    if (act === 'open-mat') openMaterial(idx);
                    if (act === 'del-mat')  deleteMaterial(idx);
                    if (act === 'open-pdf') openPdfModal(node.dataset.pdfUrl, node.dataset.pdfLabel);
                });
            });
            el.querySelectorAll('[data-action="open-mat"]').forEach(node =>
                node.addEventListener('keydown', e => { if (e.key === 'Enter') openMaterial(parseInt(node.dataset.mat)); })
            );
        }

        function toggleVideo(header) {
            const idx    = header.dataset.idx;
            const player = document.getElementById(`video-player-${idx}`);
            const toggle = header.querySelector('.material-video-toggle');
            const isOpen = player.classList.toggle('open');
            toggle.textContent = isOpen ? '■ fechar' : '▶ ver';
            if (!isOpen) {
                const vid = player.querySelector('video');
                if (vid) vid.pause();
                const iframe = player.querySelector('iframe');
                if (iframe) { const s = iframe.src; iframe.src = ''; iframe.src = s; }
            }
        }

        let _pdfBlobUrl = null;

        async function openPdfModal(url, label) {
            const modal  = document.getElementById('pdf-modal');
            const frame  = document.getElementById('pdf-modal-frame');
            const dlBtn  = document.getElementById('pdf-modal-download');
            document.getElementById('pdf-modal-title').textContent = label;
            dlBtn.href = url;
            // Loading placeholder
            frame.removeAttribute('src');
            frame.srcdoc = `<body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#525659;font-family:sans-serif;color:#ccc;font-size:0.9rem">A carregar PDF…</body>`;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            try {
                const res  = await fetch(url);
                const blob = await res.blob();
                if (_pdfBlobUrl) URL.revokeObjectURL(_pdfBlobUrl);
                _pdfBlobUrl  = URL.createObjectURL(blob);
                frame.removeAttribute('srcdoc');
                frame.src    = _pdfBlobUrl;
            } catch (e) {
                frame.srcdoc = `<body style="margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#1a1a2e;font-family:sans-serif;color:#ccc;gap:1rem"><p>Não foi possível carregar o PDF.</p><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" style="color:#58a6ff;text-decoration:none;border:1px solid #58a6ff;padding:.5rem 1rem;border-radius:6px">↗ Abrir em separador</a></body>`;
            }
        }

        function _closePdf() {
            const modal = document.getElementById('pdf-modal');
            modal.classList.remove('open');
            const f = document.getElementById('pdf-modal-frame');
            f.removeAttribute('src');
            f.removeAttribute('srcdoc');
            document.body.style.overflow = '';
        }
        function closePdfModal(e) {
            if (e && e.target !== document.getElementById('pdf-modal')) return;
            _closePdf();
        }
        function closePdfModalBtn() { _closePdf(); }

        async function addMaterial() {
            let type    = document.getElementById('mat-type').value;
            const label = document.getElementById('mat-label').value.trim();
            const url   = document.getElementById('mat-url').value.trim();
            if (!url && !label) return;
            if (url && !isSafeUrl(url)) {
                alert('URL inválido. Usa apenas http:// ou https://');
                return;
            }
            if (url && getYouTubeId(url)) type = 'video';

            const matKey = currentSessionKey || currentUCCode;
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            const item = {
                id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
                type, label: label || url, url, uid, createdAt: Date.now()
            };
            try {
                await db.collection('materials').doc(matKey).set({
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }, { merge: true });
                delete materialsCache[matKey];
                const list = await getMaterials(matKey);
                renderMaterials(list);
            } catch (e) {
                console.error('Erro ao adicionar material:', e);
                alert('Erro ao guardar material.');
            }

            document.getElementById('mat-label') && (document.getElementById('mat-label').value = '');
            document.getElementById('mat-url')   && (document.getElementById('mat-url').value   = '');
        }

        function openMaterial(index) {
            const matKey = currentSessionKey || currentUCCode;
            const list = materialsCache[matKey] || [];
            const item = list[index];
            if (item && item.url) {
                if (!isSafeUrl(item.url)) {
                    alert('URL bloqueado por segurança.');
                    return;
                }
                window.open(item.url, '_blank', 'noopener,noreferrer');
            }
        }

        async function deleteMaterial(index) {
            const matKey = currentSessionKey || currentUCCode;
            if (!confirm('Remover este material?')) return;
            try {
                const doc = await db.collection('materials').doc(matKey).get();
                const items = doc.exists ? [...(doc.data().items || [])] : [];
                items.splice(index, 1);
                await db.collection('materials').doc(matKey).set({ items });
                delete materialsCache[matKey];
                const updated = await getMaterials(matKey);
                renderMaterials(updated);
            } catch (e) {
                console.error('Erro ao apagar material:', e);
                alert('Erro ao apagar material.');
            }
        }

        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;
            processFile(file);
            event.target.value = '';
        }

        async function processFile(file) {
            const MAX_SIZE = 4 * 1024 * 1024; // 4 MB
            if (file.size > MAX_SIZE) {
                alert(`Ficheiro demasiado grande (${(file.size/1024/1024).toFixed(1)} MB).\\nMáximo: 4 MB. Para ficheiros maiores usa um link (Google Drive, Dropbox…).`);
                return;
            }
            const EXT_TYPE_MAP = {
                pdf:'application/pdf', doc:'application/msword',
                docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ppt:'application/vnd.ms-powerpoint',
                pptx:'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                xls:'application/vnd.ms-excel',
                xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                txt:'text/plain', md:'text/markdown', html:'text/html',
                png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg',
                gif:'image/gif', webp:'image/webp', zip:'application/zip'
            };
            const ext = file.name.split('.').pop().toLowerCase();
            const contentType = EXT_TYPE_MAP[ext];
            if (!contentType) {
                alert('Tipo de ficheiro não permitido. Usa PDF, Word, PowerPoint, imagem ou ZIP.');
                return;
            }

            const zone = document.getElementById('file-drop-zone');
            zone.innerHTML = '⏳ A enviar ficheiro...';
            zone.style.pointerEvents = 'none';

            let uploadedUrl = null;
            try {
                const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
                const key      = `${Date.now()}-${safeName}`;
                const uid      = auth.currentUser?.uid || 'unknown';
                const ref      = storage.ref(`uc-files/${uid}/${key}`);
                const snapshot = await ref.put(file, { contentType });
                uploadedUrl    = await snapshot.ref.getDownloadURL();
            } catch (e) {
                console.error('[Storage] upload error:', e);
                alert(`Erro ao enviar para Storage: ${e.message || e.code || e}`);
                return;
            }

            try {
                const typeMap = { pdf:'pdf', doc:'doc', docx:'doc', ppt:'slide', pptx:'slide',
                                   xls:'doc', xlsx:'doc', png:'outro', jpg:'outro', jpeg:'outro',
                                   gif:'outro', webp:'outro', txt:'doc', md:'doc', html:'html', zip:'outro' };
                const matType = typeMap[ext] || 'outro';
                const matSize = `${(file.size/1024).toFixed(0)} KB`;
                const matKey  = currentSessionKey || currentUCCode;
                const uid = auth.currentUser?.uid;
                const item = {
                    id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
                    type: matType, label: file.name, url: uploadedUrl, size: matSize,
                    uid, createdAt: Date.now()
                };
                await db.collection('materials').doc(matKey).set({
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }, { merge: true });
                delete materialsCache[matKey];
                const list = await getMaterials(matKey);
                renderMaterials(list);
            } catch (e) {
                console.error('[Firestore] register material error:', e);
                alert(`Ficheiro enviado mas erro ao registar: ${e.message}`);
            } finally {
                zone.innerHTML = '📂 Arrastar ficheiro ou clicar para selecionar<input type="file" id="file-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.png,.jpg,.zip,.html">';
                const fi = zone.querySelector('#file-input');
                if (fi) fi.addEventListener('change', e => handleFileSelect(e));
                zone.style.pointerEvents = '';
            }
        }

        // Drag and drop on file zone
        function setupFileDrop() {
            const zone = document.getElementById('file-drop-zone');
            if (!zone) return;
            zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
            zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
            zone.addEventListener('drop', e => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                const file = e.dataTransfer.files[0];
                if (file) processFile(file);
            });
        }

