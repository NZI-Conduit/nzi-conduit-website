let prefetchPromise = null;

export function prefetchAuditModal() {
  if (!prefetchPromise && typeof window !== "undefined") {
    prefetchPromise = import("../components/ui/RequestAuditModal");
  }
  return prefetchPromise;
}
