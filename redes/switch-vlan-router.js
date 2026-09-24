// Scenario tabs
document.querySelectorAll('.sc-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const sc = btn.dataset.sc;
    document.querySelectorAll('.sc-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.scenario-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('sc-' + sc).classList.add('active');
  });
});

// Config tabs
document.querySelectorAll('.cfg-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const cfg = btn.dataset.cfg;
    document.querySelectorAll('.cfg-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cfg-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('cfg-' + cfg).classList.add('active');
  });
});
