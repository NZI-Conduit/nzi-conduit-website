import { useEffect, useRef, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = "max-w-xl" }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  const titleId = useId();
  const subtitleId = useId();
  const prefersReducedMotion = useReducedMotion();

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Focus trap, ESC listener, and focus restoration
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement;

    const modalElement = modalRef.current;
    if (modalElement) {
      const focusable = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        modalElement.focus();
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current?.();
        return;
      }

      if (e.key === "Tab") {
        if (!modalElement) return;
        const focusable = Array.from(
          modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.disabled && el.offsetParent !== null);

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      if (previousActiveElement.current && typeof previousActiveElement.current.focus === "function") {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={subtitle ? subtitleId : undefined}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className={`relative w-full ${maxWidth} max-h-[90vh] bg-surface border border-outline-variant/20 rounded-3xl shadow-2xl p-5 sm:p-8 z-10 flex flex-col focus:outline-none my-auto`}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-outline-variant/10 shrink-0">
              <div className="text-left">
                {title && (
                  <h3
                    id={titleId}
                    className="font-headline-md text-lg sm:text-2xl font-bold text-on-surface tracking-tight"
                  >
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p
                    id={subtitleId}
                    className="font-body text-xs sm:text-sm text-on-surface-variant mt-1"
                  >
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant/40 rounded-full transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none shrink-0"
                aria-label="Close dialog"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto pt-4 pr-1 text-left flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
