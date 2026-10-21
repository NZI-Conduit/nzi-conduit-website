export function Card({
  children,
  className = "",
  hover = true,
  glass = false,
  onClick,
  ...props
}) {
  const baseStyles =
    "group rounded-3xl p-6 sm:p-8 border border-outline-variant/20 transition-[transform,box-shadow,border-color] duration-200 ease-out relative overflow-hidden active:scale-[0.98]";
  
  const glassStyles = glass
    ? "bg-blue-50/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.06)] border-blue-100/60 text-foreground"
    : "bg-card text-card-foreground shadow-xs";

  const hoverStyles = hover
    ? "hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_36px_rgba(30,79,224,0.12)] cursor-pointer"
    : "";

  return (
    <div
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
