/**
 * SCENE 3D — Atmospheric WebGL Atmosphere Engine
 *
 * Đồng bộ màu sắc ánh sáng & hạt bụi điện ảnh theo cảm xúc từng slide:
 * - Slide 01-02: Crimson Tension Embers (Tổn thương & Cảnh báo)
 * - Slide 03: Cyan Hallway Motes (Không gian trường học)
 * - Slide 04-06: Amber & Crimson Depth (Nguyên nhân & Hậu quả tâm lý)
 * - Slide 07: Cyber Digital Pulse (Bạo lực mạng)
 * - Slide 08: Crimson & Emerald Duality (Đối lập Nên & Không nên)
 * - Slide 09: Cyan Stepping Sparks (Lộ trình hành động)
 * - Slide 10-11: Emerald Protective Aurora (Liên minh & Lá chắn bảo vệ)
 * - Slide 12-17: Radiant Golden Dawn Fireflies (Bình minh trường học hạnh phúc)
 *
 * Cố định góc nhìn (không lắc theo chuột) tạo cảm giác tĩnh tại, sang trọng.
 */

import * as THREE from 'three';

export class Scene3D {
  constructor(canvasSelector = '#scene-3d-canvas') {
    this.canvas = document.querySelector(canvasSelector);
    if (!this.canvas) return;

    this.currentSlide = 0;
    this.isRunning = true;
    this.clock = new THREE.Clock();

    // Thematic Mood Palettes for all 17 slides
    this.slideMoods = [
      { primary: new THREE.Color(0xef4444), secondary: new THREE.Color(0x38bdf8), light: 0xef4444 }, // Slide 1: Intro
      { primary: new THREE.Color(0xef4444), secondary: new THREE.Color(0xf59e0b), light: 0xef4444 }, // Slide 2: 4 Forms
      { primary: new THREE.Color(0x06b6d4), secondary: new THREE.Color(0x3b82f6), light: 0x06b6d4 }, // Slide 3: Locations
      { primary: new THREE.Color(0xf59e0b), secondary: new THREE.Color(0xef4444), light: 0xf59e0b }, // Slide 4: Causes
      { primary: new THREE.Color(0x6366f1), secondary: new THREE.Color(0xf59e0b), light: 0x6366f1 }, // Slide 5: Signs
      { primary: new THREE.Color(0xef4444), secondary: new THREE.Color(0x94a3b8), light: 0xef4444 }, // Slide 6: Consequences
      { primary: new THREE.Color(0xef4444), secondary: new THREE.Color(0x06b6d4), light: 0xef4444 }, // Slide 7: Cyber
      { primary: new THREE.Color(0xef4444), secondary: new THREE.Color(0x10b981), light: 0xf59e0b }, // Slide 8: Duality
      { primary: new THREE.Color(0x06b6d4), secondary: new THREE.Color(0x38bdf8), light: 0x06b6d4 }, // Slide 9: Pathway
      { primary: new THREE.Color(0x10b981), secondary: new THREE.Color(0xf59e0b), light: 0x10b981 }, // Slide 10: Alliance
      { primary: new THREE.Color(0x10b981), secondary: new THREE.Color(0x06b6d4), light: 0x10b981 }, // Slide 11: Shield
      { primary: new THREE.Color(0xf59e0b), secondary: new THREE.Color(0x10b981), light: 0xf59e0b }, // Slide 12: Dawn
      { primary: new THREE.Color(0x06b6d4), secondary: new THREE.Color(0x3b82f6), light: 0x06b6d4 }, // Slide 13: Quiz 2
      { primary: new THREE.Color(0xf59e0b), secondary: new THREE.Color(0xef4444), light: 0xf59e0b }, // Slide 14: Quiz 3
      { primary: new THREE.Color(0x10b981), secondary: new THREE.Color(0xf59e0b), light: 0x10b981 }, // Slide 15: Quiz 4
      { primary: new THREE.Color(0x38bdf8), secondary: new THREE.Color(0x10b981), light: 0x38bdf8 }, // Slide 16: Quiz 5
      { primary: new THREE.Color(0x10b981), secondary: new THREE.Color(0xf59e0b), light: 0x10b981 }  // Slide 17: Finale
    ];

    this.currentPrimary = new THREE.Color(0xef4444);
    this.currentSecondary = new THREE.Color(0x38bdf8);
    this.targetPrimary = new THREE.Color(0xef4444);
    this.targetSecondary = new THREE.Color(0x38bdf8);

    this.initScene();
    this.initLights();
    this.initAtmosphericParticles();
    this.initEvents();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 14);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.isPaused = false;
  }

  initLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(this.ambientLight);

    // Accent directional light that adapts color to current slide theme
    this.accentPointLight = new THREE.PointLight(0xef4444, 2.5, 30);
    this.accentPointLight.position.set(0, 4, 6);
    this.scene.add(this.accentPointLight);
  }

  initAtmosphericParticles() {
    this.particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);
    this.particleVelocities = [];

    for (let i = 0; i < this.particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      colors[i * 3] = 0.9;
      colors[i * 3 + 1] = 0.2;
      colors[i * 3 + 2] = 0.2;

      this.particleVelocities.push({
        vx: (Math.random() - 0.5) * 0.006,
        vy: 0.004 + Math.random() * 0.008,
        vz: (Math.random() - 0.5) * 0.005,
        ratio: Math.random()
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Luminous additive point texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.7)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.28,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  setSlide(index) {
    if (index < 0 || index >= this.slideMoods.length) return;
    this.currentSlide = index;

    const mood = this.slideMoods[index];
    if (!mood) return;

    this.targetPrimary.copy(mood.primary);
    this.targetSecondary.copy(mood.secondary);

    if (this.accentPointLight) {
      this.accentPointLight.color.setHex(mood.light);
    }
  }

  pauseForTransition() {
    this.isPaused = true;
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  resumeAfterTransition() {
    this.isPaused = false;
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  initEvents() {
    window.addEventListener('resize', () => {
      if (!this.camera || !this.renderer) return;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.addEventListener('visibilitychange', () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) {
        this.clock.start();
        this.animate();
      }
    });
  }

  animate() {
    if (!this.isRunning) return;
    requestAnimationFrame(() => this.animate());
    if (this.isPaused) return;

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smoothly interpolate mood colors towards current slide target
    this.currentPrimary.lerp(this.targetPrimary, 0.04);
    this.currentSecondary.lerp(this.targetSecondary, 0.04);

    if (this.particles) {
      const posAttr = this.particles.geometry.attributes.position;
      const colAttr = this.particles.geometry.attributes.color;
      const posArray = posAttr.array;
      const colArray = colAttr.array;

      for (let i = 0; i < this.particleCount; i++) {
        const vel = this.particleVelocities[i];

        // Soft floating drift
        posArray[i * 3 + 1] += vel.vy;
        posArray[i * 3] += Math.sin(elapsedTime * 0.5 + i) * 0.003;

        // Wrap around boundaries
        if (posArray[i * 3 + 1] > 10) posArray[i * 3 + 1] = -10;
        if (posArray[i * 3] > 16) posArray[i * 3] = -16;
        if (posArray[i * 3] < -16) posArray[i * 3] = 16;

        // Blend primary and secondary colors per particle
        const blended = new THREE.Color().copy(this.currentPrimary).lerp(this.currentSecondary, vel.ratio);
        colArray[i * 3] = blended.r;
        colArray[i * 3 + 1] = blended.g;
        colArray[i * 3 + 2] = blended.b;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
