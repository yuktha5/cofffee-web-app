import React, { useState, useEffect } from 'react';
import { X, Star, Heart, BarChart2, Droplets, MapPin, Award, Coffee, Clock, Utensils, Send, Check } from 'lucide-react';

export function CoffeeModal({ 
  coffee, 
  onClose, 
  isFavorite, 
  onToggleFavorite, 
  isCompared, 
  onToggleCompare, 
  onSelectBrewMethod,
  reviews,
  onAddReview
}) {
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newBrewMethod, setNewBrewMethod] = useState(coffee?.recommendedBrew[0] || 'V60');
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!coffee) return null;

  const coffeeReviews = reviews[coffee.id] || [
    { author: 'Vikram R.', rating: 5, brew: coffee.recommendedBrew[0], date: '3 days ago', text: 'Incredible aromatics! Notes of chocolate and cardamom come through vividly in a South Indian filter.' },
    { author: 'Priya M.', rating: 5, brew: 'Pour Over', date: '1 week ago', text: 'Exceptionally clean and sweet. One of the finest single-origin roasts I have tried this year.' },
    { author: 'Arjun K.', rating: 4, brew: 'French Press', date: '2 weeks ago', text: 'Super heavy body and lingering finish. Perfect for morning brewing.' },
  ];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddReview(coffee.id, {
      author: newAuthor.trim() || 'Fellow Coffee Lover',
      rating: newRating,
      brew: newBrewMethod,
      date: 'Just now',
      text: newComment.trim()
    });

    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#160f0a] border border-amber-900/40 rounded-3xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with gradient */}
        <div className={`relative h-44 sm:h-52 bg-gradient-to-r ${coffee.imageColor} p-6 flex flex-col justify-between text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          
          {/* Top Bar with Dismiss */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-semibold text-amber-200">
                {coffee.country}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-semibold text-stone-200">
                {coffee.beanType}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(coffee.id)}
                className={`p-2.5 rounded-2xl backdrop-blur-md transition-all ${
                  isFavorite ? 'bg-rose-600 text-white' : 'bg-black/50 text-stone-300 hover:text-rose-400'
                }`}
                title={isFavorite ? 'Remove favorite' : 'Add favorite'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => onToggleCompare(coffee)}
                className={`p-2.5 rounded-2xl backdrop-blur-md transition-all ${
                  isCompared ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-black/50 text-stone-300 hover:text-white'
                }`}
                title={isCompared ? 'Remove from compare' : 'Add to compare'}
              >
                <BarChart2 className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-black/50 text-stone-300 hover:text-white hover:bg-black/70 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title Area */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {coffee.name}
            </h2>
            <p className="text-sm text-amber-200 font-medium mt-0.5">
              {coffee.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-8">
          
          {/* Key Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <span className="text-stone-400 block mb-1">Estate & Region</span>
              <span className="font-semibold text-white">{coffee.origin}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <span className="text-stone-400 block mb-1">Elevation / Altitude</span>
              <span className="font-semibold text-amber-300">{coffee.elevation}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <span className="text-stone-400 block mb-1">Process Method</span>
              <span className="font-semibold text-white">{coffee.process}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800">
              <span className="text-stone-400 block mb-1">Roast Profile</span>
              <span className="font-semibold text-amber-400">{coffee.roastLevel}</span>
            </div>
          </div>

          {/* Story & Description */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Origin Story & Character</span>
            </h4>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed bg-stone-900/40 p-4 rounded-2xl border border-stone-800/80">
              {coffee.description}
            </p>
          </div>

          {/* Flavor Notes & Sensory Gauges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Flavor Notes */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider">
                Tasting Notes Palette
              </h4>
              <div className="flex flex-wrap gap-2">
                {coffee.flavorNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800/50 text-amber-200 text-xs font-medium"
                  >
                    ✨ {note}
                  </span>
                ))}
              </div>

              {/* Food Pairing */}
              <div className="p-3.5 rounded-2xl bg-stone-900/40 border border-stone-800 text-xs mt-4">
                <span className="text-stone-400 font-semibold flex items-center gap-1.5 mb-1 text-amber-300">
                  <Utensils className="w-3.5 h-3.5" /> Ideal Food & Dessert Pairing:
                </span>
                <span className="text-stone-300">{coffee.foodPairing}</span>
              </div>
            </div>

            {/* Sensory Gauges */}
            <div className="space-y-3 bg-stone-900/40 p-4 rounded-2xl border border-stone-800">
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                Sensory Balance Index
              </h4>

              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Acidity (Citrus / Fruit Snap)</span>
                    <span className="font-mono text-yellow-400 font-bold">{coffee.acidity} / 10</span>
                  </div>
                  <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${coffee.acidity * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Body & Mouthfeel (Viscosity)</span>
                    <span className="font-mono text-amber-500 font-bold">{coffee.body} / 10</span>
                  </div>
                  <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: `${coffee.body * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Natural Sweetness (Caramel / Honey)</span>
                    <span className="font-mono text-rose-400 font-bold">{coffee.sweetness} / 10</span>
                  </div>
                  <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${coffee.sweetness * 10}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Roast Intensity</span>
                    <span className="font-mono text-orange-400 font-bold">{coffee.intensity} / 10</span>
                  </div>
                  <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-600 rounded-full" style={{ width: `${coffee.intensity * 10}%` }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Recommended Brew Equipment */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 block mb-1">Recommended Brewing Methods</span>
              <p className="text-xs sm:text-sm text-stone-200">
                {coffee.recommendedBrew.join(' • ')}
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onSelectBrewMethod(coffee.recommendedBrew[0]);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md shrink-0 flex items-center gap-1.5"
            >
              <Droplets className="w-4 h-4 text-stone-950" />
              <span>Launch Brew Timer</span>
            </button>
          </div>

          {/* Community Reviews Section */}
          <div className="space-y-4 pt-4 border-t border-stone-800">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>Community Reviews</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-900 text-amber-300 font-mono">
                  {coffeeReviews.length}
                </span>
              </h4>
              <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{coffee.rating} / 5.0</span>
              </div>
            </div>

            {/* Existing Reviews List */}
            <div className="space-y-3">
              {coffeeReviews.map((rev, rIdx) => (
                <div key={rIdx} className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-200">{rev.author}</span>
                    <span className="text-stone-500">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-stone-400 text-[11px]">• Brewed with: <strong className="text-stone-300">{rev.brew}</strong></span>
                  </div>
                  <p className="text-stone-300 leading-relaxed text-xs pt-1">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-stone-900/80 border border-amber-950/60 space-y-3 text-xs">
              <h5 className="font-bold text-amber-300">Share Your Tasting Experience</h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Maya S."
                    className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Rating</label>
                  <div className="flex items-center gap-1 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="text-stone-600 hover:text-amber-400 transition-colors"
                      >
                        <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Brewing Gear</label>
                  <select
                    value={newBrewMethod}
                    onChange={(e) => setNewBrewMethod(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none"
                  >
                    {coffee.recommendedBrew.map((brew, bIdx) => (
                      <option key={bIdx} value={brew}>{brew}</option>
                    ))}
                    <option value="Moka Pot">Moka Pot</option>
                    <option value="Cold Brew">Cold Brew</option>
                    <option value="Espresso">Espresso</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Your Tasting Notes & Feedback</label>
                <textarea
                  rows="2"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="How did it taste? Which notes stood out? Any grind size recommendations?"
                  className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                {reviewSubmitted && (
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" /> Review published successfully!
                  </span>
                )}
                {!reviewSubmitted && <span />}

                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
}
