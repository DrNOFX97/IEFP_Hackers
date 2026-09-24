const classes = [
  {
    letra: "A", cor: "var(--ca)", lightText: false,
    titulo: "Classe A — Redes Muito Grandes",
    intervalo: "0.0.0.0 – 127.255.255.255",
    primeiroBit: "0xxxxxxx (0–127)",
    mascara: "255.0.0.0 (/8)",
    redes: "128 (2⁷) — usáveis: 126",
    hosts: "16 777 214 (2²⁴ − 2) por rede",
    totalEnderecos: "2 147 483 648 (50% do espaço IPv4)",
    descricao: "A classe A foi concebida para um número muito reduzido de organizações com redes enormes. O primeiro octeto identifica a rede (com o bit mais significativo fixo a 0) e os três octetos restantes identificam os anfitriões. Historicamente atribuída a grandes empresas e governos.",
    privados: ["10.0.0.0/8"],
    especiais: [
      { addr:"0.0.0.0", desc:"Rota por defeito / endereço não especificado" },
      { addr:"10.0.0.0/8", desc:"Rede privada (RFC 1918)" },
      { addr:"127.0.0.1", desc:"Loopback — localhost" },
      { addr:"127.0.0.0/8", desc:"Toda a gama 127.x.x.x é reservada para loopback" },
    ],
    bits: [
      { label:"0 + Rede", bits:"8 bits", pct:25, tipo:"bd-net" },
      { label:"Anfitrião", bits:"24 bits", pct:75, tipo:"bd-host" },
    ],
    usos: ["ISPs de grande dimensão","Grandes multinacionais","Entidades governamentais","Antigos blocos ARPANET"],
  },
  {
    letra: "B", cor: "var(--cb)", lightText: false,
    titulo: "Classe B — Redes Médias",
    intervalo: "128.0.0.0 – 191.255.255.255",
    primeiroBit: "10xxxxxx (128–191)",
    mascara: "255.255.0.0 (/16)",
    redes: "16 384 (2¹⁴)",
    hosts: "65 534 (2¹⁶ − 2) por rede",
    totalEnderecos: "1 073 741 824 (25% do espaço IPv4)",
    descricao: "A classe B destina-se a organizações de dimensão média. Os dois primeiros octetos identificam a rede (com os dois bits mais significativos fixos a '10') e os dois octetos restantes identificam os anfitriões. Equilibra o número de redes com o número de anfitriões por rede.",
    privados: ["172.16.0.0/12","172.16.0.0–172.31.255.255"],
    especiais: [
      { addr:"128.0.0.0", desc:"Primeiro endereço de Classe B" },
      { addr:"169.254.0.0/16", desc:"APIPA — link-local (auto-configuração)" },
      { addr:"172.16.0.0/12", desc:"Rede privada (RFC 1918)" },
    ],
    bits: [
      { label:"10 + Rede", bits:"16 bits", pct:50, tipo:"bd-net" },
      { label:"Anfitrião", bits:"16 bits", pct:50, tipo:"bd-host" },
    ],
    usos: ["Universidades","Médias e grandes empresas","Operadores regionais","Organismos públicos"],
  },
  {
    letra: "C", cor: "var(--cc)", lightText: true,
    titulo: "Classe C — Redes Pequenas",
    intervalo: "192.0.0.0 – 223.255.255.255",
    primeiroBit: "110xxxxx (192–223)",
    mascara: "255.255.255.0 (/24)",
    redes: "2 097 152 (2²¹)",
    hosts: "254 (2⁸ − 2) por rede",
    totalEnderecos: "536 870 912 (12,5% do espaço IPv4)",
    descricao: "A classe C é a mais comum para redes de pequena dimensão. Os três primeiros octetos identificam a rede (bits iniciais '110') e apenas o último octeto identifica anfitriões, permitindo no máximo 254 anfitriões por rede. É a base das redes domésticas modernas.",
    privados: ["192.168.0.0/16","192.168.0.0–192.168.255.255"],
    especiais: [
      { addr:"192.168.0.0/16", desc:"Rede privada mais comum (RFC 1918)" },
      { addr:"192.0.2.0/24", desc:"TEST-NET — documentação e exemplos" },
      { addr:"198.51.100.0/24", desc:"TEST-NET-2 — documentação" },
      { addr:"203.0.113.0/24", desc:"TEST-NET-3 — documentação" },
    ],
    bits: [
      { label:"110 + Rede", bits:"24 bits", pct:75, tipo:"bd-net" },
      { label:"Anfitrião", bits:"8 bits", pct:25, tipo:"bd-host" },
    ],
    usos: ["Redes domésticas","Pequenas empresas","Roteadores SOHO","A maioria das redes Wi-Fi"],
  },
  {
    letra: "D", cor: "var(--cd)", lightText: false,
    titulo: "Classe D — Multicast",
    intervalo: "224.0.0.0 – 239.255.255.255",
    primeiroBit: "1110xxxx (224–239)",
    mascara: "N/A — não tem máscara de rede",
    redes: "N/A",
    hosts: "N/A — não é unicast",
    totalEnderecos: "268 435 456 (6,25% do espaço IPv4)",
    descricao: "A classe D não é usada para endereçamento unicast convencional. Reservada exclusivamente para comunicações multicast — envio de um pacote para um grupo de receptores subscritos. Um emissor envia uma única cópia; os routers replicam apenas onde necessário. Base do IPTV, videoconferência e routing dinâmico.",
    privados: [],
    especiais: [
      { addr:"224.0.0.1", desc:"Todos os anfitriões na rede local" },
      { addr:"224.0.0.2", desc:"Todos os routers na rede local" },
      { addr:"224.0.0.5", desc:"Todos os routers OSPF" },
      { addr:"224.0.0.9", desc:"Todos os routers RIPv2" },
      { addr:"239.0.0.0/8", desc:"Multicast de âmbito administrativo (privado)" },
    ],
    bits: [
      { label:"1110 + Grupo Multicast", bits:"28 bits", pct:100, tipo:"bd-mcast" },
    ],
    usos: ["IPTV e streaming de vídeo","Videoconferência (H.323)","Protocolos de routing (OSPF, RIPv2, EIGRP)","Descoberta de serviços (mDNS, UPnP)"],
  },
  {
    letra: "E", cor: "var(--ce)", lightText: true,
    titulo: "Classe E — Reservado / Experimental",
    intervalo: "240.0.0.0 – 255.255.255.255",
    primeiroBit: "1111xxxx (240–255)",
    mascara: "N/A — reservado",
    redes: "N/A",
    hosts: "N/A",
    totalEnderecos: "268 435 456 (6,25% do espaço IPv4)",
    descricao: "A classe E está completamente reservada para uso experimental e investigação pela IANA. Nenhum endereço desta gama é roteável na Internet pública. O endereço 255.255.255.255 é o endereço de broadcast limitado, usado para enviar mensagens a todos os anfitriões da rede local sem conhecer o endereço de rede.",
    privados: [],
    especiais: [
      { addr:"255.255.255.255", desc:"Broadcast limitado — todos os anfitriões na rede local" },
      { addr:"240.0.0.0/4", desc:"Reservado para uso experimental (IANA)" },
    ],
    bits: [
      { label:"1111 + Reservado", bits:"28 bits", pct:100, tipo:"bd-res" },
    ],
    usos: ["Investigação e experimentação","Testes internos de protocolos","255.255.255.255 — broadcast limitado","Não utilizável em produção"],
  },
];

