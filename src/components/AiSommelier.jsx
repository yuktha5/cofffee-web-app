import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, Bot, User, Coffee, ArrowRight, CornerDownLeft } from 'lucide-react';
import { getAiBaristaResponse } from '../utils/aiBarista';
import { COFFEES } from '../data/coffeeData';

export function AiSommelier({ isOpen, onClose, onSelectCoffee }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '☕ **Namaste & Welcome!** I am your **AI Coffee Sommelier & Master Barista**.\n\nWhether you need help troubleshooting a sour or bitter brew, dialing in authentic South Indian Degree Kaapi, or finding the perfect single origin for your palate, ask me anything!',
      coffeeId: null
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Why is my coffee tasting sour?',
    'Secret to authentic South Indian Filter Kaapi?',
    'What makes Monsoon Malabar so unique?',
    'Best low-acid coffee for sensitive stomach?',
    'How do I dial in my French Press?'
  ];

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSend = (queryToSend) => {
    const q = queryToSend || inputText;
    if (!q.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: q, coffeeId: null }];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    // Simulate barista thinking
    setTimeout(() => {
      const response = getAiBaristaResponse(q);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: response.answer,
          coffeeId: response.recommendedCoffee
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg h-full sm:h-[94vh] sm:my-auto sm:mr-4 bg-[#160f0a] border border-amber-900/50 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-800 bg-[#19110c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-950/50">
              <Sparkles className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                <span>AI Coffee Sommelier</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-xs text-amber-300/80 font-medium">Expert Barista & Flavor Scientist</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-stone-950/70 border-b border-stone-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-600 hover:text-amber-200 whitespace-nowrap transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {messages.map((msg, idx) => {
            const isBot = msg.sender === 'bot';
            const matchedCoffee = msg.coffeeId ? COFFEES.find(c => c.id === msg.coffeeId) : null;

            return (
              <div key={idx} className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`space-y-3 max-w-[85%] ${isBot ? 'text-stone-200' : 'text-stone-950'}`}>
                  <div className={`p-4 rounded-2xl whitespace-pre-line leading-relaxed ${
                    isBot 
                      ? 'bg-stone-900/90 border border-stone-800 text-stone-200' 
                      : 'bg-amber-500 font-semibold text-stone-950 ml-auto'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Inline Recommended Coffee Card */}
                  {matchedCoffee && (
                    <div className="p-3.5 rounded-2xl bg-stone-950 border border-amber-900/70 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">Recommended Bean</span>
                        <strong className="text-white text-sm block">{matchedCoffee.name}</strong>
                        <span className="text-stone-400 text-[11px]">{matchedCoffee.country} • {matchedCoffee.roastLevel}</span>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectCoffee(matchedCoffee);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1 shrink-0"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-stone-800 flex items-center justify-center text-stone-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-amber-400/80 italic">
              <Bot className="w-4 h-4 animate-bounce" />
              <span>Barista is formulating answer...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#19110c] border-t border-stone-800">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about brewing, acidity, beans, or recipes..."
              className="flex-1 p-3 rounded-2xl bg-stone-950 border border-stone-800 focus:border-amber-500 text-white text-xs sm:text-sm outline-none transition-all placeholder-stone-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 rounded-2xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-stone-950 font-bold transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
