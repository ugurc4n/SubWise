/**
 * Popular subscription templates for quick selection
 * Users can click a template button to pre-fill the subscription form
 */

export interface SubscriptionTemplate {
  name: string;
  price: number;
  currency: "TRY" | "USD" | "EUR";
  billing_period: "weekly" | "monthly" | "yearly";
  description: string;
  category_id?: string;
  category_name?: string;
  logo_url: string;
  url?: string;
}

export const GOOGLE_ONE_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "Google One - 100 GB (Basic)",
    price: 49.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "100 GB cloud storage for Google Drive and Google Photos",
    category_name: "Bulut Depolama",
    logo_url:
      "https://www.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png",
    url: "https://one.google.com",
  },
  {
    name: "Google One - 200 GB (Standard)",
    price: 79.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "200 GB cloud storage for Google Drive and Google Photos",
    category_name: "Bulut Depolama",
    logo_url:
      "https://www.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png",
    url: "https://one.google.com",
  },
  {
    name: "Google One - 2 TB (Premium)",
    price: 204.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "2 TB cloud storage for Google Drive and Google Photos",
    category_name: "Bulut Depolama",
    logo_url:
      "https://www.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png",
    url: "https://one.google.com",
  },
  {
    name: "Google One - 2 TB + Gemini Advanced (AI)",
    price: 719.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "2 TB storage + Gemini Advanced AI assistant access",
    category_name: "Bulut Depolama",
    logo_url:
      "https://www.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png",
    url: "https://one.google.com",
  },
];

export const NETFLIX_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "Netflix Temel",
    price: 189.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "Netflix Temel paket",
    category_name: "Eğlence",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    url: "https://www.netflix.com",
  },
  {
    name: "Netflix Standart",
    price: 289.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "Netflix Standart paket",
    category_name: "Eğlence",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    url: "https://www.netflix.com",
  },
  {
    name: "Netflix Premium",
    price: 379.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "Netflix Premium paket",
    category_name: "Eğlence",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    url: "https://www.netflix.com",
  },
];

export const DISNEY_PLUS_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "Disney+ Reklamlı (Aylık)",
    price: 249.9,
    currency: "TRY",
    billing_period: "monthly",
    description: "Disney+ reklamlı paket (aylık)",
    category_name: "Eğlence",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    url: "https://www.disneyplus.com",
  },
  {
    name: "Disney+ Reklamlı (Yıllık)",
    price: 1649.0,
    currency: "TRY",
    billing_period: "yearly",
    description: "Disney+ reklamlı paket (yıllık)",
    category_name: "Eğlence",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    url: "https://www.disneyplus.com",
  },
  {
    name: "Disney+ Reklamsız (Aylık)",
    price: 449.9,
    currency: "TRY",
    billing_period: "monthly",
    description: "Disney+ reklamsız paket (aylık)",
    category_name: "Eğlence",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    url: "https://www.disneyplus.com",
  },
  {
    name: "Disney+ Reklamsız (Yıllık)",
    price: 3499.0,
    currency: "TRY",
    billing_period: "yearly",
    description: "Disney+ reklamsız paket (yıllık)",
    category_name: "Eğlence",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    url: "https://www.disneyplus.com",
  },
];

export const EXXEN_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "Exxen Temel (Reklamli)",
    price: 275.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "Exxen temel paket (reklamli)",
    category_name: "Eğlence",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/d/db/Exxen.png",
    url: "https://www.exxen.com",
  },
  {
    name: "Exxen Temel (Reklamsiz)",
    price: 380.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "Exxen temel paket (reklamsiz)",
    category_name: "Eğlence",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/d/db/Exxen.png",
    url: "https://www.exxen.com",
  },
  {
    name: "ExxenSpor (Reklamli)",
    price: 486.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "ExxenSpor paket (reklamli)",
    category_name: "Eğlence",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/d/db/Exxen.png",
    url: "https://www.exxen.com",
  },
  {
    name: "ExxenSpor (Reklamsiz)",
    price: 599.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "ExxenSpor paket (reklamsiz)",
    category_name: "Eğlence",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/d/db/Exxen.png",
    url: "https://www.exxen.com",
  },
];

