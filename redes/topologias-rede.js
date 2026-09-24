// ─── DATA ───────────────────────────────────────────────────────────────────
const topos = [
  {
    id:'p2p', label:'P2P', nome:'Ponto a Ponto (P2P)',
    sub:'Point-to-Point · Ligação directa entre 2 nós',
    cor:'#ff6b9d', lightNum:false,
    custo:'★★☆☆☆', fiab:'★★★☆☆', exp:'★☆☆☆☆',
    custoTag:'Baixo', fiabTag:'Médio', expTag:'Difícil',
    custoClass:'cost-low', fiabClass:'tag-med', expClass:'tag-bad',
    desc:`A topologia Ponto a Ponto é a forma mais simples de rede: <strong>dois nós ligados directamente</strong> por um único meio de transmissão (cabo, fibra ou ligação sem fios). Não existe equipamento intermédio — os dados fluem directamente de um extremo ao outro. É a base de todas as outras topologias, que são formadas por múltiplas ligações P2P.`,
    usos:['WAN · Ligações dedicadas ISP','VPN túneis','Ligações série entre routers','Modem-Router doméstico','Bluetooth device-to-device'],
    pros:[
      { t:'Simplicidade máxima', d:'Configuração e gestão extremamente simples — apenas dois dispositivos.' },
      { t:'Latência mínima', d:'Sem saltos intermédios — a comunicação é directa e rápida.' },
      { t:'Largura de banda dedicada', d:'Toda a capacidade do meio é exclusiva dos dois nós.' },
      { t:'Segurança elevada', d:'Canal privado — sem risco de acesso por terceiros na mesma ligação.' },
    ],
    cons:[
      { t:'Escalabilidade nula', d:'Para N dispositivos são necessárias N×(N-1)/2 ligações — impraticável.' },
      { t:'Sem redundância', d:'Uma falha no único cabo interrompe toda a comunicação.' },
      { t:'Custo por nó adicional', d:'Cada novo dispositivo requer uma nova ligação física dedicada.' },
    ],
    cares:[
      { t:'Qualidade do meio físico', d:'Numa ligação P2P, qualquer degradação do cabo/fibra afecta directamente a comunicação.' },
      { t:'Documentar bem cada ligação', d:'Em redes com muitos segmentos P2P, a documentação é crítica para diagnóstico.' },
    ],
    svgFn: drawP2P,
    tableRow:['Muito Baixo','Muito Baixo','Média','Nenhuma','Muito Difícil','Excelente','Mínima','Ligações dedicadas WAN'],
    tableClasses:['cost-low','cost-low','tag-med','tag-bad','tag-bad','tag-good',''],
  },
  {
    id:'bus', label:'BUS', nome:'Topologia em Barramento (BUS)',
    sub:'Todos os dispositivos partilham o mesmo meio de transmissão',
    cor:'#ffd166', lightNum:false,
    custo:'★★☆☆☆', fiab:'★★☆☆☆', exp:'★★☆☆☆',
    custoTag:'Baixo', fiabTag:'Baixo', expTag:'Moderada',
    custoClass:'cost-low', fiabClass:'tag-bad', expClass:'tag-med',
    desc:`Na topologia em barramento todos os dispositivos estão ligados a um <strong>único cabo central partilhado</strong> (barramento ou backbone). Cada dispositivo "escuta" todas as comunicações no meio — mas só processa as tramas endereçadas ao seu MAC. Usa o protocolo CSMA/CD (Ethernet coaxial, IEEE 802.3) para gerir colisões. Historicamente usada em Ethernet 10BASE2 e 10BASE5.`,
    usos:['Ethernet coaxial legacy (10BASE2/5)','Redes industriais simples','CAN bus (automóvel)','Ambientes de laboratório','Redes temporárias de baixo custo'],
    pros:[
      { t:'Custo de cablagem mínimo', d:'Um único cabo serve todos os dispositivos — menos material.' },
      { t:'Fácil de instalar', d:'Estrutura simples, sem equipamento central (hub/switch).' },
      { t:'Funciona sem equipamento activo', d:'Não necessita de switch ou hub — apenas terminadores.' },
    ],
    cons:[
      { t:'Ponto único de falha', d:'Uma ruptura no cabo central derruba TODA a rede imediatamente.' },
      { t:'Colisões frequentes', d:'Só um dispositivo pode transmitir de cada vez — colisões degradam o desempenho.' },
      { t:'Diagnóstico difícil', d:'Localizar a falha no cabo é complexo, especialmente em instalações longas.' },
      { t:'Não escalável', d:'O desempenho degrada-se rapidamente com o aumento do número de nós.' },
      { t:'Segurança fraca', d:'Todos os dispositivos recebem todo o tráfego — sniffing trivial.' },
    ],
    cares:[
      { t:'Terminadores nas extremidades', d:'Sem terminadores de 50Ω nas duas extremidades, ocorrem reflexões de sinal que corrompem dados.' },
      { t:'Comprimento máximo do segmento', d:'10BASE2: 185m · 10BASE5: 500m. Exceder este limite causa degradação do sinal.' },
      { t:'Evitar em ambientes críticos', d:'A topologia BUS não tem tolerância a falhas — nunca usar em sistemas críticos.' },
    ],
    svgFn: drawBus,
    tableRow:['Baixo','Muito Baixo','Baixa','Nenhuma','Difícil','Fraco','Baixa','Redes legacy/industriais'],
    tableClasses:['cost-low','cost-low','tag-bad','tag-bad','tag-bad','tag-bad',''],
  },
  {
    id:'star', label:'★ ESTRELA', nome:'Topologia em Estrela',
    sub:'Todos os nós ligados a um ponto central (switch/hub)',
    cor:'#4ecdc4', lightNum:false,
    custo:'★★★☆☆', fiab:'★★★★☆', exp:'★★★★★',
    custoTag:'Médio', fiabTag:'Alto', expTag:'Fácil',
    custoClass:'cost-med', fiabClass:'tag-good', expClass:'tag-good',
    desc:`Na topologia em estrela, <strong>todos os dispositivos estão ligados a um nó central</strong> (switch ou hub). Nenhum dispositivo comunica directamente com outro — toda a comunicação passa pelo centro. É a topologia dominante nas redes Ethernet modernas (IEEE 802.3). O switch aprende os endereços MAC e encaminha tramas apenas para o porto de destino, eliminando colisões.`,
    usos:['Ethernet LAN moderna (99% das redes)','Redes empresariais','Redes domésticas (router + switch)','Data centres','Wi-Fi (AP = centro da estrela)'],
    pros:[
      { t:'Falha isolada por dispositivo', d:'A falha de um cabo ou dispositivo só afecta esse nó — os restantes continuam.' },
      { t:'Fácil diagnóstico', d:'Identificar e substituir o dispositivo/cabo com falha é simples e rápido.' },
      { t:'Expansão trivial', d:'Adicionar um nó = ligar um cabo ao switch. Sem interrupção do serviço.' },
      { t:'Sem colisões (com switch)', d:'Switch cria domínios de colisão individuais por porto — full-duplex.' },
      { t:'Gestão centralizada', d:'Monitorização e configuração centralizadas no switch (SNMP, port mirroring).' },
    ],
    cons:[
      { t:'Ponto central de falha', d:'Se o switch central falhar, toda a rede fica inoperacional.' },
      { t:'Maior custo de cablagem', d:'Cada dispositivo necessita do seu próprio cabo até ao switch.' },
      { t:'Limite de portos', d:'A capacidade da rede é limitada pelo número de portos do switch central.' },
    ],
    cares:[
      { t:'Redundância no switch central', d:'Usar switch redundante ou UPS para o equipamento central — é o ponto crítico.' },
      { t:'Gestão de cabos', d:'Em redes grandes, a organização do patch panel e a identificação de cabos é essencial.' },
      { t:'Capacidade do switch', d:'Verificar que o switch suporta a largura de banda total necessária (uplink/backplane).' },
    ],
    svgFn: drawStar,
    tableRow:['Médio','Médio','Alta','Por nó','Muito Fácil','Muito Bom','Média','LAN Empresarial/Doméstica'],
    tableClasses:['tag-med','tag-med','tag-good','tag-med','tag-good','tag-good',''],
  },
  {
    id:'ring', label:'ANEL', nome:'Topologia em Anel (Ring)',
    sub:'Cada nó ligado ao seguinte — forma um círculo fechado',
    cor:'#a8dadc', lightNum:false,
    custo:'★★★☆☆', fiab:'★★☆☆☆', exp:'★★☆☆☆',
    custoTag:'Médio', fiabTag:'Médio', expTag:'Difícil',
    custoClass:'cost-med', fiabClass:'tag-med', expClass:'tag-bad',
    desc:`Na topologia em anel, cada dispositivo está ligado exactamente ao <strong>seguinte e ao anterior</strong>, formando um circuito fechado. Os dados circulam numa direcção (anel simples) ou em ambas (anel duplo). O controlo de acesso usa o mecanismo de <strong>Token Ring (IEEE 802.5)</strong> — apenas o dispositivo com o token pode transmitir, eliminando colisões. O anel duplo (FDDI, SDH/SONET) oferece redundância.`,
    usos:['FDDI (Fiber Distributed Data Interface)','SDH/SONET (redes de operador)','Token Ring legacy (IBM)','Redes industriais (PROFIBUS)','Algumas redes metropolitanas (MAN)'],
    pros:[
      { t:'Sem colisões (token)', d:'O mecanismo de token garante acesso ordenado ao meio — desempenho previsível.' },
      { t:'Desempenho estável sob carga', d:'Performance degradação linear com o nº de nós — previsível.' },
      { t:'Anel duplo = redundância', d:'FDDI/SONET com anel duplo: falha num segmento → tráfego desvia pelo anel secundário.' },
    ],
    cons:[
      { t:'Anel simples: ponto de falha', d:'Uma falha num cabo ou nó interrompe todo o anel (anel simples).' },
      { t:'Latência proporcional ao nº de nós', d:'O token percorre todos os nós — latência cresce com o tamanho da rede.' },
      { t:'Expansão disruptiva', d:'Adicionar/remover um nó requer interrupção temporária do anel.' },
      { t:'Tecnologia legacy', d:'Token Ring e FDDI foram praticamente substituídos pela Ethernet moderna.' },
    ],
    cares:[
      { t:'Preferir anel duplo em produção', d:'Anel simples não tem tolerância a falhas — sempre usar anel duplo em ambientes críticos.' },
      { t:'Monitorizar o token', d:'Perda do token paralisa a rede — implementar mecanismos de recuperação (MAU/MSAU).' },
      { t:'Documentar cada nó', d:'A ordem física dos nós no anel é crítica para diagnóstico e manutenção.' },
    ],
    svgFn: drawRing,
    tableRow:['Médio','Médio','Média','Baixa (duplo: Boa)','Difícil','Bom','Média','Redes industriais/MAN legacy'],
    tableClasses:['tag-med','tag-med','tag-med','tag-bad','tag-bad','tag-med',''],
  },
  {
    id:'mesh', label:'MESH', nome:'Topologia em Malha (Mesh)',
    sub:'Cada nó ligado a múltiplos ou todos os outros nós',
    cor:'#95e1d3', lightNum:false,
    custo:'★★★★★', fiab:'★★★★★', exp:'★★★☆☆',
    custoTag:'Muito Alto', fiabTag:'Muito Alto', expTag:'Moderada',
    custoClass:'cost-high', fiabClass:'tag-good', expClass:'tag-med',
    desc:`Na topologia em malha, <strong>cada nó tem ligações directas a múltiplos outros nós</strong>. Na malha total (full mesh), cada nó está ligado a TODOS os outros — N×(N-1)/2 ligações. Na malha parcial (partial mesh), apenas alguns nós têm múltiplas ligações. Oferece a maior redundância possível: múltiplos caminhos alternativos garantem que a falha de qualquer ligação ou nó não interrompe a comunicação.`,
    usos:['Internet (backbone global)','Redes militares e críticas','Redes WAN de operadores','Wi-Fi Mesh doméstico (Eero, Orbi)','Redes de sensores IoT (Zigbee, Z-Wave)'],
    pros:[
      { t:'Máxima redundância', d:'Múltiplos caminhos alternativos — praticamente imune a falhas individuais.' },
      { t:'Sem ponto único de falha', d:'A rede continua a funcionar mesmo com múltiplas falhas simultâneas.' },
      { t:'Balanceamento de carga', d:'O tráfego pode ser distribuído por múltiplos caminhos em simultâneo.' },
      { t:'Alta fiabilidade', d:'Usada em infra-estruturas críticas pela sua resiliência excepcional.' },
    ],
    cons:[
      { t:'Custo muito elevado', d:'Full mesh de N nós exige N×(N-1)/2 ligações — cresce exponencialmente.' },
      { t:'Complexidade de gestão', d:'Roteamento, diagnóstico e manutenção de múltiplas ligações é muito complexo.' },
      { t:'Redundância vs custo', d:'Para pequenas redes, o custo supera largamente os benefícios.' },
    ],
    cares:[
      { t:'Full mesh vs Partial mesh', d:'Full mesh apenas para nós críticos — usar partial mesh para equilibrar custo e resiliência.' },
      { t:'Protocolos de routing dinâmico', d:'OSPF, BGP ou equivalentes são indispensáveis para gerir automaticamente os múltiplos caminhos.' },
      { t:'Limitar o número de nós full-mesh', d:'Full mesh para mais de 10 nós torna-se inviável — usar hierarquia ou partial mesh.' },
    ],
    svgFn: drawMesh,
    tableRow:['Muito Alto','Muito Alto','Muito Alta','Excelente','Moderada','Excelente','Muito Alta','Backbones/Infra Crítica'],
    tableClasses:['tag-bad','tag-bad','tag-good','tag-good','tag-med','tag-good',''],
  },
  {
    id:'tree', label:'ÁRVORE', nome:'Topologia em Árvore (Tree)',
    sub:'Hierarquia de estrelas — backbone + distribuição + acesso',
    cor:'#f38181', lightNum:true,
    custo:'★★★★☆', fiab:'★★★☆☆', exp:'★★★★☆',
    custoTag:'Médio-Alto', fiabTag:'Médio', expTag:'Boa',
    custoClass:'cost-med', fiabClass:'tag-med', expClass:'tag-good',
    desc:`A topologia em árvore é uma <strong>hierarquia de topologias em estrela</strong>, estruturada em camadas: Núcleo (Core), Distribuição e Acesso. O nó raiz (switch de núcleo) liga-se a switches de distribuição, que por sua vez ligam a switches de acesso onde os dispositivos finais se conectam. É a arquitectura padrão de redes empresariais e de campus. Combina a simplicidade da estrela com a escalabilidade hierárquica.`,
    usos:['Redes empresariais de campus','Data centres (spine-leaf)','Redes de universidades','Edifícios de escritórios (por piso)','Redes de operadores (DSLAM → BRAS → Core)'],
    pros:[
      { t:'Escalabilidade excelente', d:'Adicionar um novo ramo (departamento/piso) sem perturbar o resto da rede.' },
      { t:'Gestão hierárquica', d:'Isolamento por camadas facilita diagnóstico, políticas e segurança por segmento.' },
      { t:'Reflecte estrutura organizacional', d:'A hierarquia de rede espelha a hierarquia da organização — intuitiva.' },
      { t:'Segmentação natural', d:'VLANs, políticas de acesso e QoS fáceis de aplicar por ramo.' },
    ],
    cons:[
      { t:'Falha no trunk causa cascata', d:'Falha no switch de distribuição isola todos os switches de acesso abaixo dele.' },
      { t:'Custo aumenta com a hierarquia', d:'Switches de núcleo e distribuição são equipamentos de maior custo.' },
      { t:'Dependência do nó raiz', d:'Falha no switch de núcleo pode derrubar toda a rede (sem redundância).' },
    ],
    cares:[
      { t:'Redundância nos trunks', d:'Usar STP/RSTP ou ligações LAG (Link Aggregation) nos troncos entre camadas.' },
      { t:'Dimensionar o núcleo correctamente', d:'O switch de núcleo deve ter backplane suficiente para agregar todo o tráfego.' },
      { t:'Hierarquia de 2 vs 3 camadas', d:'Redes pequenas: 2 camadas (core+access). Grandes: 3 camadas (core+distribution+access).' },
    ],
    svgFn: drawTree,
    tableRow:['Médio-Alto','Alto','Boa','Média (depende camada)','Boa','Muito Bom','Média-Alta','Redes Empresariais/Campus'],
    tableClasses:['tag-med','tag-med','tag-med','tag-med','tag-good','tag-good',''],
  },
];

