#!/usr/bin/env python3
"""
seed_admin.py — Bootstrap do utilizador administrador no Firestore.

Uso:
    python3 seed_admin.py
    python3 seed_admin.py --email outro@gmail.com --role formador

Requer:
    pip install firebase-admin
    gcloud auth application-default login   (ou variável GOOGLE_APPLICATION_CREDENTIALS)
"""

import argparse
import sys

try:
    import firebase_admin
    from firebase_admin import auth as fb_auth, credentials, firestore
except ImportError:
    print("Erro: firebase-admin não instalado.")
    print("  pip install firebase-admin")
    sys.exit(1)

# ── Config ────────────────────────────────────────────────────────
PROJECT_ID     = "ligafaro-8000"
DEFAULT_EMAIL  = "f.nuno.ss@gmail.com"
DEFAULT_ROLE   = "admin"
VALID_ROLES    = ("aluno", "formador", "admin", "blocked")


def init_firebase():
    if not firebase_admin._apps:
        try:
            cred = credentials.ApplicationDefault()
            firebase_admin.initialize_app(cred, {"projectId": PROJECT_ID})
            print(f"Firebase inicializado com Application Default Credentials (projeto: {PROJECT_ID})")
        except Exception as e:
            print(f"Erro ao inicializar Firebase: {e}")
            print("\nPara autenticar, corre:")
            print("  gcloud auth application-default login")
            sys.exit(1)


def set_role(email: str, role: str, dry_run: bool = False):
    """Define o role do utilizador no Firestore pela email."""
    if role not in VALID_ROLES:
        print(f"Role inválido: '{role}'. Válidos: {VALID_ROLES}")
        sys.exit(1)

    print(f"\nUtilizador : {email}")
    print(f"Novo role  : {role}")

    # 1. Encontrar o UID do utilizador no Firebase Auth
    try:
        user = fb_auth.get_user_by_email(email)
        uid  = user.uid
        print(f"UID        : {uid}")
        print(f"Nome       : {user.display_name or '(sem nome)'}")
    except fb_auth.UserNotFoundError:
        print(f"\nErro: utilizador '{email}' não encontrado no Firebase Auth.")
        print("O utilizador tem de iniciar sessão pelo menos uma vez antes de poder receber um role.")
        sys.exit(1)
    except Exception as e:
        print(f"\nErro ao procurar utilizador: {e}")
        sys.exit(1)

    if dry_run:
        print("\n[DRY RUN] Nenhuma alteração efectuada.")
        return

    # 2. Actualizar o documento no Firestore
    db = firestore.client()
    user_ref = db.collection("users").document(uid)
    doc = user_ref.get()

    update_data = {
        "role":        role,
        "uid":         uid,
        "email":       email,
        "displayName": user.display_name or email,
    }

    if doc.exists:
        existing_role = doc.to_dict().get("role", "aluno")
        print(f"Role atual : {existing_role}")
        user_ref.update({"role": role})
        print(f"\nRole atualizado: {existing_role} → {role}")
    else:
        # Documento não existe ainda (utilizador nunca usou o dashboard)
        from google.cloud.firestore_v1 import SERVER_TIMESTAMP
        update_data["lastSeen"] = SERVER_TIMESTAMP
        user_ref.set(update_data, merge=True)
        print(f"\nDocumento criado com role: {role}")

    print(f"\nOk. '{email}' tem agora role '{role}'.")
    print(f"Acesso ao painel admin: https://iefp-hackers.web.app/admin.html")


def list_users():
    """Lista todos os utilizadores e os seus roles."""
    db   = firestore.client()
    snap = db.collection("users").get()
    if not snap:
        print("Nenhum utilizador encontrado.")
        return

    print(f"\n{'Email':<40} {'Role':<12} {'UID':<30}")
    print("─" * 85)
    for doc in sorted(snap, key=lambda d: d.to_dict().get("email", "")):
        data  = doc.to_dict()
        email = data.get("email", "–")[:39]
        role  = data.get("role", "aluno")
        uid   = doc.id[:28]
        print(f"{email:<40} {role:<12} {uid}")
    print(f"\nTotal: {len(snap)} utilizadores")


def main():
    parser = argparse.ArgumentParser(
        description="Bootstrap de roles no Firestore — CET Cibersegurança"
    )
    parser.add_argument("--email",   default=DEFAULT_EMAIL, help="Email do utilizador")
    parser.add_argument("--role",    default=DEFAULT_ROLE,  choices=VALID_ROLES, help="Role a atribuir")
    parser.add_argument("--list",    action="store_true",   help="Listar todos os utilizadores e roles")
    parser.add_argument("--dry-run", action="store_true",   help="Simular sem fazer alterações")
    args = parser.parse_args()

    init_firebase()

    if args.list:
        list_users()
    else:
        set_role(args.email, args.role, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
