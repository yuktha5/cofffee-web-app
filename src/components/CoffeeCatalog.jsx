import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Star, Heart, BarChart2, Filter, ArrowUpDown, Sparkles, X, ChevronRight } from 'lucide-react';
import { COFFEES } from '../data/coffeeData';

export function CoffeeCatalog({ 
  onSelectCoffee, 
  favorites, 
  onToggleFavorite, 
  compareList, 
  onToggleCompare 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedRoast, setSelectedRoast] = useState('All');
  const [selectedBeanType, setSelectedBeanType] = useState('All');
  const [selectedProcess, setSelectedProcess] = useState('All');
  const [selectedBrew, setSelectedBrew] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Quick preset filter buttons
  const quickFilters = [
    { label: 'All Coffees', action: () => { setSelectedRegion('All'); setSelectedRoast('All'); setOnlyFavorites(false); } },
    { label: 'Indian Heritage 🇮🇳', action: () => { setSelectedRegion('India'); setOnlyFavorites(false); } },
    { label: 'Low Acidity (Smooth) 🌱', action: () => { setSelectedRoast('Medium-Dark'); setSelectedRegion('All'); setOnlyFavorites(false); } },
    { label: 'Floral & Bright 🌸', action: () => { setSelectedRoast('Light'); setSelectedRegion('All'); setOnlyFavorites(false); } },
    { label: 'Dark & Bold 🍫', action: () => { setSelectedRoast('Dark'); setSelectedRegion('All'); setOnlyFavorites(false); } },
    { label: 'My Favorites ❤️', action: () => setOnlyFavorites(true) },
  ];

  // Filtering and sorting logic
  const filteredCoffees = useMemo(() => {
    return COFFEES.filter((coffee) => {
      // Favorites toggle
      if (onlyFavorites && !favorites.includes(coffee.id)) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = coffee.name.toLowerCase().includes(q);
        const matchesOrigin = coffee.origin.toLowerCase().includes(q) || coffee.country.toLowerCase().includes(q);
        const matchesFlavors = coffee.flavorNotes.some(note => note.toLowerCase().includes(q));
        const matchesProcess = coffee.process.toLowerCase().includes(q);
        if (!matchesName && !matchesOrigin && !matchesFlavors && !matchesProcess) return false;
      }

      // Region Filter
      if (selectedRegion !== 'All' && coffee.region !== selectedRegion) return false;

      // Roast Filter
      if (selectedRoast !== 'All' && coffee.roastLevel !== selectedRoast) return false;

      // Bean Type
      if (selectedBeanType !== 'All' && coffee.beanType !== selectedBeanType) return false;

      // Process
      if (selectedProcess !== 'All' && coffee.process !== selectedProcess) return false;

      // Brew Method
      if (selectedBrew !== 'All' && !coffee.recommendedBrew.includes(selectedBrew)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'acidity-low') return a.acidity - b.acidity;
      if (sortBy === 'acidity-high') return b.acidity - a.acidity;
      if (sortBy === 'price-low') return a.pricePer250g - b.pricePer250g;
      if (sortBy === 'price-high') return b.pricePer250g - a.pricePer250g;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedRegion, selectedRoast, selectedBeanType, selectedProcess, selectedBrew, sortBy, onlyFavorites, favorites]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedRoast('All');
    setSelectedBeanType('All');
    setSelectedProcess('All');
    setSelectedBrew('All');
    setOnlyFavorites(false);
  };

  const hasActiveFilters = searchQuery || selectedRegion !== 'All' || selectedRoast !== 'All' || selectedBeanType !== 'All' || selectedProcess !== 'All' || selectedBrew !== 'All' || onlyFavorites;

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>World & Indian Specialty Roasts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Curated Coffee Catalog
          </h2>
          <p className="text-stone-400 text-sm mt-1 max-w-xl">
            Explore single-origins and heritage beans. Filter by roast, flavor notes, extraction method, or acidity.
          </p>
        </div>

        {/* Total Results Count */}
        <div className="flex items-center gap-2 text-xs font-medium text-stone-400">
          <span>Showing <strong className="text-amber-300">{filteredCoffees.length}</strong> of {COFFEES.length} coffees</span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-amber-400 hover:text-amber-300 underline ml-2 flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Search & Quick Chips Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by coffee name, origin (e.g. Chikmagalur), flavor (e.g. Cardamom, Jasmine)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-stone-500 text-sm outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 text-stone-200 text-sm font-medium focus:border-amber-500 outline-none cursor-pointer"
              >
                <option value="rating">⭐ Highest Rated</option>
                <option value="reviews">🔥 Most Reviewed</option>
                <option value="acidity-low">🌱 Lowest Acidity First</option>
                <option value="acidity-high">🍋 Brightest Acidity First</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="name">🔤 Name (A-Z)</option>
              </select>
              <ArrowUpDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </div>

            {/* Toggle Filters Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl border text-sm font-medium transition-all ${
                showAdvancedFilters || hasActiveFilters
                  ? 'bg-amber-950/80 border-amber-600 text-amber-200'
                  : 'bg-stone-900/90 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {quickFilters.map((qf, idx) => (
            <button
              key={idx}
              onClick={qf.action}
              className="px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-600/70 hover:text-amber-200 whitespace-nowrap transition-all"
            >
              {qf.label}
            </button>
          ))}
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="p-5 rounded-2xl bg-stone-950/80 border border-amber-950/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 animate-in fade-in duration-200 text-xs">
            
            {/* Region */}
            <div>
              <label className="block text-stone-400 font-semibold mb-1.5">Region / Origin</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 outline-none"
              >
                <option value="All">All Regions</option>
                <option value="India">India 🇮🇳</option>
                <option value="Africa">Africa</option>
                <option value="Latin America">Latin America</option>
                <option value="Asia-Pacific">Asia-Pacific</option>
              </select>
            </div>

            {/* Roast Level */}
            <div>
              <label className="block text-stone-400 font-semibold mb-1.5">Roast Profile</label>
              <select
                value={selectedRoast}
                onChange={(e) => setSelectedRoast(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 outline-none"
              >
                <option value="All">All Roasts</option>
                <option value="Light">Light Roast</option>
                <option value="Medium-Light">Medium-Light</option>
                <option value="Medium">Medium Roast</option>
                <option value="Medium-Dark">Medium-Dark</option>
                <option value="Dark">Dark Roast</option>
              </select>
            </div>

            {/* Bean Type */}
            <div>
              <label className="block text-stone-400 font-semibold mb-1.5">Bean Varietal</label>
              <select
                value={selectedBeanType}
                onChange={(e) => setSelectedBeanType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 outline-none"
              >
                <option value="All">All Types</option>
                <option value="Arabica">100% Arabica</option>
                <option value="Robusta">Robusta</option>
                <option value="Blend">Estate Blends</option>
              </select>
            </div>

            {/* Process */}
            <div>
              <label className="block text-stone-400 font-semibold mb-1.5">Processing Method</label>
              <select
                value={selectedProcess}
                onChange={(e) => setSelectedProcess(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 outline-none"
              >
                <option value="All">All Processes</option>
                <option value="Washed">Washed</option>
                <option value="Natural">Natural / Dry</option>
                <option value="Honey">Honey Processed</option>
                <option value="Monsooned">Monsooned (India)</option>
                <option value="Anaerobic Natural">Anaerobic Fermented</option>
              </select>
            </div>

            {/* Recommended Brew */}
            <div>
              <label className="block text-stone-400 font-semibold mb-1.5">Brew Method</label>
              <select
                value={selectedBrew}
                onChange={(e) => setSelectedBrew(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 outline-none"
              >
                <option value="All">All Brew Methods</option>
                <option value="South Indian Filter">South Indian Filter</option>
                <option value="Pour Over / V60">Pour Over / V60</option>
                <option value="French Press">French Press</option>
                <option value="Espresso">Espresso</option>
                <option value="Moka Pot">Moka Pot</option>
                <option value="Cold Brew">Cold Brew</option>
              </select>
            </div>

          </div>
        )}
      </div>

      {/* Coffee Cards Grid */}
      {filteredCoffees.length === 0 ? (
        <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800 p-8">
          <div className="w-16 h-16 rounded-full bg-amber-950/60 flex items-center justify-center mx-auto mb-4 text-2xl">
            ☕
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No coffees matched your filters</h3>
          <p className="text-stone-400 text-sm max-w-md mx-auto mb-6">
            Try adjusting your search keywords, broadening your roast preferences, or reset the filters below.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoffees.map((coffee) => {
            const isFav = favorites.includes(coffee.id);
            const isCompared = compareList.some(c => c.id === coffee.id);

            return (
              <div
                key={coffee.id}
                className="group relative rounded-3xl bg-[#170f0a] border border-stone-800/80 hover:border-amber-700/60 hover:shadow-2xl hover:shadow-amber-950/40 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Header Card Banner */}
                <div className={`h-28 bg-gradient-to-r ${coffee.imageColor} relative p-4 flex flex-col justify-between overflow-hidden`}>
                  {/* Subtle steam aesthetic */}
                  <div className="absolute inset-0 bg-black/20" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-amber-200 border border-white/10">
                      {coffee.country}
                    </span>
                    
                    {/* Action buttons (Favorite & Compare) */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCompare(coffee);
                        }}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                          isCompared
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-black/50 text-stone-300 hover:text-white'
                        }`}
                        title={isCompared ? 'Remove from compare' : 'Add to compare'}
                      >
                        <BarChart2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(coffee.id);
                        }}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                          isFav
                            ? 'bg-rose-600 text-white'
                            : 'bg-black/50 text-stone-300 hover:text-rose-400'
                        }`}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-200">
                    <span className="font-medium bg-black/40 px-2 py-0.5 rounded-md">
                      {coffee.roastLevel} Roast
                    </span>
                    <span className="font-mono text-amber-300 bg-black/40 px-2 py-0.5 rounded-md">
                      ₹{coffee.pricePer250g} / 250g
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Title & Subtitle */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {coffee.name}
                        </h3>
                        <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                          {coffee.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-950/70 border border-amber-800/40 px-2 py-1 rounded-lg shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-200">{coffee.rating}</span>
                        <span className="text-[10px] text-stone-400">({coffee.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Origin & Altitude */}
                    <p className="text-xs text-amber-400/80 font-medium mt-2">
                      📍 {coffee.origin} • <span className="text-stone-400">{coffee.elevation}</span>
                    </p>

                    {/* Flavor Notes Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {coffee.flavorNotes.map((note, nIdx) => (
                        <span
                          key={nIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery(note);
                          }}
                          className="px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-[11px] text-stone-300 hover:text-amber-300 hover:border-amber-700/50 cursor-pointer transition-colors"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Sensory Metrics Meters */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-800/60 mt-4 text-[10px]">
                      <div>
                        <div className="flex justify-between text-stone-400 mb-1">
                          <span>Acidity</span>
                          <span className="text-amber-300 font-mono">{coffee.acidity}/10</span>
                        </div>
                        <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${coffee.acidity * 10}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-stone-400 mb-1">
                          <span>Body</span>
                          <span className="text-amber-300 font-mono">{coffee.body}/10</span>
                        </div>
                        <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-600 h-full rounded-full" style={{ width: `${coffee.body * 10}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-stone-400 mb-1">
                          <span>Sweetness</span>
                          <span className="text-amber-300 font-mono">{coffee.sweetness}/10</span>
                        </div>
                        <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full rounded-full" style={{ width: `${coffee.sweetness * 10}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <button
                    onClick={() => onSelectCoffee(coffee)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-600 text-stone-200 hover:text-stone-950 font-semibold text-xs uppercase tracking-wider border border-stone-800 hover:border-amber-600 transition-all duration-200"
                  >
                    <span>View Tasting Profile & Brew</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