// ─── SVG DRAW FUNCTIONS ────────────────────────────────────────────────────
const C = '#252530', TXT = '#6060a0';

function node(x,y,col,label,r=14){
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}22" stroke="${col}" stroke-width="1.8"/>
  <text x="${x}" y="${y+4}" text-anchor="middle" fill="${col}" font-family="Fira Code,monospace" font-size="8" font-weight="700">${label}</text>`;
}
function line(x1,y1,x2,y2,col,dashed=false){
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="1.5" ${dashed?'stroke-dasharray="4,3"':''} opacity=".7"/>`;
}

function drawP2P(){
  return `<svg viewBox="0 0 260 100" xmlns="http://www.w3.org/2000/svg">
    ${line(60,50,200,50,'#ff6b9d')}
    <text x="130" y="40" text-anchor="middle" fill="#ff6b9d" font-family="Fira Code" font-size="8" opacity=".7">ligação directa</text>
    <rect x="5" y="35" width="30" height="30" rx="4" fill="#ff6b9d22" stroke="#ff6b9d" stroke-width="1.5"/>
    <text x="20" y="55" text-anchor="middle" fill="#ff6b9d" font-family="Fira Code" font-size="7">PC A</text>
    <rect x="225" y="35" width="30" height="30" rx="4" fill="#ff6b9d22" stroke="#ff6b9d" stroke-width="1.5"/>
    <text x="240" y="55" text-anchor="middle" fill="#ff6b9d" font-family="Fira Code" font-size="7">PC B</text>
    <text x="130" y="80" text-anchor="middle" fill="${TXT}" font-family="Fira Code" font-size="7">2 nós · 1 ligação · máx. largura de banda</text>
  </svg>`;
}

