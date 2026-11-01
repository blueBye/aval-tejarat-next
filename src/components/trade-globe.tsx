"use client";

import { useEffect, useRef, useState } from "react";
import iran from "@/data/iran-border.json";

type Route = {
  originLat: number;
  originLng: number;
  endLat: number;
  endLng: number;
  phase: number;
};

// Illustrative long-haul corridors from seven different Iranian cities.
// These do not represent actual scheduled flights or confirmed cargo routes.
const IRAN_CENTER = { lat: 32.2, lng: 53.4 };
const ROUTES: Route[] = [
  { originLat: 35.6892, originLng: 51.389, endLat: 51.5072, endLng: -0.1276, phase: 0.00 }, // Tehran → London
  { originLat: 27.1832, originLng: 56.2666, endLat: 1.3521, endLng: 103.8198, phase: 0.21 }, // Bandar Abbas → Singapore
  { originLat: 29.5918, originLng: 52.5837, endLat: -1.2864, endLng: 36.8172, phase: 0.43 }, // Shiraz → Nairobi
  { originLat: 32.6546, originLng: 51.668, endLat: 52.52, endLng: 13.405, phase: 0.64 }, // Isfahan → Berlin
  { originLat: 36.2605, originLng: 59.6168, endLat: 13.7563, endLng: 100.5018, phase: 0.83 }, // Mashhad → Bangkok
  { originLat: 38.0962, originLng: 46.2738, endLat: 40.4168, endLng: -3.7038, phase: 0.31 }, // Tabriz → Madrid
  { originLat: 28.9234, originLng: 50.8203, endLat: 6.9271, endLng: 79.8612, phase: 0.72 }, // Bushehr → Colombo
];
const FLIGHT_DURATION_MS = 5400; // Every complete flight takes 5.4 seconds (under 6s).
const ROUTE_SEGMENTS = 128;
const TRAIL_FRACTION = 0.72;
const ROTATION_RAD_PER_SECOND = 0.012; // 50% faster than the previous 0.008 rad/s.

