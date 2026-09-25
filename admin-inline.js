// ── Firebase config ────────────────────────────────────────────────
firebase.initializeApp({
  apiKey:            "AIzaSyAU6CzykxWF76ZsVYN9pjQf41nc6VdD4fw",
  authDomain:        "ligafaro-8000.firebaseapp.com",
  projectId:         "ligafaro-8000",
  storageBucket:     "ligafaro-8000.firebasestorage.app",
  messagingSenderId: "315653817267",
  appId:             "1:315653817267:web:a4c42a8e87e8cd79892ab4"
});

const auth = firebase.auth();
const db   = firebase.firestore();

// ── State ──────────────────────────────────────────────────────────
let allUsers = [];
let allLogs  = [];
let currentAdminUid   = null;
let currentAdminRole  = null;  // 'admin' | 'moderador'

// ── Helpers ────────────────────────────────────────────────────────
function toast(msg, type = 'ok') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = type;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3000);
}

function fmtDate(ts) {
  if (!ts) return '–';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString('pt-PT', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

function fmtDateShort(ts) {
  if (!ts) return '–';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return 'agora';
  if (diff < 3600000) return Math.floor(diff/60000) + 'm atrás';
  if (diff < 86400000) return Math.floor(diff/3600000) + 'h atrás';
  return d.toLocaleDateString('pt-PT');
}

function initials(name) {
  return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function roleBadge(role) {
  return `<span class="role-badge role-${role || 'aluno'}">${role || 'aluno'}</span>`;
}

function logActionBadge(action) {
  const cls = {
    login: 'log-login', role_change: 'log-role_change',
    note_write: 'log-note_write', material_add: 'log-material_add',
    material_delete: 'log-material_del', chat_message: 'log-chat'
  }[action] || 'log-default';
  return `<span class="log-action ${cls}">${action}</span>`;
}

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Audit log writer ───────────────────────────────────────────────
async function auditWrite(action, details) {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await db.collection('audit_log').add({
      uid:         user.uid,
      email:       user.email || '',
      displayName: user.displayName || '',
      action,
      details:     details || '',
      timestamp:   firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) { /* silent */ }
}

// ── Tab switching ──────────────────────────────────────────────────
function _switchTabInternal(tab) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn[data-tab]').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelector(`.nav-btn[data-tab="${tab}"]`).classList.add('active');
  if (tab === 'overview') loadOverview();
  if (tab === 'users')    loadUsers();
  if (tab === 'logs')     loadLogs();
  if (tab === 'security') loadSecurityData();
}
window.switchTab = _switchTabInternal;

// ── AUTH ───────────────────────────────────────────────────────────
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(e => {
    if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
      auth.signInWithRedirect(provider);
    } else {
      const el = document.getElementById('auth-err');
      el.textContent = e.message;
      el.style.display = 'block';
    }
  });
}

auth.onAuthStateChanged(async user => {
  if (!user) {
    document.getElementById('auth-gate').style.display    = 'flex';
    document.getElementById('admin-app').style.display    = 'none';
    document.getElementById('access-denied').style.display = 'none';
    return;
  }

  // Check admin role
  let role = 'aluno';
  try {
    const doc = await db.collection('users').doc(user.uid).get();
    role = doc.exists ? (doc.data().role || 'aluno') : 'aluno';
  } catch(e) { /* no access yet */ }

  if (role !== 'admin' && role !== 'moderador') {
    document.getElementById('auth-gate').style.display    = 'none';
    document.getElementById('admin-app').style.display    = 'none';
    document.getElementById('access-denied').style.display = 'flex';
    return;
  }

  // Show admin app
  document.getElementById('auth-gate').style.display    = 'none';
  document.getElementById('access-denied').style.display = 'none';
  document.getElementById('admin-app').style.display    = 'flex';

  currentAdminUid  = user.uid;
  currentAdminRole = role;
  document.getElementById('sb-role').textContent = role;
  const name = user.displayName || user.email || '–';
  document.getElementById('sb-avatar').textContent = initials(name);
  document.getElementById('sb-name').textContent   = name.split(' ')[0];

  // Log admin panel access
  auditWrite('admin_login', 'Acesso ao painel de administração');

  // Load initial tab
  loadOverview();
});

// ── OVERVIEW ────────────────────────────────────────────────────────
async function loadOverview() {
  document.getElementById('overview-updated').textContent = 'A carregar…';

  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Queries paralelas — sem índices compostos: filtragem por timestamp feita em memória
    const todayTs = firebase.firestore.Timestamp.fromDate(todayStart);
    const [usersSnap, recentSnap, todayLogsSnap] = await Promise.all([
      db.collection('users').get(),
      db.collection('audit_log').orderBy('timestamp', 'desc').limit(20).get(),
      db.collection('audit_log').where('timestamp', '>=', todayTs).get(),
    ]);

    // Contagem de utilizadores por role
    let total = 0, admins = 0, moderadores = 0, alunos = 0, blocked = 0;
    usersSnap.docs.forEach(d => {
      total++;
      const r = d.data().role || 'aluno';
      if      (r === 'admin')    admins++;
      else if (r === 'moderador') moderadores++;
      else if (r === 'blocked')  blocked++;
      else                       alunos++;
    });

    // Contagem de ações de hoje em memória (sem índice composto)
    let loginsToday = 0, actionsToday = 0;
    todayLogsSnap.docs.forEach(d => {
      actionsToday++;
      if (d.data().action === 'login') loginsToday++;
    });

    document.getElementById('stat-total').textContent      = total;
    document.getElementById('stat-alunos').textContent     = alunos;
    document.getElementById('stat-moderadores').textContent = moderadores;
    document.getElementById('stat-admins').textContent     = admins;
    document.getElementById('stat-blocked').textContent    = blocked;
    document.getElementById('stat-logins').textContent     = loginsToday;
    document.getElementById('stat-actions').textContent    = actionsToday;

    // Atividade recente
    const actionIcons = {
      login: '🔑', role_change: '🔄', note_write: '📝',
      material_add: '📎', material_delete: '🗑️', chat_message: '💬',
      admin_login: '🛡️', blocked: '🚫'
    };
    const list = document.getElementById('recent-list');
    if (recentSnap.empty) {
      list.innerHTML = '<div class="empty"><div class="empty-icon">📋</div>Sem atividade registada.</div>';
    } else {
      list.innerHTML = recentSnap.docs.map(d => {
        const data = d.data();
        const icon = actionIcons[data.action] || '•';
        return `<div class="activity-item">
          <div class="activity-icon">${icon}</div>
          <div class="activity-text">
            <strong>${escHtml(data.displayName || data.email || 'Desconhecido')}</strong>
            — ${escHtml(data.action)}
            ${data.details ? `<span> · ${escHtml(data.details)}</span>` : ''}
            <div class="activity-meta">${escHtml(data.email || '')}</div>
          </div>
          <div class="activity-time">${fmtDateShort(data.timestamp)}</div>
        </div>`;
      }).join('');
      // Estilo aplicado via DOM API (sem atributo style inline, CSP-safe)
      list.querySelectorAll('.activity-text > span').forEach(span => {
        span.style.cssText = 'color:var(--text2)';
      });
    }

    document.getElementById('overview-updated').textContent = 'Atualizado: ' + new Date().toLocaleTimeString('pt-PT');
  } catch(e) {
    console.error(e);
    document.getElementById('overview-updated').textContent = 'Erro: ' + e.message;
  }
}

