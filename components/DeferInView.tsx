"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function DeferInView({
  children,
  placeholder,
  rootMargin = "180px",
}: {
  children: ReactNode;
  placeholder: ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShow(true);
        io.disconnect();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{show ? children : placeholder}</div>;
}
