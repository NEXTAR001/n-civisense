from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.user_service import signin, signup
from app.core.security import create_access_token
from app.db import get_db

authRouter = APIRouter(prefix="/auth", tags=['Auth'])

@authRouter.post("/signup", response_model=UserResponse)
def signup_user(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user with full name, email, password and confirm password."""
    new_user = signup(db, user)
    return {
        "success": True,
        "message": "User registered successfully",
        "id": new_user.id,
        "email": new_user.email,
        "full_name": new_user.full_name,
        "is_active": new_user.is_active
    }

@authRouter.post("/signin")
def signin_user(user: UserLogin, db: Session = Depends(get_db)):
    """Login with email and password."""
    authenticated_user = signin(db, user)
    access_token = create_access_token(data={"sub": authenticated_user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": authenticated_user.id,
            "email": authenticated_user.email,
            "full_name": authenticated_user.full_name
        }
    }