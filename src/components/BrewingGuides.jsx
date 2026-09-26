import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Droplets, Clock, Thermometer, CheckCircle2, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { BREWING_GUIDES } from '../data/coffeeData';
import { playTimerChime } from '../utils/audio';

export function BrewingGuides({ preselectedMethodId, onLogBrew }) {
  const [selectedMethodId, setSelectedMethodId] = useState(preselectedMethodId || 'south-indian-filter');
  const [cups, setCups] = useState(2);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer states
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const timerIntervalRef = useRef(null);

  // If preselected method changes from parent
  useEffect(() => {
    if (preselectedMethodId) {
      setSelectedMethodId(preselectedMethodId);
      resetTimer();
    }
  }, [preselectedMethodId]);

  const method = BREWING_GUIDES.find(m => m.id === selectedMethodId) || BREWING_GUIDES[0];

  // Dynamic calculations based on cups
  const baseCups = 1;
  const multiplier = cups / baseCups;
  const dynamicCoffeeGrams = Math.round(method.coffeeGrams * multiplier);
  const dynamicWaterGrams = Math.round(method.waterGrams * multiplier);

  // Parse step timestamps into seconds
  const parseTimeToSeconds = (timeStr) => {
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  const stepSeconds = method.steps.map(s => parseTimeToSeconds(s.time));

  // Determine current active step
  useEffect(() => {
    for (let i = stepSeconds.length - 1; i >= 0; i--) {
      if (secondsElapsed >= stepSeconds[i]) {
        if (i !== currentStepIndex) {
          setCurrentStepIndex(i);
          if (soundEnabled && timerRunning) {
            playTimerChime('step');
          }
        }
        break;
      }
    }
  }, [secondsElapsed, stepSeconds, currentStepIndex, soundEnabled, timerRunning]);

  // Timer loop
  useEffect(() => {
    if (timerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning]);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSecondsElapsed(0);
    setCurrentStepIndex(0);
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="brewing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-amber-950/40">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Droplets className="w-3.5 h-3.5" />
            <span>Interactive Barista Station</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Brewing Methods & Live Timer
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-1 max-w-xl">
            Precision ratios, water temperatures, and step-by-step guided audio timers for perfect extraction.
          </p>
        </div>

        {/* Cups selector */}
        <div className="flex items-center gap-3 bg-stone-900/90 border border-stone-800 p-2 rounded-2xl">
          <span className="text-xs font-semibold text-stone-300 ml-2">Servings:</span>
          {[1, 2, 3, 4].map((c) => (
            <button
              key={c}
              onClick={() => setCups(c)}
              className={`w-9 h-9 rounded-xl font-bold text-xs transition-all ${
                cups === c
                  ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-950/50'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              {c} cup{c > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Method Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {BREWING_GUIDES.map((guide) => {
          const isSelected = selectedMethodId === guide.id;
          return (
            <button
              key={guide.id}
              onClick={() => {
                setSelectedMethodId(guide.id);
                resetTimer();
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-amber-600 border-amber-500 text-stone-950 shadow-lg shadow-amber-950/50'
                  : 'bg-stone-900/70 border-stone-800 text-stone-300 hover:border-amber-800/60 hover:text-amber-200'
              }`}
            >
              <span className="text-base">{guide.icon}</span>
              <span>{guide.name}</span>
            </button>
          );
        })}
      </div>

      {/* Method Details & Live Timer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Equipment & Dynamic Ratio Calculator (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#170f0a] border border-amber-900/40 rounded-3xl p-6 shadow-xl space-y-6">
            
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                {method.difficulty} Difficulty • {method.totalTime}
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                {method.name}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                {method.description}
              </p>
            </div>

            {/* Dynamic Ratio Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
                <span className="text-stone-400 block mb-1 font-medium">Coffee Weight</span>
                <span className="text-2xl font-bold font-mono text-amber-400">
                  {dynamicCoffeeGrams}g
                </span>
                <span className="text-[11px] text-stone-500 block mt-0.5">Ground Coffee</span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
                <span className="text-stone-400 block mb-1 font-medium">Water Volume</span>
                <span className="text-2xl font-bold font-mono text-blue-400">
                  {dynamicWaterGrams}ml
                </span>
                <span className="text-[11px] text-stone-500 block mt-0.5">Hot Water ({dynamicWaterGrams}g)</span>
              </div>
            </div>

            {/* Parameters */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <span className="text-stone-400 font-medium">Ideal Water Temp</span>
                <span className="font-semibold text-amber-300 flex items-center gap-1 font-mono">
                  <Thermometer className="w-3.5 h-3.5" /> {method.waterTemp}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <span className="text-stone-400 font-medium">Grind Consistency</span>
                <span className="font-semibold text-stone-200">
                  {method.grindSize}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <span className="text-stone-400 font-medium">Brew Ratio</span>
                <span className="font-semibold text-amber-300 font-mono">
                  {method.ratio}
                </span>
              </div>

              <div className="flex items-start justify-between p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <span className="text-stone-400 font-medium">Gear Required</span>
                <span className="font-semibold text-stone-300 text-right max-w-[200px]">
                  {method.equipment}
                </span>
              </div>
            </div>

            <button
              onClick={() => onLogBrew(method.name, `${dynamicCoffeeGrams}g`, method.grindSize)}
              className="w-full py-3 rounded-xl bg-stone-900 border border-amber-800/60 hover:border-amber-500 text-amber-200 font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Log in Coffee Journal</span>
            </button>

          </div>
        </div>

        {/* Right Column: Live Interactive Timer & Steps (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#170f0a] border border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-xl">
            
            {/* Timer Display */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-stone-950 border border-stone-800/80">
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
                  Active Brew Stopwatch
                </span>
                <div className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tight text-white">
                  {formatTimer(secondsElapsed)}
                </div>
                <span className="text-xs text-stone-400 mt-1 block">
                  Current Target: Step {currentStepIndex + 1} of {method.steps.length}
                </span>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    soundEnabled
                      ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                      : 'bg-stone-900 border-stone-800 text-stone-500'
                  }`}
                  title={soundEnabled ? 'Mute sound chimes' : 'Enable audio chimes'}
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>

                <button
                  onClick={toggleTimer}
                  className={`px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                    timerRunning
                      ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-amber-950/60'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-stone-950 shadow-amber-500/20'
                  }`}
                >
                  {timerRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  <span>{timerRunning ? 'Pause' : 'Start Brew'}</span>
                </button>

                <button
                  onClick={resetTimer}
                  className="p-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-all"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="mt-8 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>Brew Steps & Milestones</span>
                <span className="text-xs text-stone-400 font-normal">
                  Step {currentStepIndex + 1} / {method.steps.length}
                </span>
              </h4>

              <div className="space-y-3">
                {method.steps.map((step, idx) => {
                  const isActive = currentStepIndex === idx;
                  const isPassed = currentStepIndex > idx;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all text-xs sm:text-sm ${
                        isActive
                          ? 'bg-amber-950/70 border-amber-500 text-white shadow-md shadow-amber-950/50'
                          : isPassed
                          ? 'bg-stone-950/50 border-stone-800 text-stone-400'
                          : 'bg-stone-900/40 border-stone-800 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isActive ? 'bg-amber-500 text-stone-950' : isPassed ? 'bg-emerald-900 text-emerald-300' : 'bg-stone-800 text-stone-400'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className={`font-bold ${isActive ? 'text-amber-300' : 'text-stone-200'}`}>
                            {step.title}
                          </span>
                        </div>

                        <span className="font-mono text-xs text-amber-400/90 font-semibold px-2 py-0.5 rounded bg-black/40">
                          {step.time}
                        </span>
                      </div>

                      <p className={`text-xs leading-relaxed pl-7 ${isActive ? 'text-stone-200' : 'text-stone-400'}`}>
                        {step.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
