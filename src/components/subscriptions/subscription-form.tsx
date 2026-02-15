"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
    },
  });

  const isFreeTrial = form.watch("is_free_trial");

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
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
              <SelectItem value="weekly">Haftalık</SelectItem>
              <SelectItem value="monthly">Aylık</SelectItem>
              <SelectItem value="yearly">Yıllık</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Kategori</Label>
          <Select
            value={form.watch("category_id") || ""}
            onValueChange={(v) => form.setValue("category_id", v || undefined)}
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
          <Label>Başlangıç Tarihi</Label>
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
                onSelect={(date) => date && form.setValue("start_date", date)}
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
