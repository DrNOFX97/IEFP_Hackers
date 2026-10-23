(function () {
    var btn = document.getElementById('go');
    var out = document.getElementById('out');
    var lines = [];
    var pass = false;
    function log(s) { lines.push(new Date().toISOString().slice(11, 23) + '  ' + s); out.textContent = lines.join('\n'); }
    btn.addEventListener('click', function () {
        log('opener: ' + location.href);
        log('a abrir popup para ligafaro-8000 (sem COOP)...');
        var popup;
        try { popup = window.open('https://ligafaro-8000.firebaseapp.com/?popuptest=1', 'pd', 'width=480,height=420'); } catch (e) { log('exception: ' + e); }
        if (!popup) { log('FAIL: popup bloqueado pelo browser'); return; }
        log('popup criado; à escuta de postMessage...');
        window.addEventListener('message', function (ev) {
            if (ev.data && ev.data.popuptest === 'ok') {
                pass = true;
                log('PASS: mensagem recebida de ' + ev.data.from + ' — opener↔popup OK (handshake de OAuth possível)');
                log('VEREDITO: PASS');
            } else {
                log('mensagem estranha: ' + JSON.stringify(ev.data) + ' origem ' + ev.origin);
            }
        });
        setTimeout(function () {
            if (!pass) {
                log('FAIL: sem mensagem em 7s — popup está cortada do opener (sintoma de COOP em conflito)');
                log('VEREDITO: FAIL');
            }
        }, 7000);
    });
})();
