"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useState, useRef } from "react";

export const dynamic = 'force-dynamic';
import { useRouter } from "next/navigation";
import { Plus, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { SubscriptionCard } from "@/components/subscriptions/subscription-card";
import { SubscriptionForm } from "@/components/subscriptions/subscription-form";
import {
  useSubscriptions,
  useCreateSubscription,
  useUpdateSubscription,
  useDeleteSubscription,
} from "@/hooks/use-subscriptions";
import type { Subscription, SubscriptionCreate } from "@/types/subscription";

export default function SubscriptionsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] =
    useState<Subscription | null>(null);
  const [deletingSubscription, setDeletingSubscription] =
    useState<Subscription | null>(null);
  const addModalContentRef = useRef<HTMLDivElement>(null);
  const editModalContentRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useSubscriptions();
  const createMutation = useCreateSubscription();
  const updateMutation = useUpdateSubscription();
  const deleteMutation = useDeleteSubscription();

  const handleCreate = async (formData: SubscriptionCreate) => {
    try {
      await createMutation.mutateAsync(formData);
      setIsFormOpen(false);
      toast.success("Abonelik eklendi");
    } catch {
      toast.error("Abonelik eklenirken hata oluştu");
    }
  };

  const handleUpdate = async (formData: SubscriptionCreate) => {
    if (!editingSubscription) return;
    try {
      await updateMutation.mutateAsync({
        id: editingSubscription.id,
        data: formData,
      });
      setEditingSubscription(null);
      toast.success("Abonelik güncellendi");
    } catch {
      toast.error("Abonelik güncellenirken hata oluştu");
    }
  };

  const handleDelete = async () => {
    if (!deletingSubscription) return;
    try {
      await deleteMutation.mutateAsync(deletingSubscription.id);
      setDeletingSubscription(null);
      toast.success("Abonelik silindi");
    } catch {
      toast.error("Abonelik silinirken hata oluştu");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Abonelikler</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tüm dijital aboneliklerinizi yönetin
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Abonelik
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-border/50 p-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      ) : !data?.items.length ? (
        <EmptyState
          icon={CreditCard}
          title="Henüz abonelik yok"
          description="İlk aboneliğinizi ekleyerek harcamalarınızı takip etmeye başlayın."
          action={
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Abonelik Ekle
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {data.items.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onEdit={setEditingSubscription}
              onDelete={setDeletingSubscription}
            />
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-5xl !p-0">
          <div ref={addModalContentRef} className="max-h-[85vh] overflow-y-auto space-y-4 p-6">
            <DialogHeader>
              <DialogTitle>Yeni Abonelik Ekle</DialogTitle>
            </DialogHeader>
            <SubscriptionForm
              onSubmit={handleCreate}
              onCancel={() => setIsFormOpen(false)}
              isLoading={createMutation.isPending}
              modalScrollContainer={addModalContentRef}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingSubscription}
        onOpenChange={() => setEditingSubscription(null)}
      >
        <DialogContent className="w-full max-w-[95vw] sm:max-w-5xl !p-0">
          <div ref={editModalContentRef} className="max-h-[85vh] overflow-y-auto space-y-4 p-6">
            <DialogHeader>
              <DialogTitle>Aboneliği Düzenle</DialogTitle>
            </DialogHeader>
            {editingSubscription && (
              <SubscriptionForm
                subscription={editingSubscription}
                onSubmit={handleUpdate}
                onCancel={() => setEditingSubscription(null)}
                isLoading={updateMutation.isPending}
                modalScrollContainer={editModalContentRef}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingSubscription}
        onOpenChange={() => setDeletingSubscription(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aboneliği Sil</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deletingSubscription?.name}&quot; aboneliğini silmek
              istediğinize emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