// Render classes
const grid = document.getElementById('classes-grid');
classes.forEach(c => {
  const card = document.createElement('div');
  card.className = 'class-card';
  card.style.setProperty('--class-color', c.cor);

  const bitsHTML = c.bits.map(b =>
    `<div class="bd-seg ${b.tipo}" style="width:${b.pct}%">
       <span class="bd-label">${b.label}</span>
       <span class="bd-bits">${b.bits}</span>
     </div>`
  ).join('');

  const espHTML = c.especiais.map(e =>
    `<div class="special-row">
       <span class="sr-addr">${e.addr}</span>
       <span class="sr-desc">${e.desc}</span>
     </div>`
  ).join('');

  const privHTML = c.privados.length
    ? c.privados.map(p=>`<span class="priv-chip">${p}</span>`).join('')
    : '<span style="font-size:.75rem;color:var(--mut)">Nenhum</span>';

  const usosHTML = c.usos.map(u=>`<li>${u}</li>`).join('');

  card.innerHTML = `
    <div class="class-header">
      <div class="class-letter${c.lightText?' light':''}">${c.letra}</div>
      <div class="class-info">
        <div class="class-title">${c.titulo}</div>
        <div class="class-range">
          <span>Intervalo:</span>
          <span class="range-val">${c.intervalo}</span>
        </div>
        <div class="class-range" style="margin-top:.2rem">
          <span>Bits iniciais:</span>
          <span class="range-val" style="color:var(--class-color)">${c.primeiroBit}</span>
        </div>
      </div>
      <div class="class-stats">
        <span class="stat-chip">Máscara: <span class="sv">${c.mascara}</span></span>
        <span class="stat-chip">Redes: <span class="sv">${c.redes}</span></span>
        <span class="stat-chip">Hosts/rede: <span class="sv">${c.hosts}</span></span>
      </div>
    </div>
    <div class="class-detail">
      <div class="detail-body">
        <div class="bit-diagram">${bitsHTML}</div>
        <p style="font-size:.8rem;color:#9090a8;line-height:1.65;margin-bottom:1rem;">${c.descricao}</p>
        <div class="detail-grid">
          <div class="ds">
            <h4>Endereços Especiais</h4>
            <div class="special-box" style="background:var(--s2)">${espHTML || '<p>Nenhum especificado.</p>'}</div>
          </div>
          <div class="ds">
            <h4>Gama Privada (RFC 1918)</h4>
            <div class="privados-list">${privHTML}</div>
            <h4 style="margin-top:1rem">Usos Típicos</h4>
            <ul>${usosHTML}</ul>
          </div>
        </div>
      </div>
    </div>
  `;

  card.addEventListener('click', e => {
    if(e.target.closest('.special-box')) return;
    card.classList.toggle('open');
  });

  grid.appendChild(card);
});

