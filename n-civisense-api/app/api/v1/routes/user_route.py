from fastapi import APIRouter, Request

userRouter = APIRouter(prefix='/user', tags=['User'])

@userRouter.get("/me")
def get_profile(request: Request):
    return {"message": "User profile", "user": request.state.user}