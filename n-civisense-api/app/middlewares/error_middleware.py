from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from app.core.exceptions import UnauthorizedException, NotFoundException, BadRequestException

def register_error_handlers(app):
    async def unauthorized_exception_handler(request: Request, exc: UnauthorizedException):
        return JSONResponse(
            status_code=401,
            content={"status": "error", "message": exc.message}
        )

    async def not_found_exception_handler(request: Request, exc: NotFoundException):
        return JSONResponse(
            status_code=404,
            content={"status": "error", "message": exc.message}
        )

    async def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"status": "error", "message": exc.detail}
        )

    @app.exception_handler(Exception)
    async def unknown_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": "Internal server error"}
        )