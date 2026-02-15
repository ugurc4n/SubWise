export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string;
  price_in_try: number | null;
  billing_period: string;
  category: Category | null;
  start_date: string;
  next_billing_date: string;
  is_free_trial: boolean;
  free_trial_end_date: string | null;
  free_trial_days_remaining: number | null;
  is_active: boolean;
  description: string | null;
  notes: string | null;
  url: string | null;
  logo_url: string | null;
  created_at: string;
}

export interface SubscriptionListResponse {
  items: Subscription[];
  total: number;
}

export interface SubscriptionCreate {
  name: string;
  price: number;
  currency: "TRY" | "USD" | "EUR";
  billing_period: "weekly" | "monthly" | "yearly";
  category_id?: string | null;
  start_date: string;
  is_free_trial?: boolean;
  free_trial_end_date?: string | null;
  description?: string | null;
  notes?: string | null;
  url?: string | null;
  logo_url?: string | null;
}

export interface SubscriptionUpdate extends Partial<SubscriptionCreate> {
  is_active?: boolean;
}

export interface CategoryListResponse {
  items: Category[];
}
