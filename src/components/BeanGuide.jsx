import React, { useState } from 'react';
import { BookOpen, Layers, Check, Sparkles, Droplets, Flame, Award } from 'lucide-react';
import { BEAN_TYPES, PROCESSING_METHODS } from '../data/coffeeData';

export function BeanGuide() {
  const [activeTab, setActiveTab] = useState('beans'); // 'beans' | 'processing'
  const [selectedBeanIndex, setSelectedBeanIndex] = useState(0);
  const [selectedProcessIndex, setSelectedProcessIndex] = useState(0);

  const currentBean = BEAN_TYPES[selectedBeanIndex];
  const currentProcess = PROCESSING_METHODS[selectedProcessIndex];

  return (
    <section id="beans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-amber-950/40">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Coffee Botanical & Chemistry Science</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Bean Varietals & Processing Masterclass
        </h2>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          From the delicate chromosomes of Coffea Arabica to the heavy crema of Canephora and the oceanic winds of Indian monsooning.
        </p>

        {/* Master Tab Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-stone-900 border border-stone-800 mt-4">
          <button
            onClick={() => setActiveTab('beans')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'beans'
                ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-950/50'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            🫘 The 4 Bean Species (Arabica, Robusta, Liberica, Excelsa)
          </button>
          <button
            onClick={() => setActiveTab('processing')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'processing'
                ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-950/50'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            💧 Processing Methods (Washed, Natural, Monsooned)
          </button>
        </div>
      </div>

      {activeTab === 'beans' ? (
        /* Bean Varietals Breakdown */
        <div className="space-y-8">
          {/* Sub tabs */}
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {BEAN_TYPES.map((bean, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedBeanIndex(idx)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap ${
                  selectedBeanIndex === idx
                    ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md shadow-amber-950/60'
                    : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {bean.type.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Current Bean Spec Card */}
          <div className="bg-[#170f0a] border border-amber-900/40 rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-5">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Global Share: {currentBean.share}
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                  {currentBean.type}
                </h3>
              </div>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed bg-stone-950/40 p-5 rounded-2xl border border-stone-800">
                {currentBean.tasteProfile}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-stone-300">
                  <strong className="text-emerald-400 block mb-1">Pros & Superpowers:</strong>
                  <span>{currentBean.pros}</span>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-stone-300">
                  <strong className="text-amber-400 block mb-1">Cultivation Tradeoffs:</strong>
                  <span>{currentBean.cons}</span>
                </div>
              </div>
            </div>

            {/* Metrics column */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-6 space-y-4 text-xs">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-800 pb-2">
                Chemical & Physical Attributes
              </h4>

              <div>
                <span className="text-stone-400 block mb-0.5">Caffeine Content</span>
                <span className="font-semibold text-amber-300 font-mono text-sm">{currentBean.caffeine}</span>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Sugars & Natural Lipids</span>
                <span className="font-semibold text-stone-200">{currentBean.sugarLipids}</span>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Ideal Elevation</span>
                <span className="font-semibold text-amber-400">{currentBean.idealAltitude}</span>
              </div>

              <div>
                <span className="text-stone-400 block mb-0.5">Bean Anatomy</span>
                <span className="font-semibold text-stone-300">{currentBean.shape}</span>
              </div>

              <div className="pt-2 border-t border-stone-800">
                <span className="text-stone-400 block mb-0.5">Primary Producing Regions</span>
                <span className="font-semibold text-stone-200">{currentBean.regions}</span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Processing Methods Breakdown */
        <div className="space-y-8">
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {PROCESSING_METHODS.map((proc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedProcessIndex(idx)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap ${
                  selectedProcessIndex === idx
                    ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md shadow-amber-950/60'
                    : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {proc.name.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="bg-[#170f0a] border border-amber-900/40 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Post-Harvest Chemistry
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {currentProcess.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800">
                <strong className="text-amber-300 block mb-1 text-xs uppercase tracking-wider">How It Works:</strong>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {currentProcess.how}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-300">
                  <strong className="text-amber-400 block mb-1">Cup Profile Signature:</strong>
                  <span>{currentProcess.cupProfile}</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-300">
                  <strong className="text-amber-400 block mb-1">Classic World Example:</strong>
                  <span className="text-amber-200 font-semibold">{currentProcess.classicExample}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
