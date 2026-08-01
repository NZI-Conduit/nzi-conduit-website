import { Button } from "./Button";

export function ErrorState({
  title = "Something Went Wrong",
  description = "An unexpected error occurred while loading this section.",
  onRetry,
}) {
  return (
    <div className="py-12 px-4 text-center flex flex-col items-center justify-center gap-4 bg-error/5 rounded-3xl border border-error/20 max-w-md mx-auto">
      <div className="w-12 h-12 rounded-2xl bg-error/15 text-error flex items-center justify-center">
        <span className="material-symbols-outlined text-[24px]">error</span>
      </div>
      <h4 className="font-headline text-lg font-bold text-on-surface">{title}</h4>
      <p className="font-body text-sm text-on-surface-variant max-w-xs">{description}</p>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry} icon="refresh" className="mt-1">
          Try Again
        </Button>
      )}
    </div>
  );
}
