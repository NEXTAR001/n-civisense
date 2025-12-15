from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from passlib.hash import bcrypt
from app.core.exceptions import UnauthorizedException, NotFoundException
from fastapi import HTTPException, status
from app.core.security import get_password_hash, verify_password
import httpx
import os


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def signup(db: Session, user: UserCreate):
    # Check if user with email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Validate password and confirm_password match
    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    # Hash password
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, full_name=user.full_name, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def signin(db: Session, user: UserLogin) -> User:
    # Find user by email only
    db_user = db.query(User).filter(User.email == user.email).first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    return db_user


async def lookup_nin_external(nin: str):
    """
    Lookup NIN details from LumiID API.
    This function calls LumiID service to verify and retrieve user details using NIN.
    No data is saved to the database.
    
    Args:
        nin: National Identification Number (11 digits)
        
    Returns:
        Dictionary containing user details from the LumiID API
    """
    
    # Validate NIN format
    if not nin or len(nin) != 11 or not nin.isdigit():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid NIN format. NIN must be 11 digits"
        )
    
    # Get LumiID API configuration from environment
    # Use nin-basic for essential data or nin-premium for full details with photo
    external_api_url = os.getenv('LUMIID_API_URL', 'https://lumiid.com/api/v1/ng/nin-premium')
    api_key = os.getenv('LUMIID_API_KEY', '')
    
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="NIN verification service is not configured"
        )
    
    try:
        async with httpx.AsyncClient() as client:
            # LumiID NIN verification uses POST request with JSON body
            headers = {
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            }
            
            payload = {
                'nin': nin
            }
            
            response = await client.post(
                external_api_url,
                json=payload,
                headers=headers,
                timeout=10.0
            )
            
            # Log response for debugging
            print(f"API Response Status: {response.status_code}")
            print(f"API Response Body: {response.text}")
            print('Response JSON:', response.json())
            
            if response.status_code == 200:
                try:
                    
                    response_data = response.json()
                    
                    # Check if LumiID returned success status
                    if response_data.get('status') == 'success':
                        return response_data
                    else:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail=response_data.get('message', 'NIN verification failed')
                        )
                        
                except Exception as json_err:
                    raise HTTPException(
                        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        detail=f"Invalid JSON response from NIN verification service: {str(json_err)}"
                    )
            elif response.status_code == 400:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Missing or invalid NIN field"
                )
            elif response.status_code == 401:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Invalid or expired API key. Check your LumiID credentials."
                )
            elif response.status_code == 404:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="NIN record not found"
                )
            else:
                error_detail = response.text if response.text else f"HTTP {response.status_code}"
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"NIN verification service error: {error_detail}"
                )
                
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="NIN verification service timeout"
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to connect to NIN verification service: {str(e)}"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error during NIN verification: {str(e)}"
        )