function drawBus(){
  const col='#ffd166';
  let s = `<svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">`;
  // backbone
  s += `<line x1="20" y1="65" x2="240" y2="65" stroke="${col}" stroke-width="3" opacity=".8"/>`;
  // terminators
  s += `<rect x="12" y="58" width="8" height="14" rx="2" fill="${col}" opacity=".9"/>`;
  s += `<rect x="240" y="58" width="8" height="14" rx="2" fill="${col}" opacity=".9"/>`;
  s += `<text x="8" y="90" fill="${TXT}" font-family="Fira Code" font-size="7" text-anchor="middle">T</text>`;
  s += `<text x="252" y="90" fill="${TXT}" font-family="Fira Code" font-size="7" text-anchor="middle">T</text>`;
  // nodes on top
  const xs=[55,105,155,205];
  xs.forEach((x,i)=>{
    s += `<line x1="${x}" y1="65" x2="${x}" y2="28" stroke="${col}" stroke-width="1" opacity=".5"/>`;
    s += `<rect x="${x-18}" y="10" width="36" height="18" rx="3" fill="${col}22" stroke="${col}" stroke-width="1.2"/>`;
    s += `<text x="${x}" y="23" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="7">PC${i+1}</text>`;
  });
  s += `<text x="130" y="105" text-anchor="middle" fill="${TXT}" font-family="Fira Code" font-size="7">cabo coaxial partilhado · terminadores nas extremidades</text>`;
  s += `<text x="130" y="118" text-anchor="middle" fill="${TXT}" font-family="Fira Code" font-size="7">CSMA/CD · 1 emissor de cada vez</text>`;
  s += `</svg>`;
  return s;
}