// ── USERS ───────────────────────────────────────────────────────────
async function loadUsers() {
  const tbody = document.getElementById('users-tbody');
  tbody.innerHTML = '<tr><td colspan="5"><div class="loader"><div class="spinner"></div> A carregar…</div></td></tr>';
  try {
    // Sem orderBy — evita excluir docs sem campo lastSeen; ordenação em JS
    const snap = await db.collection('users').get();
    allUsers = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => {
      const ta = a.lastSeen?.toDate?.()?.getTime() || 0;
      const tb = b.lastSeen?.toDate?.()?.getTime() || 0;
      return tb - ta;
    });
    renderUsers(allUsers);
  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="5">${e.message}</td></tr>`;
    tbody.querySelector('td').style.cssText = 'color:var(--red);padding:1rem;';
  }
}

function renderUsers(users) {
  const tbody  = document.getElementById('users-tbody');
  const count  = document.getElementById('users-count');
  count.textContent = `${users.length} utilizador${users.length !== 1 ? 'es' : ''}`;

  if (!users.length) {
    tbody.innerHTML = '<tr><td colspan="5"><div class="empty"><div class="empty-icon">👤</div>Nenhum utilizador encontrado.</div></td></tr>';
    return;
  }

  tbody.innerHTML = users.map(u => {
    const name    = escHtml(u.displayName || u.email || '–');
    const email   = escHtml(u.email || '–');
    const role    = u.role || 'aluno';
    const photo   = u.photoURL ? `<img src="${escHtml(u.photoURL)}" alt="">` : initials(u.displayName || u.email);
    const isSelf  = u.id === currentAdminUid;
    const allowedRoles = currentAdminRole === 'admin'
      ? ['aluno', 'formador', 'moderador', 'admin', 'blocked']
      : ['aluno', 'formador', 'blocked'];
    const roleOpts = allowedRoles.map(r =>
      `<option value="${r}" ${r === role ? 'selected' : ''}>${r}</option>`
    ).join('');

    const isBlocked = role === 'blocked';
    return `<tr class="${isBlocked ? 'row-blocked' : ''}">
      <td>
        <div class="td-user">
          <div class="td-avatar">${photo}</div>
          <div>
            <div class="td-name">${name}${isSelf ? ' <span>(tu)</span>' : ''}</div>
          </div>
        </div>
      </td>
      <td>${email}</td>
      <td>${roleBadge(role)}</td>
      <td>${fmtDate(u.lastSeen)}</td>
      <td>
        ${isSelf
          ? `<span>–</span>`
          : `<div>
               <select class="role-select" data-action="change-role" data-uid="${u.id}" data-name="${escHtml(name)}">${roleOpts}</select>
               <button class="btn"
                 data-action="toggle-block" data-uid="${u.id}" data-name="${escHtml(name)}" data-role="${role}">
                 ${isBlocked ? '✓ Desbloquear' : '🚫 Bloquear'}
               </button>
               ${isBlocked && currentAdminRole === 'admin' ? `<button class="btn"
                 data-action="delete-user" data-uid="${u.id}" data-name="${escHtml(name)}">🗑️ Eliminar</button>` : ''}
             </div>`
        }
      </td>
    </tr>`;
  }).join('');

  // Estilos dinâmicos aplicados via DOM API (sem atributo style inline, CSP-safe).
  // A lógica condicional (isSelf / isBlocked / role de admin) é exatamente a mesma usada acima.
  Array.from(tbody.children).forEach((row, i) => {
    const u = users[i];
    const role = u.role || 'aluno';
    const isBlocked = role === 'blocked';
    const isSelf = u.id === currentAdminUid;
    const cells = row.children; // [0]=utilizador [1]=email [2]=role [3]=último acesso [4]=ações

    const selfSpan = cells[0].querySelector('.td-name > span');
    if (selfSpan) selfSpan.style.cssText = 'color:var(--text3);font-size:0.72rem;';

    cells[1].style.cssText = 'color:var(--text2);font-size:0.82rem;';
    cells[3].style.cssText = 'color:var(--text2)';

    const actionCell = cells[4];
    if (isSelf) {
      const dash = actionCell.querySelector('span');
      if (dash) dash.style.cssText = 'color:var(--text3);font-size:0.8rem;';
    } else {
      const wrap = actionCell.querySelector('div');
      if (wrap) wrap.style.cssText = 'display:flex;gap:6px;align-items:center;';

      const toggleBtn = actionCell.querySelector('[data-action="toggle-block"]');
      if (toggleBtn) {
        toggleBtn.style.cssText = 'padding:0.2rem 0.6rem;font-size:0.78rem;' +
          (isBlocked ? 'border-color:var(--accent);color:var(--accent)' : 'border-color:var(--red);color:var(--red)');
      }

      const delBtn = actionCell.querySelector('[data-action="delete-user"]');
      if (delBtn) {
        delBtn.style.cssText = 'padding:0.2rem 0.6rem;font-size:0.78rem;border-color:#8b0000;color:#c0392b;background:rgba(139,0,0,0.12);';
      }
    }
  });
}

async function deleteUser(uid, name) {
  if (!confirm(`Eliminar permanentemente "${name}" da base de dados?\n\nEsta ação não pode ser desfeita.`)) return;
  try {
    await db.collection('users').doc(uid).delete();
    allUsers = allUsers.filter(u => u.id !== uid);
    await auditWrite('user_delete', `Utilizador eliminado: ${name} (${uid})`);
    toast(`"${name}" eliminado da base de dados`);
    renderUsers(allUsers);
    loadStats();
  } catch(e) {
    toast('Erro: ' + e.message, 'error');
  }
}

async function toggleBlock(uid, name, currentRole) {
  const isBlocked = currentRole === 'blocked';
  const action    = isBlocked ? 'desbloquear' : 'bloquear';
  const newRole   = isBlocked ? 'aluno' : 'blocked';
  if (!confirm(`${action.charAt(0).toUpperCase() + action.slice(1)} "${name}"?`)) return;
  try {
    await db.collection('users').doc(uid).update({ role: newRole });
    const u = allUsers.find(u => u.id === uid);
    if (u) u.role = newRole;
    await auditWrite('role_change', `${name}: ${currentRole} → ${newRole}`);
    toast(`"${name}" ${isBlocked ? 'desbloqueado' : 'bloqueado'}`);
    renderUsers(allUsers);
  } catch(e) {
    toast('Erro: ' + e.message, 'error');
  }
}

function filterUsers() {
  const q    = document.getElementById('user-search').value.toLowerCase();
  const role = document.getElementById('user-role-filter').value;
  const filtered = allUsers.filter(u => {
    const match = !q || (u.displayName||'').toLowerCase().includes(q) || (u.email||'').toLowerCase().includes(q);
    const rMatch = !role || (u.role || 'aluno') === role;
    return match && rMatch;
  });
  renderUsers(filtered);
}

async function changeRole(uid, name, newRole, selectEl) {
  const oldRole = allUsers.find(u => u.id === uid)?.role || 'aluno';
  if (newRole === oldRole) return;

  // Moderadores só podem atribuir aluno/formador/blocked
  const restrictedRoles = ['moderador', 'admin'];
  if (currentAdminRole !== 'admin' && restrictedRoles.includes(newRole)) {
    toast('Sem permissões para atribuir este role.', 'error');
    selectEl.value = oldRole;
    return;
  }

  if (!confirm(`Alterar role de "${name}" de "${oldRole}" para "${newRole}"?`)) {
    selectEl.value = oldRole;
    return;
  }

  try {
    await db.collection('users').doc(uid).update({ role: newRole });
    // Update local state
    const u = allUsers.find(u => u.id === uid);
    if (u) u.role = newRole;
    // Audit log
    await auditWrite('role_change', `${name}: ${oldRole} → ${newRole}`);
    toast(`Role de ${name} alterado para "${newRole}"`);
    renderUsers(allUsers);
  } catch(e) {
    selectEl.value = oldRole;
    toast('Erro: ' + e.message, 'error');
  }
}

// ── LOGS ────────────────────────────────────────────────────────────
async function loadLogs() {
  const tbody = document.getElementById('logs-tbody');
  const limit = parseInt(document.getElementById('log-limit').value) || 100;
  tbody.innerHTML = '<tr><td colspan="4"><div class="loader"><div class="spinner"></div> A carregar…</div></td></tr>';

  try {
    const snap = await db.collection('audit_log')
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();
    allLogs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderLogs(allLogs);
  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="4">${e.message}</td></tr>`;
    tbody.querySelector('td').style.cssText = 'color:var(--red);padding:1rem;';
  }
}

