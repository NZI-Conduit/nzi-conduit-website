import { lazy, Suspense } from "react";
import { Modal } from "./Modal";
import { getPackageById } from "../../data/servicePackages";

const IntakeForm = lazy(() => import("../IntakeForm"));

export function RequestAuditModal({ isOpen, onClose, selectedPackageId = null }) {
  const selectedPkg = getPackageById(selectedPackageId);

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
      </div>
    </Modal>
  );
}

export default RequestAuditModal;

