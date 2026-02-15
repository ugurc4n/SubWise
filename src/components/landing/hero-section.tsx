"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">SubSly</h1>
          <div className="flex gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Giriş Yap</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Kayıt Ol</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-cyan-600/20 via-purple-600/10 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Aboneliklerinizi Akıllıca Yönetin
              </h2>
              <p className="text-xl text-muted-foreground">
                Tüm aboneliklerinizi tek bir yerden takip edin, harcamalarınızı analiz edin ve kontrolü elinize alın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up">
                  <Button size="lg" className="w-full sm:w-auto">
                    Hemen Başlayın
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Giriş Yap
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 SubSly - tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
