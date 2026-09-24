const camadas = [
  {
    num: 4,
    nome: "Camada de Aplicação",
    nomeEn: "Application Layer",
    osiEq: ["OSI 7 – Aplicação", "OSI 6 – Apresentação", "OSI 5 – Sessão"],
    cor: "var(--c4)",
    pdu: "Dados / Mensagem",
    descricao: "Camada mais próxima do utilizador. Engloba as funções das camadas OSI de Aplicação, Apresentação e Sessão. Define os protocolos que as aplicações utilizam para comunicar através da rede: navegação web, correio electrónico, transferência de ficheiros, resolução de nomes, entre outros.",
    funcoes: [
      "Interface directa com aplicações de utilizador",
      "Formatação, cifra e compressão de dados",
      "Estabelecimento e gestão de sessões",
      "Resolução de nomes (DNS) e configuração automática (DHCP)"
    ],
    protocolos: ["HTTP","HTTPS","FTP","SFTP","SMTP","POP3","IMAP","DNS","DHCP","SSH","Telnet","SNMP","NTP","TLS/SSL","RDP"],
    ataques: [
      { icon:"🎣", nome:"Phishing / Spear Phishing", sev:"critico", desc:"Engenharia social via correio electrónico ou páginas falsas para roubar credenciais ou instalar malware. O vector mais comum de comprometimento inicial." },
      { icon:"💉", nome:"Injecção SQL / XSS / CSRF", sev:"critico", desc:"Exploração de vulnerabilidades em aplicações web: injecção de código em bases de dados (SQLi), execução de scripts no browser da vítima (XSS) ou acções não autorizadas em nome do utilizador autenticado (CSRF)." },
      { icon:"🌐", nome:"DNS Spoofing / DNS Hijacking", sev:"critico", desc:"Envenenamento da cache DNS para redirigir utilizadores para servidores maliciosos, facilitando ataques de intermediário (MitM) e roubo de credenciais." },
      { icon:"🦠", nome:"Malware / Ransomware via protocolos de aplicação", sev:"critico", desc:"Distribuição de software malicioso através de HTTP, FTP, SMTP ou outros protocolos. Inclui ransomware, trojans, spyware e backdoors entregues via anexos ou downloads." },
      { icon:"🔑", nome:"Força Bruta / Credential Stuffing", sev:"alto", desc:"Tentativa sistemática de descobrir palavras-passe por enumeração ou uso de listas de credenciais comprometidas para aceder a serviços SSH, FTP, RDP, webmail, etc." },
      { icon:"📦", nome:"Ataques a APIs (REST/SOAP/GraphQL)", sev:"alto", desc:"Exploração de endpoints mal configurados, ausência de autenticação, exposição de dados sensíveis, injecção via parâmetros ou abuso de lógica de negócio em APIs modernas." },
      { icon:"🔓", nome:"SSL Stripping / Downgrade TLS", sev:"alto", desc:"Forçar a comunicação para HTTP sem cifra (SSL Stripping) ou para versões fracas de TLS/SSL (POODLE, BEAST) para interceptar tráfego em texto claro." },
    ]
  },
  {
    num: 3,
    nome: "Camada de Transporte",
    nomeEn: "Transport Layer",
    osiEq: ["OSI 4 – Transporte"],
    cor: "var(--c3)",
    pdu: "Segmento (TCP) / Datagrama (UDP)",
    descricao: "Responsável pela comunicação ponto-a-ponto entre processos em anfitriões distintos. Fornece dois protocolos principais com características opostas: o TCP (orientado à ligação, fiável) e o UDP (sem ligação, rápido). Gere a multiplexagem por portas lógicas.",
    funcoes: [
      "Multiplexagem por portas lógicas (0–65535)",
      "Controlo de fluxo e congestionamento (TCP)",
      "Entrega fiável e ordenada com ACKs (TCP)",
      "Entrega rápida sem garantias (UDP)",
      "Handshake de 3 vias para estabelecer ligações TCP"
    ],
    protocolos: ["TCP","UDP","SCTP","DCCP"],
    ataques: [
      { icon:"🌊", nome:"SYN Flood (DoS/DDoS)", sev:"critico", desc:"Envio massivo de pacotes TCP SYN sem completar o handshake, esgotando a tabela de conexões semi-abertas do servidor até à indisponibilidade total do serviço." },
      { icon:"🔪", nome:"TCP Session Hijacking", sev:"critico", desc:"Injecção de segmentos TCP com números de sequência correctos para assumir o controlo de uma sessão TCP estabelecida entre dois anfitriões legítimos." },
      { icon:"💣", nome:"UDP Flood", sev:"alto", desc:"Envio massivo de datagramas UDP para portas aleatórias, forçando o anfitrião a processar cada um e responder com mensagens ICMP, saturando a largura de banda disponível." },
      { icon:"🪞", nome:"Amplificação UDP (DNS, NTP, SSDP)", sev:"alto", desc:"Envio de pequenos pedidos UDP com IP de origem falsificado para servidores que respondem com respostas muito maiores, amplificando o volume de tráfego dirigido à vítima (factor 10x–500x)." },
      { icon:"🔍", nome:"Port Scanning", sev:"medio", desc:"Enumeração sistemática de portas TCP/UDP abertas para identificar serviços activos, versões de software e possíveis vectores de exploração (ex: Nmap, Masscan)." },
      { icon:"🧩", nome:"Fragmentação TCP/IP", sev:"medio", desc:"Divisão deliberada de segmentos em fragmentos pequenos para evadir sistemas de detecção de intrusão (IDS) e firewalls que não realizam reassembly completo antes de inspeccionar." },
    ]
  },
  {
    num: 2,
    nome: "Camada de Internet",
    nomeEn: "Internet Layer",
    osiEq: ["OSI 3 – Rede"],
    cor: "var(--c2)",
    pdu: "Pacote / Datagrama IP",
    descricao: "Equivalente à camada de Rede do modelo OSI. Responsável pelo endereçamento lógico e encaminhamento de pacotes entre redes distintas. O protocolo IP é o núcleo desta camada — não orientado à ligação e sem garantias de entrega.",
    funcoes: [
      "Endereçamento lógico (IPv4 / IPv6)",
      "Encaminhamento entre redes (routing)",
      "Fragmentação e remontagem de pacotes IP",
      "Resolução de endereços IP↔MAC (ARP)",
      "Relatório de erros e diagnóstico (ICMP)"
    ],
    protocolos: ["IPv4","IPv6","ICMP","ICMPv6","ARP","RARP","OSPF","BGP","RIP","EIGRP","IGMP","IPSec"],
    ataques: [
      { icon:"🎭", nome:"IP Spoofing", sev:"critico", desc:"Falsificação do endereço IP de origem nos pacotes para ocultar a identidade do atacante, contornar listas de controlo de acesso (ACL) ou realizar ataques de amplificação e reflexão." },
      { icon:"🛣️", nome:"BGP Hijacking", sev:"critico", desc:"Anúncio de prefixos IP legítimos por parte de sistemas autónomos não autorizados, desviando o tráfego de Internet por infra-estruturas controladas pelo atacante. Pode afectar milhões de utilizadores." },
      { icon:"🧊", nome:"ICMP Flood / Ping of Death / Smurf", sev:"alto", desc:"Ataques baseados em ICMP: envio massivo de echo requests (flood), pacotes ICMP malformados de tamanho superior a 65535 bytes (Ping of Death), ou amplificação via endereços de broadcast (Smurf Attack)." },
      { icon:"📡", nome:"OSPF / RIP Route Poisoning", sev:"alto", desc:"Injecção de actualizações de routing falsas em protocolos de gateway interior para manipular tabelas de encaminhamento, desviando ou descartando tráfego interno." },
      { icon:"🔀", nome:"Evasão por Fragmentação IP", sev:"medio", desc:"Divisão deliberada de pacotes em fragmentos mínimos para contornar sistemas de inspecção que analisam apenas o primeiro fragmento, evadindo regras de firewall e assinaturas IDS." },
      { icon:"🕳️", nome:"IP Tunnel Abuse / Covert Channels", sev:"medio", desc:"Encapsulamento de tráfego malicioso ou exfiltração de dados dentro de protocolos legítimos como ICMP, DNS ou IPv6-over-IPv4 para contornar mecanismos de monitorização." },
    ]
  },
  {
    num: 1,
    nome: "Camada de Acesso à Rede",
    nomeEn: "Network Access Layer",
    osiEq: ["OSI 2 – Ligação de Dados", "OSI 1 – Física"],
    cor: "var(--c1)",
    pdu: "Trama / Bits",
    descricao: "Camada mais baixa do modelo TCP/IP. Combina as funcionalidades das camadas Física e de Ligação de Dados do modelo OSI. Responsável pela transmissão efectiva de bits no meio físico e pelo controlo de acesso ao meio de comunicação partilhado.",
    funcoes: [
      "Transmissão de bits no meio físico (cobre, fibra, rádio)",
      "Endereçamento físico (endereço MAC – 48 bits)",
      "Enquadramento e delimitação de tramas",
      "Detecção de erros (CRC/FCS)",
      "Controlo de acesso ao meio (CSMA/CD, CSMA/CA)"
    ],
    protocolos: ["Ethernet (IEEE 802.3)","Wi-Fi (IEEE 802.11)","PPP","PPPoE","ARP","VLAN (802.1Q)","STP (802.1D)","Bluetooth","DSL","Fibra óptica"],
    ataques: [
      { icon:"👻", nome:"ARP Spoofing / ARP Poisoning", sev:"critico", desc:"Envio de respostas ARP gratuitas falsas para associar o MAC do atacante ao IP de outro anfitrião (ex: gateway), interceptando todo o tráfego da rede local (ataque MitM clássico)." },
      { icon:"🌊", nome:"MAC Flooding", sev:"alto", desc:"Envio massivo de tramas Ethernet com MACs de origem aleatórios para encher a tabela CAM do switch, forçando-o a funcionar em modo de difusão (como um hub), expondo o tráfego a todos os portos." },
      { icon:"📡", nome:"Ataques a Wi-Fi (Evil Twin / WPA2 Cracking)", sev:"critico", desc:"Criação de pontos de acesso falsos (Evil Twin/Rogue AP), ataques de desautenticação (deauth flood 802.11), captura e quebra de handshakes WPA2 por dicionário, e ataques PMKID sem cliente." },
      { icon:"🏷️", nome:"VLAN Hopping", sev:"alto", desc:"Exploração de configurações de trunking automático (Switch Spoofing) ou duplo encapsulamento 802.1Q para aceder a VLANs isoladas sem autorização." },
      { icon:"🔋", nome:"STP Manipulation (Spanning Tree)", sev:"alto", desc:"Injecção de BPDUs com prioridade superior para forçar a eleição do atacante como root bridge, redirecionando o tráfego da rede local através do seu equipamento." },
      { icon:"🎧", nome:"Sniffing Físico / Escuta Passiva", sev:"critico", desc:"Ligação física a cabos de rede, taps de fibra óptica ou captura de sinais electromagnéticos para interceptar dados em trânsito de forma passiva e indetectável." },
      { icon:"⚡", nome:"Jamming de Sinal RF / Interferência", sev:"alto", desc:"Emissão de sinais de radiofrequência para bloquear ou degradar comunicações sem fios (Wi-Fi, Bluetooth, GSM/LTE), tornando-as inutilizáveis numa área geográfica." },
    ]
  }
];

