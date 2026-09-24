const tools = [
  { n: 1,  name: "Nmap",                 cat: "Rede",              desc: "Mapeamento de rede, descoberta de hosts, escaneamento de portas e deteção de sistema operativo.", cmd: "nmap -sV -p- 192.168.1.1", url: "https://nmap.org/", guide: "nmap.html" },
  { n: 2,  name: "Metasploit Framework", cat: "Exploração",        desc: "Framework de exploração com milhares de módulos e payloads para comprometer sistemas.", cmd: "msfconsole -q", url: "https://www.metasploit.com/", guide: "metasploit.html" },
  { n: 3,  name: "Burp Suite",           cat: "Web",               desc: "Proxy de interceção para testar aplicações web, inspecionar e modificar tráfego HTTP/HTTPS.", cmd: "burpsuite", url: "https://portswigger.net/burp", guide: "burp.html" },
  { n: 4,  name: "Wireshark",            cat: "Rede",              desc: "Analisador de pacotes que captura e inspeciona tráfego de rede em tempo real.", cmd: "wireshark -i eth0", url: "https://www.wireshark.org/", guide: "wireshark.html" },
  { n: 5,  name: "SQLMap",               cat: "Web",               desc: "Automatiza a deteção e exploração de injeções SQL em aplicações web.", cmd: "sqlmap -u 'http://alvo/?id=1' --dbs", url: "https://sqlmap.org/", guide: "sqlmap.html" },
  { n: 6,  name: "Hashcat",              cat: "Password Cracking", desc: "Cracking de hashes acelerado por GPU, com suporte a mais de 300 algoritmos.", cmd: "hashcat -m 1000 hashes.txt rockyou.txt", url: "https://hashcat.net/hashcat/", guide: "hashcat.html" },
  { n: 7,  name: "John the Ripper",      cat: "Password Cracking", desc: "Cracker offline clássico que deteta automaticamente o tipo de hash.", cmd: "john --wordlist=rockyou.txt hashes.txt", url: "https://www.openwall.com/john/", guide: "john.html" },
  { n: 8,  name: "Hydra",                cat: "Password Cracking", desc: "Força bruta online contra serviços como SSH, FTP, RDP e formulários web.", cmd: "hydra -l admin -P rockyou.txt ssh://192.168.1.1", url: "https://github.com/vanhauser-thc/thc-hydra", guide: "hydra.html" },
  { n: 9,  name: "Gobuster",             cat: "Web",               desc: "Enumeração de diretórios e ficheiros ocultos em servidores web.", cmd: "gobuster dir -u http://alvo -w common.txt", url: "https://github.com/OJ/gobuster", guide: "gobuster.html" },
  { n: 10, name: "Nikto",                cat: "Web",               desc: "Scanner de vulnerabilidades em servidores web, com milhares de verificações.", cmd: "nikto -h http://alvo", url: "https://github.com/sullo/nikto", guide: "nikto.html" },
  { n: 11, name: "Aircrack-ng",          cat: "Wireless",          desc: "Suíte para auditoria de redes Wi-Fi: captura, injeção e quebra de chaves WEP/WPA.", cmd: "aircrack-ng -w rockyou.txt captura.cap", url: "https://www.aircrack-ng.org/", guide: "aircrack-ng.html" },
  { n: 12, name: "Netcat",               cat: "Rede",              desc: "Canivete suíço de rede: transferência de ficheiros, shells reversos e escaneamento.", cmd: "nc -lvnp 4444", url: "https://netcat.sourceforge.net/", guide: "netcat.html" },
  { n: 13, name: "Searchsploit",         cat: "Exploração",        desc: "Interface offline para o Exploit-DB com milhares de exploits e PoCs.", cmd: "searchsploit apache 2.4", url: "https://www.exploit-db.com/searchsploit", guide: "searchsploit.html" },
  { n: 14, name: "OWASP ZAP",            cat: "Web",               desc: "Scanner de segurança web open source com proxy, fuzzing e testes ativos.", cmd: "zaproxy -cmd -quickurl http://alvo", url: "https://www.zaproxy.org/", guide: "zap.html" },
  { n: 15, name: "Penelope",             cat: "Pós-Exploração",    desc: "Gestor de shells reversos com upgrade automático para PTY e upload/download.", cmd: "penelope -a", url: "https://github.com/brightio/penelope", guide: "penelope.html" }
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const empty = document.getElementById("empty");
const favToggle = document.getElementById("favToggle");
const themeBtn = document.getElementById("themeBtn");
const printBtn = document.getElementById("printBtn");

// ---------- Favoritos (localStorage) ----------
let favorites = JSON.parse(localStorage.getItem("kali-favs") || "[]");
let onlyFavs = false;

function saveFavs() {
  localStorage.setItem("kali-favs", JSON.stringify(favorites));
}
function toggleFav(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter(f => f !== name);
  } else {
    favorites.push(name);
  }
  saveFavs();
  render();
}

