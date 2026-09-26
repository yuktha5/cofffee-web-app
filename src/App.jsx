import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatToDrinkWidget } from './components/WhatToDrinkWidget';
import { WeatherWidget } from './components/WeatherWidget';
import { CoffeeCatalog } from './components/CoffeeCatalog';
import { IndianOriginExplorer } from './components/IndianOriginExplorer';
import { BrewingGuides } from './components/BrewingGuides';
import { FindMyCoffeeQuiz } from './components/FindMyCoffeeQuiz';
import { BeanGuide } from './components/BeanGuide';
import { BrewJournal } from './components/BrewJournal';
import { CoffeeModal } from './components/CoffeeModal';
import { CoffeeCompare } from './components/CoffeeCompare';
import { AiSommelier } from './components/AiSommelier';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { COFFEES } from './data/coffeeData';
import { BarChart2, ArrowRight } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState('catalog');

  // Persistence: Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('artisan_coffee_favorites');
      return saved ? JSON.parse(saved) : ['monsoon-malabar', 'chikmagalur-kaapi-royale'];
    } catch {
      return ['monsoon-malabar', 'chikmagalur-kaapi-royale'];
    }
  });

  // Persistence: Compare List (Max 3)
  const [compareList, setCompareList] = useState([]);

  // Persistence: Brew Journal Logs
  const [journalLogs, setJournalLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('artisan_coffee_journal');
      return saved ? JSON.parse(saved) : [
        {
          id: 'log-1',
          date: 'Sep 25, 2026',
          time: '08:30 AM',
          coffeeName: 'Monsoon Malabar AA',
          brewMethod: 'South Indian Filter',
          dose: '20g',
          grindSize: 'Medium-Fine',
          rating: 5,
          notes: 'Thick creamy decoction with boiled milk. Cedarwood and sweet cardamom notes with 0% acidity!'
        },
        {
          id: 'log-2',
          date: 'Sep 24, 2026',
          time: '04:15 PM',
          coffeeName: 'Ethiopian Yirgacheffe G1',
          brewMethod: 'Hario V60',
          dose: '15g',
          grindSize: 'Medium',
          rating: 5,
          notes: 'Intense jasmine bloom and sweet peach iced finish.'
        }
      ];
    } catch {
      return [];
    }
  });

  // Persistence: Reviews
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('artisan_coffee_reviews');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persistence: User Profile
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('artisan_coffee_user');
      return saved ? JSON.parse(saved) : {
        name: 'Yuktha',
        email: 'yuktha@coffeeexplorer.com',
        favoriteOrigin: 'Chikmagalur, India 🇮🇳'
      };
    } catch {
      return { name: 'Yuktha', email: 'yuktha@coffeeexplorer.com', favoriteOrigin: 'Chikmagalur, India 🇮🇳' };
    }
  });

  // Modal / Drawer States
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeBrewMethod, setActiveBrewMethod] = useState('south-indian-filter');

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('artisan_coffee_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('artisan_coffee_journal', JSON.stringify(journalLogs));
    } catch {}
  }, [journalLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('artisan_coffee_reviews', JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('artisan_coffee_user', JSON.stringify(currentUser));
    } catch {}
  }, [currentUser]);

  // Favorite toggle handler
  const handleToggleFavorite = (coffeeId) => {
    setFavorites(prev => 
      prev.includes(coffeeId) 
        ? prev.filter(id => id !== coffeeId)
        : [...prev, coffeeId]
    );
  };

  // Compare toggle handler
  const handleToggleCompare = (coffee) => {
    setCompareList(prev => {
      const exists = prev.some(c => c.id === coffee.id);
      if (exists) {
        return prev.filter(c => c.id !== coffee.id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 coffees simultaneously.');
        return prev;
      }
      return [...prev, coffee];
    });
  };

  const handleRemoveCompare = (coffeeId) => {
    setCompareList(prev => prev.filter(c => c.id !== coffeeId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Brew Journal handlers
  const handleAddLog = (newLog) => {
    setJournalLogs(prev => [newLog, ...prev]);
  };

  const handleDeleteLog = (logId) => {
    setJournalLogs(prev => prev.filter(l => l.id !== logId));
  };

  // Review handler
  const handleAddReview = (coffeeId, newReview) => {
    setReviews(prev => ({
      ...prev,
      [coffeeId]: [newReview, ...(prev[coffeeId] || [])]
    }));
  };

  // Jump to brew method in guide
  const handleSelectBrewMethod = (methodIdOrName) => {
    let targetId = 'south-indian-filter';
    if (typeof methodIdOrName === 'string') {
      const lower = methodIdOrName.toLowerCase();
      if (lower.includes('filter') || lower.includes('kaapi') || lower.includes('south')) targetId = 'south-indian-filter';
      else if (lower.includes('v60') || lower.includes('pour') || lower.includes('chemex')) targetId = 'v60-pour-over';
      else if (lower.includes('french')) targetId = 'french-press';
      else if (lower.includes('espresso')) targetId = 'espresso';
      else if (lower.includes('moka')) targetId = 'moka-pot';
      else if (lower.includes('aero')) targetId = 'aeropress';
      else if (lower.includes('cold')) targetId = 'cold-brew';
    }
    setActiveBrewMethod(targetId);
    setActiveSection('brewing');
    const el = document.getElementById('brewing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f0a06] text-[#f3ede4] selection:bg-amber-600 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        favoritesCount={favorites.length}
        compareCount={compareList.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Banner */}
        <Hero
          onStartQuiz={() => scrollToSection('quiz')}
          onExploreCatalog={() => scrollToSection('catalog')}
          onExploreIndia={() => scrollToSection('indian-origins')}
        />

        {/* Dynamic Widgets Section (What To Drink Now & Weather Guides) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <WhatToDrinkWidget
            onSelectCoffee={(c) => setSelectedCoffee(c)}
            onSelectBrewMethod={handleSelectBrewMethod}
          />

          <WeatherWidget
            onSelectCoffee={(c) => setSelectedCoffee(c)}
            onSelectBrewMethod={handleSelectBrewMethod}
          />
        </div>

        {/* Coffee Catalog (Search, Filter, Cards) */}
        <CoffeeCatalog
          onSelectCoffee={(c) => setSelectedCoffee(c)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          compareList={compareList}
          onToggleCompare={handleToggleCompare}
        />

        {/* Indian Origin Explorer 🇮🇳 */}
        <IndianOriginExplorer
          onSelectCoffee={(c) => setSelectedCoffee(c)}
          onSelectBrewMethod={handleSelectBrewMethod}
        />

        {/* Brewing Guides & Live Audio Timer */}
        <BrewingGuides
          preselectedMethodId={activeBrewMethod}
          onLogBrew={(name, dose, grind) => {
            handleAddLog({
              id: Date.now().toString(),
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              coffeeName: selectedCoffee?.name || 'Artisan Single Origin',
              brewMethod: name,
              dose,
              grindSize: grind,
              rating: 5,
              notes: 'Precision timed brew. Smooth extraction with clean notes.'
            });
            scrollToSection('journal');
          }}
        />

        {/* Find My Coffee Quiz */}
        <FindMyCoffeeQuiz
          onSelectCoffee={(c) => setSelectedCoffee(c)}
          onSelectBrewMethod={handleSelectBrewMethod}
        />

        {/* Bean Varietals & Processing Masterclass */}
        <BeanGuide />

        {/* Personal Coffee History / Tasting Journal */}
        <BrewJournal
          journalLogs={journalLogs}
          onAddLog={handleAddLog}
          onDeleteLog={handleDeleteLog}
        />
      </main>

      {/* Floating Compare Notification Bar */}
      {compareList.length > 0 && !isCompareOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setIsCompareOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow-2xl shadow-amber-950/80 transform hover:scale-105 transition-all"
          >
            <BarChart2 className="w-5 h-5 text-stone-950" />
            <span>Compare {compareList.length} Coffees</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modals & Overlays */}
      <CoffeeModal
        coffee={selectedCoffee}
        onClose={() => setSelectedCoffee(null)}
        isFavorite={selectedCoffee ? favorites.includes(selectedCoffee.id) : false}
        onToggleFavorite={handleToggleFavorite}
        isCompared={selectedCoffee ? compareList.some(c => c.id === selectedCoffee.id) : false}
        onToggleCompare={handleToggleCompare}
        onSelectBrewMethod={handleSelectBrewMethod}
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      <CoffeeCompare
        compareList={compareList}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
        onClose={() => setIsCompareOpen(false)}
        onSelectCoffee={(c) => {
          setIsCompareOpen(false);
          setSelectedCoffee(c);
        }}
        onSelectBrewMethod={handleSelectBrewMethod}
      />

      <AiSommelier
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onSelectCoffee={(c) => {
          setIsAiOpen(false);
          setSelectedCoffee(c);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onSaveUser={setCurrentUser}
        favoritesCount={favorites.length}
        brewsCount={journalLogs.length}
        reviewsCount={Object.values(reviews).flat().length}
      />

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

    </div>
  );
}

export default App;
