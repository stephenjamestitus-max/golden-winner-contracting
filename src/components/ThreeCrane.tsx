"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function ThreeCrane() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.018);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 28);
    camera.lookAt(0, 10, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffa040, 1.2);
    sunLight.position.set(10, 20, 10);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const goldLight = new THREE.PointLight(0xc9943a, 2, 30);
    goldLight.position.set(0, 15, 5);
    scene.add(goldLight);

    const gold = new THREE.MeshStandardMaterial({ color: 0xc9943a, metalness: 0.7, roughness: 0.3 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.5, roughness: 0.5 });
    const steel = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 });

    // ── Tower ──────────────────────────────────────────────
    const towerGroup = new THREE.Group();

    // Main mast (tall vertical column)
    const mastGeo = new THREE.BoxGeometry(0.6, 22, 0.6);
    const mast = new THREE.Mesh(mastGeo, gold);
    mast.position.set(0, 11, 0);
    mast.castShadow = true;
    towerGroup.add(mast);

    // Mast cross-braces every 2 units
    for (let y = 1; y < 22; y += 2.5) {
      const braceGeo = new THREE.BoxGeometry(1.4, 0.08, 0.08);
      const brace = new THREE.Mesh(braceGeo, dark);
      brace.position.set(0, y, 0);
      towerGroup.add(brace);

      const braceGeo2 = new THREE.BoxGeometry(0.08, 0.08, 1.4);
      const brace2 = new THREE.Mesh(braceGeo2, dark);
      brace2.position.set(0, y + 0.5, 0);
      towerGroup.add(brace2);
    }

    // Base
    const baseGeo = new THREE.BoxGeometry(2.5, 0.5, 2.5);
    const base = new THREE.Mesh(baseGeo, dark);
    base.position.set(0, 0.25, 0);
    base.castShadow = true;
    towerGroup.add(base);

    // Base legs
    const legPositions = [[-1, 0, -1], [1, 0, -1], [-1, 0, 1], [1, 0, 1]];
    legPositions.forEach(([x, , z]) => {
      const legGeo = new THREE.BoxGeometry(0.2, 2, 0.2);
      const leg = new THREE.Mesh(legGeo, gold);
      leg.position.set(x, -0.75, z);
      towerGroup.add(leg);
    });

    // ── Jib (horizontal arm) ─────────────────────────────
    const jibGroup = new THREE.Group();
    jibGroup.position.set(0, 22, 0);

    // Main jib beam
    const jibGeo = new THREE.BoxGeometry(14, 0.3, 0.3);
    const jib = new THREE.Mesh(jibGeo, gold);
    jib.position.set(4, 0, 0);
    jibGroup.add(jib);

    // Counter jib
    const counterGeo = new THREE.BoxGeometry(5, 0.3, 0.3);
    const counter = new THREE.Mesh(counterGeo, gold);
    counter.position.set(-3.5, 0, 0);
    jibGroup.add(counter);

    // Counterweight
    const cwGeo = new THREE.BoxGeometry(1.5, 1, 0.8);
    const cw = new THREE.Mesh(cwGeo, dark);
    cw.position.set(-5.5, -0.5, 0);
    jibGroup.add(cw);

    // A-frame / mast head
    const aframeL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4, 0.1), gold);
    aframeL.position.set(-1, 2, 0);
    aframeL.rotation.z = -0.25;
    jibGroup.add(aframeL);

    const aframeR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4, 0.1), gold);
    aframeR.position.set(1, 2, 0);
    aframeR.rotation.z = 0.25;
    jibGroup.add(aframeR);

    // Jib cables
    const cablePoints1 = [
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(11, 0, 0),
    ];
    const cableGeo1 = new THREE.BufferGeometry().setFromPoints(cablePoints1);
    const cable1 = new THREE.Line(cableGeo1, new THREE.LineBasicMaterial({ color: 0x888888 }));
    jibGroup.add(cable1);

    const cablePoints2 = [
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(-5, 0, 0),
    ];
    const cableGeo2 = new THREE.BufferGeometry().setFromPoints(cablePoints2);
    const cable2 = new THREE.Line(cableGeo2, new THREE.LineBasicMaterial({ color: 0x888888 }));
    jibGroup.add(cable2);

    // Cabin / operator box
    const cabinGeo = new THREE.BoxGeometry(1.2, 1.0, 1.0);
    const cabin = new THREE.Mesh(cabinGeo, new THREE.MeshStandardMaterial({ color: 0xc9943a, metalness: 0.4 }));
    cabin.position.set(0, -1, 0);
    jibGroup.add(cabin);

    towerGroup.add(jibGroup);

    // ── Hook cable + Hook ─────────────────────────────────
    const hookGroup = new THREE.Group();
    hookGroup.position.set(0, 22, 0);

    // Trolley
    const trolleyGeo = new THREE.BoxGeometry(0.6, 0.3, 0.6);
    const trolley = new THREE.Mesh(trolleyGeo, steel);
    trolley.position.set(7, 0, 0);
    hookGroup.add(trolley);

    // Hook cable (line)
    const hookCablePoints = [
      new THREE.Vector3(7, 0, 0),
      new THREE.Vector3(7, -8, 0),
    ];
    const hookCableGeo = new THREE.BufferGeometry().setFromPoints(hookCablePoints);
    const hookCable = new THREE.Line(hookCableGeo, new THREE.LineBasicMaterial({ color: 0xaaaaaa }));
    hookGroup.add(hookCable);

    // Hook block
    const hookBlockGeo = new THREE.BoxGeometry(0.5, 0.4, 0.5);
    const hookBlock = new THREE.Mesh(hookBlockGeo, steel);
    hookBlock.position.set(7, -8.3, 0);
    hookGroup.add(hookBlock);

    towerGroup.add(hookGroup);

    // Ground platform
    const groundGeo = new THREE.CircleGeometry(15, 32);
    const ground = new THREE.Mesh(
      groundGeo,
      new THREE.MeshStandardMaterial({ color: 0x1a1208, roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.6;
    ground.receiveShadow = true;
    scene.add(ground);

    towerGroup.position.set(4, -1.5, 0);
    scene.add(towerGroup);

    // Particles (dust / debris)
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0xd4c4a8, size: 0.08, transparent: true, opacity: 0.5 })
    );
    scene.add(particles);

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow jib rotation
      jibGroup.rotation.y = elapsed * 0.08;
      hookGroup.rotation.y = elapsed * 0.08;

      // Hook sway
      const swayX = Math.sin(elapsed * 0.4) * 0.5;
      hookCablePoints[1].x = 7 + swayX;
      hookBlock.position.x = 7 + swayX;
      hookCableGeo.setFromPoints(hookCablePoints);

      // Particles drift
      const posArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += 0.01;
        if (posArr[i * 3 + 1] > 25) posArr[i * 3 + 1] = 0;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Gentle camera bob
      camera.position.y = 8 + Math.sin(elapsed * 0.2) * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
