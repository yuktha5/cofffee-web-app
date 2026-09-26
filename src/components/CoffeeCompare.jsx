import React, { useEffect } from 'react';
import { X, BarChart2, Check, ArrowRight, Trash2, Droplets } from 'lucide-react';

export function CoffeeCompare({ 
  compareList, 
  onRemove, 
  onClear, 
  onClose, 
  onSelectCoffee, 
  onSelectBrewMethod 
}) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (compareList.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-[#160f0a] border border-amber-900/50 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <BarChart2 className="w-4 h-4" />
              <span>Sensory Benchmarking</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Coffee Comparison Analysis
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
              Comparing {compareList.length} of max 3 coffees side-by-side.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClear}
              className="text-xs text-stone-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Grid Table */}
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[650px] grid grid-cols-4 gap-4">
            
            {/* Metric Labels Column */}
            <div className="space-y-4 pt-20 text-xs font-semibold text-stone-400">
              <div className="h-10 flex items-center">Origin & Country</div>
              <div className="h-10 flex items-center">Roast Profile</div>
              <div className="h-10 flex items-center">Elevation</div>
              <div className="h-10 flex items-center">Process Method</div>
              <div className="h-10 flex items-center">Caffeine Level</div>
              <div className="h-10 flex items-center">Price / 250g</div>
              <div className="h-14 flex items-center">Acidity Score</div>
              <div className="h-14 flex items-center">Body & Mouthfeel</div>
              <div className="h-14 flex items-center">Sweetness</div>
              <div className="h-14 flex items-center">Roast Intensity</div>
              <div className="h-16 flex items-center">Top Recommended Brew</div>
            </div>

            {/* Coffee Columns */}
            {compareList.map((coffee) => (
              <div key={coffee.id} className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-4 text-xs">
                
                {/* Header card with dismiss */}
                <div className="relative">
                  <button
                    onClick={() => onRemove(coffee.id)}
                    className="absolute -top-1 -right-1 p-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-rose-400"
                    title="Remove from comparison"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <h4 className="font-bold text-white text-base pr-5 leading-snug line-clamp-1">{coffee.name}</h4>
                  <span className="text-[11px] text-amber-300 font-medium">{coffee.country}</span>
                </div>

                <div className="h-10 flex items-center font-medium text-stone-200">
                  {coffee.origin}
                </div>

                <div className="h-10 flex items-center">
                  <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/50 text-amber-300 font-medium">
                    {coffee.roastLevel}
                  </span>
                </div>

                <div className="h-10 flex items-center text-stone-300">
                  {coffee.elevation}
                </div>

                <div className="h-10 flex items-center text-stone-300">
                  {coffee.process}
                </div>

                <div className="h-10 flex items-center text-stone-300">
                  {coffee.caffeineLevel}
                </div>

                <div className="h-10 flex items-center font-mono font-bold text-amber-400">
                  ₹{coffee.pricePer250g}
                </div>

                {/* Acidity Bar */}
                <div className="h-14 flex flex-col justify-center space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-400">Acidity</span>
                    <span className="text-yellow-400 font-bold">{coffee.acidity}/10</span>
                  </div>
                  <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${coffee.acidity * 10}%` }} />
                  </div>
                </div>

                {/* Body Bar */}
                <div className="h-14 flex flex-col justify-center space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-400">Body</span>
                    <span className="text-amber-500 font-bold">{coffee.body}/10</span>
                  </div>
                  <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: `${coffee.body * 10}%` }} />
                  </div>
                </div>

                {/* Sweetness Bar */}
                <div className="h-14 flex flex-col justify-center space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-400">Sweetness</span>
                    <span className="text-rose-400 font-bold">{coffee.sweetness}/10</span>
                  </div>
                  <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: `${coffee.sweetness * 10}%` }} />
                  </div>
                </div>

                {/* Intensity Bar */}
                <div className="h-14 flex flex-col justify-center space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-400">Intensity</span>
                    <span className="text-orange-400 font-bold">{coffee.intensity}/10</span>
                  </div>
                  <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-600 h-full rounded-full" style={{ width: `${coffee.intensity * 10}%` }} />
                  </div>
                </div>

                {/* Recommended Brew */}
                <div className="h-16 flex flex-col justify-center">
                  <span className="font-semibold text-amber-300">
                    {coffee.recommendedBrew[0]}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    + {coffee.recommendedBrew.slice(1).join(', ')}
                  </span>
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCoffee(coffee);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectBrewMethod(coffee.recommendedBrew[0]);
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-700 text-stone-300 text-xs font-medium transition-all"
                  >
                    Brew Timer
                  </button>
                </div>

              </div>
            ))}

            {/* Empty placeholder slots if < 3 */}
            {[...Array(3 - compareList.length)].map((_, i) => (
              <div key={i} className="p-6 rounded-2xl border-2 border-dashed border-stone-800/80 flex flex-col items-center justify-center text-center text-xs text-stone-500 space-y-2">
                <BarChart2 className="w-8 h-8 text-stone-700" />
                <span>Select another coffee from the catalog to compare</span>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
