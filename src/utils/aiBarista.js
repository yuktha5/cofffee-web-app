import { COFFEES, BREWING_GUIDES } from '../data/coffeeData';

export function getAiBaristaResponse(userQuery) {
  const query = userQuery.toLowerCase().trim();

  // 1. Sour vs Bitter troubleshooting
  if (query.includes('sour') || query.includes('tart') || query.includes('lemon') && query.includes('too')) {
    return {
      answer: `⚡ **Why is your coffee tasting sour?**\n\nSourness is the classic symptom of **under-extraction**. When water hasn't extracted enough sweetness and caramelized sugars from the coffee grounds, only early organic acids make it into the cup.\n\n**How to fix it immediately:**\n1. **Grind finer**: A finer grind exposes more surface area to water.\n2. **Increase water temperature**: Use hotter water (93°C - 96°C) to accelerate extraction.\n3. **Increase brew time**: Let immersion brews (French press) steep 30-60 seconds longer.\n4. **Increase water ratio**: Use slightly more water per gram of coffee.`,
      recommendedCoffee: 'colombian-supremo'
    };
  }

  if (query.includes('bitter') || query.includes('harsh') || query.includes('astringent') || query.includes('burnt')) {
    return {
      answer: `🛡️ **Why is your coffee tasting bitter or dry?**\n\nBitterness and astringency (dry mouthfeel) indicate **over-extraction** or burnt grounds. You've dissolved heavy, unpleasant polyphenols and tannins.\n\n**How to fix it:**\n1. **Grind coarser**: Prevents water from stalling and over-dissolving bitter compounds.\n2. **Lower water temperature**: Drop your kettle to 90°C - 92°C.\n3. **Shorten contact time**: Don't let coffee sit on grounds after drawdown or plunge.\n4. **Try naturally sweet, low-acid beans**: Like our **Monsoon Malabar AA** or **Costa Rica Tarrazú Honey**!`,
      recommendedCoffee: 'monsoon-malabar'
    };
  }

  // 2. South Indian Filter Kaapi
  if (query.includes('south indian') || query.includes('filter coffee') || query.includes('kaapi') || query.includes('degree') || query.includes('chicory')) {
    return {
      answer: `🇮🇳 **The Secret to Authentic South Indian Degree Kaapi:**\n\n1. **The Ideal Blend**: Authentic Kaapi uses **80% Coffee (Peaberry/Plantation A) + 20% Roasted Chicory**. Chicory adds darkness, body, viscosity, and retains heat.\n2. **Tamping Secret**: Place the umbrella disc *gently*—never press too firmly, or the holes will choke!\n3. **First Decoction Only**: The first drip through the stainless steel/brass filter contains 85% of aroma and punch.\n4. **The Meter Pour**: Froth vigorously by pouring back and forth between the *dabarah* and cylindrical *tumbler* from high up to aerate the thick decoction and boiled full-fat milk.\n\nTry our **Chikmagalur Kaapi Royale** or **Coorg Estate Blend** for an unbeatable cup!`,
      recommendedCoffee: 'chikmagalur-kaapi-royale'
    };
  }

  // 3. Monsoon Malabar inquiry
  if (query.includes('monsoon') || query.includes('malabar') || query.includes('golden')) {
    return {
      answer: `🌊 **What makes Monsoon Malabar unique in the entire world?**\n\nIt is the only coffee in the world cured by **monsoon ocean winds**. In the 1800s, British wooden sailing ships took 6 months to round the Cape of Good Hope. The humidity swelled the beans, stripped away their sharp fruit acids, and turned them radiant golden yellow.\n\nToday, beans are aged in open coastal warehouses along the Malabar coast from June to September. The result is a cup with **almost 0% acidity**, heavy body, and notes of cedar, cardamom, and baker's chocolate. Ideal for those with acid sensitivity!`,
      recommendedCoffee: 'monsoon-malabar'
    };
  }

  // 4. Low acid / sensitive stomach
  if (query.includes('acid') || query.includes('stomach') || query.includes('reflux') || query.includes('gentle')) {
    return {
      answer: `🌱 **Best Low-Acid Coffees for Sensitive Palates:**\n\nCoffee acidity comes from chlorogenic and citric acids. If you suffer from acid reflux or prefer silky smooth coffee:\n\n1. **Indian Monsoon Malabar AA**: The absolute gold standard of naturally low-acid coffee (Rating 2/10 acidity).\n2. **Sumatra Mandheling**: Wet-hulled dark roast with zero sharp tang.\n3. **Cold Brew method**: Brewing at cold temperatures extracts 65% less titratable acid than hot water!`,
      recommendedCoffee: 'monsoon-malabar'
    };
  }

  // 5. French Press
  if (query.includes('french press') || query.includes('plunger') || query.includes('bodum')) {
    return {
      answer: `🫖 **Barista Guide for French Press Perfection:**\n\n1. Use a **1:15 ratio** (30g coarse ground coffee to 450g water at 95°C).\n2. Pour all water fast to saturate grounds. Stir gently once.\n3. Let steep for **4 minutes** with lid on (unpressed).\n4. At 4 minutes, use two spoons to break the crust and skim off white foam.\n5. Press plunger down gently and **pour immediately**—do not let coffee sit in the carafe!`,
      recommendedCoffee: 'sumatra-mandheling'
    };
  }

  // 6. Espresso
  if (query.includes('espresso') || query.includes('crema') || query.includes('portafilter') || query.includes('tamp')) {
    return {
      answer: `⚡ **Dialing In the Perfect Espresso Shot:**\n\n• **Dose**: 18g finely ground coffee in a double basket.\n• **Yield**: 36g liquid espresso output in your cup (1:2 ratio).\n• **Time**: 26 - 30 seconds from pump activation.\n• **Look for**: A slow honey drip that expands into a creamy hazelnut tiger-striped crema. If it pours in under 20s, grind finer; if it drips past 35s and tastes burnt, grind coarser!`,
      recommendedCoffee: 'coorg-silver-cloud'
    };
  }

  // 7. V60 / Pour over
  if (query.includes('v60') || query.includes('pour over') || query.includes('chemex') || query.includes('drip')) {
    return {
      answer: `💧 **V60 Master Formula:**\n\n• **Ratio**: 1:16 (15g coffee to 240g water at 93°C).\n• **The Bloom**: 45g water for 45 seconds. Let the freshly roasted gases escape.\n• **Pour pattern**: Gentle, concentric circles from center outwards, never pouring directly against the paper filter.\n• **Target Finish**: 3:00 - 3:15 minutes.\n\nSingle origin coffees like **Ethiopian Yirgacheffe G1** or **Panama Geisha** shine brightest here!`,
      recommendedCoffee: 'ethiopia-yirgacheffe'
    };
  }

  // 8. Fruity / floral / sweet search
  if (query.includes('fruit') || query.includes('floral') || query.includes('jasmine') || query.includes('light')) {
    return {
      answer: `🌸 **Looking for Bright, Floral & Fruity Coffees?**\n\nYou'll adore heirloom African & Central American high-altitude washed lots:\n\n• **Ethiopian Yirgacheffe G1**: Bursting with bergamot, fresh jasmine blossoms, and sweet lemon zest.\n• **Panama Boquete Geisha**: Notes of white peach, orchid, and honeyed champagne.\n• **Araku Valley Reserve**: Wild berry jam and raw honey fermented by tribal cooperatives in India.`,
      recommendedCoffee: 'ethiopia-yirgacheffe'
    };
  }

  // 9. Chocolate / Caramel / Dark Roast
  if (query.includes('chocolate') || query.includes('caramel') || query.includes('dark') || query.includes('nutty')) {
    return {
      answer: `🍫 **Craving Rich Chocolate, Toffee & Caramel?**\n\nThese coffees feature deeply caramelized natural sugars without excessive bitterness:\n\n• **Colombian Supremo Huila**: Silky milk chocolate, dulce de leche, and sweet red apple.\n• **Chikmagalur Kaapi Royale**: Roasted hazelnut, cacao nibs, and cinnamon.\n• **Coorg Shade-Grown Estate**: Dark cocoa, molasses, and cracked black pepper.`,
      recommendedCoffee: 'colombian-supremo'
    };
  }

  // Fallback intelligent recommendation
  const randomPick = COFFEES[Math.floor(Math.random() * COFFEES.length)];
  return {
    answer: `☕ **Barista Recommendation for "${userQuery}":**\n\nGreat question! In the specialty coffee world, flavor is shaped by three key pillars: **Elevation** (higher means sweeter, denser beans), **Processing** (Washed gives clarity, Natural gives juicy fruit), and **Roast Profile**.\n\nBased on your query, I think you'll love **${randomPick.name}** from ${randomPick.country}. It features notes of *${randomPick.flavorNotes.slice(0, 3).join(', ')}* with a balanced rating of ${randomPick.rating}⭐. Try brewing it using ${randomPick.recommendedBrew[0]}!`,
    recommendedCoffee: randomPick.id
  };
}
