export function Badge({
  children,
  variant = "primary",
  size = "md",
  className = "",
  pulse = false,
  icon,
}) {
  const baseStyles =
    "inline-flex items-center gap-1.5 rounded-full font-label font-semibold tracking-wide border select-none transition-all duration-200 ease-out hover:scale-105 hover:shadow-xs cursor-default";

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5",
    md: "text-xs px-3 py-1",
    lg: "text-sm px-4 py-1.5",
  };

  const variantStyles = {
    primary: "bg-primary/8 text-primary border-primary/15 shadow-sm",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    tertiary: "bg-tertiary-container/15 text-tertiary border-tertiary/20",
    success: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
    >
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {icon && (
        <span className="material-symbols-outlined text-[14px]">{icon}</span>
      )}
      {children}
    </span>
  );
}