export function TradeGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function initialize() {
      try {
        const [THREE, { default: ThreeGlobe }] = await Promise.all([
          import("three"),
          import("three-globe"),
        ]);
        if (disposed || !host) return;

        const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        // This is a presentation, not a draggable control. Do not intercept page scrolling.
        renderer.domElement.style.cssText = "width:100%;height:100%;display:block;pointer-events:none";
        host.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 1200);
        camera.position.set(0, 0, 330);
        camera.lookAt(0, 0, 0);

        const globe = new ThreeGlobe({ animateIn: false, waitForGlobeReady: false })
          .globeImageUrl("/images/globe-earth-dark.png")
          .showGraticules(true)
          .showAtmosphere(true)
          .atmosphereColor("#79afaf")
          .atmosphereAltitude(0.15)
          .polygonsData([iran])
          .polygonGeoJsonGeometry("geometry")
          .polygonCapColor(() => "#e2b35e")
          .polygonSideColor(() => "#a97936")
          .polygonStrokeColor(() => "#f5d99c")
          .polygonAltitude(0.012)
          .polygonsTransitionDuration(0)
          .pointsData([]);

        // Orient the CENTER of Iran directly toward the camera; north stays upright.
        // Derive orientation from three-globe's own geo coordinate system, not Euler guesses.
        const geoVector = (lat: number, lng: number) => {
          const { x, y, z } = globe.getCoords(lat, lng, 0);
          return new THREE.Vector3(x, y, z);
        };
        const centerPosition = geoVector(IRAN_CENTER.lat, IRAN_CENTER.lng);
        const outward = centerPosition.clone().normalize();
        const north = geoVector(IRAN_CENTER.lat + 0.5, IRAN_CENTER.lng)
          .sub(centerPosition).projectOnPlane(outward).normalize();
        const right = new THREE.Vector3().crossVectors(north, outward).normalize();
        // Geodetic north maps to screen +Y; local vertical axis never tilts.
        const localOrientation = new THREE.Matrix4().makeBasis(right, north, outward);
        globe.quaternion.setFromRotationMatrix(localOrientation).invert().normalize();
        const initialOrientation = globe.quaternion.clone();
        scene.add(globe);

        scene.add(new THREE.AmbientLight(0xffffff, 2.2));
        const sunlight = new THREE.DirectionalLight(0xe8d2a8, 2.7);
        sunlight.position.set(-250, 180, 250);
        scene.add(sunlight);

        const radius = globe.getGlobeRadius();
        const pointOnArc = (start: InstanceType<typeof THREE.Vector3>, end: InstanceType<typeof THREE.Vector3>, fraction: number) => {
          const angle = Math.acos(THREE.MathUtils.clamp(start.dot(end), -1, 1));
          const direction = start.clone();
          if (angle > 0.00001) {
            const sine = Math.sin(angle);
            direction.multiplyScalar(Math.sin((1 - fraction) * angle) / sine)
              .addScaledVector(end, Math.sin(fraction * angle) / sine);
          }
          // Long, gently elevated arches. The plane and its trail use identical samples.
          const altitude = 0.35 * Math.sin(Math.PI * fraction);
          return direction.normalize().multiplyScalar(radius * (1 + altitude));
        };

        const activeMaterial = new THREE.LineBasicMaterial({ color: 0xf3cc7e, transparent: true, opacity: 0.95, depthWrite: false });
        const planeShape = new THREE.Shape();
        planeShape.moveTo(0, 5);
        planeShape.lineTo(1, 0.4);
        planeShape.lineTo(4, -1.5);
        planeShape.lineTo(4, -2.5);
        planeShape.lineTo(1, -1.6);
        planeShape.lineTo(1, -4);
        planeShape.lineTo(2, -5);
        planeShape.lineTo(2, -5.5);
        planeShape.lineTo(0, -4.9);
        planeShape.lineTo(-2, -5.5);
        planeShape.lineTo(-2, -5);
        planeShape.lineTo(-1, -4);
        planeShape.lineTo(-1, -1.6);
        planeShape.lineTo(-4, -2.5);
        planeShape.lineTo(-4, -1.5);
        planeShape.lineTo(-1, 0.4);
        planeShape.closePath();
        const planeGeometry = new THREE.ShapeGeometry(planeShape);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffecc8, side: THREE.DoubleSide, depthTest: true });
        const flightPaths = ROUTES.map(route => {
          const start = geoVector(route.originLat, route.originLng).normalize();
          const end = geoVector(route.endLat, route.endLng).normalize();
          const points = Array.from({ length: ROUTE_SEGMENTS + 1 }, (_, index) =>
            pointOnArc(start, end, index / ROUTE_SEGMENTS));
          // Create the dynamic buffer explicitly: getAttribute() has a union
          // return type that also permits InterleavedBufferAttribute, which
          // does not expose setUsage() in Three.js typings.
          const positions = new THREE.BufferAttribute(
            new Float32Array(points.flatMap(point => [point.x, point.y, point.z])),
            3,
          );
          positions.setUsage(THREE.DynamicDrawUsage);
          const geometry = new THREE.BufferGeometry().setAttribute("position", positions);
          const line = new THREE.Line(geometry, activeMaterial);
          globe.add(line);
          const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
          planeMesh.scale.setScalar(0.48);
          const plane = new THREE.Group();
          plane.add(planeMesh);
          globe.add(plane);
          return { route, points, geometry, positions, line, plane, partialIndex: -1 };
        });
        // A billboard faces the viewer, while its nose follows the *projected*
        // tangent to the route. This prevents edge-of-globe aircraft looking sideways.
        const spin = new THREE.Quaternion();
        const inverseGlobe = new THREE.Quaternion();
        const planeRoll = new THREE.Quaternion();
        const planeZ = new THREE.Vector3(0, 0, 1);
        const worldUp = new THREE.Vector3(0, 1, 0);
        const tip = new THREE.Vector3();
        const screenBefore = new THREE.Vector3();
        const screenAfter = new THREE.Vector3();

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
          camera.updateMatrixWorld(true);
          // The camera is otherwise stationary, so no per-frame POV recalculation.
          globe.setPointOfView(camera);
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        resize();

        let visible = true;
        const visibilityObserver = new IntersectionObserver(entries => {
          visible = entries[0]?.isIntersecting ?? true;
        }, { threshold: 0.02 });
        visibilityObserver.observe(host);

        let elapsedMs = 0;
        let rotationAngle = 0;
        let previousTime: number | null = null;
        let frame = 0;
        const tick = (timestamp: number) => {
          if (disposed) return;
          frame = requestAnimationFrame(tick);
          const delta = previousTime === null ? 0 : Math.min(Math.max((timestamp - previousTime) / 1000, 0), 0.12);
          previousTime = timestamp;
          if (!visible || document.hidden) return;
          const reduceMotion = reduceMotionQuery.matches;
          if (!reduceMotion) {
            elapsedMs += delta * 1000;
            rotationAngle = (rotationAngle + delta * ROTATION_RAD_PER_SECOND) % (2 * Math.PI);
          }
          // Absolute rotation from the original upright Iran-facing quaternion.
          // Avoid incremental quaternion drift and the expensive per-frame setPointOfView().
          spin.setFromAxisAngle(worldUp, rotationAngle);
          globe.quaternion.copy(spin).multiply(initialOrientation);
          globe.updateMatrixWorld(true);
          inverseGlobe.copy(globe.quaternion).invert();

          flightPaths.forEach(flight => {
            const { route, points, line, plane, positions } = flight;
            const phase = reduceMotion ? 0.7 : (elapsedMs / FLIGHT_DURATION_MS + route.phase) % 1;
            const continuousHead = Math.max(2, Math.min(ROUTE_SEGMENTS - 0.0001, phase * ROUTE_SEGMENTS));
            const head = Math.floor(continuousHead);
            const tail = Math.max(0, head - Math.round(ROUTE_SEGMENTS * TRAIL_FRACTION));
            // Interpolate between samples so planes glide continuously even at 120Hz.
            tip.copy(points[head]).lerp(points[head + 1], continuousHead - head);
            const partialIndex = head + 1;
            if (flight.partialIndex !== -1 && flight.partialIndex !== partialIndex) {
              const original = points[flight.partialIndex];
              positions.setXYZ(flight.partialIndex, original.x, original.y, original.z);
            }
            positions.setXYZ(partialIndex, tip.x, tip.y, tip.z);
            positions.needsUpdate = true;
            flight.partialIndex = partialIndex;
            // The last vertex is the plane's exact position: no speed/position drift.
            line.geometry.setDrawRange(tail, head - tail + 2);
            plane.position.copy(tip);

            // Project points into the camera plane, then point the nose toward
            // screen-space travel. The mesh remains camera-facing at every longitude.
            screenBefore.copy(points[Math.max(0, head - 2)])
              .applyMatrix4(globe.matrixWorld).project(camera);
            screenAfter.copy(points[Math.min(ROUTE_SEGMENTS, head + 2)])
              .applyMatrix4(globe.matrixWorld).project(camera);
            const dx = screenAfter.x - screenBefore.x;
            const dy = screenAfter.y - screenBefore.y;
            const heading = Math.atan2(-dx, dy);
            planeRoll.setFromAxisAngle(planeZ, heading);
            plane.quaternion.copy(inverseGlobe).multiply(camera.quaternion).multiply(planeRoll);
          });

          renderer.render(scene, camera);
        };
        frame = requestAnimationFrame(tick);
        if (!disposed) setRendered(true);
        cleanup = () => {
          cancelAnimationFrame(frame);
          resizeObserver.disconnect();
          visibilityObserver.disconnect();
          flightPaths.forEach(({ line, geometry, plane }) => {
            globe.remove(line, plane);
            geometry.dispose();
          });
          activeMaterial.dispose();
          planeGeometry.dispose();
          planeMaterial.dispose();
          globe._destructor();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (error) {
        console.warn("3D globe unavailable, using CSS fallback:", error);

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

    </div>
  );
}
