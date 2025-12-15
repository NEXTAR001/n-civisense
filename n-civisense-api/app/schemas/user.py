from pydantic import BaseModel, EmailStr, ConfigDict, field_validator

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    
class UserCreate(UserBase):
    password: str
    confirm_password: str
    
    @field_validator('confirm_password')
    def passwords_match(cls, v, info):
        if 'password' in info.data and v != info.data['password']:
            raise ValueError('Passwords do not match')
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    
    model_config = ConfigDict(from_attributes=True)
    
class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    
    model_config = ConfigDict(from_attributes=True)
        
        
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None


# NIN Lookup Schemas
class NINLookupRequest(BaseModel):
    nin: str


class ResidenceDetails(BaseModel):
    address1: str | None = None
    address2: str | None = None
    town: str | None = None
    lga: str | None = None
    state: str | None = None


class NextOfKinDetails(BaseModel):
    firstname: str | None = None
    lastname: str | None = None
    middlename: str | None = None
    address1: str | None = None
    address2: str | None = None
    lga: str | None = None
    state: str | None = None
    town: str | None = None


class NINPersonalDetails(BaseModel):
    nin: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    middle_name: str | None = None
    date_of_birth: str | None = None
    gender: str | None = None
    phone_number: str | None = None
    email: str | None = None
    photo: str | None = None
    residence: ResidenceDetails | None = None
    title: str | None = None
    profession: str | None = None
    marital_status: str | None = None
    employment_status: str | None = None
    birth_state: str | None = None
    birth_country: str | None = None
    next_of_kin: NextOfKinDetails | None = None
    nspokenlang: str | None = None
    religion: str | None = None
    lga_of_origin: str | None = None
    place_of_origin: str | None = None
    state_of_origin: str | None = None
    signature: str | None = None
    tracking_id: str | None = None


class NINLookupResponse(BaseModel):
    success: bool
    message: str
    data: NINPersonalDetails | None = None


# News Feed Schemas
class NewsArticle(BaseModel):
    source_name: str
    title: str
    description: str | None = None
    url: str
    image_url: str | None = None
    published_at: str
    author: str | None = None
    content: str | None = None
    
    model_config = ConfigDict(from_attributes=True)


class NewsFeedResponse(BaseModel):
    success: bool
    category: str
    total_articles: int
    articles: list[NewsArticle]
    message: str | None = None


class NewsFeedCategoryList(BaseModel):
    categories: list[str] = ["agriculture", "health", "education"]