export const AMAZON_PRIME_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "Amazon Prime Uyelik",
    price: 69.9,
    currency: "TRY",
    billing_period: "monthly",
    description: "Amazon Prime uyelik",
    category_name: "Eğlence",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/Amazon_Prime_logo_%282024%29.svg",
    url: "https://www.primevideo.com",
  },
];

export const SPOTIFY_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "Spotify Bireysel",
    price: 99.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "Spotify bireysel paket",
    category_name: "Müzik",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    url: "https://www.spotify.com",
  },
  {
    name: "Spotify Öğrenci",
    price: 55.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "Spotify ogrenci paket",
    category_name: "Müzik",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    url: "https://www.spotify.com",
  },
  {
    name: "Spotify Aile",
    price: 165.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "Spotify aile paket",
    category_name: "Müzik",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    url: "https://www.spotify.com",
  },
];

export const YOUTUBE_PREMIUM_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "YouTube Premium Bireysel",
    price: 79.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "YouTube Premium bireysel paket",
    category_name: "Müzik",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/YouTube_Premium_logo.svg",
    url: "https://www.youtube.com/premium",
  },
  {
    name: "YouTube Premium Öğrenci",
    price: 52.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "YouTube Premium ogrenci paket",
    category_name: "Müzik",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/YouTube_Premium_logo.svg",
    url: "https://www.youtube.com/premium",
  },
  {
    name: "YouTube Premium Aile",
    price: 159.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "YouTube Premium aile paket",
    category_name: "Müzik",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/YouTube_Premium_logo.svg",
    url: "https://www.youtube.com/premium",
  },
];

export const APPLE_MUSIC_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "Apple Music Bireysel",
    price: 59.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "Apple Music bireysel paket",
    category_name: "Müzik",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg",
    url: "https://music.apple.com",
  },
  {
    name: "Apple Music Öğrenci",
    price: 32.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "Apple Music ogrenci paket",
    category_name: "Müzik",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg",
    url: "https://music.apple.com",
  },
  {
    name: "Apple Music Aile",
    price: 99.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "Apple Music aile paket",
    category_name: "Müzik",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg",
    url: "https://music.apple.com",
  },
];

export const XBOX_GAME_PASS_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "Xbox Game Pass PC",
    price: 449.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "PC Game Pass",
    category_name: "Oyun",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Xbox_Game_Pass_new_logo_-_colored_version.svg",
    url: "https://www.xbox.com/xbox-game-pass",
  },
  {
    name: "Xbox Game Pass Core",
    price: 269.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "Game Pass Core",
    category_name: "Oyun",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Xbox_Game_Pass_new_logo_-_colored_version.svg",
    url: "https://www.xbox.com/xbox-game-pass",
  },
  {
    name: "Xbox Game Pass Ultimate",
    price: 799.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "Game Pass Ultimate",
    category_name: "Oyun",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Xbox_Game_Pass_new_logo_-_colored_version.svg",
    url: "https://www.xbox.com/xbox-game-pass",
  },
];

export const PLAYSTATION_PLUS_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "PlayStation Plus Essential",
    price: 270.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "PS Plus Essential",
    category_name: "Oyun",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/PlayStationPlus_%28No_Trademark%29.svg",
    url: "https://www.playstation.com/ps-plus/",
  },
  {
    name: "PlayStation Plus Extra",
    price: 405.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "PS Plus Extra",
    category_name: "Oyun",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/PlayStationPlus_%28No_Trademark%29.svg",
    url: "https://www.playstation.com/ps-plus/",
  },
  {
    name: "PlayStation Plus Deluxe",
    price: 475.0,
    currency: "TRY",
    billing_period: "monthly",
    description: "PS Plus Deluxe",
    category_name: "Oyun",
    logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/PlayStationPlus_%28No_Trademark%29.svg",
    url: "https://www.playstation.com/ps-plus/",
  },
];