function drawStar(){
  const col='#4ecdc4';
  let s=`<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">`;
  // center switch
  s+=`<rect x="100" y="100" width="60" height="60" rx="8" fill="${col}22" stroke="${col}" stroke-width="2"/>`;
  s+=`<text x="130" y="128" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="8" font-weight="700">SW</text>`;
  s+=`<text x="130" y="141" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="7">Switch</text>`;
  const nodes=[
    {x:130,y:22,l:'SRV'},{x:225,y:80,l:'PC1'},
    {x:225,y:175,l:'PC2'},{x:130,y:230,l:'PC3'},
    {x:35,y:175,l:'PC4'},{x:35,y:80,l:'PC5'},
  ];
  nodes.forEach(n=>{
    s+=line(130,130,n.x,n.y,col);
    s+=`<rect x="${n.x-18}" y="${n.y-11}" width="36" height="22" rx="4" fill="${col}22" stroke="${col}" stroke-width="1.2"/>`;
    s+=`<text x="${n.x}" y="${n.y+4}" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="7">${n.l}</text>`;
  });
  s+=`<text x="130" y="255" text-anchor="middle" fill="${TXT}" font-family="Fira Code" font-size="7">6 nós · ponto central → switch</text>`;
  s+=`</svg>`;
  return s;
}

