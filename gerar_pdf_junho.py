"""Gera docs/horario_junho_2026.pdf a partir de data/horario_junho_2026.json"""
import json
from fpdf import FPDF
from fpdf.enums import XPos, YPos

GREEN  = (0, 143, 17)
BLACK  = (5, 5, 5)
WHITE  = (255, 255, 255)
GREY   = (139, 148, 158)
LGREY  = (240, 245, 240)
PURPLE = (137, 87, 229)
PLAV   = (247, 240, 255)

with open('data/horario_junho_2026.json', encoding='utf-8') as f:
    horario = json.load(f)['horario']


def sanitize(text):
    if not text:
        return ''
    text = text.replace('—', '-').replace('–', '-')
    return text.encode('latin-1', errors='replace').decode('latin-1')


def short_name(name):
    if not name:
        return '-'
    parts = name.strip().split()
    if len(parts) <= 2:
        return name
    return parts[0] + ' ' + parts[-1]


def merge_slots(aulas):
    if not aulas:
        return []
    merged = []
    cur = dict(aulas[0])
    for a in aulas[1:]:
        if a['uc'] == cur['uc'] and a.get('formador') == cur.get('formador'):
            end = a['hora'].split('-')[1]
            cur['hora'] = cur['hora'].split('-')[0] + '-' + end
        else:
            merged.append(cur)
            cur = dict(a)
    merged.append(cur)
    return merged


class PDF(FPDF):
    def header(self):
        self.set_fill_color(*BLACK)
        self.rect(0, 0, 210, 36, 'F')
        self.set_fill_color(*GREEN)
        self.rect(0, 34, 210, 2, 'F')
        self.set_fill_color(*GREEN)
        self.rect(10, 6, 22, 22, 'F')
        self.set_font('Helvetica', 'B', 14)
        self.set_text_color(*WHITE)
        self.set_xy(13, 11)
        self.cell(14, 10, 'CET', align='C')
        self.set_font('Helvetica', 'B', 13)
        self.set_xy(36, 9)
        mes = sanitize(horario['mes_ano'].capitalize())
        self.cell(0, 7, 'Horario - ' + mes, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_font('Helvetica', '', 7.5)
        self.set_text_color(*GREY)
        self.set_x(36)
        inst = sanitize((horario.get('instituicao') or 'IEFP Faro') + '  /  ' +
               (horario.get('designacao') or 'CET Ciberseguranca'))
        self.cell(0, 5, inst, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_x(36)
        self.cell(0, 5, sanitize(horario.get('modalidade') or ''),
                  new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(4)

    def footer(self):
        self.set_y(-11)
        self.set_fill_color(*GREEN)
        self.rect(0, self.h - 3, 210, 3, 'F')
        self.set_font('Helvetica', '', 7)
        self.set_text_color(150, 150, 150)
        from datetime import date
        today = date.today().strftime('%d/%m/%Y')
        self.cell(0, 6,
                  'Gerado em ' + today + '  /  Pagina ' + str(self.page_no()) + ' de {nb}',
                  align='C')


pdf = PDF()
pdf.alias_nb_pages()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)

COL     = [22, 14, 26, 20, 75, 35]
HEADERS = ['Data', 'Dia', 'Horario', 'UC', 'Disciplina', 'Formador']


def draw_table_header():
    pdf.set_fill_color(*GREEN)
    pdf.set_text_color(*WHITE)
    pdf.set_font('Helvetica', 'B', 8)
    for w, h in zip(COL, HEADERS):
        pdf.cell(w, 7, h, border=1, fill=True, align='C')
    pdf.ln()


draw_table_header()
row_num = 0

for dia in horario['dias']:
    aulas = dia.get('aulas', [])
    nota  = dia.get('nota', '')
    data  = dia['data'][8:] + '/' + dia['data'][5:7]

    if not aulas and not nota:
        continue

    if not aulas and nota:
        pdf.set_fill_color(*PLAV)
        pdf.set_text_color(*PURPLE)
        pdf.set_font('Helvetica', 'I', 7.5)
        pdf.cell(COL[0], 6, sanitize(data), border=1, fill=True)
        pdf.cell(COL[1], 6, sanitize(dia['dia_semana']), border=1, fill=True)
        pdf.cell(sum(COL[2:]), 6, sanitize(nota), border=1, fill=True)
        pdf.ln()
        row_num += 1
        if row_num % 30 == 0:
            draw_table_header()
        continue

    merged = merge_slots(aulas)
    for i, aula in enumerate(merged):
        fill = row_num % 2 == 1
        pdf.set_fill_color(*(LGREY if fill else WHITE))
        pdf.set_text_color(30, 30, 30)

        pdf.set_font('Helvetica', 'B' if i == 0 else '', 7.5)
        pdf.cell(COL[0], 6, sanitize(data) if i == 0 else '', border=1, fill=fill)
        pdf.cell(COL[1], 6, sanitize(dia['dia_semana']) if i == 0 else '', border=1, fill=fill)

        pdf.set_text_color(*GREEN)
        pdf.set_font('Helvetica', 'B', 7.5)
        pdf.cell(COL[2], 6, sanitize(aula.get('hora', '')), border=1, fill=fill)

        pdf.set_text_color(30, 30, 30)
        pdf.set_font('Helvetica', '', 7.5)
        pdf.cell(COL[3], 6, sanitize(aula.get('uc', '')), border=1, fill=fill)
        desc = sanitize((aula.get('descricao') or aula.get('uc') or '')[:48])
        pdf.cell(COL[4], 6, desc, border=1, fill=fill)
        pdf.cell(COL[5], 6, sanitize(short_name(aula.get('formador', ''))), border=1, fill=fill)
        pdf.ln()

    row_num += 1
    if row_num % 30 == 0:
        draw_table_header()

pdf.output('docs/horario_junho_2026.pdf')
print('PDF gerado: docs/horario_junho_2026.pdf')