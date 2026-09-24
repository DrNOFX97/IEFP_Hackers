const camadas = [
  {
    num: 7, nome: "Camada de Aplicação", nomeEn: "Application Layer",
    cor: "var(--c7)", tipo: "anfitriao", tipotxt: "Camada de Anfitrião", pdu: "Dados",
    descricao: "Interface directa com o utilizador final e as aplicações. Fornece serviços de rede como correio electrónico, transferência de ficheiros e acesso a páginas web. É a camada mais próxima do utilizador.",
    funcoes: ["Identificar parceiros de comunicação","Determinar disponibilidade de recursos","Sincronizar a comunicação entre aplicações"],
    protocolos: ["HTTP","HTTPS","FTP","SMTP","POP3","IMAP","DNS","DHCP","Telnet","SSH"],
    ataques: [
      { icon:"🎣", nome:"Phishing / Spear Phishing", sev:"critico", desc:"Engenharia social via e-mail ou páginas falsas que imitam serviços legítimos para roubar credenciais ou instalar malware." },
      { icon:"💉", nome:"Injecção SQL / XSS / CSRF", sev:"critico", desc:"Exploração de vulnerabilidades em aplicações web: injecção de código malicioso em bases de dados (SQLi), execução de scripts no browser da vítima (XSS) ou acções não autorizadas em nome do utilizador (CSRF)." },
      { icon:"🔑", nome:"Força Bruta / Credential Stuffing", sev:"alto", desc:"Tentativa sistemática de adivinhar palavras-passe ou reutilização de credenciais comprometidas para aceder a contas." },
      { icon:"🦠", nome:"Malware / Ransomware", sev:"critico", desc:"Software malicioso entregue via aplicações (e-mail, browser, FTP) que cifra dados, exfiltra informação ou compromete o sistema." },
      { icon:"🌐", nome:"DNS Spoofing / DNS Hijacking", sev:"alto", desc:"Manipulação das respostas DNS para redirigir utilizadores para servidores controlados pelo atacante, facilitando ataques de intermediário (MitM)." },
      { icon:"📦", nome:"Ataques a APIs REST/SOAP", sev:"alto", desc:"Exploração de endpoints mal configurados, falta de autenticação, exposição de dados sensíveis ou lógica de negócio vulnerável em APIs modernas." },
    ]
  },
  {
    num: 6, nome: "Camada de Apresentação", nomeEn: "Presentation Layer",
    cor: "var(--c6)", tipo: "anfitriao", tipotxt: "Camada de Anfitrião", pdu: "Dados",
    descricao: "Garante que os dados enviados por um sistema possam ser lidos por outro. Trata da tradução de formatos, cifra e compressão dos dados.",
    funcoes: ["Tradução de formatos de dados","Cifra e decifra (ex: SSL/TLS)","Compressão de dados"],
    protocolos: ["SSL/TLS","JPEG","MPEG","GIF","ASCII","EBCDIC","XDR"],
    ataques: [
      { icon:"🔓", nome:"SSL Stripping", sev:"critico", desc:"O atacante intercepta a comunicação e força o cliente a usar HTTP em vez de HTTPS, expondo todo o tráfego em texto claro." },
      { icon:"📜", nome:"Ataques a Certificados (MitM TLS)", sev:"critico", desc:"Uso de certificados falsos ou comprometidos para se interpor numa comunicação cifrada, permitindo decifrar e modificar o tráfego." },
      { icon:"🗜️", nome:"CRIME / BREACH (Compressão + Cifra)", sev:"alto", desc:"Exploração da combinação de compressão e cifra para extrair segredos (ex: cookies de sessão) a partir de respostas HTTPS por análise do tamanho dos dados." },
      { icon:"🧩", nome:"Ataques a Formatos de Dados", sev:"medio", desc:"Exploração de vulnerabilidades em parsers de formatos (XML, JSON, imagens) como XXE (XML External Entity) para exfiltrar ficheiros ou executar pedidos internos." },
      { icon:"🔄", nome:"Downgrade de Protocolo", sev:"alto", desc:"Forçar a negociação para versões mais fracas de TLS/SSL (ex: SSLv3, TLS 1.0) vulneráveis a ataques como POODLE ou BEAST." },
    ]
  },
  {
    num: 5, nome: "Camada de Sessão", nomeEn: "Session Layer",
    cor: "var(--c5)", tipo: "anfitriao", tipotxt: "Camada de Anfitrião", pdu: "Dados",
    descricao: "Estabelece, gere e termina sessões entre aplicações. Permite a recuperação de sessões interrompidas através de pontos de sincronização.",
    funcoes: ["Estabelecer e terminar sessões","Controlo de diálogo (simplex, semi-duplex, duplex integral)","Sincronização com pontos de retoma"],
    protocolos: ["NetBIOS","RPC","PPTP","L2TP","SIP","H.323"],
    ataques: [
      { icon:"🍪", nome:"Session Hijacking (Sequestro de Sessão)", sev:"critico", desc:"Roubo do token/cookie de sessão de um utilizador autenticado para assumir a sua identidade sem necessidade de credenciais." },
      { icon:"🔁", nome:"Session Fixation", sev:"alto", desc:"O atacante força uma vítima a usar um identificador de sessão conhecido antecipadamente, permitindo assumir o controlo após a autenticação." },
      { icon:"🔃", nome:"Replay Attack", sev:"alto", desc:"Captura e reenvio de mensagens ou tokens de autenticação válidos para obter acesso não autorizado, explorando a ausência de nonces ou timestamps." },
      { icon:"📞", nome:"SIP Abuse (VoIP)", sev:"medio", desc:"Exploração do protocolo SIP para escutas, falsificação de chamadas, desvio de chamadas ou ataques de negação de serviço em sistemas VoIP." },
    ]
  },
  {
    num: 4, nome: "Camada de Transporte", nomeEn: "Transport Layer",
    cor: "var(--c4)", tipo: "anfitriao", tipotxt: "Camada de Anfitrião", pdu: "Segmento",
    descricao: "Responsável pela entrega de dados ponto-a-ponto entre processos em anfitriões distintos. Garante fiabilidade, controlo de fluxo e multiplexagem por portas lógicas.",
    funcoes: ["Segmentação e remontagem de dados","Controlo de fluxo e de erros","Multiplexagem por portas lógicas (0–65535)"],
    protocolos: ["TCP","UDP","SCTP","DCCP"],
    ataques: [
      { icon:"🌊", nome:"SYN Flood (DoS/DDoS)", sev:"critico", desc:"Envio massivo de pacotes TCP SYN sem completar o handshake, esgotando a tabela de conexões semi-abertas do servidor até à indisponibilidade total." },
      { icon:"🔪", nome:"TCP Session Hijacking", sev:"critico", desc:"Injecção de pacotes TCP com números de sequência correctos para assumir o controlo de uma sessão TCP estabelecida entre dois anfitriões." },
      { icon:"🔍", nome:"Port Scanning", sev:"medio", desc:"Enumeração sistemática de portas TCP/UDP abertas (ex: com Nmap) para identificar serviços activos e possíveis vectores de ataque." },
      { icon:"💣", nome:"UDP Flood", sev:"alto", desc:"Envio massivo de pacotes UDP para portas aleatórias, forçando o anfitrião a processar e responder com mensagens ICMP, saturando a largura de banda." },
      { icon:"🪞", nome:"Ataques de Amplificação (UDP)", sev:"alto", desc:"Envio de pequenos pedidos UDP com IP de origem falsificado (ex: DNS, NTP, SSDP) para servidores que respondem com respostas muito maiores, amplificando o ataque contra a vítima." },
    ]
  },
  {
    num: 3, nome: "Camada de Rede", nomeEn: "Network Layer",
    cor: "var(--c3)", tipo: "meios", tipotxt: "Camada de Meios", pdu: "Pacote",
    descricao: "Determina o melhor caminho lógico para encaminhar pacotes entre redes distintas. Responsável pelo endereçamento lógico (IP) e pelo encaminhamento (routing).",
    funcoes: ["Endereçamento lógico (IPv4 / IPv6)","Encaminhamento entre redes (routing)","Fragmentação e remontagem de pacotes"],
    protocolos: ["IPv4","IPv6","ICMP","OSPF","BGP","RIP","ARP","IGMP"],
    ataques: [
      { icon:"🎭", nome:"IP Spoofing", sev:"critico", desc:"Falsificação do endereço IP de origem nos pacotes para ocultar a identidade do atacante, contornar filtros de acesso ou realizar ataques de amplificação." },
      { icon:"🛣️", nome:"Manipulação de Routing (BGP Hijacking)", sev:"critico", desc:"Anúncio de rotas BGP falsas para redirigir o tráfego de Internet através de sistemas controlados pelo atacante, permitindo intercepção ou blackholing de tráfego." },
      { icon:"🧊", nome:"ICMP Flood / Ping of Death / Smurf", sev:"alto", desc:"Ataques baseados em ICMP: envio massivo de pings (flood), pacotes ICMP malformados de tamanho excessivo (Ping of Death), ou amplificação via endereços de broadcast (Smurf)." },
      { icon:"📡", nome:"OSPF/RIP Poisoning", sev:"alto", desc:"Injecção de actualizações de routing falsas em protocolos IGP para alterar as tabelas de encaminhamento e desviar o tráfego interno." },
      { icon:"🔀", nome:"Fragmentação de Pacotes IP", sev:"medio", desc:"Divisão deliberada de pacotes em fragmentos para contornar sistemas de detecção de intrusão (IDS) e firewalls que não fazem reassembly completo." },
    ]
  },
  {
    num: 2, nome: "Camada de Ligação de Dados", nomeEn: "Data Link Layer",
    cor: "var(--c2)", tipo: "meios", tipotxt: "Camada de Meios", pdu: "Trama",
    descricao: "Garante a transferência fiável de dados entre dois nós directamente ligados. Divide-se em LLC (controlo lógico da ligação) e MAC (controlo de acesso ao meio).",
    funcoes: ["Endereçamento físico (endereço MAC)","Delimitação e enquadramento de tramas","Detecção e correcção de erros (CRC)"],
    protocolos: ["Ethernet","Wi-Fi (802.11)","PPP","HDLC","Frame Relay","ATM"],
    ataques: [
      { icon:"👻", nome:"ARP Spoofing / ARP Poisoning", sev:"critico", desc:"Envio de respostas ARP falsas para associar o endereço MAC do atacante ao IP de outro anfitrião (ex: gateway), permitindo interceptar todo o tráfego da rede local (MitM)." },
      { icon:"🌊", nome:"MAC Flooding", sev:"alto", desc:"Envio massivo de tramas Ethernet com endereços MAC de origem aleatórios para encher a tabela CAM do switch, forçando-o a funcionar em modo de difusão (hub) e expondo o tráfego." },
      { icon:"🏷️", nome:"VLAN Hopping", sev:"alto", desc:"Exploração de configurações de trunking (Switch Spoofing) ou duplo encapsulamento 802.1Q para aceder a VLANs às quais não se teria permissão." },
      { icon:"🥸", nome:"MAC Spoofing", sev:"medio", desc:"Alteração do endereço MAC do atacante para contornar controlos de acesso baseados em MAC (port security, filtros de rede sem fios)." },
      { icon:"📡", nome:"Ataques a Wi-Fi (802.11)", sev:"critico", desc:"Inclui redes falsas (Evil Twin / Rogue AP), desautenticação forçada (deauth flood), quebra de WEP/WPA2 por captura de handshake e ataque de dicionário, e ataques PMKID." },
      { icon:"🔋", nome:"STP Manipulation", sev:"alto", desc:"Injecção de BPDUs com prioridade superior para assumir o papel de root bridge no protocolo Spanning Tree, permitindo desviar o tráfego da rede local." },
    ]
  },
  {
    num: 1, nome: "Camada Física", nomeEn: "Physical Layer",
    cor: "var(--c1)", tipo: "meios", tipotxt: "Camada de Meios", pdu: "Bits",
    descricao: "Define as especificações eléctricas, mecânicas e funcionais para a transmissão de bits brutos através de um meio físico: cabo de cobre, fibra óptica ou rádio.",
    funcoes: ["Transmissão de bits (0s e 1s)","Definição de tensões, frequências e conectores","Modo de transmissão: simplex, semi-duplex, duplex integral"],
    protocolos: ["RS-232","Ethernet (física)","USB","Bluetooth (físico)","DSL","RDIS","Fibra óptica"],
    ataques: [
      { icon:"🎧", nome:"Escuta Passiva (Sniffing Físico)", sev:"critico", desc:"Ligação física a um meio de transmissão (cabo de cobre, fibra óptica) ou captura de sinais electromagnéticos para interceptar dados em trânsito sem deixar rasto." },
      { icon:"✂️", nome:"Corte / Sabotagem de Cabos", sev:"alto", desc:"Interrupção deliberada de cabos de rede ou fibra óptica para causar indisponibilidade do serviço. Pode ser acidental ou intencional (sabotagem de infra-estrutura crítica)." },
      { icon:"📻", nome:"Interferência e Jamming (RF)", sev:"alto", desc:"Emissão de sinais de rádio frequência para bloquear ou degradar comunicações sem fios (Wi-Fi, Bluetooth, GSM), tornando-as inutilizáveis." },
      { icon:"🔌", nome:"Acesso Físico Não Autorizado", sev:"critico", desc:"Ligação de dispositivos não autorizados à infra-estrutura (ex: keyloggers, rogue devices, taps de rede) para captura de dados ou acesso à rede interna." },
      { icon:"⚡", nome:"Ataque por Pulso Electromagnético (EMP)", sev:"alto", desc:"Emissão de pulso electromagnético de alta intensidade para danificar ou destruir equipamento electrónico e de rede numa área geográfica." },
    ]
  }
];

