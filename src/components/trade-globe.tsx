"use client";

import { useEffect, useRef, useState } from "react";
import iran from "@/data/iran-border.json";

type Flight = {
  name: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  duration: number;
  delay: number;
};

// Routes illustrate international trade connections, not tracked shipments.
const flights: Flight[] = [
  { name: "Dubai",    startLat: 35.69, startLng: 51.39, endLat: 25.2,  endLng: 55.27, duration: 7600, delay: 0 },
  { name: "Istanbul", startLat: 35.69, startLng: 51.39, endLat: 41.01, endLng: 28.98, duration: 9200, delay: 1700 },
  { name: "Berlin",   startLat: 35.69, startLng: 51.39, endLat: 52.52, endLng: 13.4,  duration: 11200, delay: 3400 },
  { name: "Mumbai",   startLat: 35.69, startLng: 51.39, endLat: 19.08, endLng: 72.88, duration: 9800, delay: 2300 },
  { name: "Shanghai", startLat: 35.69, startLng: 51.39, endLat: 31.23, endLng: 121.47,duration: 12800, delay: 4300 },
  { name: "Moscow",   startLat: 35.69, startLng: 51.39, endLat: 55.75, endLng: 37.62, duration: 9000, delay: 5100 },
];

// Coordinates, texture and the shape of Iran are included in the repository.
// The globe does not make runtime requests to third-party CDNs or map APIs.
export function TradeGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function initialize() {
      try {
        // Import WebGL dependencies only in the browser. Static Next.js export stays supported.
        const [THREE, { default: ThreeGlobe }, { OrbitControls }] = await Promise.all([
          import("three"),
          import("three-globe"),
          import("three/addons/controls/OrbitControls.js"),
        ]);
        if (disposed || !host) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:pan-y";
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 1200);
        camera.position.set(0, 0, 330);

        const globe = new ThreeGlobe({ animateIn: false, waitForGlobeReady: false })
          .globeImageUrl("/images/globe-earth-dark.png")
          .showGraticules(true)
          .showAtmosphere(true)
          .atmosphereColor("#79afaf")
          .atmosphereAltitude(0.16)
          .polygonsData([iran])
          .polygonGeoJsonGeometry("geometry")
          .polygonCapColor(() => "#e2b35e")
          .polygonSideColor(() => "#a97936")
          .polygonStrokeColor(() => "#f5d99c")
          .polygonAltitude(0.012)
          .polygonsTransitionDuration(0)
          .arcsData(flights)
          .arcStartLat("startLat")
          .arcStartLng("startLng")
          .arcEndLat("endLat")
          .arcEndLng("endLng")
          .arcAltitude(0.25)
          .arcColor(() => ["#f0c675", "#c2e5e6"])
          .arcStroke(0.44)
          .arcDashLength(0.24)
          .arcDashGap(0.82)
          .arcDashAnimateTime(reduceMotion ? 0 : 5200)
          .arcsTransitionDuration(0)
          .pointsData([{ lat: 35.69, lng: 51.39 }])
          .pointLat("lat")
          .pointLng("lng")
          .pointAltitude(0.024)
          .pointRadius(0.48)
          .pointColor(() => "#fff3c5");

        // Center Iran toward the camera on the first frame.
        globe.rotation.set(-0.13, -0.9, -0.02);
        scene.add(globe);
        scene.add(new THREE.AmbientLight(0xffffff, 2.2));
        const sunlight = new THREE.DirectionalLight(0xe8d2a8, 2.7);
        sunlight.position.set(-250, 180, 250);
        scene.add(sunlight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.055;
        controls.minDistance = 255;
        controls.maxDistance = 490;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 0.65;
        controls.autoRotate = !reduceMotion;
        controls.autoRotateSpeed = 0.43;

        // Small airplane-shaped meshes advance along each illustrated arc.
        // Position is calculated from true spherical coordinates every frame.
        const planeShape = new THREE.Shape();
        planeShape.moveTo(0, 5);
        planeShape.lineTo(0.95, 0.35);
        planeShape.lineTo(4.25, -1.6);
        planeShape.lineTo(4.25, -2.7);
        planeShape.lineTo(0.95, -1.75);
        planeShape.lineTo(0.95, -4.05);
        planeShape.lineTo(2.1, -5);
        planeShape.lineTo(2.1, -5.7);
        planeShape.lineTo(0, -5.1);
        planeShape.lineTo(-2.1, -5.7);
        planeShape.lineTo(-2.1, -5);
        planeShape.lineTo(-0.95, -4.05);
        planeShape.lineTo(-0.95, -1.75);
        planeShape.lineTo(-4.25, -2.7);
        planeShape.lineTo(-4.25, -1.6);
        planeShape.lineTo(-0.95, 0.35);
        planeShape.closePath();
        const planeGeometry = new THREE.ShapeGeometry(planeShape);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffecc8, side: THREE.DoubleSide });
        const orientation = new THREE.Matrix4();
        const right = new THREE.Vector3();
        const forward = new THREE.Vector3();
        const normal = new THREE.Vector3();
        const head = new THREE.Vector3();
        const radius = globe.getGlobeRadius();
        const unitVector = (lat: number, lng: number) => {
          const pos = globe.getCoords(lat, lng, 0);
          return new THREE.Vector3(pos.x, pos.y, pos.z).normalize();
        };
        // Match three-globe's actual cubic Bezier arc geometry, including
        // its control-point altitude (1.5 × the configured arcAltitude).
        const sphericalPoint = (
          start: InstanceType<typeof THREE.Vector3>,
          end: InstanceType<typeof THREE.Vector3>,
          progress: number,
          altitude: number,
        ) => {
          const angle = Math.acos(THREE.MathUtils.clamp(start.dot(end), -1, 1));
          const point = start.clone();
          if (angle > 0.00001) {
            const sine = Math.sin(angle);
            point.multiplyScalar(Math.sin((1 - progress) * angle) / sine)
              .addScaledVector(end, Math.sin(progress * angle) / sine);
          }
          return point.normalize().multiplyScalar(radius * (1 + altitude));
        };
        const positions = flights.map(flight => {
          const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
          mesh.scale.setScalar(0.52);
          const object = new THREE.Group();
          object.add(mesh);
          globe.add(object);
          const start = unitVector(flight.startLat, flight.startLng);
          const end = unitVector(flight.endLat, flight.endLng);
          const curve = new THREE.CubicBezierCurve3(
            start.clone().multiplyScalar(radius),
            sphericalPoint(start, end, 0.25, 0.375),
            sphericalPoint(start, end, 0.75, 0.375),
            end.clone().multiplyScalar(radius),
          );
          return { flight, object, curve };
        });

        let width = 1;
        let height = 1;
        const resize = () => {
          if (!host || disposed) return;
          width = Math.max(host.clientWidth, 1);
          height = Math.max(host.clientHeight, 1);
          renderer.setSize(width, height, false);
          globe.rendererSize(new THREE.Vector2(width, height));
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(host);
        resize();

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onMotionChange = () => { controls.autoRotate = !motionQuery.matches; };
        motionQuery.addEventListener("change", onMotionChange);
        let visible = true;
        const visibilityObserver = new IntersectionObserver(entries => {
          visible = entries[0]?.isIntersecting ?? true;
        }, { threshold: 0.02 });
        visibilityObserver.observe(host);

        const clock = new THREE.Clock();
        let frame = 0;
        const tick = () => {
          if (disposed) return;
          frame = requestAnimationFrame(tick);
          if (!visible || document.hidden) { clock.getDelta(); return; }
          const delta = Math.min(clock.getDelta(), 0.06);
          controls.update(delta);
          const now = performance.now();
          globe.setPointOfView(camera);
          positions.forEach(({ flight, object, curve }) => {
            // Reduced-motion users see stationary plane markers and solid routes.
            const progress = motionQuery.matches ? 0.72 : ((now + flight.delay) % flight.duration) / flight.duration;
            curve.getPoint(progress, head);
            curve.getTangent(progress, forward);
            normal.copy(head).normalize();
            forward.addScaledVector(normal, -forward.dot(normal)).normalize();
            right.crossVectors(forward, normal).normalize();
            orientation.makeBasis(right, forward, normal);
            object.position.copy(head);
            object.quaternion.setFromRotationMatrix(orientation);
          });
          renderer.render(scene, camera);
        };
        frame = requestAnimationFrame(tick);
        setRendered(true);
        cleanup = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          visibilityObserver.disconnect();
          motionQuery.removeEventListener("change", onMotionChange);
          controls.dispose();
          positions.forEach(({ object }) => globe.remove(object));
          planeGeometry.dispose();
          planeMaterial.dispose();
          globe._destructor();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (error) {
        console.warn("3D globe unavailable, using CSS fallback:", error);
        if (!disposed) setFailed(true);
      }
    }
    void initialize();
    return () => { disposed = true; cleanup?.(); };
  }, []);

  return (
    <div className={`trade-globe${rendered ? " trade-globe--ready" : ""}`}>
      <div className="trade-globe__stage" ref={mountRef} />
      {!rendered && (
        <div className="trade-globe__fallback" aria-hidden="true">
          <div className="trade-globe__fallback-sphere" />
        </div>
      )}
      <div className="trade-globe__eyebrow" aria-hidden="true"><span /> GLOBAL REACH · IRAN ORIGIN</div>
      <div className="trade-globe__corner" aria-hidden="true">35.69° N · 51.39° E</div>
      <div className="trade-globe__caption" aria-hidden="true">{failed ? "Static globe preview" : "Drag to explore · Illustrative routes"}</div>
    </div>
  );
}
