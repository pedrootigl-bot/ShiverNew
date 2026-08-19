export default function BlogLoading() {
  return (
    <div className="blog-page wrap blog-loading" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando artigo…</span>
      <div className="blog-skel blog-skel-meta" />
      <div className="blog-skel blog-skel-title" />
      <div className="blog-skel blog-skel-line" />
      <div className="blog-skel blog-skel-line" />
      <div className="blog-skel blog-skel-line short" />
    </div>
  );
}
