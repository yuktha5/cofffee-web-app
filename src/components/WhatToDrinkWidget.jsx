import React, { useState, useEffect } from 'react';
import { Clock, Zap, Smile, IceCream, Sun, Droplets, Sparkles, ArrowRight } from 'lucide-react';
import { COFFEES } from '../data/coffeeData';

export function WhatToDrinkWidget({ onSelectCoffee, onSelectBrewMethod }) {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [selectedMood, setSelectedMood] = useState('focus');

  useEffect(() => {
    setCurrentHour(new Date().getHours());
  }, []);

  const getTimePeriod = (hour) => {
    if (hour >= 5 && hour < 11) return { label: 'Early Morning Awakening', icon: '🌅', color: 'text-amber-400' };
    if (hour >= 11 && hour < 14) return { label: 'Midday Power Hour', icon: '☀️', color: 'text-yellow-400' };
    if (hour >= 14 && hour < 17) return { label: 'Afternoon Slump Saver', icon: '☕', color: 'text-orange-400' };
    if (hour >= 17 && hour < 21) return { label: 'Evening Golden Hour', icon: '🌆', color: 'text-rose-400' };
    return { label: 'Late Night Study & Chill', icon: '🌙', color: 'text-indigo-400' };
  };

  const period = getTimePeriod(currentHour);

  const moods = [
    { id: 'focus', label: 'Urgent Focus & Energy', icon: Zap, desc: 'Bold kick to power deep work' },
    { id: 'cozy', label: 'Slow Cozy Ritual', icon: Smile, desc: 'Delicate aromatics and gentle warmth' },
    { id: 'dessert', label: 'Sweet Tooth Treat', icon: IceCream, desc: 'Pairs with milk, caramel or cookies' },
    { id: 'refresh', label: 'Iced & Refreshing', icon: Droplets, desc: 'Cool crisp tonic or cold steep' },
  ];

  // Dynamic recommendation logic
  const getRecommendation = () => {
    if (selectedMood === 'focus') {
      if (currentHour < 12) {
        return {
          coffeeId: 'chikmagalur-kaapi-royale',
          brewMethodId: 'south-indian-filter',
          drinkName: 'Double-Froth South Indian Degree Kaapi',
          reason: 'A thick, viscous decoction whipped with frothy whole milk. High caffeine and rich hazelnut punch to kickstart the day.',
          caffeineTag: 'High Energy'
        };
      } else {
        return {
          coffeeId: 'coorg-silver-cloud',
          brewMethodId: 'espresso',
          drinkName: 'Bold Cortado or Double Espresso',
          reason: 'A concentrated shot of shade-grown Coorg estate beans with notes of dark cocoa and black pepper to conquer the afternoon.',
          caffeineTag: 'Instant Boost'
        };
      }
    }

    if (selectedMood === 'cozy') {
      return {
        coffeeId: 'ethiopia-yirgacheffe',
        brewMethodId: 'v60-pour-over',
        drinkName: 'Mindful Floral V60 Pour Over',
        reason: 'Take 4 minutes to mindfully pour. Jasmine floral scents and sweet bergamot notes that feel like warm silk.',
        caffeineTag: 'Gentle & Uplifting'
      };
    }

    if (selectedMood === 'dessert') {
      return {
        coffeeId: 'colombian-supremo',
        brewMethodId: 'french-press',
        drinkName: 'Velvety Caramel French Press Au Lait',
        reason: 'Naturally sweet dulce de leche and red apple notes. Add a dash of warm milk and a pinch of cinnamon.',
        caffeineTag: 'Balanced Comfort'
      };
    }

    // refresh
    return {
      coffeeId: 'araku-tribal-reserve',
      brewMethodId: 'cold-brew',
      drinkName: 'Sparkling Citrus Tonic Cold Brew',
      reason: 'Organic Araku Valley natural anaerobic beans over sparkling tonic water with a slice of orange and mint.',
      caffeineTag: 'Crisp & Smooth'
    };
  };

  const rec = getRecommendation();
  const matchedCoffee = COFFEES.find(c => c.id === rec.coffeeId) || COFFEES[0];

  return (
    <div className="bg-[#170f0a] border border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">{period.icon}</span>
            <span className={`text-xs uppercase font-bold tracking-wider ${period.color}`}>
              {period.label} ({new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            What Should I Drink Right Now?
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Real-time sensory recommendation based on the current hour and your mood.
          </p>
        </div>

        {/* Mood Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto">
          {moods.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md shadow-amber-950/50 scale-105'
                    : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`} />
                <span className="text-xs font-semibold">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Recommendation Card */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Optimal Match: {rec.caffeineTag}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {rec.drinkName}
          </h3>

          <p className="text-stone-300 text-sm leading-relaxed">
            {rec.reason}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
              Bean: <strong className="text-amber-300">{matchedCoffee.name}</strong> ({matchedCoffee.origin})
            </span>
            <span className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
              Notes: <span className="text-stone-400">{matchedCoffee.flavorNotes.slice(0, 3).join(', ')}</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
          <button
            onClick={() => onSelectCoffee(matchedCoffee)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-sm transition-all shadow-lg shadow-amber-950/40"
          >
            <span>View Bean Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectBrewMethod(rec.brewMethodId)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-900 border border-amber-800/50 hover:border-amber-600 text-amber-300 font-medium text-sm transition-all"
          >
            <Droplets className="w-4 h-4 text-amber-400" />
            <span>Open Brew Guide & Timer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
