from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin
from app.services.user_service import signin, signup
from app.core.security import create_access_token
from app.db import get_db

authRouter = APIRouter(prefix="/auth", tags=['Auth'])

@authRouter.post("/signup")
def signup_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = signup(db, user)
    access_token = create_access_token(data={"sub": new_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@authRouter.post("/signin")
def signin_user(user: UserLogin, db: Session = Depends(get_db)):
    authenticated_user = signin(db, user)
    access_token = create_access_token(data={"sub": authenticated_user.email})
    return {"access_token": access_token, "token_type": "bearer"}