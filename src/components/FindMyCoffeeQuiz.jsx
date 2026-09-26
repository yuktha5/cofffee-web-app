import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, RotateCcw, Check, Award, Coffee, Droplets } from 'lucide-react';
import { QUIZ_QUESTIONS, COFFEE_PERSONALITIES, COFFEES } from '../data/coffeeData';

export function FindMyCoffeeQuiz({ onSelectCoffee, onSelectBrewMethod }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (option) => {
    const updatedAnswers = { ...answers, [currentQ.id]: option };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    // Determine personality archetype
    const q1 = finalAnswers[1]?.value;
    const q2 = finalAnswers[2]?.value;
    const q3 = finalAnswers[3]?.preference;

    let personalityKey = 'balanced';

    if (q1 === 'purist' || q2 === 'fruity' || q3 === 'high') {
      personalityKey = 'purist';
    } else if (q1 === 'bold' || q2 === 'dessert') {
      personalityKey = 'bold';
    } else if (q1 === 'traditional' || q2 === 'spiced' || q3 === 'low') {
      personalityKey = 'monsooned';
    } else {
      personalityKey = 'balanced';
    }

    const matchedPersonality = COFFEE_PERSONALITIES[personalityKey];
    setResult(matchedPersonality);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#92400e', '#fef3c7']
      });
    } catch {
      // safe fallback
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  // Find recommended coffees for result
  const topCoffee = result ? COFFEES.find(c => c.id === result.topPickId) || COFFEES[0] : null;

  return (
    <section id="quiz" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-amber-950/40">
      
      {/* Title */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Palate Matcher</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Find My Coffee Quiz
        </h2>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto">
          Answer 5 quick sensory questions to discover your unique Coffee Personality and your ideal roast pairing.
        </p>
      </div>

      {!result ? (
        /* Quiz Question Card */
        <div className="bg-[#170f0a] border border-amber-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-stone-400 mb-2">
              <span className="text-amber-400 font-bold">
                Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span>{Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 w-full bg-stone-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentQ.question}
            </h3>
            <p className="text-xs text-stone-400 mt-1">Select the choice that best matches your daily taste.</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((option, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  className="p-4 sm:p-5 rounded-2xl bg-stone-900/60 hover:bg-amber-950/50 border border-stone-800 hover:border-amber-600/70 text-left transition-all group flex items-start gap-3 transform hover:-translate-y-0.5"
                >
                  <div className="w-6 h-6 rounded-full bg-stone-800 group-hover:bg-amber-500 flex items-center justify-center text-xs font-bold text-stone-400 group-hover:text-stone-950 shrink-0 mt-0.5 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-stone-200 group-hover:text-amber-200 leading-relaxed">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      ) : (
        /* Quiz Result Card */
        <div className="bg-[#180f0a] border border-amber-800/60 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
          
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 mx-auto flex items-center justify-center text-4xl shadow-xl shadow-amber-950/60">
              {result.icon}
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Your Coffee Archetype</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                {result.title}
              </h3>
              <p className="text-amber-300/80 text-sm font-semibold mt-1">
                {result.subtitle}
              </p>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto bg-stone-950/50 p-5 rounded-2xl border border-stone-800">
              {result.description}
            </p>
          </div>

          {/* Top Pick Coffee Showcase */}
          {topCoffee && (
            <div className="p-6 rounded-2xl bg-stone-950 border border-amber-900/60 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Handpicked Signature Match for You:
              </span>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold text-white">{topCoffee.name}</h4>
                  <p className="text-xs text-stone-400 mt-0.5">{topCoffee.origin} • {topCoffee.roastLevel} Roast</p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {topCoffee.flavorNotes.map((note, nIdx) => (
                      <span key={nIdx} className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[11px] text-amber-200">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                  <button
                    onClick={() => onSelectCoffee(topCoffee)}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    View Bean Profile
                  </button>

                  <button
                    onClick={() => onSelectBrewMethod(topCoffee.recommendedBrew[0])}
                    className="px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-600 text-stone-300 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Droplets className="w-3.5 h-3.5 text-amber-400" />
                    <span>Brew with {topCoffee.recommendedBrew[0]}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Retake Button */}
          <div className="text-center pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-white text-xs font-semibold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Palate Quiz</span>
            </button>
          </div>

        </div>
      )}

    </section>
  );
}
