import { Button } from "./Button";

export function EmptyState({
  icon = "inbox",
  title = "No Data Available",
  description = "There is no information to display at this moment.",
  actionText,
  onAction,
}) {
  return (
    <div className="py-16 px-4 text-center flex flex-col items-center justify-center gap-4 bg-surface-container-low/40 rounded-3xl border border-outline-variant/15 max-w-md mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <h4 className="font-headline text-lg font-bold text-on-surface">{title}</h4>
      <p className="font-body text-sm text-on-surface-variant max-w-xs">{description}</p>
      {actionText && onAction && (
        <Button size="sm" variant="primary" onClick={onAction} className="mt-2">
          {actionText}
        </Button>
      )}
    </div>
  );
}
