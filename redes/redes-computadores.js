/* ===== Mobile menu ===== */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
});
document.querySelectorAll('.nav-item').forEach(a => {
  a.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
});

/* ===== Active nav on scroll ===== */
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(n => n.classList.remove('active'));
      const id = e.target.id;
      const link = document.querySelector(`.nav-item[href="#${id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-20% 0px -60% 0px' });
sections.forEach(s => observer.observe(s));

/* ===== Glossary filter ===== */
function filterGlossary(inputId, gridId) {
  const q = document.getElementById(inputId).value.toLowerCase().trim();
  document.querySelectorAll(`#${gridId} .term`).forEach(t => {
    const text = (t.dataset.term || '') + ' ' + t.textContent;
    t.style.display = text.toLowerCase().includes(q) ? '' : 'none';
  });
}
document.getElementById('searchAula01').addEventListener('input', () => filterGlossary('searchAula01', 'glossAula01'));
document.getElementById('searchProto').addEventListener('input', () => filterGlossary('searchProto', 'glossProto'));

/* ===== Binary converter ===== */
const WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];

function renderBitWeights(bits) {
  const row = document.getElementById('bitWeights');
  row.innerHTML = WEIGHTS.map((w, i) => `
    <div class="bit">
      <div class="weight">${w}</div>
      <input type="text" maxlength="1" value="${bits[i]}" data-i="${i}"
        style="color:${bits[i]==='1' ? 'var(--accent)' : 'var(--text-muted)'}">
    </div>`).join('');
  row.querySelectorAll('input[data-i]').forEach(inp => {
    inp.addEventListener('input', () => bitChanged(inp));
  });
}

function bitChanged(el) {
  let v = el.value.replace(/[^01]/g, '');
  if (v.length > 1) v = v.slice(-1);
  el.value = v || '0';
  el.style.color = el.value === '1' ? 'var(--accent)' : 'var(--text-muted)';
  const bits = [...document.querySelectorAll('#bitWeights input')].map(i => i.value || '0');
  const bin = bits.join('');
  const dec = parseInt(bin, 2);
  document.getElementById('binIn').value = bin;
  document.getElementById('decIn').value = dec;
  showConv(dec, bin, true);
}

function decToBin() {
  let d = parseInt(document.getElementById('decIn').value, 10);
  if (isNaN(d) || d < 0) d = 0;
  if (d > 255) d = 255;
  document.getElementById('decIn').value = d;
  const bin = d.toString(2).padStart(8, '0');
  document.getElementById('binIn').value = bin;
  renderBitWeights(bin.split(''));
  showConv(d, bin, true);
}

function binToDec() {
  let b = document.getElementById('binIn').value.replace(/[^01]/g, '').slice(0, 8);
  document.getElementById('binIn').value = b;
  b = b.padStart(8, '0');
  const d = parseInt(b, 2) || 0;
  document.getElementById('decIn').value = d;
  renderBitWeights(b.split(''));
  showConv(d, b, false);
}

function showConv(dec, bin, fromDec) {
  document.getElementById('convResult').innerHTML =
    `<span class="highlight">${dec}</span> = <span class="highlight">${bin}</span>`;
  let steps = '';
  if (fromDec) {
    let rem = dec;
    const parts = [];
    WEIGHTS.forEach(w => {
      if (rem >= w) { parts.push(`1×${w}`); rem -= w; }
      else parts.push(`0×${w}`);
    });
    steps = parts.join(' + ') + ` = <strong>${dec}</strong>`;
  } else {
    const parts = bin.split('').map((b, i) => b === '1' ? WEIGHTS[i] : null).filter(Boolean);
    steps = parts.length ? parts.join(' + ') + ` = <strong>${dec}</strong>` : '0';
  }
  document.getElementById('convSteps').innerHTML = steps;
}

document.getElementById('decIn').addEventListener('input', decToBin);
document.getElementById('binIn').addEventListener('input', binToDec);

/* init converter */
renderBitWeights('11000000'.split(''));
showConv(192, '11000000', true);

/* ===== AND calculator ===== */
function toBin8(n) {
  return (n & 255).toString(2).padStart(8, '0');
}

function calcAnd() {
  let a = parseInt(document.getElementById('andA').value, 10) || 0;
  let b = parseInt(document.getElementById('andB').value, 10) || 0;
  a = Math.max(0, Math.min(255, a));
  b = Math.max(0, Math.min(255, b));
  const res = a & b;
  const ba = toBin8(a), bb = toBin8(b), br = toBin8(res);
  document.getElementById('andResult').innerHTML =
    `<span class="highlight">${a}</span> AND <span class="highlight">${b}</span> = <span class="highlight">${res}</span>`;
  document.getElementById('andSteps').innerHTML = `
    <div style="font-family:var(--mono); line-height:1.8">
      A: ${ba}<br>
      B: ${bb}<br>
      &nbsp;&nbsp; --------<br>
      R: <strong style="color:var(--accent)">${br}</strong> = ${res}
    </div>`;
}
document.getElementById('andA').addEventListener('input', calcAnd);
document.getElementById('andB').addEventListener('input', calcAnd);
calcAnd();

/* ===== Subnetting calculator ===== */
function calcSubnet() {
  const baseStr = document.getElementById('subBase').value.trim();
  const parts = baseStr.split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
    document.getElementById('subInfo').textContent = 'IP inválido. Use formato x.x.x.0';
    document.getElementById('subTable').innerHTML = '';
    return;
  }
  const count = parseInt(document.getElementById('subCount').value, 10);
  const bits = Math.log2(count);
  if (!Number.isInteger(bits)) {
    document.getElementById('subInfo').textContent = 'Número de subnets deve ser potência de 2.';
    return;
  }
  const hostBits = 8 - bits;
  const salto = Math.pow(2, hostBits);
  const maskLast = 256 - salto;
  const cidr = 24 + bits;
  const base = parts[0] + '.' + parts[1] + '.' + parts[2] + '.';

  document.getElementById('subInfo').innerHTML =
    `Máscara: <span class="highlight">255.255.255.${maskLast}</span> (/${cidr}) · ` +
    `Salto: <span class="highlight">${salto}</span> · ` +
    `Hosts/subnet: <span class="highlight">${salto - 2}</span>`;

  let rows = '';
  for (let i = 0; i < count; i++) {
    const net = i * salto;
    const first = net + 1;
    const last = net + salto - 2;
    const bcast = net + salto - 1;
    rows += `<tr>
      <td>${i}</td>
      <td class="mono">${base}${net}</td>
      <td class="mono">${base}${first}</td>
      <td class="mono">${base}${last}</td>
      <td class="mono">${base}${bcast}</td>
    </tr>`;
  }
  document.getElementById('subTable').innerHTML = `
    <table>
      <thead><tr><th>#</th><th>Network ID</th><th>1º host</th><th>Último host</th><th>Broadcast</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}
document.getElementById('subCount').addEventListener('change', calcSubnet);
document.getElementById('btnCalcSubnet').addEventListener('click', calcSubnet);
calcSubnet();
