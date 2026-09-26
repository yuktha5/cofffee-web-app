import React, { useState } from 'react';
import { BookOpen, Plus, Star, Trash2, Calendar, Droplets, Coffee, Sparkles, Check } from 'lucide-react';
import { COFFEES } from '../data/coffeeData';

export function BrewJournal({ journalLogs, onAddLog, onDeleteLog }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [coffeeName, setCoffeeName] = useState(COFFEES[0].name);
  const [brewMethod, setBrewMethod] = useState('South Indian Filter');
  const [grindSize, setGrindSize] = useState('Medium-Fine');
  const [dose, setDose] = useState('20g');
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coffeeName) return;

    onAddLog({
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      coffeeName,
      brewMethod,
      grindSize,
      dose,
      rating,
      notes: notes.trim() || 'Balanced extraction with delightful aromatics.'
    });

    setNotes('');
    setShowAddForm(false);
  };

  return (
    <section id="journal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-amber-950/40">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tasting Journal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Personal Coffee History & Journal
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-1 max-w-xl">
            Track your morning rituals, dialing parameters, tasting notes, and ratings over time.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-950/60"
        >
          <Plus className="w-4 h-4 text-stone-950" />
          <span>{showAddForm ? 'Cancel Entry' : 'Log New Brew'}</span>
        </button>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
          <span className="text-xs text-stone-400 block mb-1">Total Brews Logged</span>
          <span className="text-2xl font-bold font-mono text-amber-400">{journalLogs.length} cups</span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
          <span className="text-xs text-stone-400 block mb-1">Most Brewed Method</span>
          <span className="text-sm font-bold text-stone-200 truncate block">
            {journalLogs.length > 0 ? journalLogs[0].brewMethod : 'South Indian Filter'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
          <span className="text-xs text-stone-400 block mb-1">Average Palate Score</span>
          <span className="text-2xl font-bold font-mono text-yellow-400 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400" />
            {journalLogs.length > 0 
              ? (journalLogs.reduce((acc, l) => acc + l.rating, 0) / journalLogs.length).toFixed(1)
              : '5.0'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
          <span className="text-xs text-stone-400 block mb-1">Explorer Status</span>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Level {Math.min(10, Math.floor(journalLogs.length / 3) + 1)} Barista
          </span>
        </div>
      </div>

      {/* Add New Entry Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-3xl bg-[#170f0a] border border-amber-800/60 shadow-xl space-y-4 animate-in fade-in duration-200 text-xs">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Record Your Coffee Experience</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-stone-400 mb-1">Coffee Roast / Estate</label>
              <select
                value={coffeeName}
                onChange={(e) => setCoffeeName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none"
              >
                {COFFEES.map((c) => (
                  <option key={c.id} value={c.name}>{c.name} ({c.origin})</option>
                ))}
                <option value="Custom Artisan Roast">Custom Artisan Roast</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Brewing Gear</label>
              <select
                value={brewMethod}
                onChange={(e) => setBrewMethod(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none"
              >
                <option value="South Indian Filter">South Indian Filter (Degree Kaapi)</option>
                <option value="Hario V60">Hario V60 Pour Over</option>
                <option value="French Press">French Press</option>
                <option value="Espresso">Espresso (9-Bar)</option>
                <option value="Moka Pot">Moka Pot</option>
                <option value="AeroPress">AeroPress</option>
                <option value="Cold Brew">Cold Brew</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Coffee Dose (g)</label>
              <input
                type="text"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                placeholder="e.g. 18g"
                className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Grind Size</label>
              <select
                value={grindSize}
                onChange={(e) => setGrindSize(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none"
              >
                <option value="Extra Coarse (Cold Brew)">Extra Coarse (Cold Brew)</option>
                <option value="Coarse (French Press)">Coarse (French Press)</option>
                <option value="Medium (V60 / Pour Over)">Medium (V60 / Pour Over)</option>
                <option value="Medium-Fine (South Indian Filter / Moka)">Medium-Fine (Filter / Moka)</option>
                <option value="Fine (Espresso)">Fine (Espresso)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-400 mb-1">Tasting Score</label>
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-stone-600 hover:text-amber-400 transition-colors"
                  >
                    <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Tasting Notes & Observations</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Silky chocolate mouthfeel with cardamom aftertaste"
                className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
            >
              Save Entry
            </button>
          </div>
        </form>
      )}

      {/* Logs Table / Cards */}
      {journalLogs.length === 0 ? (
        <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800 p-8">
          <BookOpen className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">Your tasting journal is empty</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto mb-4">
            Start logging your cups from the Brew Timer or click "Log New Brew" above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {journalLogs.map((log) => (
            <div
              key={log.id}
              className="p-5 rounded-2xl bg-[#170f0a] border border-stone-800/80 hover:border-amber-800/60 transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm line-clamp-1">{log.coffeeName}</h4>
                  <span className="text-[11px] text-amber-400 font-medium">{log.brewMethod}</span>
                </div>

                <button
                  onClick={() => onDeleteLog(log.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg bg-stone-900 text-stone-500 hover:text-rose-400 transition-all"
                  title="Delete log"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
                <span>Dose: {log.dose}</span>
                <span>•</span>
                <span>Grind: {log.grindSize.split(' ')[0]}</span>
              </div>

              <p className="text-xs text-stone-300 italic bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/60 line-clamp-2">
                "{log.notes}"
              </p>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-800/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {log.date}
                </span>

                <div className="flex text-amber-400">
                  {[...Array(log.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
