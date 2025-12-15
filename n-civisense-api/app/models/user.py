from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from app.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String, index=True, nullable=False)
    password: Mapped[str] = mapped_column(String)
    is_active = Column(Boolean, default=True)