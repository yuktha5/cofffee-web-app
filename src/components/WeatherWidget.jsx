import React, { useState } from 'react';
import { CloudRain, Sun, Snowflake, Wind, Coffee, Thermometer, Sparkles, Droplets } from 'lucide-react';
import { COFFEES } from '../data/coffeeData';

export function WeatherWidget({ onSelectCoffee, onSelectBrewMethod }) {
  const [selectedWeather, setSelectedWeather] = useState('rainy');

  const weatherOptions = [
    {
      id: 'rainy',
      title: 'Rainy & Monsoon Cozy',
      temp: '22°C',
      icon: CloudRain,
      themeColor: 'border-blue-500/50 bg-blue-950/20 text-blue-300',
      activeTab: 'bg-blue-900/40 border-blue-400 text-blue-200',
      recommendedCoffeeId: 'monsoon-malabar',
      brewMethodId: 'south-indian-filter',
      dish: 'Piping Hot Spiced Degree Kaapi with Steamed Milk & Cardamom',
      desc: 'Monsoon rains demand heavy, comforting warmth. The low-acid earthy spices of Monsoon Malabar paired with rich frothy milk create the ultimate rainy day sanctuary.',
      tempTip: 'Brew water at 96°C to extract deep roasted chocolate and cedar notes.'
    },
    {
      id: 'sunny',
      title: 'Sunny & Warm Day',
      temp: '32°C',
      icon: Sun,
      themeColor: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
      activeTab: 'bg-amber-900/40 border-amber-400 text-amber-200',
      recommendedCoffeeId: 'araku-tribal-reserve',
      brewMethodId: 'cold-brew',
      dish: 'Chilled Cascara Tonic or 16-Hour Sparkling Cold Brew',
      desc: 'Beat the heat with refreshing wild fruit aromatics. Cold brewing extracts natural sweetness without thermal astringency, giving crisp notes of raw honey and strawberry.',
      tempTip: 'Steep coarsely ground beans at room temp or fridge water for 14-16 hours.'
    },
    {
      id: 'chilly',
      title: 'Chilly Morning / Crisp Winter',
      temp: '14°C',
      icon: Snowflake,
      themeColor: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
      activeTab: 'bg-cyan-900/40 border-cyan-400 text-cyan-200',
      recommendedCoffeeId: 'sumatra-mandheling',
      brewMethodId: 'french-press',
      dish: 'Heavy-Bodied French Press with Dark Cocoa & Cinnamon',
      desc: 'A robust, tongue-coating dark roast with cedar, dark cocoa, and sweet tobacco notes to cut right through crisp morning chills.',
      tempTip: 'Preheat your French press carafe with boiling water to keep extraction at 94°C.'
    },
    {
      id: 'breezy',
      title: 'Breezy & Overcast',
      temp: '26°C',
      icon: Wind,
      themeColor: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300',
      activeTab: 'bg-emerald-900/40 border-emerald-400 text-emerald-200',
      recommendedCoffeeId: 'costa-rica-tarrazu',
      brewMethodId: 'v60-pour-over',
      dish: 'Silky Honey-Processed V60 with notes of Apricot & Vanilla',
      desc: 'A calm afternoon breeze is the perfect backdrop for a slow manual pour over. Delicate honey sweetness, rounded stone fruit, and zero bitterness.',
      tempTip: 'Use a gentle pulse pour with 92°C water for optimal sweetness.'
    }
  ];

  const currentOption = weatherOptions.find(w => w.id === selectedWeather) || weatherOptions[0];
  const matchedCoffee = COFFEES.find(c => c.id === currentOption.recommendedCoffeeId) || COFFEES[0];

  return (
    <div className="bg-[#140e0a] border border-amber-900/30 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atmospheric Brewing Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Weather-Based Coffee Recommendation
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Atmospheric pressure, humidity and outdoor temperature alter how your palate perceives acidity and body.
          </p>
        </div>

        {/* Weather Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {weatherOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedWeather === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedWeather(opt.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected ? opt.activeTab : 'bg-stone-900/70 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{opt.title.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75">({opt.temp})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main recommendation body */}
      <div className={`rounded-2xl p-5 sm:p-6 border ${currentOption.themeColor} transition-all`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-900/80 border border-stone-700 text-stone-200">
                Weather Match: {currentOption.title}
              </span>
              <span className="text-xs text-stone-400 font-mono flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5" /> {currentOption.temp}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {currentOption.dish}
            </h3>

            <p className="text-stone-300 text-sm leading-relaxed">
              {currentOption.desc}
            </p>

            <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 text-xs text-amber-200/90 flex items-start gap-2">
              <Droplets className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Barista Temperature Tip:</strong> {currentOption.tempTip}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => onSelectCoffee(matchedCoffee)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <Coffee className="w-4 h-4" />
              <span>View {matchedCoffee.name}</span>
            </button>

            <button
              onClick={() => onSelectBrewMethod(currentOption.brewMethodId)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-medium transition-all"
            >
              <Droplets className="w-4 h-4 text-amber-400" />
              <span>Open Guided Brew Method</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
