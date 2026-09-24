// Lista de comandos, ordenados por nível
const commands = [
  // NÍVEL 1 — Básico
  { id: "c1",  level: 1, title: "Scan básico",                     cmd: "nmap scanme.nmap.org",                                     desc: "Scan padrão às 1000 portas TCP mais comuns. O primeiro comando de qualquer teste." },
  { id: "c2",  level: 1, title: "Portas específicas",              cmd: "nmap -p 22,80,443 scanme.nmap.org",                         desc: "Testa apenas SSH, HTTP e HTTPS. Ideal para verificar serviços concretos." },
  { id: "c3",  level: 1, title: "Sem resolução DNS",               cmd: "nmap -n scanme.nmap.org",                                   desc: "Desativa a resolução DNS — mais rápido, especialmente em redes lentas." },
  { id: "c4",  level: 1, title: "Apenas portas abertas",           cmd: "nmap --open scanme.nmap.org",                               desc: "Mostra apenas as portas em estado open. Reduz o ruído do output." },
  { id: "c5",  level: 1, title: "Scan verboso",                    cmd: "nmap -v scanme.nmap.org",                                   desc: "Mostra o progresso detalhado do scan em tempo real." },

  // NÍVEL 2 — Deteção
  { id: "c6",  level: 2, title: "Deteção de versões",              cmd: "nmap -sV scanme.nmap.org",                                  desc: "Identifica nome e versão dos serviços em execução nas portas abertas." },
  { id: "c7",  level: 2, title: "Deteção de sistema operativo",    cmd: "nmap -O scanme.nmap.org",                                   desc: "Tenta identificar o sistema operativo do alvo por TCP/IP fingerprinting." },
  { id: "c8",  level: 2, title: "Versões + scripts default",       cmd: "nmap -sV -sC scanme.nmap.org",                              desc: "Combina deteção de versões com os scripts NSE da categoria 'default'." },
  { id: "c9",  level: 2, title: "Scan de top 100 portas UDP",      cmd: "nmap -sU --top-ports 100 scanme.nmap.org",                  desc: "Escaneia as 100 portas UDP mais comuns. Mais lento que TCP, mas revela serviços DNS, SNMP, etc." },
  { id: "c10", level: 2, title: "Guardar output em ficheiro",      cmd: "nmap -oN scan-result.txt scanme.nmap.org",                  desc: "Guardar o resultado em formato normal (texto) para análise posterior." },

  // NÍVEL 3 — Avançado
  { id: "c11", level: 3, title: "Scan agressivo (rápido)",         cmd: "nmap -A -T4 scanme.nmap.org",                               desc: "Combina deteção de SO, versões, scripts NSE e traceroute com timing agressivo. Mais pesado no servidor." },
  { id: "c12", level: 3, title: "Timing mais rápido",              cmd: "nmap -T4 scanme.nmap.org",                                  desc: "Acelera o scan. Útil em redes rápidas. Valores: -T0 (paranoid) a -T5 (insane)." },
  { id: "c13", level: 3, title: "Scan com traceroute",             cmd: "nmap --traceroute scanme.nmap.org",                         desc: "Mostra os hops de rede até ao alvo. Útil para mapear infraestrutura." },
  { id: "c14", level: 3, title: "Scan completo 1-1000 (SYN)",      cmd: "sudo nmap -sS -p 1-1000 scanme.nmap.org",                   desc: "TCP SYN scan (stealth) nas primeiras 1000 portas. Mais discreto que o scan TCP connect." },
  { id: "c15", level: 3, title: "Scan com scripts de info",        cmd: "nmap --script=default,safe scanme.nmap.org",                desc: "Executa scripts NSE das categorias 'default' e 'safe' — recolha de informação sem risco para o alvo." },

  // NÍVEL 4 — Pesado
  { id: "c16", level: 4, title: "Todas as 65535 portas",           cmd: "nmap -p- -T4 scanme.nmap.org",                              desc: "Escaneia o intervalo completo de portas TCP. Demora bastante. Usa no máximo 1x por dia." },
  { id: "c17", level: 4, title: "Versões em todas as portas",      cmd: "nmap -p- -sV -T4 scanme.nmap.org",                          desc: "Combina scan de todas as portas com deteção de versões. Muito pesado — usa com moderação." },
  { id: "c18", level: 4, title: "Scan UDP (top 1000)",             cmd: "sudo nmap -sU scanme.nmap.org",                             desc: "Escaneia as 1000 portas UDP mais comuns. Pode demorar mais de 20 minutos. O servidor pede moderação." }
];

