        // ── PLAYGROUND ──────────────────────────────────────────────────
        // SRI hashes para scripts CDN carregados dinamicamente
        const _PG_SRI = {
            [`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js`]:               'sha384-ZYmwuq4n2gOcNxMSiJ6jyTj+BbIrilr7p6dlq6q5nmSWKmsH9UU4K1qqjycMkfmR',
            [`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js`]:       'sha384-Xy+2exU6lBoT4OpUOtnQb+cUpn+nlJQEHvRobWVtwz6wIsw4oNoO7xyd/l8rYgMy',
            [`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closebrackets.min.js`]: 'sha384-69mJoUoPPF/C7qPs6lLjvXvrt6w225+rmxWqGO3a1glVjITdnnwPQOtG9FRTd2Ni',
            [`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js`]: 'sha384-LjCI3E8qhhxXZvu7+FCvqx9eZYSowFvuJ7z54KsgI/BDPGKEuysqCg/vYiKHvC4Y',
            [`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/sql/sql.min.js`]:            'sha384-HxXmA1hLc56V6Ja4yfcCwAprmbnS4tuvKYS0qKG3t6oxOFMflcnYq5fOnt6wVCda',
            [`https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-asm.js`]:                              'sha384-ur9WCykw0SZNZ8drFEOH/m9+bB+wzKinbF63kpF2yRb4AYvAFbrGvvEC/RfCK8Wp',
        };

        const pg = {
            tabs: [],
            active: null,
            counter: { python: 0, sql: 0 },
            worker: null,
            workerReady: false,
            pyodideLoading: false,
            hasFormat: false,
            _runId: 0,
            _pendingRuns: {},   // id → { resolve, reject, tabId }
            SQL: null,
            sqlLoading: false,
            editors: {},       // tabId → CodeMirror instance
            cmReady: false,
            cmLoading: false,
            cmSQLReady: false,
        };

        document.addEventListener('click', () => {
            document.querySelectorAll('.pg-examples-menu').forEach(m => m.classList.remove('open'));
        });

        // ── Exemplos Python ────────────────────────────────────
        const PG_EXAMPLES = __INJECT_PG_EXAMPLES__;

        // ── Black formatter (Prettier para Python) ─────────────
        const _PG_FMT_CODE = `
import micropip as _mp
await _mp.install('autopep8')
import autopep8 as _autopep8
def _pg_format(src):
    try:
        out = _autopep8.fix_code(src, options={'aggressive': 1, 'max_line_length': 88})
        return {'ok': out, 'err': ''}
    except Exception as e:
        return {'ok': src, 'err': str(e)}
`;

        // ── SQL default example ────────────────────────────────
        const _SQL_DEFAULT = `-- Criar tabela
CREATE TABLE utilizadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER,
    email TEXT
);

-- Inserir dados
INSERT INTO utilizadores (nome, idade, email) VALUES
    ('Ana', 25, 'ana@email.com'),
    ('Joao', 30, 'joao@email.com'),
    ('Maria', 22, 'maria@email.com');

-- Ver todos os dados
SELECT * FROM utilizadores;

-- Filtrar dados
SELECT nome, idade
FROM utilizadores
WHERE idade > 23;

-- Atualizar dados
UPDATE utilizadores
SET idade = 26
WHERE nome = 'Ana';

-- Apagar um registo
DELETE FROM utilizadores
WHERE nome = 'Maria';

-- Resultado final
SELECT * FROM utilizadores;
`;

        // ── CodeMirror loader ──────────────────────────────────
        const CM_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16';
        async function pgEnsureCM() {
            if (pg.cmReady) return;
            if (pg.cmLoading) {
                while (pg.cmLoading) await new Promise(r => setTimeout(r, 50));
                return;
            }
            pg.cmLoading = true;
            // CSS
            const addCss = href => {
                if (document.querySelector(`link[href="${href}"]`)) return;
                const l = document.createElement('link');
                l.rel = 'stylesheet'; l.href = href;
                document.head.appendChild(l);
            };
            addCss(`${CM_BASE}/codemirror.min.css`);
            addCss(`${CM_BASE}/theme/dracula.min.css`);
            // JS — load sequentially
            const loadJs = src => new Promise((res, rej) => {
                if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
                const s = document.createElement('script'); s.src = src;
                if (_PG_SRI[src]) { s.integrity = _PG_SRI[src]; s.crossOrigin = 'anonymous'; }
                s.onload = res; s.onerror = rej;
                document.head.appendChild(s);
            });
            await loadJs(`${CM_BASE}/codemirror.min.js`);
            await loadJs(`${CM_BASE}/mode/python/python.min.js`);
            await loadJs(`${CM_BASE}/addon/edit/closebrackets.min.js`);
            await loadJs(`${CM_BASE}/addon/edit/matchbrackets.min.js`);
            pg.cmReady = true;
            pg.cmLoading = false;
        }

        function pgGetCM(tabId) { return pg.editors[tabId]; }

        function pgEditorGetValue(tabId) {
            const cm = pgGetCM(tabId);
            if (cm) return cm.getValue();
            return document.getElementById(tabId + '-editor')?.value || '';
        }

        function pgEditorSetValue(tabId, val) {
            const cm = pgGetCM(tabId);
            if (cm) { cm.setValue(val); return; }
            const el = document.getElementById(tabId + '-editor');
            if (el) el.value = val;
        }

        function pgToggleExamples(e, menuId) {
            e.stopPropagation();
            const menu = document.getElementById(menuId);
            const wasOpen = menu.classList.contains('open');
            document.querySelectorAll('.pg-examples-menu').forEach(m => m.classList.remove('open'));
            if (!wasOpen) menu.classList.add('open');
        }

        function pgLoadExample(tabId, menuId, code) {
            document.getElementById(menuId).classList.remove('open');
            pgEditorSetValue(tabId, code);
            // Salvar no ficheiro activo
            const tab = pg.tabs.find(t => t.id === tabId);
            const file = tab?.files?.find(f => f.id === tab.activeFile);
            if (file) file.code = code;
            pgGetCM(tabId)?.focus();
        }

        // ── input() inline ─────────────────────────────────────
        window._pgRequestInput = function(tabId, flushed, prompt) {
            return new Promise(resolve => {
                const el = document.getElementById(tabId + '-output');
                if (!el) { resolve(''); return; }
                if (flushed) {
                    const span = document.createElement('span');
                    span.style.color = '#3fb950';
                    span.style.whiteSpace = 'pre-wrap';
                    span.textContent = flushed;
                    el.appendChild(span);
                }
                if (prompt) {
                    const pr = document.createElement('span');
                    pr.style.color = '#58a6ff';
                    pr.textContent = prompt;
                    el.appendChild(pr);
                }
                const inp = document.createElement('input');
                inp.type = 'text';
                inp.className = 'pg-inline-input';
                el.appendChild(inp);
                el.appendChild(document.createTextNode(' '));
                inp.focus();
                inp.addEventListener('keydown', ev => {
                    if (ev.key === 'Enter') {
                        const val = inp.value;
                        const typed = document.createElement('span');
                        typed.style.color = '#e6edf3';
                        typed.textContent = val;
                        inp.replaceWith(typed);
                        el.appendChild(document.createElement('br'));
                        resolve(val);
                    }
                });
            });
        };

        async function pgNewTab(type) {
            if (pg.tabs.length >= 6) { alert('Máximo de 6 sessões abertas.'); return; }
            pg.counter[type]++;
            const id   = `pg-${type}-${pg.counter[type]}`;
            const label = type === 'python' ? `🐍 Python ${pg.counter[type]}` : `🗄️ SQL ${pg.counter[type]}`;
            const tab  = { id, type, label, cmdHistory: [], cmdHistoryIdx: -1 };
            if (type === 'sql') tab.db = null;
            if (type === 'python') {
                const fid = id + '-f0';
                tab.files = [{ id: fid, name: 'main.py', code: '' }];
                tab.activeFile = fid;
            }
            pg.tabs.push(tab);
            pgRenderTabBar();
            pgCreatePanel(tab);
            pgSwitchTab(id);
            if (type === 'python') pgEnsurePyodide(id);
            if (type === 'sql')    pgEnsureSQL(id);
        }

        function pgCloseTab(id, e) {
            e?.stopPropagation();
            const idx = pg.tabs.findIndex(t => t.id === id);
            if (idx === -1) return;
            const tab = pg.tabs[idx];
            if (tab.db) { try { tab.db.close(); } catch(_) {} }
            if (tab.type === 'python' && pg.worker) pg.worker.postMessage({ type: 'clear_ns', tabId: id });
            if (pg.editors[id]) { delete pg.editors[id]; }
            pg.tabs.splice(idx, 1);
            document.getElementById(id + '-tab')?.remove();
            document.getElementById(id + '-panel')?.remove();
            if (pg.active === id) {
                pg.active = null;
                const next = pg.tabs[Math.min(idx, pg.tabs.length - 1)];
                if (next) pgSwitchTab(next.id);
                else document.getElementById('pg-empty').style.display = 'flex';
            }
        }

        function pgSwitchTab(id) {
            if (pg.active && pg.active !== id) pgSaveCurrentFile(pg.active);
            pg.active = id;
            pg.tabs.forEach(t => {
                document.getElementById(t.id + '-tab')?.classList.toggle('active', t.id === id);
                const p = document.getElementById(t.id + '-panel');
                if (p) p.classList.toggle('active', t.id === id);
            });
            document.getElementById('pg-empty').style.display = 'none';
            // Focus input
            setTimeout(() => {
                document.getElementById(id + '-input')?.focus();
                pgGetCM(id)?.focus();
            }, 30);
        }

        function pgRenderTabBar() {
            const container = document.getElementById('pg-tabs');
            container.innerHTML = pg.tabs.map(t => `
                <div class="pg-tab${t.id === pg.active ? ' active' : ''}"
                     id="${t.id}-tab" onclick="pgSwitchTab('${t.id}')">
                    ${escapeHtml(t.label)}
                    <span class="pg-tab-close" onclick="pgCloseTab('${t.id}', event)" title="Fechar">✕</span>
                </div>`).join('');
        }

        // ── File management ─────────────────────────────────────
        function pgSaveCurrentFile(tabId) {
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab?.files) return;
            const file = tab.files.find(f => f.id === tab.activeFile);
            if (file) file.code = pgEditorGetValue(tabId);
        }

        function pgRenderFileTabs(tabId) {
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab?.files) return;
            const bar = document.getElementById(tabId + '-filetabs');
            if (!bar) return;
            bar.innerHTML = tab.files.map(f => `
                <div class="pg-filetab${f.id === tab.activeFile ? ' active' : ''}"
                     id="${f.id}-ftab" onclick="pgSwitchFile('${tabId}','${f.id}')">
                    <span class="pg-filetab-name"
                          ondblclick="pgRenameFile('${tabId}','${f.id}',event)"
                          title="Duplo clique para renomear">${escapeHtml(f.name)}</span>
                    ${tab.files.length > 1 ? `<span class="pg-filetab-close" onclick="pgCloseFile('${tabId}','${f.id}',event)">✕</span>` : ''}
                </div>`).join('') +
                `<span class="pg-filetab-add" onclick="pgNewFile('${tabId}')" title="Novo ficheiro">＋</span>`;
        }

        function pgSwitchFile(tabId, fileId) {
            pgSaveCurrentFile(tabId);
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            tab.activeFile = fileId;
            const file = tab.files.find(f => f.id === fileId);
            if (file) pgEditorSetValue(tabId, file.code);
            pgRenderFileTabs(tabId);
            pgGetCM(tabId)?.focus();
        }

        function pgNewFile(tabId) {
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            if (tab.files.length >= 8) { alert('Máximo de 8 ficheiros por sessão.'); return; }
            pgSaveCurrentFile(tabId);
            const idx  = tab.files.length;
            const fid  = tabId + '-f' + idx;
            const name = idx === 0 ? 'main.py' : idx === 1 ? 'utils.py' : `ficheiro${idx}.py`;
            tab.files.push({ id: fid, name, code: '' });
            pgSwitchFile(tabId, fid);
        }

        function pgCloseFile(tabId, fileId, e) {
            e?.stopPropagation();
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab || tab.files.length <= 1) return;
            const idx = tab.files.findIndex(f => f.id === fileId);
            if (idx === -1) return;
            tab.files.splice(idx, 1);
            if (tab.activeFile === fileId) {
                const next = tab.files[Math.min(idx, tab.files.length - 1)];
                pgSwitchFile(tabId, next.id);
            } else {
                pgRenderFileTabs(tabId);
            }
        }

        function pgRenameFile(tabId, fileId, e) {
            e?.stopPropagation();
            const tab  = pg.tabs.find(t => t.id === tabId);
            const file = tab?.files.find(f => f.id === fileId);
            if (!file) return;
            const span = e.target;
            span.contentEditable = 'true';
            span.focus();
            const range = document.createRange();
            range.selectNodeContents(span);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            const finish = () => {
                span.contentEditable = 'false';
                const newName = span.textContent.trim() || file.name;
                file.name = newName.endsWith('.py') ? newName : newName + '.py';
                pgRenderFileTabs(tabId);
            };
            span.onblur = finish;
            span.onkeydown = ev => { if (ev.key === 'Enter') { ev.preventDefault(); span.blur(); } };
        }

        function pgCreatePanel(tab) {
            const wrap = document.getElementById('pg-panels');
            const div  = document.createElement('div');
            div.className = 'pg-panel';
            div.id = tab.id + '-panel';
            if (tab.type === 'python') {
                div.innerHTML = `
                    <div class="pg-sandbox-warning">⚠️ Executa apenas código de fontes confiáveis. O código corre no teu browser.</div>
                    <div class="pg-editor-wrap">
                        <div class="pg-toolbar">
                            <button class="pg-run-btn" id="${tab.id}-run" onclick="pgRunPython('${tab.id}')">▶ Correr</button>
                            <button class="pg-clear-btn" onclick="pgClearOutput('${tab.id}')">Limpar</button>
                            <div class="pg-examples-wrap">
                                <button class="pg-examples-btn" onclick="pgToggleExamples(event,'${tab.id}-ex')">Exemplos ▾</button>
                                <div class="pg-examples-menu" id="${tab.id}-ex">
                                    ${PG_EXAMPLES.map((ex,i) => `<div class="pg-examples-item" data-idx="${i}" data-tabid="${tab.id}" data-menuid="${tab.id}-ex">${ex.label}</div>`).join('')}
                                </div>
                            </div>
                            <span class="pg-hint">Ctrl+Enter para correr</span>
                        </div>
                        <div class="pg-filetabs" id="${tab.id}-filetabs"></div>
                        <div class="pg-editor-body">
                            <div class="pg-editor-pane">
                                <div class="pg-editor-cm" id="${tab.id}-cm-host"></div>
                            </div>
                            <div class="pg-output-pane">
                                <div class="pg-output-header">Output</div>
                                <div class="pg-output" id="${tab.id}-output"><span class="pg-info"># Output aparece aqui</span></div>
                            </div>
                        </div>
                    </div>`;
                pgRenderFileTabs(tab.id);
                // Ligar exemplos via event delegation (evita problemas de aspas em onclick)
                div.querySelectorAll('.pg-examples-item[data-idx]').forEach(el => {
                    el.addEventListener('click', () => {
                        const idx = parseInt(el.dataset.idx);
                        pgLoadExample(el.dataset.tabid, el.dataset.menuid, PG_EXAMPLES[idx].code);
                    });
                });
                // Inicializar CodeMirror
                pgEnsureCM().then(() => {
                    const host = document.getElementById(tab.id + '-cm-host');
                    if (!host || pg.editors[tab.id]) return;
                    const cm = CodeMirror(host, {
                        value: '',
                        mode: 'python',
                        theme: 'dracula',
                        lineNumbers: true,
                        indentUnit: 4,
                        tabSize: 4,
                        indentWithTabs: false,
                        autoCloseBrackets: true,
                        matchBrackets: true,
                        lineWrapping: false,
                        extraKeys: {
                            'Ctrl-Enter': () => pgRunPython(tab.id),
                            'Tab': cm => {
                                if (cm.somethingSelected()) cm.indentSelection('add');
                                else cm.replaceSelection('    ', 'end');
                            }
                        }
                    });
                    pg.editors[tab.id] = cm;
                });
            } else {
                div.innerHTML = `
                    <div class="pg-repl">
                        <div class="pg-toolbar">
                            <button class="pg-run-btn" id="${tab.id}-run" onclick="pgSQLRun('${tab.id}')" disabled>▶ Correr</button>
                            <button class="pg-clear-btn" onclick="pgSQLClear('${tab.id}')">Limpar</button>
                            <span class="pg-hint">Ctrl+Enter para correr</span>
                        </div>
                        <div class="pg-repl-body">
                            <div class="pg-repl-editor-pane">
                                <div class="pg-editor-cm" id="${tab.id}-cm-host"></div>
                            </div>
                            <div class="pg-repl-history-pane">
                                <div class="pg-repl-history-header">Resultado</div>
                                <div class="pg-repl-history" id="${tab.id}-history">
                                    <div class="pg-repl-entry"><span class="pg-info">Escreve SQL acima e clica Correr</span></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                // Inicializar CodeMirror SQL
                pgEnsureCM().then(() => pgEnsureCMSQL()).then(() => {
                    const host = document.getElementById(tab.id + '-cm-host');
                    if (!host || pg.editors[tab.id]) return;
                    const cm = CodeMirror(host, {
                        value: '',
                        mode: 'text/x-sql',
                        theme: 'dracula',
                        lineNumbers: true,
                        indentUnit: 4,
                        tabSize: 4,
                        indentWithTabs: false,
                        autoCloseBrackets: true,
                        matchBrackets: true,
                        lineWrapping: false,
                        extraKeys: {
                            'Ctrl-Enter': () => pgSQLRun(tab.id)
                        }
                    });
                    pg.editors[tab.id] = cm;
                });
            }
            wrap.appendChild(div);
        }

        // ── Python (Web Worker) ─────────────────────────────────
        function _pgWorkerInit() {
            if (pg.worker) return;
            pg.worker = new Worker('pyodide-worker.js');
            pg.worker.onmessage = ({ data }) => {
                const { type, id } = data;
                if (type === 'ready') {
                    pg.workerReady = true;
                    pg.hasFormat = data.hasFormat;
                    pg.pyodideLoading = false;
                    pg.tabs.filter(t => t.type === 'python').forEach(t => pgSetRunReady(t.id));
                    return;
                }
                if (type === 'init_error') {
                    pg.pyodideLoading = false;
                    pg.tabs.filter(t => t.type === 'python').forEach(t =>
                        pgSetOutput(t.id, `<span class="pg-err">Erro ao carregar Python: ${escapeHtml(data.message)}</span>`)
                    );
                    return;
                }
                if (type === 'result' || type === 'run_error') {
                    const pending = pg._pendingRuns[id];
                    if (!pending) return;
                    delete pg._pendingRuns[id];
                    if (type === 'result') pending.resolve(data);
                    else pending.reject(new Error(data.message));
                    return;
                }
                if (type === 'input_request') {
                    // Show inline input prompt in the tab output, then relay value back to worker
                    const { tabId, buffered, prompt } = data;
                    window._pgRequestInput(tabId, buffered, prompt).then(value => {
                        pg.worker.postMessage({ type: 'input_response', value });
                    });
                    return;
                }
            };
            pg.worker.onerror = (e) => {
                pg.pyodideLoading = false;
                pg.tabs.filter(t => t.type === 'python').forEach(t =>
                    pgSetOutput(t.id, `<span class="pg-err">Erro no worker: ${escapeHtml(e.message || 'desconhecido')}</span>`)
                );
            };
            pg.worker.postMessage({ type: 'init' });
        }

        async function pgEnsurePyodide(tabId) {
            if (pg.workerReady) { pgSetRunReady(tabId); return; }
            if (pg.pyodideLoading) {
                pgSetOutput(tabId, '<span class="pg-info"># A carregar Python (Pyodide)…</span>');
                while (pg.pyodideLoading) await new Promise(r => setTimeout(r, 200));
                if (pg.workerReady) pgSetRunReady(tabId);
                return;
            }
            pg.pyodideLoading = true;
            pgSetOutput(tabId, '<span class="pg-info"># A carregar Python (~10 MB, apenas na primeira vez)…</span>');
            const btn = document.getElementById(tabId + '-run');
            if (btn) btn.disabled = true;
            _pgWorkerInit();
            // Wait for ready/error (up to 90s for large Pyodide download)
            await new Promise((res, rej) => {
                const t = setTimeout(() => rej(new Error('Timeout (>90s). Faz Ctrl+Shift+R e tenta de novo.')), 90000);
                const check = setInterval(() => {
                    if (pg.workerReady || !pg.pyodideLoading) { clearInterval(check); clearTimeout(t); res(); }
                }, 300);
            }).catch(e => {
                pg.pyodideLoading = false;
                pgSetOutput(tabId, `<span class="pg-err">Erro: ${escapeHtml(e.message)}</span>`);
            });
            if (btn) { btn.disabled = false; btn.classList.remove('loading'); }
        }

        function pgSetRunReady(tabId) {
            const btn = document.getElementById(tabId + '-run');
            if (btn) { btn.disabled = false; btn.classList.remove('loading'); }
            pgSetOutput(tabId, '<span class="pg-info"># Python pronto — escreve código e clica Correr</span>');
        }

        function pgEditorKey(e, tabId) { /* legacy — CodeMirror usa extraKeys */ }

        async function pgRunPython(tabId) {
            if (!pg.workerReady) { await pgEnsurePyodide(tabId); return; }
            const code = pgEditorGetValue(tabId).trim();
            if (!code) return;
            const btn = document.getElementById(tabId + '-run');
            if (btn) btn.disabled = true;
            const outputEl = document.getElementById(tabId + '-output');
            if (outputEl) outputEl.innerHTML = '';
            try {
                const tab = pg.tabs.find(t => t.id === tabId);
                // Salvar ficheiro activo
                pgSaveCurrentFile(tabId);
                const files = tab.files.filter(f => f.code.trim()).map(f => ({name: f.name, code: f.code}));
                if (!files.length) { pgSetOutput(tabId, '<span class="pg-info"># (sem código)</span>'); return; }

                const runId = ++pg._runId;
                const resultPromise = new Promise((resolve, reject) => {
                    pg._pendingRuns[runId] = { resolve, reject, tabId };
                });
                pg.worker.postMessage({ type: 'run', id: runId, tabId, files });

                const data = await resultPromise;
                const { out, err, formattedFiles } = data;

                // Apply formatted code back to tab files
                if (pg.hasFormat && formattedFiles) {
                    formattedFiles.forEach(ff => {
                        const f = tab.files.find(x => x.name === ff.name);
                        if (f) f.code = ff.code;
                    });
                    const activeFile = tab.files.find(f => f.id === tab.activeFile);
                    if (activeFile) pgEditorSetValue(tabId, activeFile.code);
                }

                if (out) {
                    const span = document.createElement('span');
                    span.style.color = '#3fb950';
                    span.style.whiteSpace = 'pre-wrap';
                    span.textContent = out;
                    outputEl.appendChild(span);
                }
                if (err) {
                    const span = document.createElement('span');
                    span.style.color = '#f85149';
                    span.style.whiteSpace = 'pre-wrap';
                    span.textContent = err;
                    outputEl.appendChild(span);
                }
                if (!out && !err && !outputEl.hasChildNodes())
                    pgSetOutput(tabId, '<span class="pg-info"># (sem output)</span>');
            } catch(e) {
                pgSetOutput(tabId, `<span class="pg-err">${escapeHtml(e.message)}</span>`);
            } finally {
                if (btn) btn.disabled = false;
            }
        }

        function pgSetOutput(tabId, html) {
            const el = document.getElementById(tabId + '-output');
            if (el) el.innerHTML = html;
        }
        function pgClearOutput(tabId) {
            pgSetOutput(tabId, '<span class="pg-info"># Output limpo</span>');
        }

        // ── SQL ─────────────────────────────────────────────
        async function pgEnsureCMSQL() {
            if (pg.cmSQLReady) return;
            await new Promise((res, rej) => {
                const src = `${CM_BASE}/mode/sql/sql.min.js`;
                if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
                const s = document.createElement('script'); s.src = src;
                if (_PG_SRI[src]) { s.integrity = _PG_SRI[src]; s.crossOrigin = 'anonymous'; }
                s.onload = () => { pg.cmSQLReady = true; res(); };
                s.onerror = rej;
                document.head.appendChild(s);
            });
        }

        async function pgEnsureSQL(tabId) {
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            if (tab.db) return;
            if (pg.sqlLoading) {
                pgSQLAppend(tabId, 'info', 'A carregar SQLite…');
                while (pg.sqlLoading) await new Promise(r => setTimeout(r, 200));
            }
            if (!pg.SQL) {
                pg.sqlLoading = true;
                pgSQLAppend(tabId, 'info', 'A carregar sql.js (apenas na primeira vez)…');
                try {
                    await pgLoadScript('https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-asm.js');
                    if (typeof window.initSqlJs !== 'function') throw new Error("initSqlJs is not defined");
                    const p = window.initSqlJs();
                    pg.SQL = await Promise.race([
                        p,
                        new Promise((_, rej) => setTimeout(() => rej(new Error('Timeout a inicializar sql.js (demasiado lento)')), 15000))
                    ]);
                } catch(e) {
                    pgSQLAppend(tabId, 'err', 'Erro ao carregar sql.js: ' + e.message);
                    pg.sqlLoading = false;
                    return;
                }
                pg.sqlLoading = false;
            }
            tab.db = new pg.SQL.Database();
            pgSQLAppend(tabId, 'info', 'SQLite pronto — escreve SQL e clica Correr (ou Ctrl+Enter).');
            const runBtn = document.getElementById(tabId + '-run');
            if (runBtn) runBtn.disabled = false;
            pgGetCM(tabId)?.focus();
        }

        function pgSQLKey(e, tabId) { /* legacy */ }

        async function pgSQLRun(tabId) {
            const cm = pgGetCM(tabId);
            const cmd = cm ? cm.getValue().trim() : '';
            if (!cmd) return;
            await pgRunSQL(tabId, cmd);
        }

        function pgSQLClear(tabId) {
            const hist = document.getElementById(tabId + '-history');
            if (hist) hist.innerHTML = '<div class="pg-repl-entry"><span class="pg-info">Output limpo.</span></div>';
        }

        async function pgRunSQL(tabId, cmd) {
            // Mostrar preview curto do comando (primeira linha não-vazia)
            const firstLine = cmd.split('\\n').find(l => l.trim() && !l.trim().startsWith('--')) || cmd.split('\\n')[0];
            const stmtCount = (cmd.match(/;/g) || []).length;
            const label = stmtCount > 1 ? `${firstLine.trim()} … (${stmtCount} statements)` : firstLine.trim();
            pgSQLAppend(tabId, 'prompt', label);
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            if (!tab.db) { await pgEnsureSQL(tabId); if (!tab.db) return; }
            try {
                const results = tab.db.exec(cmd);
                if (results.length === 0) {
                    pgSQLAppend(tabId, 'out', 'OK');
                } else {
                    results.forEach(r => pgSQLAppend(tabId, 'table', pgFormatTable(r)));
                }
            } catch(e) {
                pgSQLAppend(tabId, 'err', e.message);
            }
        }

        function pgSQLAppend(tabId, type, text) {
            const hist = document.getElementById(tabId + '-history');
            if (!hist) return;
            const div = document.createElement('div');
            div.className = 'pg-repl-entry';
            if (type === 'prompt') {
                div.innerHTML = `<span class="pg-repl-prompt">sqlite&gt; </span><span>${escapeHtml(text)}</span>`;
            } else if (type === 'table') {
                div.innerHTML = text;
            } else if (type === 'err') {
                div.innerHTML = `<span class="pg-repl-err">ERRO: ${escapeHtml(text)}</span>`;
            } else if (type === 'info') {
                div.innerHTML = `<span class="pg-info">${escapeHtml(text)}</span>`;
            } else {
                div.innerHTML = `<span class="pg-repl-out">${escapeHtml(text)}</span>`;
            }
            hist.appendChild(div);
            hist.scrollTop = hist.scrollHeight;
        }

        function pgFormatTable(result) {
            const cols = result.columns;
            const rows = result.values;
            const esc = s => escapeHtml(String(s ?? 'NULL'));
            const rowCount = rows.length + ' ' + (rows.length === 1 ? 'linha' : 'linhas');
            const thead = `<tr>${cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr>`;
            const tbody = rows.map((r, i) =>
                `<tr class="${i % 2 === 1 ? 'pg-tbl-alt' : ''}">${r.map(v => `<td>${esc(v)}</td>`).join('')}</tr>`
            ).join('');
            return `<div class="pg-sql-table-wrap"><table class="pg-sql-table"><thead>${thead}</thead><tbody>${tbody}</tbody></table><div class="pg-sql-row-count">${rowCount}</div></div>`;
        }

        function pgLoadScript(url) {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${url}"]`)) { resolve(); return; }
                const s = document.createElement('script');
                s.src = url;
                if (_PG_SRI[url]) { s.integrity = _PG_SRI[url]; s.crossOrigin = 'anonymous'; }
                s.onload = resolve;
                s.onerror = () => reject(new Error('Falha ao carregar: ' + url));
                document.head.appendChild(s);
            });
        }

