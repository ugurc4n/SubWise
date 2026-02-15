"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Abonelikler", href: "/subscriptions", icon: CreditCard },
  { name: "Analiz", href: "/analytics", icon: BarChart3 },
  { name: "Ayarlar", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight">SubWise</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
