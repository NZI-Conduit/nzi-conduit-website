import { lazy, Suspense } from "react";
import { Modal } from "./Modal";
import { getPackageById } from "../../data/servicePackages";
import { COMPANY_DETAILS } from "../../lib/constants";

const IntakeForm = lazy(() => import("../IntakeForm"));

export function RequestAuditModal({ isOpen, onClose, selectedPackageId = null }) {
  const selectedPkg = getPackageById(selectedPackageId);
  const webhookUrl = import.meta.env.VITE_INTAKE_WEBHOOK_URL;
  const isProdWithoutWebhook = import.meta.env.PROD && !webhookUrl;

  // Map selected package to presetService (web | seo | video)
  let presetService = undefined;
  if (selectedPkg) {
    if (selectedPkg.category === "webdev" || selectedPkg.id === "pkg-01") {
      presetService = "web";
    } else if (selectedPkg.category === "seo" || selectedPkg.id === "pkg-02") {
      presetService = "seo";
    } else if (selectedPkg.category === "video" || selectedPkg.id === "pkg-03") {
      presetService = "video";
    }
  }

  const modalTitle = selectedPkg
    ? `Discuss ${selectedPkg.code} · ${selectedPkg.name}`
    : "Request a Free Technical Audit";

  const modalSubtitle = selectedPkg
    ? `Fixed Scope: ${selectedPkg.priceFormatted} — A senior engineer reads every request.`
    : "About two minutes. A senior engineer reads every request.";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      subtitle={modalSubtitle}
      maxWidth="max-w-2xl"
    >
      <div className="pt-2">
        {isProdWithoutWebhook ? (
          <div className="py-8 px-4 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto">
              <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900">Direct Consultation</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Our automated intake is currently in direct-engineer mode. Please reach out to us directly by email or phone to schedule your technical audit:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                Email {COMPANY_DETAILS.email}
              </a>
              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Call {COMPANY_DETAILS.phone}
              </a>
            </div>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="py-12 flex flex-col items-center justify-center space-y-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-semibold text-slate-500">Loading form...</p>
              </div>
            }
          >
            <IntakeForm
              key={selectedPackageId || "default"}
              defaultOpen={true}
              presetService={presetService}
            />
          </Suspense>
        )}
      </div>
    </Modal>
  );
}

export default RequestAuditModal;

