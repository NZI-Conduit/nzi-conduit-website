import Icon from "./Icon";
import { useState, useEffect, useCallback, useId } from "react";
import { Modal } from "./Modal";
import { Input } from "./Input";
import { Button } from "./Button";
import { getPackageById } from "../../data/servicePackages";

export function RequestAuditModal({ isOpen, onClose, selectedPackageId = null }) {
  const serviceId = useId();
  const messageId = useId();

  const selectedPkg = getPackageById(selectedPackageId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    service: "webdev",
    message: "",
    selectedPackageId: selectedPackageId || null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync selectedPackageId when prop changes or modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (selectedPkg) {
      setFormData((prev) => ({
        ...prev,
        selectedPackageId: selectedPkg.id,
        service: selectedPkg.category || "webdev",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedPackageId: null,
      }));
    }
  }, [selectedPackageId, isOpen, selectedPkg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Payload contains selectedPackageId if package was chosen
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = useCallback(() => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      website: "",
      service: "webdev",
      message: "",
      selectedPackageId: null,
    });
    onClose();
  }, [onClose]);

  const modalTitle = selectedPkg
    ? `Discuss ${selectedPkg.code} · ${selectedPkg.name}`
    : "Request a Free IT & Web Audit";

  const modalSubtitle = selectedPkg
    ? `Fixed Scope: ${selectedPkg.priceFormatted} — Get a detailed proposal within 24 hours.`
    : "Get a comprehensive technical report delivered within 24 hours.";

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={modalTitle}
      subtitle={modalSubtitle}
      maxWidth="max-w-xl"
    >
      {isSubmitted ? (
        <div className="py-8 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
            <Icon name="check_circle" size={36} />
          </div>
          <h4 className="font-headline-md text-xl font-bold text-on-surface">
            {selectedPkg ? "Inquiry Received!" : "Audit Request Received!"}
          </h4>
          <p className="font-body text-sm text-on-surface-variant max-w-xs mx-auto">
            Our engineering team is reviewing your details. We will send your report and proposal to <strong>{formData.email}</strong> within 24 hours.
          </p>
          <Button variant="primary" className="mt-4" onClick={handleReset}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          {/* Selected Package Banner */}
          {selectedPkg && (
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-on-surface flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Icon name={selectedPkg.icon || "inventory_2"} size={22} />
              </div>
              <div className="text-xs flex-1 min-w-0">
                <div className="font-bold text-blue-900 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-blue-600/15 text-blue-700 font-bold border border-blue-600/25 shrink-0">
                      {selectedPkg.code}
                    </span>
                    <span className="truncate">{selectedPkg.name}</span>
                  </div>
                  <span className="text-blue-700 font-mono font-semibold shrink-0">
                    {selectedPkg.priceFormatted}
                  </span>
                </div>
                <div className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                  {selectedPkg.kind} · {selectedPkg.timeline}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              icon="person"
            />
            <Input
              label="Business Email"
              type="email"
              placeholder="john@company.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon="mail"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Website URL (Optional)"
              placeholder="https://yourcompany.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              icon="language"
            />
            <div className="w-full flex flex-col gap-1.5 text-left">
              <label htmlFor={serviceId} className="font-label text-xs font-semibold text-on-surface-variant">
                Primary Focus Area
              </label>
              <select
                id={serviceId}
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full h-12 rounded-xl bg-surface-container-low border border-outline-variant/30 px-3.5 text-on-surface font-body text-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="webdev">Web Development (Launch Site / Custom)</option>
                <option value="seo">SEO & Visibility (Local Visibility SEO)</option>
                <option value="video">AI Video Production (Reel Batch)</option>
                <option value="bundle">Growth Partner (Web + SEO + Video)</option>
                <option value="cybersecurity">Cybersecurity Audit</option>
                <option value="consulting">General IT Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1.5 text-left">
            <label htmlFor={messageId} className="font-label text-xs font-semibold text-on-surface-variant">
              {selectedPkg ? "Project Goals or Add-On Requests" : "Project Details or Specific Goals"}
            </label>
            <textarea
              id={messageId}
              rows={3}
              placeholder={selectedPkg ? "Mention any specific requirements, add-ons, or timeline targets..." : "Describe your current tech challenges or goals..."}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-body text-sm placeholder:text-on-surface-variant/50 transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div className="pt-3 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-outline-variant/10">
            <Button type="button" variant="ghost" onClick={handleReset} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting} icon="send" className="w-full sm:w-auto">
              {selectedPkg ? "Submit Package Inquiry" : "Submit Audit Request"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default RequestAuditModal;
