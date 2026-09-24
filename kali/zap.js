// Tema
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("zap-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("zap-theme", next);
  themeBtn.textContent = next === "dark" ? "🌙" : "☀️";
});

// Imprimir
document.getElementById("printBtn").addEventListener("click", () => window.print());

// Copiar comandos
document.querySelectorAll(".code").forEach(el => {
  el.addEventListener("click", () => {
    navigator.clipboard.writeText(el.dataset.cmd).then(() => {
      el.classList.add("copied");
      setTimeout(() => el.classList.remove("copied"), 1200);
    });
  });
});
