export function onIdle(fn: () => void, timeout = 1200) {
  const ric = window.requestIdleCallback?.bind(window);
  if (ric) {
    const id = ric(fn, { timeout });
    return () => window.cancelIdleCallback?.(id);
  }
  const timer = window.setTimeout(fn, Math.min(480, timeout));
  return () => window.clearTimeout(timer);
}
