export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-surface-container-high/60 ${className}`}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl p-6 sm:p-8 border border-outline-variant/15 bg-surface-container-low/40 space-y-4">
      <Skeleton className="w-12 h-12 rounded-2xl" />
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-5/6 h-4" />
      <Skeleton className="w-1/3 h-4 pt-2" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-16 text-center flex flex-col items-center gap-6">
      <Skeleton className="w-36 h-7 rounded-full" />
      <Skeleton className="w-3/4 h-12 rounded-2xl" />
      <Skeleton className="w-1/2 h-6 rounded-xl" />
      <div className="flex gap-4 pt-4">
        <Skeleton className="w-40 h-12 rounded-full" />
        <Skeleton className="w-40 h-12 rounded-full" />
      </div>
    </div>
  );
}