function renderLogs(logs) {
  const tbody = document.getElementById('logs-tbody');
  const count = document.getElementById('logs-count');
  count.textContent = `${logs.length} entrada${logs.length !== 1 ? 's' : ''}`;

  if (!logs.length) {
    tbody.innerHTML = '<tr><td colspan="4"><div class="empty"><div class="empty-icon">📋</div>Sem registos de auditoria.</div></td></tr>';
    return;
  }

  tbody.innerHTML = logs.map(l => `<tr>
    <td>${fmtDate(l.timestamp)}</td>
    <td>
      <div class="td-name">${escHtml(l.displayName || '–')}</div>
      <div class="td-email">${escHtml(l.email || '–')}</div>
    </td>
    <td>${logActionBadge(l.action)}</td>
    <td title="${escHtml(l.details)}">${escHtml(l.details) || '–'}</td>
  </tr>`).join('');

  // Estilos aplicados via DOM API (sem atributo style inline, CSP-safe)
  Array.from(tbody.children).forEach(row => {
    const cells = row.children;
    cells[0].style.cssText = 'color:var(--text2);white-space:nowrap';
    cells[3].style.cssText = 'color:var(--text2);max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
  });
}

function filterLogs() {
  const q      = document.getElementById('log-search').value.toLowerCase();
  const action = document.getElementById('log-action-filter').value;
  const filtered = allLogs.filter(l => {
    const match  = !q || (l.displayName||'').toLowerCase().includes(q) || (l.email||'').toLowerCase().includes(q);
    const aMatch = !action || l.action === action;
    return match && aMatch;
  });
  renderLogs(filtered);
}