const sevLabel = { critico: "Crítico", alto: "Alto", medio: "Médio" };

const stack = document.getElementById('stack');

camadas.forEach(c => {
  const el = document.createElement('div');
  el.className = 'layer';
  el.style.setProperty('--layer-color', c.cor);

  const ataquesBadge = `<span class="badge-tag ataques">⚠ ${c.ataques.length} ataques</span>`;
  const tipoBadge = `<span class="badge-tag ${c.tipo}">${c.tipotxt}</span>`;

  const funcoesHTML = c.funcoes.map(f => `<li>${f}</li>`).join('');
  const protosHTML  = c.protocolos.map(p => `<span class="proto-chip">${p}</span>`).join('');
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
    <div class="layer-num">${c.num}</div>
    <div class="layer-body">
      <div class="layer-name">${c.nome}</div>
      <div class="layer-name-en">${c.nomeEn}</div>
    </div>
    <div class="layer-badge">${tipoBadge}${ataquesBadge}</div>
    <div class="detail" style="grid-column:1/-1">
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
              <h4>Unidade de Dados (PDU)</h4>
              <div><span class="pdu-chip">${c.pdu}</span></div>
              <h4 style="margin-top:.8rem;">Protocolos / Normas</h4>
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

  // toggle layer open/close
  el.addEventListener('click', e => {
    if (e.target.closest('.tab-btn')) return;
    const estaActivo = el.classList.contains('active');
    document.querySelectorAll('.layer').forEach(l => l.classList.remove('active'));
    if (!estaActivo) el.classList.add('active');
  });

  // tab switching
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
