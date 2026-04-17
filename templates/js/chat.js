        // ── CHAT (full-page view) ────────────────────────────────────────
        function chatViewInit() {
            if (chatUnsub) return;   // already subscribed
            const q = db.collection('chat_global')
                .orderBy('timestamp', 'asc')
                .limitToLast(80);
            chatUnsub = q.onSnapshot(snap => {
                const el  = document.getElementById('chat-view-msgs');
                const uid = auth.currentUser?.uid;
                let newCount = 0;
                const msgs = [];
                snap.forEach(doc => {
                    const m = { id: doc.id, ...doc.data() };
                    if (!m.deleted) {
                        msgs.push(m);
                        if (m.timestamp?.toMillis && m.timestamp.toMillis() > chatLastRead) newCount++;
                    }
                });
                if (!el) return;
                el.innerHTML = msgs.length === 0
                    ? '<div class="chat-empty">Sem mensagens ainda. Sê o primeiro!</div>'
                    : msgs.map(m => chatBubbleHtml(m, uid, 'chat')).join('');
                el.scrollTop = el.scrollHeight;
                if (currentView !== 'chat') chatUpdateBadge(newCount);
                else chatMarkRead();
            }, err => console.warn('Chat error:', err));
        }

        function chatBubbleHtml(m, uid, channel) {
            const mine   = m.uid === uid;
            const delBtn = `<button class="chat-del-btn" title="Apagar" onclick="chatDelete('${channel}','${escapeHtml(m.id)}')">✕</button>`;
            const time   = m.timestamp?.toMillis
                ? new Date(m.timestamp.toMillis()).toLocaleTimeString('pt-PT', {hour:'2-digit',minute:'2-digit'})
                : '';
            return `<div class="chat-msg ${mine ? 'mine' : 'other'}">
                ${!mine ? `<div class="chat-author">${escapeHtml(m.displayName || 'Anónimo')}</div>` : ''}
                <div class="chat-bubble">${escapeHtml(m.text)}</div>
                <div style="display:flex;gap:0.25rem;align-items:center;">
                    <span class="chat-msg-time">${time}</span>
                    ${mine || window._isModerador ? delBtn : ''}
                </div>
            </div>`;
        }

        function chatMarkRead() {
            chatLastRead = Date.now();
            localStorage.setItem('chat_last_read', String(chatLastRead));
            chatUpdateBadge(0);
        }

        function chatUpdateBadge(count) {
            const txt = count > 9 ? '9+' : String(count);
            ['nav-chat-badge', 'mob-chat-badge'].forEach(id => {
                const b = document.getElementById(id);
                if (!b) return;
                if (count > 0) { b.textContent = txt; b.style.display = 'flex'; }
                else { b.style.display = 'none'; }
            });
        }

        // Start background subscription on login so badge updates on all views
        function chatStartBackground() {
            chatViewInit();
        }

        function chatViewKey(e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chatViewSend(); }
        }

        async function chatViewSend() {
            const input = document.getElementById('chat-view-input');
            const text  = (input?.value || '').trim().slice(0, 2000);
            if (!text || !auth.currentUser) return;
            input.value = '';
            const user = auth.currentUser;
            await db.collection('chat_global').add({
                uid:         user.uid,
                displayName: user.displayName || user.email || 'Anónimo',
                photoURL:    user.photoURL || '',
                text,
                timestamp:   firebase.firestore.FieldValue.serverTimestamp(),
                deleted:     false
            });
        }

        async function chatDelete(channel, msgId) {
            if (!confirm('Apagar mensagem?')) return;
            if (channel === 'chat') {
                await db.collection('chat_global').doc(msgId).update({ deleted: true });
            } else {
                await db.collection('uc_chats').doc(channel)
                    .collection('messages').doc(msgId).update({ deleted: true });
            }
        }

        // ── UC CHAT ──────────────────────────────────────────────────────
        function ucChatInit(ucCode) {
            if (ucChatUnsub) { ucChatUnsub(); ucChatUnsub = null; }
            const el = document.getElementById('uc-chat-msgs');
            if (!el) return;
            el.innerHTML = '<div class="chat-empty">A carregar…</div>';
            const uid = auth.currentUser?.uid;
            const q = db.collection('uc_chats').doc(ucCode)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .limitToLast(60);
            ucChatUnsub = q.onSnapshot(snap => {
                const msgs = [];
                snap.forEach(doc => {
                    const m = { id: doc.id, ...doc.data() };
                    if (!m.deleted) msgs.push(m);
                });
                if (msgs.length === 0) {
                    el.innerHTML = '<div class="chat-empty">Sem mensagens ainda. Sê o primeiro a comentar!</div>';
                } else {
                    el.innerHTML = msgs.map(m => chatBubbleHtml(m, uid, ucCode)).join('');
                }
                el.scrollTop = el.scrollHeight;
            }, err => {
                console.warn('UC chat error:', err);
            });
        }

        function ucChatKey(e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ucChatSend(); }
        }

        async function ucChatSend() {
            const input = document.getElementById('uc-chat-input');
            const text = input.value.trim().slice(0, 2000);
            if (!text || !auth.currentUser || !currentUCCode) return;
            input.value = '';
            const user = auth.currentUser;
            await db.collection('uc_chats').doc(currentUCCode)
                .collection('messages').add({
                    uid:         user.uid,
                    displayName: user.displayName || user.email || 'Anónimo',
                    photoURL:    user.photoURL || '',
                    text,
                    timestamp:   firebase.firestore.FieldValue.serverTimestamp(),
                    deleted:     false
                });
        }

