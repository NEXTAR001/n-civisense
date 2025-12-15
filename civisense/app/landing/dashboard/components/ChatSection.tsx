'use client';

import { DownloadIcon, ChevronDown, Globe, ArrowUp } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { GrNotification } from 'react-icons/gr';
import { useLanguage } from '../../context/LanguageContext';
import { languageList, LanguageCode } from '../../config/languages';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import VoiceInput from '@/components/VoiceInput';

// Dynamically import the NIN verification banner with SSR disabled
const NinVerificationBanner = dynamic(
  () => import('@/app/components/NinVerificationBanner'),
  { ssr: false }
);

interface Suggestion {
  id: string;
  text: string;
  key: string;
}

const suggestions: Suggestion[] = [
  { id: '1', key: 'dashboard.suggestions.passport', text: 'Track my passport application' },
  { id: '2', key: 'dashboard.suggestions.license', text: 'How do I apply for driver\'s license' },
  { id: '3', key: 'dashboard.suggestions.hospitals', text: 'Find nearby government hospitals' },
];

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Extend the TranslationFunction type to include our custom keys
type TranslationFunction = (key: string, fallback: string) => string;

interface ChatSectionProps {
  // Add any props if needed..
}

const ChatSection: React.FC<ChatSectionProps> = () => {
  const { language, setLanguage, t: translate } = useLanguage();
  const t = translate as unknown as TranslationFunction; // Type assertion for t function
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const currentLanguage = languageList.find(lang => lang.code === language);
  
  // Chat state
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const [selectedContext, setSelectedContext] = useState<'NIMC' | 'FIRS' | 'FRSC'>('NIMC');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsLanguageOpen(false);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { 
      id: uuidv4(), 
      role: 'user', 
      content: input 
    };
    const botMessageId = uuidv4();
    
    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: botMessageId, role: 'assistant', content: '' },
    ]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: input,
          context: selectedContext,
          session_id: sessionId,
        }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';
      let hasContent = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        
        buffer += chunkValue;
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.replace('data: ', '');
            if (jsonStr === '[DONE]') break;

            try {
              const data = JSON.parse(jsonStr);

              if (data.type === 'token') {
                hasContent = true;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, content: msg.content + data.text }
                      : msg
                  )
                );
              } else if (data.type === 'done') {
                console.log(`Latency: ${data.latency_ms}ms`);
                // Handle out-of-scope or complete response
                if (data.response && !hasContent) {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, content: data.response }
                        : msg
                    )
                  );
                }
              }
            } catch (err) {
              console.error('Error parsing JSON chunk', err);
            }
          }
        }
      }
      
      // If no content was received, show error
      if (!hasContent) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId && !msg.content
              ? { ...msg, content: 'No response received from the server.' }
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Stream Error:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, content: 'Error: Could not reach the server.' }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setInput(suggestionText);
  };

  const handleTranscription = (text: string) => {
    setInput(text);
    // Optional: Auto-send after transcription
    // You can trigger sendMessage here if you want
  };

  return (
    <main className="flex-1 flex flex-col relative">
      {/* Header */}
      <div className='absolute top-0 w-full z-10'>
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <button 
            onClick={() => {
              setMessages([]);
              setInput('');
            }}
            className="flex items-center gap-4 text-gray-700 hover:text-gray-900"
          >
            <DownloadIcon className='size-4' />
            <span className="text-sm">New chat</span>
          </button>
          <div className="flex items-center gap-4">
            {/* Context Selector */}
            <select
              value={selectedContext}
              onChange={(e) => setSelectedContext(e.target.value as any)}
              className="text-xs border rounded px-2 py-1"
            >
              <option value="NIMC">NIMC</option>
              <option value="FIRS">FIRS</option>
              <option value="FRSC">FRSC</option>
            </select>
            <GrNotification />
            <div className="w-8 h-8 rounded-full bg-teal-600"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-16 px-6 pb-4 overflow-hidden">
        {messages.length === 0 ? (
          // Initial State
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <div className="max-w-xl 2xl:max-w-3xl w-full text-center space-y-8">
              <div>
                <h1 className="text-2xl 2xl:text-3xl font-bold mb-1 2xl:mb-2">
                  {t('dashboard.greeting', 'Good Morning, Praise')}
                </h1>
                <p className="text-sm 2xl:text-base text-gray-600">
                  {t('dashboard.subtitle', 'Ask questions. Get Services. In your languages')}
                </p>
              </div>

              {/* Suggestion Pills */}
              <div className="flex justify-center gap-2 2xl:gap-3 flex-wrap">
                {suggestions.map((suggestion) => (
                  <button 
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(t(suggestion.key, suggestion.text))}
                    className="px-3 2xl:px-4 py-1.5 2xl:py-2 bg-white border border-gray-300 rounded-full text-[10px] 2xl:text-sm hover:bg-gray-50 whitespace-nowrap"
                  >
                    {t(suggestion.key, suggestion.text)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Messages View
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-green-600 text-white ml-auto'
                    : msg.role === 'system'
                    ? 'bg-red-100 text-red-600 mx-auto text-center text-sm'
                    : 'bg-gray-100 text-gray-800 mr-auto'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={sendMessage} className="mt-auto">
          <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-3 2xl:px-4 py-2.5 2xl:py-3 shadow-sm">
            {/* Language Selector */}
            <div className="relative" ref={languageRef}>
              <button
                type="button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 text-xs 2xl:text-sm text-gray-700 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isLanguageOpen}
              >
                <span>{currentLanguage?.name || 'English'}</span>
                <ChevronDown className={`size-3 2xl:size-4 transition-transform ${isLanguageOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  {languageList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code as LanguageCode)}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        language === lang.code
                          ? 'bg-gray-100 text-green-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('dashboard.placeholder', 'Ask about our pilot govt services: FIRS, NIMC & FRSC')}
              className="flex-1 border-none bg-transparent text-sm focus:outline-none"
              disabled={isLoading}
            />
            <VoiceInput 
              onTranscribe={handleTranscription}
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-green-600 text-white size-7 2xl:size-10 rounded-full flex items-center justify-center hover:bg-green-700 disabled:opacity-50"
            >
              <ArrowUp className='size-4 2xl:size-5'/>
            </button>
          </div>
        </form>
      </div>
      
      {/* NIN Verification Banner */}
      <div className="mt-auto">
        <NinVerificationBanner />
      </div>
    </main>
  );
};

export default ChatSection;