// Calculadora
function calcClass(){
  const raw = document.getElementById('ip-input').value.trim();
  const err = document.getElementById('calc-error');
  const res = document.getElementById('calc-result');
  err.style.display='none'; res.classList.remove('show');

  const parts = raw.split('.');
  if(parts.length!==4 || parts.some(p=>isNaN(p)||p===''||+p<0||+p>255)){
    err.textContent = '⚠ Endereço inválido. Formato esperado: A.B.C.D (ex: 192.168.1.1)';
    err.style.display='block'; return;
  }

  const octets = parts.map(Number);
  const first = octets[0];
  let cls, cor, mascara, rede, hostsMax, tipo, privado='Não';

  if(first>=0 && first<=127){
    cls='A'; cor='var(--ca)'; mascara='255.0.0.0 (/8)';
    rede=`${octets[0]}.0.0.0`; hostsMax='16 777 214'; tipo='Unicast';
    if(first===10) privado='Sim (10.0.0.0/8)';
    if(first===127) tipo='Loopback (reservado)';
  } else if(first>=128 && first<=191){
    cls='B'; cor='var(--cb)'; mascara='255.255.0.0 (/16)';
    rede=`${octets[0]}.${octets[1]}.0.0`; hostsMax='65 534'; tipo='Unicast';
    if(first===169 && octets[1]===254) tipo='APIPA / Link-local';
    if(first>=172 && first<=172 && octets[1]>=16 && octets[1]<=31) privado='Sim (172.16.0.0/12)';
  } else if(first>=192 && first<=223){
    cls='C'; cor='var(--cc)'; mascara='255.255.255.0 (/24)';
    rede=`${octets[0]}.${octets[1]}.${octets[2]}.0`; hostsMax='254'; tipo='Unicast';
    if(first===192 && octets[1]===168) privado='Sim (192.168.0.0/16)';
  } else if(first>=224 && first<=239){
    cls='D'; cor='var(--cd)'; mascara='N/A'; rede='N/A'; hostsMax='N/A'; tipo='Multicast';
  } else {
    cls='E'; cor='var(--ce)'; mascara='N/A'; rede='N/A'; hostsMax='N/A'; tipo='Experimental / Reservado';
    if(first===255) tipo='Broadcast limitado (255.255.255.255)';
  }

  // binary
  const bin = octets.map(o=>o.toString(2).padStart(8,'0')).join('.');

  const items = [
    { label:'Endereço', val:raw },
    { label:'Classe', val:`Classe ${cls}`, hi:true, color:cor },
    { label:'Tipo', val:tipo },
    { label:'Máscara Padrão', val:mascara },
    { label:'Endereço de Rede', val:rede },
    { label:'Anfitriões Máx.', val:hostsMax },
    { label:'Endereço Privado', val:privado },
    { label:'Binário', val:bin },
  ];

  document.getElementById('cr-grid').innerHTML = items.map(i=>
    `<div class="cr-item">
       <div class="cr-label">${i.label}</div>
       <div class="cr-val${i.hi?' highlight':''}"${i.color?` style="color:${i.color}"`:''}>${i.val}</div>
     </div>`
  ).join('');

  res.classList.add('show');
}

document.getElementById('ip-input').addEventListener('keydown', e => {
  if(e.key==='Enter') calcClass();
});

document.getElementById('calc-btn').addEventListener('click', calcClass);
