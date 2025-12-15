from fastapi import APIRouter, HTTPException, Query, status
from app.schemas.user import NewsFeedResponse, NewsFeedCategoryList
from app.services.news_service import fetch_news_by_category, fetch_latest_news

newsRouter = APIRouter(prefix="/news", tags=["News Feed"])


@newsRouter.get("/categories", response_model=NewsFeedCategoryList)
async def get_news_categories():
    """
    Get list of available news categories.
    
    Returns:
        List of supported categories for filtering news
    """
    return {
        "categories": ["agriculture", "health", "education"]
    }


@newsRouter.get("/latest", response_model=NewsFeedResponse)
async def get_latest_news(days: int = Query(7, ge=1, le=30)):
    """
    Get latest news across all government program categories.
    
    Args:
        days: Number of days to look back (1-30, default 7)
        
    Returns:
        NewsFeedResponse with articles from all categories, sorted by most recent
    """
    try:
        result = await fetch_latest_news(days)
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch latest news: {str(e)}"
        )


@newsRouter.get("/category/{category}", response_model=NewsFeedResponse)
async def get_news_by_category(
    category: str,
    days: int = Query(7, ge=1, le=30)
):
    """
    Get news filtered by specific category.
    
    Args:
        category: News category - agriculture, health, or education
        days: Number of days to look back (1-30, default 7)
        
    Returns:
        NewsFeedResponse with articles for the specified category
        
    Raises:
        HTTPException: If category is invalid or service unavailable
    """
    
    # Validate category
    valid_categories = ["agriculture", "health", "education"]
    if category.lower() not in valid_categories:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid category '{category}'. Supported: {', '.join(valid_categories)}"
        )
    
    try:
        result = await fetch_news_by_category(category, days)
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch news for category '{category}': {str(e)}"
        )


@newsRouter.get("/agriculture", response_model=NewsFeedResponse)
async def get_agriculture_news(days: int = Query(7, ge=1, le=30)):
    """
    Get latest agriculture government program news.
    
    Args:
        days: Number of days to look back (1-30, default 7)
        
    Returns:
        NewsFeedResponse with agriculture news articles
    """
    return await get_news_by_category("agriculture", days)


@newsRouter.get("/health", response_model=NewsFeedResponse)
async def get_health_news(days: int = Query(7, ge=1, le=30)):
    """
    Get latest health government program news.
    
    Args:
        days: Number of days to look back (1-30, default 7)
        
    Returns:
        NewsFeedResponse with health news articles
    """
    return await get_news_by_category("health", days)


@newsRouter.get("/education", response_model=NewsFeedResponse)
async def get_education_news(days: int = Query(7, ge=1, le=30)):
    """
    Get latest education government program news.
    
    Args:
        days: Number of days to look back (1-30, default 7)
        
    Returns:
        NewsFeedResponse with education news articles
    """
    return await get_news_by_category("education", days)
