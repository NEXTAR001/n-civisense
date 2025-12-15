from fastapi import FastAPI
from app.middlewares.auth_middleware import AuthMiddleware
from app.middlewares.error_middleware import register_error_handlers
from app.core.config import config
from app.db import engine, Base
from app.routes import auth_route, user_route
from app.api.v1.routes import auth_route as v1_auth_route, user_route as v1_user_route, nin_route as v1_nin_route, news_route as v1_news_route


Base.metadata.create_all(bind=engine)
print("DATABSE_URL:", config.DATABASE_URL)
def create_app():
    app = FastAPI(title="N-Civisense-API", version=config.VERSION)
    
    register_error_handlers(app)
    
    app.add_middleware(AuthMiddleware)
    
    app.include_router(v1_auth_route.authRouter, prefix="/api/v1")
    app.include_router(v1_user_route.userRouter, prefix="/api/v1")
    app.include_router(v1_nin_route.ninRouter, prefix="/api/v1")
    app.include_router(v1_news_route.newsRouter, prefix="/api/v1")
    
    @app.get("/")
    async def root():
        return {
        "message": f"Welcome to {config.APP_NAME}",
        "version": config.VERSION
    }
    
    @app.get("/health")
    async def health():
        return {"status": "healthy"}
    
    return app


app = create_app()