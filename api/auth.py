"""
Firebase JWT verification.

Cada pedido à API inclui um token Firebase no header:
    Authorization: Bearer <id_token>

Verificamos a assinatura do token nos servidores do Firebase
antes de processar qualquer pedido.
"""

import firebase_admin
from firebase_admin import auth as firebase_auth, credentials
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Inicializa o SDK com as credenciais do ambiente (Application Default Credentials)
# Em Cloud Run, usa automaticamente a service account do container.
if not firebase_admin._apps:
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred)

_bearer = HTTPBearer()


async def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(_bearer),
) -> dict:
    """
    Valida o Firebase ID token e devolve o payload.

    Levanta HTTP 401 se:
    - Token ausente ou malformado
    - Token expirado
    - Assinatura inválida
    """
    try:
        decoded = firebase_auth.verify_id_token(creds.credentials, check_revoked=True)
        return decoded
    except firebase_auth.RevokedIdTokenError:
        raise HTTPException(status_code=401, detail="Token revogado. Faz login novamente.")
    except firebase_auth.ExpiredIdTokenError:
        raise HTTPException(status_code=401, detail="Sessão expirada.")
    except Exception:
        raise HTTPException(status_code=401, detail="Token inválido.")
