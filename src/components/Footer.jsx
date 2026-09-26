import React from 'react';
import { Coffee, Heart, Sparkles, MapPin, Droplets, BookOpen, ExternalLink } from 'lucide-react';

export function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#0e0805] border-t border-amber-950/60 pt-16 pb-12 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center text-stone-950 font-bold">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Artisan Kaapi & Brew
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Celebrating single origins, timeless Indian coffee heritage from 1670 AD, precision brew extraction science, and sensory craftsmanship.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Explorer Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-300 transition-colors">
                  ☕ Curated Coffee Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('indian-origins')} className="hover:text-amber-300 transition-colors">
                  🇮🇳 Indian Origins & Chikmagalur
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('brewing')} className="hover:text-amber-300 transition-colors">
                  💧 Brew Guides & Live Audio Timer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-amber-300 transition-colors">
                  🎯 "Find My Coffee" Palate Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Coffee Science */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Knowledge & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('beans')} className="hover:text-amber-300 transition-colors">
                  🫘 Arabica vs Robusta vs Liberica
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('beans')} className="hover:text-amber-300 transition-colors">
                  🌊 The Oceanic Monsoon Malabar Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-amber-300 transition-colors">
                  📜 Personal Tasting Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Quote & Github */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Coffee Wisdom
            </h4>
            <blockquote className="italic text-stone-300 border-l-2 border-amber-600 pl-3 leading-relaxed">
              "Good ideas start with brainstorming. Great ideas start with coffee."
            </blockquote>
            <div className="pt-2">
              <a
                href="https://github.com/yuktha5/cofffee-web-app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 hover:text-white hover:border-amber-700 transition-all"
              >
                <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>yuktha5 / cofffee-web-app</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Artisan Kaapi & Brew. Built with passion for coffee lovers worldwide.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> and freshly brewed coffee.
          </p>
        </div>

      </div>
    </footer>
  );
}
