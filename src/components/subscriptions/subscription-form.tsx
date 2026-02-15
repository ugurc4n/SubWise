"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  GOOGLE_ONE_TEMPLATES,
  DISNEY_PLUS_TEMPLATES,
  EXXEN_TEMPLATES,
  AMAZON_PRIME_TEMPLATES,
  SPOTIFY_TEMPLATES,
  YOUTUBE_PREMIUM_TEMPLATES,
  APPLE_MUSIC_TEMPLATES,
  XBOX_GAME_PASS_TEMPLATES,
  PLAYSTATION_PLUS_TEMPLATES,
  ICLOUD_PLUS_TEMPLATES,
  MAX_TEMPLATES,
  NETFLIX_TEMPLATES,
  type SubscriptionTemplate,
} from "@/lib/subscription-templates";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/use-categories";
import type { Subscription, SubscriptionCreate } from "@/types/subscription";

const formSchema = z.object({
  name: z.string().min(1, "Servis adı gerekli"),
  price: z.number().positive("Fiyat 0'dan büyük olmalı"),
  currency: z.enum(["TRY", "USD", "EUR"]),
  billing_period: z.enum(["weekly", "monthly", "yearly"]),
  category_id: z.string().optional(),
  start_date: z.date(),
  is_free_trial: z.boolean(),
  free_trial_end_date: z.date().optional().nullable(),
  description: z.string().optional(),
  notes: z.string().optional(),
  url: z.string().url("Geçerli bir URL girin").optional().or(z.literal("")),
  logo_url: z.string().optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface SubscriptionFormProps {
  subscription?: Subscription;
  onSubmit: (data: SubscriptionCreate) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SubscriptionForm({
  subscription,
  onSubmit,
  onCancel,
  isLoading,
}: SubscriptionFormProps) {
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.items || [];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subscription?.name || "",
      price: subscription?.price || 0,
      currency: (subscription?.currency as "TRY" | "USD" | "EUR") || "TRY",
      billing_period:
        (subscription?.billing_period as "weekly" | "monthly" | "yearly") ||
        "monthly",
      category_id: subscription?.category?.id || undefined,
      start_date: subscription?.start_date
        ? new Date(subscription.start_date)
        : new Date(),
      is_free_trial: subscription?.is_free_trial || false,
      free_trial_end_date: subscription?.free_trial_end_date
        ? new Date(subscription.free_trial_end_date)
        : null,
      description: subscription?.description || "",
      notes: subscription?.notes || "",
      url: subscription?.url || "",
      logo_url: subscription?.logo_url || "",
    },
  });

  const isFreeTrial = form.watch("is_free_trial");

  const providers = [
    {
      id: "googleOne",
      name: "Google One",
      logo_url: GOOGLE_ONE_TEMPLATES[0]?.logo_url || "",
      templates: GOOGLE_ONE_TEMPLATES,
    },
    {
      id: "netflix",
      name: "Netflix",
      logo_url: NETFLIX_TEMPLATES[0]?.logo_url || "",
      templates: NETFLIX_TEMPLATES,
    },
    {
      id: "disneyPlus",
      name: "Disney+",
      logo_url: DISNEY_PLUS_TEMPLATES[0]?.logo_url || "",
      templates: DISNEY_PLUS_TEMPLATES,
    },
    {
      id: "exxen",
      name: "Exxen",
      logo_url: EXXEN_TEMPLATES[0]?.logo_url || "",
      templates: EXXEN_TEMPLATES,
    },
    {
      id: "amazonPrime",
      name: "Amazon Prime",
      logo_url: AMAZON_PRIME_TEMPLATES[0]?.logo_url || "",
      templates: AMAZON_PRIME_TEMPLATES,
    },
    {
      id: "spotify",
      name: "Spotify",
      logo_url: SPOTIFY_TEMPLATES[0]?.logo_url || "",
      templates: SPOTIFY_TEMPLATES,
    },
    {
      id: "youtubePremium",
      name: "YouTube Premium",
      logo_url: YOUTUBE_PREMIUM_TEMPLATES[0]?.logo_url || "",
      templates: YOUTUBE_PREMIUM_TEMPLATES,
    },
    {
      id: "appleMusic",
      name: "Apple Music",
      logo_url: APPLE_MUSIC_TEMPLATES[0]?.logo_url || "",
      templates: APPLE_MUSIC_TEMPLATES,
    },
    {
      id: "xboxGamePass",
      name: "Xbox Game Pass",
      logo_url: XBOX_GAME_PASS_TEMPLATES[0]?.logo_url || "",
      templates: XBOX_GAME_PASS_TEMPLATES,
    },
    {
      id: "playstationPlus",
      name: "PlayStation Plus",
      logo_url: PLAYSTATION_PLUS_TEMPLATES[0]?.logo_url || "",
      templates: PLAYSTATION_PLUS_TEMPLATES,
    },
    {
      id: "icloudPlus",
      name: "iCloud+",
      logo_url: ICLOUD_PLUS_TEMPLATES[0]?.logo_url || "",
      templates: ICLOUD_PLUS_TEMPLATES,
    },
    {
      id: "max",
      name: "Max",
      logo_url: MAX_TEMPLATES[0]?.logo_url || "",
      templates: MAX_TEMPLATES,
    },
  ];

  const [selectedProviderId, setSelectedProviderId] =
    useState<string | null>(null);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(
    null
  );
  const [isManualMode, setIsManualMode] = useState(false);

  const selectedProvider = providers.find(
    (provider) => provider.id === selectedProviderId
  );

  const handleTemplateSelect = (template: SubscriptionTemplate) => {
    setSelectedTemplateKey(`${template.name}-${template.price}`);
    form.setValue("name", template.name);
    form.setValue("price", template.price);
    form.setValue("currency", template.currency);
    form.setValue("billing_period", template.billing_period);
    form.setValue("description", template.description);
    form.setValue("url", template.url || "");
    form.setValue("logo_url", template.logo_url);

    if (template.category_name) {
      const matchingCategory = categories.find(
        (cat) => cat.name === template.category_name
      );
      if (matchingCategory) {
        form.setValue("category_id", matchingCategory.id);
      }
    }
  };

  const handleSubmit = (data: FormData) => {
    onSubmit({
      ...data,
      start_date: format(data.start_date, "yyyy-MM-dd"),
      free_trial_end_date: data.free_trial_end_date
        ? format(data.free_trial_end_date, "yyyy-MM-dd")
        : null,
      category_id: data.category_id || null,
      description: data.description || null,
      notes: data.notes || null,
      url: data.url || null,
      logo_url: data.logo_url || null,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {!isManualMode ? (
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Popüler Abonelikler
            </Label>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() =>
                    {
                      const nextProviderId =
                        selectedProviderId === provider.id ? null : provider.id;
                      setSelectedProviderId(nextProviderId);
                      if (nextProviderId === null) {
                        setSelectedTemplateKey(null);
                      } else if (nextProviderId !== selectedProviderId) {
                        setSelectedTemplateKey(null);
                      }
                    }
                  }
                  className={cn(
                    "relative flex items-center gap-3 rounded-lg border-2 border-muted bg-muted/30 p-3 transition-all hover:border-primary hover:bg-muted/50 active:scale-95",
                    selectedProviderId === provider.id &&
                      "border-primary bg-muted/60"
                  )}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white">
                    <img
                      src={provider.logo_url}
                      alt={provider.name}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <h4 className="text-sm font-medium leading-snug text-foreground break-words">
                      {provider.name}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Paketleri gor
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {selectedProvider ? (
              <div className="mt-4 space-y-3">
                <div className="text-sm font-medium text-foreground">
                  {selectedProvider.name} Paketleri
                </div>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {selectedProvider.templates.map((template, index) => (
                    <button
                      key={`${selectedProvider.id}-${index}`}
                      type="button"
                      onClick={() => handleTemplateSelect(template)}
                      className={cn(
                        "relative flex items-start gap-3 rounded-lg border-2 border-muted bg-muted/30 p-3 transition-all hover:border-primary hover:bg-muted/50 active:scale-95",
                        selectedTemplateKey ===
                          `${template.name}-${template.price}` &&
                          "border-primary bg-muted/60"
                      )}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white">
                        <img
                          src={template.logo_url}
                          alt={template.name}
                          className="h-10 w-10 object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1 text-left">
                        <h4 className="text-sm font-medium leading-snug text-foreground break-words">
                          {template.name}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {template.price} {template.currency}
                        </p>
                      </div>

                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 opacity-0 transition-opacity hover:opacity-100">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {selectedTemplateKey ? (
            <div className="space-y-3 rounded-lg border border-muted bg-muted/20 p-3">
              <div className="text-sm font-medium text-foreground">
                Hizli Duzenleme
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Fatura Periyodu</Label>
                  <Select
                    value={form.watch("billing_period")}
                    onValueChange={(v) =>
                      form.setValue(
                        "billing_period",
                        v as "weekly" | "monthly" | "yearly"
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Aylık</SelectItem>
                      <SelectItem value="yearly">Yıllık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ödeme Tarihi</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.watch("start_date") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.watch("start_date")
                          ? format(form.watch("start_date"), "dd MMMM yyyy", {
                              locale: tr,
                            })
                          : "Tarih seçin"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.watch("start_date")}
                        onSelect={(date) =>
                          date && form.setValue("start_date", date)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Notlar</Label>
                  <Textarea
                    id="notes"
                    placeholder="Opsiyonel notlar..."
                    rows={2}
                    {...form.register("notes")}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setIsManualMode(true)}
          >
            Manuel olarak ekle
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Manuel Ekleme</Label>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsManualMode(false)}
            >
              Populer abonelikleri goster
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Servis Adı</Label>
              <Input
                id="name"
                placeholder="Netflix, Spotify..."
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Fiyat</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...form.register("price", { valueAsNumber: true })}
              />
              {form.formState.errors.price && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Para Birimi</Label>
              <Select
                value={form.watch("currency")}
                onValueChange={(v) =>
                  form.setValue("currency", v as "TRY" | "USD" | "EUR")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TRY">TRY - Türk Lirası</SelectItem>
                  <SelectItem value="USD">USD - Amerikan Doları</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fatura Periyodu</Label>
              <Select
                value={form.watch("billing_period")}
                onValueChange={(v) =>
                  form.setValue(
                    "billing_period",
                    v as "weekly" | "monthly" | "yearly"
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Aylık</SelectItem>
                  <SelectItem value="yearly">Yıllık</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select
                value={form.watch("category_id") || ""}
                onValueChange={(v) =>
                  form.setValue("category_id", v || undefined)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ödeme Tarihi</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("start_date") && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("start_date")
                      ? format(form.watch("start_date"), "dd MMMM yyyy", {
                          locale: tr,
                        })
                      : "Tarih seçin"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.watch("start_date")}
                    onSelect={(date) =>
                      date && form.setValue("start_date", date)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="is_free_trial">Ücretsiz Deneme</Label>
                <Switch
                  id="is_free_trial"
                  checked={isFreeTrial}
                  onCheckedChange={(v) => form.setValue("is_free_trial", v)}
                />
              </div>
            </div>

            {isFreeTrial && (
              <div className="space-y-2 sm:col-span-2">
                <Label>Deneme Bitiş Tarihi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.watch("free_trial_end_date") &&
                          "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch("free_trial_end_date")
                        ? format(
                            form.watch("free_trial_end_date")!,
                            "dd MMMM yyyy",
                            { locale: tr }
                          )
                        : "Tarih seçin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.watch("free_trial_end_date") || undefined}
                      onSelect={(date) =>
                        form.setValue("free_trial_end_date", date || null)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://..."
                {...form.register("url")}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="notes">Notlar</Label>
              <Textarea
                id="notes"
                placeholder="Opsiyonel notlar..."
                rows={2}
                {...form.register("notes")}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Kaydediliyor..."
            : subscription
            ? "Güncelle"
            : "Ekle"}
        </Button>
      </div>
    </form>
  );
}
