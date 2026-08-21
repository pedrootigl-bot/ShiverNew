const MAX_SPECULAR_CONTEXTS = 3;

let live = 0;
const waiters = new Set<() => void>();

export function acquireSpecularContext() {
  if (live >= MAX_SPECULAR_CONTEXTS) return false;
  live += 1;
  return true;
}

export function releaseSpecularContext() {
  live = Math.max(0, live - 1);
  const next = waiters.values().next().value;
  if (!next) return;
  waiters.delete(next);
  next();
}

export function onSpecularSlot(cb: () => void) {
  waiters.add(cb);
  return () => {
    waiters.delete(cb);
  };
}
