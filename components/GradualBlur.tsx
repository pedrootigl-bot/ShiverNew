"use client";

import {
  type CSSProperties,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./GradualBlur.css";

type BlurPosition = "top" | "bottom" | "left" | "right";
type BlurCurve = "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
type BlurTarget = "parent" | "page";
type BlurAnimated = boolean | "scroll";

type GradualBlurProps = {
  position?: BlurPosition;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  curve?: BlurCurve;
  opacity?: number;
  animated?: BlurAnimated;
  duration?: string;
  easing?: string;
  hoverIntensity?: number;
  target?: BlurTarget;
  zIndex?: number;
  onAnimationComplete?: () => void;
  className?: string;
  style?: CSSProperties;
};

const CURVE_FUNCTIONS: Record<BlurCurve, (p: number) => number> = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  "ease-in": (p) => p * p,
  "ease-out": (p) => 1 - Math.pow(1 - p, 2),
  "ease-in-out": (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};

function getGradientDirection(position: BlurPosition) {
  switch (position) {
    case "top":
      return "to top";
    case "bottom":
      return "to bottom";
    case "left":
      return "to left";
    case "right":
      return "to right";
    default: {
      const _never: never = position;
      return _never;
    }
  }
}

function GradualBlurInner({
  position = "bottom",
  strength = 2,
  height = "6rem",
  width,
  divCount = 5,
  exponential = false,
  curve = "linear",
  opacity = 1,
  animated = false,
  duration = "0.3s",
  easing = "ease-out",
  hoverIntensity,
  target = "parent",
  zIndex = 6,
  onAnimationComplete,
  className = "",
  style,
}: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(animated !== "scroll");

  useEffect(() => {
    if (animated !== "scroll") return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [animated]);

  useEffect(() => {
    if (!isVisible || animated !== "scroll" || !onAnimationComplete) return;
    const ms = parseFloat(duration) * 1000;
    const t = window.setTimeout(() => onAnimationComplete(), ms);
    return () => window.clearTimeout(t);
  }, [isVisible, animated, onAnimationComplete, duration]);

  const blurDivs = useMemo(() => {
    const currentStrength = isHovered && hoverIntensity ? strength * hoverIntensity : strength;
    const curveFunc = CURVE_FUNCTIONS[curve];
    const increment = 100 / divCount;
    const direction = getGradientDirection(position);
    const layers = [];

    for (let i = 1; i <= divCount; i += 1) {
      const progress = curveFunc(i / divCount);
      const blurValue = exponential
        ? Math.pow(2, progress * 4) * 0.0625 * currentStrength
        : 0.0625 * (progress * divCount + 1) * currentStrength;
      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      layers.push(
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            maskImage: `linear-gradient(${direction}, ${gradient})`,
            WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity,
            transition:
              animated && animated !== "scroll" ? `backdrop-filter ${duration} ${easing}` : undefined,
          }}
        />,
      );
    }

    return layers;
  }, [animated, curve, divCount, duration, easing, exponential, hoverIntensity, isHovered, opacity, position, strength]);

  const isVertical = position === "top" || position === "bottom";
  const isPageTarget = target === "page";
  const containerStyle: CSSProperties = {
    position: isPageTarget ? "fixed" : "absolute",
    pointerEvents: hoverIntensity ? "auto" : "none",
    opacity: isVisible ? 1 : 0,
    transition: animated ? `opacity ${duration} ${easing}` : undefined,
    zIndex: isPageTarget ? zIndex + 100 : zIndex,
    ...style,
  };

  if (isVertical) {
    containerStyle.height = height;
    containerStyle.width = width || "100%";
    containerStyle.left = 0;
    containerStyle.right = 0;
    if (position === "top") containerStyle.top = 0;
    else containerStyle.bottom = 0;
  } else {
    containerStyle.width = width || height;
    containerStyle.height = "100%";
    containerStyle.top = 0;
    containerStyle.bottom = 0;
    if (position === "left") containerStyle.left = 0;
    else containerStyle.right = 0;
  }

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${isPageTarget ? "gradual-blur-page" : "gradual-blur-parent"}${className ? ` ${className}` : ""}`}
      style={containerStyle}
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className="gradual-blur-inner">{blurDivs}</div>
    </div>
  );
}

export const GradualBlur = memo(GradualBlurInner);