function exportLogsCSV() {
  if (!allLogs.length) { toast('Sem dados para exportar', 'error'); return; }
  const rows = [['timestamp','uid','email','displayName','action','details']];
  allLogs.forEach(l => {
    const ts = l.timestamp?.toDate?.()?.toISOString() || '';
    rows.push([ts, l.uid||'', l.email||'', l.displayName||'', l.action||'', l.details||'']);
  });
  downloadCSV(rows, 'audit_log');
}

function exportUsersCSV() {
  if (!allUsers.length) { loadUsers().then(exportUsersCSV); return; }
  const rows = [['uid','email','displayName','role','lastSeen']];
  allUsers.forEach(u => {
    const ts = u.lastSeen?.toDate?.()?.toISOString() || '';
    rows.push([u.id||'', u.email||'', u.displayName||'', u.role||'aluno', ts]);
  });
  downloadCSV(rows, 'utilizadores');
}

function downloadCSV(rows, filename) {
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const a   = document.createElement('a');
  a.href    = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = `${filename}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}

function reloadConfig() {
  db.collection('config').doc('settings').get()
    .then(() => toast('Config recarregada'))
    .catch(e => toast('Erro: ' + e.message, 'error'));
}

// ── SECURITY DATA (REAL FIREBASE) ──────────────────────────────────
async function loadSecurityData() {
  const bfTbody = document.getElementById('bruteforce-tbody');
  const cspTbody = document.getElementById('csp-tbody');
  const sTbody = document.getElementById('sessions-tbody');
  const mapDiv = document.getElementById('login-map');
  
  // Real CSP Violations
  cspTbody.innerHTML = '<tr><td colspan="3"><div class="spinner"></div></td></tr>';
  cspTbody.querySelector('td').style.cssText = 'text-align:center;padding:1rem;';
  try {
    const cspSnap = await db.collection('csp_violations').orderBy('timestamp', 'desc').limit(15).get();
    if (cspSnap.empty) {
      cspTbody.innerHTML = '<tr><td colspan="3">Nenhuma violação recente associada.</td></tr>';
      cspTbody.querySelector('td').style.cssText = 'text-align:center;padding:1rem;';
    } else {
      cspTbody.innerHTML = cspSnap.docs.map(d => {
        const data = d.data();
        return `<tr><td>${fmtDateShort(data.timestamp)}</td><td>${escHtml(data.blockedUri || 'inline')}</td><td><span>${escHtml(data.violatedDirective)}</span></td></tr>`;
      }).join('');
      // Estilos via DOM API (sem atributo style inline, CSP-safe)
      Array.from(cspTbody.children).forEach(row => {
        const cells = row.children;
        cells[0].style.cssText = 'color:var(--text2);font-size:0.75rem;';
        cells[2].querySelector('span').style.cssText = 'font-family:monospace;background:var(--surface2);padding:0.1rem 0.3rem;border-radius:4px;';
      });
    }
  } catch(e) {
    cspTbody.innerHTML = '<tr><td colspan="3">Sem dados de CSP ou limite de leitura atingido.</td></tr>';
    cspTbody.querySelector('td').style.cssText = 'text-align:center;padding:1rem;color:var(--text2);';
  }

  // Sessões Ativas Reais (lastSeen > 5 mins)
  sTbody.innerHTML = '<tr><td colspan="2"><div class="spinner"></div></td></tr>';
  sTbody.querySelector('td').style.cssText = 'text-align:center;padding:1rem;';
  try {
    const now = new Date();
    const fiveMinsAgo = new Date(now.getTime() - 5 * 60000);
    const uSnap = await db.collection('users').where('lastSeen', '>=', fiveMinsAgo).get();
    if (uSnap.empty) {
      sTbody.innerHTML = '<tr><td colspan="2">Sem sessões aparentes.</td></tr>';
      sTbody.querySelector('td').style.cssText = 'text-align:center;padding:1rem;';
    } else {
      const sessionDocs = uSnap.docs;
      sTbody.innerHTML = sessionDocs.map(d => {
        const data = d.data();
        const uid = d.id;
        const name = escHtml(data.displayName || data.email || 'Desconhecido');
        if (uid === currentAdminUid) {
          return `<tr><td>${name} <span>(neste dispositivo)</span></td><td><span class="role-badge role-admin">Tu</span></td></tr>`;
        }
        return `<tr><td>${name}</td><td><button class="btn" data-action="force-logout" data-uid="${uid}" data-name="${name}">Logout Remoto</button></td></tr>`;
      }).join('');
      // Estilos via DOM API — mesma lógica condicional (uid === currentAdminUid) do bloco acima
      Array.from(sTbody.children).forEach((row, i) => {
        const uid = sessionDocs[i].id;
        if (uid === currentAdminUid) {
          const span = row.querySelector('td > span');
          if (span) span.style.cssText = 'color:var(--text3);font-size:0.72rem;';
        } else {
          const btn = row.querySelector('[data-action="force-logout"]');
          if (btn) btn.style.cssText = 'padding:0.2rem 0.5rem;font-size:0.7rem;color:var(--red);border-color:var(--red);';
        }
      });
    }
  } catch(e) {
    sTbody.innerHTML = `<tr><td colspan="2">Erro de leitura: ${e.message}</td></tr>`;
    sTbody.querySelector('td').style.cssText = 'text-align:center;padding:1rem;color:var(--red);';
  }

  // Mapa de Logins Real & Brute Force (Filtering from generic audit_logs to avoid compound index needs)
  mapDiv.innerHTML = '<div>A procurar logs globais...</div>';
  mapDiv.querySelector('div').style.cssText = 'color:var(--text3);text-align:center;';
  bfTbody.innerHTML = '<tr><td colspan="4"><div class="spinner"></div></td></tr>';
  bfTbody.querySelector('td').style.cssText = 'text-align:center;padding:1rem;';

  try {
    const lSnap = await db.collection('audit_log').orderBy('timestamp', 'desc').limit(200).get();
    const logins = [];
    const fails = {};

    lSnap.docs.forEach(d => {
      const data = d.data();
      if (data.action === 'login') {
        logins.push(data);
      } else if (data.action === 'login_failed') {
        const key = data.email || data.details || 'Unknown';
        if (!fails[key]) fails[key] = { count: 0, target: data.email || '?', details: data.details };
        fails[key].count++;
      }
    });

    if (logins.length === 0) {
      mapDiv.innerHTML = '<div>Sem eventos recentes conectáveis.</div>';
      mapDiv.querySelector('div').style.cssText = 'color:var(--text3);';
    } else {
      mapDiv.innerHTML = '';
      logins.slice(0, 15).reverse().forEach(data => {
        const dateStr = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleTimeString('pt-PT') : '--:--:--';
        mapDiv.innerHTML = `<div>[${dateStr}] ${escHtml(data.email || data.displayName)} — ${escHtml(data.details)}</div>` + mapDiv.innerHTML;
      });
      // Estilo (constante, igual para todas as entradas) via DOM API
      Array.from(mapDiv.children).forEach(div => {
        div.style.cssText = 'margin-bottom:6px;color:var(--accent)';
      });
    }

    const failEntries = Object.entries(fails);
    if (failEntries.length === 0) {
      bfTbody.innerHTML = '<tr><td colspan="4">Nenhuma falha detetada recentemente.</td></tr>';
      bfTbody.querySelector('td').style.cssText = 'text-align:center;padding:1rem;';
    } else {
      bfTbody.innerHTML = failEntries.map(([key, info]) => `
        <tr><td>${escHtml(info.details || 'IP Desconhecido')}</td><td>${escHtml(info.target)}</td><td>${info.count}</td><td><button class="btn" data-action="toast-firewall">Ignorar/Block</button></td></tr>
      `).join('');
      // Estilos via DOM API — mesma lógica condicional (info.count >= 5) do template original
      Array.from(bfTbody.children).forEach((row, i) => {
        const [, info] = failEntries[i];
        const cells = row.children;
        cells[0].style.cssText = 'font-family:monospace;';
        cells[2].style.cssText = `color:${info.count >= 5 ? 'var(--red)' : 'var(--yellow)'};font-weight:bold;`;
        const btn = cells[3].querySelector('[data-action="toast-firewall"]');
        if (btn) btn.style.cssText = 'padding:0.2rem 0.5rem;font-size:0.7rem;';
      });
    }

  } catch(e) {
    mapDiv.innerHTML = `<div>Erro: ${e.message}</div>`;
    mapDiv.querySelector('div').style.cssText = 'color:var(--red);';
    bfTbody.innerHTML = `<tr><td colspan="4">Erro: ${e.message}</td></tr>`;
    bfTbody.querySelector('td').style.cssText = 'color:var(--red);text-align:center;';
  }
}

async function forceUserLogout(uid, name) {
  if(!confirm(`Forçar o encerramento da sessão ativa de ${name}?\nEles serão notificados e obrigados a fazer login novamente.`)) return;
  try {
    await db.collection('users').doc(uid).set({
      forceLogoutAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    
    // Audit write this administrative action
    await auditWrite('role_change', `Sessão de ${name} terminada remotamente`);
    
    toast(`Sinal de logout enviado para ${name}`);
    loadSecurityData(); // refresh the view
  } catch(e) {
    toast(`Erro ao forçar término: ${e.message}`, 'error');
  }
}

// CSP Violation Listener (Client-side Reporting)
document.addEventListener('securitypolicyviolation', (e) => {
    fetch('https://europe-west1-ligafaro-8000.cloudfunctions.net/cspReport', {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/csp-report' },
        body: JSON.stringify({
            'csp-report': {
                'document-uri': e.documentURI,
                'violated-directive': e.violatedDirective,
                'blocked-uri': e.blockedURI,
                'original-policy': e.originalPolicy,
                'source-file': e.sourceFile,
                'line-number': e.lineNumber
            }
        })
    }).catch(()=>{});
});

// ── Wire up UI event listeners (migrated from inline on* attributes, CSP script-src hardening) ──
document.getElementById('auth-google-btn').addEventListener('click', signInWithGoogle);
document.getElementById('access-denied-signout-btn').addEventListener('click', () => firebase.auth().signOut());
document.getElementById('sidebar-signout-btn').addEventListener('click', () => firebase.auth().signOut());

document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

document.getElementById('overview-refresh-btn').addEventListener('click', loadOverview);
document.getElementById('users-refresh-btn').addEventListener('click', loadUsers);
document.getElementById('user-search').addEventListener('input', filterUsers);
document.getElementById('user-role-filter').addEventListener('change', filterUsers);
document.getElementById('logs-export-btn').addEventListener('click', exportLogsCSV);
document.getElementById('logs-refresh-btn').addEventListener('click', loadLogs);
document.getElementById('log-search').addEventListener('input', filterLogs);
document.getElementById('log-action-filter').addEventListener('change', filterLogs);
document.getElementById('log-limit').addEventListener('change', loadLogs);
document.getElementById('security-refresh-btn').addEventListener('click', loadSecurityData);
document.getElementById('config-reload-btn').addEventListener('click', reloadConfig);
document.getElementById('config-export-users-btn').addEventListener('click', exportUsersCSV);

// Delegated listeners for rows rendered dynamically via innerHTML
document.getElementById('users-tbody').addEventListener('change', e => {
  const sel = e.target.closest('[data-action="change-role"]');
  if (sel) changeRole(sel.dataset.uid, sel.dataset.name, sel.value, sel);
});
document.getElementById('users-tbody').addEventListener('click', e => {
  const toggleBtn = e.target.closest('[data-action="toggle-block"]');
  if (toggleBtn) { toggleBlock(toggleBtn.dataset.uid, toggleBtn.dataset.name, toggleBtn.dataset.role); return; }
  const delBtn = e.target.closest('[data-action="delete-user"]');
  if (delBtn) deleteUser(delBtn.dataset.uid, delBtn.dataset.name);
});
document.getElementById('sessions-tbody').addEventListener('click', e => {
  const btn = e.target.closest('[data-action="force-logout"]');
  if (btn) forceUserLogout(btn.dataset.uid, btn.dataset.name);
});
document.getElementById('bruteforce-tbody').addEventListener('click', e => {
  const btn = e.target.closest('[data-action="toast-firewall"]');
  if (btn) toast('Configuração Firewall Web indisponível neste plano', 'error');
});
