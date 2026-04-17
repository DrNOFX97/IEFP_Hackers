# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A static dashboard generator for a CET (Curso de Especialização Tecnológica) in Cybersecurity at IEFP Faro. It reads JSON data files and produces a self-contained `dashboard.html` file with no external dependencies at runtime (all data is embedded as inline JS).

## How to generate the dashboard

```bash
python gerador_dashboard.py
```

Then open `dashboard.html` in a browser. The script reads all matching JSON files from the current directory.

## Data file conventions

The generator uses glob patterns to find data files inside `data/` — adding new monthly schedules or updating UCs just requires dropping in correctly-named files there:

| Pattern | Purpose |
|---|---|
| `data/ucs_*.json` | Unit/course catalogue (codes → descriptions + trainers) |
| `data/horario_*.json` | Monthly schedule (one file per month) |
| `data/cronograma_*.json` | Overall programme schedule (dates, totals, monthly summary) |

Reference documents (PDFs, DOCX, images) live in `docs/`.

## Data schema

**`ucs_*.json`** — array under `unidades_formacao_curta_duracao`:
- `codigo`: UC code (e.g. `"UC01483"`)
- `descricao`: full description shown in the dashboard
- `formador`: trainer name (empty string if not yet assigned)
- `carga_horaria`: total hours for that UC

**`horario_*.json`** — object under `horario`:
- `mes_ano`: display string (e.g. `"abril 2026"`)
- `dias[]`: each day has `data` (ISO), `dia_semana`, `aulas[]` (each with `hora` like `"09:00-10:00"` and `uc` code), and optional `nota` for holidays

**`cronograma_*.json`** — object under `cronograma`:
- Programme metadata (dates, location, room, responsible parties)
- `carga_horaria`: breakdown of base/tecnológica/FCT/total hours
- `resumo_mensal[]`: per-month day/hour totals shown in the sidebar

## Architecture

```
gerador_dashboard.py       # Python driver (~310 lines): loads JSON, assembles and writes dashboard.html
templates/
  dashboard.html           # HTML skeleton (~405 lines): structure only, no CSS/JS
  css/
    variables.css          # :root variables, base reset
    layout.css             # header, sidebar, main layout
    components.css         # schedule, disciplines, UC detail, PDF, progress, auth
    theme.css              # animations, responsive, mobile nav, light theme, week view
    playground.css         # playground editor
    nav-sidebar.css        # new nav sidebar layout
    views.css              # view-specific styles, tablet/phone breakpoints, chat
  js/
    data.js                # __INJECT_*__ markers (UC_MAP, UC_LIST, HORARIOS, CRONOGRAMA, PG_EXAMPLES)
    firebase.js            # Firebase init (db, auth, storage)
    utils.js               # escapeHtml, shortName, calcSessionHours, etc.
    state.js               # global state variables, DOM refs
    views.js               # switchView(), mobile sidebar/more menu
    horario.js             # mergeTimeSlots, renderCronograma, renderHorario, aula state
    disciplinas.js         # renderDisciplines, UC detail, UC schedule
    materials.js           # session materials (Firestore)
    turma.js               # renderTurma, presence/heartbeat
    chat.js                # full-page chat + UC inline chat
    auth.js                # Firebase auth (Google, Microsoft sign-in)
    dashboard.js           # dashboard view, hoje/amanhã, progress, theme toggle, clock
    playground.js          # Python/SQL execution, CodeMirror, file management
    pdf.js                 # PDF generation (list, weekly, UC detail)
    convites.js            # invitation management
    definicoes.js          # settings view
    init.js                # DOMContentLoaded, invite token capture
```

The resulting `dashboard.html` is fully self-contained — no server needed.

**To edit UI/CSS/JS:** edit files in `templates/css/` or `templates/js/`, then re-run the generator.  
**To add a new JS module:** create the file, add it to the `js_files` list in `gerador_dashboard.py`.  
**To add a new data injection point:** add the `__INJECT_FOO__` marker in `js/data.js` and replace it in `gerador_dashboard.py`.

Key JS functions:
- `mergeTimeSlots()` — merges consecutive 1-hour slots of the same UC into one card
- `renderCronograma()` — fills the sidebar with programme-level info
- `renderHorario(index)` — renders the selected month's day cards
- Special case: `UC00602` gets a "Remoto" badge (remote delivery)
- Month selector dropdown is built dynamically from available `HORARIOS` entries

## Adding a new month

1. Create `horario_<month>_<year>.json` following the schema above
2. Re-run `python gerador_dashboard.py`
3. The new month appears automatically in the dropdown
