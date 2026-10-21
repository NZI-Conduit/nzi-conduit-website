import Icon from "./Icon";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  disabled = false,
  onClick,
  type = "button",
  icon,
  ...props
}) {
  const baseStyles =
    "group inline-flex items-center justify-center font-label font-bold rounded-full transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-4 py-1.5 h-9 gap-1.5",
    md: "text-sm px-6 py-2.5 h-11 gap-2 min-h-[44px]",
    lg: "text-base px-8 py-3.5 h-13 gap-2.5 min-h-[52px]",
  };

  const variantStyles = {
    primary:
      "bg-[#2563EB] text-white shadow-[0_4px_16px_rgba(37,99,235,0.25)] hover:bg-[#1D4ED8] hover:shadow-[0_8px_24px_rgba(37,99,235,0.35)]",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:shadow-md",
    outline:
      "border border-blue-600/30 text-blue-600 hover:bg-blue-50/50 hover:border-blue-600/60 backdrop-blur-sm",
    ghost:
      "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50",
    white:
      "bg-white text-blue-600 shadow-lg hover:bg-slate-50",
  };

  const interactiveStyles = disabled || isLoading
    ? ""
    : "hover:scale-[1.02] active:scale-[0.97] transition-transform";

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${interactiveStyles} ${isLoading ? "blur-[0.5px] opacity-90" : ""} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : icon ? (
        <Icon
          name={icon}
          size={18}
          className={`transition-transform duration-200 ease-out ${
            icon === "arrow_forward" || icon === "chevron_right"
              ? "group-hover:translate-x-1"
              : icon === "bolt"
              ? "group-hover:scale-115 group-hover:-rotate-12"
              : "group-hover:scale-110"
          }`}
        />
      ) : null}
      {children}
    </button>
  );
}