export const ICLOUD_PLUS_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "iCloud+ 50 GB",
    price: 39.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "iCloud+ 50 GB",
    category_name: "Bulut Depolama",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/ICloud_logo.svg",
    url: "https://www.apple.com/icloud/",
  },
  {
    name: "iCloud+ 200 GB",
    price: 129.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "iCloud+ 200 GB",
    category_name: "Bulut Depolama",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/ICloud_logo.svg",
    url: "https://www.apple.com/icloud/",
  },
  {
    name: "iCloud+ 2 TB",
    price: 399.99,
    currency: "TRY",
    billing_period: "monthly",
    description: "iCloud+ 2 TB",
    category_name: "Bulut Depolama",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/ICloud_logo.svg",
    url: "https://www.apple.com/icloud/",
  },
];

export const MAX_TEMPLATES: SubscriptionTemplate[] = [
  {
    name: "Max Standart (Aylık)",
    price: 229.9,
    currency: "TRY",
    billing_period: "monthly",
    description: "Max Standart paket (aylık)",
    category_name: "Eğlence",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg",
    url: "https://www.max.com",
  },
  {
    name: "Max Standart (Yıllık)",
    price: 2299.0,
    currency: "TRY",
    billing_period: "yearly",
    description: "Max Standart paket (yıllık)",
    category_name: "Eğlence",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg",
    url: "https://www.max.com",
  },
  {
    name: "Max Ozel (Premium) (Aylık)",
    price: 299.9,
    currency: "TRY",
    billing_period: "monthly",
    description: "Max Ozel paket (aylık)",
    category_name: "Eğlence",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg",
    url: "https://www.max.com",
  },
  {
    name: "Max Ozel (Premium) (Yıllık)",
    price: 2999.0,
    currency: "TRY",
    billing_period: "yearly",
    description: "Max Ozel paket (yıllık)",
    category_name: "Eğlence",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg",
    url: "https://www.max.com",
  },
];

/**
 * Template categories mapping
 * Maps template to category names for easier lookup
 */
export const TEMPLATE_CATEGORIES = {
  googleOne: "Bulut Depolama", // Cloud Storage in Turkish
  netflix: "Eğlence",
  disneyPlus: "Eğlence",
  exxen: "Eğlence",
  amazonPrime: "Eğlence",
  spotify: "Müzik",
  youtubePremium: "Müzik",
  appleMusic: "Müzik",
  xboxGamePass: "Oyun",
  playstationPlus: "Oyun",
  icloudPlus: "Bulut Depolama",
  max: "Eğlence",
};

/**
 * Get templates by name
 */
export function getTemplatesByCategory(category: string) {
  if (category === "googleOne") {
    return GOOGLE_ONE_TEMPLATES;
  }
  if (category === "netflix") {
    return NETFLIX_TEMPLATES;
  }
  if (category === "disneyPlus") {
    return DISNEY_PLUS_TEMPLATES;
  }
  if (category === "exxen") {
    return EXXEN_TEMPLATES;
  }
  if (category === "amazonPrime") {
    return AMAZON_PRIME_TEMPLATES;
  }
  if (category === "spotify") {
    return SPOTIFY_TEMPLATES;
  }
  if (category === "youtubePremium") {
    return YOUTUBE_PREMIUM_TEMPLATES;
  }
  if (category === "appleMusic") {
    return APPLE_MUSIC_TEMPLATES;
  }
  if (category === "xboxGamePass") {
    return XBOX_GAME_PASS_TEMPLATES;
  }
  if (category === "playstationPlus") {
    return PLAYSTATION_PLUS_TEMPLATES;
  }
  if (category === "icloudPlus") {
    return ICLOUD_PLUS_TEMPLATES;
  }
  if (category === "max") {
    return MAX_TEMPLATES;
  }
  return [];
}
