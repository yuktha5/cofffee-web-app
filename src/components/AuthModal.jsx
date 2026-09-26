import React, { useState, useEffect } from 'react';
import { X, User, Heart, BookOpen, Award, Check, LogOut, ShieldCheck, Sparkles } from 'lucide-react';

export function AuthModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onSaveUser, 
  favoritesCount, 
  brewsCount, 
  reviewsCount 
}) {
  const [name, setName] = useState(currentUser?.name || 'Yuktha');
  const [email, setEmail] = useState(currentUser?.email || 'yuktha@coffeeexplorer.com');
  const [favoriteOrigin, setFavoriteOrigin] = useState(currentUser?.favoriteOrigin || 'Chikmagalur, India 🇮🇳');
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    onSaveUser({
      name: name.trim() || 'Yuktha',
      email: email.trim() || 'yuktha@coffeeexplorer.com',
      favoriteOrigin
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const badges = [
    { title: 'Origins Explorer', desc: 'Explored Indian & World Single Origins', icon: '🌱', unlocked: true },
    { title: 'Kaapi Enthusiast', desc: 'Mastered South Indian Degree Kaapi', icon: '☕', unlocked: true },
    { title: 'Live Timer Pro', desc: 'Guided 3+ precision brew extractions', icon: '⏱️', unlocked: brewsCount >= 1 },
    { title: 'Tasting Critic', desc: 'Contributed community tasting reviews', icon: '⭐', unlocked: reviewsCount >= 1 },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#160f0a] border border-amber-900/50 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden my-auto animate-in zoom-in-95 duration-200 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold text-xl shadow-md shadow-amber-950/50">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg sm:text-xl">
                {name}'s Coffee Sanctuary
              </h3>
              <p className="text-xs text-amber-300 font-medium">Artisan Coffee Explorer</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800">
            <span className="text-stone-400 block mb-0.5">Brews Logged</span>
            <span className="text-lg font-bold font-mono text-amber-400">{brewsCount}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800">
            <span className="text-stone-400 block mb-0.5">Favorites</span>
            <span className="text-lg font-bold font-mono text-rose-400">{favoritesCount}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800">
            <span className="text-stone-400 block mb-0.5">Reviews</span>
            <span className="text-lg font-bold font-mono text-yellow-400">{reviewsCount}</span>
          </div>
        </div>

        {/* Earned Badges */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Artisan Badges & Achievements</span>
          </h4>

          <div className="grid grid-cols-2 gap-2.5">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                  badge.unlocked
                    ? 'bg-amber-950/40 border-amber-800/60 text-stone-200'
                    : 'bg-stone-900/40 border-stone-800 text-stone-500 opacity-60'
                }`}
              >
                <span className="text-xl">{badge.icon}</span>
                <div>
                  <strong className="block text-white text-xs">{badge.title}</strong>
                  <span className="text-[10px] text-stone-400 line-clamp-1">{badge.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSave} className="space-y-3.5 text-xs pt-2 border-t border-stone-800">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Edit Account Preferences
          </h4>

          <div>
            <label className="block text-stone-400 mb-1">Your Name / Handle</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-400 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-400 mb-1">Favorite Coffee Region</label>
            <input
              type="text"
              value={favoriteOrigin}
              onChange={(e) => setFavoriteOrigin(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <Check className="w-4 h-4" /> Profile Updated!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold transition-all shadow-md"
            >
              Save Profile
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
