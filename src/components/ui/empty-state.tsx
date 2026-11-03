import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed p-8 text-center",
        className,
      )}
    >
      <h3 className="text-xl">{title}</h3>
      <div className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
