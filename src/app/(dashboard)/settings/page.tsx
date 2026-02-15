"use client";

import { UserProfile } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Ayarlar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Hesap ayarlarınızı yönetin
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Hesap Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 w-full",
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
