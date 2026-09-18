"use client";

export function BootPreloader({ done }: { done: boolean }) {
  return (
    <div
      className={`boot-preloader${done ? " is-done" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!done}
      aria-label="Carregando"
    >
      <div className="boot-preloader__glow" aria-hidden />
      <div className="boot-preloader__ring" aria-hidden />
      <div className="boot-preloader__orbit" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="boot-preloader__brand">
        <div className="boot-preloader__mark">
          <img
            src="/media/R6Lgnh9bXoiPlyDe7JyGXOz604.png"
            alt=""
            width={72}
            height={72}
            decoding="async"
          />
        </div>
        <div className="boot-preloader__copy">
          <p className="boot-preloader__name">Shiver</p>
          <small>BROKER</small>
        </div>
        <div className="boot-preloader__bar" aria-hidden>
          <span />
        </div>
        <p className="boot-preloader__status">Preparando a plataforma</p>
      </div>
    </div>
  );
}
