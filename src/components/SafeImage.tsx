"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackLabel?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackLabel,
  className,
  ...rest
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex aspect-square w-full flex-col items-center justify-center rounded-[20px] bg-cream/70 border border-ink/10 p-8 text-center select-none ${
          className || ""
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pine/10 text-pine">
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
        <p className="mt-3 font-display text-sm font-semibold text-pine">
          {fallbackLabel || "Toolkit Preview"}
        </p>
        <p className="mt-1 max-w-xs text-xs leading-relaxed text-ink-soft">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}
