import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1360px] px-5 md:px-8", className)}
      {...props}
    />
  );
}
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-16 md:py-24", className)} {...props} />;
}
export function Stack({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-6", className)} {...props} />
  );
}
export function Grid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    />
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Stack className="max-w-2xl gap-4">
      {eyebrow && <p className="eyebrow text-primary">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {children && <div className="text-muted-foreground">{children}</div>}
    </Stack>
  );
}