function drawRing(){
  const col='#a8dadc';
  let s=`<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">`;
  s+=`<circle cx="130" cy="125" r="80" fill="none" stroke="${col}" stroke-width="1" stroke-dasharray="3,4" opacity=".2"/>`;
  const pts=[];
  for(let i=0;i<6;i++){
    const a=i*60-90;
    pts.push({x:130+82*Math.cos(a*Math.PI/180), y:125+82*Math.sin(a*Math.PI/180)});
  }
  // ring lines
  for(let i=0;i<6;i++){
    const n=pts[(i+1)%6];
    s+=line(pts[i].x,pts[i].y,n.x,n.y,col);
  }
  const lbs=['PC1','PC2','PC3','PC4','PC5','PC6'];
  pts.forEach((p,i)=>{
    s+=`<rect x="${p.x-18}" y="${p.y-11}" width="36" height="22" rx="4" fill="${col}22" stroke="${col}" stroke-width="1.2"/>`;
    s+=`<text x="${p.x}" y="${p.y+4}" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="7">${lbs[i]}</text>`;
  });
  // token arrow
  s+=`<path d="M 130 50 A 75 75 0 0 1 195 97" fill="none" stroke="${col}" stroke-width="1.5" marker-end="url(#arrRing)" opacity=".8"/>`;
  s+=`<defs><marker id="arrRing" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0,6 3,0 6" fill="${col}"/></marker></defs>`;
  s+=`<text x="155" y="62" fill="${col}" font-family="Fira Code" font-size="7" opacity=".7">token →</text>`;
  s+=`<text x="130" y="248" text-anchor="middle" fill="${TXT}" font-family="Fira Code" font-size="7">token circula · 1 transmissor de cada vez</text>`;
  s+=`</svg>`;
  return s;
}

