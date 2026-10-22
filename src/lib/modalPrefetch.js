let prefetchPromise = null;

export function prefetchAuditModal() {
  if (!prefetchPromise && typeof window !== "undefined") {
    prefetchPromise = Promise.all([
      import("../components/ui/RequestAuditModal"),
      import("../components/IntakeForm"),
    ]);
  }
  return prefetchPromise;
}