// ---------- Tema (localStorage) ----------
const savedTheme = localStorage.getItem("kali-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("kali-theme", next);
  themeBtn.textContent = next === "dark" ? "🌙" : "☀️";
});

// ---------- Imprimir ----------
printBtn.addEventListener("click", () => window.print());

// ---------- Filtro de categorias ----------
const cats = [...new Set(tools.map(t => t.cat))].sort();
cats.forEach(c => {
  const opt = document.createElement("option");
  opt.value = c;
  opt.textContent = c;
  filter.appendChild(opt);
});

// ---------- Render ----------
function render() {
  const q = search.value.toLowerCase().trim();
  const c = filter.value;

  const filtered = tools.filter(t => {
    const matchQ = !q || t.name.toLowerCase().includes(q) ||
                   t.cat.toLowerCase().includes(q) ||
                   t.desc.toLowerCase().includes(q);
    const matchC = !c || t.cat === c;
    const matchFav = !onlyFavs || favorites.includes(t.name);
    return matchQ && matchC && matchFav;
  });

  grid.innerHTML = filtered.map(t => {
    const isFav = favorites.includes(t.name);
    return `
    <div class="card ${isFav ? 'fav' : ''}">
      <button class="fav-btn ${isFav ? 'active' : ''}" data-name="${t.name}" title="Favorito">${isFav ? '★' : '☆'}</button>
      <span class="num">#${t.n}</span>
      <h3>${t.name}</h3>
      <span class="cat">${t.cat}</span>
      <p>${t.desc}</p>
      <div class="code" data-cmd="${t.cmd.replace(/"/g, '&quot;')}" title="Clique para copiar">${t.cmd}</div>
      <div class="actions">
        <a class="link-btn guide" href="${t.guide}">📖 Guia detalhado</a>
        <a class="link-btn" href="${t.url}" target="_blank" rel="noopener">🔗 Site oficial</a>
      </div>
    </div>`;
  }).join("");

  empty.style.display = filtered.length === 0 ? "block" : "none";

  // Listeners favoritos
  grid.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      toggleFav(btn.dataset.name);
    });
  });

  // Listeners copiar comando
  grid.querySelectorAll(".code").forEach(el => {
    el.addEventListener("click", () => {
      navigator.clipboard.writeText(el.dataset.cmd).then(() => {
        el.classList.add("copied");
        setTimeout(() => el.classList.remove("copied"), 1200);
      });
    });
  });
}

// ---------- Eventos ----------
search.addEventListener("input", render);
filter.addEventListener("change", render);
favToggle.addEventListener("click", () => {
  onlyFavs = !onlyFavs;
  favToggle.classList.toggle("active", onlyFavs);
  favToggle.textContent = onlyFavs ? "★ Só favoritos (on)" : "★ Só favoritos";
  render();
});

render();