function drawMesh(){
  const col='#95e1d3';
  let s=`<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">`;
  const pts=[
    {x:130,y:25},{x:225,y:80},{x:225,y:175},
    {x:130,y:230},{x:35,y:175},{x:35,y:80},
  ];
  // all connections
  for(let i=0;i<pts.length;i++)
    for(let j=i+1;j<pts.length;j++)
      s+=line(pts[i].x,pts[i].y,pts[j].x,pts[j].y,col);
  const lbs=['R1','R2','R3','R4','R5','R6'];
  pts.forEach((p,i)=>{
    s+=`<circle cx="${p.x}" cy="${p.y}" r="16" fill="${col}22" stroke="${col}" stroke-width="1.8"/>`;
    s+=`<text x="${p.x}" y="${p.y+4}" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="8" font-weight="700">${lbs[i]}</text>`;
  });
  s+=`<text x="130" y="252" text-anchor="middle" fill="${TXT}" font-family="Fira Code" font-size="7">full mesh · 6 nós · 15 ligações · N(N-1)/2</text>`;
  s+=`</svg>`;
  return s;
}

function drawTree(){
  const col='#f38181';
  let s=`<svg viewBox="0 0 260 280" xmlns="http://www.w3.org/2000/svg">`;
  // Root
  s+=`<rect x="90" y="5" width="80" height="28" rx="5" fill="${col}22" stroke="${col}" stroke-width="2"/>`;
  s+=`<text x="130" y="17" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="7" font-weight="700">Core Switch</text>`;
  s+=`<text x="130" y="27" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="6">NÚCLEO</text>`;
  // Dist layer
  const distX=[65,195];
  distX.forEach(x=>{
    s+=line(130,33,x,85,col);
    s+=`<rect x="${x-38}" y="85" width="76" height="24" rx="4" fill="${col}18" stroke="${col}" stroke-width="1.5"/>`;
    s+=`<text x="${x}" y="97" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="7">Dist SW</text>`;
    s+=`<text x="${x}" y="106" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="6">DISTRIBUIÇÃO</text>`;
  });
  // Access layer
  const accGroups=[[35,95],[150,245]];
  distX.forEach((dx,di)=>{
    accGroups[di].forEach(ax=>{
      s+=line(dx,109,ax,155,col,true);
      s+=`<rect x="${ax-32}" y="155" width="64" height="22" rx="3" fill="${col}12" stroke="${col}" stroke-width="1" opacity=".8"/>`;
      s+=`<text x="${ax}" y="170" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="6.5">Access SW</text>`;
      // end devices
      const devX=[ax-20,ax,ax+20];
      devX.forEach(dvx=>{
        s+=line(dvx,177,dvx,210,col,true);
        s+=`<rect x="${dvx-12}" y="210" width="24" height="16" rx="2" fill="${col}10" stroke="${col}" stroke-width=".8" opacity=".7"/>`;
        s+=`<text x="${dvx}" y="222" text-anchor="middle" fill="${col}" font-family="Fira Code" font-size="5.5" opacity=".8">PC</text>`;
      });
    });
  });
  s+=`<text x="5" y="95" fill="${TXT}" font-family="Fira Code" font-size="6" opacity=".6">L3</text>`;
  s+=`<text x="5" y="175" fill="${TXT}" font-family="Fira Code" font-size="6" opacity=".6">L2</text>`;
  s+=`<text x="5" y="222" fill="${TXT}" font-family="Fira Code" font-size="6" opacity=".6">L1/2</text>`;
  s+=`<text x="130" y="270" text-anchor="middle" fill="${TXT}" font-family="Fira Code" font-size="7">3 camadas: núcleo · distribuição · acesso</text>`;
  s+=`</svg>`;
  return s;
}

