# ☕ cofffee-web-app

> **Artisan Kaapi & Brew** — A specialty coffee web application celebrating world single-origins, Indian heritage beans (*Monsoon Malabar, Chikmagalur, Coorg, Araku Valley*), interactive brewing calculators with live audio timers, coffee personality quizzes, and an intelligent AI Barista Sommelier.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

---

## 🌟 Key Features

### ☕ Curated Coffee Catalog
- **World & Indian Single Origins**: Explore artisanal lots including *Monsoon Malabar AA*, *Chikmagalur Kaapi Royale*, *Araku Valley Organic Reserve*, *Ethiopian Yirgacheffe G1*, *Panama Boquete Geisha*, *Kenyan AA*, *Sumatra Mandheling*, and more.
- **Detailed Profiles**: Sensory gauges for Acidity, Body, Sweetness, and Roast Intensity.
- **Elevation & Terroir**: Altitude, processing method, harvest periods, and food/dessert pairings.

### 🔍 Real-Time Search & Advanced Multi-Filter
- Search by bean name, origin country, or specific tasting notes (*e.g., Cardamom, Jasmine, Dark Chocolate, Toffee*).
- Filter by Roast Profile (Light, Medium, Medium-Dark, Dark), Bean Varietal (Arabica, Robusta, Blends), Region, Processing, and Recommended Gear.
- Sort by Highest Rated, Acidity (Low to High for sensitive palates), Intensity, and Price.

### 🇮🇳 Indian Coffee Origin Explorer
- Dedicated spotlight on India's 100% shade-grown two-tier rainforest coffee ecosystem (*Est. 1670 AD*).
- **The Legend of Baba Budan**: The 7 sacred coffee seeds brought from Yemen to the Chandradrona Hills of Chikmagalur.
- **Monsoon Malabar Geographical Indication (GI)**: How oceanic monsoon winds swell beans to radiant ivory gold and naturally eliminate acidity.
- **South Indian Degree Kaapi**: Interactive 80:20 vs 70:30 Coffee-to-Chicory ratio simulator, decoction science, and the traditional brass *dabarah & tumbler* frothing ritual ("Meter Kaapi").

### 💧 Brewing Guides & Live Audio Stopwatch
- **7 Brewing Methods**:
  1. South Indian Filter Coffee (Degree Kaapi)
  2. Hario V60 / Pour Over
  3. French Press (Immersion)
  4. Espresso (9-Bar Extraction)
  5. Moka Pot (Stovetop)
  6. AeroPress (Inverted Method)
  7. Cold Brew (Slow Steep)
- **Dynamic Servings Calculator**: Automatically computes coffee dose (grams), water weight (ml), grind size, and water temperature (°C & °F).
- **Live Guided Timer**: Stage-by-stage instructions with Web Audio API chime sounds on stage transitions and brew completion.

### 🎯 "Find My Coffee" Quiz & Coffee Personality
- 5-step sensory and palate quiz.
- Discovers your unique coffee archetype:
  - *The Velvet Purist* 🌸
  - *The Monsooned Alchemist* 🇮🇳
  - *The Dark Roast Commander* ⚡
  - *The Golden Connoisseur* 🍯
- Celebratory confetti animation (`canvas-confetti`) and tailored bean recommendations.

### ☀️ "What Should I Drink Right Now?" Widget
- Reads the current time of day (*Morning Awakening, Midday Rush, Afternoon Slump, Evening Wind-Down*).
- Matches with your current mood (*Urgent Focus, Cozy Ritual, Dessert Pairing, Iced Refreshment*) to recommend the perfect cup.

### 🌦️ Weather-Based Coffee Recommendation
- Atmospheric guidance for Sunny & Warm, Rainy Monsoon Cozy, Chilly Winter, and Breezy Afternoons.
- Adjusts brewing temperature, extraction gear, and beverage style for current weather.

### 📊 Coffee Comparison Tool
- Select up to 3 coffees from the catalog to benchmark side-by-side.
- Compares roast intensity, acidity bars, mouthfeel, price, elevation, and best brewing equipment.

### 🤖 AI Coffee Sommelier & Assistant
- Context-aware virtual barista that troubleshoots sour vs bitter brews, reveals the secrets to South Indian filter coffee, explains coffee extraction physics, and suggests beans for any palate.

### 📜 Personal Coffee History / Brew Journal
- Log your daily cups with coffee roast, brew method, grind size, dose, star rating, and custom tasting notes.
- Persisted locally with `localStorage`.

### ⭐ Ratings & Reviews System
- Read verified community reviews.
- Submit your own ratings, tasting notes, and equipment used.

### 👤 User Profile & Badges
- Personalized user profile modal with customizable handle, email, and favorite origin.
- Earn badges: *Origins Explorer*, *Kaapi Master*, *Live Timer Pro*, and *Tasting Critic*.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio Synthesis**: Native Browser Web Audio API (zero audio asset dependencies)
- **Data Persistence**: `localStorage` (Wishlist, Comparisons, Brew Journal, User Reviews, Profile)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/yuktha5/cofffee-web-app.git

# Navigate into the project directory
cd cofffee-web-app

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Production Build

```bash
# Build optimized production bundle in /dist
npm run build

# Preview production build locally
npm run preview
```

---

## ☕ Git & Deployment Instructions

```bash
git init
git add .
git commit -m "feat: complete artisan coffee web application"
git branch -M main
git remote add origin https://github.com/yuktha5/cofffee-web-app.git
git push -u origin main
```

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
