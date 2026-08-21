"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ORBIT_CARDS } from "@/lib/orbit-cards";

const LOOP = 9;
const TAU = Math.PI * 2;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function makeCardTexture(card: (typeof ORBIT_CARDS)[number]) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, 512, 256);
  roundRect(ctx, 18, 18, 476, 220, 36);
  ctx.fillStyle = "rgba(6, 12, 20, 0.88)";
  ctx.fill();
  ctx.strokeStyle = "rgba(62, 196, 245, 0.72)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.shadowColor = "rgba(47, 123, 255, 0.55)";
  ctx.shadowBlur = 18;
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#f4fcff";
  ctx.font = "700 42px Inter, system-ui, sans-serif";
  ctx.fillText(card.ticker, 48, 108);
  ctx.fillStyle = "rgba(181, 196, 206, 0.92)";
  ctx.font = "400 24px Inter, system-ui, sans-serif";
  ctx.fillText(card.name, 48, 150);
  ctx.fillStyle = "#22c55e";
  ctx.font = "700 36px Inter, system-ui, sans-serif";
  ctx.fillText(card.change, 330, 118);

  return canvas;
}

function loadTexture(url: string) {
  return new Promise<THREE.Texture>((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.anisotropy = 4;
        resolve(texture);
      },
      undefined,
      reject,
    );
  });
}

function knockOutConnectedBlack(
  source: CanvasImageSource & { width: number; height: number },
  threshold = 6,
) {
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return canvas;
  ctx.drawImage(source, 0, 0);
  const { width, height } = canvas;
  const image = ctx.getImageData(0, 0, width, height);
  const px = image.data;
  const isBg = (offset: number) => Math.max(px[offset], px[offset + 1], px[offset + 2]) <= threshold;
  const seen = new Uint8Array(width * height);
  const stack: number[] = [];
  const enqueue = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (seen[idx]) return;
    seen[idx] = 1;
    if (isBg(idx * 4)) stack.push(idx);
  };
  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }
  while (stack.length) {
    const idx = stack.pop()!;
    px[idx * 4 + 3] = 0;
    const x = idx % width;
    const y = (idx / width) | 0;
    enqueue(x + 1, y);
    enqueue(x - 1, y);
    enqueue(x, y + 1);
    enqueue(x, y - 1);
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}

function toKeyedTexture(texture: THREE.Texture) {
  const source = texture.image as HTMLImageElement | HTMLCanvasElement | ImageBitmap | undefined;
  if (!source || !source.width || !source.height) return texture;
  const keyed = knockOutConnectedBlack(source, 6);
  texture.dispose();
  const next = new THREE.CanvasTexture(keyed);
  next.colorSpace = THREE.SRGBColorSpace;
  next.minFilter = THREE.LinearFilter;
  next.magFilter = THREE.LinearFilter;
  next.generateMipmaps = false;
  next.needsUpdate = true;
  return next;
}

function punchOutBlack(material: THREE.MeshBasicMaterial) {
  material.transparent = true;
  material.depthWrite = false;
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "diffuseColor *= sampledDiffuseColor;",
      `
      float keyPeak = max(sampledDiffuseColor.r, max(sampledDiffuseColor.g, sampledDiffuseColor.b));
      if (sampledDiffuseColor.a < 0.08 || keyPeak < 0.0015) discard;
      diffuseColor *= sampledDiffuseColor;
      `,
    );
  };
  material.customProgramCacheKey = () => "orbit-punch-black";
}