// ─── RENDER ───────────────────────────────────────────────────────────────
const navEl = document.getElementById('nav-pills');
const cardsEl = document.getElementById('cards-container');

topos.forEach((t,i)=>{
  // pill
  const pill = document.createElement('button');
  pill.className='pill'; pill.textContent=t.label;
  pill.style.setProperty('--pill-col', t.cor);
  pill.addEventListener('click',()=>{
    document.querySelectorAll('.topo-card').forEach(c=>c.classList.remove('open'));
    const card=document.getElementById('card-'+t.id);
    card.classList.add('open');
    setTimeout(()=>card.scrollIntoView({behavior:'smooth',block:'start'}),50);
    document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
    pill.classList.add('active');
  });
  navEl.appendChild(pill);

  // card
  const card=document.createElement('div');
  card.className='topo-card'; card.id='card-'+t.id;
  card.style.setProperty('--tc',t.cor);

  const prosHTML=t.pros.map(p=>`<div class="pc-item pc-pro"><div class="pc-icon"></div><div class="pc-text"><strong>${p.t}:</strong> ${p.d}</div></div>`).join('');
  const consHTML=t.cons.map(p=>`<div class="pc-item pc-con"><div class="pc-icon"></div><div class="pc-text"><strong>${p.t}:</strong> ${p.d}</div></div>`).join('');
  const caresHTML=t.cares.map(p=>`<div class="pc-item pc-care"><div class="pc-icon"></div><div class="pc-text"><strong>${p.t}:</strong> ${p.d}</div></div>`).join('');
  const ucHTML=t.usos.map(u=>`<span class="uc-chip">${u}</span>`).join('');
  const isLight=t.lightNum;

  card.innerHTML=`
    <div class="card-header">
      <div class="card-num${isLight?' lt':''}">${i+1}</div>
      <div class="card-info">
        <div class="card-title">${t.nome}</div>
        <div class="card-sub">${t.sub}</div>
      </div>
      <div class="card-badges">
        <span class="badge custo">Custo: ${t.custoTag}</span>
        <span class="badge fiab">Fiabilidade: ${t.fiabTag}</span>
        <span class="badge exp">Expansão: ${t.expTag}</span>
      </div>
    </div>
    <div class="card-detail">
      <div class="detail-body">
        <div class="diagram-panel">
          ${t.svgFn()}
          <div class="diagram-desc">${t.desc}</div>
          <div class="use-cases">${ucHTML}</div>
        </div>
        <div class="info-panel">
          <div class="tabs">
            <button class="tab-btn active${isLight?' lt':''}" data-tab="pros">✓ Vantagens</button>
            <button class="tab-btn${isLight?' lt':''}" data-tab="cons">✗ Desvantagens</button>
            <button class="tab-btn${isLight?' lt':''}" data-tab="cares">⚠ Cuidados</button>
          </div>
          <div class="tab-panel active" data-panel="pros"><div class="pc-grid">${prosHTML}</div></div>
          <div class="tab-panel" data-panel="cons"><div class="pc-grid">${consHTML}</div></div>
          <div class="tab-panel" data-panel="cares"><div class="pc-grid">${caresHTML}</div></div>
        </div>
      </div>
    </div>
  `;

  card.querySelector('.card-header').addEventListener('click',()=>{
    const wasOpen=card.classList.contains('open');
    document.querySelectorAll('.topo-card').forEach(c=>c.classList.remove('open'));
    document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
    if(!wasOpen){
      card.classList.add('open');
      document.querySelectorAll('.pill')[i].classList.add('active');
    }
  });

  card.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      const pan=btn.dataset.tab;
      card.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      card.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      card.querySelector(`[data-panel="${pan}"]`).classList.add('active');
    });
  });

  cardsEl.appendChild(card);
});

