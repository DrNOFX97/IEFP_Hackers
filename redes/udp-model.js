// Bit ruler
const ruler = document.getElementById('ruler');
for(let i=0;i<32;i++){
  const s = document.createElement('span');
  s.textContent = i+1;
  ruler.appendChild(s);
}

// Field detail data
const fieldData = {
  orig:  { title:"Porto de Origem (16 bits)", desc:"Identifica o porto do processo emissor. Campo opcional — pode ser preenchido com zeros (0x0000) se não for necessária uma resposta. Valores de 0 a 65 535. Os portos bem conhecidos (0–1023) são atribuídos pela IANA." },
  dest:  { title:"Porto de Destino (16 bits)", desc:"Identifica o porto do processo receptor no anfitrião de destino. Campo obrigatório — define qual o serviço ou aplicação que deve receber o datagrama. Ex: porto 53 para DNS, 67/68 para DHCP, 123 para NTP." },
  comp:  { title:"Comprimento (16 bits)", desc:"Especifica o comprimento total do datagrama UDP em bytes, incluindo o cabeçalho de 8 bytes e o payload. Valor mínimo: 8 (datagrama sem dados). Valor máximo: 65 535 bytes (limitado pelo campo de 16 bits)." },
  chk:   { title:"Checksum (16 bits)", desc:"Verificação de integridade do cabeçalho e dados. Calculado sobre um pseudo-cabeçalho IP + cabeçalho UDP + dados. Em IPv4 é opcional (zeros = desactivado). Em IPv6 é obrigatório pois o IPv6 não tem checksum próprio." },
  dados: { title:"Dados / Payload (variável)", desc:"Conteúdo útil transportado pelo datagrama, fornecido pela camada de aplicação. Não há segmentação automática — se o payload ultrapassar o MTU da rede (tipicamente 1500 bytes em Ethernet), o IP fragmenta o datagrama. O tamanho máximo do payload é 65 507 bytes (65 535 − 8 bytes de cabeçalho UDP − 20 bytes de cabeçalho IPv4)." }
};

document.querySelectorAll('.field').forEach(f => {
  f.addEventListener('click', () => {
    const id = f.dataset.id;
    if(!id || !fieldData[id]) return;
    const detail = document.getElementById('field-detail');
    const wasOpen = f.classList.contains('active-field') && detail.classList.contains('show');
    document.querySelectorAll('.field').forEach(x => x.classList.remove('active-field'));
    if(wasOpen){ detail.classList.remove('show'); return; }
    f.classList.add('active-field');
    document.getElementById('fd-title').textContent = fieldData[id].title;
    document.getElementById('fd-desc').textContent  = fieldData[id].desc;
    detail.classList.add('show');
  });
});

