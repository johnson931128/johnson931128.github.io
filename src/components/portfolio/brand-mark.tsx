import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  src?: string;
  alt: string;
  fallback?: string;
  size?: "compact" | "default";
  className?: string;
};

export default function BrandMark({
  src,
  alt,
  fallback,
  size = "default",
  className,
}: BrandMarkProps) {
  const dimensions = size === "compact" ? 32 : 44;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md border border-border/90 bg-card/75 p-1.5 text-primary",
        size === "compact" ? "size-8" : "size-11",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={dimensions}
          height={dimensions}
          className="size-full object-contain"
        />
      ) : (
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em]" aria-label={alt}>
          {fallback ?? alt.slice(0, 2)}
        </span>
      )}
    </span>
  );
}
