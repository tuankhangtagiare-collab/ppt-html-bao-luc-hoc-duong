/**
 * MAIN ENTRY POINT — Initializes 3D, Morph Engine, Presentation & Interactions
 */

import { MorphEngine } from './morph.js';
import { Scene3D } from './scene3d.js';
import { Presentation } from './presentation.js';
import { Interactions } from './interactions.js';
import { QuizEngine } from './quiz.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Khởi tạo 3D WebGL Canvas trước
  let scene3d = null;
  try {
    scene3d = new Scene3D('#scene-3d-canvas');
  } catch (err) {
    console.warn('Three.js initialization notice:', err);
  }

  // 2. Khởi tạo Morph Engine tích hợp callback tạm dừng Three.js để tối ưu hóa 100% GPU
  const morphEngine = new MorphEngine('#morph-stage', {
    duration: 560,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    fadeDuration: 220,
    onTransitionStart() {
      if (scene3d) scene3d.pauseForTransition();
    },
    onTransitionEnd() {
      if (scene3d) scene3d.resumeAfterTransition();
    }
  });

  // 3. Khởi tạo Presentation Orchestrator
  const presentation = new Presentation(morphEngine, scene3d);

  // 4. Khởi tạo Tương tác Người Dùng (Bàn phím, Chuột, UI)
  new Interactions(presentation);

  // 5. Khởi tạo Interactive Gamified Quiz Engine (5 Câu hỏi chọn A-B-C-D)
  new QuizEngine(presentation);

  // 5. Kiểm tra & Áp dụng tải ảnh cho các slide
  const slideImages = document.querySelectorAll('.slide-external-img');
  slideImages.forEach((img) => {
    if (img.complete && img.naturalHeight !== 0) {
      img.classList.add('is-loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('is-loaded');
      });
      img.addEventListener('error', () => {
        // Giữ nguyên fallback vector art khi không tải được ảnh
        img.style.display = 'none';
      });
    }
  });

});
