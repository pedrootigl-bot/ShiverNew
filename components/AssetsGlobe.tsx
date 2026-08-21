"use client";

import { useEffect, useRef } from "react";
import { getGlobeMesh, type Vec3 } from "@/lib/world-globe";

const DRAG = 0.0055;
const AUTO = 0.0026;
const MAX_TILT = 1.05;

export function AssetsGlobe() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!root || !canvas || !card) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mesh = getGlobeMesh();

    let rotX = -0.42;
    let rotY = 0.82;
    let velX = 0;
    let velY = reduced ? 0 : AUTO;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let width = 0;
    let height = 0;
    let radius = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    let running = true;
    let visible = false;
    let lastDraw = 0;
    let disc: CanvasGradient | null = null;
    let cosY = 1;
    let sinY = 0;
    let cosX = 1;
    let sinX = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
      radius = Math.min(cx, cy) * 0.96;
      disc = ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius * 1.08);
      disc.addColorStop(0, "rgba(8, 28, 38, 0.55)");
      disc.addColorStop(0.72, "rgba(2, 8, 12, 0.2)");
      disc.addColorStop(1, "rgba(0, 0, 0, 0)");
    };

    const projectZ = (point: Vec3) => {
      const yx = point.x * cosY + point.z * sinY;
      const yz = -point.x * sinY + point.z * cosY;
      return {
        x: cx + yx * radius,
        y: cy + (point.y * cosX - yz * sinX) * radius,
        z: point.y * sinX + yz * cosX,
      };
    };

    const drawDots = (points: Vec3[], size: number, alpha: number) => {
      ctx.fillStyle = `rgba(90, 214, 255,${alpha})`;
      for (const point of points) {
        const yx = point.x * cosY + point.z * sinY;
        const yz = -point.x * sinY + point.z * cosY;
        const z = point.y * sinX + yz * cosX;
        if (z < 0.06) continue;
        const s = size * (0.7 + z * 0.45);
        ctx.fillRect(cx + yx * radius - s, cy + (point.y * cosX - yz * sinX) * radius - s, s * 2, s * 2);
      }
    };

    const draw = () => {
      cosY = Math.cos(rotY);
      sinY = Math.sin(rotY);
      cosX = Math.cos(rotX);
      sinX = Math.sin(rotX);

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.06, 0, Math.PI * 2);
      ctx.fillStyle = disc ?? "#000";
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();
      drawDots(mesh.ocean, 0.8, 0.22);
      drawDots(mesh.land, 1.05, 0.55);

      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = "rgba(138, 224, 255, 0.88)";
      for (const coast of mesh.coasts) {
        ctx.beginPath();
        let drawing = false;
        for (const point of coast) {
          const q = projectZ(point);
          if (q.z < 0.08) {
            drawing = false;
            continue;
          }
          if (!drawing) {
            ctx.moveTo(q.x, q.y);
            drawing = true;
          } else {
            ctx.lineTo(q.x, q.y);
          }
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    const stopLoop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const tick = (now: number) => {
      if (!running) return;
      if (!visible && !dragging) {
        frame = 0;
        return;
      }

      const minDelta = dragging ? 16 : 33;
      if (now - lastDraw < minDelta) {
        frame = window.requestAnimationFrame(tick);
        return;
      }
      lastDraw = now;

      if (!dragging) {
        rotY += velY;
        rotX = Math.max(-MAX_TILT, Math.min(MAX_TILT, rotX + velX));
        velY *= 0.94;
        velX *= 0.94;
        if (Math.abs(velY) < 0.00035) velY = 0;
        if (Math.abs(velX) < 0.00035) velX = 0;
        if (visible && !reduced && velY === 0) velY = AUTO;
      }

      draw();

      const keepSpinning = dragging || (!reduced && visible && (velY !== 0 || velX !== 0));
      if (keepSpinning) {
        frame = window.requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const startLoop = () => {
      if (frame || !running) return;
      frame = window.requestAnimationFrame(tick);
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      velX = 0;
      velY = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      card.classList.add("is-dragging");
      card.setPointerCapture(event.pointerId);
      if (event.cancelable) event.preventDefault();
      card.focus({ preventScroll: true });
      startLoop();
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      rotY += dx * DRAG;
      rotX = Math.max(-MAX_TILT, Math.min(MAX_TILT, rotX + dy * DRAG));
      velY = dx * DRAG;
      velX = dy * DRAG;
    };

    const onUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      card.classList.remove("is-dragging");
      if (card.hasPointerCapture(event.pointerId)) card.releasePointerCapture(event.pointerId);
    };

    const onKey = (event: KeyboardEvent) => {
      const step = 0.12;
      let moved = false;
      switch (event.key) {
        case "ArrowLeft":
          rotY -= step;
          moved = true;
          event.preventDefault();
          break;
        case "ArrowRight":
          rotY += step;
          moved = true;
          event.preventDefault();
          break;
        case "ArrowUp":
          rotX = Math.max(-MAX_TILT, rotX - step);
          moved = true;
          event.preventDefault();
          break;
        case "ArrowDown":
          rotX = Math.min(MAX_TILT, rotX + step);
          moved = true;
          event.preventDefault();
          break;
        default:
          break;
      }
      if (moved) {
        draw();
        startLoop();
      }
    };

    const setVisible = (next: boolean) => {
      visible = next && document.visibilityState === "visible";
      root.classList.toggle("on", visible);
      if (visible) startLoop();
      else if (!dragging) stopLoop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.12));
      },
      { threshold: [0, 0.12, 1], rootMargin: "80px 0px" },
    );

    const onPageHide = () => {
      if (document.visibilityState !== "visible") {
        stopLoop();
        return;
      }
      if (visible) startLoop();
    };

    resize();
    draw();
    io.observe(root);
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    card.addEventListener("pointerdown", onDown);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerup", onUp);
    card.addEventListener("pointercancel", onUp);
    card.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onPageHide);

    return () => {
      running = false;
      stopLoop();
      io.disconnect();
      ro.disconnect();
      card.removeEventListener("pointerdown", onDown);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerup", onUp);
      card.removeEventListener("pointercancel", onUp);
      card.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onPageHide);
    };
  }, []);

  return (
    <div className="assets-globe" ref={rootRef}>
      <div
        className="globe-card"
        ref={cardRef}
        tabIndex={0}
        aria-label="Globo terrestre. Arraste para girar, ou use as setas do teclado."
      >
        <div className="globe-stage">
          <div className="globe-halo" />
          <div className="globe-core">
            <canvas className="globe-canvas" ref={canvasRef} />
          </div>
        </div>
        <p className="globe-hint">Arraste para girar</p>
      </div>
    </div>
  );
}

export default AssetsGlobe;
