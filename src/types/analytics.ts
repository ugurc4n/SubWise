export interface CurrencyTotal {
  currency: string;
  total: number;
  total_in_try: number;
}

export interface SpendingSummary {
  total_monthly_try: number;
  total_yearly_try: number;
  subscription_count: number;
  currency_breakdown: CurrencyTotal[];
}

export interface CategoryBreakdown {
  category_name: string;
  category_color: string | null;
  category_icon: string | null;
  total_monthly_try: number;
  subscription_count: number;
}

export interface SpendingTrend {
  month: string;
  total_try: number;
  subscription_count: number;
}

export interface UpcomingPayment {
  subscription_id: string;
  name: string;
  price: number;
  currency: string;
  price_in_try: number;
  next_billing_date: string;
  logo_url: string | null;
  category_name: string | null;
}

export interface TrialInfo {
  subscription_id: string;
  name: string;
  free_trial_end_date: string;
  days_remaining: number;
  logo_url: string | null;
}

export interface ExchangeRateItem {
  base_currency: string;
  target_currency: string;
  rate: number;
  fetched_at: string;
}

export interface ExchangeRateResponse {
  rates: ExchangeRateItem[];
}
