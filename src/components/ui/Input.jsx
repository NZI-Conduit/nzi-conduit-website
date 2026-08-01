import { useId } from "react";

export function Input({
  label,
  error,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  helperText,
  icon,
  ...props
}) {
  const id = useId();
  const helperId = useId();
  const errorId = useId();

  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={id} className="font-label text-xs font-semibold text-on-surface-variant flex items-center justify-between">
          <span>
            {label} {required && <span className="text-error">*</span>}
          </span>
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant/60 text-[20px] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`w-full h-12 rounded-xl bg-surface-container-low border border-outline-variant/30 px-4 text-on-surface font-body text-sm placeholder:text-on-surface-variant/50 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            icon ? "pl-11" : ""
          } ${error ? "border-error focus:border-error focus:ring-error/20" : ""} ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <span id={errorId} className="text-xs text-error font-body font-medium">{error}</span>
      ) : helperText ? (
        <span id={helperId} className="text-xs text-on-surface-variant/70 font-body">{helperText}</span>
      ) : null}
    </div>
  );
}
