import json
import os
import glob


def get_latest_file(pattern):
    files = glob.glob(pattern)
    return files[0] if files else None


def build_pg_examples():
    """Playground Python examples with inline comments."""
    def ex(label, lines):
        return {'label': label, 'code': '\n'.join(lines)}

    return [
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
                uc_map = {
                    item['codigo']: {
                        'descricao':      item['descricao'],
                        'formador':       item.get('formador', ''),
                        'carga_horaria':  item.get('carga_horaria'),
                        'modalidade':     item.get('modalidade', ''),
                    }
                    for item in uc_list
                }
    else:
        print("Aviso: Ficheiro de UCs não encontrado.")

    # 2. Load Horários
    horarios = []
    for hf in sorted(glob.glob('data/horario_*.json')):
        try:
            with open(hf, 'r', encoding='utf-8') as f:
                h_data = json.load(f)
                if 'horario' in h_data:
                    horarios.append(h_data['horario'])
        except Exception as e:
            print(f"Erro ao ler {hf}: {e}")

    # 3. Load Cronograma
    cronograma = {}
    crono_file = get_latest_file('data/cronograma_*.json')
    if crono_file:
        with open(crono_file, 'r', encoding='utf-8') as f:
            cronograma = json.load(f).get('cronograma', {})

    # 4. Assemble CSS and JS from source files
    tpl_dir = os.path.join(os.path.dirname(__file__), 'templates')

    css_files = [
        'css/variables.css',
        'css/layout.css',
        'css/components.css',
        'css/theme.css',
        'css/playground.css',
        'css/nav-sidebar.css',
        'css/views.css',
    ]
    js_files = [
        'js/data.js',
        'js/firebase.js',
        'js/utils.js',
        'js/state.js',
        'js/views.js',
        'js/horario.js',
        'js/disciplinas.js',
        'js/materials.js',
        'js/turma.js',
        'js/chat.js',
        'js/auth.js',
        'js/dashboard.js',
        'js/playground.js',
        'js/pdf.js',
        'js/convites.js',
        'js/definicoes.js',
        'js/init.js',
    ]

    def read_parts(file_list):
        parts = []
        for rel in file_list:
            path = os.path.join(tpl_dir, rel)
            with open(path, 'r', encoding='utf-8') as f:
                parts.append(f.read())
        return '\n'.join(parts)

    css = read_parts(css_files)
    js  = read_parts(js_files)

    # 5. Read HTML skeleton and inject everything
    with open(os.path.join(tpl_dir, 'dashboard.html'), 'r', encoding='utf-8') as f:
        html = f.read()

    html = html.replace('__INJECT_CSS__', css)
    html = html.replace('__INJECT_JS__',  js)

    # Inject data into JS constants (markers live in js/data.js)
    html = html.replace('__INJECT_UC_MAP__',      json.dumps(uc_map,              ensure_ascii=False))
    html = html.replace('__INJECT_UC_LIST__',     json.dumps(uc_list,             ensure_ascii=False))
    html = html.replace('__INJECT_HORARIOS__',    json.dumps(horarios,            ensure_ascii=False))
    html = html.replace('__INJECT_CRONOGRAMA__',  json.dumps(cronograma,          ensure_ascii=False))
    html = html.replace('__INJECT_PG_EXAMPLES__', json.dumps(build_pg_examples(), ensure_ascii=False))

    # 5. Write output
    with open('dashboard.html', 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"Dashboard gerado em 'dashboard.html' com {len(horarios)} meses e {len(uc_list)} UCs!")
    print("Para ver o resultado, abre o 'dashboard.html' num navegador.")


if __name__ == '__main__':
    main()
