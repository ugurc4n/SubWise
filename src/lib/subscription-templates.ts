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
    logo_url:
      "https://www.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png",
    url: "https://one.google.com",
  },
];

/**
 * Template categories mapping
 * Maps template to category names for easier lookup
 */
export const TEMPLATE_CATEGORIES = {
  googleOne: "Bulut Depolama", // Cloud Storage in Turkish
};

/**
 * Get templates by name
 */
export function getTemplatesByCategory(category: string) {
  if (category === "googleOne") {
    return GOOGLE_ONE_TEMPLATES;
  }
  return [];
}