export function TradingOrbitStage({ onReady }: { onReady?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const light =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    let disposed = false;
    let frame = 0;
    let running = true;
    let visible = true;
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, light ? 1 : 1.25));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    root.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    const clock = new THREE.Clock();

    const phoneGeo = new THREE.PlaneGeometry(1.38, 2.76);
    const handGeo = new THREE.PlaneGeometry(5.4, 3.04);
    const cardGeo = new THREE.PlaneGeometry(1.18, 0.59);
    const disposables: THREE.Object3D[] = [];
    const textures: THREE.Texture[] = [];
    const cardMeshes: THREE.Mesh[] = [];

    const particleCount = light ? 0 : 36;
    const particlesGeo = particleCount ? new THREE.BufferGeometry() : null;
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 7.2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.4;
      speeds[i] = 0.12 + Math.random() * 0.22;
    }
    let particles: THREE.Points | null = null;
    let particlesMat: THREE.PointsMaterial | null = null;
    if (particlesGeo) {
      particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particlesMat = new THREE.PointsMaterial({
        color: 0x7ad7ff,
        size: 0.035,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      particles = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particles);
      disposables.push(particles);
    }

    const ringMat = new THREE.LineBasicMaterial({
      color: 0x3ec4f5,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ringGeos: THREE.BufferGeometry[] = [];
    const rings: THREE.LineLoop[] = [];
    const makeRing = (rx: number, rz: number, tilt: number) => {
      const curve = new THREE.EllipseCurve(0, 0, rx, rz, 0, TAU, false, 0);
      const pts = curve.getPoints(96).map((p) => new THREE.Vector3(p.x, 0, p.y));
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.LineLoop(geo, ringMat);
      line.rotation.x = tilt;
      line.position.y = 0.12;
      scene.add(line);
      ringGeos.push(geo);
      rings.push(line);
    };
    makeRing(2.35, 1.45, 0.18);
    if (!light) makeRing(2.85, 1.75, -0.12);

    const resize = () => {
      const w = Math.max(1, root.clientWidth);
      const h = Math.max(1, root.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && running && !frame) tick(performance.now());
        else if (!visible && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0.12 },
    );
    io.observe(root);

    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running && visible && !frame) tick(performance.now());
      else if (!running && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(resize);
    ro.observe(root);

    let lastDraw = 0;
    function tick(now: number) {
      if (disposed || !running || !visible) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
      if (now - lastDraw < 33) return;
      lastDraw = now;

      const elapsed = clock.getElapsedTime();
      const t = (elapsed % LOOP) / LOOP;
      const wave = Math.sin(t * TAU);
      const push = Math.sin(t * Math.PI);

      camera.position.set(wave * 0.16, 0.2 + wave * 0.03, 5.7 - push * 0.38);
      camera.lookAt(0, 0.18, 0);

      const phone = scene.getObjectByName("phone");
      if (phone) {
        phone.rotation.y = wave * THREE.MathUtils.degToRad(34);
        phone.rotation.x = 0.07;
        phone.position.y = 0.46 + Math.sin(t * TAU * 2) * 0.045;
      }

      const hand = scene.getObjectByName("hand") as THREE.Mesh | undefined;
      if (hand && hand.material instanceof THREE.MeshBasicMaterial) {
        hand.material.opacity = 0.92 + Math.sin(t * TAU * 3) * 0.08;
      }

      cardMeshes.forEach((mesh, i) => {
        const card = ORBIT_CARDS[i];
        const angle = (i / ORBIT_CARDS.length) * TAU + t * TAU * card.revs;
        const rx = 2.48 + (i % 3) * 0.2;
        const rz = 1.52 + (i % 2) * 0.28;
        let x = Math.cos(angle) * rx;
        const z = Math.sin(angle) * rz;
        const y = 0.28 + Math.sin(angle * 2 + i) * 0.48;
        if (z > 0.32 && Math.abs(x) < 1.08) {
          x += Math.sign(x || Math.cos(angle)) * 0.9;
        }
        mesh.position.set(x, y, z);
        mesh.lookAt(camera.position);
        mesh.rotation.z = Math.sin(angle) * 0.08;
        const depth = THREE.MathUtils.clamp((z + 2.1) / 4.2, 0.08, 1);
        mesh.scale.setScalar(0.86 + depth * 0.22);
        mesh.renderOrder = z > 0 ? 3 : 1;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.55 + depth * 0.4;
      });

      if (particles && particlesGeo) {
        const pos = particlesGeo.getAttribute("position");
        for (let i = 0; i < particleCount; i += 1) {
          const y = positions[i * 3 + 1] + speeds[i] * 0.004;
          positions[i * 3 + 1] = y > 2.4 ? -2.4 : y;
        }
        pos.needsUpdate = true;
        particles.rotation.y = t * 0.35;
      }

      renderer.render(scene, camera);
    }

    void Promise.all([
      loadTexture("/media/trading-orbit-phone.webp"),
      loadTexture("/media/trading-orbit-hand.webp"),
    ])
      .then(([phoneRaw, handRaw]) => {
        const phoneMap = toKeyedTexture(phoneRaw);
        const handMap = toKeyedTexture(handRaw);
        if (disposed) {
          phoneMap.dispose();
          handMap.dispose();
          return;
        }
        textures.push(phoneMap, handMap);

        const handMat = new THREE.MeshBasicMaterial({
          map: handMap,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        punchOutBlack(handMat);
        const hand = new THREE.Mesh(handGeo, handMat);
        hand.name = "hand";
        hand.position.set(0, -1.22, -0.35);
        hand.renderOrder = 0;
        scene.add(hand);
        disposables.push(hand);

        const phoneMat = new THREE.MeshBasicMaterial({
          map: phoneMap,
          transparent: true,
          depthWrite: false,
        });
        punchOutBlack(phoneMat);
        const phone = new THREE.Mesh(phoneGeo, phoneMat);
        phone.name = "phone";
        phone.position.set(0, 0.46, 0);
        phone.renderOrder = 2;
        scene.add(phone);
        disposables.push(phone);

        ORBIT_CARDS.forEach((card) => {
          const map = new THREE.CanvasTexture(makeCardTexture(card));
          map.colorSpace = THREE.SRGBColorSpace;
          textures.push(map);
          const mat = new THREE.MeshBasicMaterial({
            map,
            transparent: true,
            depthWrite: false,
          });
          const mesh = new THREE.Mesh(cardGeo, mat);
          scene.add(mesh);
          cardMeshes.push(mesh);
          disposables.push(mesh);
        });

        root.classList.add("is-live");
        onReadyRef.current?.();
        clock.start();
        tick(performance.now());
      })
      .catch(() => undefined);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      disposables.forEach((obj) => {
        scene.remove(obj);
        const mesh = obj as THREE.Mesh;
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat: THREE.Material) => mat.dispose());
        }
      });
      rings.forEach((ring) => scene.remove(ring));
      ringGeos.forEach((geo) => geo.dispose());
      phoneGeo.dispose();
      handGeo.dispose();
      cardGeo.dispose();
      particlesGeo?.dispose();
      particlesMat?.dispose();
      ringMat.dispose();
      textures.forEach((texture) => texture.dispose());
      root.classList.remove("is-live");
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="orbit-canvas-host" ref={rootRef} />;
}

export default TradingOrbitStage;
