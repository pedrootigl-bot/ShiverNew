"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Disclaimer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/legal/terms")) return;
    setOpen(true);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/legal/terms")) setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("disclaimer-open", open);
    return () => document.body.classList.remove("disclaimer-open");
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="disclaimer" role="note">
      <p>
        A Shiver Broker não é autorizada pela Comissão de Valores Mobiliários do Brasil a oferecer ou intermediar
        valores mobiliários publicamente no Brasil. Ao acessar o site da Shiver Broker, o usuário declara estar ciente e
        concordar com as restrições indicadas aqui. Para mais informações, consulte o{" "}
        <Link href="/legal/terms">Contrato com o Cliente</Link>.
      </p>
      <button className="disclaimer-close" type="button" aria-label="Fechar aviso" onClick={() => setOpen(false)}>
        <span aria-hidden>×</span>
      </button>
    </div>,
    document.body,
  );
}
