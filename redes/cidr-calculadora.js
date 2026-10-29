// Calculadora CIDR (IPv4) — toda a aritmética em inteiros de 32 bits sem sinal (>>> 0).

const PRESETS = ['192.168.1.10/24', '10.0.0.0/22', '172.16.5.9/20', '203.0.113.77/28', '10.1.1.1/30', '8.8.8.8/32'];
const PREFIX_TABLE = [8, 16, 20, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32];

/** Converte "a.b.c.d" em inteiro de 32 bits, ou null se inválido. */
function parseIp(str) {
  const parts = str.split('.');
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const v = Number(p);
    if (v > 255) return null;
    n = ((n << 8) | v) >>> 0;
  }
  return n;
}

function toIp(n) {
  return [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
}

function maskFromPrefix(p) {
  return p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0;
}

function fmt(n) {
  return n.toLocaleString('pt-PT');
}

/** Devolve {ip, prefix} ou lança Error com mensagem para o utilizador. */
function parseCidr(raw) {
  const m = raw.trim().match(/^([\d.]+)\/(\d{1,2})$/);
  if (!m) throw new Error('Formato inválido. Usa endereço/prefixo, por exemplo 192.168.1.10/24.');
  const ip = parseIp(m[1]);
  if (ip === null) throw new Error('Endereço IPv4 inválido: cada octeto tem de estar entre 0 e 255.');
  const prefix = Number(m[2]);
  if (prefix > 32) throw new Error('Prefixo inválido: tem de estar entre 0 e 32.');
  return { ip, prefix };
}

function classify(ip) {
  const a = ip >>> 24, b = (ip >>> 16) & 255;
  let cls = 'E (reservado)';
  if (a < 128) cls = 'A';
  else if (a < 192) cls = 'B';
  else if (a < 224) cls = 'C';
  else if (a < 240) cls = 'D (multicast)';

  let scope = 'Público';
  if (a === 10) scope = 'Privado (RFC 1918)';
  else if (a === 172 && b >= 16 && b <= 31) scope = 'Privado (RFC 1918)';
  else if (a === 192 && b === 168) scope = 'Privado (RFC 1918)';
  else if (a === 127) scope = 'Loopback';
  else if (a === 169 && b === 254) scope = 'Link-local (APIPA)';
  else if (a >= 224 && a < 240) scope = 'Multicast';
  else if (a >= 240) scope = 'Reservado';
  return { cls, scope };
}

function compute({ ip, prefix }) {
  const mask = maskFromPrefix(prefix);
  const wildcard = (~mask) >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const total = 2 ** (32 - prefix);

  // /32 = 1 host; /31 = 2 hosts ponto-a-ponto (RFC 3021); restantes perdem rede e broadcast
  let usable, first, last;
  if (prefix === 32) { usable = 1; first = last = network; }
  else if (prefix === 31) { usable = 2; first = network; last = broadcast; }
  else { usable = total - 2; first = network + 1; last = broadcast - 1; }

  return { ip, prefix, mask, wildcard, network, broadcast, total, usable, first, last };
}

/** Octetos em binário; os primeiros `prefix` bits recebem a classe bit-net. */
function binaryRow(n, prefix) {
  const row = document.createElement('span');
  row.className = 'bits-val';
  for (let i = 0; i < 32; i++) {
    if (i > 0 && i % 8 === 0) {
      const dot = document.createElement('span');
      dot.className = 'bit-dot';
      dot.textContent = '.';
      row.appendChild(dot);
    }
    const bit = document.createElement('span');
    bit.className = i < prefix ? 'bit-net' : 'bit-host';
    bit.textContent = (n >>> (31 - i)) & 1;
    row.appendChild(bit);
  }
  return row;
}

function item(label, value, highlight) {
  const div = document.createElement('div');
  div.className = 'cr-item';
  const l = document.createElement('div');
  l.className = 'cr-label';
  l.textContent = label;
  const v = document.createElement('div');
  v.className = 'cr-val' + (highlight ? ' highlight' : '');
  v.textContent = value;
  div.append(l, v);
  return div;
}

function render(r) {
  const { cls, scope } = classify(r.ip);
  const grid = document.getElementById('cr-grid');
  grid.replaceChildren(
    item('Endereço de rede', `${toIp(r.network)}/${r.prefix}`, true),
    item('Máscara de sub-rede', toIp(r.mask)),
    item('Wildcard', toIp(r.wildcard)),
    item('Broadcast', r.prefix >= 31 ? 'n/a' : toIp(r.broadcast)),
    item('Primeiro host', toIp(r.first)),
    item('Último host', toIp(r.last)),
    item('Total de endereços', fmt(r.total)),
    item('Hosts utilizáveis', fmt(r.usable), true),
    item('Classe (histórica)', cls),
    item('Âmbito', scope),
  );

  const bits = document.getElementById('bits-table');
  bits.replaceChildren();
  [['Endereço', r.ip], ['Máscara', r.mask], ['Rede', r.network]].forEach(([name, n]) => {
    const row = document.createElement('div');
    row.className = 'bits-row';
    const label = document.createElement('span');
    label.className = 'bits-name';
    label.textContent = name;
    row.append(label, binaryRow(n, r.prefix));
    bits.appendChild(row);
  });

  document.getElementById('calc-result').classList.add('show');
  highlightPrefix(r.prefix);
}

function highlightPrefix(prefix) {
  document.querySelectorAll('#prefix-body tr').forEach(tr => {
    tr.classList.toggle('active', Number(tr.dataset.prefix) === prefix);
  });
}

function showError(msg) {
  const el = document.getElementById('calc-error');
  el.textContent = msg;
  el.style.display = msg ? 'block' : 'none';
}

function calculate() {
  const raw = document.getElementById('cidr-input').value;
  try {
    const result = compute(parseCidr(raw));
    showError('');
    render(result);
  } catch (e) {
    showError(e.message);
    document.getElementById('calc-result').classList.remove('show');
    highlightPrefix(-1);
  }
}

function buildPresets() {
  const wrap = document.getElementById('presets');
  PRESETS.forEach(p => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'preset';
    b.textContent = p;
    b.addEventListener('click', () => {
      document.getElementById('cidr-input').value = p;
      calculate();
    });
    wrap.appendChild(b);
  });
}

function buildPrefixTable() {
  const body = document.getElementById('prefix-body');
  PREFIX_TABLE.forEach(p => {
    const total = 2 ** (32 - p);
    const usable = p === 32 ? 1 : p === 31 ? 2 : total - 2;
    const tr = document.createElement('tr');
    tr.dataset.prefix = p;
    [`/${p}`, toIp(maskFromPrefix(p)), fmt(total), fmt(usable)].forEach(t => {
      const td = document.createElement('td');
      td.textContent = t;
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
}

document.getElementById('cidr-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') calculate();
});
document.getElementById('calc-btn').addEventListener('click', calculate);

buildPresets();
buildPrefixTable();
