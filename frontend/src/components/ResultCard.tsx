import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning";
  className?: string;
  delay?: number;
}

export function ResultCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
  className,
  delay = 0,
}: ResultCardProps) {
  const variantStyles = {
    default: "bg-card border-border",
    primary: "bg-accent-subtle border-primary/20",
    success: "bg-success-subtle border-success/20",
    warning: "bg-warning-subtle border-warning/20",
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-5 transition-all duration-200 hover:shadow-card animate-slide-up",
        variantStyles[variant],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-caption text-muted-foreground uppercase tracking-wider font-medium">
            {title}
          </p>
          <p className="text-title text-foreground">{value}</p>
          {subtitle && (
            <p className="text-caption text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-md bg-secondary">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
