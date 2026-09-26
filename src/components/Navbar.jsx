import React, { useState } from 'react';
import { Coffee, Heart, BarChart2, User, Sparkles, BookOpen, MapPin, Droplets, HelpCircle, Menu, X } from 'lucide-react';

export function Navbar({ 
  activeSection, 
  setActiveSection, 
  favoritesCount, 
  compareCount, 
  onOpenCompare, 
  onOpenAuth, 
  currentUser, 
  onOpenAi 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'catalog', label: 'Coffee Catalog', icon: Coffee },
    { id: 'indian-origins', label: 'Indian Origins 🇮🇳', icon: MapPin },
    { id: 'brewing', label: 'Brew Guides & Timer', icon: Droplets },
    { id: 'quiz', label: 'Find My Coffee', icon: Sparkles },
    { id: 'beans', label: 'Bean Science', icon: BookOpen },
    { id: 'journal', label: 'Brew Journal', icon: BookOpen },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#140d08]/90 backdrop-blur-md border-b border-amber-900/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('catalog')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 p-0.5 shadow-lg shadow-amber-950/50 flex items-center justify-center transform group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#1b120c] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <Coffee className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -top-1 right-2 text-xs text-amber-200/60 animate-steam">~</span>
                <span className="absolute -top-2 left-3 text-xs text-amber-200/60 animate-steam" style={{ animationDelay: '0.8s' }}>~</span>
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Artisan Kaapi & Brew
              </span>
              <p className="text-[11px] text-amber-300/60 tracking-wider uppercase font-medium">
                Single Origin & Heritage Explorer
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-900/40 text-amber-300 border border-amber-700/40 shadow-inner'
                      : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600/30 to-yellow-600/30 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-medium hover:border-amber-400 hover:scale-105 transition-all shadow-md shadow-amber-950/40"
              title="Open AI Coffee Assistant"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">AI Barista</span>
            </button>

            {/* Compare Button */}
            <button
              onClick={onOpenCompare}
              className="relative p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-800/60 transition-all"
              title="Compare Coffees"
            >
              <BarChart2 className="w-4 h-4" />
              {compareCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Favorites Wishlist */}
            <button
              onClick={() => handleNavClick('catalog')}
              className="relative p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-rose-400 hover:border-rose-900/60 transition-all"
              title="Favorite Coffees"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* User Profile Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-gradient-to-r from-stone-900 to-amber-950/40 border border-amber-900/50 hover:border-amber-600/70 text-stone-200 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-xs">
                {currentUser ? currentUser.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
              <span className="text-xs font-medium hidden md:inline group-hover:text-amber-300">
                {currentUser ? currentUser.name : 'Sign In'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-300 hover:text-amber-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-amber-900/30 bg-[#160f0a] space-y-1 px-2 rounded-b-2xl shadow-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-900/40 text-amber-300 border border-amber-700/50'
                      : 'text-stone-300 hover:bg-stone-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
