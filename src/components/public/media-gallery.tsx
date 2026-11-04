"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Media } from "@/features/catalog/types";
import { MediaCredit } from "./media-credit";

export function MediaGallery({
  images,
  title,
}: {
  images: Media[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const current = images[index];
  return (
    <Dialog>
      <div
        className={`grid gap-3 ${images.length > 1 ? "md:grid-cols-[1.5fr_1fr]" : ""}`}
      >
        <div className="relative min-h-80 overflow-hidden rounded-lg md:min-h-[480px]">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="(max-width: 767px) 100vw, 60vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/90 to-transparent p-6 pt-20 text-background">
            <p className="text-sm">
              <MediaCredit media={images[0]} />
            </p>
          </div>
        </div>
        <div
          className={`relative grid gap-3 md:grid-cols-1 ${images.length > 1 ? "min-h-48 grid-cols-2" : "min-h-16"}`}
        >
          {images.slice(1, 3).map((image) => (
            <div
              key={image.src}
              className="relative min-h-36 overflow-hidden rounded-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 767px) 50vw, 35vw"
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-x-3 bottom-3 flex justify-end">
            <DialogTrigger asChild>
              <Button variant="secondary" onClick={() => setIndex(0)}>
                <Images aria-hidden="true" />
                View gallery ({images.length})
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </div>
      <DialogContent className="sm:max-w-4xl">
        <DialogTitle>{title} gallery</DialogTitle>
        <DialogDescription>
          Editorial destination photography; images do not establish a confirmed
          itinerary or lodge booking.
        </DialogDescription>
        <figure>
          <div className="relative mt-2 h-[45dvh] min-h-48 bg-sand">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted-foreground">
            <MediaCredit media={current} />
          </figcaption>
        </figure>
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            aria-label="Previous image"
            disabled={images.length < 2}
            onClick={() =>
              setIndex((index + images.length - 1) % images.length)
            }
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
          <p aria-live="polite" className="text-sm">
            Image {index + 1} of {images.length}
          </p>
          <Button
            variant="outline"
            aria-label="Next image"
            disabled={images.length < 2}
            onClick={() => setIndex((index + 1) % images.length)}
          >
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
