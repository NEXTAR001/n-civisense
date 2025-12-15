import httpx
import os
from fastapi import HTTPException, status
from datetime import datetime, timedelta
from typing import Optional

# Supported categories with relevant keywords for government programs
CATEGORY_KEYWORDS = {
    "agriculture": "agriculture government Nigeria",
    "health": "health government Nigeria",
    "education": "education government Nigeria"
}


async def fetch_news_by_category(category: str, days_back: int = 7) -> dict:
    """
    Fetch news articles from NewsAPI.org based on category.
    Filters for Nigerian government programs.
    
    Args:
        category: Category type - agriculture, health, or education
        days_back: Number of days to look back (default 7 days)
        
    Returns:
        Dictionary containing articles and metadata
    """
    
    # Validate category
    if category.lower() not in CATEGORY_KEYWORDS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid category. Supported categories: {', '.join(CATEGORY_KEYWORDS.keys())}"
        )
    
    # Get NewsAPI key from environment
    api_key = os.getenv('NEWS_API_KEY', '')
    
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="News service is not configured"
        )
    
    # NewsAPI endpoint
    url = os.getenv('NEWS_API_URL', 'https://newsapi.org/v2/everything')
    
    # Calculate date range
    to_date = datetime.utcnow().date()
    from_date = to_date - timedelta(days=days_back)
    
    # Build query with keywords for the category
    keywords = CATEGORY_KEYWORDS[category.lower()]
    
    params = {
        "q": keywords,
        "sortBy": "publishedAt",
        "language": "en",
        "from": str(from_date),
        "to": str(to_date),
        "apiKey": api_key,
        "pageSize": 20  # Fetch up to 20 articles
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                url,
                params=params,
                timeout=10.0
            )
            
            # Log response for debugging
            print(f"NewsAPI Response Status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get('status') == 'ok':
                    articles = data.get('articles', [])
                    
                    # Format articles to match our schema
                    formatted_articles = []
                    for article in articles:
                        formatted_articles.append({
                            "source_name": article.get('source', {}).get('name', 'Unknown'),
                            "title": article.get('title', ''),
                            "description": article.get('description'),
                            "url": article.get('url', ''),
                            "image_url": article.get('urlToImage'),
                            "published_at": article.get('publishedAt', ''),
                            "author": article.get('author'),
                            "content": article.get('content')
                        })
                    
                    return {
                        "success": True,
                        "category": category.lower(),
                        "articles": formatted_articles,
                        "total_articles": len(formatted_articles),
                        "message": f"Found {len(formatted_articles)} articles"
                    }
                else:
                    error_msg = data.get('message', 'Failed to fetch news')
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"NewsAPI error: {error_msg}"
                    )
            
            elif response.status_code == 401:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Invalid or expired NewsAPI key"
                )
            
            elif response.status_code == 429:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Too many requests to news service. Please try again later."
                )
            
            else:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"News service error: HTTP {response.status_code}"
                )
    
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="News service timeout"
        )
    
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to connect to news service: {str(e)}"
        )
    
    except HTTPException:
        raise
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error fetching news: {str(e)}"
        )


async def fetch_latest_news(days_back: int = 7) -> dict:
    """
    Fetch latest news across all categories.
    
    Args:
        days_back: Number of days to look back (default 7 days)
        
    Returns:
        Dictionary containing articles from all categories
    """
    
    all_articles = []
    
    # Fetch news for each category
    for category in CATEGORY_KEYWORDS.keys():
        try:
            result = await fetch_news_by_category(category, days_back)
            all_articles.extend(result.get('articles', []))
        except HTTPException:
            # Continue fetching other categories if one fails
            continue
    
    # Sort by published date (most recent first)
    all_articles.sort(
        key=lambda x: x.get('published_at', ''),
        reverse=True
    )
    
    return {
        "success": True,
        "category": "all",
        "articles": all_articles[:30],  # Limit to 30 most recent
        "total_articles": len(all_articles),
        "message": f"Found {len(all_articles)} articles across all categories"
    }
