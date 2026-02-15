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
import { UserNav } from "./user-nav";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Abonelikler", href: "/subscriptions", icon: CreditCard },
  { name: "Analiz", href: "/analytics", icon: BarChart3 },
  { name: "Ayarlar", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-sidebar-border bg-sidebar backdrop-blur-2xl">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary shadow-[0_0_20px_oklch(0.8_0.15_195_/_0.5)]">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">SubWise</span>
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
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-primary border border-cyan-500/30 shadow-[0_0_15px_oklch(0.8_0.15_195_/_0.3)]"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 hover:border hover:border-cyan-500/20"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <UserNav />
          <span className="text-sm text-muted-foreground">Hesabım</span>
        </div>
      </div>
    </aside>
  );
}