// ---------- Estado (localStorage) ----------
const STORAGE_KEY = "nmap-playground-state";

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { date: today(), count: 0, done: [] };
  const state = JSON.parse(raw);
  if (state.date !== today()) {
    // Novo dia — reset do contador, mantém progresso de comandos testados
    return { date: today(), count: 0, done: state.done || [] };
  }
  return state;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ---------- Elementos ----------
const grid = document.getElementById("grid");
const search = document.getElementById("search");
const levelFilter = document.getElementById("levelFilter");
const doneFilter = document.getElementById("doneFilter");
const counterValue = document.getElementById("counterValue");
const progressFill = document.getElementById("progressFill");
const resetBtn = document.getElementById("resetBtn");
const themeBtn = document.getElementById("themeBtn");
const printBtn = document.getElementById("printBtn");

// ---------- Tema ----------
const savedTheme = localStorage.getItem("nmap-playground-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("nmap-playground-theme", next);
  themeBtn.textContent = next === "dark" ? "🌙" : "☀️";
});

// ---------- Imprimir ----------
printBtn.addEventListener("click", () => window.print());

// ---------- Contador ----------
function updateCounter() {
  const pct = Math.min((state.count / 15) * 100, 100);
  counterValue.innerHTML = `${state.count}<span class="counter-max"> / 15</span>`;
  progressFill.style.width = pct + "%";

  counterValue.classList.remove("warn", "danger");
  progressFill.classList.remove("warn", "danger");

  if (state.count >= 15) {
    counterValue.classList.add("danger");
    progressFill.classList.add("danger");
  } else if (state.count >= 10) {
    counterValue.classList.add("warn");
    progressFill.classList.add("warn");
  }

  // Bloquear comandos se atingiu o limite
  const atLimit = state.count >= 15;
  grid.querySelectorAll(".command-card").forEach(card => {
    if (atLimit) card.classList.add("disabled");
    else card.classList.remove("disabled");
  });
}

resetBtn.addEventListener("click", () => {
  if (confirm("Reiniciar o contador de scans diários? Usa apenas se for um novo dia ou se te enganaste.")) {
    state.count = 0;
    state.date = today();
    saveState();
    updateCounter();
  }
});

// ---------- Render ----------
function render() {
  const q = search.value.toLowerCase().trim();
  const lv = levelFilter.value;
  const dn = doneFilter.value;

  const filtered = commands.filter(c => {
    const matchQ = !q || c.title.toLowerCase().includes(q) ||
                   c.cmd.toLowerCase().includes(q) ||
                   c.desc.toLowerCase().includes(q);
    const matchLv = !lv || c.level === parseInt(lv);
    const isDone = state.done.includes(c.id);
    const matchDn = !dn || (dn === "done" ? isDone : !isDone);
    return matchQ && matchLv && matchDn;
  });

  grid.innerHTML = filtered.map(c => {
    const isDone = state.done.includes(c.id);
    return `
    <div class="command-card" data-id="${c.id}">
      <span class="level-tag level-${c.level}">Nível ${c.level}</span>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="code" data-cmd="${c.cmd.replace(/"/g, '&quot;')}" title="Clique para copiar">${c.cmd}</div>
      <div class="command-actions">
        <button class="btn-mark ${isDone ? 'done' : ''}" data-id="${c.id}">
          ${isDone ? '✓ Testado' : 'Marcar como testado'}
        </button>
      </div>
    </div>`;
  }).join("");

  updateCounter();

  // Copiar comandos
  grid.querySelectorAll(".code").forEach(el => {
    el.addEventListener("click", () => {
      navigator.clipboard.writeText(el.dataset.cmd).then(() => {
        el.classList.add("copied");
        setTimeout(() => el.classList.remove("copied"), 1200);
      });
      // Incrementa o contador ao copiar (assume que o utilizador vai executar)
      if (state.count < 15) {
        state.count++;
        saveState();
        updateCounter();
      }
    });
  });

  // Marcar como testado
  grid.querySelectorAll(".btn-mark").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (state.done.includes(id)) {
        state.done = state.done.filter(x => x !== id);
      } else {
        state.done.push(id);
      }
      saveState();
      render();
    });
  });
}

// ---------- Eventos ----------
search.addEventListener("input", render);
levelFilter.addEventListener("change", render);
doneFilter.addEventListener("change", render);

render();
