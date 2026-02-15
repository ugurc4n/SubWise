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
  "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  "bg-red-500/10 text-red-600 dark:text-red-400",
  "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
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
