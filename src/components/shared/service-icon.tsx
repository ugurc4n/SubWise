import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ServiceIconProps {
  name: string;
  logoUrl?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

const colors = [
  "bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-[0_0_12px_oklch(0.7_0.18_230_/_0.4)]",
  "bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-[0_0_12px_oklch(0.65_0.22_295_/_0.4)]",
  "bg-pink-500/20 text-pink-400 border border-pink-500/40 shadow-[0_0_12px_oklch(0.7_0.25_340_/_0.4)]",
  "bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-[0_0_12px_oklch(0.75_0.2_45_/_0.4)]",
  "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_oklch(0.7_0.18_150_/_0.4)]",
  "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_oklch(0.8_0.15_195_/_0.4)]",
  "bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_12px_oklch(0.7_0.22_355_/_0.4)]",
  "bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 shadow-[0_0_12px_oklch(0.6_0.2_265_/_0.4)]",
];

function getColorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function ServiceIcon({ name, logoUrl, size = "md" }: ServiceIconProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={sizeClasses[size]}>
      {logoUrl && <AvatarImage src={logoUrl} alt={name} />}
      <AvatarFallback
        className={`${getColorForName(name)} font-semibold ${sizeClasses[size]}`}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
