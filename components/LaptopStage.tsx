"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import { useGroupReveal } from "@/components/RevealGroup";
import { useInViewReplay } from "@/lib/useInViewReplay";

export function LaptopStage({ children }: { children?: ReactNode }) {
  const grouped = useGroupReveal();
  const solo = useInViewReplay<HTMLDivElement>(0.28);
  const on = grouped !== null ? grouped : solo.on;

  return (
    <div className={`laptop-stage${on ? " open" : ""}`} ref={grouped !== null ? undefined : solo.ref} data-parallax="0.05">
      <Image className="crystal c1" src="/media/WhVLaH5mcozGLDROwsWbfwSHPik.webp" alt="" width={230} height={230} quality={65} sizes="230px" style={{ height: "auto" }} loading="lazy" />
      <Image className="crystal c2" src="/media/WhVLaH5mcozGLDROwsWbfwSHPik.webp" alt="" width={210} height={210} quality={65} sizes="210px" style={{ height: "auto" }} loading="lazy" />
      <div className="laptop-scene">
        <div className="laptop">
          <div className="laptop-lid">
            <Image
              src="/media/Srhe0Ld9LN4eJAxMtjy6N4AJ8M.webp"
              alt="Plataforma da Shiver Broker no notebook"
              width={1520}
              height={900}
              quality={65}
              sizes="(max-width: 720px) 92vw, (max-width: 1100px) 80vw, 640px"
              loading="lazy"
            />
          </div>
          <div className="laptop-base" />
        </div>
        {children}
      </div>
    </div>
  );
}
