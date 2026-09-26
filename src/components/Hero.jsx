import React from 'react';
import { Sparkles, Compass, Flame, Droplets, MapPin, Award, ArrowRight } from 'lucide-react';

export function Hero({ onStartQuiz, onExploreCatalog, onExploreIndia }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#180f09] via-[#120a06] to-[#0f0a06] py-16 sm:py-24 border-b border-amber-950/40">
      {/* Background ambient glowing coffee orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-5 right-1/4 w-80 h-80 bg-orange-700/10 rounded-full blur-3xl pointer-events-none -z-0" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#451a03_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/40 text-amber-300 text-xs sm:text-sm font-medium tracking-wide shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <span>Curated Specialty Beans & Indian Heritage Roots</span>
            <span className="text-amber-500 font-bold">1670 AD — Present</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Every Cup Tells a Story of{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Origin & Craft
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From the mist-cloaked peaks of <strong className="text-amber-200">Bababudangiri & Coorg</strong> to the floral valleys of <strong className="text-amber-200">Yirgacheffe & Boquete</strong>. Explore artisanal roasts, interactive brew timers, personalized flavor quizzes, and our intelligent AI Barista.
          </p>

          {/* Primary CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onStartQuiz}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-stone-950 font-bold text-sm sm:text-base hover:brightness-110 hover:shadow-lg hover:shadow-amber-500/20 transform hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-5 h-5 text-stone-950" />
              <span>Find My Coffee Quiz</span>
            </button>

            <button
              onClick={onExploreIndia}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900/90 border border-amber-800/60 hover:border-amber-500/80 text-amber-200 font-semibold text-sm sm:text-base hover:bg-stone-800/80 transition-all group"
            >
              <MapPin className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Explore Indian Origins 🇮🇳</span>
            </button>

            <button
              onClick={onExploreCatalog}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 hover:border-stone-700 text-stone-300 font-medium text-sm sm:text-base hover:text-white transition-all"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-2xl">
                <span>12+</span>
                <Compass className="w-5 h-5 text-amber-500/70" />
              </div>
              <p className="text-xs text-stone-400 font-medium mt-1">Single Origin & Heritage Lots</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-2xl">
                <span>7</span>
                <Droplets className="w-5 h-5 text-amber-500/70" />
              </div>
              <p className="text-xs text-stone-400 font-medium mt-1">Interactive Brew Calculators</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-2xl">
                <span>0% Acid</span>
                <Award className="w-5 h-5 text-amber-500/70" />
              </div>
              <p className="text-xs text-stone-400 font-medium mt-1">Monsoon Malabar Special</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-2xl">
                <span>24/7</span>
                <Flame className="w-5 h-5 text-amber-500/70" />
              </div>
              <p className="text-xs text-stone-400 font-medium mt-1">AI Barista Sommelier</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
