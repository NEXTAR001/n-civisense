from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.security import decode_access_token

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        protected_paths = ["/users", "/profile"]
        # Public endpoints: docs, auth, health, root, and NIN lookup (public verification)
        public_paths = [
            "/docs",
            "/redoc",
            "/openapi.json",
            "/api/v1/auth/login",
            "/health",
            "/",
        ]
        
        if request.url.path in public_paths or request.url.path.startswith("/api/v1/nin") or request.url.path.startswith("/api/v1/news"):
            return await call_next(request)
        
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            payload = decode_access_token(token)
            
            if payload:
                request.state.user = payload
                return await call_next(request)
            
        if not request.url.path.startswith("/api/v1/auth"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return await call_next(request)