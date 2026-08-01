import { useState } from "react";
import { Skeleton } from "./Skeleton";

export function LazyImage({ src, alt, className = "", skeletonClassName = "", ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <Skeleton className={`absolute inset-0 w-full h-full ${skeletonClassName}`} />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
}