// Attacks
const ataques = [
  {
    icon:"🌊", nome:"UDP Flood (DoS/DDoS)", sev:"critico",
    desc:"Envio massivo de datagramas UDP para portas aleatórias do alvo. Como o UDP não tem estado de ligação, o receptor tenta processar cada datagrama — se não existir nenhum serviço na porta, responde com um ICMP 'Destination Unreachable'. O volume de pedidos e respostas ICMP satura a largura de banda e os recursos do sistema.",
    como:"O atacante (ou uma botnet) envia milhões de datagramas por segundo com IPs de origem falsificados (spoofing). O alvo fica sobrecarregado tentando responder. Ferramentas comuns: hping3, LOIC, Mirai (botnets IoT).",
    mitigacao:"Rate limiting de pacotes UDP por fonte, inspecção stateful de UDP (firewall), filtragem de tráfego de entrada com IP de origem inválido (BCP38/uRPF), blackhole routing e serviços anti-DDoS (Cloudflare, Akamai)."
  },
  {
    icon:"🪞", nome:"Amplificação UDP (Reflexão e Amplificação)", sev:"critico",
    desc:"O atacante envia pequenos pedidos UDP com o IP de origem falsificado (IP da vítima) para servidores legítimos que respondem com respostas muito maiores. O factor de amplificação pode ser enorme: DNS (~28–54×), NTP (~556×), SSDP (~30×), memcached (~51 000×). O resultado é um DDoS volumétrico devastador.",
    como:"Ex: pedido DNS ANY de 40 bytes → resposta de 3000+ bytes. O atacante usa apenas uma pequena largura de banda para gerar um ataque de terabits por segundo contra a vítima, usando reflectores involuntários.",
    mitigacao:"Desactivar serviços UDP desnecessários expostos à Internet, configurar resolvedores DNS como não-recursivos para IPs externos, actualizar NTP (modo monlist desactivado), bloquear tráfego de entrada com IP de origem falsificado (BCP38)."
  },
  {
    icon:"🎭", nome:"UDP Spoofing", sev:"alto",
    desc:"Como o UDP não verifica a identidade do emissor, é trivial falsificar o endereço IP de origem num datagrama. Permite ao atacante: ocultar a sua identidade, realizar ataques de reflexão/amplificação, envenenar caches DNS ou contornar controlos de acesso baseados em IP.",
    como:"Utilização de raw sockets para construir datagramas UDP com qualquer IP de origem. Em sistemas Linux/BSD, requer privilégios de root. Amplamente usado como base para outros ataques UDP.",
    mitigacao:"Implementação de BCP38 (uRPF) nos routers de borda para filtrar pacotes com IPs de origem inválidos. Autenticação de protocolos (ex: DNSSEC para DNS, NTPv4 com autenticação)."
  },
  {
    icon:"🧨", nome:"DNS Amplification / DNS Flood", sev:"critico",
    desc:"Exploração específica do UDP/53 (DNS). No DNS Amplification, pedidos com IP falsificado são enviados para resolvedores abertos, que respondem com grandes respostas para a vítima. No DNS Flood, volumes massivos de pedidos DNS legítimos sobrecarregam o servidor DNS alvo, causando indisponibilidade do serviço de resolução de nomes.",
    como:"DNS ANY ou TXT queries geram respostas grandes (até 4096 bytes com EDNS0). Resolvedores recursivos abertos são os reflectores. Botnets com milhares de nós aumentam o volume exponencialmente.",
    mitigacao:"Desactivar resolvedores DNS recursivos abertos, limitar taxa de respostas DNS (DNS RRL), implementar DNSSEC, monitorizar volumes anómalos de queries DNS, usar anycast para distribuir a carga."
  },
  {
    icon:"⏰", nome:"NTP Amplification (Modo monlist)", sev:"alto",
    desc:"Exploração do comando 'monlist' do protocolo NTP (UDP/123), que devolve os últimos 600 clientes que contactaram o servidor — uma resposta de ~48 KB para um pedido de ~40 bytes (factor 556×). Foi um dos ataques DDoS mais devastadores de 2013–2014.",
    como:"O atacante envia pedidos 'GET MON_LIST' com IP falsificado da vítima para servidores NTP vulneráveis. O servidor NTP responde com centenas de pacotes UDP para a vítima. Ferramentas: ntpdc, scripts Python.",
    mitigacao:"Actualizar ntpd para versão ≥4.2.7p26 (monlist desactivado por defeito), adicionar 'noquery' e 'nopeer' às configurações NTP, bloquear UDP/123 de entrada em servidores que não necessitam de ser servidores NTP públicos."
  },
  {
    icon:"📡", nome:"SSDP Amplification (UPnP)", sev:"alto",
    desc:"Exploração do protocolo SSDP (Simple Service Discovery Protocol, UDP/1900) usado pelo UPnP em dispositivos domésticos (routers, smart TVs, impressoras). Pedidos M-SEARCH com IP falsificado geram respostas ~30× maiores. Milhões de dispositivos IoT expostos na Internet são reflectores potenciais.",
    como:"Pedido SSDP M-SEARCH de ~30 bytes → resposta de ~900 bytes por dispositivo vulnerável. Scanners como Shodan ajudam a identificar dispositivos UPnP expostos. Botnets IoT (ex: Mirai) exploram estes dispositivos.",
    mitigacao:"Desactivar UPnP em routers e dispositivos quando não necessário, bloquear UDP/1900 de entrada na firewall perimetral, actualizar firmware de dispositivos IoT, segmentar redes IoT em VLANs separadas."
  },
  {
    icon:"🔄", nome:"UDP Session Hijacking", sev:"medio",
    desc:"Como o UDP não tem estado de ligação nem números de sequência, um atacante na posição de intermediário (MitM) pode injectar datagramas falsos numa comunicação UDP em curso. Especialmente relevante em protocolos como TFTP, RIP, ou comunicações DNS sem DNSSEC.",
    como:"O atacante monitoriza o tráfego UDP para conhecer IPs e portos em uso, depois envia datagramas forjados com os parâmetros correctos antes da resposta legítima. Em redes locais (LAN), combina-se com ARP Spoofing para posicionamento MitM.",
    mitigacao:"Usar TLS/DTLS sobre UDP para cifra e autenticação, implementar DNSSEC para DNS, utilizar números aleatórios imprevisíveis (nonces) nos protocolos de aplicação, segmentação de rede e monitorização de tráfego."
  },
  {
    icon:"💀", nome:"Memcached Amplification", sev:"critico",
    desc:"O servidor de cache Memcached (UDP/11211) pode ser explorado com um factor de amplificação de até 51 000×. Em 2018, o serviço GitHub sofreu um ataque de 1,35 Tbps usando esta técnica — o maior DDoS registado na época. A causa: servidores Memcached expostos à Internet sem qualquer autenticação.",
    como:"Um pedido UDP de 15 bytes para um servidor Memcached vulnerável pode gerar uma resposta de 750 KB. Com centenas de servidores reflectores, um atacante com poucos Mbps gera ataques de Tbps.",
    mitigacao:"Nunca expor o Memcached à Internet (firewall ou bind apenas a 127.0.0.1), desactivar o protocolo UDP no Memcached (-U 0), monitorizar exposições com Shodan, aplicar rate limiting de UDP/11211."
  },
];

const sevLabel = { critico:"Crítico", alto:"Alto", medio:"Médio" };
const container = document.getElementById('ataques-container');

ataques.forEach(a => {
  const card = document.createElement('div');
  card.className = 'attack-card';
  card.innerHTML = `
    <div class="attack-icon">${a.icon}</div>
    <div>
      <div class="attack-header">
        <span class="attack-name">${a.nome}</span>
        <span class="attack-severity sev-${a.sev}">${sevLabel[a.sev]}</span>
      </div>
      <div class="attack-body">
        <p class="attack-desc">${a.desc}</p>
        <p class="attack-como"><strong>// COMO FUNCIONA</strong><br>${a.como}</p>
        <div class="attack-mitigacao"><strong>// MITIGAÇÃO</strong><br>${a.mitigacao}</div>
      </div>
    </div>
  `;
  card.addEventListener('click', () => card.classList.toggle('open'));
  container.appendChild(card);
});
