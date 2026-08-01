import { useState, useId } from "react";
import { Modal } from "./Modal";
import { Input } from "./Input";
import { Button } from "./Button";

export function RequestAuditModal({ isOpen, onClose }) {
  const serviceId = useId();
  const messageId = useId();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    service: "webdev",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: "", email: "", website: "", service: "webdev", message: "" });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Request a Free IT & Web Audit"
      subtitle="Get a comprehensive technical report delivered within 24 hours."
      maxWidth="max-w-xl"
    >
      {isSubmitted ? (
        <div className="py-8 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>
          <h4 className="font-headline-md text-xl font-bold text-on-surface">Audit Request Received!</h4>
          <p className="font-body text-sm text-on-surface-variant max-w-xs mx-auto">
            Our engineering team is reviewing your details. We will send your report to <strong>{formData.email}</strong> within 24 hours.
          </p>
          <Button variant="primary" className="mt-4" onClick={handleReset}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
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
                <option value="webdev">Web Development & Performance</option>
                <option value="seo">SEO & Search Visibility</option>
                <option value="cybersecurity">Cybersecurity Audit</option>
                <option value="consulting">General IT Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1.5 text-left">
            <label htmlFor={messageId} className="font-label text-xs font-semibold text-on-surface-variant">
              Project Details or Specific Goals
            </label>
            <textarea
              id={messageId}
              rows={3}
              placeholder="Describe your current tech challenges or goals..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-body text-sm placeholder:text-on-surface-variant/50 transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div className="pt-3 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-outline-variant/10">
            <Button type="button" variant="ghost" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting} icon="send" className="w-full sm:w-auto">
              Submit Audit Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
