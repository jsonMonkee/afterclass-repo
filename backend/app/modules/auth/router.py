from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.core.security import session_from_request
from app.modules.auth.schemas import LoginRequest
from app.modules.auth.service import authenticate

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login(payload: LoginRequest) -> JSONResponse:
    result = authenticate(payload.username, payload.password)
    if not result:
        return JSONResponse(
            {"success": False, "error": "Invalid credentials. Check your username or password."},
            status_code=401,
        )
    user, token = result
    response = JSONResponse({"success": True, "message": f"Welcome back, {user['name']}!", "user": user})
    response.set_cookie(
        "afterclass_session", token, httponly=True,
        secure=get_settings().app_env.lower() == "production",
        samesite="lax", path="/", max_age=24 * 60 * 60,
    )
    return response


@router.get("/session")
def session(request: Request) -> dict:
    user = session_from_request(request)
    return {"authenticated": bool(user), "user": user}


@router.post("/logout")
def logout() -> JSONResponse:
    response = JSONResponse({"success": True, "message": "Signed out successfully."})
    response.delete_cookie("afterclass_session", path="/", httponly=True, samesite="lax")
    return response


@router.delete("/session")
@router.delete("/logout")
def delete_session() -> JSONResponse:
    return logout()
