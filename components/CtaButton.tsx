import { type MouseEventHandler, type ReactNode } from "react";
import "./SpecularButton.css";

type SpecularSize = "sm" | "md" | "lg";
type CtaTone = "ghost" | "blue";

function sizeClass(size: SpecularSize) {
  switch (size) {
    case "sm":
      return "specular-button--sm";
    case "md":
      return "specular-button--md";
    case "lg":
      return "specular-button--lg";
    default: {
      const _never: never = size;
      return _never;
    }
  }
}

export function CtaButton({
  href,
  size = "md",
  tone = "ghost",
  children,
  className = "",
  onClick,
}: {
  href: string;
  size?: SpecularSize;
  tone?: CtaTone;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const extra = [tone === "blue" ? "specular-button--blue" : "", className].filter(Boolean).join(" ");
  const cls = ["btn", "specular-button", sizeClass(size), extra].filter(Boolean).join(" ");

  return (
    <a href={href} className={cls} onClick={onClick}>
      <span className="specular-button__label">{children}</span>
    </a>
  );
}
