import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** The child control uses id; descriptions/errors use the exported ID helpers. */
export function Field({
  id,
  label,
  description,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  description?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid content-start gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {description && (
        <p id={`${id}-description`} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function ErrorSummary({
  errors,
}: {
  errors: { id: string; message: string }[];
}) {
  if (!errors.length) return null;
  return (
    <div
      role="alert"
      tabIndex={-1}
      className="rounded-lg border border-destructive p-4"
    >
      <p className="font-semibold">Please check the following fields</p>
      <ul className="mt-2 list-inside list-disc">
        {errors.map(({ id, message }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="text-destructive underline underline-offset-4"
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
