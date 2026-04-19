        // ── PLAYGROUND ──────────────────────────────────────────────────
        const pg = {
            tabs: [],
            active: null,
            counter: { python: 0, sql: 0 },
            pyodide: null,
            pyodideLoading: false,
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

        // ── Python ──────────────────────────────────────────
        async function pgEnsurePyodide(tabId) {
            if (pg.pyodide) { pgSetRunReady(tabId); return; }
            if (pg.pyodideLoading) {
                pgSetOutput(tabId, '<span class="pg-info"># A carregar Python (Pyodide)…</span>');
                while (pg.pyodideLoading) await new Promise(r => setTimeout(r, 200));
                if (pg.pyodide) pgSetRunReady(tabId);
                return;
            }
            pg.pyodideLoading = true;
            pgSetOutput(tabId, '<span class="pg-info"># A carregar Python (~10 MB, apenas na primeira vez)…</span>');
            const btn = document.getElementById(tabId + '-run');
            if (btn) btn.disabled = true;
            const _timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout (>45s). Faz Ctrl+Shift+R e tenta de novo. Se o erro persistir, o browser pode estar a bloquear WebAssembly (verifica as Shields/CSP).')), 45000)
            );
            try {
                await pgLoadScript('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
                pg.pyodide = await Promise.race([
                    loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' }),
                    _timeout
                ]);
                // Bootstrap helper (usa chr(10) para evitar problemas de escape)
                pg.pyodide.runPython(`
import sys, io, traceback, ast as _ast
from js import _pgRequestInput as _js_input
_NL = chr(10)

class _AwaitInput(_ast.NodeTransformer):
    def visit_Call(self, node):
        self.generic_visit(node)
        if isinstance(node.func, _ast.Name) and node.func.id == 'input':
            aw = _ast.Await(value=node)
            return _ast.copy_location(aw, node)
        return node

async def _pg_exec_async(files, ns, tab_id):
    if '__name__' not in ns:
        ns['__name__'] = '__main__'
    _saved_out = sys.stdout
    _saved_err = sys.stderr
    buf = io.StringIO()
    sys.stdout = buf
    sys.stderr = buf

    async def _input(prompt=''):
        flushed = buf.getvalue()
        buf.truncate(0)
        buf.seek(0)
        val = await _js_input(str(tab_id), flushed, str(prompt) if prompt else '')
        return val if val is not None else ''

    ns['input'] = _input
    out = ''
    err = ''
    try:
        for f in list(files):
            src  = str(f['code']).strip() if hasattr(f, '__getitem__') else str(getattr(f, 'code', '')).strip()
            name = str(f['name'])         if hasattr(f, '__getitem__') else str(getattr(f, 'name', '<pg>'))
            if not src:
                continue
            tree = _ast.parse(src, name)
            tree = _AwaitInput().visit(tree)
            fn = _ast.AsyncFunctionDef(
                name='__pg_run__',
                args=_ast.arguments(posonlyargs=[], args=[], vararg=None,
                                    kwonlyargs=[], kw_defaults=[], kwarg=None, defaults=[]),
                body=tree.body, decorator_list=[], returns=None,
                lineno=1, col_offset=0
            )
            _ast.fix_missing_locations(fn)
            mod = _ast.Module(body=[fn], type_ignores=[])
            exec(compile(mod, name, 'exec'), ns)
            await ns['__pg_run__']()
        out = buf.getvalue()
    except Exception:
        out = buf.getvalue()
        err = traceback.format_exc()
    finally:
        sys.stdout = _saved_out
        sys.stderr = _saved_err
    return {'out': out, 'err': err}
`);
                // Instalar autopep8 para auto-formatação (silencioso)
                try {
                    await pg.pyodide.loadPackage('micropip');
                    await pg.pyodide.runPythonAsync(_PG_FMT_CODE);
                } catch(_) {/* autopep8 é opcional — não bloqueia */}
                pgSetRunReady(tabId);
            } catch(e) {
                pgSetOutput(tabId, `<span class="pg-err">Erro: ${e.message}</span>`);
            } finally {
                if (btn) { btn.disabled = false; btn.classList.remove('loading'); }
                pg.pyodideLoading = false;
            }
        }

        function pgSetRunReady(tabId) {
            const btn = document.getElementById(tabId + '-run');
            if (btn) { btn.disabled = false; btn.classList.remove('loading'); }
            pgSetOutput(tabId, '<span class="pg-info"># Python pronto — escreve código e clica Correr</span>');
        }

        function pgEditorKey(e, tabId) { /* legacy — CodeMirror usa extraKeys */ }

        async function pgRunPython(tabId) {
            if (!pg.pyodide) { await pgEnsurePyodide(tabId); return; }
            const code = pgEditorGetValue(tabId).trim();
            if (!code) return;
            const btn = document.getElementById(tabId + '-run');
            if (btn) btn.disabled = true;
            const outputEl = document.getElementById(tabId + '-output');
            if (outputEl) outputEl.innerHTML = '';
            try {
                const tab = pg.tabs.find(t => t.id === tabId);
                if (!tab._ns) tab._ns = pg.pyodide.globals.get('dict')();
                if (!pg.pyodide.globals.has('_pg_exec_async')) {
                    await pgEnsurePyodide(tabId);
                    return;
                }
                // Salvar ficheiro activo
                pgSaveCurrentFile(tabId);
                // Auto-formatar com autopep8 (se disponível)
                if (pg.pyodide.globals.has('_pg_format')) {
                    for (const f of tab.files) {
                        if (!f.code.trim()) continue;
                        pg.pyodide.globals.set('_pg_fmt_src', f.code);
                        const p = pg.pyodide.runPython('_pg_format(_pg_fmt_src)');
                        const r = p.toJs(); p.destroy();
                        if (!r.get('err')) f.code = r.get('ok');
                    }
                    // Reflectir no editor o ficheiro activo formatado
                    const activeFile = tab.files.find(f => f.id === tab.activeFile);
                    if (activeFile) pgEditorSetValue(tabId, activeFile.code);
                }
                const files = tab.files.filter(f => f.code.trim()).map(f => ({name: f.name, code: f.code}));
                if (!files.length) { pgSetOutput(tabId, '<span class="pg-info"># (sem código)</span>'); return; }
                pg.pyodide.globals.set('_pg_ns', tab._ns);
                pg.pyodide.globals.set('_pg_tab_id', tabId);
                pg.pyodide.globals.set('_pg_files', files);
                const proxy = await pg.pyodide.runPythonAsync('await _pg_exec_async(_pg_files.to_py(), _pg_ns, _pg_tab_id)');
                const result = proxy.toJs();
                proxy.destroy();
                const out = result.get('out') || '';
                const err = result.get('err') || '';
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
                s.onload = resolve;
                s.onerror = () => reject(new Error('Falha ao carregar: ' + url));
                document.head.appendChild(s);
            });
        }

