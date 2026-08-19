export function BlogLoadingScreen({ label = "Carregando o blog…" }: { label?: string }) {
  return (
    <div className="blog-load-card" role="status" aria-live="polite" aria-busy="true">
      <img src="/media/R6Lgnh9bXoiPlyDe7JyGXOz604.png" alt="" width={40} height={40} />
      <span className="blog-load-spin" aria-hidden />
      <p>{label}</p>
      <small>O conteúdo entra em instantes</small>
    </div>
  );
}
