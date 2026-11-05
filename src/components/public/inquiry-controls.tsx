"use client";
import type { ReactNode, ComponentProps } from "react";
import { useSyncExternalStore } from "react";
import { Info } from "lucide-react";
import { Field } from "@/components/ui/field";

const subscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;
export function useInquiryReady() {
  return useSyncExternalStore(subscribe, onClient, onServer);
}

export function InquiryField({
  id,
  label,
  error,
  description,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  description?: string;
  children: (attrs: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
  }) => ReactNode;
}) {
  const describedBy =
    [description && `${id}-description`, error && `${id}-error`]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <Field id={id} label={label} error={error} description={description}>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}
    </Field>
  );
}
export function InquirySelect(props: ComponentProps<"select">) {
  return (
    <select
      {...props}
      className="min-h-11 w-full min-w-0 rounded-md border border-input bg-card px-3 py-2 text-base focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
    />
  );
}
export const checkboxClass =
  "size-5 shrink-0 accent-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
export function DeliveryNotice() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-sage/25 bg-sage/5 p-5 text-sm">
      <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-sage" />
      <div>
        <p className="font-semibold">Planning preview · Sending unavailable</p>
        <p className="mt-1 text-muted-foreground">
          No inquiry has been submitted. Sending is not available yet. Your
          details stay in this page while you explore; leaving or reloading
          clears them.
        </p>
      </div>
    </div>
  );
}
