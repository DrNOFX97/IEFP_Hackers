import json
import os
import glob

def get_latest_file(pattern):
    files = glob.glob(pattern)
    return files[0] if files else None

def main():
    print("A gerar o dashboard...")

    # 1. Load UCs
    uc_file = get_latest_file('data/ucs_*.json')
    uc_map = {}
    uc_list = []
    if uc_file:
        with open(uc_file, 'r', encoding='utf-8') as f:
            ucs_data = json.load(f)
            if 'unidades_formacao_curta_duracao' in ucs_data:
                uc_list = ucs_data['unidades_formacao_curta_duracao']
                uc_map = {item['codigo']: {'descricao': item['descricao'], 'formador': item.get('formador', ''), 'carga_horaria': item.get('carga_horaria'), 'modalidade': item.get('modalidade', '')} for item in uc_list}
    else:
        print("Aviso: Ficheiro de UCs não encontrado.")

    # 2. Load Horários
    horario_files = glob.glob('data/horario_*.json')
    horarios = []
    for hf in horario_files:
        try:
            with open(hf, 'r', encoding='utf-8') as f:
                h_data = json.load(f)
                if 'horario' in h_data:
                    horarios.append(h_data['horario'])
        except Exception as e:
            print(f"Erro ao ler {hf}: {e}")

    # 3. Load Cronograma
    crono_file = get_latest_file('data/cronograma_*.json')
    cronograma = {}
    if crono_file:
        with open(crono_file, 'r', encoding='utf-8') as f:
            crono_data = json.load(f)
            cronograma = crono_data.get('cronograma', {})

    # Serialize to insert into JS
    js_uc_map = json.dumps(uc_map, ensure_ascii=False)
    js_uc_list = json.dumps(uc_list, ensure_ascii=False)
    js_horarios = json.dumps(horarios, ensure_ascii=False)
    js_cronograma = json.dumps(cronograma, ensure_ascii=False)

    # Playground Python examples (com comentários linha a linha)
    def ex(label, lines):
        return {'label': label, 'code': '\n'.join(lines)}

    py_examples = [
        ex('👋 Olá Mundo', [
            '# ── Olá Mundo ─────────────────────────────────────────',
            '# O programa mais simples em Python.',
            '# print() escreve texto no ecrã.',
            '',
            'print("Olá, Mundo!")              # imprime uma saudação',
            'print("Python", 3.12, "a correr") # print aceita vários valores separados por vírgula',
            '',
            'nome = "Cibersegurança"           # variável do tipo string (texto)',
            'print(f"Bem-vindo ao curso de {nome}!")  # f-string: insere variável dentro de texto',
        ]),
        ex('🧮 Calculadora', [
            '# ── Calculadora ────────────────────────────────────────',
            '# Lê dois números do utilizador e calcula as 4 operações.',
            '# input() lê texto; float() converte para número decimal.',
            '',
            'a = float(input("Primeiro número: "))   # lê e converte para float',
            'b = float(input("Segundo número: "))    # lê e converte para float',
            '',
            'print(f"Soma:       {a + b}")           # adição',
            'print(f"Diferença:  {a - b}")           # subtracção',
            'print(f"Produto:    {a * b}")           # multiplicação',
            '',
            'if b != 0:                              # evitar divisão por zero',
            '    print(f"Divisão:    {a / b:.4f}")  # :.4f = 4 casas decimais',
            'else:',
            '    print("Divisão por zero não é possível")',
        ]),
        ex('🔄 FizzBuzz', [
            '# ── FizzBuzz ────────────────────────────────────────────',
            '# Clássico exercício de lógica com loops e condições.',
            '# Para cada número de 1 a 20:',
            '#   múltiplo de 15 → "FizzBuzz"',
            '#   múltiplo de 3  → "Fizz"',
            '#   múltiplo de 5  → "Buzz"',
            '#   caso contrário → o número',
            '',
            'for i in range(1, 21):         # range(1,21) gera 1,2,...,20',
            '    if i % 15 == 0:            # % é o resto da divisão (módulo)',
            '        print("FizzBuzz")      # divisível por 3 E por 5',
            '    elif i % 3 == 0:           # elif = "senão se"',
            '        print("Fizz")          # divisível só por 3',
            '    elif i % 5 == 0:',
            '        print("Buzz")          # divisível só por 5',
            '    else:',
            '        print(i)               # nenhum dos casos anteriores',
        ]),
        ex('🔢 Fibonacci', [
            '# ── Sequência de Fibonacci ─────────────────────────────',
            '# Cada número é a soma dos dois anteriores: 0 1 1 2 3 5 8...',
            '# Demonstra: funções, loops, múltipla atribuição.',
            '',
            'def fibonacci(n):              # definição de função com parâmetro n',
            '    a, b = 0, 1               # múltipla atribuição: a=0, b=1',
            '    for _ in range(n):        # _ significa "variável que não uso"',
            '        print(a, end=" ")     # end=" " imprime espaço em vez de newline',
            '        a, b = b, a + b       # avança: novo a=b, novo b=a+b',
            '    print()                   # newline no final',
            '',
            'fibonacci(15)                 # chamar a função com n=15',
        ]),
        ex('📋 Listas & Dicts', [
            '# ── Listas e Dicionários ───────────────────────────────',
            '# Dicionário: pares chave→valor (como um mapa ou tabela).',
            '# Lista: sequência ordenada de elementos.',
            '',
            'alunos = {"Ana": 18, "Rui": 16, "Sofia": 19}  # dicionário nome→nota',
            '',
            'for nome, nota in alunos.items():  # .items() devolve pares (chave, valor)',
            '    # operador ternário: valor_se_verdade if condição else valor_se_falso',
            '    status = "Aprovado" if nota >= 10 else "Reprovado"',
            '    print(f"{nome}: {nota} — {status}")',
            '',
            '# sum() soma todos os valores; len() conta o nº de elementos',
            'media = sum(alunos.values()) / len(alunos)',
            'print(f"Média da turma: {media:.1f}")  # :.1f = 1 casa decimal',
        ]),
        ex('🔁 Recursividade', [
            '# ── Factorial com Recursividade ────────────────────────',
            '# Uma função é recursiva quando se chama a si própria.',
            '# Factorial: 5! = 5 × 4 × 3 × 2 × 1 = 120',
            '',
            'def fatorial(n):           # função que recebe um inteiro',
            '    if n <= 1:             # caso base: pára a recursão',
            '        return 1           # 0! = 1! = 1 (por definição)',
            '    return n * fatorial(n - 1)  # caso recursivo: n × (n-1)!',
            '',
            '# Testar para n de 1 a 10',
            'for i in range(1, 11):',
            '    print(f"{i}! = {fatorial(i)}")',
        ]),
        ex('🔐 Caesar Cipher', [
            '# ── Cifra de César ─────────────────────────────────────',
            '# Cifra clássica: desloca cada letra X posições no alfabeto.',
            '# Ex: chave=3 → A→D, B→E, Z→C (roda no fim do alfabeto).',
            '',
            'def caesar(texto, chave):',
            '    resultado = ""',
            '    for c in texto:                        # percorre cada caracter',
            '        if c.isalpha():                    # só transforma letras',
            '            # base = posição de "A" ou "a" na tabela ASCII',
            '            base = ord("A") if c.isupper() else ord("a")',
            '            # ord() → código numérico   chr() → caracter',
            '            # % 26 garante que "roda" no fim do alfabeto',
            '            resultado += chr((ord(c) - base + chave) % 26 + base)',
            '        else:',
            '            resultado += c                 # espaços e pontuação ficam iguais',
            '    return resultado',
            '',
            'msg   = input("Mensagem: ")',
            'chave = int(input("Chave (1-25): "))       # int() converte string para inteiro',
            'enc   = caesar(msg, chave)',
            'print(f"Cifrado:   {enc}")',
            'print(f"Decifrado: {caesar(enc, -chave)}") # chave negativa desfaz a cifra',
        ]),
        ex('#️⃣ Hash SHA-256', [
            '# ── Hash SHA-256 ────────────────────────────────────────',
            '# Uma hash é uma "impressão digital" de dados.',
            '# Qualquer alteração no texto muda completamente a hash.',
            '# SHA-256 produz sempre 256 bits (64 caracteres hex).',
            '',
            'import hashlib             # módulo da stdlib para funções de hash',
            '',
            'texto = input("Texto para fazer hash: ")',
            '',
            '# .encode() converte string → bytes (SHA-256 só aceita bytes)',
            '# .hexdigest() devolve a hash em hexadecimal (0-9, a-f)',
            'h = hashlib.sha256(texto.encode()).hexdigest()',
            '',
            'print(f"SHA-256:  {h}")',
            'print(f"Tamanho:  {len(h)} caracteres hex = {len(h)*4} bits")',
            '',
            '# Experimenta: muda uma letra e vê como a hash muda completamente!',
        ]),
        ex('🔑 Base64', [
            '# ── Codificação Base64 ──────────────────────────────────',
            '# Base64 converte dados binários em texto ASCII legível.',
            '# Usado em emails, JWTs, URLs, certificados digitais.',
            '# NÃO é criptografia — qualquer um pode decodificar!',
            '',
            'import base64              # módulo da stdlib para Base64',
            '',
            'texto = input("Texto para codificar: ")',
            '',
            '# .encode()     → string para bytes (UTF-8)',
            '# b64encode()   → bytes para Base64 (ainda bytes)',
            '# .decode()     → bytes para string legível',
            'enc = base64.b64encode(texto.encode()).decode()',
            'print(f"Base64:  {enc}")',
            '',
            '# Processo inverso: Base64 → bytes → string',
            'dec = base64.b64decode(enc).decode()',
            'print(f"Decoded: {dec}")',
            '',
            'print(f"Tamanho original: {len(texto)} chars → codificado: {len(enc)} chars")',
        ]),
        ex('🏗️ Classes (OOP)', [
            '# ── Classes e Programação Orientada a Objectos ──────────',
            '# Uma classe é um molde para criar objectos.',
            '# Cada objecto tem atributos (dados) e métodos (funções).',
            '',
            'class Pessoa:              # definição da classe',
            '    # __init__ é o construtor: corre quando criamos um objecto',
            '    # self referencia o próprio objecto (como "this" noutras linguagens)',
            '    def __init__(self, nome, idade):',
            '        self.nome  = nome   # atributo de instância',
            '        self.idade = idade  # atributo de instância',
            '',
            '    def saudacao(self):    # método: função dentro da classe',
            '        return f"Olá! Sou {self.nome}, tenho {self.idade} anos."',
            '',
            '    def aniversario(self): # outro método',
            '        self.idade += 1    # modifica o estado do objecto',
            '        print(f"Feliz aniversário {self.nome}! Agora tens {self.idade} anos.")',
            '',
            '# Criar instâncias (objectos) da classe',
            'p1 = Pessoa("Alice", 25)   # chama __init__ com nome="Alice", idade=25',
            'p2 = Pessoa("Bob", 30)',
            '',
            'print(p1.saudacao())       # chamar um método',
            'print(p2.saudacao())',
            'p1.aniversario()           # modifica p1.idade para 26',
            'print(f"Idade da Alice agora: {p1.idade}")',
        ]),
    ]
    js_py_examples = json.dumps(py_examples, ensure_ascii=False)
    html_template = f"""<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Cibersegurança</title>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-storage-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-functions-compat.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
    <style>
        :root {{
            --bg-color: #050505;
            --surface-color: #0d0d0d;
            --surface-color-hover: #1a1a1a;
            --border-color: #1b3320;
            --text-primary: #00ff41;
            --text-secondary: #2f8c47;
            --accent-color: #00ff41;
            --accent-glow: rgba(0, 255, 65, 0.4);
            --gradient-accent: linear-gradient(135deg, #008f11 0%, #00ff41 100%);
            --holiday-color: #8957e5;
            --glass-bg: rgba(5, 5, 5, 0.85);
            --success-color: #3fb950;
            --warning-color: #d29922;
        }}

        * {{ box-sizing: border-box; margin: 0; padding: 0; }}

        body {{
            font-family: 'Fira Code', monospace;
            background-color: var(--bg-color);
            color: var(--text-primary);
            line-height: 1.6;
            background-image:
                radial-gradient(ellipse at top left, rgba(0, 143, 17, 0.15), transparent 40%),
                radial-gradient(ellipse at bottom right, rgba(137, 87, 229, 0.1), transparent 40%);
            min-height: 100vh;
            background-size: 100% 100%, 100% 100%, 100% 4px;
            background-image: radial-gradient(ellipse at top left, rgba(0, 255, 65, 0.1), transparent 40%), radial-gradient(ellipse at bottom right, rgba(0, 143, 17, 0.1), transparent 40%), linear-gradient(to bottom, rgba(0, 255, 65, 0.03) 1px, transparent 1px);
        }}

        .container {{
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
            display: grid;
            grid-template-columns: 350px 1fr;
            gap: 2rem;
            align-items: start;
        }}

        /* ── APP HEADER ── */
        .app-header {{
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(5, 5, 5, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-color);
        }}
        .app-header::after {{
            content: '';
            position: absolute;
            bottom: -1px; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, var(--accent-color) 50%, transparent 100%);
            opacity: 0.35;
        }}
        .app-header-inner {{
            max-width: 1400px;
            margin: 0 auto;
            padding: 0.5rem 2rem;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
        }}
        .app-header-row1 {{
            display: flex;
            align-items: center;
            justify-content: center;
        }}
        .app-header-row2 {{
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: space-between;
        }}

        /* Brand */
        .app-brand {{
            display: flex;
            align-items: center;
            gap: 0.65rem;
            flex-shrink: 0;
            text-decoration: none;
        }}
        .app-logo {{
            width: 34px; height: 34px;
            background: var(--gradient-accent);
            border-radius: 9px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.1rem;
            box-shadow: 0 0 12px rgba(0,255,65,0.3);
            flex-shrink: 0;
        }}
        .app-brand-text {{ display: flex; flex-direction: column; gap: 0; }}
        .app-title {{
            font-size: 0.95rem;
            font-weight: 700;
            color: #fff;
            letter-spacing: -0.01em;
            line-height: 1.2;
        }}
        .app-sub {{
            font-size: 0.68rem;
            color: var(--text-secondary);
            font-weight: 500;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            line-height: 1;
        }}

        /* Vertical divider */
        .app-divider {{
            width: 1px; height: 22px;
            background: var(--border-color);
            flex-shrink: 0;
        }}

        /* Central nav */
        .app-nav {{
            display: flex;
            gap: 0.2rem;
            flex: 1;
            justify-content: center;
        }}
        .app-nav-btn {{
            background: none;
            border: none;
            color: var(--text-secondary);
            padding: 0.45rem 1.1rem;
            border-radius: 8px;
            font-family: 'Fira Code', monospace;
            font-size: 0.88rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.18s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            position: relative;
            white-space: nowrap;
        }}
        .app-nav-btn:hover {{
            background: var(--surface-color-hover);
            color: var(--text-primary);
        }}
        .app-nav-btn.active {{
            background: rgba(0,255,65,0.12);
            color: var(--accent-color);
            font-weight: 600;
        }}
        .app-nav-btn.active::after {{
            content: '';
            position: absolute;
            bottom: -14px;
            left: 50%; transform: translateX(-50%);
            width: 20px; height: 2px;
            background: var(--accent-color);
            border-radius: 2px;
        }}

        /* Right controls */
        .app-controls {{
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-shrink: 0;
            margin-left: auto;
        }}
        .month-selector {{
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }}
        .month-selector label {{
            font-size: 0.72rem;
            color: var(--text-secondary);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }}
        .month-selector select {{
            background: var(--surface-color);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
            padding: 0.32rem 0.6rem;
            border-radius: 7px;
            font-family: 'Fira Code', monospace;
            font-size: 0.82rem;
            cursor: pointer;
            outline: none;
            transition: border-color 0.2s;
        }}
        .month-selector select:focus {{ border-color: var(--accent-color); }}
        .app-clock {{
            font-size: 0.78rem;
            font-weight: 600;
            color: var(--text-secondary);
            font-variant-numeric: tabular-nums;
            white-space: nowrap;
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            padding: 0.32rem 0.75rem;
            border-radius: 7px;
        }}

        /* ── GLASS PANEL ── */
        .panel {{
            background: var(--glass-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }}

        /* ── SIDEBAR ── */
        .sidebar {{
            position: sticky;
            top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            animation: fetchInLeft 0.8s ease-out;
        }}

        h2 {{
            font-size: 1.3rem;
            color: #fff;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }}
        h2::before {{
            content: '';
            display: block;
            width: 4px;
            height: 20px;
            background: var(--accent-color);
            border-radius: 4px;
        }}

        .info-list {{ list-style: none; }}
        .info-list li {{
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
        }}
        .info-list li:last-child {{ border-bottom: none; margin-bottom: 0; padding-bottom: 0; }}
        .info-label {{ font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.2rem; }}
        .info-val {{ font-size: 1.05rem; font-weight: 500; color: #fff; }}

        .resumo-table {{ margin-top: 1rem; font-size: 0.9rem; }}
        .resumo-row {{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }}
        .resumo-row.highlight {{ color: var(--accent-color); font-weight: 600; }}
        .resumo-row div:nth-child(2), .resumo-row div:nth-child(3) {{ text-align: right; color: inherit; }}

        /* ── MAIN CONTENT ── */
        .main-content {{ animation: fetchInRight 0.8s ease-out; }}

        /* ── SCHEDULE ── */
        .schedule-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
        }}

        .day-card {{
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease;
        }}
        .day-card:hover {{ border-color: var(--accent-color); box-shadow: 0 0 15px var(--accent-glow); transform: translateY(-2px); }}

        .day-header {{
            background: rgba(255,255,255,0.03);
            padding: 1rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        .day-date {{ font-weight: 600; font-size: 1.1rem; color: #fff; }}

        .badge {{
            background: rgba(0, 255, 65, 0.1);
            color: var(--accent-color);
            padding: 0.25rem 0.6rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.05em;
        }}
        .badge.remote {{ background: rgba(46, 204, 113, 0.15); color: #2ecc71; border: 1px solid rgba(46, 204, 113, 0.3); }}

        .day-body {{ padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }}

        .aula-card {{
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
            padding: 0.75rem;
            border-left: 3px solid var(--accent-color);
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: all 0.2s ease;
        }}
        .aula-card.clickable {{ cursor: pointer; }}
        .aula-card.clickable:hover {{
            background: rgba(0, 255, 65, 0.08);
            border-left-color: #50ff7a;
            transform: translateX(2px);
        }}
        .holiday {{ border-left-color: var(--holiday-color); }}
        .empty-card {{ border-left: 3px solid var(--border-color); opacity: 0.6; }}
        .aula-card.past {{ border-left-color: #444; opacity: 0.4; filter: grayscale(0.9); }}
        .aula-card.current {{ border-left-color: #f0c040; background: rgba(240,192,64,0.07); box-shadow: 0 0 14px rgba(240,192,64,0.3); }}
        .aula-card.current .aula-desc, .aula-card.current .aula-time {{ color: #f0c040; }}
        .aula-card.remote {{
            border-left-color: #2ecc71;
            background: rgba(46,204,113,0.07);
            border-style: dashed;
        }}
        .aula-card.remote .aula-desc {{ color: #2ecc71; }}
        .aula-card.remote.clickable:hover {{ background: rgba(46,204,113,0.14); border-left-color: #5fdc91; }}
        .aula-card.remote.past {{ border-left-color: #1a5e36; background: transparent; }}
        .aula-card.remote.past .aula-desc {{ color: inherit; }}

        .aula-time {{ font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); white-space: nowrap; }}
        .aula-info {{ display: flex; flex-direction: column; gap: 0.25rem; flex: 1; }}
        .aula-desc {{ font-size: 0.95rem; font-weight: 500; color: var(--text-primary); }}
        .aula-uc.badge {{ align-self: flex-start; background: rgba(255,255,255,0.05); color: var(--text-secondary); margin-top: 5px; }}

        .open-uc-btn {{
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 6px;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            flex-shrink: 0;
            opacity: 0;
        }}
        .aula-card.clickable:hover .open-uc-btn {{ opacity: 1; color: var(--accent-color); }}

        .empty-state {{
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem 2rem;
            background: var(--surface-color);
            border-radius: 12px;
            border: 1px dashed var(--border-color);
            color: var(--text-secondary);
        }}

        /* ── DISCIPLINES VIEW ── */
        #view-disciplinas {{ display: none; }}

        .disciplines-header {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
        }}

        .uc-search {{
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            width: 220px;
            outline: none;
            transition: border-color 0.2s;
        }}
        .uc-search:focus {{ border-color: var(--accent-color); }}
        .uc-search::placeholder {{ color: var(--text-secondary); }}

        .disciplines-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1rem;
        }}

        .uc-card {{
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1.25rem;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            position: relative;
            overflow: hidden;
        }}
        .uc-card::before {{
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 4px; height: 100%;
            background: var(--accent-color);
            opacity: 0;
            transition: opacity 0.2s;
        }}
        .uc-card:hover {{ border-color: var(--accent-color); box-shadow: 0 0 15px var(--accent-glow); transform: translateY(-2px); }}
        .uc-card:hover::before {{ opacity: 1; }}

        .uc-card-code {{
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--accent-color);
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }}
        .uc-card-name {{
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--text-primary);
            line-height: 1.4;
        }}
        .uc-card-meta {{
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-top: auto;
        }}
        .uc-meta-tag {{
            background: rgba(255,255,255,0.05);
            color: var(--text-secondary);
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
            font-size: 0.75rem;
        }}
        .uc-has-notes {{ background: rgba(63,185,80,0.15); color: var(--success-color); }}
        .uc-has-materials {{ background: rgba(0,255,65,0.15); color: var(--accent-color); }}

        /* ── UC DETAIL VIEW ── */
        #view-uc-detail {{ display: none; }}
        #view-session-detail {{ display: none; }}

        .detail-header {{
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }}
        .back-btn {{
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            flex-shrink: 0;
        }}
        .back-btn:hover {{ border-color: var(--accent-color); color: var(--accent-color); }}

        .detail-title-block {{ flex: 1; }}
        .detail-uc-code {{ font-size: 0.85rem; color: var(--accent-color); font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.25rem; }}
        .detail-uc-name {{ font-size: 1.4rem; font-weight: 600; color: #fff; line-height: 1.3; }}
        .detail-uc-meta {{ display: flex; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap; }}
        .detail-meta-pill {{
            background: rgba(255,255,255,0.06);
            color: var(--text-secondary);
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.82rem;
        }}

        .detail-layout {{
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 1.5rem;
        }}

        /* Notes */
        .notes-panel {{ display: flex; flex-direction: column; gap: 1rem; }}
        .notes-toolbar {{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }}
        .notes-saved-indicator {{
            font-size: 0.78rem;
            color: var(--success-color);
            opacity: 0;
            transition: opacity 0.4s;
        }}
        .notes-saved-indicator.visible {{ opacity: 1; }}
        .notes-textarea {{
            width: 100%;
            min-height: 340px;
            background: rgba(0,0,0,0.3);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-primary);
            padding: 1rem;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            line-height: 1.7;
            resize: vertical;
            outline: none;
            transition: border-color 0.2s;
        }}
        .notes-textarea:focus {{ border-color: var(--accent-color); }}
        .notes-textarea::placeholder {{ color: var(--text-secondary); }}

        /* Materials */
        .materials-panel {{ display: flex; flex-direction: column; gap: 1rem; }}

        .add-material-form {{
            background: rgba(0,0,0,0.2);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }}
        .form-row {{ display: flex; gap: 0.5rem; }}
        .form-input {{
            flex: 1;
            background: rgba(0,0,0,0.3);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 0.45rem 0.75rem;
            border-radius: 7px;
            font-family: 'Fira Code', monospace;
            font-size: 0.88rem;
            outline: none;
            transition: border-color 0.2s;
        }}
        .form-input:focus {{ border-color: var(--accent-color); }}
        .form-input::placeholder {{ color: var(--text-secondary); }}
        .form-select {{
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 0.45rem 0.6rem;
            border-radius: 7px;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            cursor: pointer;
            outline: none;
        }}
        .form-select:focus {{ border-color: var(--accent-color); }}

        .btn-primary {{
            background: rgba(0,255,65,0.15);
            border: 1px solid rgba(0,255,65,0.3);
            color: var(--accent-color);
            padding: 0.45rem 1rem;
            border-radius: 7px;
            font-family: 'Fira Code', monospace;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
        }}
        .btn-primary:hover {{ background: rgba(0,255,65,0.25); }}

        .file-drop-zone {{
            border: 1px dashed var(--border-color);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.82rem;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
        }}
        .file-drop-zone:hover, .file-drop-zone.drag-over {{
            border-color: var(--accent-color);
            background: rgba(0,255,65,0.05);
            color: var(--accent-color);
        }}
        .file-drop-zone input[type="file"] {{
            position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%;
        }}

        .materials-list {{ display: flex; flex-direction: column; gap: 0.6rem; overflow: hidden; min-width: 0; }}
        .material-video-wrap {{
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
            background: #000;
        }}
        .material-video-header {{
            display: flex; align-items: center; gap: 0.75rem;
            padding: 0.65rem 1rem;
            background: rgba(0,0,0,0.3);
            cursor: pointer;
            user-select: none;
        }}
        .material-video-header:hover {{ background: rgba(0,0,0,0.45); }}
        .material-video-toggle {{ font-size: 0.75rem; color: var(--text-secondary); margin-left: auto; flex-shrink:0; }}
        .material-video-player {{
            display: none;
            width: 100%;
            max-height: 360px;
            background: #000;
        }}
        .material-video-player.open {{ display: block; }}
        .material-video-player video {{
            width: 100%;
            max-height: 360px;
            display: block;
        }}
        .material-video-actions {{ display: flex; gap: 0.4rem; flex-shrink: 0; }}
        .material-item {{
            background: rgba(0,0,0,0.2);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            transition: border-color 0.2s;
            overflow: hidden;
            min-width: 0;
            width: 100%;
            box-sizing: border-box;
        }}
        .material-item:hover {{ border-color: rgba(0,255,65,0.4); }}
        .material-item.clickable-card {{ cursor: pointer; }}
        .material-item.clickable-card:hover {{ border-color: rgba(0,255,65,0.6); background: rgba(0,255,65,0.04); }}
        .material-icon {{ font-size: 1.2rem; flex-shrink: 0; }}
        .material-info {{ flex: 1; min-width: 0; overflow: hidden; }}
        .material-label {{ font-size: 0.9rem; font-weight: 500; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; }}
        .material-url {{ font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; max-width: 100%; }}
        .material-actions {{ display: flex; gap: 0.4rem; flex-shrink: 0; }}
        .material-btn {{
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.3rem;
            border-radius: 5px;
            font-size: 0.85rem;
            transition: background 0.2s;
            color: var(--text-secondary);
        }}
        .material-btn:hover {{ background: var(--surface-color-hover); }}
        .material-btn.delete:hover {{ color: #f85149; }}
        .material-btn.open:hover {{ color: var(--accent-color); }}

        /* ── PDF THUMBNAIL ── */
        .material-item.pdf-thumb {{
            cursor: pointer;
            flex-direction: column;
            gap: 0;
            padding: 0;
            overflow: hidden;
        }}
        .material-item.pdf-thumb:hover {{ border-color: rgba(0,255,65,0.5); transform: translateY(-1px); }}
        .pdf-thumb-preview {{
            width: 100%;
            height: 90px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            border-bottom: 1px solid var(--border-color);
        }}
        .pdf-thumb-footer {{
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.55rem 0.75rem;
            width: 100%;
        }}
        .pdf-thumb-footer .material-info {{ min-width: 0; flex: 1; }}
        .pdf-thumb-meta {{ font-size: 0.7rem; color: var(--text-secondary); }}

        /* ── PDF MODAL ── */
        .pdf-modal-overlay {{
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.85);
            z-index: 9999;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }}
        .pdf-modal-overlay.open {{ display: flex; }}
        .pdf-modal-box {{
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            width: min(900px, 100%);
            height: min(90vh, 800px);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }}
        .pdf-modal-header {{
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--border-color);
            flex-shrink: 0;
        }}
        .pdf-modal-title {{
            flex: 1;
            font-weight: 600;
            font-size: 0.9rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--text-primary);
        }}
        .pdf-modal-actions {{ display: flex; gap: 0.5rem; flex-shrink: 0; }}
        .pdf-modal-btn {{
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 0.35rem 0.75rem;
            font-size: 0.82rem;
            cursor: pointer;
            color: var(--text-primary);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            transition: background 0.2s;
        }}
        .pdf-modal-btn:hover {{ background: var(--surface-color-hover); }}
        .pdf-modal-btn.close:hover {{ color: #f85149; }}
        .pdf-modal-frame {{
            flex: 1;
            width: 100%;
            border: none;
            background: #525659;
        }}

        /* ── UC SCHEDULE SECTION ── */
        .uc-schedule-section {{
            background: var(--glass-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 1.5rem;
        }}
        .uc-schedule-header {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
        }}
        .uc-schedule-header h2 {{
            margin-bottom: 0;
            font-size: 1.1rem;
        }}
        .uc-total-hours {{
            font-size: 0.8rem;
            color: var(--text-secondary);
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--border-color);
            padding: 0.25rem 0.65rem;
            border-radius: 20px;
        }}
        .schedule-month-group {{ margin-bottom: 1rem; }}
        .schedule-month-group:last-child {{ margin-bottom: 0; }}
        .schedule-month-label {{
            font-size: 0.72rem;
            font-weight: 700;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 0.5rem;
        }}
        .session-list {{
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 0.5rem;
            padding-bottom: 0.4rem;
            scrollbar-width: thin;
        }}
        .session-nav-strip {{
            position: sticky;
            top: 0;
            z-index: 10;
            background: var(--bg-color);
            border-bottom: 1px solid var(--border-color);
            padding: 0.6rem 0 0.6rem 0;
            margin-bottom: 1rem;
        }}
        .session-nav-strip .session-list {{ padding-bottom: 0; }}
        .session-chip {{
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.3rem 0.7rem;
            border-radius: 20px;
            border: 1px solid var(--border-color);
            background: rgba(0,0,0,0.2);
            font-size: 0.78rem;
            transition: border-color 0.2s, opacity 0.2s;
            white-space: nowrap;
            flex-shrink: 0;
            cursor: pointer;
        }}
        .session-chip:hover {{ border-color: rgba(0,255,65,0.4); opacity: 1 !important; filter: none !important; }}
        .session-chip.past {{ opacity: 0.45; filter: grayscale(0.6); }}
        .session-chip.current {{
            border-color: #f0c040;
            background: rgba(240,192,64,0.08);
        }}
        .session-chip.active-session {{
            border-color: var(--accent-color);
            background: rgba(0,255,65,0.08);
        }}
        .session-chip-num {{ font-weight: 700; color: var(--accent-color); }}
        .session-chip.current .session-chip-num {{ color: #f0c040; }}
        .session-chip.active-session .session-chip-num {{ color: var(--accent-color); }}
        .session-chip.past .session-chip-num {{ color: var(--text-secondary); }}
        .session-chip-date {{ color: var(--text-secondary); font-size: 0.7rem; }}
        .session-chip.current .session-chip-date {{ color: #f0c040; }}
        .session-chip.active-session .session-chip-date {{ color: var(--text-primary); }}
        .no-sessions-msg {{
            font-size: 0.85rem;
            color: var(--text-secondary);
            font-style: italic;
        }}

        .no-materials {{
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.88rem;
            padding: 1.5rem;
            border: 1px dashed var(--border-color);
            border-radius: 8px;
        }}

        /* ── PDF DOWNLOAD BUTTON ── */
        .btn-pdf {{
            display: flex;
            align-items: center;
            gap: 0.4rem;
            background: rgba(0,255,65,0.1);
            border: 1px solid rgba(0,255,65,0.25);
            color: var(--accent-color);
            padding: 0.4rem 0.9rem;
            border-radius: 8px;
            font-family: 'Fira Code', monospace;
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
        }}
        .btn-pdf:hover {{
            background: rgba(0,255,65,0.2);
            border-color: rgba(0,255,65,0.5);
            box-shadow: 0 0 10px rgba(0,255,65,0.2);
        }}
        .btn-pdf:active {{ transform: scale(0.97); }}
        .btn-pdf.loading {{ opacity: 0.6; pointer-events: none; }}
        .pdf-group {{ display: flex; gap: 0.3rem; }}
        .schedule-toolbar {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 0 1rem;
            gap: 1rem;
            flex-wrap: wrap;
            position: sticky;
            top: -2rem;
            margin: -2rem -2.5rem 0;
            padding: 1.5rem 2.5rem 1rem;
            background: var(--bg-color);
            z-index: 50;
            border-bottom: 1px solid var(--border-color);
        }}
        .schedule-controls {{
            display: flex;
            align-items: center;
            gap: 0.6rem;
            flex-shrink: 0;
        }}
        .schedule-filter {{
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 0.38rem 0.75rem;
            border-radius: 8px;
            font-family: 'Fira Code', monospace;
            font-size: 0.84rem;
            width: 200px;
            outline: none;
            transition: border-color 0.2s, width 0.3s;
        }}
        .schedule-filter:focus {{ border-color: var(--accent-color); width: 240px; }}
        .schedule-filter::placeholder {{ color: var(--text-secondary); }}
        .view-toggle {{
            display: flex;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
        }}
        .view-toggle-btn {{
            background: none;
            border: none;
            color: var(--text-secondary);
            padding: 0.38rem 0.6rem;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.18s;
            line-height: 1;
        }}
        .view-toggle-btn:hover {{ background: var(--surface-color-hover); color: var(--text-primary); }}
        .view-toggle-btn.active {{ background: rgba(0,255,65,0.15); color: var(--accent-color); }}
        .aula-card.filtered-out {{ opacity: 0.15; filter: grayscale(1); pointer-events: none; }}

        /* ── ANIMATIONS ── */
        @keyframes fadeInDown {{ from {{ opacity: 0; transform: translateY(-20px); }} to {{ opacity: 1; transform: translateY(0); }} }}
        @keyframes fetchInLeft {{ from {{ opacity: 0; transform: translateX(-20px); }} to {{ opacity: 1; transform: translateX(0); }} }}
        @keyframes fetchInRight {{ from {{ opacity: 0; transform: translateX(20px); }} to {{ opacity: 1; transform: translateX(0); }} }}
        @keyframes fadeIn {{ from {{ opacity: 0; }} to {{ opacity: 1; }} }}

        /* Sidebar hidden — main content takes full width */
        .sidebar.sidebar-hidden {{ display: none; }}
        .container.no-sidebar {{ grid-template-columns: 1fr; }}

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {{
            .container {{ grid-template-columns: 1fr; }}
            .sidebar {{ position: relative; top: 0; }}
            .detail-layout {{ grid-template-columns: 1fr; }}
        }}

        /* ── MOBILE NAV ── */
        .mobile-nav {{ display: none; }}

        @media (max-width: 680px) {{
            /* Compact header on small screens */
            .app-header-inner {{ padding: 0 1rem; height: 52px; gap: 0.75rem; }}
            .app-nav {{ justify-content: flex-start; }}
            .app-brand-text .app-sub {{ display: none; }}
            .app-controls .month-selector label {{ display: none; }}
            .app-clock {{ display: none; }}
            .app-nav-btn.active::after {{ bottom: -11px; }}
        }}

        @media (max-width: 600px) {{
            body {{ padding-bottom: 72px; }}
            .container {{ padding: 0.9rem 0.75rem; gap: 0.9rem; }}
            .app-nav {{ display: none; }}   /* Nav moves to bottom tab bar on mobile */
            .sidebar {{ gap: 0.9rem; animation: none; }}
            .sidebar.mobile-hidden, .main-content.mobile-hidden {{ display: none !important; }}
            .panel {{ padding: 1rem; border-radius: 12px; }}
            h2 {{ font-size: 1rem; }}
            .schedule-grid {{ grid-template-columns: 1fr; gap: 0.85rem; }}
            .main-content {{ animation: none; }}
            .day-card {{ border-radius: 10px; }}
            .day-header {{ padding: 0.75rem 1rem; }}
            .day-date {{ font-size: 0.95rem; }}
            .day-body {{ padding: 0.75rem; gap: 0.6rem; }}
            .aula-card {{ padding: 0.6rem 0.75rem; gap: 0.75rem; border-radius: 8px; }}
            .aula-desc {{ font-size: 0.88rem; }}
            .aula-time {{ font-size: 0.78rem; }}
            .resumo-row {{ font-size: 0.82rem; padding: 0.4rem 0; }}
            .info-list li {{ margin-bottom: 0.75rem; padding-bottom: 0.75rem; }}
            .info-val {{ font-size: 0.95rem; }}
            .info-label {{ font-size: 0.75rem; }}
            .disciplines-grid {{ grid-template-columns: 1fr; }}
            .detail-layout {{ grid-template-columns: 1fr; }}
            .open-uc-btn {{ opacity: 1; }}

            .mobile-nav {{
                display: flex;
                position: fixed; bottom: 0; left: 0; right: 0;
                background: rgba(5, 5, 5, 0.98);
                border-top: 1px solid var(--border-color);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                z-index: 200;
                padding: 0.4rem 0.5rem;
                gap: 0.4rem;
            }}
            .mobile-nav-btn {{
                flex: 1; background: none; border: none;
                color: var(--text-secondary); padding: 0.5rem 0.25rem;
                border-radius: 10px; font-family: 'Fira Code', monospace;
                cursor: pointer; transition: all 0.2s ease;
                display: flex; flex-direction: column; align-items: center; gap: 0.15rem;
                -webkit-tap-highlight-color: transparent;
            }}
            .mobile-nav-btn.active {{ background: rgba(0, 255, 65, 0.12); color: var(--accent-color); }}
            .mobile-nav-btn .nav-icon {{ font-size: 1.25rem; line-height: 1; }}
            .mobile-nav-btn .nav-label {{ font-size: 0.65rem; font-weight: 600; letter-spacing: 0.03em; }}
        }}

        /* ── LIGHT THEME ── */
        [data-theme="light"] {{
            --bg-color: #f6f8fa;
            --surface-color: #ffffff;
            --surface-color-hover: #f0f2f4;
            --border-color: #c8d3da;
            --text-primary: #1a7f37;
            --text-secondary: #57606a;
            --accent-color: #1a7f37;
            --accent-glow: rgba(26, 127, 55, 0.2);
            --gradient-accent: linear-gradient(135deg, #1a7f37 0%, #2da44e 100%);
            --holiday-color: #6e40c9;
            --glass-bg: rgba(255, 255, 255, 0.92);
            --success-color: #1a7f37;
            --warning-color: #9a6700;
        }}
        [data-theme="light"] body {{
            background-image:
                radial-gradient(ellipse at top left, rgba(26,127,55,0.06), transparent 40%),
                radial-gradient(ellipse at bottom right, rgba(26,127,55,0.04), transparent 40%),
                linear-gradient(to bottom, rgba(26,127,55,0.02) 1px, transparent 1px);
        }}
        [data-theme="light"] .app-header {{ background: rgba(246,248,250,0.97); }}
        [data-theme="light"] .app-title {{ color: #24292f; }}
        [data-theme="light"] .aula-card {{ background: rgba(0,0,0,0.03); }}
        [data-theme="light"] .aula-card.clickable:hover {{ background: rgba(26,127,55,0.06); }}
        [data-theme="light"] .aula-card.current {{ background: rgba(240,192,64,0.12); }}
        [data-theme="light"] .aula-desc {{ color: #24292f; }}
        [data-theme="light"] .info-val {{ color: #24292f; }}
        [data-theme="light"] .notes-textarea {{
            background: rgba(0,0,0,0.03); color: #24292f;
            border-color: var(--border-color);
        }}
        [data-theme="light"] .notes-textarea::placeholder {{ color: #8c959f; }}
        [data-theme="light"] .add-material-form {{ background: rgba(0,0,0,0.03); }}
        [data-theme="light"] .form-input {{ background: rgba(0,0,0,0.04); color: #24292f; }}
        [data-theme="light"] .form-select {{ background: var(--surface-color); color: #24292f; }}
        [data-theme="light"] .material-item {{ background: rgba(0,0,0,0.03); }}
        [data-theme="light"] .material-video-header {{ background: rgba(0,0,0,0.06); }}
        [data-theme="light"] .material-video-header:hover {{ background: rgba(0,0,0,0.1); }}
        [data-theme="light"] .material-label {{ color: #24292f; }}
        [data-theme="light"] .week-aula-card {{ background: rgba(0,0,0,0.04); }}
        [data-theme="light"] .week-aula-card.clickable:hover {{ background: rgba(26,127,55,0.08); }}
        [data-theme="light"] .week-day-header {{ background: #f6f8fa; }}
        [data-theme="light"] .week-label {{ background: #f0f2f4; color: #57606a; }}
        [data-theme="light"] .uc-card-name {{ color: #24292f; }}
        [data-theme="light"] .detail-uc-name {{ color: #24292f; }}
        [data-theme="light"] .session-chip {{ background: rgba(0,0,0,0.04); }}
        [data-theme="light"] .uc-meta-tag {{ background: rgba(0,0,0,0.06); }}
        [data-theme="light"] .resumo-row {{ border-bottom-color: rgba(0,0,0,0.07); }}
        [data-theme="light"] .app-divider {{ background: #d0d7de; }}
        [data-theme="light"] .mobile-nav {{ background: rgba(246,248,250,0.98); }}
        [data-theme="light"] .empty-card {{ background: rgba(0,0,0,0.02); }}
        [data-theme="light"] .day-date {{ color: #24292f; }}
        [data-theme="light"] .week-aula-desc {{ color: #24292f; }}
        [data-theme="light"] .file-drop-zone {{ color: #57606a; }}

        /* ── THEME TOGGLE & NOTIF BUTTONS ── */
        .theme-toggle-btn, .notif-btn {{
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: 7px;
            padding: 0.3rem 0.5rem;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.18s;
            line-height: 1;
            color: var(--text-secondary);
        }}
        .theme-toggle-btn:hover, .notif-btn:hover {{
            border-color: var(--accent-color);
            color: var(--accent-color);
        }}
        .notif-btn.active {{ color: var(--accent-color); border-color: var(--accent-color); }}
        .notif-btn.denied {{ opacity: 0.4; cursor: not-allowed; }}

        /* ── UC DETAIL PDF BUTTON ── */
        .btn-pdf-uc {{
            padding: 0.28rem 0.65rem;
            font-size: 0.75rem;
        }}

        /* ── WEEK VIEW ── */
        .schedule-grid.week-view {{ display: flex; flex-direction: column; gap: 1.25rem; }}
        .week-block {{
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
        }}
        .week-label {{
            font-size: 0.72rem;
            font-weight: 700;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.07em;
            padding: 0.5rem 1rem;
            background: rgba(255,255,255,0.02);
            border-bottom: 1px solid var(--border-color);
        }}
        .week-days {{
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            min-width: 0;
            overflow-x: auto;
        }}
        .week-day-col {{
            border-right: 1px solid var(--border-color);
            min-width: 120px;
        }}
        .week-day-col:last-child {{ border-right: none; }}
        .week-day-col.no-class {{ opacity: 0.35; }}
        .week-day-col.col-hidden {{ opacity: 0.1; }}
        .week-day-col.today .week-day-header {{
            background: rgba(0,255,65,0.08);
            border-bottom-color: rgba(0,255,65,0.3);
        }}
        .week-day-col.today .week-day-name {{ color: var(--accent-color); }}
        .week-day-header {{
            padding: 0.5rem 0.75rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        .week-day-name {{ font-size: 0.78rem; font-weight: 700; color: var(--text-secondary); }}
        .week-day-date {{ font-size: 0.75rem; color: var(--text-secondary); }}
        .week-day-body {{ padding: 0.5rem; display: flex; flex-direction: column; gap: 0.4rem; min-height: 60px; }}
        .week-aula-card {{
            background: rgba(0,0,0,0.25);
            border-left: 3px solid var(--accent-color);
            border-radius: 6px;
            padding: 0.4rem 0.5rem;
            cursor: default;
            transition: all 0.2s;
        }}
        .week-aula-card.clickable {{ cursor: pointer; }}
        .week-aula-card.clickable:hover {{ background: rgba(0,255,65,0.08); }}
        .week-aula-card.past {{ border-left-color: #444; opacity: 0.4; filter: grayscale(0.9); }}
        .week-aula-card.current {{ border-left-color: #f0c040; background: rgba(240,192,64,0.07); }}
        .week-aula-card.holiday {{ border-left-color: var(--holiday-color); }}
        .week-aula-card.filtered-out {{ opacity: 0.1; filter: grayscale(1); pointer-events: none; }}
        .week-aula-card.remote {{ border-left-color: #2ecc71; background: rgba(46,204,113,0.07); }}
        .week-aula-card.remote .week-aula-desc {{ color: #2ecc71; }}
        .week-aula-card.remote.clickable:hover {{ background: rgba(46,204,113,0.14); border-left-color: #5fdc91; }}
        .week-aula-card.remote.past {{ border-left-color: #1a5e36; background: transparent; opacity: 0.4; }}
        .week-aula-card.remote.past .week-aula-desc {{ color: inherit; }}
        .week-aula-time {{ font-size: 0.68rem; font-weight: 700; color: var(--accent-color); margin-bottom: 0.15rem; }}
        .week-aula-card.current .week-aula-time {{ color: #f0c040; }}
        .week-aula-desc {{ font-size: 0.75rem; font-weight: 500; color: var(--text-primary); line-height: 1.3; }}
        .week-aula-uc {{ font-size: 0.65rem; color: var(--text-secondary); margin-top: 0.15rem; }}
        @media (max-width: 680px) {{
            .schedule-filter {{ width: 140px; font-size: 0.78rem; }}
            .schedule-filter:focus {{ width: 160px; }}
        }}
        @media (max-width: 600px) {{
            .schedule-controls {{ gap: 0.4rem; }}
            .schedule-filter {{ width: 120px; }}
            .week-day-col {{ min-width: 100px; }}
        }}

        /* ── HOJE PANEL ── */
        .hoje-empty {{
            font-size: 0.85rem;
            color: var(--text-secondary);
            font-style: italic;
        }}
        .hoje-list {{ list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }}
        .hoje-item {{
            display: flex;
            align-items: flex-start;
            gap: 0.65rem;
            padding: 0.45rem 0.65rem;
            border-radius: 8px;
            background: rgba(0,0,0,0.2);
            border-left: 3px solid var(--accent-color);
        }}
        .hoje-item.past {{ border-left-color: #444; opacity: 0.45; }}
        .hoje-item.current {{ border-left-color: #f0c040; background: rgba(240,192,64,0.07); }}
        .hoje-item.holiday {{ border-left-color: var(--holiday-color); }}
        .hoje-time {{
            font-size: 0.76rem; font-weight: 700;
            color: var(--accent-color); white-space: nowrap; padding-top: 0.1rem;
        }}
        .hoje-item.current .hoje-time {{ color: #f0c040; }}
        .hoje-info {{ display: flex; flex-direction: column; gap: 0.1rem; }}
        .hoje-desc {{ font-size: 0.83rem; font-weight: 500; color: var(--text-primary); line-height: 1.3; }}
        .hoje-uc {{ font-size: 0.7rem; color: var(--text-secondary); }}

        /* ── PROGRESS BARS ── */
        .progress-wrap {{
            height: 6px;
            background: rgba(255,255,255,0.07);
            border-radius: 4px;
            overflow: hidden;
            position: relative;
        }}
        .progress-fill {{
            height: 100%;
            background: var(--accent-color);
            border-radius: 4px;
            transition: width 0.6s ease;
            box-shadow: 0 0 6px rgba(0,255,65,0.4);
        }}
        .global-progress-label {{
            display: flex;
            justify-content: space-between;
            font-size: 0.78rem;
            margin-bottom: 0.4rem;
        }}
        .global-progress-label span:first-child {{ color: #fff; font-weight: 600; }}
        .global-progress-label span:last-child {{ color: var(--text-secondary); }}
        .progress-sub {{
            font-size: 0.68rem;
            color: var(--text-secondary);
            margin-top: 0.3rem;
            opacity: 0.7;
        }}
        #global-progress-wrap {{
            border-top: 1px solid var(--border-color);
            padding-top: 1rem;
            margin-top: 1rem;
        }}

        /* ── UC CARD PROGRESS ── */
        .uc-progress-wrap {{ margin: 0.15rem 0 0.1rem; }}
        .uc-progress-bar {{
            height: 4px;
            background: rgba(255,255,255,0.06);
            border-radius: 3px;
            overflow: hidden;
            position: relative;
        }}
        .uc-progress-sched {{
            position: absolute; top: 0; left: 0; height: 100%;
            background: rgba(0,255,65,0.22);
            border-radius: 3px;
        }}
        .uc-progress-done {{
            position: absolute; top: 0; left: 0; height: 100%;
            background: var(--accent-color);
            border-radius: 3px;
            box-shadow: 0 0 4px rgba(0,255,65,0.35);
        }}
        .uc-progress-label {{
            font-size: 0.68rem;
            color: var(--text-secondary);
            margin-top: 0.25rem;
        }}
        /* ── AUTH GATE ───────────────────────────────────────────── */
        #auth-gate {{
            position: fixed; inset: 0; z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            background: var(--bg-color);
        }}
        .auth-card {{
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 1rem;
            padding: 3rem 2.5rem;
            text-align: center;
            max-width: 380px;
            width: 90%;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }}
        .auth-logo {{ font-size: 3rem; margin-bottom: 1rem; }}
        .auth-title {{ font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem; }}
        .auth-sub {{ font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.5; }}
        .auth-btn {{
            background: #fff; color: #333;
            border: 1px solid #ddd; border-radius: 0.5rem;
            padding: 0.7rem 1.5rem; font-size: 0.88rem; font-weight: 600;
            cursor: pointer; width: 100%; font-family: inherit;
            display: flex; align-items: center; justify-content: center;
            transition: background 0.15s, box-shadow 0.15s;
            margin-bottom: 0.6rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }}
        .auth-btn:hover {{ background: #f5f5f5; box-shadow: 0 2px 6px rgba(0,0,0,0.18); }}
        /* User chip in header */
        .user-chip {{
            display: flex; align-items: center; gap: 0.5rem;
            font-size: 0.78rem; color: var(--text-secondary);
            background: var(--card-bg); border: 1px solid var(--border-color);
            border-radius: 2rem; padding: 0.3rem 0.8rem;
            cursor: pointer; transition: border-color 0.2s;
        }}
        .user-chip:hover {{ border-color: var(--accent-color); color: var(--text-primary); }}
        .user-chip-avatar {{ width: 1.4rem; height: 1.4rem; border-radius: 50%; background: var(--accent-color); color: #000; font-size: 0.65rem; font-weight: 700; display: flex; align-items: center; justify-content: center; }}
        /* ── PLAYGROUND ── */
        #view-playground {{ display: none; height: 100%; flex-direction: column; }}
        .pg-ascii-title {{
            flex-shrink: 0;
            text-align: center;
            padding: 1.1rem 0.5rem 0.6rem;
            overflow-x: auto;
        }}
        .pg-ascii-title pre {{
            display: inline-block;
            font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
            font-size: clamp(0.28rem, 0.9vw, 0.62rem);
            line-height: 1.15;
            color: #39d353;
            text-shadow: 0 0 12px rgba(57,211,83,0.45);
            margin: 0;
            white-space: pre;
            letter-spacing: 0;
        }}
        .pg-wrap {{
            display: flex;
            flex-direction: column;
            flex: 1;
            min-height: 0;
            background: #0d1117;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
        }}
        /* Tab bar */
        .pg-tabbar-outer {{
            display: flex;
            align-items: center;
            background: #161b22;
            border-bottom: 1px solid #30363d;
            flex-shrink: 0;
        }}
        .pg-tabbar {{
            display: flex;
            align-items: center;
            gap: 0.2rem;
            padding: 0 0.5rem;
            flex: 1;
            overflow-x: auto;
            overflow-y: visible;
            min-width: 0;
        }}
        .pg-tab {{
            display: flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.45rem 0.85rem;
            border-radius: 6px 6px 0 0;
            cursor: pointer;
            font-size: 0.82rem;
            color: #8b949e;
            white-space: nowrap;
            border: 1px solid transparent;
            border-bottom: none;
            margin-top: 4px;
            transition: color 0.15s, background 0.15s;
            user-select: none;
        }}
        .pg-tab:hover {{ color: #e6edf3; background: #1c2128; }}
        .pg-tab.active {{
            color: #e6edf3;
            background: #0d1117;
            border-color: #30363d;
        }}
        .pg-tab-close {{
            font-size: 0.75rem;
            color: #484f58;
            padding: 0 0.1rem;
            border-radius: 3px;
        }}
        .pg-tab-close:hover {{ color: #f85149; background: rgba(248,81,73,0.15); }}
        .pg-add-wrap {{ position: relative; padding: 0 0.5rem; flex-shrink: 0; }}
        .pg-add-btn {{
            background: none;
            border: 1px solid #30363d;
            border-radius: 6px;
            color: #8b949e;
            font-size: 0.85rem;
            padding: 0.3rem 0.6rem;
            cursor: pointer;
            white-space: nowrap;
        }}
        .pg-add-btn:hover {{ color: #e6edf3; background: #1c2128; }}
        .pg-add-menu {{
            display: none;
            position: absolute;
            top: calc(100% + 4px);
            left: 0;
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 8px;
            overflow: hidden;
            z-index: 100;
            min-width: 180px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }}
        .pg-add-menu.open {{ display: block; }}
        .pg-add-item {{
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
            color: #e6edf3;
            cursor: pointer;
            transition: background 0.15s;
        }}
        .pg-add-item:hover {{ background: #1c2128; }}
        /* Panels */
        .pg-panel {{ display: none; flex: 1; flex-direction: column; overflow: hidden; }}
        .pg-panel.active {{ display: flex; }}
        /* Python: toolbar no topo, editor + output lado a lado */
        .pg-editor-wrap {{
            display: flex;
            flex-direction: column;
            flex: 1;
            overflow: hidden;
        }}
        .pg-editor-body {{
            display: flex;
            flex-direction: row;
            flex: 1;
            overflow: hidden;
            min-height: 0;
        }}
        .pg-editor-pane {{
            flex: 6;
            display: flex;
            flex-direction: column;
            min-width: 0;
            overflow: hidden;
        }}
        .pg-output-pane {{
            flex: 4;
            display: flex;
            flex-direction: column;
            min-width: 0;
            overflow: hidden;
            border-left: 3px solid #21262d;
        }}
        .pg-output-header {{
            background: #161b22;
            color: #8b949e;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            padding: 0.35rem 1rem;
            border-bottom: 1px solid #30363d;
            flex-shrink: 0;
        }}
        .pg-editor {{
            flex: 1;
            background: #0d1117;
            color: #e6edf3;
            font-family: inherit;
            font-size: 0.9rem;
            border: none;
            outline: none;
            resize: none;
            padding: 1rem 1.25rem;
            tab-size: 4;
            line-height: 1.6;
            min-height: 0;
        }}
        /* CodeMirror host */
        .pg-editor-cm {{
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            min-height: 0;
        }}
        .pg-editor-cm .CodeMirror {{
            flex: 1;
            height: 100%;
            font-family: 'JetBrains Mono', 'Fira Mono', 'Consolas', monospace;
            font-size: 0.88rem;
            line-height: 1.6;
            background: #282a36;
        }}
        .pg-editor-cm .CodeMirror-scroll {{
            min-height: 0;
        }}
        .pg-toolbar {{
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.5rem 1rem;
            background: #161b22;
            border-bottom: 1px solid #30363d;
            flex-shrink: 0;
        }}
        .pg-run-btn {{
            background: #238636;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 0.35rem 1rem;
            font-size: 0.85rem;
            cursor: pointer;
            font-family: inherit;
            font-weight: 600;
        }}
        .pg-run-btn:hover {{ background: #2ea043; }}
        .pg-run-btn:disabled {{ background: #1a3a1f; color: #3fb950; cursor: wait; }}
        .pg-clear-btn {{
            background: none;
            color: #8b949e;
            border: 1px solid #30363d;
            border-radius: 6px;
            padding: 0.35rem 0.75rem;
            font-size: 0.82rem;
            cursor: pointer;
            font-family: inherit;
        }}
        .pg-clear-btn:hover {{ color: #e6edf3; background: #1c2128; }}
        .pg-hint {{
            font-size: 0.75rem;
            color: #484f58;
            margin-left: auto;
        }}
        .pg-output {{
            flex: 1;
            background: #010409;
            color: #3fb950;
            font-size: 0.88rem;
            padding: 0.75rem 1.25rem;
            overflow-y: auto;
            white-space: pre-wrap;
            word-break: break-word;
            line-height: 1.5;
        }}
        .pg-output .pg-err {{ color: #f85149; }}
        .pg-output .pg-info {{ color: #58a6ff; }}
        .pg-inline-input {{
            background: transparent;
            border: none;
            border-bottom: 1px solid #58a6ff;
            color: #e6edf3;
            outline: none;
            font-family: inherit;
            font-size: 0.88rem;
            width: 220px;
            caret-color: #58a6ff;
            margin: 0 2px;
        }}
        .pg-examples-wrap {{ position: relative; }}
        .pg-examples-btn {{
            background: none;
            color: #8b949e;
            border: 1px solid #30363d;
            border-radius: 6px;
            padding: 0.35rem 0.75rem;
            font-size: 0.82rem;
            cursor: pointer;
            font-family: inherit;
        }}
        .pg-examples-btn:hover {{ color: #e6edf3; background: #1c2128; }}
        .pg-examples-menu {{
            display: none;
            position: absolute;
            top: calc(100% + 4px);
            left: 0;
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 8px;
            overflow: hidden;
            z-index: 100;
            min-width: 220px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }}
        .pg-examples-menu.open {{ display: block; }}
        .pg-examples-item {{
            padding: 0.5rem 1rem;
            cursor: pointer;
            font-size: 0.83rem;
            color: #c9d1d9;
            white-space: nowrap;
        }}
        .pg-examples-item:hover {{ background: #1c2128; color: #58a6ff; }}
        /* Inner file tabbar */
        .pg-filetabs {{
            display: flex; align-items: center;
            background: #010409; border-bottom: 1px solid #21262d;
            flex-shrink: 0; overflow-x: auto; overflow-y: visible;
        }}
        .pg-filetab {{
            display: flex; align-items: center; gap: 0.3rem;
            padding: 0.3rem 0.75rem;
            font-size: 0.78rem; color: #8b949e;
            cursor: pointer; white-space: nowrap;
            border-right: 1px solid #21262d;
            border-bottom: 2px solid transparent;
            user-select: none;
        }}
        .pg-filetab:hover {{ color: #c9d1d9; background: #0d1117; }}
        .pg-filetab.active {{ color: #e6edf3; border-bottom-color: #3fb950; background: #0d1117; }}
        .pg-filetab-name {{ outline: none; background: transparent; border: none;
            color: inherit; font: inherit; cursor: pointer; min-width: 20px; }}
        .pg-filetab-name:focus {{ border-bottom: 1px dashed #58a6ff; cursor: text; }}
        .pg-filetab-close {{
            font-size: 0.7rem; color: #484f58; padding: 0 2px;
            border-radius: 3px; line-height: 1;
        }}
        .pg-filetab-close:hover {{ color: #f85149; background: rgba(248,81,73,0.15); }}
        .pg-filetab-add {{
            padding: 0.3rem 0.6rem; font-size: 0.8rem;
            color: #484f58; cursor: pointer;
        }}
        .pg-filetab-add:hover {{ color: #58a6ff; }}
        /* SQL: editor + history */
        .pg-repl {{
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            min-height: 0;
        }}
        .pg-repl-body {{
            display: flex;
            flex-direction: row;
            flex: 1;
            overflow: hidden;
            min-height: 0;
        }}
        .pg-repl-editor-pane {{
            flex: 6;
            display: flex;
            flex-direction: column;
            min-width: 0;
            overflow: hidden;
        }}
        .pg-repl-editor-pane .pg-editor-cm {{
            flex: 1;
        }}
        .pg-repl-history-pane {{
            flex: 4;
            display: flex;
            flex-direction: column;
            min-width: 0;
            overflow: hidden;
            border-left: 3px solid #21262d;
        }}
        .pg-repl-history-header {{
            background: #161b22;
            color: #8b949e;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            padding: 0.35rem 1rem;
            border-bottom: 1px solid #30363d;
            flex-shrink: 0;
        }}
        .pg-repl-history {{
            flex: 1;
            overflow-y: auto;
            padding: 0.75rem 1.25rem;
            color: #e6edf3;
            font-size: 0.88rem;
            line-height: 1.6;
            white-space: pre-wrap;
            word-break: break-word;
        }}
        .pg-repl-entry {{ margin-bottom: 0.5rem; }}
        .pg-repl-prompt {{ color: #58a6ff; }}
        .pg-repl-out {{ color: #3fb950; }}
        .pg-repl-err {{ color: #f85149; }}
        .pg-repl-tbl {{ color: #e6edf3; font-size: 0.84rem; }}
        /* legacy single-line input (kept for fallback) */
        .pg-repl-inputrow {{
            display: none;
        }}
        .pg-repl-ps {{ color: #58a6ff; font-size: 0.88rem; white-space: nowrap; }}
        .pg-repl-input {{
            flex: 1;
            background: none;
            border: none;
            outline: none;
            color: #e6edf3;
            font-family: inherit;
            font-size: 0.88rem;
        }}
        #pg-panels {{
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            min-height: 0;
        }}
        .pg-empty {{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 0.75rem;
            color: #484f58;
            font-family: inherit;
            font-size: 0.9rem;
        }}
        .pg-empty-hint {{ font-size: 0.8rem; color: #30363d; }}

        /* ── NEW LAYOUT: NAV SIDEBAR ── */
        body {{ overflow: hidden; }}
        .app-shell {{
            display: flex;
            height: 100vh;
            overflow: hidden;
        }}
        .nav-sidebar {{
            width: 220px;
            min-width: 220px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            background: var(--surface-color);
            border-right: 1px solid var(--border-color);
            position: fixed;
            left: 0; top: 0;
            z-index: 200;
        }}
        .nav-brand {{
            padding: 1.1rem 1rem 1rem;
            border-bottom: 1px solid var(--border-color);
            display: flex; align-items: center; gap: 0.65rem;
            flex-shrink: 0;
        }}
        .nav-logo {{
            width: 32px; height: 32px;
            background: var(--gradient-accent);
            border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1rem;
            box-shadow: 0 0 10px rgba(0,255,65,0.25);
            flex-shrink: 0;
        }}
        .nav-brand-text {{ display: flex; flex-direction: column; gap: 0; overflow: hidden; }}
        .nav-brand-title {{
            font-size: 0.8rem; font-weight: 700; color: #fff; line-height: 1.2;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }}
        .nav-brand-sub {{
            font-size: 0.6rem; color: var(--text-secondary); font-weight: 500;
            letter-spacing: 0.06em; text-transform: uppercase; line-height: 1;
        }}
        .nav-items {{
            flex: 1; display: flex; flex-direction: column;
            padding: 0.6rem 0.5rem; gap: 0.15rem; overflow-y: auto;
        }}
        .nav-item {{
            display: flex; align-items: center; gap: 0.6rem;
            padding: 0.55rem 0.75rem; border-radius: 8px;
            border: none; background: none;
            color: var(--text-secondary);
            font-family: 'Fira Code', monospace; font-size: 0.83rem; font-weight: 500;
            cursor: pointer; transition: all 0.15s ease;
            text-align: left; width: 100%; position: relative;
        }}
        .nav-item:hover {{ background: var(--surface-color-hover); color: var(--text-primary); }}
        .nav-item.active {{ background: rgba(0,255,65,0.1); color: var(--accent-color); font-weight: 600; }}
        .nav-item.active::before {{
            content: ''; position: absolute; left: 0; top: 20%; bottom: 20%;
            width: 3px; background: var(--accent-color); border-radius: 0 3px 3px 0;
        }}
        .nav-item-icon {{ font-size: 0.95rem; line-height: 1; flex-shrink: 0; }}
        .nav-item-badge {{
            margin-left: auto; background: #ff4444; color: #fff;
            border-radius: 10px; font-size: 0.6rem; font-weight: 700;
            min-width: 1rem; height: 1rem;
            display: none; align-items: center; justify-content: center; padding: 0 3px;
        }}
        .nav-divider {{ height: 1px; background: var(--border-color); margin: 0.35rem 0.5rem; }}
        .nav-footer {{
            border-top: 1px solid var(--border-color);
            padding: 0.5rem 0.5rem 0.6rem;
            display: flex; flex-direction: column; gap: 0.2rem; flex-shrink: 0;
        }}
        .nav-user-info {{
            display: flex; align-items: center; gap: 0.55rem;
            padding: 0.4rem 0.75rem; border-radius: 8px; overflow: hidden;
        }}
        .nav-user-avatar {{
            width: 26px; height: 26px; border-radius: 50%;
            background: var(--gradient-accent);
            display: flex; align-items: center; justify-content: center;
            font-size: 0.65rem; font-weight: 700; color: #000; flex-shrink: 0;
        }}
        .nav-user-name {{
            font-size: 0.78rem; font-weight: 500; color: var(--text-primary);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }}
        .nav-clock {{
            font-size: 0.7rem; font-weight: 600; color: var(--text-secondary);
            font-variant-numeric: tabular-nums;
            padding: 0.15rem 0.75rem; opacity: 0.7;
        }}
        .nav-item.signout {{ color: #f85149 !important; }}
        .nav-item.signout:hover {{ background: rgba(248,81,73,0.1); }}

        /* App content */
        .app-content {{
            margin-left: 220px; flex: 1;
            height: 100vh; overflow-y: auto;
            padding: 2rem 2.5rem;
        }}
        .app-content::-webkit-scrollbar {{ width: 5px; }}
        .app-content::-webkit-scrollbar-thumb {{ background: var(--border-color); border-radius: 5px; }}

        /* Dashboard view */
        #view-dashboard {{ display: none; max-width: 920px; }}
        #view-turma {{ display: none; max-width: 640px; }}
        .dash-greeting h1 {{
            font-size: 1.6rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem;
        }}
        .dash-greeting .dash-date {{
            font-size: 0.83rem; color: var(--text-secondary); margin-bottom: 2rem;
        }}
        .dash-section-label {{
            font-size: 0.68rem; font-weight: 700; color: var(--text-secondary);
            text-transform: uppercase; letter-spacing: 0.1em;
            margin-bottom: 0.9rem; margin-top: 2rem;
            display: flex; align-items: center; gap: 0.6rem;
        }}
        .dash-section-label:first-of-type {{ margin-top: 0; }}
        .dash-section-label::after {{ content: ''; flex: 1; height: 1px; background: var(--border-color); }}

        /* Turma chips */
        .turma-grid {{
            display: flex; flex-wrap: wrap; gap: 0.6rem;
        }}
        .turma-chip {{
            display: flex; align-items: center; gap: 0.5rem;
            background: var(--surface-color); border: 1px solid var(--border-color);
            border-radius: 20px; padding: 0.3rem 0.75rem 0.3rem 0.35rem;
            font-size: 0.8rem; color: var(--text-primary);
        }}
        .turma-chip-avatar {{
            width: 22px; height: 22px; border-radius: 50%;
            background: var(--gradient-accent);
            display: flex; align-items: center; justify-content: center;
            font-size: 0.6rem; font-weight: 700; color: #000;
            flex-shrink: 0;
        }}
        .turma-chip-avatar img {{ width: 22px; height: 22px; border-radius: 50%; object-fit: cover; }}
        .turma-chip.online {{ border-color: var(--accent-color); }}

        /* Chat full-page view */
        #view-chat {{
            display: none; flex-direction: column;
            height: 100%; width: 100%; max-width: 100%;
        }}
        #view-chat h2 {{ margin-bottom: 1.25rem; }}
        .chat-view-body {{
            flex: 1; min-height: 0; display: flex; flex-direction: column;
            border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;
        }}
        .chat-view-msgs {{
            flex: 1; overflow-y: auto; padding: 1rem;
            display: flex; flex-direction: column; gap: 0.55rem;
            scroll-behavior: smooth;
        }}
        .chat-view-msgs::-webkit-scrollbar {{ width: 4px; }}
        .chat-view-msgs::-webkit-scrollbar-thumb {{ background: var(--border-color); border-radius: 4px; }}
        .chat-view-input-row {{
            display: flex; gap: 0.5rem; padding: 0.6rem 0.75rem;
            border-top: 1px solid var(--border-color);
            background: var(--surface-color);
        }}

        /* Definições view */
        #view-definicoes {{ display: none; max-width: 580px; }}
        #view-definicoes h2 {{ margin-bottom: 1.5rem; }}
        .settings-section {{
            background: var(--surface-color); border: 1px solid var(--border-color);
            border-radius: 12px; padding: 1.1rem 1.4rem; margin-bottom: 1.1rem;
        }}
        .settings-section-title {{
            font-size: 0.65rem; font-weight: 700; color: var(--text-secondary);
            text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.9rem;
        }}
        .settings-row {{
            display: flex; align-items: center; justify-content: space-between;
            padding: 0.55rem 0; border-bottom: 1px solid var(--border-color);
        }}
        .settings-row:last-child {{ border-bottom: none; }}
        .settings-row-label {{ font-size: 0.85rem; color: var(--text-primary); }}
        .settings-row-sub {{ font-size: 0.7rem; color: var(--text-secondary); margin-top: 0.1rem; }}

        /* ── Convites ── */
        #invite-section {{ display: none; }}
        .invite-btn-row {{ display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1rem; }}
        .invite-btn {{
            padding: 0.45rem 0.9rem; border-radius: 8px; font-size: 0.78rem; font-weight: 600;
            cursor: pointer; border: 1px solid var(--accent-color); color: var(--accent-color);
            background: rgba(0,255,65,0.07); transition: background 0.15s;
        }}
        .invite-btn:hover {{ background: rgba(0,255,65,0.15); }}
        .invite-card {{
            background: var(--bg-color); border: 1px solid var(--border-color);
            border-radius: 10px; padding: 0.9rem 1rem; margin-bottom: 0.7rem;
        }}
        .invite-card.revoked {{ opacity: 0.45; }}
        .invite-card-header {{ display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.6rem; }}
        .invite-type-badge {{
            font-size: 0.68rem; font-weight: 700; padding: 0.2rem 0.55rem;
            border-radius: 20px; text-transform: uppercase; letter-spacing: 0.06em;
        }}
        .invite-type-badge.individual {{ background: rgba(52,152,219,0.15); color: #3498db; border: 1px solid rgba(52,152,219,0.3); }}
        .invite-type-badge.turma     {{ background: rgba(0,255,65,0.1);    color: var(--accent-color); border: 1px solid rgba(0,255,65,0.25); }}
        .invite-status-badge {{
            font-size: 0.68rem; padding: 0.2rem 0.55rem; border-radius: 20px;
        }}
        .invite-status-badge.active  {{ background: rgba(0,255,65,0.1); color: var(--accent-color); }}
        .invite-status-badge.revoked {{ background: rgba(100,100,100,0.2); color: #666; }}
        .invite-status-badge.used    {{ background: rgba(240,192,64,0.12); color: #f0c040; }}
        .invite-meta {{ font-size: 0.72rem; color: var(--text-secondary); margin-bottom: 0.7rem; }}
        .invite-actions {{ display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }}
        .invite-action-btn {{
            padding: 0.25rem 0.65rem; border-radius: 6px; font-size: 0.72rem; font-weight: 600;
            cursor: pointer; border: 1px solid var(--border-color); color: var(--text-secondary);
            background: transparent; transition: all 0.15s;
        }}
        .invite-action-btn:hover {{ border-color: var(--accent-color); color: var(--accent-color); }}
        .invite-action-btn.danger {{ border-color: var(--red); color: var(--red); }}
        .invite-action-btn.danger:hover {{ background: rgba(248,81,73,0.1); }}
        .invite-qr-wrap {{
            margin-top: 0.7rem; display: none;
            background: #fff; padding: 8px; border-radius: 8px;
            display: inline-block;
        }}

        /* Month selector in toolbar */
        .month-selector {{
            display: flex; align-items: center; gap: 0.5rem;
        }}
        .month-selector label {{
            font-size: 0.72rem; color: var(--text-secondary);
            font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;
        }}
        .month-selector select {{
            background: var(--surface-color); color: var(--text-primary);
            border: 1px solid var(--border-color);
            padding: 0.32rem 0.6rem; border-radius: 7px;
            font-family: 'Fira Code', monospace; font-size: 0.82rem;
            cursor: pointer; outline: none; transition: border-color 0.2s;
        }}
        .month-selector select:focus {{ border-color: var(--accent-color); }}

        /* Mobile nav sidebar */
        .nav-mobile-toggle {{
            display: none; position: fixed; top: 0.75rem; left: 0.75rem; z-index: 400;
            width: 2.4rem; height: 2.4rem; border-radius: 8px;
            background: var(--surface-color); border: 1px solid var(--border-color);
            align-items: center; justify-content: center;
            font-size: 1.1rem; cursor: pointer; color: var(--text-primary);
        }}
        .nav-sidebar-overlay {{
            display: none; position: fixed; inset: 0; z-index: 150;
            background: rgba(0,0,0,0.65);
        }}
        /* ── TABLET (601px – 1024px): icon sidebar ── */
        @media (min-width: 601px) and (max-width: 1024px) {{
            .nav-sidebar {{
                width: 68px; min-width: 68px; overflow: visible;
            }}
            .nav-brand {{ padding: 0.9rem 0; justify-content: center; }}
            .nav-brand-text {{ display: none; }}
            .nav-logo {{ margin: 0 auto; }}
            .nav-items {{ padding: 0.5rem 0.3rem; gap: 0.1rem; }}
            .nav-item {{
                flex-direction: column; gap: 0.18rem;
                padding: 0.5rem 0.25rem; justify-content: center;
                font-size: 0.57rem; letter-spacing: 0.02em; font-weight: 600;
                text-transform: uppercase; position: relative;
            }}
            .nav-item-icon {{ font-size: 1.25rem; }}
            .nav-item.active::before {{ left: 0; top: 0; bottom: 0; width: 3px; border-radius: 0 3px 3px 0; }}
            .nav-item-badge {{ position: absolute; top: 3px; right: 6px; }}
            .nav-user-info {{ padding: 0.4rem 0.2rem; justify-content: center; }}
            .nav-user-name {{ display: none; }}
            .nav-clock {{ display: none; }}
            .nav-footer {{ padding: 0.4rem 0.3rem 0.5rem; align-items: center; }}
            .nav-item.signout {{ flex-direction: column; gap: 0.15rem; font-size: 0.55rem; justify-content: center; }}
            .nav-item-label {{ font-size: 0.52rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; line-height: 1; }}
            .nav-divider {{ margin: 0.2rem 0.3rem; }}
            .app-content {{ margin-left: 68px; padding: 1.5rem; }}
            .nav-mobile-toggle {{ display: none !important; }}
            .nav-sidebar-overlay {{ display: none !important; }}
        }}

        /* ── PHONE (≤ 600px): bottom tab bar ── */
        .mobile-bottom-nav {{
            display: none;
            position: fixed; bottom: 0; left: 0; right: 0; z-index: 400;
            height: 62px; background: var(--surface-color);
            border-top: 1px solid var(--border-color);
            align-items: stretch;
        }}
        .mob-nav-btn {{
            flex: 1; display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            gap: 0.15rem; border: none; background: none;
            color: var(--text-secondary); cursor: pointer;
            font-family: 'Fira Code', monospace;
            font-size: 0.55rem; font-weight: 600;
            letter-spacing: 0.03em; padding: 0.2rem 0;
            transition: color 0.15s; position: relative;
        }}
        .mob-nav-btn .mob-icon {{ font-size: 1.3rem; line-height: 1; position: relative; }}
        .mob-nav-btn.active {{ color: var(--accent-color); }}
        .mob-nav-badge {{
            position: absolute; top: -4px; right: -6px;
            background: #ff4444; color: #fff; border-radius: 8px;
            font-size: 0.55rem; font-weight: 700; min-width: 0.85rem; height: 0.85rem;
            display: none; align-items: center; justify-content: center; padding: 0 2px;
        }}
        /* More menu (Mais) */
        .mob-more-menu {{
            display: none; position: fixed; bottom: 62px; left: 0; right: 0; z-index: 500;
            background: var(--surface-color); border-top: 1px solid var(--border-color);
            padding: 0.75rem 0.5rem;
            flex-direction: column; gap: 0.2rem;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.4);
        }}
        .mob-more-menu.open {{ display: flex; }}
        .mob-more-item {{
            display: flex; align-items: center; gap: 0.75rem;
            padding: 0.7rem 1rem; border-radius: 10px;
            border: none; background: none; width: 100%;
            color: var(--text-secondary); font-family: 'Fira Code', monospace;
            font-size: 0.85rem; font-weight: 500; cursor: pointer; text-align: left;
            transition: all 0.15s;
        }}
        .mob-more-item:hover, .mob-more-item.active {{ background: rgba(0,255,65,0.1); color: var(--accent-color); }}
        .mob-more-item-icon {{ font-size: 1.1rem; line-height: 1; }}
        .mob-more-overlay {{
            display: none; position: fixed; inset: 0; z-index: 490;
        }}
        .mob-more-overlay.visible {{ display: block; }}
        @media (max-width: 600px) {{
            .nav-sidebar {{ display: none !important; }}
            .nav-mobile-toggle {{ display: none !important; }}
            .nav-sidebar-overlay {{ display: none !important; }}
            .app-content {{
                margin-left: 0; padding: 0.85rem;
                padding-bottom: 70px; height: 100vh;
            }}
            .mobile-bottom-nav {{ display: flex; }}
            #view-dashboard, #view-turma, #view-definicoes, #view-horario,
            #view-disciplinas, #view-playground, #view-chat {{ max-width: 100%; }}
            .schedule-toolbar {{ flex-direction: column; align-items: flex-start; gap: 0.6rem; top: -0.85rem; margin: -0.85rem -0.85rem 0; padding: 0.85rem 0.85rem 0.85rem; }}
            .schedule-controls {{ flex-wrap: wrap; gap: 0.5rem; width: 100%; justify-content: flex-start; }}
            .pdf-group {{ display: none; }}
            .day-card:hover {{ transform: none; }}
            .detail-layout {{ grid-template-columns: 1fr; }}
            .dash-greeting h1 {{ font-size: 1.25rem; }}
        }}

        /* ── CHAT ── */
        #chat-fab {{
            position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 600;
            width: 3rem; height: 3rem; border-radius: 50%;
            background: var(--accent-color); color: #000; border: none;
            font-size: 1.3rem; cursor: pointer;
            box-shadow: 0 4px 16px rgba(0,255,65,0.35);
            transition: transform 0.15s, box-shadow 0.15s;
            display: none;
        }}
        #chat-fab:hover {{ transform: scale(1.08); box-shadow: 0 6px 22px rgba(0,255,65,0.5); }}
        #chat-fab .chat-badge {{
            position: absolute; top: -4px; right: -4px;
            background: #ff4444; color: #fff; border-radius: 50%;
            font-size: 0.65rem; font-weight: 700;
            min-width: 1.1rem; height: 1.1rem;
            display: none; align-items: center; justify-content: center;
            padding: 0 2px;
        }}
        #chat-panel {{
            position: fixed; bottom: 5.2rem; right: 1.5rem; z-index: 600;
            width: 340px; max-height: 480px; display: none; flex-direction: column;
            background: var(--surface-color); border: 1px solid var(--border-color);
            border-radius: 1rem; overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        }}
        .chat-panel-header {{
            padding: 0.7rem 1rem; font-weight: 600; font-size: 0.9rem;
            border-bottom: 1px solid var(--border-color);
            display: flex; justify-content: space-between; align-items: center;
            background: rgba(0,255,65,0.06);
        }}
        .chat-panel-close {{
            cursor: pointer; color: var(--text-secondary); font-size: 1rem;
            line-height: 1; padding: 0.1rem 0.3rem;
            border-radius: 4px; border: none; background: transparent;
            color: var(--text-secondary);
        }}
        .chat-panel-close:hover {{ color: var(--accent-color); }}
        .chat-msgs {{
            flex: 1; overflow-y: auto; padding: 0.75rem;
            display: flex; flex-direction: column; gap: 0.5rem;
            scroll-behavior: smooth;
        }}
        .chat-msgs::-webkit-scrollbar {{ width: 4px; }}
        .chat-msgs::-webkit-scrollbar-thumb {{ background: var(--border-color); border-radius: 4px; }}
        .chat-msg {{ max-width: 82%; display: flex; flex-direction: column; }}
        .chat-msg.mine {{ align-self: flex-end; align-items: flex-end; }}
        .chat-msg.other {{ align-self: flex-start; align-items: flex-start; }}
        .chat-author {{ font-size: 0.68rem; color: var(--text-secondary); margin-bottom: 0.2rem; }}
        .chat-bubble {{
            padding: 0.45rem 0.75rem; border-radius: 1rem; font-size: 0.83rem;
            line-height: 1.4; word-break: break-word;
        }}
        .chat-msg.mine .chat-bubble {{
            background: var(--accent-color); color: #000;
            border-bottom-right-radius: 0.25rem;
        }}
        .chat-msg.other .chat-bubble {{
            background: rgba(255,255,255,0.07);
            border-bottom-left-radius: 0.25rem;
        }}
        .chat-msg-time {{
            font-size: 0.62rem; color: var(--text-secondary);
            margin-top: 0.15rem; padding: 0 0.2rem;
        }}
        .chat-del-btn {{
            background: none; border: none; cursor: pointer; font-size: 0.75rem;
            color: var(--text-secondary); opacity: 0; transition: opacity 0.15s;
            padding: 0 0.2rem;
        }}
        .chat-msg:hover .chat-del-btn {{ opacity: 0.7; }}
        .chat-del-btn:hover {{ color: #ff4444; opacity: 1 !important; }}
        .chat-input-row {{
            display: flex; gap: 0.5rem; padding: 0.5rem 0.75rem;
            border-top: 1px solid var(--border-color);
        }}
        .chat-input {{
            flex: 1; background: var(--bg-color);
            border: 1px solid var(--border-color); border-radius: 1.5rem;
            padding: 0.4rem 0.9rem; color: var(--text-primary);
            font-size: 0.83rem; outline: none; font-family: inherit;
        }}
        .chat-input:focus {{ border-color: var(--accent-color); }}
        .chat-send {{
            background: var(--accent-color); color: #000; border: none;
            border-radius: 50%; width: 2rem; height: 2rem;
            cursor: pointer; font-size: 1.1rem; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
        }}
        .chat-send:disabled {{ opacity: 0.4; cursor: not-allowed; }}
        .chat-empty {{ text-align: center; color: var(--text-secondary); font-size: 0.82rem; padding: 2rem 0; }}

        /* UC inline chat */
        .uc-chat-section {{
            margin-top: 1.5rem;
            border: 1px solid var(--border-color);
            border-radius: 12px; overflow: hidden;
        }}
        .uc-chat-header {{
            padding: 0.7rem 1rem; font-weight: 600; font-size: 0.9rem;
            background: rgba(0,255,65,0.04); border-bottom: 1px solid var(--border-color);
        }}
        .uc-chat-msgs {{
            height: 260px; overflow-y: auto; padding: 0.75rem;
            display: flex; flex-direction: column; gap: 0.5rem;
            scroll-behavior: smooth;
        }}
        .uc-chat-msgs::-webkit-scrollbar {{ width: 4px; }}
        .uc-chat-msgs::-webkit-scrollbar-thumb {{ background: var(--border-color); border-radius: 4px; }}
        .uc-chat-input-row {{
            display: flex; gap: 0.5rem; padding: 0.5rem 0.75rem;
            border-top: 1px solid var(--border-color);
        }}
    </style>
</head>
<body>

    <!-- ── AUTH GATE ── -->
    <div id="auth-gate">
        <div class="auth-card">
            <div class="auth-logo">🛡️</div>
            <div class="auth-title">CET Cibersegurança — IEFP Faro</div>
            <div class="auth-sub" id="auth-sub-text">Acesso reservado a participantes do curso.<br>Inicia sessão com a tua conta.</div>
            <div id="auth-invite-badge" style="display:none;margin:0.75rem 0 0.25rem;padding:0.45rem 0.85rem;background:rgba(0,255,65,0.1);border:1px solid rgba(0,255,65,0.3);border-radius:8px;font-size:0.78rem;color:#00ff41;text-align:center;">
                ✅ Convite válido detectado — inicia sessão para entrar
            </div>
            <button class="auth-btn" onclick="signInWithGoogle()">
                <svg width="18" height="18" viewBox="0 0 48 48" style="vertical-align:middle;margin-right:8px"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                Entrar com Google
            </button>
            <button class="auth-btn" onclick="signInWithMicrosoftPersonal()" style="margin-bottom:0;">
                <svg width="18" height="18" viewBox="0 0 21 21" style="vertical-align:middle;margin-right:8px"><rect x="1" y="1" width="9" height="9" fill="#f25022"/><rect x="11" y="1" width="9" height="9" fill="#7fba00"/><rect x="1" y="11" width="9" height="9" fill="#00a4ef"/><rect x="11" y="11" width="9" height="9" fill="#ffb900"/></svg>
                Entrar com Microsoft
            </button>
            <p id="auth-err" style="display:none;color:#f85149;font-size:0.78rem;margin-top:0.75rem;word-break:break-word;"></p>
        </div>
    </div>

    <!-- Mobile nav toggle -->
    <button class="nav-mobile-toggle" id="nav-mobile-toggle" onclick="navSidebarOpen()">☰</button>
    <div class="nav-sidebar-overlay" id="nav-sidebar-overlay" onclick="navSidebarClose()"></div>

    <div class="app-shell">

        <!-- ── NAV SIDEBAR ── -->
        <nav class="nav-sidebar" id="nav-sidebar">
            <div class="nav-brand">
                <div class="nav-logo">🛡️</div>
                <div class="nav-brand-text">
                    <span class="nav-brand-title">CET Cibersegurança</span>
                    <span class="nav-brand-sub">IEFP Faro</span>
                </div>
            </div>
            <div class="nav-items">
                <button class="nav-item active" data-view="dashboard" onclick="switchView('dashboard')">
                    <span class="nav-item-icon">🏠</span><span class="nav-item-label"> Dashboard</span>
                </button>
                <div class="nav-divider"></div>
                <button class="nav-item" data-view="horario" onclick="switchView('horario')">
                    <span class="nav-item-icon">📅</span><span class="nav-item-label"> Horário</span>
                </button>
                <button class="nav-item" data-view="disciplinas" onclick="switchView('disciplinas')">
                    <span class="nav-item-icon">📚</span><span class="nav-item-label"> Disciplinas</span>
                </button>
                <button class="nav-item" data-view="turma" onclick="switchView('turma')">
                    <span class="nav-item-icon">👥</span><span class="nav-item-label"> Turma</span>
                </button>
                <button class="nav-item" data-view="playground" onclick="switchView('playground')">
                    <span class="nav-item-icon">💻</span><span class="nav-item-label"> Playground</span>
                </button>
                <button class="nav-item" data-view="chat" id="nav-item-chat" onclick="switchView('chat')">
                    <span class="nav-item-icon">💬</span><span class="nav-item-label"> Chat</span>
                    <span class="nav-item-badge" id="nav-chat-badge"></span>
                </button>
                <div class="nav-divider"></div>
                <a class="nav-item" id="nav-admin-link" href="/admin.html" style="display:none;text-decoration:none;color:inherit;" title="Painel de Administração">
                    <span class="nav-item-icon">🔐</span><span class="nav-item-label"> Admin</span>
                </a>
                <button class="nav-item" data-view="definicoes" onclick="switchView('definicoes')">
                    <span class="nav-item-icon">⚙️</span><span class="nav-item-label"> Definições</span>
                </button>
            </div>
            <div class="nav-footer">
                <div class="nav-user-info" id="nav-user-info" style="display:none;">
                    <div class="nav-user-avatar" id="nav-user-avatar">?</div>
                    <span class="nav-user-name" id="nav-user-name">–</span>
                </div>
                <button class="nav-item signout" onclick="auth.signOut()">
                    <span class="nav-item-icon">⏻</span> Sair
                </button>
                <div class="nav-clock" id="live-clock">--:--:--</div>
            </div>
        </nav>

        <!-- ── APP CONTENT ── -->
        <main class="app-content" id="app-content">

            <!-- VIEW: DASHBOARD -->
            <div id="view-dashboard">
                <div class="dash-greeting">
                    <h1 id="dash-greeting-text">Olá!</h1>
                    <div class="dash-date" id="dash-date"></div>
                </div>
                <div class="dash-section-label">Hoje</div>
                <div id="hoje-content"><p class="hoje-empty">A carregar...</p></div>
                <div class="dash-section-label" style="margin-top:2rem;" id="amanha-label">Amanhã</div>
                <div id="amanha-content"><p class="hoje-empty">A carregar...</p></div>
                <div class="dash-section-label" style="margin-top:2rem;">Turma</div>
                <div class="turma-grid" id="turma-grid">
                    <span style="color:var(--text-secondary);font-size:0.82rem;">A carregar…</span>
                </div>
            </div>

            <!-- VIEW: HORÁRIO -->
            <div id="view-horario">
                <div class="schedule-toolbar">
                    <h2 id="schedule-title" style="margin-bottom:0;">Horário</h2>
                    <div class="schedule-controls">
                        <div class="month-selector" id="month-selector-container" style="display:none;">
                            <label for="month-select">Mês</label>
                            <select id="month-select"></select>
                        </div>
                        <input type="text" class="schedule-filter" id="schedule-filter"
                            placeholder="🔍 Filtrar UC ou formador…"
                            oninput="filterHorario(this.value)">
                        <div class="view-toggle">
                            <button class="view-toggle-btn active" id="btn-view-cards"
                                onclick="setScheduleView('cards')" title="Vista cards">⊞</button>
                            <button class="view-toggle-btn" id="btn-view-week"
                                onclick="setScheduleView('week')" title="Vista semanal">▦</button>
                        </div>
                        <div class="pdf-group">
                            <button class="btn-pdf" id="btn-pdf-lista"   onclick="downloadListaPDF(this)">⬇ Lista</button>
                            <button class="btn-pdf" id="btn-pdf-semanal" onclick="downloadSemanalPDF(this)">⬇ Semanal</button>
                        </div>
                    </div>
                </div>
                <div class="schedule-grid" id="schedule-grid"></div>
            </div>

            <!-- VIEW: DISCIPLINAS (list) -->
            <div id="view-disciplinas">
                <div class="disciplines-header">
                    <h2 style="margin-bottom:0;">Disciplinas</h2>
                    <input type="text" class="uc-search" id="uc-search" placeholder="🔍  Pesquisar UC..." oninput="filterUCs(this.value)">
                </div>
                <div class="disciplines-grid" id="disciplines-grid"></div>
            </div>

            <!-- VIEW: PLAYGROUND -->
            <div id="view-playground">
                <div class="pg-ascii-title">
<pre>
██████╗ ██╗      █████╗ ██╗   ██╗ ██████╗ ██████╗  ██████╗ ██╗   ██╗███╗   ██╗██████╗
██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝ ██╔══██╗██╔═══██╗██║   ██║████╗  ██║██╔══██╗
██████╔╝██║     ███████║ ╚████╔╝ ██║  ███╗██████╔╝██║   ██║██║   ██║██╔██╗ ██║██║  ██║
██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║   ██║██╔══██╗██║   ██║██║   ██║██║╚██╗██║██║  ██║
██║     ███████╗██║  ██║   ██║   ╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝</pre>
                </div>
                <div class="pg-wrap">
                    <div class="pg-tabbar-outer">
                        <div class="pg-add-wrap">
                            <button class="pg-add-btn" onclick="pgToggleMenu(event)">＋ ▾</button>
                            <div class="pg-add-menu" id="pg-add-menu">
                                <div class="pg-add-item" onclick="pgNewTab('python')">🐍 &nbsp;Nova sessão Python</div>
                                <div class="pg-add-item" onclick="pgNewTab('sql')">🗄️ &nbsp;Nova sessão SQL</div>
                            </div>
                        </div>
                        <div class="pg-tabbar" id="pg-tabbar">
                            <div id="pg-tabs"></div>
                        </div>
                    </div>
                    <div id="pg-panels">
                        <div class="pg-empty" id="pg-empty">
                            <span>Abre uma sessão para começar</span>
                            <span class="pg-empty-hint">🐍 Python &nbsp;·&nbsp; 🗄️ SQL</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- VIEW: UC DETAIL -->
            <div id="view-uc-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="goBackFromDetail()">← Voltar</button>
                    <div class="detail-title-block">
                        <div class="detail-uc-code" id="detail-uc-code"></div>
                        <div class="detail-uc-name" id="detail-uc-name"></div>
                        <div class="detail-uc-meta" id="detail-uc-meta"></div>
                    </div>
                </div>

                <!-- Sessions nav -->
                <div class="uc-schedule-section">
                    <div class="uc-schedule-header">
                        <h2 style="margin-bottom:0;font-size:1.1rem;">📅 Sessões</h2>
                        <div style="display:flex;gap:0.6rem;align-items:center;">
                            <span class="uc-total-hours" id="uc-total-hours"></span>
                            <button class="btn-pdf btn-pdf-uc" id="btn-pdf-uc" onclick="downloadUCPDF(this)">⬇ PDF</button>
                        </div>
                    </div>
                    <div id="uc-schedule-content"></div>
                </div>

                <!-- UC Chat -->
                <div class="uc-chat-section">
                    <div class="uc-chat-header">💬 Discussão da UC</div>
                    <div class="uc-chat-msgs" id="uc-chat-msgs">
                        <div class="chat-empty">Sem mensagens ainda. Sê o primeiro a comentar!</div>
                    </div>
                    <div class="uc-chat-input-row">
                        <input class="chat-input" id="uc-chat-input" placeholder="Mensagem…" onkeydown="ucChatKey(event)">
                        <button class="chat-send" onclick="ucChatSend()" id="uc-chat-send">↑</button>
                    </div>
                </div>
            </div>

            <!-- VIEW: SESSION DETAIL -->
            <div id="view-session-detail">
                <div class="detail-header">
                    <button class="back-btn" onclick="goBackFromSession()">← Voltar</button>
                    <div class="detail-title-block">
                        <div class="detail-uc-code" id="session-detail-num"></div>
                        <div class="detail-uc-name" id="session-detail-uc-name"></div>
                        <div class="detail-uc-meta" id="session-detail-meta"></div>
                    </div>
                </div>

                <!-- Sticky session nav strip -->
                <div class="session-nav-strip">
                    <div class="session-list" id="session-nav-chips"></div>
                </div>

                <div class="detail-layout">
                    <!-- Notes column -->
                    <div class="panel notes-panel">
                        <div class="notes-toolbar">
                            <h2 style="margin-bottom:0; font-size:1.1rem;">📝 Apontamentos</h2>
                            <span class="notes-saved-indicator" id="session-notes-saved">✓ Guardado</span>
                        </div>
                        <textarea class="notes-textarea" id="session-notes-textarea"
                            placeholder="Apontamentos desta sessão…&#10;&#10;Guardado automaticamente."></textarea>
                    </div>

                    <!-- Materials column -->
                    <div class="panel materials-panel">
                        <h2 style="margin-bottom:0.75rem; font-size:1.1rem;">📎 Materiais</h2>
                        <div class="add-material-form">
                            <div class="form-row">
                                <select class="form-select" id="session-mat-type">
                                    <option value="link">🔗 Link</option>
                                    <option value="pdf">📄 PDF</option>
                                    <option value="doc">📝 Doc</option>
                                    <option value="video">🎬 Vídeo</option>
                                    <option value="slide">📊 Slides</option>
                                    <option value="outro">📁 Outro</option>
                                </select>
                                <input type="text" class="form-input" id="session-mat-label" placeholder="Descrição / título">
                            </div>
                            <div class="form-row">
                                <input type="text" class="form-input" id="session-mat-url" placeholder="URL (https://...)"
                                       oninput="if(getYouTubeId(this.value)) document.getElementById('session-mat-type').value='video'">
                                <button class="btn-primary" onclick="addSessionMaterial()">+ Adicionar</button>
                            </div>
                            <div class="file-drop-zone" id="file-drop-zone">
                                📂 Arrastar ficheiro ou clicar para selecionar
                                <input type="file" id="file-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.png,.jpg" onchange="handleFileSelect(event)">
                            </div>
                        </div>
                        <div class="materials-list" id="session-materials-list"></div>
                    </div>
                </div>
            </div>

            <!-- VIEW: TURMA -->
            <div id="view-turma">
                <h2 style="margin-bottom:0.5rem;">👥 Turma</h2>
                <p style="color:var(--text-secondary);font-size:0.82rem;margin-bottom:1.75rem;">Participantes que já acederam ao dashboard</p>
                <div id="turma-list" style="display:flex;flex-direction:column;gap:0.6rem;max-width:600px;">
                    <span style="color:var(--text-secondary);font-size:0.82rem;">A carregar…</span>
                </div>
            </div>

            <!-- VIEW: CHAT (full page) -->
            <div id="view-chat">
                <h2 style="margin-bottom:1.25rem;">💬 Chat da turma</h2>
                <div class="chat-view-body">
                    <div class="chat-view-msgs" id="chat-view-msgs">
                        <div class="chat-empty">A carregar…</div>
                    </div>
                    <div class="chat-view-input-row">
                        <input class="chat-input" id="chat-view-input" placeholder="Mensagem…" onkeydown="chatViewKey(event)">
                        <button class="chat-send" onclick="chatViewSend()">↑</button>
                    </div>
                </div>
            </div>

            <!-- VIEW: DEFINIÇÕES -->
            <div id="view-definicoes">
                <h2 style="margin-bottom:1.5rem;">⚙️ Definições</h2>
                <div class="settings-section">
                    <div class="settings-section-title">Aparência</div>
                    <div class="settings-row">
                        <div>
                            <div class="settings-row-label">Tema</div>
                            <div class="settings-row-sub">Alternar entre modo escuro e claro</div>
                        </div>
                        <button class="theme-toggle-btn" id="theme-toggle" onclick="toggleTheme()">🌙</button>
                    </div>
                </div>
                <div class="settings-section">
                    <div class="settings-section-title">Notificações</div>
                    <div class="settings-row">
                        <div>
                            <div class="settings-row-label">Avisos de aula</div>
                            <div class="settings-row-sub">Alerta 5 minutos antes do início de cada aula</div>
                        </div>
                        <button class="notif-btn" id="notif-btn" onclick="requestNotifications()">🔔</button>
                    </div>
                </div>
                <div class="settings-section">
                    <div class="settings-section-title">Conta</div>
                    <div class="settings-row">
                        <div>
                            <div class="settings-row-label" id="settings-user-name">–</div>
                            <div class="settings-row-sub" id="settings-user-email">–</div>
                        </div>
                        <button class="nav-item signout" style="width:auto;padding:0.4rem 0.8rem;" onclick="auth.signOut()">Sair</button>
                    </div>
                </div>
                <div class="settings-section" id="invite-section">
                    <div class="settings-section-title">Convites de Acesso</div>
                    <div class="invite-btn-row">
                        <button class="invite-btn" onclick="createInvite('individual')">＋ Convite individual</button>
                        <button class="invite-btn" onclick="createInvite('turma')">＋ Link de turma</button>
                    </div>
                    <div id="invite-list"><span style="color:var(--text-secondary);font-size:0.8rem;">A carregar…</span></div>
                </div>
            </div>

        </main>
    </div>

    <script>
        // ── DATA ────────────────────────────────────────────────────────
        const UC_MAP     = {js_uc_map};
        const UC_LIST    = {js_uc_list};
        const HORARIOS   = {js_horarios};
        const CRONOGRAMA = {js_cronograma};

        // ── CAPTURAR TOKEN DE CONVITE NO URL ────────────────────────────
        (function captureInviteToken() {{
            try {{
                const params = new URLSearchParams(window.location.search);
                const token  = params.get('invite');
                if (token && /^[a-f0-9]{{32,64}}$/.test(token)) {{
                    // localStorage em vez de sessionStorage — sobrevive ao signInWithRedirect em mobile
                    localStorage.setItem('pending_invite', token);
                    history.replaceState({{}}, '', window.location.pathname);
                    const badge = document.getElementById('auth-invite-badge');
                    if (badge) badge.style.display = 'block';
                }}
                // Mostrar badge se já havia token guardado (utilizador voltou após redirect)
                if (localStorage.getItem('pending_invite')) {{
                    const badge = document.getElementById('auth-invite-badge');
                    if (badge) badge.style.display = 'block';
                }}
            }} catch(e) {{ /* silencioso */ }}
        }})();

        // ── FIREBASE ────────────────────────────────────────────────────
        firebase.initializeApp({{
            apiKey:            "AIzaSyCa5bu1aM6N1kiV6m1gLo8zf2sKcvcr4o0",
            authDomain:        "ligafaro-8000.firebaseapp.com",
            projectId:         "ligafaro-8000",
            storageBucket:     "ligafaro-8000.firebasestorage.app",
            appId:             "1:315653817267:web:19943348fb9aca311681c6"
        }});
        const auth    = firebase.auth();
        const storage = firebase.storage();
        const db      = firebase.firestore();



        // ── STATE ───────────────────────────────────────────────────────
        let currentView         = 'dashboard';
        let previousView        = 'dashboard';
        let currentUCCode       = null;
        let currentSessionKey   = null;  // "ucCode_date" for active session detail
        let currentMonthIndex   = 0;
        let notesTimer          = null;
        let sessionNotesTimer   = null;
        let materialsCache      = {{}};   // key → array (ucCode or session key)
        let scheduleFilter   = '';
        let scheduleViewMode = 'cards';

        // Chat state
        let chatUnsub    = null;   // global chat listener unsubscribe
        let ucChatUnsub  = null;   // UC chat listener unsubscribe
        let chatLastRead = parseInt(localStorage.getItem('chat_last_read') || '0');

        // ── DOM REFS ────────────────────────────────────────────────────
        const monthSelect          = document.getElementById('month-select');
        const monthSelectContainer = document.getElementById('month-selector-container');
        const scheduleGrid         = document.getElementById('schedule-grid');
        const scheduleTitle        = document.getElementById('schedule-title');

        // ── VIEW SWITCHING ──────────────────────────────────────────────
        const ALL_VIEWS = ['dashboard','horario','disciplinas','turma','uc-detail','session-detail','playground','chat','definicoes'];

        function switchView(view) {{
            ALL_VIEWS.forEach(v => {{
                const el = document.getElementById('view-' + v);
                if (el) el.style.display = 'none';
            }});

            if (view === 'dashboard') {{
                document.getElementById('view-dashboard').style.display = 'block';
                monthSelectContainer.style.display = 'none';
            }} else if (view === 'horario') {{
                document.getElementById('view-horario').style.display = 'block';
                monthSelectContainer.style.display = HORARIOS.length > 0 ? 'flex' : 'none';
                // Saltar para o mês que contém hoje, depois fazer scroll até ao dia
                const todayIdx = findTodayMonthIndex();
                if (todayIdx !== -1 && todayIdx !== currentMonthIndex) {{
                    monthSelect.value = todayIdx;
                    renderHorario(todayIdx);
                }} else {{
                    setTimeout(scrollToToday, 80);
                }}
            }} else if (view === 'disciplinas') {{
                document.getElementById('view-disciplinas').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                renderDisciplines();
            }} else if (view === 'turma') {{
                document.getElementById('view-turma').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                renderTurmaView();
            }} else if (view === 'uc-detail') {{
                document.getElementById('view-uc-detail').style.display = 'block';
                monthSelectContainer.style.display = 'none';
            }} else if (view === 'session-detail') {{
                document.getElementById('view-session-detail').style.display = 'block';
                monthSelectContainer.style.display = 'none';
            }} else if (view === 'playground') {{
                document.getElementById('view-playground').style.display = 'flex';
                monthSelectContainer.style.display = 'none';
                const active = document.querySelector('.pg-repl-input');
                if (active) setTimeout(() => active.focus(), 50);
            }} else if (view === 'chat') {{
                document.getElementById('view-chat').style.display = 'flex';
                monthSelectContainer.style.display = 'none';
                chatViewInit();
                chatMarkRead();
            }} else if (view === 'definicoes') {{
                document.getElementById('view-definicoes').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                settingsUpdateUser();
                if (window._isModerador) {{
                    document.getElementById('invite-section').style.display = 'block';
                    loadInvites();
                }}
            }}

            currentView = view;
            navSidebarClose();
            mobMoreClose();

            // Sync sidebar + mobile bottom nav active state
            const navKey = (view === 'uc-detail' || view === 'session-detail') ? previousView : view;
            document.querySelectorAll('.nav-item[data-view]').forEach(btn => {{
                btn.classList.toggle('active', btn.dataset.view === navKey);
            }});
            document.querySelectorAll('.mob-nav-btn[data-view]').forEach(btn => {{
                btn.classList.toggle('active', btn.dataset.view === navKey);
            }});
            // Highlight "Mais" button if current view is a secondary one
            const moreBtn = document.getElementById('mob-more-btn');
            const moreViews = ['disciplinas','playground','definicoes'];
            if (moreBtn) moreBtn.classList.toggle('active', moreViews.includes(navKey));
            // Sync "Mais" menu items active state
            document.querySelectorAll('.mob-more-item[data-view]').forEach(btn => {{
                btn.classList.toggle('active', btn.dataset.view === navKey);
            }});
        }}

        function goBackFromDetail() {{
            if (ucChatUnsub) {{ ucChatUnsub(); ucChatUnsub = null; }}
            switchView(previousView);
        }}

        function goBackFromSession() {{
            // Always go back to the UC detail that owns this session
            if (currentSessionKey) {{
                const ucCode = currentSessionKey.split('_')[0];
                openUCDetail(ucCode);
            }} else {{
                switchView(previousView);
            }}
        }}

        // ── MOBILE SIDEBAR ──────────────────────────────────────────────
        function navSidebarOpen() {{
            document.getElementById('nav-sidebar').classList.add('open');
            document.getElementById('nav-sidebar-overlay').classList.add('visible');
        }}
        function navSidebarClose() {{
            document.getElementById('nav-sidebar')?.classList.remove('open');
            document.getElementById('nav-sidebar-overlay')?.classList.remove('visible');
        }}

        // ── MOBILE MORE MENU ─────────────────────────────────────────────
        function mobMoreToggle() {{
            const menu = document.getElementById('mob-more-menu');
            const overlay = document.getElementById('mob-more-overlay');
            const isOpen = menu.classList.contains('open');
            if (isOpen) {{ menu.classList.remove('open'); overlay.classList.remove('visible'); }}
            else        {{ menu.classList.add('open');    overlay.classList.add('visible'); }}
        }}
        function mobMoreClose() {{
            document.getElementById('mob-more-menu')?.classList.remove('open');
            document.getElementById('mob-more-overlay')?.classList.remove('visible');
        }}

        // ── AULA STATE ──────────────────────────────────────────────────
        function getAulaState(diaData, horaStr) {{
            const now   = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const parts = diaData.split('-').map(Number);
            const diaDay = new Date(parts[0], parts[1] - 1, parts[2]);

            if (diaDay < today) return 'past';
            if (diaDay > today) return 'future';

            const [startStr, endStr] = horaStr.split('-');
            const [sh, sm] = startStr.split(':').map(Number);
            const [eh, em] = endStr.split(':').map(Number);
            const cur   = now.getHours() * 60 + now.getMinutes();
            const start = sh * 60 + sm;
            const end   = eh * 60 + em;

            if (cur >= end) return 'past';
            if (cur >= start) return 'current';
            return 'future';
        }}

        // ── MERGE TIME SLOTS ────────────────────────────────────────────
        function mergeTimeSlots(aulas) {{
            if (!aulas || aulas.length === 0) return [];
            let merged = [];
            let currentUc = aulas[0].uc;
            let parts = aulas[0].hora.split('-');
            let start = parts[0], end = parts[1];

            for (let i = 1; i < aulas.length; i++) {{
                let p = aulas[i].hora.split('-');
                if (aulas[i].uc === currentUc && p[0] === end) {{
                    end = p[1];
                }} else {{
                    merged.push({{ hora: `${{start}}-${{end}}`, uc: currentUc }});
                    currentUc = aulas[i].uc; start = p[0]; end = p[1];
                }}
            }}
            merged.push({{ hora: `${{start}}-${{end}}`, uc: currentUc }});

            return merged.map(item => ({{
                ...item,
                descricao: (UC_MAP[item.uc] && UC_MAP[item.uc].descricao) || item.uc,
                formador:  (UC_MAP[item.uc] && UC_MAP[item.uc].formador)  || ''
            }}));
        }}

        // ── RENDER CRONOGRAMA ───────────────────────────────────────────
        // (kept for data availability; UI elements may not exist in this layout)
        function renderCronograma() {{
            const cronoGeralEl  = document.getElementById('crono-geral');
            const cronoResumoEl = document.getElementById('crono-resumo');
            if (!cronoGeralEl) return;
            if (!CRONOGRAMA.data_inicio) {{
                cronoGeralEl.innerHTML = `<li><span class="info-label">Dados do</span><span class="info-val">Cronograma Indisponível</span></li>`;
                return;
            }}
            cronoGeralEl.innerHTML = `
                ${{CRONOGRAMA.designacao ? `<li><span class="info-label">Curso</span><span class="info-val">${{CRONOGRAMA.designacao}}</span></li>` : ''}}
                ${{CRONOGRAMA.instituicao ? `<li><span class="info-label">Instituição</span><span class="info-val">${{CRONOGRAMA.instituicao}}</span></li>` : ''}}
                ${{CRONOGRAMA.responsavel_acao ? `<li><span class="info-label">Responsável</span><span class="info-val">${{CRONOGRAMA.responsavel_acao}}</span></li>` : ''}}
                <li><span class="info-label">Período</span><span class="info-val">${{CRONOGRAMA.data_inicio}} a ${{CRONOGRAMA.data_fim}}</span></li>
                <li><span class="info-label">Local</span><span class="info-val">${{CRONOGRAMA.local}} • Sala ${{CRONOGRAMA.sala}}</span></li>
                <li><span class="info-label">Horário Base</span><span class="info-val">${{CRONOGRAMA.horario}}</span></li>
                <li><span class="info-label">Carga Horária</span><span class="info-val">${{CRONOGRAMA.carga_horaria.total}}h Total (FCT: ${{CRONOGRAMA.carga_horaria.fct}}h)</span></li>
            `;
            if (CRONOGRAMA.resumo_mensal && cronoResumoEl) {{
                cronoResumoEl.innerHTML = CRONOGRAMA.resumo_mensal.map(r => `
                    <div class="resumo-row">
                        <div>${{r.mes}}</div>
                        <div>${{r.dias}} dias</div>
                        <div>${{r.horas_mes}}h / ${{r.horas_totais}}h</div>
                    </div>
                `).join('');
            }}
        }}

        function highlightCurrentMonth(monthName) {{
            if (!CRONOGRAMA.resumo_mensal) return;
            const cronoResumoEl = document.getElementById('crono-resumo');
            if (!cronoResumoEl) return;
            const cleanMonth = monthName.split(' ')[0].substring(0, 3).toLowerCase();
            cronoResumoEl.querySelectorAll('.resumo-row').forEach(row => {{
                row.classList.remove('highlight');
                if (row.children[0].innerText.toLowerCase().includes(cleanMonth)) {{
                    row.classList.add('highlight');
                }}
            }});
        }}

        // ── RENDER HORÁRIO ──────────────────────────────────────────────
        function renderHorario(index) {{
            currentMonthIndex = index;
            const horario = HORARIOS[index];
            if (!horario) return;
            const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
            scheduleTitle.innerText = `Horário — ${{cap(horario.mes_ano)}}`;
            highlightCurrentMonth(horario.mes_ano);
            if (scheduleViewMode === 'week') {{
                renderHorarioWeek(horario, scheduleFilter);
            }} else {{
                renderHorarioCards(horario, scheduleFilter);
            }}
        }}

        function aulaMatchesFilter(aula, filter) {{
            if (!filter) return true;
            const q = filter.toLowerCase();
            return (aula.uc        || '').toLowerCase().includes(q) ||
                   (aula.descricao || '').toLowerCase().includes(q) ||
                   (aula.formador  || '').toLowerCase().includes(q);
        }}

        function buildAulaCardHtml(aula, state, matched) {{
            const isClickable   = UC_MAP[aula.uc] ? 'clickable' : '';
            const dimClass      = (scheduleFilter && !matched) ? 'filtered-out' : '';
            const isRemote      = (aula.uc === 'UC00602') || (UC_MAP[aula.uc] && UC_MAP[aula.uc].modalidade === 'remoto');
            const remoteClass   = isRemote ? 'remote' : '';
            const remoteBadge   = isRemote
                ? `<div class="aula-uc badge remote" style="margin-top:0;">🌐 Remoto</div>` : '';
            const formadorBadge = aula.formador
                ? `<div class="aula-uc badge" style="margin-top:0;background:rgba(255,255,255,0.1);color:#fff;">👤 ${{shortName(aula.formador)}}</div>` : '';
            const clickAttr = UC_MAP[aula.uc]
                ? `onclick="openUCFromSchedule('${{aula.uc}}')"` : '';
            return `
            <div class="aula-card ${{state}} ${{isClickable}} ${{remoteClass}} ${{dimClass}}" ${{clickAttr}}>
                <div class="aula-time">${{aula.hora}}</div>
                <div class="aula-info">
                    <div class="aula-desc">${{aula.descricao}}</div>
                    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:5px;align-items:center;">
                        <div class="aula-uc badge" style="margin-top:0;">${{aula.uc}}</div>
                        ${{remoteBadge}}${{formadorBadge}}
                    </div>
                </div>
                ${{UC_MAP[aula.uc] ? `<button class="open-uc-btn" title="Abrir disciplina">↗</button>` : ''}}
            </div>`;
        }}

        function renderHorarioCards(horario, filter) {{
            scheduleGrid.className = 'schedule-grid';
            let daysHtml = '';
            horario.dias.forEach(dia => {{
                const mergedAulas = mergeTimeSlots(dia.aulas);
                let aulasHtml = '';
                let dayMatches = false;

                if (mergedAulas.length > 0) {{
                    mergedAulas.forEach(aula => {{
                        const matched = aulaMatchesFilter(aula, filter);
                        if (matched) dayMatches = true;
                        aulasHtml += buildAulaCardHtml(aula, getAulaState(dia.data, aula.hora), matched);
                    }});
                }} else if (dia.nota) {{
                    dayMatches = !filter;
                    aulasHtml = `<div class="aula-card empty-card holiday"><div class="aula-info"><div class="aula-desc">${{dia.nota}}</div></div></div>`;
                }} else {{
                    dayMatches = !filter;
                    aulasHtml = `<div class="aula-card empty-card"><div class="aula-info"><div class="aula-desc">Sem aulas programadas</div></div></div>`;
                }}

                daysHtml += `
                <div class="day-card" data-date="${{dia.data}}" style="${{(filter && !dayMatches) ? 'display:none;' : ''}}">
                    <div class="day-header">
                        <span class="day-date">${{dia.data}}</span>
                        <span class="day-week badge">${{dia.dia_semana}}</span>
                    </div>
                    <div class="day-body">${{aulasHtml}}</div>
                </div>`;
            }});

            scheduleGrid.innerHTML = daysHtml || `<div class="empty-state" style="grid-column:1/-1;">Nenhuma aula encontrada para esse filtro.</div>`;
            setTimeout(scrollToToday, 60);
        }}

        function getWeekStart(dateStr) {{
            const [y, m, d] = dateStr.split('-').map(Number);
            const dt  = new Date(y, m - 1, d);
            const dow = dt.getDay(); // 0=Sun
            dt.setDate(dt.getDate() + (dow === 0 ? -6 : 1 - dow));
            const pad = n => String(n).padStart(2, '0');
            return `${{dt.getFullYear()}}-${{pad(dt.getMonth()+1)}}-${{pad(dt.getDate())}}`;
        }}

        function renderHorarioWeek(horario, filter) {{
            scheduleGrid.className = 'schedule-grid week-view';
            const pad = n => String(n).padStart(2, '0');
            const now = new Date();
            const todayStr = `${{now.getFullYear()}}-${{pad(now.getMonth()+1)}}-${{pad(now.getDate())}}`;
            const DAY_NAMES = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

            // Index days by date and group by week
            const byWeek = {{}};
            horario.dias.forEach(dia => {{
                const wk = getWeekStart(dia.data);
                if (!byWeek[wk]) byWeek[wk] = {{}};
                byWeek[wk][dia.data] = dia;
            }});

            const weeksHtml = Object.keys(byWeek).sort().map(weekStart => {{
                const [wy, wm, wd] = weekStart.split('-').map(Number);
                const monDate = new Date(wy, wm - 1, wd);

                const colsHtml = DAY_NAMES.map((dayName, i) => {{
                    const dt = new Date(monDate);
                    dt.setDate(monDate.getDate() + i);
                    const dateStr = `${{dt.getFullYear()}}-${{pad(dt.getMonth()+1)}}-${{pad(dt.getDate())}}`;
                    const dia     = (byWeek[weekStart] || {{}})[dateStr];
                    const isToday = dateStr === todayStr;
                    const header  = `<div class="week-day-header">
                        <span class="week-day-name">${{dayName}}</span>
                        <span class="week-day-date">${{pad(dt.getDate())}}/${{pad(dt.getMonth()+1)}}</span>
                    </div>`;

                    if (!dia) {{
                        return `<div class="week-day-col no-class${{isToday ? ' today' : ''}}">${{header}}<div class="week-day-body"></div></div>`;
                    }}

                    const mergedAulas = mergeTimeSlots(dia.aulas);
                    let bodyHtml = '';
                    let colMatches = false;

                    if (mergedAulas.length > 0) {{
                        mergedAulas.forEach(aula => {{
                            const matched   = aulaMatchesFilter(aula, filter);
                            if (matched) colMatches = true;
                            const state      = getAulaState(dia.data, aula.hora);
                            const dimCls     = (filter && !matched) ? 'filtered-out' : '';
                            const clickCls   = UC_MAP[aula.uc] ? 'clickable' : '';
                            const clickAttr  = UC_MAP[aula.uc] ? `onclick="openUCFromSchedule('${{aula.uc}}')"` : '';
                            const isRemote   = (aula.uc === 'UC00602') || (UC_MAP[aula.uc] && UC_MAP[aula.uc].modalidade === 'remoto');
                            const remoteCls  = isRemote ? 'remote' : '';
                            const remoteBadge = isRemote ? `<span class="badge remote" style="font-size:0.62rem;padding:0.1rem 0.4rem;margin-top:3px;display:inline-block;">🌐 Remoto</span>` : '';
                            bodyHtml += `
                            <div class="week-aula-card ${{state}} ${{clickCls}} ${{remoteCls}} ${{dimCls}}" ${{clickAttr}}>
                                <div class="week-aula-time">${{aula.hora}}</div>
                                <div class="week-aula-desc">${{aula.descricao}}</div>
                                <div class="week-aula-uc">${{aula.uc}}${{remoteBadge}}</div>
                            </div>`;
                        }});
                    }} else if (dia.nota) {{
                        colMatches = !filter;
                        bodyHtml = `<div class="week-aula-card holiday"><div class="week-aula-desc">${{dia.nota}}</div></div>`;
                    }}

                    const hideCls = (filter && mergedAulas.length > 0 && !colMatches) ? ' col-hidden' : '';
                    return `<div class="week-day-col${{isToday ? ' today' : ''}}${{hideCls}}" data-date="${{dateStr}}">
                        ${{header}}<div class="week-day-body">${{bodyHtml}}</div>
                    </div>`;
                }}).join('');

                const friDate = new Date(monDate);
                friDate.setDate(monDate.getDate() + 4);
                const weekLabel = `${{pad(monDate.getDate())}}–${{pad(friDate.getDate())}} ${{horario.mes_ano.split(' ')[0]}}`;

                return `<div class="week-block">
                    <div class="week-label">${{weekLabel}}</div>
                    <div class="week-days">${{colsHtml}}</div>
                </div>`;
            }}).join('');

            scheduleGrid.innerHTML = weeksHtml || '<div class="empty-state">Nenhuma aula encontrada.</div>';

            setTimeout(scrollToToday, 60);
        }}

        function findTodayMonthIndex() {{
            const today = new Date();
            const pad = n => String(n).padStart(2, '0');
            const todayStr = `${{today.getFullYear()}}-${{pad(today.getMonth()+1)}}-${{pad(today.getDate())}}`;
            return HORARIOS.findIndex(h => h.dias.some(d => d.data === todayStr));
        }}

        function scrollToToday() {{
            const today = new Date();
            const pad = n => String(n).padStart(2, '0');
            const todayStr = `${{today.getFullYear()}}-${{pad(today.getMonth()+1)}}-${{pad(today.getDate())}}`;
            const toolbar  = document.querySelector('.schedule-toolbar');
            const offset   = (toolbar?.offsetHeight || 80) + 16;
            const content  = document.getElementById('app-content');
            const target   = document.querySelector(`.day-card[data-date="${{todayStr}}"]`)
                          || document.querySelector(`.week-day-col[data-date="${{todayStr}}"]`);
            if (!target || !content) return;
            content.scrollTo({{ top: target.offsetTop - offset, behavior: 'smooth' }});
        }}

        function openUCFromSchedule(ucCode) {{
            previousView = 'horario';
            openUCDetail(ucCode);
        }}

        async function openSessionDetail(ucCode, date, num, hora, diaSemana, mesAno) {{
            // S1 reuses the original UC key so existing notes/materials are preserved
            const key = num === 1 ? ucCode : `${{ucCode}}_${{date}}`;
            currentSessionKey = key;
            previousView = 'uc-detail';  // back button → UC detail

            const uc = UC_MAP[ucCode] || {{}};
            const [y, mo, d] = date.split('-');

            document.getElementById('session-detail-num').textContent  = `S${{num}} · ${{ucCode}}`;
            document.getElementById('session-detail-uc-name').textContent = uc.descricao || ucCode;
            document.getElementById('session-detail-meta').innerHTML =
                `<span class="detail-meta-pill">📅 ${{d}}/${{mo}} ${{diaSemana}}</span>` +
                `<span class="detail-meta-pill">🕐 ${{hora}}</span>`;

            // Populate sticky session nav strip with all sessions of this UC
            const sessions = buildUCSchedule(ucCode);
            let sNum = 1;
            sessions.forEach(s => {{ s.num = sNum++; }});
            document.getElementById('session-nav-chips').innerHTML =
                buildSessionChipsHTML(ucCode, sessions, key);

            // Reset notes & materials UI before switching view
            const ta = document.getElementById('session-notes-textarea');
            ta.value = '';
            ta.oninput = () => autoSaveSessionNote(key, ta.value);
            document.getElementById('session-notes-saved').classList.remove('visible');
            document.getElementById('session-materials-list').innerHTML =
                '<div class="no-materials">⏳ A carregar...</div>';

            // Switch view immediately — don't block on async Firestore calls
            switchView('session-detail');

            // Load notes + materials in parallel
            const uid = auth.currentUser?.uid;
            const [notesResult, matList] = await Promise.allSettled([
                loadSessionNote(uid, key),
                getSessionMaterials(key)
            ]);

            if (notesResult.status === 'fulfilled' && notesResult.value) {{
                ta.value = notesResult.value;
            }}
            if (matList.status === 'fulfilled') {{
                renderSessionMaterials(key, matList.value);
            }}
        }}

        async function loadSessionNote(uid, key) {{
            if (!uid) return '';
            try {{
                const doc = await db.collection('notes').doc(`${{uid}}_${{key}}`).get();
                return doc.exists ? (doc.data().content || '') : '';
            }} catch(e) {{ return ''; }}
        }}

        function autoSaveSessionNote(key, value) {{
            clearTimeout(sessionNotesTimer);
            sessionNotesTimer = setTimeout(async () => {{
                const uid = auth.currentUser?.uid;
                if (!uid) return;
                try {{
                    await db.collection('notes').doc(`${{uid}}_${{key}}`).set({{
                        content: value,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        uid
                    }}, {{ merge: true }});
                }} catch(e) {{ console.warn('Erro ao guardar notas de sessão:', e); }}
                const ind = document.getElementById('session-notes-saved');
                ind.classList.add('visible');
                setTimeout(() => ind.classList.remove('visible'), 2000);
            }}, 800);
        }}

        async function getSessionMaterials(key) {{
            if (materialsCache[key]) return materialsCache[key];
            try {{
                const doc = await db.collection('materials').doc(key).get();
                const list = doc.exists ? (doc.data().items || []) : [];
                materialsCache[key] = list;
                return list;
            }} catch(e) {{ return []; }}
        }}

        function renderSessionMaterials(key, list) {{
            const el = document.getElementById('session-materials-list');
            if (!list || list.length === 0) {{
                el.innerHTML = '<div class="no-materials">Sem materiais adicionados nesta sessão.</div>';
                return;
            }}
            el.innerHTML = list.map((m, i) => `
                <div class="material-item">
                    <span class="material-icon">${{getTypeIcon(m.type)}}</span>
                    <div class="material-info">
                        <a class="material-label" href="${{escapeHtml(m.url)}}" target="_blank" rel="noopener">${{escapeHtml(m.label || m.url)}}</a>
                    </div>
                    <button class="material-delete" onclick="deleteSessionMaterial('${{key}}',${{i}})">✕</button>
                </div>`).join('');
        }}

        async function addSessionMaterial() {{
            const key   = currentSessionKey;
            const type  = document.getElementById('session-mat-type').value;
            const label = document.getElementById('session-mat-label').value.trim();
            const url   = document.getElementById('session-mat-url').value.trim();
            if (!url) {{ alert('Introduz um URL.'); return; }}
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            const item = {{
                id: `${{Date.now()}}_${{Math.random().toString(36).slice(2)}}`,
                type, label: label || url, url, uid,
                createdAt: Date.now()
            }};
            try {{
                await db.collection('materials').doc(key).set({{
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }}, {{ merge: true }});
                delete materialsCache[key];
                document.getElementById('session-mat-label').value = '';
                document.getElementById('session-mat-url').value   = '';
                const list = await getSessionMaterials(key);
                renderSessionMaterials(key, list);
            }} catch(e) {{ alert('Erro ao adicionar material: ' + e.message); }}
        }}

        async function deleteSessionMaterial(key, index) {{
            if (!confirm('Remover este material?')) return;
            try {{
                const doc = await db.collection('materials').doc(key).get();
                const items = doc.exists ? [...(doc.data().items || [])] : [];
                items.splice(index, 1);
                await db.collection('materials').doc(key).set({{ items }});
                delete materialsCache[key];
                const list = await getSessionMaterials(key);
                renderSessionMaterials(key, list);
            }} catch(e) {{ alert('Erro ao remover: ' + e.message); }}
        }}

        function goToSession(dateStr) {{
            // Find which month index contains this date
            let targetIdx = -1;
            HORARIOS.forEach((h, i) => {{
                if (h.dias.some(d => d.data === dateStr)) targetIdx = i;
            }});
            if (targetIdx === -1) return;

            previousView = 'uc-detail';
            switchView('horario');

            const doScroll = () => {{
                const pad = n => String(n).padStart(2, '0');
                const toolbar = document.querySelector('.schedule-toolbar');
                const offset  = (toolbar?.offsetHeight || 80) + 16;
                const content = document.getElementById('app-content');
                const target  = document.querySelector(`.day-card[data-date="${{dateStr}}"]`)
                              || document.querySelector(`.week-day-col[data-date="${{dateStr}}"]`);
                if (target && content) content.scrollTo({{ top: target.offsetTop - offset, behavior: 'smooth' }});
            }};

            if (targetIdx !== currentMonthIndex) {{
                monthSelect.value = targetIdx;
                renderHorario(targetIdx);
                setTimeout(doScroll, 80);
            }} else {{
                setTimeout(doScroll, 60);
            }}
        }}

        // ── DISCIPLINES LIST ────────────────────────────────────────────
        function getTypeIcon(type) {{
            const icons = {{ link:'🔗', pdf:'📄', doc:'📝', video:'🎬', slide:'📊', outro:'📁', file:'📎' }};
            return icons[type] || '📎';
        }}

        function renderDisciplines(filter) {{
            const grid = document.getElementById('disciplines-grid');
            const q = (filter || '').toLowerCase();
            const filtered = UC_LIST.filter(uc =>
                !q ||
                uc.codigo.toLowerCase().includes(q) ||
                uc.descricao.toLowerCase().includes(q) ||
                (uc.formador || '').toLowerCase().includes(q)
            );

            if (filtered.length === 0) {{
                grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">Nenhuma UC encontrada.</div>`;
                return;
            }}

            grid.innerHTML = filtered.map(uc => {{
                const hasNotes     = !!localStorage.getItem(`uc_notes_${{uc.codigo}}`);
                const numMaterials = parseInt(localStorage.getItem(`uc_mat_count_${{uc.codigo}}`)) || 0;
                const notesBadge = hasNotes
                    ? `<span class="uc-meta-tag uc-has-notes">📝 Apontamentos</span>` : '';
                const matBadge = numMaterials > 0
                    ? `<span class="uc-meta-tag uc-has-materials">📎 ${{numMaterials}} material${{numMaterials !== 1 ? 'is' : ''}}</span>` : '';
                const chBadge = uc.carga_horaria
                    ? `<span class="uc-meta-tag">⏱ ${{uc.carga_horaria}}h</span>` : '';
                const formBadge = uc.formador
                    ? `<span class="uc-meta-tag">👤 ${{shortName(uc.formador)}}</span>` : '';

                const {{ done: ucDone, scheduled: ucSched }} = computeUCHours(uc.codigo);
                const ucTarget = uc.carga_horaria;
                let progressHtml = '';
                if (ucTarget && ucSched > 0) {{
                    const donePct  = Math.min(100, Math.round((ucDone  / ucTarget) * 100));
                    const schedPct = Math.min(100, Math.round((ucSched / ucTarget) * 100));
                    const label = ucDone > 0
                        ? `${{ucDone.toFixed(0)}}h realizadas · ${{ucSched.toFixed(0)}}h agendadas · ${{ucTarget}}h total`
                        : `${{ucSched.toFixed(0)}}h agendadas · ${{ucTarget}}h total`;
                    progressHtml = `
                        <div class="uc-progress-wrap">
                            <div class="uc-progress-bar">
                                <div class="uc-progress-sched" style="width:${{schedPct}}%"></div>
                                <div class="uc-progress-done"  style="width:${{donePct}}%"></div>
                            </div>
                            <div class="uc-progress-label">${{label}}</div>
                        </div>`;
                }}

                return `
                <div class="uc-card" onclick="openUCDetail('${{uc.codigo}}')">
                    <div class="uc-card-code">${{uc.codigo}}</div>
                    <div class="uc-card-name">${{uc.descricao}}</div>
                    ${{progressHtml}}
                    <div class="uc-card-meta">
                        ${{chBadge}}${{formBadge}}${{notesBadge}}${{matBadge}}
                    </div>
                </div>`;
            }}).join('');
        }}

        function filterUCs(value) {{
            renderDisciplines(value);
        }}

        // ── UC SCHEDULE ─────────────────────────────────────────────────
        function buildUCSchedule(ucCode) {{
            const sessions = [];
            HORARIOS.forEach(horario => {{
                horario.dias.forEach(dia => {{
                    const merged = mergeTimeSlots(dia.aulas);
                    merged.forEach(aula => {{
                        if (aula.uc === ucCode) {{
                            sessions.push({{
                                data:      dia.data,
                                dia_semana: dia.dia_semana,
                                hora:      aula.hora,
                                mes_ano:   horario.mes_ano,
                                state:     getAulaState(dia.data, aula.hora)
                            }});
                        }}
                    }});
                }});
            }});
            return sessions;
        }}

        function calcSessionHours(horaStr) {{
            const [s, e] = horaStr.split('-').map(t => {{
                const [h, m] = t.split(':').map(Number);
                return h + m / 60;
            }});
            return e - s;
        }}

        function buildSessionChipsHTML(ucCode, sessions, activeKey) {{
            return sessions.map(s => {{
                const [y, mo, d] = s.data.split('-');
                const sKey = s.num === 1 ? ucCode : `${{ucCode}}_${{s.data}}`;
                const isActive = sKey === activeKey ? ' active-session' : '';
                return `<div class="session-chip ${{s.state}}${{isActive}}" onclick="openSessionDetail('${{ucCode}}','${{s.data}}',${{s.num}},'${{s.hora}}','${{s.dia_semana}}','${{s.mes_ano}}')">
                    <span class="session-chip-num">S${{s.num}}</span>
                    <span class="session-chip-date">${{d}}/${{mo}}</span>
                </div>`;
            }}).join('');
        }}

        function renderUCSchedule(ucCode) {{
            const sessions = buildUCSchedule(ucCode);
            const contentEl = document.getElementById('uc-schedule-content');
            const hoursEl   = document.getElementById('uc-total-hours');

            if (sessions.length === 0) {{
                contentEl.innerHTML = '<p class="no-sessions-msg">Sem sessões programadas nos horários disponíveis.</p>';
                hoursEl.textContent = '';
                return;
            }}

            // Total hours
            const totalH = sessions.reduce((sum, s) => sum + calcSessionHours(s.hora), 0);
            const doneH  = sessions.filter(s => s.state === 'past').reduce((sum, s) => sum + calcSessionHours(s.hora), 0);
            hoursEl.textContent = doneH > 0
                ? `${{doneH.toFixed(0)}}h / ${{totalH.toFixed(0)}}h realizadas`
                : `${{totalH.toFixed(0)}}h programadas`;

            // Assign session numbers
            let sessionNum = 1;
            sessions.forEach(s => {{ s.num = sessionNum++; }});

            // Flat horizontal chips (no month grouping)
            contentEl.innerHTML = `<div class="session-list">${{buildSessionChipsHTML(ucCode, sessions, null)}}</div>`;
        }}

        // ── UC DETAIL ───────────────────────────────────────────────────
        async function openUCDetail(ucCode) {{
            currentUCCode = ucCode;
            if (currentView !== 'uc-detail') previousView = currentView;

            const uc = UC_MAP[ucCode] || {{}};
            document.getElementById('detail-uc-code').textContent = ucCode;
            document.getElementById('detail-uc-name').textContent = uc.descricao || ucCode;

            let metaHtml = '';
            if (uc.carga_horaria) metaHtml += `<span class="detail-meta-pill">⏱ ${{uc.carga_horaria}}h</span>`;
            if (uc.formador)      metaHtml += `<span class="detail-meta-pill">👤 ${{shortName(uc.formador)}}</span>`;
            document.getElementById('detail-uc-meta').innerHTML = metaHtml;

            // Render sessions (horizontal chips)
            renderUCSchedule(ucCode);

            switchView('uc-detail');

            // Subscribe UC chat
            ucChatInit(ucCode);
        }}

        // ── MATERIALS (Firestore) ───────────────────────────────────────
        async function getMaterials(key) {{
            if (materialsCache[key]) return materialsCache[key];
            try {{
                const doc = await db.collection('materials').doc(key).get();
                const list = doc.exists ? (doc.data().items || []) : [];
                materialsCache[key] = list;
                return list;
            }} catch(e) {{ return []; }}
        }}

        function getYouTubeId(url) {{
            try {{
                const u = new URL(url);
                if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
                if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
            }} catch {{}}
            return null;
        }}

        function renderMaterials(list) {{
            const el = document.getElementById('session-materials-list');
            if (!el) return;
            if (!list || list.length === 0) {{
                el.innerHTML = `<div class="no-materials">Sem materiais adicionados ainda.<br>Usa o formulário acima para adicionar links ou ficheiros.</div>`;
                return;
            }}
            el.innerHTML = list.map((m, i) => {{
                if (m.url && isSafeUrl(m.url) && (m.type === 'video' || getYouTubeId(m.url))) {{
                    const safeLabel = escapeHtml(m.label || m.url);
                    const safeSize  = m.size ? escapeHtml(m.size) : '';
                    const ytId      = getYouTubeId(m.url);
                    const playerHtml = ytId
                        ? `<iframe src="https://www.youtube.com/embed/${{escapeHtml(ytId)}}"
                                   frameborder="0" allowfullscreen
                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                                   style="width:100%;aspect-ratio:16/9;display:block;"></iframe>`
                        : `<video controls preload="none" style="width:100%;max-height:360px;display:block;">
                               <source src="${{escapeHtml(m.url)}}" type="${{m.url.endsWith('.webm') ? 'video/webm' : 'video/mp4'}}">
                           </video>`;
                    return `
                        <div class="material-video-wrap">
                            <div class="material-video-header" onclick="toggleVideo(this)" data-idx="${{i}}">
                                <span class="material-icon">🎬</span>
                                <div class="material-info">
                                    <div class="material-label">${{safeLabel}}</div>
                                    ${{safeSize ? `<div class="material-url">📎 ${{safeSize}}</div>` : ''}}
                                </div>
                                <div class="material-video-actions">
                                    <button class="material-btn open" onclick="event.stopPropagation();openMaterial(${{i}})" title="Abrir em separador">↗</button>
                                    <button class="material-btn delete" onclick="event.stopPropagation();deleteMaterial(${{i}})" title="Remover">✕</button>
                                </div>
                                <span class="material-video-toggle">▶ ver</span>
                            </div>
                            <div class="material-video-player" id="video-player-${{i}}">${{playerHtml}}</div>
                        </div>`;
                }}
                // PDF — thumbnail card that opens modal
                if (m.type === 'pdf' && m.url) {{
                    const safeLabel = escapeHtml(m.label || 'documento.pdf');
                    const safeUrl   = escapeHtml(m.url);
                    return `
                        <div class="material-item pdf-thumb" onclick="openPdfModal('${{safeUrl}}', '${{safeLabel}}')" title="Clica para visualizar">
                            <div class="pdf-thumb-preview">📄</div>
                            <div class="pdf-thumb-footer">
                                <div class="material-info">
                                    <div class="material-label">${{safeLabel}}</div>
                                    ${{m.size ? `<div class="pdf-thumb-meta">PDF · ${{escapeHtml(m.size)}}</div>` : '<div class="pdf-thumb-meta">PDF</div>'}}
                                </div>
                                <div class="material-actions">
                                    <button class="material-btn delete" onclick="event.stopPropagation();deleteMaterial(${{i}})" title="Remover">✕</button>
                                </div>
                            </div>
                        </div>`;
                }}
                // Other types — whole card is clickable if it has a URL
                const isUpload  = m.url && m.url.includes('firebasestorage');
                const clickable = m.url && isSafeUrl(m.url);
                const cardClick = clickable ? `onclick="openMaterial(${{i}})" role="link" tabindex="0" onkeydown="if(event.key==='Enter')openMaterial(${{i}})"` : '';
                return `
                    <div class="material-item${{clickable ? ' clickable-card' : ''}}" ${{cardClick}}>
                        <span class="material-icon">${{getTypeIcon(m.type)}}</span>
                        <div class="material-info">
                            <div class="material-label">${{escapeHtml(m.label || m.url)}}</div>
                            ${{!isUpload && m.url ? `<div class="material-url">${{escapeHtml(m.url)}}</div>` : ''}}
                            ${{m.size ? `<div class="material-url">📎 ${{escapeHtml(m.size)}}</div>` : ''}}
                        </div>
                        <div class="material-actions">
                            ${{clickable ? `<span class="material-btn open" aria-hidden="true">↗</span>` : ''}}
                            <button class="material-btn delete" onclick="event.stopPropagation();deleteMaterial(${{i}})" title="Remover">✕</button>
                        </div>
                    </div>`;
            }}).join('');
        }}

        function toggleVideo(header) {{
            const idx    = header.dataset.idx;
            const player = document.getElementById(`video-player-${{idx}}`);
            const toggle = header.querySelector('.material-video-toggle');
            const isOpen = player.classList.toggle('open');
            toggle.textContent = isOpen ? '■ fechar' : '▶ ver';
            if (!isOpen) {{
                const vid = player.querySelector('video');
                if (vid) vid.pause();
                const iframe = player.querySelector('iframe');
                if (iframe) {{ const s = iframe.src; iframe.src = ''; iframe.src = s; }}
            }}
        }}

        let _pdfBlobUrl = null;

        async function openPdfModal(url, label) {{
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
            try {{
                const res  = await fetch(url);
                const blob = await res.blob();
                if (_pdfBlobUrl) URL.revokeObjectURL(_pdfBlobUrl);
                _pdfBlobUrl  = URL.createObjectURL(blob);
                frame.removeAttribute('srcdoc');
                frame.src    = _pdfBlobUrl;
            }} catch (e) {{
                frame.srcdoc = `<body style="margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#1a1a2e;font-family:sans-serif;color:#ccc;gap:1rem"><p>Não foi possível carregar o PDF.</p><a href="${{escapeHtml(url)}}" target="_blank" rel="noopener noreferrer" style="color:#58a6ff;text-decoration:none;border:1px solid #58a6ff;padding:.5rem 1rem;border-radius:6px">↗ Abrir em separador</a></body>`;
            }}
        }}

        function _closePdf() {{
            const modal = document.getElementById('pdf-modal');
            modal.classList.remove('open');
            const f = document.getElementById('pdf-modal-frame');
            f.removeAttribute('src');
            f.removeAttribute('srcdoc');
            document.body.style.overflow = '';
        }}
        function closePdfModal(e) {{
            if (e && e.target !== document.getElementById('pdf-modal')) return;
            _closePdf();
        }}
        function closePdfModalBtn() {{ _closePdf(); }}

        async function addMaterial() {{
            let type    = document.getElementById('mat-type').value;
            const label = document.getElementById('mat-label').value.trim();
            const url   = document.getElementById('mat-url').value.trim();
            if (!url && !label) return;
            if (url && !isSafeUrl(url)) {{
                alert('URL inválido. Usa apenas http:// ou https://');
                return;
            }}
            if (url && getYouTubeId(url)) type = 'video';

            const matKey = currentSessionKey || currentUCCode;
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            const item = {{
                id: `${{Date.now()}}_${{Math.random().toString(36).slice(2)}}`,
                type, label: label || url, url, uid, createdAt: Date.now()
            }};
            try {{
                await db.collection('materials').doc(matKey).set({{
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }}, {{ merge: true }});
                delete materialsCache[matKey];
                const list = await getMaterials(matKey);
                renderMaterials(list);
            }} catch (e) {{
                console.error('Erro ao adicionar material:', e);
                alert('Erro ao guardar material.');
            }}

            document.getElementById('mat-label') && (document.getElementById('mat-label').value = '');
            document.getElementById('mat-url')   && (document.getElementById('mat-url').value   = '');
        }}

        function openMaterial(index) {{
            const matKey = currentSessionKey || currentUCCode;
            const list = materialsCache[matKey] || [];
            const item = list[index];
            if (item && item.url) {{
                if (!isSafeUrl(item.url)) {{
                    alert('URL bloqueado por segurança.');
                    return;
                }}
                window.open(item.url, '_blank', 'noopener,noreferrer');
            }}
        }}

        async function deleteMaterial(index) {{
            const matKey = currentSessionKey || currentUCCode;
            if (!confirm('Remover este material?')) return;
            try {{
                const doc = await db.collection('materials').doc(matKey).get();
                const items = doc.exists ? [...(doc.data().items || [])] : [];
                items.splice(index, 1);
                await db.collection('materials').doc(matKey).set({{ items }});
                delete materialsCache[matKey];
                const updated = await getMaterials(matKey);
                renderMaterials(updated);
            }} catch (e) {{
                console.error('Erro ao apagar material:', e);
                alert('Erro ao apagar material.');
            }}
        }}

        function handleFileSelect(event) {{
            const file = event.target.files[0];
            if (!file) return;
            processFile(file);
            event.target.value = '';
        }}

        async function processFile(file) {{
            const MAX_SIZE = 4 * 1024 * 1024; // 4 MB
            if (file.size > MAX_SIZE) {{
                alert(`Ficheiro demasiado grande (${{(file.size/1024/1024).toFixed(1)}} MB).\\nMáximo: 4 MB. Para ficheiros maiores usa um link (Google Drive, Dropbox…).`);
                return;
            }}
            const EXT_TYPE_MAP = {{
                pdf:'application/pdf', doc:'application/msword',
                docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ppt:'application/vnd.ms-powerpoint',
                pptx:'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                xls:'application/vnd.ms-excel',
                xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                txt:'text/plain', md:'text/markdown',
                png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg',
                gif:'image/gif', webp:'image/webp', zip:'application/zip'
            }};
            const ext = file.name.split('.').pop().toLowerCase();
            const contentType = EXT_TYPE_MAP[ext];
            if (!contentType) {{
                alert('Tipo de ficheiro não permitido. Usa PDF, Word, PowerPoint, imagem ou ZIP.');
                return;
            }}

            const zone = document.getElementById('file-drop-zone');
            zone.innerHTML = '⏳ A enviar ficheiro...';
            zone.style.pointerEvents = 'none';

            let uploadedUrl = null;
            try {{
                const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
                const key      = `${{Date.now()}}-${{safeName}}`;
                const ref      = storage.ref(`uc-files/${{key}}`);
                const snapshot = await ref.put(file, {{ contentType }});
                uploadedUrl    = await snapshot.ref.getDownloadURL();
            }} catch (e) {{
                console.error('[Storage] upload error:', e);
                alert(`Erro ao enviar para Storage: ${{e.message || e.code || e}}`);
                return;
            }}

            try {{
                const typeMap = {{ pdf:'pdf', doc:'doc', docx:'doc', ppt:'slide', pptx:'slide',
                                   xls:'doc', xlsx:'doc', png:'outro', jpg:'outro', jpeg:'outro',
                                   gif:'outro', webp:'outro', txt:'doc', md:'doc', zip:'outro' }};
                const matType = typeMap[ext] || 'outro';
                const matSize = `${{(file.size/1024).toFixed(0)}} KB`;
                const matKey  = currentSessionKey || currentUCCode;
                const uid = auth.currentUser?.uid;
                const item = {{
                    id: `${{Date.now()}}_${{Math.random().toString(36).slice(2)}}`,
                    type: matType, label: file.name, url: uploadedUrl, size: matSize,
                    uid, createdAt: Date.now()
                }};
                await db.collection('materials').doc(matKey).set({{
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }}, {{ merge: true }});
                delete materialsCache[matKey];
                const list = await getMaterials(matKey);
                renderMaterials(list);
            }} catch (e) {{
                console.error('[Firestore] register material error:', e);
                alert(`Ficheiro enviado mas erro ao registar: ${{e.message}}`);
            }} finally {{
                zone.innerHTML = '📂 Arrastar ficheiro ou clicar para selecionar<input type="file" id="file-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.png,.jpg,.zip" onchange="handleFileSelect(event)">';
                zone.style.pointerEvents = '';
            }}
        }}

        // Drag and drop on file zone
        function setupFileDrop() {{
            const zone = document.getElementById('file-drop-zone');
            if (!zone) return;
            zone.addEventListener('dragover', e => {{ e.preventDefault(); zone.classList.add('drag-over'); }});
            zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
            zone.addEventListener('drop', e => {{
                e.preventDefault();
                zone.classList.remove('drag-over');
                const file = e.dataTransfer.files[0];
                if (file) processFile(file);
            }});
        }}

        // ── PLAYGROUND ──────────────────────────────────────────────────
        const pg = {{
            tabs: [],
            active: null,
            counter: {{ python: 0, sql: 0 }},
            pyodide: null,
            pyodideLoading: false,
            SQL: null,
            sqlLoading: false,
            editors: {{}},       // tabId → CodeMirror instance
            cmReady: false,
            cmLoading: false,
            cmSQLReady: false,
        }};

        function pgToggleMenu(e) {{
            e.stopPropagation();
            document.getElementById('pg-add-menu').classList.toggle('open');
        }}
        document.addEventListener('click', () => {{
            document.getElementById('pg-add-menu')?.classList.remove('open');
            document.querySelectorAll('.pg-examples-menu').forEach(m => m.classList.remove('open'));
        }});

        // ── Exemplos Python ────────────────────────────────────
        const PG_EXAMPLES = {js_py_examples};

        // ── Black formatter (Prettier para Python) ─────────────
        const _PG_FMT_CODE = `
import micropip as _mp
await _mp.install('autopep8')
import autopep8 as _autopep8
def _pg_format(src):
    try:
        out = _autopep8.fix_code(src, options={{'aggressive': 1, 'max_line_length': 88}})
        return {{'ok': out, 'err': ''}}
    except Exception as e:
        return {{'ok': src, 'err': str(e)}}
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
        async function pgEnsureCM() {{
            if (pg.cmReady) return;
            if (pg.cmLoading) {{
                while (pg.cmLoading) await new Promise(r => setTimeout(r, 50));
                return;
            }}
            pg.cmLoading = true;
            // CSS
            const addCss = href => {{
                if (document.querySelector(`link[href="${{href}}"]`)) return;
                const l = document.createElement('link');
                l.rel = 'stylesheet'; l.href = href;
                document.head.appendChild(l);
            }};
            addCss(`${{CM_BASE}}/codemirror.min.css`);
            addCss(`${{CM_BASE}}/theme/dracula.min.css`);
            // JS — load sequentially
            const loadJs = src => new Promise((res, rej) => {{
                if (document.querySelector(`script[src="${{src}}"]`)) {{ res(); return; }}
                const s = document.createElement('script'); s.src = src;
                s.onload = res; s.onerror = rej;
                document.head.appendChild(s);
            }});
            await loadJs(`${{CM_BASE}}/codemirror.min.js`);
            await loadJs(`${{CM_BASE}}/mode/python/python.min.js`);
            await loadJs(`${{CM_BASE}}/addon/edit/closebrackets.min.js`);
            await loadJs(`${{CM_BASE}}/addon/edit/matchbrackets.min.js`);
            pg.cmReady = true;
            pg.cmLoading = false;
        }}

        function pgGetCM(tabId) {{ return pg.editors[tabId]; }}

        function pgEditorGetValue(tabId) {{
            const cm = pgGetCM(tabId);
            if (cm) return cm.getValue();
            return document.getElementById(tabId + '-editor')?.value || '';
        }}

        function pgEditorSetValue(tabId, val) {{
            const cm = pgGetCM(tabId);
            if (cm) {{ cm.setValue(val); return; }}
            const el = document.getElementById(tabId + '-editor');
            if (el) el.value = val;
        }}

        function pgToggleExamples(e, menuId) {{
            e.stopPropagation();
            const menu = document.getElementById(menuId);
            const wasOpen = menu.classList.contains('open');
            document.querySelectorAll('.pg-examples-menu').forEach(m => m.classList.remove('open'));
            if (!wasOpen) menu.classList.add('open');
        }}

        function pgLoadExample(tabId, menuId, code) {{
            document.getElementById(menuId).classList.remove('open');
            pgEditorSetValue(tabId, code);
            // Salvar no ficheiro activo
            const tab = pg.tabs.find(t => t.id === tabId);
            const file = tab?.files?.find(f => f.id === tab.activeFile);
            if (file) file.code = code;
            pgGetCM(tabId)?.focus();
        }}

        // ── input() inline ─────────────────────────────────────
        window._pgRequestInput = function(tabId, flushed, prompt) {{
            return new Promise(resolve => {{
                const el = document.getElementById(tabId + '-output');
                if (!el) {{ resolve(''); return; }}
                if (flushed) {{
                    const span = document.createElement('span');
                    span.style.color = '#3fb950';
                    span.style.whiteSpace = 'pre-wrap';
                    span.textContent = flushed;
                    el.appendChild(span);
                }}
                if (prompt) {{
                    const pr = document.createElement('span');
                    pr.style.color = '#58a6ff';
                    pr.textContent = prompt;
                    el.appendChild(pr);
                }}
                const inp = document.createElement('input');
                inp.type = 'text';
                inp.className = 'pg-inline-input';
                el.appendChild(inp);
                el.appendChild(document.createTextNode(' '));
                inp.focus();
                inp.addEventListener('keydown', ev => {{
                    if (ev.key === 'Enter') {{
                        const val = inp.value;
                        const typed = document.createElement('span');
                        typed.style.color = '#e6edf3';
                        typed.textContent = val;
                        inp.replaceWith(typed);
                        el.appendChild(document.createElement('br'));
                        resolve(val);
                    }}
                }});
            }});
        }};

        async function pgNewTab(type) {{
            document.getElementById('pg-add-menu').classList.remove('open');
            if (pg.tabs.length >= 6) {{ alert('Máximo de 6 sessões abertas.'); return; }}
            pg.counter[type]++;
            const id   = `pg-${{type}}-${{pg.counter[type]}}`;
            const label = type === 'python' ? `🐍 Python ${{pg.counter[type]}}` : `🗄️ SQL ${{pg.counter[type]}}`;
            const tab  = {{ id, type, label, cmdHistory: [], cmdHistoryIdx: -1 }};
            if (type === 'sql') tab.db = null;
            if (type === 'python') {{
                const fid = id + '-f0';
                tab.files = [{{ id: fid, name: 'main.py', code: '' }}];
                tab.activeFile = fid;
            }}
            pg.tabs.push(tab);
            pgRenderTabBar();
            pgCreatePanel(tab);
            pgSwitchTab(id);
            if (type === 'python') pgEnsurePyodide(id);
            if (type === 'sql')    pgEnsureSQL(id);
        }}

        function pgCloseTab(id, e) {{
            e?.stopPropagation();
            const idx = pg.tabs.findIndex(t => t.id === id);
            if (idx === -1) return;
            const tab = pg.tabs[idx];
            if (tab.db) {{ try {{ tab.db.close(); }} catch(_) {{}} }}
            if (pg.editors[id]) {{ delete pg.editors[id]; }}
            pg.tabs.splice(idx, 1);
            document.getElementById(id + '-tab')?.remove();
            document.getElementById(id + '-panel')?.remove();
            if (pg.active === id) {{
                pg.active = null;
                const next = pg.tabs[Math.min(idx, pg.tabs.length - 1)];
                if (next) pgSwitchTab(next.id);
                else document.getElementById('pg-empty').style.display = 'flex';
            }}
        }}

        function pgSwitchTab(id) {{
            if (pg.active && pg.active !== id) pgSaveCurrentFile(pg.active);
            pg.active = id;
            pg.tabs.forEach(t => {{
                document.getElementById(t.id + '-tab')?.classList.toggle('active', t.id === id);
                const p = document.getElementById(t.id + '-panel');
                if (p) p.classList.toggle('active', t.id === id);
            }});
            document.getElementById('pg-empty').style.display = 'none';
            // Focus input
            setTimeout(() => {{
                document.getElementById(id + '-input')?.focus();
                pgGetCM(id)?.focus();
            }}, 30);
        }}

        function pgRenderTabBar() {{
            const container = document.getElementById('pg-tabs');
            container.innerHTML = pg.tabs.map(t => `
                <div class="pg-tab${{t.id === pg.active ? ' active' : ''}}"
                     id="${{t.id}}-tab" onclick="pgSwitchTab('${{t.id}}')">
                    ${{escapeHtml(t.label)}}
                    <span class="pg-tab-close" onclick="pgCloseTab('${{t.id}}', event)" title="Fechar">✕</span>
                </div>`).join('');
        }}

        // ── File management ─────────────────────────────────────
        function pgSaveCurrentFile(tabId) {{
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab?.files) return;
            const file = tab.files.find(f => f.id === tab.activeFile);
            if (file) file.code = pgEditorGetValue(tabId);
        }}

        function pgRenderFileTabs(tabId) {{
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab?.files) return;
            const bar = document.getElementById(tabId + '-filetabs');
            if (!bar) return;
            bar.innerHTML = tab.files.map(f => `
                <div class="pg-filetab${{f.id === tab.activeFile ? ' active' : ''}}"
                     id="${{f.id}}-ftab" onclick="pgSwitchFile('${{tabId}}','${{f.id}}')">
                    <span class="pg-filetab-name"
                          ondblclick="pgRenameFile('${{tabId}}','${{f.id}}',event)"
                          title="Duplo clique para renomear">${{escapeHtml(f.name)}}</span>
                    ${{tab.files.length > 1 ? `<span class="pg-filetab-close" onclick="pgCloseFile('${{tabId}}','${{f.id}}',event)">✕</span>` : ''}}
                </div>`).join('') +
                `<span class="pg-filetab-add" onclick="pgNewFile('${{tabId}}')" title="Novo ficheiro">＋</span>`;
        }}

        function pgSwitchFile(tabId, fileId) {{
            pgSaveCurrentFile(tabId);
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            tab.activeFile = fileId;
            const file = tab.files.find(f => f.id === fileId);
            if (file) pgEditorSetValue(tabId, file.code);
            pgRenderFileTabs(tabId);
            pgGetCM(tabId)?.focus();
        }}

        function pgNewFile(tabId) {{
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            if (tab.files.length >= 8) {{ alert('Máximo de 8 ficheiros por sessão.'); return; }}
            pgSaveCurrentFile(tabId);
            const idx  = tab.files.length;
            const fid  = tabId + '-f' + idx;
            const name = idx === 0 ? 'main.py' : idx === 1 ? 'utils.py' : `ficheiro${{idx}}.py`;
            tab.files.push({{ id: fid, name, code: '' }});
            pgSwitchFile(tabId, fid);
        }}

        function pgCloseFile(tabId, fileId, e) {{
            e?.stopPropagation();
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab || tab.files.length <= 1) return;
            const idx = tab.files.findIndex(f => f.id === fileId);
            if (idx === -1) return;
            tab.files.splice(idx, 1);
            if (tab.activeFile === fileId) {{
                const next = tab.files[Math.min(idx, tab.files.length - 1)];
                pgSwitchFile(tabId, next.id);
            }} else {{
                pgRenderFileTabs(tabId);
            }}
        }}

        function pgRenameFile(tabId, fileId, e) {{
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
            const finish = () => {{
                span.contentEditable = 'false';
                const newName = span.textContent.trim() || file.name;
                file.name = newName.endsWith('.py') ? newName : newName + '.py';
                pgRenderFileTabs(tabId);
            }};
            span.onblur = finish;
            span.onkeydown = ev => {{ if (ev.key === 'Enter') {{ ev.preventDefault(); span.blur(); }} }};
        }}

        function pgCreatePanel(tab) {{
            const wrap = document.getElementById('pg-panels');
            const div  = document.createElement('div');
            div.className = 'pg-panel';
            div.id = tab.id + '-panel';
            if (tab.type === 'python') {{
                div.innerHTML = `
                    <div class="pg-editor-wrap">
                        <div class="pg-toolbar">
                            <button class="pg-run-btn" id="${{tab.id}}-run" onclick="pgRunPython('${{tab.id}}')">▶ Correr</button>
                            <button class="pg-clear-btn" onclick="pgClearOutput('${{tab.id}}')">Limpar</button>
                            <div class="pg-examples-wrap">
                                <button class="pg-examples-btn" onclick="pgToggleExamples(event,'${{tab.id}}-ex')">Exemplos ▾</button>
                                <div class="pg-examples-menu" id="${{tab.id}}-ex">
                                    ${{PG_EXAMPLES.map((ex,i) => `<div class="pg-examples-item" data-idx="${{i}}" data-tabid="${{tab.id}}" data-menuid="${{tab.id}}-ex">${{ex.label}}</div>`).join('')}}
                                </div>
                            </div>
                            <span class="pg-hint">Ctrl+Enter para correr</span>
                        </div>
                        <div class="pg-filetabs" id="${{tab.id}}-filetabs"></div>
                        <div class="pg-editor-body">
                            <div class="pg-editor-pane">
                                <div class="pg-editor-cm" id="${{tab.id}}-cm-host"></div>
                            </div>
                            <div class="pg-output-pane">
                                <div class="pg-output-header">Output</div>
                                <div class="pg-output" id="${{tab.id}}-output"><span class="pg-info"># Output aparece aqui</span></div>
                            </div>
                        </div>
                    </div>`;
                pgRenderFileTabs(tab.id);
                // Ligar exemplos via event delegation (evita problemas de aspas em onclick)
                div.querySelectorAll('.pg-examples-item[data-idx]').forEach(el => {{
                    el.addEventListener('click', () => {{
                        const idx = parseInt(el.dataset.idx);
                        pgLoadExample(el.dataset.tabid, el.dataset.menuid, PG_EXAMPLES[idx].code);
                    }});
                }});
                // Inicializar CodeMirror
                pgEnsureCM().then(() => {{
                    const host = document.getElementById(tab.id + '-cm-host');
                    if (!host || pg.editors[tab.id]) return;
                    const cm = CodeMirror(host, {{
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
                        extraKeys: {{
                            'Ctrl-Enter': () => pgRunPython(tab.id),
                            'Tab': cm => {{
                                if (cm.somethingSelected()) cm.indentSelection('add');
                                else cm.replaceSelection('    ', 'end');
                            }}
                        }}
                    }});
                    pg.editors[tab.id] = cm;
                }});
            }} else {{
                div.innerHTML = `
                    <div class="pg-repl">
                        <div class="pg-toolbar">
                            <button class="pg-run-btn" id="${{tab.id}}-run" onclick="pgSQLRun('${{tab.id}}')" disabled>▶ Correr</button>
                            <button class="pg-clear-btn" onclick="pgSQLClear('${{tab.id}}')">Limpar</button>
                            <span class="pg-hint">Ctrl+Enter para correr</span>
                        </div>
                        <div class="pg-repl-body">
                            <div class="pg-repl-editor-pane">
                                <div class="pg-editor-cm" id="${{tab.id}}-cm-host"></div>
                            </div>
                            <div class="pg-repl-history-pane">
                                <div class="pg-repl-history-header">Resultado</div>
                                <div class="pg-repl-history" id="${{tab.id}}-history">
                                    <div class="pg-repl-entry"><span class="pg-info">SQLite 3 — escreve SQL e clica Correr</span></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                // Inicializar CodeMirror SQL
                pgEnsureCM().then(() => pgEnsureCMSQL()).then(() => {{
                    const host = document.getElementById(tab.id + '-cm-host');
                    if (!host || pg.editors[tab.id]) return;
                    const cm = CodeMirror(host, {{
                        value: _SQL_DEFAULT,
                        mode: 'text/x-sql',
                        theme: 'dracula',
                        lineNumbers: true,
                        indentUnit: 4,
                        tabSize: 4,
                        indentWithTabs: false,
                        autoCloseBrackets: true,
                        matchBrackets: true,
                        lineWrapping: false,
                        extraKeys: {{
                            'Ctrl-Enter': () => pgSQLRun(tab.id)
                        }}
                    }});
                    pg.editors[tab.id] = cm;
                }});
            }}
            wrap.appendChild(div);
        }}

        // ── Python ──────────────────────────────────────────
        async function pgEnsurePyodide(tabId) {{
            if (pg.pyodide) {{ pgSetRunReady(tabId); return; }}
            if (pg.pyodideLoading) {{
                pgSetOutput(tabId, '<span class="pg-info"># A carregar Python (Pyodide)…</span>');
                while (pg.pyodideLoading) await new Promise(r => setTimeout(r, 200));
                if (pg.pyodide) pgSetRunReady(tabId);
                return;
            }}
            pg.pyodideLoading = true;
            pgSetOutput(tabId, '<span class="pg-info"># A carregar Python (~10 MB, apenas na primeira vez)…</span>');
            const btn = document.getElementById(tabId + '-run');
            if (btn) btn.disabled = true;
            const _timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout (>45s). Faz Ctrl+Shift+R e tenta de novo. Se o erro persistir, o browser pode estar a bloquear WebAssembly (verifica as Shields/CSP).')), 45000)
            );
            try {{
                await pgLoadScript('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
                pg.pyodide = await Promise.race([
                    loadPyodide({{ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' }}),
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
    return {{'out': out, 'err': err}}
`);
                // Instalar autopep8 para auto-formatação (silencioso)
                try {{
                    await pg.pyodide.loadPackage('micropip');
                    await pg.pyodide.runPythonAsync(_PG_FMT_CODE);
                }} catch(_) {{/* autopep8 é opcional — não bloqueia */}}
                pgSetRunReady(tabId);
            }} catch(e) {{
                pgSetOutput(tabId, `<span class="pg-err">Erro: ${{e.message}}</span>`);
            }} finally {{
                if (btn) {{ btn.disabled = false; btn.classList.remove('loading'); }}
                pg.pyodideLoading = false;
            }}
        }}

        function pgSetRunReady(tabId) {{
            const btn = document.getElementById(tabId + '-run');
            if (btn) {{ btn.disabled = false; btn.classList.remove('loading'); }}
            pgSetOutput(tabId, '<span class="pg-info"># Python pronto — escreve código e clica Correr</span>');
        }}

        function pgEditorKey(e, tabId) {{ /* legacy — CodeMirror usa extraKeys */ }}

        async function pgRunPython(tabId) {{
            if (!pg.pyodide) {{ await pgEnsurePyodide(tabId); return; }}
            const code = pgEditorGetValue(tabId).trim();
            if (!code) return;
            const btn = document.getElementById(tabId + '-run');
            if (btn) btn.disabled = true;
            const outputEl = document.getElementById(tabId + '-output');
            if (outputEl) outputEl.innerHTML = '';
            try {{
                const tab = pg.tabs.find(t => t.id === tabId);
                if (!tab._ns) tab._ns = pg.pyodide.globals.get('dict')();
                if (!pg.pyodide.globals.has('_pg_exec_async')) {{
                    await pgEnsurePyodide(tabId);
                    return;
                }}
                // Salvar ficheiro activo
                pgSaveCurrentFile(tabId);
                // Auto-formatar com autopep8 (se disponível)
                if (pg.pyodide.globals.has('_pg_format')) {{
                    for (const f of tab.files) {{
                        if (!f.code.trim()) continue;
                        pg.pyodide.globals.set('_pg_fmt_src', f.code);
                        const p = pg.pyodide.runPython('_pg_format(_pg_fmt_src)');
                        const r = p.toJs(); p.destroy();
                        if (!r.get('err')) f.code = r.get('ok');
                    }}
                    // Reflectir no editor o ficheiro activo formatado
                    const activeFile = tab.files.find(f => f.id === tab.activeFile);
                    if (activeFile) pgEditorSetValue(tabId, activeFile.code);
                }}
                const files = tab.files.filter(f => f.code.trim()).map(f => ({{name: f.name, code: f.code}}));
                if (!files.length) {{ pgSetOutput(tabId, '<span class="pg-info"># (sem código)</span>'); return; }}
                pg.pyodide.globals.set('_pg_ns', tab._ns);
                pg.pyodide.globals.set('_pg_tab_id', tabId);
                pg.pyodide.globals.set('_pg_files', files);
                const proxy = await pg.pyodide.runPythonAsync('await _pg_exec_async(_pg_files.to_py(), _pg_ns, _pg_tab_id)');
                const result = proxy.toJs();
                proxy.destroy();
                const out = result.get('out') || '';
                const err = result.get('err') || '';
                if (out) {{
                    const span = document.createElement('span');
                    span.style.color = '#3fb950';
                    span.style.whiteSpace = 'pre-wrap';
                    span.textContent = out;
                    outputEl.appendChild(span);
                }}
                if (err) {{
                    const span = document.createElement('span');
                    span.style.color = '#f85149';
                    span.style.whiteSpace = 'pre-wrap';
                    span.textContent = err;
                    outputEl.appendChild(span);
                }}
                if (!out && !err && !outputEl.hasChildNodes())
                    pgSetOutput(tabId, '<span class="pg-info"># (sem output)</span>');
            }} catch(e) {{
                pgSetOutput(tabId, `<span class="pg-err">${{escapeHtml(e.message)}}</span>`);
            }} finally {{
                if (btn) btn.disabled = false;
            }}
        }}

        function pgSetOutput(tabId, html) {{
            const el = document.getElementById(tabId + '-output');
            if (el) el.innerHTML = html;
        }}
        function pgClearOutput(tabId) {{
            pgSetOutput(tabId, '<span class="pg-info"># Output limpo</span>');
        }}

        // ── SQL ─────────────────────────────────────────────
        async function pgEnsureCMSQL() {{
            if (pg.cmSQLReady) return;
            await new Promise((res, rej) => {{
                const src = `${{CM_BASE}}/mode/sql/sql.min.js`;
                if (document.querySelector(`script[src="${{src}}"]`)) {{ res(); return; }}
                const s = document.createElement('script'); s.src = src;
                s.onload = () => {{ pg.cmSQLReady = true; res(); }};
                s.onerror = rej;
                document.head.appendChild(s);
            }});
        }}

        async function pgEnsureSQL(tabId) {{
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            if (tab.db) return;
            if (pg.sqlLoading) {{
                pgSQLAppend(tabId, 'info', 'A carregar SQLite…');
                while (pg.sqlLoading) await new Promise(r => setTimeout(r, 200));
            }}
            if (!pg.SQL) {{
                pg.sqlLoading = true;
                pgSQLAppend(tabId, 'info', 'A carregar sql.js (apenas na primeira vez)…');
                try {{
                    await pgLoadScript('https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-asm.js');
                    if (typeof window.initSqlJs !== 'function') throw new Error("initSqlJs is not defined");
                    const p = window.initSqlJs();
                    pg.SQL = await Promise.race([
                        p,
                        new Promise((_, rej) => setTimeout(() => rej(new Error('Timeout a inicializar sql.js (demasiado lento)')), 15000))
                    ]);
                }} catch(e) {{
                    pgSQLAppend(tabId, 'err', 'Erro ao carregar sql.js: ' + e.message);
                    pg.sqlLoading = false;
                    return;
                }}
                pg.sqlLoading = false;
            }}
            tab.db = new pg.SQL.Database();
            pgSQLAppend(tabId, 'info', 'SQLite pronto — escreve SQL e clica Correr (ou Ctrl+Enter).');
            const runBtn = document.getElementById(tabId + '-run');
            if (runBtn) runBtn.disabled = false;
            pgGetCM(tabId)?.focus();
        }}

        function pgSQLKey(e, tabId) {{ /* legacy */ }}

        async function pgSQLRun(tabId) {{
            const cm = pgGetCM(tabId);
            const cmd = cm ? cm.getValue().trim() : '';
            if (!cmd) return;
            await pgRunSQL(tabId, cmd);
        }}

        function pgSQLClear(tabId) {{
            const hist = document.getElementById(tabId + '-history');
            if (hist) hist.innerHTML = '<div class="pg-repl-entry"><span class="pg-info">Output limpo.</span></div>';
        }}

        async function pgRunSQL(tabId, cmd) {{
            // Mostrar preview curto do comando (primeira linha não-vazia)
            const firstLine = cmd.split('\\n').find(l => l.trim() && !l.trim().startsWith('--')) || cmd.split('\\n')[0];
            const stmtCount = (cmd.match(/;/g) || []).length;
            const label = stmtCount > 1 ? `${{firstLine.trim()}} … (${{stmtCount}} statements)` : firstLine.trim();
            pgSQLAppend(tabId, 'prompt', label);
            const tab = pg.tabs.find(t => t.id === tabId);
            if (!tab) return;
            if (!tab.db) {{ await pgEnsureSQL(tabId); if (!tab.db) return; }}
            try {{
                const results = tab.db.exec(cmd);
                if (results.length === 0) {{
                    pgSQLAppend(tabId, 'out', 'OK');
                }} else {{
                    results.forEach(r => pgSQLAppend(tabId, 'table', pgFormatTable(r)));
                }}
            }} catch(e) {{
                pgSQLAppend(tabId, 'err', e.message);
            }}
        }}

        function pgSQLAppend(tabId, type, text) {{
            const hist = document.getElementById(tabId + '-history');
            if (!hist) return;
            const div = document.createElement('div');
            div.className = 'pg-repl-entry';
            if (type === 'prompt') {{
                div.innerHTML = `<span class="pg-repl-prompt">sqlite&gt; </span><span>${{escapeHtml(text)}}</span>`;
            }} else if (type === 'table') {{
                div.innerHTML = `<span class="pg-repl-tbl">${{text}}</span>`;
            }} else if (type === 'err') {{
                div.innerHTML = `<span class="pg-repl-err">ERRO: ${{escapeHtml(text)}}</span>`;
            }} else if (type === 'info') {{
                div.innerHTML = `<span class="pg-info">${{escapeHtml(text)}}</span>`;
            }} else {{
                div.innerHTML = `<span class="pg-repl-out">${{escapeHtml(text)}}</span>`;
            }}
            hist.appendChild(div);
            hist.scrollTop = hist.scrollHeight;
        }}

        function pgFormatTable(result) {{
            const cols = result.columns;
            const rows = result.values;
            const widths = cols.map((c, i) => Math.max(
                c.length,
                ...rows.map(r => String(r[i] ?? 'NULL').length)
            ));
            const pad = (s, w) => String(s ?? 'NULL').padEnd(w);
            const sep = widths.map(w => '─'.repeat(w + 2)).join('┼');
            const header = '│ ' + cols.map((c, i) => pad(c, widths[i])).join(' │ ') + ' │';
            const divider = '├─' + sep + '─┤';
            const top     = '┌─' + widths.map(w => '─'.repeat(w + 2)).join('┬─') + '─┐';
            const bottom  = '└─' + widths.map(w => '─'.repeat(w + 2)).join('┴─') + '─┘';
            const dataRows = rows.map(r =>
                '│ ' + r.map((v, i) => pad(v, widths[i])).join(' │ ') + ' │'
            );
            const lines = [top, header, divider, ...dataRows, bottom];
            return lines.join('\\n') + '\\n(' + rows.length + ' ' + (rows.length === 1 ? 'linha' : 'linhas') + ')';
        }}

        function pgLoadScript(url) {{
            return new Promise((resolve, reject) => {{
                if (document.querySelector(`script[src="${{url}}"]`)) {{ resolve(); return; }}
                const s = document.createElement('script');
                s.src = url;
                s.onload = resolve;
                s.onerror = () => reject(new Error('Falha ao carregar: ' + url));
                document.head.appendChild(s);
            }});
        }}

        // ── AUTH ────────────────────────────────────────────────────────
        function showAuthGate() {{
            document.getElementById('auth-gate').style.display = 'flex';
            const navInfo = document.getElementById('nav-user-info');
            if (navInfo) navInfo.style.display = 'none';
        }}

        function hideAuthGate() {{
            document.getElementById('auth-gate').style.display = 'none';
            const user = auth.currentUser;
            if (user) {{
                const name     = user.displayName || user.email || '–';
                const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                const navInfo  = document.getElementById('nav-user-info');
                if (navInfo) {{
                    document.getElementById('nav-user-avatar').textContent = initials;
                    document.getElementById('nav-user-name').textContent   = name.split(' ')[0];
                    navInfo.style.display = 'flex';
                }}
                // Write user presence to Firestore for Turma panel
                userPresenceWrite(user);
                // Mostrar link de admin/moderador (role já verificado em onAuthStateChanged)
                const adminLink = document.getElementById('nav-admin-link');
                if (adminLink && (window._userRole === 'admin' || window._userRole === 'moderador')) {{
                    adminLink.style.display = '';
                }}
                // Audit: login
                auditLogWrite('login', '');
                // Start background chat subscription (badge on all views)
                chatStartBackground();
            }}
        }}

        function signInWithMicrosoftPersonal() {{
            const btns = document.querySelectorAll('.auth-btn');
            btns.forEach(b => {{ b.disabled = true; b.style.opacity = '0.6'; }});
            const provider = new firebase.auth.OAuthProvider('microsoft.com');
            provider.setCustomParameters({{ prompt: 'select_account' }});
            auth.signInWithPopup(provider).catch(e => {{
                if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {{
                    auth.signInWithRedirect(provider);
                }} else {{
                    btns.forEach(b => {{ b.disabled = false; b.style.opacity = ''; }});
                    const msg = document.getElementById('auth-err');
                    if (msg) {{ msg.textContent = 'Erro (' + (e.code || '') + '): ' + e.message; msg.style.display = 'block'; }}
                }}
            }});
        }}

        function signInWithGoogle() {{
            const btns = document.querySelectorAll('.auth-btn');
            btns.forEach(b => {{ b.disabled = true; b.style.opacity = '0.6'; }});
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({{ prompt: 'select_account' }});
            auth.signInWithPopup(provider).catch(e => {{
                if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {{
                    auth.signInWithRedirect(provider);
                }} else {{
                    btns.forEach(b => {{ b.disabled = false; b.style.opacity = ''; }});
                    const msg = document.getElementById('auth-err');
                    if (msg) {{ msg.textContent = 'Erro (' + (e.code || '') + '): ' + e.message; msg.style.display = 'block'; }}
                }}
            }});
        }}

        function initAuth() {{
            auth.getRedirectResult().then(result => {{
                // Se voltou de redirect com utilizador → onAuthStateChanged trata
            }}).catch(e => {{
                if (e.code && e.code !== 'auth/no-auth-event') {{
                    const msg = document.getElementById('auth-err');
                    if (msg) {{ msg.textContent = 'Erro de autenticação (' + e.code + '): ' + e.message; msg.style.display = 'block'; }}
                }}
            }});
            auth.onAuthStateChanged(async user => {{
                if (user) {{
                    // 1. Verificar se há convite pendente e resgatar via Cloud Function
                    const pendingInvite = localStorage.getItem('pending_invite');
                    if (pendingInvite) {{
                        localStorage.removeItem('pending_invite');
                        try {{
                            // Região explícita — a função está em europe-west1, não us-central1
                            const fn = firebase.app().functions('europe-west1').httpsCallable('redeemInvite');
                            await fn({{ token: pendingInvite }});
                        }} catch(e) {{
                            console.error('Invite redeem failed:', e.code, e.message);
                        }}
                    }}

                    // 2. Verificar role APÓS possível resgate de convite
                    try {{
                        const doc = await db.collection('users').doc(user.uid).get();
                        const role = doc.exists ? (doc.data().role || 'blocked') : 'blocked';
                        if (role === 'blocked') {{
                            await auth.signOut();
                            showAuthGate();
                            const msg = document.getElementById('auth-err');
                            if (msg) {{
                                msg.textContent = '🚫 Acesso não autorizado. Necessitas de um convite válido para entrar.';
                                msg.style.display = 'block';
                            }}
                            return;
                        }}
                        window._userRole = role;
                        window._isModerador = (role === 'moderador' || role === 'admin');
                    }} catch(e) {{
                        window._userRole = 'blocked';
                        window._isModerador = false;
                        showAuthGate();
                        return;
                    }}
                    hideAuthGate();
                    if (!window._dashboardInited) {{
                        window._dashboardInited = true;
                        init();
                    }}
                }} else {{
                    window._dashboardInited = false;
                    window._userRole = null;
                    window._isModerador = false;
                    showAuthGate();
                }}
            }});
        }}

        // ── DASHBOARD ───────────────────────────────────────────────────
        function renderDashboardGreeting() {{
            const now  = new Date();
            const hour = now.getHours();
            let greet  = 'Boa tarde';
            if (hour < 12) greet = 'Bom dia';
            else if (hour >= 20) greet = 'Boa noite';
            const user = auth.currentUser;
            const first = (user?.displayName || '').split(' ')[0] || '';
            document.getElementById('dash-greeting-text').textContent = greet + (first ? `, ${{first}}` : '') + '!';
            document.getElementById('dash-date').textContent =
                now.toLocaleDateString('pt-PT', {{ weekday:'long', year:'numeric', month:'long', day:'numeric' }});
        }}

        // ── TURMA ────────────────────────────────────────────────────────
        async function userPresenceWrite(user) {{
            if (!user) return;
            try {{
                await db.collection('users').doc(user.uid).set({{
                    uid:         user.uid,
                    email:       user.email || '',
                    displayName: user.displayName || user.email || 'Anónimo',
                    photoURL:    user.photoURL || '',
                    lastSeen:    firebase.firestore.FieldValue.serverTimestamp()
                }}, {{ merge: true }});
            }} catch(e) {{ console.warn('Presence write failed:', e); }}
        }}

        async function auditLogWrite(action, details) {{
            const user = auth.currentUser;
            if (!user) return;
            try {{
                await db.collection('audit_log').add({{
                    uid:         user.uid,
                    email:       user.email || '',
                    displayName: user.displayName || user.email || 'Anónimo',
                    action:      action,
                    details:     details || '',
                    timestamp:   firebase.firestore.FieldValue.serverTimestamp()
                }});
            }} catch(e) {{ /* audit errors never break the app */ }}
        }}

        async function renderTurma() {{
            // Dashboard mini chips
            const grid = document.getElementById('turma-grid');
            if (!grid) return;
            try {{
                const snap = await db.collection('users').orderBy('lastSeen', 'desc').limit(40).get();
                if (snap.empty) {{
                    grid.innerHTML = '<span style="color:var(--text-secondary);font-size:0.82rem;">Nenhum colega ainda.</span>';
                    return;
                }}
                const uid = auth.currentUser?.uid;
                const activeDocs = snap.docs.filter(doc => (doc.data().role || 'aluno') !== 'blocked');
                if (!activeDocs.length) {{
                    grid.innerHTML = '<span style="color:var(--text-secondary);font-size:0.82rem;">Nenhum colega ainda.</span>';
                    return;
                }}
                grid.innerHTML = activeDocs.map(doc => {{
                    const m = doc.data();
                    const initials = (m.displayName || '?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
                    const isMe = m.uid === uid;
                    const avatarHtml = m.photoURL
                        ? `<div class="turma-chip-avatar"><img src="${{escapeHtml(m.photoURL)}}" loading="lazy"></div>`
                        : `<div class="turma-chip-avatar">${{escapeHtml(initials)}}</div>`;
                    return `<div class="turma-chip${{isMe ? ' online' : ''}}" onclick="switchView('turma')" style="cursor:pointer;">
                        ${{avatarHtml}}
                        <span>${{escapeHtml(m.displayName?.split(' ')[0] || 'Anónimo')}}</span>
                    </div>`;
                }}).join('');
            }} catch(e) {{
                grid.innerHTML = '<span style="color:var(--text-secondary);font-size:0.82rem;">Não foi possível carregar.</span>';
                console.warn('renderTurma:', e);
            }}
        }}

        async function renderTurmaView() {{
            const list = document.getElementById('turma-list');
            if (!list) return;
            list.innerHTML = '<span style="color:var(--text-secondary);font-size:0.82rem;">A carregar…</span>';
            try {{
                const snap = await db.collection('users').orderBy('lastSeen', 'desc').limit(60).get();
                if (snap.empty) {{
                    list.innerHTML = '<p style="color:var(--text-secondary);">Nenhum participante registado ainda.</p>';
                    return;
                }}
                const myUid = auth.currentUser?.uid;
                const activeDocs = snap.docs.filter(doc => (doc.data().role || 'aluno') !== 'blocked');
                if (!activeDocs.length) {{
                    list.innerHTML = '<p style="color:var(--text-secondary);">Nenhum participante registado ainda.</p>';
                    return;
                }}
                list.innerHTML = activeDocs.map(doc => {{
                    const m   = doc.data();
                    const ini = (m.displayName || '?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
                    const isMe = m.uid === myUid;
                    const lastSeen = m.lastSeen?.toDate
                        ? m.lastSeen.toDate().toLocaleDateString('pt-PT', {{day:'2-digit',month:'short',year:'numeric'}})
                        : '–';
                    const avatarHtml = m.photoURL
                        ? `<img src="${{escapeHtml(m.photoURL)}}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;" loading="lazy">`
                        : `<div style="width:38px;height:38px;border-radius:50%;background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#000;flex-shrink:0;">${{escapeHtml(ini)}}</div>`;
                    return `<div style="display:flex;align-items:center;gap:0.85rem;padding:0.7rem 1rem;background:var(--surface-color);border:1px solid ${{isMe ? 'var(--accent-color)' : 'var(--border-color)'}};border-radius:10px;">
                        ${{avatarHtml}}
                        <div style="flex:1;min-width:0;">
                            <div style="font-weight:600;color:${{isMe ? 'var(--accent-color)' : '#fff'}};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                ${{escapeHtml(m.displayName || 'Anónimo')}}${{isMe ? ' <span style="font-size:0.7rem;opacity:0.7;">(tu)</span>' : ''}}
                            </div>
                            <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.1rem;">último acesso: ${{lastSeen}}</div>
                        </div>
                    </div>`;
                }}).join('');
            }} catch(e) {{
                list.innerHTML = '<p style="color:var(--text-secondary);">Não foi possível carregar a lista.</p>';
                console.warn('renderTurmaView:', e);
            }}
        }}

        // ── DEFINIÇÕES ──────────────────────────────────────────────────
        function settingsUpdateUser() {{
            const user = auth.currentUser;
            if (!user) return;
            const nameEl  = document.getElementById('settings-user-name');
            const emailEl = document.getElementById('settings-user-email');
            if (nameEl)  nameEl.textContent  = user.displayName || '–';
            if (emailEl) emailEl.textContent = user.email || '–';
        }}

        // ── CONVITES ─────────────────────────────────────────────────────
        function genToken() {{
            const arr = new Uint8Array(32);
            crypto.getRandomValues(arr);
            return Array.from(arr).map(b => b.toString(16).padStart(2,'0')).join('');
        }}

        async function createInvite(type) {{
            const token = genToken();
            const isIndividual = type === 'individual';
            const uid  = auth.currentUser?.uid;
            const name = auth.currentUser?.displayName || auth.currentUser?.email || '–';
            try {{
                await db.collection('invites').doc(token).set({{
                    token,
                    type,
                    createdBy:      uid,
                    createdByName:  name,
                    createdAt:      firebase.firestore.FieldValue.serverTimestamp(),
                    expiresAt:      isIndividual
                        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  // 7 dias
                        : null,
                    maxUses:        isIndividual ? 1 : null,
                    uses:           0,
                    usedBy:         [],
                    active:         true,
                }});
                toast(isIndividual ? 'Convite individual criado (7 dias)' : 'Link de turma criado');
                loadInvites();
            }} catch(e) {{
                toast('Erro ao criar convite: ' + e.message, 'error');
            }}
        }}

        async function revokeInvite(token) {{
            if (!confirm('Revogar este convite? Links existentes deixarão de funcionar.')) return;
            try {{
                await db.collection('invites').doc(token).update({{ active: false }});
                toast('Convite revogado');
                loadInvites();
            }} catch(e) {{
                toast('Erro: ' + e.message, 'error');
            }}
        }}

        async function deleteInvite(token) {{
            if (!confirm('Apagar este convite permanentemente?')) return;
            try {{
                await db.collection('invites').doc(token).delete();
                toast('Convite apagado');
                loadInvites();
            }} catch(e) {{
                toast('Erro: ' + e.message, 'error');
            }}
        }}

        async function loadInvites() {{
            const list = document.getElementById('invite-list');
            if (!list) return;
            list.innerHTML = '<span style="color:var(--text-secondary);font-size:0.8rem;">A carregar…</span>';
            try {{
                const uid  = auth.currentUser?.uid;
                const snap = await db.collection('invites')
                    .where('createdBy', '==', uid)
                    .get({{ source: 'server' }});
                if (snap.empty) {{
                    list.innerHTML = '<span style="color:var(--text-secondary);font-size:0.8rem;">Nenhum convite criado ainda.</span>';
                    return;
                }}
                list.innerHTML = '';
                const docs = snap.docs.sort((a, b) => {{
                    const ta = a.data().createdAt?.toMillis?.() || 0;
                    const tb = b.data().createdAt?.toMillis?.() || 0;
                    return tb - ta;
                }});
                docs.forEach(doc => {{
                    const inv  = doc.data();
                    const card = renderInviteCard(doc.id, inv);
                    list.appendChild(card);
                }});
            }} catch(e) {{
                list.innerHTML = '<span style="color:var(--text-secondary);font-size:0.8rem;">Erro ao carregar convites.</span>';
            }}
        }}

        function renderInviteCard(token, inv) {{
            const link    = `${{window.location.origin}}${{window.location.pathname}}?invite=${{token}}`;
            const isUsed  = inv.maxUses !== null && inv.uses >= inv.maxUses;
            const status  = !inv.active ? 'revoked' : isUsed ? 'used' : 'active';
            const statusLabel = {{ active: '● ativo', revoked: '● revogado', used: '✓ usado' }}[status];
            const expiry  = inv.expiresAt
                ? inv.expiresAt.toDate?.().toLocaleDateString('pt-PT', {{day:'2-digit',month:'short',year:'numeric'}}) || '–'
                : 'sem expiração';

            const div = document.createElement('div');
            div.className = `invite-card${{status === 'revoked' ? ' revoked' : ''}}`;
            div.innerHTML = `
                <div class="invite-card-header">
                    <div style="display:flex;gap:0.4rem;align-items:center;">
                        <span class="invite-type-badge ${{inv.type}}">${{inv.type === 'individual' ? '👤 Individual' : '👥 Turma'}}</span>
                        <span class="invite-status-badge ${{status}}">${{statusLabel}}</span>
                    </div>
                    <span style="font-size:0.68rem;color:var(--text-secondary);">${{inv.uses || 0}} uso${{inv.uses !== 1 ? 's' : ''}}</span>
                </div>
                <div class="invite-meta">
                    Expira: ${{expiry}}
                    ${{inv.createdAt?.toDate ? ' · criado ' + inv.createdAt.toDate().toLocaleDateString('pt-PT') : ''}}
                </div>
                <div class="invite-actions">
                    <button class="invite-action-btn" onclick="navigator.clipboard.writeText('${{link}}').then(()=>toast('Link copiado!'))">📋 Copiar link</button>
                    <button class="invite-action-btn" onclick="toggleQR(this,'${{token}}','${{link}}')">📷 QR Code</button>
                    ${{inv.active ? `<button class="invite-action-btn danger" onclick="revokeInvite('${{token}}')">🚫 Revogar</button>` : ''}}
                    <button class="invite-action-btn danger" onclick="deleteInvite('${{token}}')">🗑️ Apagar</button>
                </div>
                <div class="invite-qr-wrap" id="qr-${{token}}" style="display:none;margin-top:0.8rem;"></div>`;
            return div;
        }}

        function toggleQR(btn, token, link) {{
            const wrap = document.getElementById('qr-' + token);
            if (!wrap) return;
            if (wrap.style.display !== 'none') {{
                wrap.style.display = 'none';
                return;
            }}
            wrap.style.display = 'inline-block';
            if (!wrap.dataset.rendered) {{
                wrap.dataset.rendered = '1';
                new QRCode(wrap, {{ text: link, width: 160, height: 160, correctLevel: QRCode.CorrectLevel.H }});
            }}
        }}

        // ── CHAT (full-page view) ────────────────────────────────────────
        function chatViewInit() {{
            if (chatUnsub) return;   // already subscribed
            const q = db.collection('chat_global')
                .orderBy('timestamp', 'asc')
                .limitToLast(80);
            chatUnsub = q.onSnapshot(snap => {{
                const el  = document.getElementById('chat-view-msgs');
                const uid = auth.currentUser?.uid;
                let newCount = 0;
                const msgs = [];
                snap.forEach(doc => {{
                    const m = {{ id: doc.id, ...doc.data() }};
                    if (!m.deleted) {{
                        msgs.push(m);
                        if (m.timestamp?.toMillis && m.timestamp.toMillis() > chatLastRead) newCount++;
                    }}
                }});
                if (!el) return;
                el.innerHTML = msgs.length === 0
                    ? '<div class="chat-empty">Sem mensagens ainda. Sê o primeiro!</div>'
                    : msgs.map(m => chatBubbleHtml(m, uid, 'chat')).join('');
                el.scrollTop = el.scrollHeight;
                if (currentView !== 'chat') chatUpdateBadge(newCount);
                else chatMarkRead();
            }}, err => console.warn('Chat error:', err));
        }}

        function chatBubbleHtml(m, uid, channel) {{
            const mine   = m.uid === uid;
            const delBtn = `<button class="chat-del-btn" title="Apagar" onclick="chatDelete('${{channel}}','${{escapeHtml(m.id)}}')">✕</button>`;
            const time   = m.timestamp?.toMillis
                ? new Date(m.timestamp.toMillis()).toLocaleTimeString('pt-PT', {{hour:'2-digit',minute:'2-digit'}})
                : '';
            return `<div class="chat-msg ${{mine ? 'mine' : 'other'}}">
                ${{!mine ? `<div class="chat-author">${{escapeHtml(m.displayName || 'Anónimo')}}</div>` : ''}}
                <div class="chat-bubble">${{escapeHtml(m.text)}}</div>
                <div style="display:flex;gap:0.25rem;align-items:center;">
                    <span class="chat-msg-time">${{time}}</span>
                    ${{mine || window._isModerador ? delBtn : ''}}
                </div>
            </div>`;
        }}

        function chatMarkRead() {{
            chatLastRead = Date.now();
            localStorage.setItem('chat_last_read', String(chatLastRead));
            chatUpdateBadge(0);
        }}

        function chatUpdateBadge(count) {{
            const txt = count > 9 ? '9+' : String(count);
            ['nav-chat-badge', 'mob-chat-badge'].forEach(id => {{
                const b = document.getElementById(id);
                if (!b) return;
                if (count > 0) {{ b.textContent = txt; b.style.display = 'flex'; }}
                else {{ b.style.display = 'none'; }}
            }});
        }}

        // Start background subscription on login so badge updates on all views
        function chatStartBackground() {{
            chatViewInit();
        }}

        function chatViewKey(e) {{
            if (e.key === 'Enter' && !e.shiftKey) {{ e.preventDefault(); chatViewSend(); }}
        }}

        async function chatViewSend() {{
            const input = document.getElementById('chat-view-input');
            const text  = (input?.value || '').trim().slice(0, 2000);
            if (!text || !auth.currentUser) return;
            input.value = '';
            const user = auth.currentUser;
            await db.collection('chat_global').add({{
                uid:         user.uid,
                displayName: user.displayName || user.email || 'Anónimo',
                photoURL:    user.photoURL || '',
                text,
                timestamp:   firebase.firestore.FieldValue.serverTimestamp(),
                deleted:     false
            }});
        }}

        async function chatDelete(channel, msgId) {{
            if (!confirm('Apagar mensagem?')) return;
            if (channel === 'chat') {{
                await db.collection('chat_global').doc(msgId).update({{ deleted: true }});
            }} else {{
                await db.collection('uc_chats').doc(channel)
                    .collection('messages').doc(msgId).update({{ deleted: true }});
            }}
        }}

        // ── UC CHAT ──────────────────────────────────────────────────────
        function ucChatInit(ucCode) {{
            if (ucChatUnsub) {{ ucChatUnsub(); ucChatUnsub = null; }}
            const el = document.getElementById('uc-chat-msgs');
            if (!el) return;
            el.innerHTML = '<div class="chat-empty">A carregar…</div>';
            const uid = auth.currentUser?.uid;
            const q = db.collection('uc_chats').doc(ucCode)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .limitToLast(60);
            ucChatUnsub = q.onSnapshot(snap => {{
                const msgs = [];
                snap.forEach(doc => {{
                    const m = {{ id: doc.id, ...doc.data() }};
                    if (!m.deleted) msgs.push(m);
                }});
                if (msgs.length === 0) {{
                    el.innerHTML = '<div class="chat-empty">Sem mensagens ainda. Sê o primeiro a comentar!</div>';
                }} else {{
                    el.innerHTML = msgs.map(m => chatBubbleHtml(m, uid, ucCode)).join('');
                }}
                el.scrollTop = el.scrollHeight;
            }}, err => {{
                console.warn('UC chat error:', err);
            }});
        }}

        function ucChatKey(e) {{
            if (e.key === 'Enter' && !e.shiftKey) {{ e.preventDefault(); ucChatSend(); }}
        }}

        async function ucChatSend() {{
            const input = document.getElementById('uc-chat-input');
            const text = input.value.trim().slice(0, 2000);
            if (!text || !auth.currentUser || !currentUCCode) return;
            input.value = '';
            const user = auth.currentUser;
            await db.collection('uc_chats').doc(currentUCCode)
                .collection('messages').add({{
                    uid:         user.uid,
                    displayName: user.displayName || user.email || 'Anónimo',
                    photoURL:    user.photoURL || '',
                    text,
                    timestamp:   firebase.firestore.FieldValue.serverTimestamp(),
                    deleted:     false
                }});
        }}

        // ── UTILS ────────────────────────────────────────────────────────
        function isSafeUrl(url) {{
            if (!url || typeof url !== 'string') return false;
            try {{
                const p = new URL(url);
                return p.protocol === 'https:' || p.protocol === 'http:';
            }} catch {{ return false; }}
        }}

        function shortName(name) {{
            if (!name) return '';
            const parts = name.trim().split(/\\s+/);
            if (parts.length <= 2) return name;
            return parts[0] + ' ' + parts[parts.length - 1];
        }}

        function escapeHtml(str) {{
            if (!str) return '';
            return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        }}

        // ── PDF DOWNLOAD ────────────────────────────────────────────────
        function downloadListaPDF(btn) {{
            if (!window.jspdf) {{ alert('Biblioteca PDF ainda a carregar. Tenta novamente.'); return; }}
            const {{ jsPDF }} = window.jspdf;
            const horario = HORARIOS[currentMonthIndex];
            if (!horario) return;

            btn.classList.add('loading');
            btn.textContent = '⏳ A gerar...';

            setTimeout(() => {{
                try {{
                    const doc = new jsPDF({{ orientation: 'portrait', unit: 'mm', format: 'a4' }});
                    const monthTitle = horario.mes_ano.charAt(0).toUpperCase() + horario.mes_ano.slice(1);
                    const pageW = 210;

                    // ── Header bar ──────────────────────────────────────
                    doc.setFillColor(5, 5, 5);
                    doc.rect(0, 0, pageW, 36, 'F');

                    // Blue accent line at bottom of header
                    doc.setFillColor(0, 143, 17);
                    doc.rect(0, 34, pageW, 2, 'F');

                    // Shield icon area
                    doc.setFillColor(0, 143, 17);
                    doc.roundedRect(10, 6, 22, 22, 3, 3, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(14);
                    doc.text('🛡', 15.5, 20);

                    // Title & subtitle
                    doc.setFontSize(14);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(255, 255, 255);
                    doc.text('Horário — ' + monthTitle, 36, 15);

                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(139, 148, 158);
                    const institution = (horario.instituicao || 'IEFP Faro') + '  ·  ' + (horario.designacao || 'CET Cibersegurança');
                    doc.text(institution, 36, 23);
                    doc.text((horario.modalidade || ''), 36, 29);

                    // ── Build table rows ────────────────────────────────
                    const rows = [];
                    horario.dias.forEach(dia => {{
                        const merged = mergeTimeSlots(dia.aulas);
                        if (merged.length > 0) {{
                            merged.forEach((aula, idx) => {{
                                rows.push([
                                    idx === 0 ? dia.data : '',
                                    idx === 0 ? dia.dia_semana : '',
                                    aula.hora,
                                    aula.uc,
                                    aula.descricao || aula.uc,
                                    shortName(aula.formador) || '—'
                                ]);
                            }});
                        }} else if (dia.nota) {{
                            rows.push([dia.data, dia.dia_semana, '—', '—', dia.nota, '—']);
                        }}
                    }});

                    // ── AutoTable ───────────────────────────────────────
                    doc.autoTable({{
                        startY: 40,
                        head: [['Data', 'Dia', 'Horário', 'UC', 'Disciplina', 'Formador']],
                        body: rows,
                        theme: 'grid',
                        headStyles: {{
                            fillColor: [0, 143, 17],
                            textColor: 255,
                            fontStyle: 'bold',
                            fontSize: 8,
                            cellPadding: {{ top: 3, bottom: 3, left: 3, right: 3 }}
                        }},
                        bodyStyles: {{ fontSize: 7.5, cellPadding: 2.5, textColor: [30, 30, 30] }},
                        alternateRowStyles: {{ fillColor: [240, 245, 255] }},
                        columnStyles: {{
                            0: {{ cellWidth: 22, fontStyle: 'bold' }},
                            1: {{ cellWidth: 16 }},
                            2: {{ cellWidth: 24, textColor: [0, 143, 17], fontStyle: 'bold' }},
                            3: {{ cellWidth: 20 }},
                            4: {{ cellWidth: 'auto' }},
                            5: {{ cellWidth: 32 }}
                        }},
                        didParseCell: (data) => {{
                            // Highlight holiday rows
                            if (data.row.raw && data.row.raw[3] === '—' && data.row.raw[2] === '—') {{
                                data.cell.styles.fillColor = [247, 240, 255];
                                data.cell.styles.textColor = [137, 87, 229];
                            }}
                        }},
                        margin: {{ left: 10, right: 10 }}
                    }});

                    // ── Footer on each page ─────────────────────────────
                    const pageCount = doc.internal.getNumberOfPages();
                    for (let i = 1; i <= pageCount; i++) {{
                        doc.setPage(i);
                        doc.setFontSize(7);
                        doc.setTextColor(150);
                        const now = new Date().toLocaleDateString('pt-PT');
                        doc.text(
                            `Gerado em ${{now}}  ·  Página ${{i}} de ${{pageCount}}`,
                            pageW / 2, 289, {{ align: 'center' }}
                        );
                        // Bottom accent line
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, 291, pageW, 1.5, 'F');
                    }}

                    const filename = `horario_${{horario.mes_ano.replace(/\\s+/g, '_')}}.pdf`;
                    doc.save(filename);
                }} catch(e) {{
                    console.error(e);
                    alert('Erro ao gerar o PDF. Verifica a consola.');
                }} finally {{
                    btn.classList.remove('loading');
                    btn.innerHTML = '⬇ Lista';
                }}
            }}, 50);
        }}

        function downloadSemanalPDF(btn) {{
            if (!window.jspdf) {{ alert('Biblioteca PDF ainda a carregar. Tenta novamente.'); return; }}
            const {{ jsPDF }} = window.jspdf;
            const horario = HORARIOS[currentMonthIndex];
            if (!horario) return;

            btn.classList.add('loading');
            btn.textContent = '⏳ A gerar...';

            setTimeout(() => {{
                try {{
                    const doc  = new jsPDF({{ orientation: 'landscape', unit: 'mm', format: 'a4' }});
                    const pageW = 297;
                    const pageH = 210;
                    const pad   = n => String(n).padStart(2, '0');
                    const monthTitle = horario.mes_ano.charAt(0).toUpperCase() + horario.mes_ano.slice(1);
                    const DAY_NAMES  = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

                    // ── Header ──────────────────────────────────────────
                    function drawHeader(pageTitle) {{
                        doc.setFillColor(5, 5, 5);
                        doc.rect(0, 0, pageW, 28, 'F');
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, 26, pageW, 2, 'F');
                        doc.roundedRect(10, 5, 18, 18, 3, 3, 'F');
                        doc.setTextColor(255, 255, 255);
                        doc.setFontSize(11);
                        doc.setFont('helvetica', 'bold');
                        doc.text(pageTitle, 32, 13);
                        doc.setFontSize(7);
                        doc.setFont('helvetica', 'normal');
                        doc.setTextColor(139, 148, 158);
                        doc.text('IEFP Faro  ·  CET Cibersegurança  ·  Gerado em ' + new Date().toLocaleDateString('pt-PT'), 32, 21);
                    }}
                    drawHeader('Horário Semanal — ' + monthTitle);

                    // ── Group days by week ───────────────────────────────
                    const byWeek = {{}};
                    horario.dias.forEach(dia => {{
                        const wk = getWeekStart(dia.data);
                        if (!byWeek[wk]) byWeek[wk] = {{}};
                        byWeek[wk][dia.data] = dia;
                    }});

                    // ── Render weeks ─────────────────────────────────────
                    let y = 32;
                    const weekKeys = Object.keys(byWeek).sort();

                    weekKeys.forEach((weekStart, wi) => {{
                        const [wy, wm, wd] = weekStart.split('-').map(Number);
                        const monDate = new Date(wy, wm - 1, wd);

                        // Column headers: day name + date
                        const headRow = DAY_NAMES.map((name, i) => {{
                            const dt = new Date(monDate);
                            dt.setDate(monDate.getDate() + i);
                            return name + '\\n' + pad(dt.getDate()) + '/' + pad(dt.getMonth() + 1);
                        }});

                        // Body: one row, 5 cells
                        const bodyRow = DAY_NAMES.map((_, i) => {{
                            const dt = new Date(monDate);
                            dt.setDate(monDate.getDate() + i);
                            const dateStr = dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
                            const dia = (byWeek[weekStart] || {{}})[dateStr];
                            if (!dia) return '';
                            const merged = mergeTimeSlots(dia.aulas);
                            if (merged.length === 0) return dia.nota || '';
                            return merged.map(a => {{
                                const desc = (a.descricao || a.uc).substring(0, 52);
                                return a.hora + '\\n' + a.uc + ' — ' + desc;
                            }}).join('\\n\\n');
                        }});

                        // Week label
                        const friDate = new Date(monDate);
                        friDate.setDate(monDate.getDate() + 4);
                        const weekLabel = 'Semana ' + pad(monDate.getDate()) + '–' + pad(friDate.getDate()) + ' ' + horario.mes_ano.split(' ')[0];

                        // New page if needed
                        if (y > pageH - 45 && wi > 0) {{
                            doc.addPage();
                            drawHeader('Horário Semanal — ' + monthTitle + ' (cont.)');
                            y = 32;
                        }}

                        // Week label text
                        doc.setFontSize(6.5);
                        doc.setFont('helvetica', 'bold');
                        doc.setTextColor(0, 143, 17);
                        doc.text(weekLabel.toUpperCase(), 10, y + 3.5);

                        doc.autoTable({{
                            startY: y + 5,
                            head: [headRow],
                            body: [bodyRow],
                            theme: 'grid',
                            headStyles: {{
                                fillColor: [0, 143, 17],
                                textColor: 255,
                                fontStyle: 'bold',
                                fontSize: 7.5,
                                halign: 'center',
                                cellPadding: {{ top: 2.5, bottom: 2.5, left: 2, right: 2 }}
                            }},
                            bodyStyles: {{
                                fontSize: 7,
                                cellPadding: {{ top: 3, bottom: 3, left: 3, right: 3 }},
                                textColor: [20, 20, 20],
                                valign: 'top',
                                minCellHeight: 10
                            }},
                            didParseCell: (data) => {{
                                if (data.section === 'body') {{
                                    const raw = (data.cell.raw || '').toString();
                                    // Holiday cell
                                    if (raw && !raw.includes(':')) {{
                                        data.cell.styles.fillColor  = [247, 240, 255];
                                        data.cell.styles.textColor  = [137, 87, 229];
                                        data.cell.styles.fontStyle  = 'italic';
                                    }}
                                    // Empty cell
                                    if (!raw) {{
                                        data.cell.styles.fillColor = [248, 248, 248];
                                    }}
                                }}
                                // Highlight today
                                if (data.section === 'head') {{
                                    const now = new Date();
                                    const todayStr = pad(now.getDate()) + '/' + pad(now.getMonth() + 1);
                                    if ((data.cell.raw || '').toString().includes(todayStr)) {{
                                        data.cell.styles.fillColor = [0, 80, 10];
                                    }}
                                }}
                            }},
                            margin: {{ left: 10, right: 10 }}
                        }});

                        y = doc.lastAutoTable.finalY + 5;
                    }});

                    // ── Footer on each page ──────────────────────────────
                    const pageCount = doc.internal.getNumberOfPages();
                    for (let i = 1; i <= pageCount; i++) {{
                        doc.setPage(i);
                        doc.setFontSize(6.5);
                        doc.setTextColor(150);
                        doc.text(
                            'Página ' + i + ' de ' + pageCount,
                            pageW / 2, pageH - 4, {{ align: 'center' }}
                        );
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, pageH - 2, pageW, 1.5, 'F');
                    }}

                    doc.save('horario_semanal_' + horario.mes_ano.replace(/\\s+/g, '_') + '.pdf');
                }} catch(e) {{
                    console.error(e);
                    alert('Erro ao gerar o PDF semanal. Verifica a consola.');
                }} finally {{
                    btn.classList.remove('loading');
                    btn.innerHTML = '⬇ Semanal';
                }}
            }}, 50);
        }}

        // ── FILTER & VIEW TOGGLE ────────────────────────────────────────
        function filterHorario(val) {{
            scheduleFilter = val.trim();
            renderHorario(currentMonthIndex);
        }}

        function setScheduleView(mode) {{
            scheduleViewMode = mode;
            document.getElementById('btn-view-cards').classList.toggle('active', mode === 'cards');
            document.getElementById('btn-view-week').classList.toggle('active', mode === 'week');
            renderHorario(currentMonthIndex);
        }}

        // ── HOJE / AMANHÃ ────────────────────────────────────────────────
        function buildDayPanel(dateStr, containerId) {{
            const el = document.getElementById(containerId);
            if (!el) return;

            let found = null;
            HORARIOS.forEach(horario => {{
                horario.dias.forEach(dia => {{
                    if (dia.data === dateStr) found = dia;
                }});
            }});

            if (!found) {{
                el.innerHTML = '<p class="hoje-empty">Sem aulas programadas.</p>';
                return;
            }}

            const merged = mergeTimeSlots(found.aulas);

            if (merged.length === 0 && !found.nota) {{
                el.innerHTML = '<p class="hoje-empty">Sem aulas programadas.</p>';
                return;
            }}

            if (merged.length === 0 && found.nota) {{
                el.innerHTML = `<div class="aula-card empty-card holiday"><div class="aula-info"><div class="aula-desc">${{found.nota}}</div></div></div>`;
                return;
            }}

            el.innerHTML = merged.map(aula => {{
                const state       = getAulaState(dateStr, aula.hora);
                const isClickable = UC_MAP[aula.uc] ? 'clickable' : '';
                const isRemote    = (aula.uc === 'UC00602') || (UC_MAP[aula.uc] && UC_MAP[aula.uc].modalidade === 'remoto');
                const remoteClass  = isRemote ? 'remote' : '';
                const remoteBadge  = isRemote
                    ? `<div class="aula-uc badge remote" style="margin-top:0;">🌐 Remoto</div>` : '';
                const formadorBadge = aula.formador
                    ? `<div class="aula-uc badge" style="margin-top:0;background:rgba(255,255,255,0.1);color:#fff;">👤 ${{shortName(aula.formador)}}</div>` : '';
                const clickAttr = UC_MAP[aula.uc]
                    ? `onclick="openUCFromSchedule('${{aula.uc}}')"` : '';
                return `
                <div class="aula-card ${{state}} ${{isClickable}} ${{remoteClass}}" ${{clickAttr}}>
                    <div class="aula-time">${{aula.hora}}</div>
                    <div class="aula-info">
                        <div class="aula-desc">${{aula.descricao}}</div>
                        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:5px;align-items:center;">
                            <div class="aula-uc badge" style="margin-top:0;">${{aula.uc}}</div>
                            ${{remoteBadge}}${{formadorBadge}}
                        </div>
                    </div>
                    ${{UC_MAP[aula.uc] ? `<button class="open-uc-btn" title="Abrir disciplina">↗</button>` : ''}}
                </div>`;
            }}).join('');
        }}

        function buildTodayPanel() {{
            const now = new Date();
            const pad = n => String(n).padStart(2, '0');
            const todayStr     = `${{now.getFullYear()}}-${{pad(now.getMonth()+1)}}-${{pad(now.getDate())}}`;
            const tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const tomorrowStr  = `${{tomorrowDate.getFullYear()}}-${{pad(tomorrowDate.getMonth()+1)}}-${{pad(tomorrowDate.getDate())}}`;

            buildDayPanel(todayStr,    'hoje-content');
            buildDayPanel(tomorrowStr, 'amanha-content');

            // Update "Amanhã" label with day-of-week
            const diasSemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
            const label = document.getElementById('amanha-label');
            if (label) label.textContent = `Amanhã — ${{diasSemana[tomorrowDate.getDay()]}}`;
        }}

        // ── GLOBAL PROGRESS & UC HOURS ──────────────────────────────────
        function computeUCHours(ucCode) {{
            let done = 0, scheduled = 0;
            HORARIOS.forEach(horario => {{
                horario.dias.forEach(dia => {{
                    const merged = mergeTimeSlots(dia.aulas);
                    merged.forEach(a => {{
                        if (a.uc === ucCode) {{
                            const h = calcSessionHours(a.hora);
                            scheduled += h;
                            if (getAulaState(dia.data, a.hora) === 'past') done += h;
                        }}
                    }});
                }});
            }});
            return {{ done, scheduled }};
        }}

        function renderGlobalProgress() {{
            const wrap = document.getElementById('global-progress-wrap');
            if (!wrap || !CRONOGRAMA.carga_horaria) return;

            const target = (CRONOGRAMA.carga_horaria.base || 0) + (CRONOGRAMA.carga_horaria.tecnologica || 0);
            if (!target) return;

            let done = 0;
            HORARIOS.forEach(horario => {{
                horario.dias.forEach(dia => {{
                    const merged = mergeTimeSlots(dia.aulas);
                    merged.forEach(a => {{
                        if (getAulaState(dia.data, a.hora) === 'past') {{
                            done += calcSessionHours(a.hora);
                        }}
                    }});
                }});
            }});

            const pct = Math.min(100, Math.round((done / target) * 100));
            wrap.innerHTML = `
                <div class="global-progress-label">
                    <span>Progresso Curricular</span>
                    <span>${{done.toFixed(0)}}h / ${{target}}h (${{pct}}%)</span>
                </div>
                <div class="progress-wrap">
                    <div class="progress-fill" style="width:${{pct}}%"></div>
                </div>
                <div class="progress-sub">Base + Tecnológica · FCT (${{CRONOGRAMA.carga_horaria.fct || 0}}h) separado</div>
            `;
        }}

        // ── THEME TOGGLE ────────────────────────────────────────────────
        function toggleTheme() {{
            const isLight = document.documentElement.dataset.theme === 'light';
            const next = isLight ? 'dark' : 'light';
            document.documentElement.dataset.theme = next === 'dark' ? '' : 'light';
            document.getElementById('theme-toggle').textContent = next === 'light' ? '☀️' : '🌙';
            localStorage.setItem('dashboard_theme', next);
        }}

        function initTheme() {{
            const saved = localStorage.getItem('dashboard_theme');
            if (saved === 'light') {{
                document.documentElement.dataset.theme = 'light';
                document.getElementById('theme-toggle').textContent = '☀️';
            }}
        }}

        // ── NOTIFICATIONS ────────────────────────────────────────────────
        function updateNotifBtn(perm) {{
            const btn = document.getElementById('notif-btn');
            if (!btn) return;
            if (perm === 'granted') {{ btn.classList.add('active'); btn.title = 'Notificações ativas (10 min antes)'; }}
            else if (perm === 'denied') {{ btn.classList.add('denied'); btn.title = 'Notificações bloqueadas pelo browser'; }}
        }}

        async function requestNotifications() {{
            if (!('Notification' in window)) {{
                alert('Este browser não suporta notificações.');
                return;
            }}
            if (Notification.permission === 'denied') {{
                alert('Notificações bloqueadas. Activa-as nas definições do browser.');
                return;
            }}
            if (Notification.permission === 'granted') {{
                alert('Notificações já estão ativas. Serás avisado 10 min antes de cada aula de hoje.');
                return;
            }}
            const perm = await Notification.requestPermission();
            updateNotifBtn(perm);
            if (perm === 'granted') checkUpcomingClass();
        }}

        function checkUpcomingClass() {{
            if (!('Notification' in window) || Notification.permission !== 'granted') return;
            const now = new Date();
            const pad = n => String(n).padStart(2, '0');
            const todayStr = `${{now.getFullYear()}}-${{pad(now.getMonth()+1)}}-${{pad(now.getDate())}}`;

            HORARIOS.forEach(horario => {{
                horario.dias.forEach(dia => {{
                    if (dia.data !== todayStr) return;
                    mergeTimeSlots(dia.aulas).forEach(aula => {{
                        const [startStr] = aula.hora.split('-');
                        const [sh, sm]   = startStr.split(':').map(Number);
                        const classStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sh, sm, 0);
                        const diff = classStart - now;
                        if (diff > 0 && diff <= 10 * 60 * 1000) {{
                            const key = `notif_${{todayStr}}_${{aula.hora}}`;
                            if (!sessionStorage.getItem(key)) {{
                                sessionStorage.setItem(key, '1');
                                const mins = Math.round(diff / 60000);
                                new Notification(`Aula em ${{mins}} min — ${{aula.hora}}`, {{
                                    body: aula.descricao || aula.uc,
                                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🛡️</text></svg>'
                                }});
                            }}
                        }}
                    }});
                }});
            }});
        }}

        function setupNotifications() {{
            updateNotifBtn(typeof Notification !== 'undefined' ? Notification.permission : 'default');
            if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {{
                checkUpcomingClass();
                setInterval(checkUpcomingClass, 60000);
            }}
        }}

        // ── UC DETAIL PDF ────────────────────────────────────────────────
        function downloadUCPDF(btn) {{
            if (!window.jspdf) {{ alert('Biblioteca PDF ainda a carregar. Tenta novamente.'); return; }}
            const {{ jsPDF }} = window.jspdf;
            if (!currentUCCode) return;
            const uc = UC_MAP[currentUCCode] || {{}};
            const sessions = buildUCSchedule(currentUCCode);
            if (sessions.length === 0) {{ alert('Sem sessões para exportar.'); return; }}

            btn.classList.add('loading');
            btn.textContent = '⏳';

            setTimeout(() => {{
                try {{
                    const doc   = new jsPDF({{ orientation: 'portrait', unit: 'mm', format: 'a4' }});
                    const pageW = 210;
                    const pad   = n => String(n).padStart(2, '0');

                    // ── Header ──
                    doc.setFillColor(5, 5, 5);
                    doc.rect(0, 0, pageW, 38, 'F');
                    doc.setFillColor(0, 143, 17);
                    doc.rect(0, 36, pageW, 2, 'F');
                    doc.roundedRect(10, 6, 22, 22, 3, 3, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(7);
                    doc.setFont('helvetica', 'bold');
                    doc.text(currentUCCode, 36, 13);
                    doc.setFontSize(12);
                    const descLines = doc.splitTextToSize(uc.descricao || currentUCCode, 150);
                    doc.text(descLines, 36, 20);
                    doc.setFontSize(7.5);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(139, 148, 158);
                    const metaParts = [];
                    if (uc.carga_horaria) metaParts.push(`${{uc.carga_horaria}}h total`);
                    if (uc.formador) metaParts.push(uc.formador);
                    if (uc.modalidade) metaParts.push(uc.modalidade.charAt(0).toUpperCase() + uc.modalidade.slice(1));
                    doc.text(metaParts.join('  ·  ') || 'CET Cibersegurança', 36, 32);

                    // ── Table rows ──
                    const totalH = sessions.reduce((s, x) => s + calcSessionHours(x.hora), 0);
                    const doneH  = sessions.filter(x => x.state === 'past').reduce((s, x) => s + calcSessionHours(x.hora), 0);
                    const rows   = sessions.map(s => {{
                        const [y, m, d] = s.data.split('-');
                        return [
                            `${{d}}/${{m}}/${{y}}`,
                            s.dia_semana,
                            s.mes_ano.charAt(0).toUpperCase() + s.mes_ano.slice(1),
                            s.hora,
                            `${{calcSessionHours(s.hora).toFixed(0)}}h`,
                            s.state === 'past' ? 'Realizada' : s.state === 'current' ? 'A decorrer' : 'Prevista'
                        ];
                    }});

                    doc.autoTable({{
                        startY: 43,
                        head: [['Data', 'Dia', 'Mês', 'Horário', 'Dur.', 'Estado']],
                        body: rows,
                        theme: 'grid',
                        headStyles: {{
                            fillColor: [0, 143, 17], textColor: 255, fontStyle: 'bold',
                            fontSize: 8, cellPadding: {{ top: 3, bottom: 3, left: 3, right: 3 }}
                        }},
                        bodyStyles: {{ fontSize: 8, cellPadding: 3, textColor: [30, 30, 30] }},
                        alternateRowStyles: {{ fillColor: [245, 250, 245] }},
                        columnStyles: {{
                            0: {{ cellWidth: 24, fontStyle: 'bold' }},
                            1: {{ cellWidth: 16 }},
                            2: {{ cellWidth: 32 }},
                            3: {{ cellWidth: 26, textColor: [0, 143, 17], fontStyle: 'bold' }},
                            4: {{ cellWidth: 14 }},
                            5: {{ cellWidth: 'auto' }}
                        }},
                        didParseCell: data => {{
                            if (data.section === 'body' && data.row.raw[5] === 'Realizada') {{
                                data.cell.styles.textColor = [100, 100, 100];
                            }}
                            if (data.section === 'body' && data.row.raw[5] === 'A decorrer') {{
                                data.cell.styles.textColor = [180, 130, 0];
                                data.cell.styles.fontStyle = 'bold';
                            }}
                        }},
                        margin: {{ left: 10, right: 10 }}
                    }});

                    // ── Summary footer ──
                    const finalY = doc.lastAutoTable.finalY + 6;
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(0, 143, 17);
                    doc.text(`${{sessions.length}} sessões  ·  ${{totalH.toFixed(0)}}h programadas  ·  ${{doneH.toFixed(0)}}h realizadas`, 10, finalY);

                    // ── Page footers ──
                    const pageCount = doc.internal.getNumberOfPages();
                    for (let i = 1; i <= pageCount; i++) {{
                        doc.setPage(i);
                        doc.setFontSize(7);
                        doc.setTextColor(150);
                        doc.text(
                            `Gerado em ${{new Date().toLocaleDateString('pt-PT')}}  ·  Página ${{i}} de ${{pageCount}}`,
                            pageW / 2, 289, {{ align: 'center' }}
                        );
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, 291, pageW, 1.5, 'F');
                    }}

                    const safeName = (uc.descricao || currentUCCode).substring(0, 40).replace(/[^a-z0-9]/gi, '_');
                    doc.save(`${{currentUCCode}}_${{safeName}}.pdf`);
                }} catch(e) {{
                    console.error(e);
                    alert('Erro ao gerar PDF. Verifica a consola.');
                }} finally {{
                    btn.classList.remove('loading');
                    btn.innerHTML = '⬇ PDF';
                }}
            }}, 50);
        }}

        // ── CLOCK ───────────────────────────────────────────────────────
        function updateClock() {{
            const now = new Date();
            const wide = window.innerWidth > 680;
            const clockEl = document.getElementById('live-clock');
            if (wide) {{
                const opts = {{ weekday:'short', day:'2-digit', month:'short' }};
                clockEl.innerText = `${{now.toLocaleDateString('pt-PT', opts)}}  ${{now.toLocaleTimeString('pt-PT')}}`;
            }} else {{
                clockEl.innerText = now.toLocaleTimeString('pt-PT', {{ hour:'2-digit', minute:'2-digit' }});
            }}
        }}

        // ── INIT ────────────────────────────────────────────────────────
        function init() {{
            renderCronograma();
            buildTodayPanel();
            initTheme();
            setupNotifications();
            setupFileDrop();
            renderDashboardGreeting();
            renderTurma();

            if (HORARIOS.length > 0) {{
                monthSelect.innerHTML = HORARIOS.map((h,i) =>
                    `<option value="${{i}}">${{h.mes_ano.toUpperCase()}}</option>`
                ).join('');
                monthSelect.addEventListener('change', e => renderHorario(parseInt(e.target.value)));
                renderHorario(0);
            }} else {{
                scheduleGrid.innerHTML = `<div class="empty-state"><h3>Sem Dados</h3><p>Sem ficheiros de horário.</p></div>`;
            }}

            switchView('dashboard');
        }}

        document.addEventListener('DOMContentLoaded', () => {{
            updateClock();
            setInterval(updateClock, 1000);
            initAuth(); // calls init() after successful auth
        }});
    </script>

    <!-- PDF Modal -->
    <div id="pdf-modal" class="pdf-modal-overlay" onclick="closePdfModal(event)">
        <div class="pdf-modal-box">
            <div class="pdf-modal-header">
                <span id="pdf-modal-title" class="pdf-modal-title"></span>
                <div class="pdf-modal-actions">
                    <a id="pdf-modal-download" href="#" target="_blank" rel="noopener noreferrer"
                       class="pdf-modal-btn" title="Descarregar PDF">⬇ Descarregar</a>
                    <button class="pdf-modal-btn close" onclick="closePdfModalBtn()" title="Fechar">✕</button>
                </div>
            </div>
            <iframe id="pdf-modal-frame" src="" class="pdf-modal-frame"></iframe>
        </div>
    </div>

    <!-- ── MOBILE BOTTOM NAV ── -->
    <div class="mob-more-overlay" id="mob-more-overlay" onclick="mobMoreClose()"></div>
    <div class="mob-more-menu" id="mob-more-menu">
        <button class="mob-more-item" data-view="disciplinas" onclick="switchView('disciplinas');mobMoreClose()">
            <span class="mob-more-item-icon">📚</span> Disciplinas
        </button>
        <button class="mob-more-item" data-view="playground" onclick="switchView('playground');mobMoreClose()">
            <span class="mob-more-item-icon">💻</span> Playground
        </button>
        <button class="mob-more-item" data-view="definicoes" onclick="switchView('definicoes');mobMoreClose()">
            <span class="mob-more-item-icon">⚙️</span> Definições
        </button>
        <button class="mob-more-item signout" onclick="auth.signOut()" style="color:#f85149;">
            <span class="mob-more-item-icon">⏻</span> Sair
        </button>
    </div>
    <nav class="mobile-bottom-nav" id="mobile-bottom-nav">
        <button class="mob-nav-btn active" data-view="dashboard" onclick="switchView('dashboard')">
            <span class="mob-icon">🏠</span>
            <span>Início</span>
        </button>
        <button class="mob-nav-btn" data-view="horario" onclick="switchView('horario')">
            <span class="mob-icon">📅</span>
            <span>Horário</span>
        </button>
        <button class="mob-nav-btn" data-view="turma" onclick="switchView('turma')">
            <span class="mob-icon">👥</span>
            <span>Turma</span>
        </button>
        <button class="mob-nav-btn" data-view="chat" onclick="switchView('chat')">
            <span class="mob-icon">💬<span class="mob-nav-badge" id="mob-chat-badge"></span></span>
            <span>Chat</span>
        </button>
        <button class="mob-nav-btn" id="mob-more-btn" onclick="mobMoreToggle()">
            <span class="mob-icon">⋯</span>
            <span>Mais</span>
        </button>
    </nav>
</body>
</html>
"""

    with open('dashboard.html', 'w', encoding='utf-8') as f:
        f.write(html_template)

    print(f"Dashboard gerado em 'dashboard.html' com {len(horarios)} meses e {len(uc_list)} UCs!")
    print("Para ver o resultado, abre o 'dashboard.html' num navegador.")

if __name__ == '__main__':
    main()
