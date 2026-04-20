// Pyodide Web Worker — Python execution isolated from main window context.
// User code cannot access window, localStorage, or Firebase tokens from here.

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';

const _BOOTSTRAP = `
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
`;

const _FMT_CODE = `
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

let pyodide = null;
let pendingInputResolve = null;
let hasFormat = false;
const _tabNs = {};

// Exposed to Pyodide's js module (worker global scope = self)
self._pgRequestInput = function(tabId, buffered, prompt) {
    return new Promise(resolve => {
        pendingInputResolve = resolve;
        self.postMessage({ type: 'input_request', tabId: String(tabId), buffered: String(buffered), prompt: String(prompt) });
    });
};

self.onmessage = async ({ data }) => {
    const { type, id } = data;

    if (type === 'init') {
        try {
            self.importScripts(PYODIDE_CDN + 'pyodide.js');
            pyodide = await loadPyodide({ indexURL: PYODIDE_CDN });
            pyodide.runPython(_BOOTSTRAP);
            try {
                await pyodide.loadPackage('micropip');
                await pyodide.runPythonAsync(_FMT_CODE);
                hasFormat = pyodide.globals.has('_pg_format');
            } catch(_) {}
            self.postMessage({ type: 'ready', hasFormat });
        } catch (e) {
            self.postMessage({ type: 'init_error', message: e.message });
        }
        return;
    }

    if (type === 'run') {
        const { tabId, files } = data;
        try {
            if (!_tabNs[tabId]) _tabNs[tabId] = pyodide.globals.get('dict')();
            const ns = _tabNs[tabId];

            let outFiles = files;
            if (hasFormat) {
                outFiles = [];
                for (const f of files) {
                    if (f.code.trim()) {
                        pyodide.globals.set('_pg_fmt_src', f.code);
                        const p = pyodide.runPython('_pg_format(_pg_fmt_src)');
                        const r = p.toJs(); p.destroy();
                        outFiles.push({ name: f.name, code: r.get('err') ? f.code : r.get('ok') });
                    } else {
                        outFiles.push(f);
                    }
                }
            }

            pyodide.globals.set('_pg_ns', ns);
            pyodide.globals.set('_pg_tab_id', tabId);
            pyodide.globals.set('_pg_files', outFiles);
            const proxy = await pyodide.runPythonAsync('await _pg_exec_async(_pg_files.to_py(), _pg_ns, _pg_tab_id)');
            const result = proxy.toJs();
            proxy.destroy();
            self.postMessage({ type: 'result', id, out: result.get('out') || '', err: result.get('err') || '', formattedFiles: outFiles });
        } catch (e) {
            self.postMessage({ type: 'run_error', id, message: e.message });
        }
        return;
    }

    if (type === 'input_response') {
        if (pendingInputResolve) {
            pendingInputResolve(data.value);
            pendingInputResolve = null;
        }
        return;
    }

    if (type === 'clear_ns') {
        delete _tabNs[data.tabId];
        return;
    }
};
