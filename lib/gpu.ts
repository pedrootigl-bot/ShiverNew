function rendererName(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  if (!info) return "";
  return String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL) || "");
}

export function isSoftwareGpu() {
  if (typeof document === "undefined") return false;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) return true;
  const name = rendererName(gl);
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return /swiftshader|llvmpipe|softpipe|microsoft basic render/i.test(name);
}
