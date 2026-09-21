"""
Dashboard de Rede — backend
Corre Nmap no teu PC, guarda histórico, envia notificações Windows,
lança capturas tshark e faz scans NSE.

Uso (PowerShell como Administrador):
    cd C:\\netdash
    pip install flask
    python server.py

Abre: http://localhost:5000
"""

import subprocess
import re
import json
import socket
import sys
from datetime import datetime
from pathlib import Path
from flask import Flask, jsonify, send_from_directory, request

app = Flask(__name__, static_folder=".")
BASE_DIR = Path(__file__).parent

HISTORY_DIR = BASE_DIR / "history"
CAPTURES_DIR = BASE_DIR / "captures"
HISTORY_DIR.mkdir(exist_ok=True)
CAPTURES_DIR.mkdir(exist_ok=True)

# Máximo de scans guardados no histórico
MAX_HISTORY = 50

# ---------- Deteção de subnet ----------
def detect_subnet():
    """Descobre a subnet local (fallback: 192.168.1.0/24)."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return ".".join(local_ip.split(".")[:3]) + ".0/24"
    except Exception:
        return "192.168.1.0/24"

# ---------- Nmap ----------
def run_nmap(args, timeout=120):
    """Executa nmap e devolve stdout."""
    try:
        result = subprocess.run(
            ["nmap"] + args,
            capture_output=True, text=True,
            timeout=timeout, shell=True,
            encoding="utf-8", errors="ignore"
        )
        return result.stdout
    except subprocess.TimeoutExpired:
        return ""

def run_nmap_sn(subnet):
    return run_nmap(["-sn", subnet], timeout=180)

def run_nmap_ports(ip, ports="21,22,23,25,53,80,110,135,139,143,443,445,993,995,1433,1521,3306,3389,5432,5900,6379,7547,8000,8008,8080,8443,8888,9100,27017"):
    return run_nmap(["-sV", "-p", ports, "-T4", ip], timeout=120)

def run_nmap_vuln(ip):
    return run_nmap(["-sV", "--script=vuln", "-T4", ip], timeout=900)

# ---------- Parsers ----------
def parse_sn(output):
    hosts = []
    current = None
    for line in output.splitlines():
        line = line.strip()

        m = re.match(r"Nmap scan report for (.+)", line)
        if m:
            if current:
                hosts.append(current)
            target = m.group(1)
            ip_match = re.search(r"\((\d+\.\d+\.\d+\.\d+)\)", target)
            if ip_match:
                current = {
                    "hostname": target.split(" ")[0],
                    "ip": ip_match.group(1),
                    "mac": None, "vendor": None, "ports": []
                }
            else:
                current = {
                    "hostname": None,
                    "ip": target,
                    "mac": None, "vendor": None, "ports": []
                }

        mm = re.match(r"MAC Address: ([0-9A-Fa-f:]+)\s*\((.+)\)", line)
        if mm and current:
            current["mac"] = mm.group(1)
            current["vendor"] = mm.group(2)

    if current:
        hosts.append(current)
    return hosts

def parse_ports(output):
    ports = []
    for line in output.splitlines():
        m = re.match(r"(\d+)/tcp\s+open\s+(\S+)\s*(.*)", line.strip())
        if m:
            ports.append({
                "port": int(m.group(1)),
                "service": m.group(2),
                "version": m.group(3).strip()[:80]
            })
    return ports

def parse_vuln_output(output):
    """Extrai linhas relevantes de vulnerabilidade do output NSE."""
    vulns = []
    for line in output.splitlines():
        s = line.strip()
        if s.startswith("|"):
            content = s.lstrip("|_ ").strip()
            if not content:
                continue
            if (content.startswith("CVE-") or
                "VULNERABLE" in content.upper() or
                "State: VULNERABLE" in content or
                content.startswith("IDs:") or
                "risk factor" in content.lower()):
                vulns.append(content)
    return vulns[:50]

# ---------- Histórico ----------
def save_scan(hosts, subnet):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    data = {
        "timestamp": datetime.now().isoformat(),
        "subnet": subnet,
        "count": len(hosts),
        "hosts": hosts
    }
    filepath = HISTORY_DIR / f"scan_{timestamp}.json"
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    # Limpa scans antigos
    all_scans = sorted(HISTORY_DIR.glob("scan_*.json"), reverse=True)
    for old in all_scans[MAX_HISTORY:]:
        try:
            old.unlink()
        except Exception:
            pass
    return filepath

def list_history():
    scans = sorted(HISTORY_DIR.glob("scan_*.json"), reverse=True)
    result = []
    for s in scans[:MAX_HISTORY]:
        try:
            with open(s, "r", encoding="utf-8") as f:
                data = json.load(f)
            result.append({
                "file": s.name,
                "timestamp": data.get("timestamp"),
                "count": data.get("count", 0),
                "subnet": data.get("subnet")
            })
        except Exception:
            continue
    return result

def load_previous_scan():
    scans = sorted(HISTORY_DIR.glob("scan_*.json"), reverse=True)
    if len(scans) < 2:
        return None
    try:
        with open(scans[1], "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None

def compare_scans(current_hosts, previous):
    if not previous:
        return {"new": [], "removed": [], "kept": []}
    current_ips = {h["ip"] for h in current_hosts}
    previous_ips = {h["ip"] for h in previous.get("hosts", [])}
    return {
        "new": sorted(current_ips - previous_ips),
        "removed": sorted(previous_ips - current_ips),
        "kept": sorted(current_ips & previous_ips)
    }

# ---------- Notificações Windows ----------
def send_windows_notification(title, message):
    """Envia toast notification nativa via PowerShell."""
    # Sanitiza aspas para evitar injeção
    title = title.replace('"', "'")
    message = message.replace('"', "'")

    ps = f'''
$ErrorActionPreference = "SilentlyContinue"
[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null
$template = @"
<toast>
  <visual>
    <binding template="ToastGeneric">
      <text>{title}</text>
      <text>{message}</text>
    </binding>
  </visual>
</toast>
"@
$xml = New-Object Windows.Data.Xml.Dom.XmlDocument
$xml.LoadXml($template)
$toast = [Windows.UI.Notifications.ToastNotification]::new($xml)
[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier("Dashboard de Rede").Show($toast)
'''
    try:
        subprocess.run(
            ["powershell", "-NoProfile", "-Command", ps],
            capture_output=True, timeout=10, shell=True
        )
    except Exception:
        pass

# ---------- tshark ----------
def find_tshark():
    """Localiza o tshark no sistema."""
    candidates = [
        "tshark",
        r"C:\Program Files\Wireshark\tshark.exe",
        r"C:\Program Files (x86)\Wireshark\tshark.exe",
    ]
    for c in candidates:
        try:
            r = subprocess.run([c, "-v"], capture_output=True, timeout=5, shell=True)
            if r.returncode == 0 or b"TShark" in r.stdout or b"TShark" in r.stderr:
                return c
        except Exception:
            continue
    return None

def list_interfaces():
    """Lista interfaces disponíveis no tshark."""
    tshark = find_tshark()
    if not tshark:
        return []
    try:
        r = subprocess.run([tshark, "-D"], capture_output=True, text=True, timeout=10, shell=True)
        interfaces = []
        for line in r.stdout.splitlines():
            m = re.match(r"(\d+)\.\s+(.+)", line.strip())
            if m:
                interfaces.append({"index": m.group(1), "name": m.group(2)})
        return interfaces
    except Exception:
        return []

def start_capture(ip, duration=30, interface="1"):
    """Inicia captura tshark em background."""
    tshark = find_tshark()
    if not tshark:
        return {"error": "tshark não encontrado. Instala o Wireshark."}

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"capture_{ip.replace('.', '_')}_{timestamp}.pcap"
    filepath = CAPTURES_DIR / filename

    cmd = [
        tshark, "-i", str(interface),
        "-f", f"host {ip}",
        "-a", f"duration:{duration}",
        "-w", str(filepath)
    ]

    try:
        subprocess.Popen(cmd, shell=True)
        return {
            "status": "capturing",
            "file": filename,
            "duration": duration,
            "message": f"A capturar tráfego de {ip} por {duration}s..."
        }
    except Exception as e:
        return {"error": str(e)}

def list_captures():
    files = sorted(CAPTURES_DIR.glob("*.pcap"), key=lambda f: f.stat().st_mtime, reverse=True)
    result = []
    for f in files[:30]:
        result.append({
            "name": f.name,
            "size": f.stat().st_size,
            "modified": datetime.fromtimestamp(f.stat().st_mtime).isoformat()
        })
    return result

def open_in_wireshark(filename):
    """Abre um ficheiro .pcap no Wireshark GUI."""
    if ".." in filename or "/" in filename or "\\" in filename:
        return {"error": "Nome inválido"}
    filepath = CAPTURES_DIR / filename
    if not filepath.exists():
        return {"error": "Ficheiro não encontrado"}

    candidates = ["wireshark", r"C:\Program Files\Wireshark\Wireshark.exe",
                  r"C:\Program Files (x86)\Wireshark\Wireshark.exe"]
    for c in candidates:
        try:
            subprocess.Popen([c, str(filepath)], shell=True)
            return {"status": "opened", "file": filename}
        except Exception:
            continue
    return {"error": "Wireshark GUI não encontrado"}

# ---------- Rotas ----------
@app.route("/")
def index():
    return send_from_directory(BASE_DIR, "dashboard.html")

@app.route("/api/subnet")
def api_subnet():
    return jsonify({"subnet": detect_subnet()})

@app.route("/api/scan")
def api_scan():
    subnet = request.args.get("subnet") or detect_subnet()
    raw = run_nmap_sn(subnet)
    hosts = parse_sn(raw)

    previous = load_previous_scan()
    comparison = compare_scans(hosts, previous)

    save_scan(hosts, subnet)

    # Notifica se há dispositivos novos
    if comparison["new"]:
        novos = ", ".join(comparison["new"][:5])
        if len(comparison["new"]) > 5:
            novos += f" e mais {len(comparison['new']) - 5}"
        send_windows_notification(
            "Dispositivo novo na rede",
            f"{len(comparison['new'])} novo(s): {novos}"
        )

    return jsonify({
        "subnet": subnet,
        "timestamp": datetime.now().isoformat(),
        "count": len(hosts),
        "hosts": hosts,
        "comparison": comparison
    })

@app.route("/api/ports/<ip>")
def api_ports(ip):
    if not re.match(r"^\d+\.\d+\.\d+\.\d+$", ip):
        return jsonify({"error": "IP inválido"}), 400
    raw = run_nmap_ports(ip)
    ports = parse_ports(raw)
    return jsonify({"ip": ip, "ports": ports})

@app.route("/api/vuln/<ip>")
def api_vuln(ip):
    if not re.match(r"^\d+\.\d+\.\d+\.\d+$", ip):
        return jsonify({"error": "IP inválido"}), 400
    raw = run_nmap_vuln(ip)
    vulns = parse_vuln_output(raw)
    return jsonify({
        "ip": ip,
        "vulnerabilities": vulns,
        "count": len(vulns),
        "raw_preview": raw[:3000]
    })

@app.route("/api/history")
def api_history():
    return jsonify({"scans": list_history()})

@app.route("/api/history/<filename>")
def api_history_detail(filename):
    if ".." in filename or "/" in filename or "\\" in filename:
        return jsonify({"error": "Nome inválido"}), 400
    filepath = HISTORY_DIR / filename
    if not filepath.exists():
        return jsonify({"error": "Scan não encontrado"}), 404
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
    return jsonify(data)

@app.route("/api/capture/<ip>", methods=["POST"])
def api_capture(ip):
    if not re.match(r"^\d+\.\d+\.\d+\.\d+$", ip):
        return jsonify({"error": "IP inválido"}), 400
    duration = int(request.args.get("duration", 30))
    interface = request.args.get("interface", "1")
    result = start_capture(ip, duration, interface)
    return jsonify(result)

@app.route("/api/captures")
def api_captures():
    return jsonify({
        "captures": list_captures(),
        "interfaces": list_interfaces(),
        "tshark_available": find_tshark() is not None
    })

@app.route("/api/captures/<filename>/open", methods=["POST"])
def api_open_capture(filename):
    result = open_in_wireshark(filename)
    return jsonify(result)

@app.route("/api/notify-test", methods=["POST"])
def api_notify_test():
    send_windows_notification("Dashboard de Rede", "Teste de notificação ✓")
    return jsonify({"status": "sent"})

# ---------- Main ----------
if __name__ == "__main__":
    subnet = detect_subnet()
    tshark = find_tshark()
    print("=" * 65)
    print("  Dashboard de Rede")
    print("=" * 65)
    print(f"  Subnet detetada : {subnet}")
    print(f"  Histórico        : {HISTORY_DIR}")
    print(f"  Capturas         : {CAPTURES_DIR}")
    print(f"  tshark           : {'✓ disponível' if tshark else '✗ não encontrado'}")
    print(f"  URL              : http://localhost:5000")
    print("=" * 65)
    print("  Corre este script como Administrador para resultados completos.")
    print("  Para parar: Ctrl+C")
    print("=" * 65)
    app.run(host="127.0.0.1", port=5000, debug=False)