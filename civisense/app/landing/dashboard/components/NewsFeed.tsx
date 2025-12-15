'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Server, ServerOff, Loader2, ImageOff } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  imageUrl: string;
  category: 'all' | 'education' | 'agriculture' | 'health';
  publishedAt: string;
  summary?: string;
  source?: string;
  url?: string;
}

interface ApiNewsItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  publishedAt: string;
  summary?: string;
  source?: string;
  url?: string;
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'education' | 'agriculture' | 'health'>('all');
  const [newsByCategory, setNewsByCategory] = useState<Record<string, NewsItem[]>>({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const getImageUrl = (url: string | undefined): string | null => {
    if (!url || url.trim() === '') return null;
    
    try {
      // Handle relative URLs
      if (url.startsWith('//')) {
        return `https:${url}`;
      }
      
      // Handle protocol-relative URLs
      if (url.startsWith('/')) {
        return `https://n-civisense-api.onrender.com${url}`;
      }
      
      // Ensure URL is absolute
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      
      return null;
    } catch (error) {
      console.error('Error processing image URL:', url, error);
      return null;
    }
  };

  const mapApiNewsToNewsItem = (apiItem: any, category: string = 'all'): NewsItem => {
    // Extract the category from the item or use the provided category
    const itemCategory = apiItem.category?.toLowerCase() || category;
    // Ensure the category is one of the allowed values
    const validCategory = ['education', 'agriculture', 'health'].includes(itemCategory) 
      ? itemCategory as 'education' | 'agriculture' | 'health'
      : 'all';

    return {
      id: apiItem.id || Math.random().toString(36).substr(2, 9),
      title: apiItem.title || 'Untitled',
      imageUrl: apiItem.image_url || apiItem.imageUrl || '',
      category: validCategory,
      publishedAt: apiItem.published_at || apiItem.publishedAt || new Date().toISOString(),
      summary: apiItem.description || apiItem.summary || '',
      source: apiItem.source_name || apiItem.source || 'Unknown',
      url: apiItem.url || '#'
    };
  };

  const fetchNewsByCategory = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use our Next.js API route as a proxy
      const apiPath = category === 'all' ? 'latest' : category;
      const response = await fetch(`/api/news?category=${apiPath}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch news');
      }
      
      const responseData = await response.json();
      console.log('API Response:', responseData);
      
      // Handle the response format: { success, category, total_articles, articles, message }
      let articles = [];
      if (responseData.success && Array.isArray(responseData.articles)) {
        articles = responseData.articles;
      } else if (Array.isArray(responseData)) {
        // Fallback for direct array response
        articles = responseData;
      } else if (responseData.articles) {
        // Fallback for other formats with articles array
        articles = responseData.articles;
      }
      
      if (!Array.isArray(articles)) {
        console.error('Invalid articles data structure:', responseData);
        throw new Error('Invalid news data format');
      }

      // If no articles, return empty array to show empty state
      if (articles.length === 0) {
        console.log(`No articles found for category: ${category}`);
        return [];
      }

      const formattedNews = articles.map(item => mapApiNewsToNewsItem(item, category));
      console.log(`Fetched ${formattedNews.length} news items for category: ${category}`);
      return formattedNews;
    } catch (err) {
      console.error(`Error fetching ${category} news:`, err);
      throw err;
    }
  };

  useEffect(() => {
    const loadInitialNews = async () => {
      try {
        setLoading(true);
        // Fetch all news initially
        const allNews = await fetchNewsByCategory('all');
        setNewsByCategory(prev => ({
          ...prev,
          all: allNews
        }));
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? `Failed to load news: ${err.message}`
          : 'An unknown error occurred while loading news';
        setError(errorMessage);
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    loadInitialNews();
  }, []);

  useEffect(() => {
    if (isInitialLoad) return;
    
    const loadCategoryNews = async () => {
      console.log('Loading category news:', { activeFilter, hasCategory: !!newsByCategory[activeFilter] });
      
      // Skip if we already have this category's news
      if (newsByCategory[activeFilter]) {
        console.log('Using cached news for category:', activeFilter);
        setLoading(false); // Ensure loading is false when using cached data
        return;
      }
      
      try {
        setLoading(true); // Ensure loading is true when starting to fetch
        console.log('Fetching news for category:', activeFilter);
        const categoryNews = await fetchNewsByCategory(activeFilter);
        
        console.log('Fetched news for category:', {
          category: activeFilter,
          count: categoryNews.length,
          firstItem: categoryNews[0]
        });
        
        setNewsByCategory(prev => {
          const updated = {
            ...prev,
            [activeFilter]: categoryNews
          };
          console.log('Updated newsByCategory:', Object.keys(updated));
          return updated;
        });
      } catch (err) {
        console.error(`Error loading ${activeFilter} news:`, err);
        setError(`Failed to load ${activeFilter} news. Please try again.`);
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    if (!isInitialLoad) {
      loadCategoryNews();
    }
  }, [activeFilter, isInitialLoad, newsByCategory]);

  const filteredNews = React.useMemo(() => {
    const newsItems = newsByCategory[activeFilter] || [];
    console.log(`Filtered ${newsItems.length} items for category: ${activeFilter}`, {
      activeFilter,
      availableCategories: Object.keys(newsByCategory),
      newsItems
    });
    return newsItems;
  }, [newsByCategory, activeFilter]);

  const filters = [
    { id: 'all', label: 'Recent Posts' },
    { id: 'education', label: 'Education' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'health', label: 'Health' },
  ];

  return (
    <aside className="w-60 xl:w-72 2xl:w-80 bg-gray-50 border-l border-gray-200 p-6 flex flex-col">
      <div className='w-full flex items-center justify-between mb-5 2xl:mb-10'>
        <h3 className="text-sm xl:text-md 2xl:text-lg font-semibold">News Feeds</h3>
        <Server className='text-black size-3 xl:size-4 2xl:size-5' />
      </div>
      <div className="flex flex-wrap justify-between mb-4">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as any)}
            className={`text-[8px] xl:text-[10px] 2xl:text-xs py-1 rounded-full transition-colors ${activeFilter === filter.id
              ? 'text-black font-medium underline decoration-[#16A34A] underline-offset-6 decoration-2'
              : 'text-gray-500 hover:bg-gray-100'
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="space-y-2 overflow-y-auto">
        {loading ? (
          <div className="space-y-4">
            {/* Main featured skeleton */}
            <div className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-40 w-full"></div>
              <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            
            {/* Grid skeleton */}
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="bg-gray-200 rounded-lg h-24 w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            {error}
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-green-600 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : filteredNews.length > 0 ? (
          <>
            <div className="relative">
              <a 
                href={filteredNews[0].url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                {imageErrors[filteredNews[0].id] || !getImageUrl(filteredNews[0].imageUrl) ? (
                  <div className="flex items-center justify-center bg-gray-100 rounded-lg w-full h-28 xl:h-36 2xl:h-48">
                    <ImageOff className="h-8 w-8 text-gray-400" />
                  </div>
                ) : (
                  <Image
                    src={getImageUrl(filteredNews[0].imageUrl)!}
                    alt={filteredNews[0].title}
                    width={320}
                    height={180}
                    className="rounded-lg object-cover w-full h-28 xl:h-36 2xl:h-48"
                    onError={() => handleImageError(filteredNews[0].id)}
                    priority
                  />
                )}
                <div className="absolute inset-0 rounded-lg bg-black/30" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] xl:text-xs font-bold">
                  {filteredNews[0].title}
                </div>
                {filteredNews[0].source && (
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-[8px] px-2 py-1 rounded">
                    {filteredNews[0].source}
                  </div>
                )}
              </a>
            </div>

            {filteredNews.length > 1 && (
              <div className="grid grid-cols-2 gap-2">
                {filteredNews.slice(1, 5).map((news) => (
                  <a 
                    key={news.id} 
                    href={news.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative h-20 xl:h-28 2xl:h-32 block"
                  >
                    {imageErrors[news.id] || !getImageUrl(news.imageUrl) ? (
                      <div className="flex items-center justify-center bg-gray-100 rounded-lg w-full h-full">
                        <ImageOff className="h-6 w-6 text-gray-400" />
                      </div>
                    ) : (
                      <Image
                        src={getImageUrl(news.imageUrl)!}
                        alt={news.title}
                        fill
                        className="rounded-lg object-cover"
                        onError={() => handleImageError(news.id)}
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    )}
                    <div className="absolute inset-0 rounded-lg bg-black/30" />
                    <div className="absolute bottom-1 left-1 right-1 text-white text-[10px] font-bold">
                      {news.title}
                    </div>
                    {news.source && (
                      <div className="absolute top-1 right-1 bg-black/50 text-white text-[6px] px-1 rounded">
                        {news.source}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No news found in this category
          </div>
        )}
      </div>
    </aside>
  );
};

export default NewsFeed;