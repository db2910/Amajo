import type { Media } from "@/features/catalog/types";
export function MediaCredit({ media }: { media: Media }) {
  return (
    <span>
      {media.sourceHref ? (
        <a
          className="underline underline-offset-2 hover:no-underline"
          href={media.sourceHref}
        >
          {media.caption}
        </a>
      ) : (
        media.caption
      )}
      {media.license && (
        <>
          {" "}
          ·{" "}
          <a
            className="underline underline-offset-2 hover:no-underline"
            href={media.license.href}
          >
            {media.license.name}
          </a>
        </>
      )}
    </span>
  );
}