// ─── TABLE ────────────────────────────────────────────────────────────────
const tbody=document.getElementById('compare-tbody');

const starMap=(n)=>{
  const vals={
    'Muito Baixo':1,'Muito Alto':5,'Baixo':2,'Médio':3,'Médio-Alto':3,'Alto':4,'Muito Bom':4,
    'Nenhuma':0,'Por nó':2,'Baixa':1,'Boa':3,'Média':2,'Excelente':5,
    'Muito Difícil':1,'Difícil':1,'Moderada':3,'Fácil':4,'Boa':3,'Muito Fácil':5,
    'Mínima':1,'Média-Alta':3,'Muito Alta':5,'Fraco':1,'Bom':3,'Muito Bom':4,'Excelente':5,
  };
  return vals[n]||0;
};

const costTag=(v)=>{
  const m={'Muito Baixo':'tag-good','Baixo':'tag-good','Médio':'tag-med','Médio-Alto':'tag-med','Alto':'tag-bad','Muito Alto':'tag-bad'};
  return m[v]||'';
};
const fiabTag=(v)=>{
  const m={'Muito Alta':'tag-good','Alta':'tag-good','Boa':'tag-good','Excelente':'tag-good','Média':'tag-med','Baixa':'tag-bad','Nenhuma':'tag-bad','Por nó':'tag-med','Baixa (duplo: Boa)':'tag-med','Média (depende camada)':'tag-med'};
  return m[v]||'tag-med';
};
const expTag2=(v)=>{
  const m={'Muito Fácil':'tag-good','Muito Boa':'tag-good','Boa':'tag-good','Fácil':'tag-good','Moderada':'tag-med','Difícil':'tag-bad','Muito Difícil':'tag-bad'};
  return m[v]||'tag-med';
};
const perfTag=(v)=>{
  const m={'Excelente':'tag-good','Muito Bom':'tag-good','Bom':'tag-good','Fraco':'tag-bad'};
  return m[v]||'tag-med';
};

topos.forEach(t=>{
  const r=t.tableRow;
  const tr=document.createElement('tr');
  tr.innerHTML=`
    <td><span style="color:${t.cor};font-family:Unbounded,sans-serif;font-size:.7rem;font-weight:700">${t.nome.split('(')[0].trim()}</span></td>
    <td><span class="tag-cell ${costTag(r[0])}">${r[0]}</span></td>
    <td><span class="tag-cell ${costTag(r[1])}">${r[1]}</span></td>
    <td><span class="tag-cell ${fiabTag(r[2])}">${r[2]}</span></td>
    <td><span class="tag-cell ${fiabTag(r[3])}">${r[3]}</span></td>
    <td><span class="tag-cell ${expTag2(r[4])}">${r[4]}</span></td>
    <td><span class="tag-cell ${perfTag(r[5])}">${r[5]}</span></td>
    <td><span class="tag-cell tag-med">${r[6]||'Média'}</span></td>
    <td style="font-size:.68rem;color:#5050a0;text-align:left">${r[7]}</td>
  `;
  tbody.appendChild(tr);
});