const sevLabel = { critico: "Crítico", alto: "Alto", medio: "Médio" };
const stack = document.getElementById('stack');

camadas.forEach(c => {
  const el = document.createElement('div');
  el.className = 'layer';
  el.style.setProperty('--layer-color', c.cor);

  const osiChips = c.osiEq.map(o => `<span class="osi-chip">${o}</span>`).join('');
  const funcoesHTML = c.funcoes.map(f => `<li>${f}</li>`).join('');
  const protosHTML = c.protocolos.map(p => `<span class="proto-chip">${p}</span>`).join('');
  const ataquesHTML = c.ataques.map(a => `
    <div class="attack-card">
      <div class="attack-icon">${a.icon}</div>
      <div>
        <div class="attack-name">${a.nome} <span class="attack-severity sev-${a.sev}">${sevLabel[a.sev]}</span></div>
        <div class="attack-desc">${a.desc}</div>
      </div>
    </div>
  `).join('');

  el.innerHTML = `
    <div class="layer-header">
      <div class="layer-bar"></div>
      <div class="layer-num-box">
        <div class="layer-num">${c.num}</div>
        <div class="layer-num-label">cam.</div>
      </div>
      <div class="layer-body">
        <div class="layer-name">${c.nome}</div>
        <div class="layer-name-en">${c.nomeEn}</div>
        <div class="layer-osi-map">${osiChips}</div>
      </div>
      <div class="layer-meta">
        <span class="meta-pdu">${c.pdu.split('/')[0].trim()}</span>
        <span class="meta-ataques">⚠ ${c.ataques.length} ataques</span>
      </div>
    </div>
    <div class="detail">
      <div class="detail-inner">
        <div class="detail-tabs">
          <button class="tab-btn active" data-tab="info">📋 Descrição</button>
          <button class="tab-btn danger" data-tab="ataques">⚠️ Ataques (${c.ataques.length})</button>
        </div>
        <div class="tab-panel active" data-panel="info">
          <p class="descricao-txt">${c.descricao}</p>
          <div class="detail-grid">
            <div class="detail-section">
              <h4>Funções Principais</h4>
              <ul>${funcoesHTML}</ul>
            </div>
            <div class="detail-section">
              <h4>PDU</h4>
              <p style="font-size:.82rem; color:#4a4540; margin-bottom:.6rem;">${c.pdu}</p>
              <h4>Protocolos / Normas</h4>
              <div class="proto-list">${protosHTML}</div>
            </div>
          </div>
        </div>
        <div class="tab-panel" data-panel="ataques">
          <div class="attacks-grid">${ataquesHTML}</div>
        </div>
      </div>
    </div>
  `;

  el.addEventListener('click', e => {
    if (e.target.closest('.tab-btn')) return;
    const isActive = el.classList.contains('active');
    document.querySelectorAll('.layer').forEach(l => l.classList.remove('active'));
    if (!isActive) el.classList.add('active');
  });

  el.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const tab = btn.dataset.tab;
      el.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      el.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      el.querySelector(`[data-panel="${tab}"]`).classList.add('active');
    });
  });

  stack.appendChild(el);
});
