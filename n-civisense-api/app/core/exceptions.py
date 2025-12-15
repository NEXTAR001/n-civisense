from typing import Any, Dict
from typing_extensions import Annotated
from annotated_doc import Doc
from fastapi import HTTPException, status

class UnauthorisedException(Exception):
    def __init__(self, status_code: int, detail: Any = None, headers: Dict[str, str] | None = None) -> None:
        super().__init__(status_code, detail, headers)
    
    #  def __init__(self, detail: str = "Unauthorised"):
    #     super().__init__(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail=detail,
    #         headers={"WWW-Authenticate": "Bearer"},
    #     )

class UnauthorizedException(Exception):
    def __init__(self, message="Unauthorized"):
        self.message = message
        super().__init__(self.message)

class NotFoundException(Exception):
    def __init__(self, message="Resource Not Found"):
        self.message = message
        super().__init__(self.message)
        

class BadRequestException(HTTPException):
    def __init__(self, detail: str = "Bad request"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
        )