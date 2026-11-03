import Image from "next/image";
import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="AMAJO — Essence of Africa, home"
      className="inline-flex w-fit shrink-0 items-center gap-3 rounded-md"
    >
      <Image
        src="/brand/amajo-logo.png"
        alt=""
        width={747}
        height={731}
        sizes={compact ? "52px" : "72px"}
        priority
        className={
          compact ? "h-auto w-[52px] rounded-md" : "h-auto w-[72px] rounded-md"
        }
      />
      <span className="flex flex-col">
        <span className="font-display text-2xl leading-tight tracking-wide">
          AMAJO
        </span>
        <span className="mt-1 text-[10px] font-semibold tracking-[0.16em] uppercase">
          Essence of Africa
        </span>
      </span>
    </Link>
  );
}
