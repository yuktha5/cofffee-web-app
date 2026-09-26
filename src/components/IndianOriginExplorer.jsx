import React, { useState } from 'react';
import { MapPin, Sparkles, Award, Coffee, Droplets, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { INDIAN_ORIGINS, COFFEES } from '../data/coffeeData';

export function IndianOriginExplorer({ onSelectCoffee, onSelectBrewMethod }) {
  const [selectedOriginId, setSelectedOriginId] = useState('chikmagalur');
  const [chicoryRatio, setChicoryRatio] = useState(20);

  const activeOrigin = INDIAN_ORIGINS.find(o => o.id === selectedOriginId) || INDIAN_ORIGINS[0];

  return (
    <section id="indian-origins" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-amber-950/40">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
          <span>🇮🇳</span>
          <span>Heritage Spotlight & GI Origins</span>
          <span className="text-amber-500 font-bold">• Est. 1670 AD</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Indian Coffee Origin Explorer
        </h2>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          India is the only country in the world where 100% of coffee is shade-grown beneath a two-tier rainforest canopy alongside wild black pepper, cardamom, and jackfruit trees.
        </p>
      </div>

      {/* Origin Selection Navigation Tabs */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {INDIAN_ORIGINS.map((origin) => {
          const isSelected = selectedOriginId === origin.id;
          return (
            <button
              key={origin.id}
              onClick={() => setSelectedOriginId(origin.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-amber-600 border-amber-500 text-stone-950 shadow-lg shadow-amber-950/60 scale-105'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-amber-800/60 hover:text-amber-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{origin.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Origin Showcase Card */}
      <div className="bg-[#180f0a] border border-amber-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          
          {/* Left Column: Story & History */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                <span>{activeOrigin.state}, South India</span>
                <span>•</span>
                <span>Elevation: {activeOrigin.elevation}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {activeOrigin.title}
              </h3>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed bg-stone-950/40 p-5 rounded-2xl border border-stone-800/80">
              {activeOrigin.history}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Terroir & Forest Canopy Signature
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {activeOrigin.highlights.map((hl, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-900/50 text-xs sm:text-sm text-stone-300 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block mb-0.5">Barista Brew Recommendation:</strong>
                <span>{activeOrigin.brewTip}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Origin Quick Profile */}
          <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-xs">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-2">
                Origin Vital Specs
              </h4>
              
              <div>
                <span className="text-stone-400 block mb-0.5">Key Cultivars & Varietals</span>
                <span className="font-semibold text-amber-200">{activeOrigin.keyVarieties}</span>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Annual Monsoon Rainfall</span>
                <span className="font-semibold text-stone-200">{activeOrigin.rainfall}</span>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Dominant Cup Profile</span>
                <span className="font-semibold text-stone-200">{activeOrigin.flavorProfile}</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-stone-800">
              <button
                onClick={() => {
                  const match = COFFEES.find(c => c.origin.toLowerCase().includes(activeOrigin.id) || c.id.includes(activeOrigin.id)) || COFFEES[0];
                  onSelectCoffee(match);
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Explore {activeOrigin.name.split(' ')[0]} Coffee Lots
              </button>

              <button
                onClick={() => onSelectBrewMethod('south-indian-filter')}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Coffee className="w-4 h-4 text-amber-400" />
                <span>Brew Degree Kaapi Guide</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Special Feature: The Art of South Indian Filter Kaapi & Chicory Science */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Degree Kaapi & Chicory Ratio Calculator */}
        <div className="bg-[#170f0a] border border-amber-900/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Droplets className="w-4 h-4" />
              <span>Decoction Chemistry</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              The Sacred Coffee : Chicory Ratio
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
              In traditional South Indian Filter Coffee, roasted chicory root is blended with estate Arabica & Peaberry. Chicory increases decoction thickness, deepens the bronze color, adds caramel bitterness, and preserves warmth.
            </p>

            {/* Interactive Chicory Slider */}
            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-300">Coffee / Chicory Ratio:</span>
                <span className="font-mono text-amber-300 font-bold text-sm">
                  {100 - chicoryRatio}% Coffee : {chicoryRatio}% Chicory
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="35"
                step="5"
                value={chicoryRatio}
                onChange={(e) => setChicoryRatio(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-stone-400">
                <span>0% (100% Pure Estate Arabica)</span>
                <span className="text-amber-400 font-semibold">20% (Traditional Degree Kaapi)</span>
                <span>35% (Deep & Viscous)</span>
              </div>

              {/* Dynamic feedback on ratio */}
              <div className="p-3 rounded-xl bg-stone-900 text-xs text-stone-300">
                {chicoryRatio === 0 && '✨ Pure Specialty Profile: High clarity, lighter decoction, floral and chocolate notes shine cleanly without bitterness.'}
                {chicoryRatio > 0 && chicoryRatio <= 15 && '☕ Subtle Balance: Light viscosity boost, retains distinct single-origin acidity and fruit nuances.'}
                {chicoryRatio > 15 && chicoryRatio <= 25 && '🏆 The Golden Kumbakonam Standard: Rich bronze color, velvety body, perfect foamy crown when poured back and forth from height!'}
                {chicoryRatio > 25 && '🔥 Heavy Commercial Style: Very dark, viscous, intensely bitter-sweet. Best with condensed milk or thick dairy.'}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onSelectBrewMethod('south-indian-filter')}
              className="w-full py-3 rounded-xl bg-amber-600/20 border border-amber-500/50 hover:bg-amber-600/30 text-amber-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>See Full Degree Kaapi Step-by-Step Guide</span>
            </button>
          </div>
        </div>

        {/* The Legend of Baba Budan & Monsoon Malabar */}
        <div className="bg-[#170f0a] border border-amber-900/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <BookOpen className="w-4 h-4" />
              <span>Historical Miracle</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              The Legend of Baba Budan & The Seven Seeds
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              In 1670, coffee was strictly monopolized by the Arab world, with laws forbidding fertile beans from leaving Mocha under penalty of death. Sufi saint <strong>Baba Budan</strong> on his pilgrimage back from Mecca strapped seven raw green coffee seeds to his chest. He planted them in the sacred Chandradrona Hills of Chikmagalur.
            </p>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs space-y-2">
              <h5 className="font-bold text-amber-300">Why Seven Seeds?</h5>
              <p className="text-stone-300 leading-relaxed">
                Seven is revered as a sacred number in Sufi mysticism. Those seven humble seeds blossomed into the millions of coffee trees spanning Karnataka, Kerala, and Tamil Nadu today.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs space-y-2">
              <h5 className="font-bold text-amber-300">Monsoon Malabar Geographical Indication</h5>
              <p className="text-stone-300 leading-relaxed">
                Unique in world agriculture: dry beans are aged for 12 weeks exposed to coastal monsoon winds. The beans absorb moisture, swell to twice their size, turn golden, and lose all acidity.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                const malabar = COFFEES.find(c => c.id === 'monsoon-malabar');
                if (malabar) onSelectCoffee(malabar);
              }}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>Taste Monsoon Malabar AA</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
