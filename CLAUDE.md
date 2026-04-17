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

Two-file generator:

- **`gerador_dashboard.py`** (~260 lines) — Python driver: loads JSON data, injects it into the template, writes `dashboard.html`
- **`templates/dashboard.html`** — the full HTML/CSS/JS template (real syntax, no Python escaping). Uses `__INJECT_*__` markers as placeholders:
  - `__INJECT_UC_MAP__` — UC catalogue as a JS object
  - `__INJECT_UC_LIST__` — UC list as a JS array
  - `__INJECT_HORARIOS__` — monthly schedules
  - `__INJECT_CRONOGRAMA__` — programme metadata
  - `__INJECT_PG_EXAMPLES__` — Playground Python examples

The resulting `dashboard.html` is fully self-contained — no server needed.

**Edit the template** (`templates/dashboard.html`) for any UI/JS/CSS changes.  
**Edit the driver** (`gerador_dashboard.py`) for data loading or new injection points.

The HTML/JS side (`templates/dashboard.html`):
- `mergeTimeSlots()` — merges consecutive 1-hour slots of the same UC into one card
- `renderCronograma()` — fills the sidebar with programme-level info
- `renderHorario(index)` — renders the selected month's day cards
- Special case: `UC00602` gets a "Remoto" badge (remote delivery)
- Month selector dropdown is built dynamically from available `HORARIOS` entries

## Adding a new month

1. Create `horario_<month>_<year>.json` following the schema above
2. Re-run `python gerador_dashboard.py`
3. The new month appears automatically in the dropdown
