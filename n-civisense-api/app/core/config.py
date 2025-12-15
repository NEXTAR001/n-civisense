from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv
from pathlib import Path
import os
load_dotenv()


print("=" * 60)
print("DEBUG INFO")
print("=" * 60)
print(f"Current directory: {os.getcwd()}")
print(f".env exists: {Path('.env').exists()}")
print(f".env path: {Path('.env').absolute()}")

# Load .env explicitly
loaded = load_dotenv(verbose=True)
print(f".env loaded: {loaded}")

# Check if variables are in environment
print(f"SECRET_KEY in env: {'SECRET_KEY' in os.environ}")
print(f"DATABASE_URL in env: {'DATABASE_URL' in os.environ}")

if "SECRET_KEY" in os.environ:
    print(f"SECRET_KEY value: {os.environ['SECRET_KEY'][:10]}...")
if "DATABASE_URL" in os.environ:
    print(f"DATABASE_URL value: {os.environ['DATABASE_URL'][:30]}...")
print("=" * 60)

class Config(BaseSettings):
    APP_NAME: str = "n-CiviSense API"
    SECRET_KEY: str = os.getenv('SECRET_KEY', '9C4B9A12D232655421ED')
    ALGORITHM: str = os.getenv('ALGORITHM', 'HS256')
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 30)) 
    VERSION: str = "1.0.0"
    DATABASE_URL: str = os.getenv('DATABASE_URL', "postgresql://fredrickanyanwu@localhost:5432/n-civisense?schema=public")
    
    # class Settings:
    #     env_file = ".env"
    #     case_sensitive = True
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )
        

try:
    config = Config() 
    print("✅ Settings loaded successfully!")
except Exception as e:
    print(f"❌ Error loading settings: {e}")
    raise        


# class Settings(BaseSettings):
#     APP_NAME: str = "n-CiviSense API"
#     SECRET_KEY: str
#     ALGORITHM: str
#     ACCESS_TOKEN_EXPIRE_MINUTES: int
#     VERSION: str = "5"
#     DATABASE_URL: str
    
#     model_config = SettingsConfigDict(
#         env_file=".env",
#         env_file_encoding="utf-8",
#         case_sensitive=True,
#         extra="ignore"
#     )

# try:
#     settings = Settings()
#     print("✅ Settings loaded successfully!")
# except Exception as e:
    # print(f"❌ Error loading settings: {e}")
    # raise