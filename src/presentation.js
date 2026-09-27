/**
 * PRESENTATION ORCHESTRATOR — Master Slide State & Transition Coordinator
 */

import { SLIDES_DATA, PRESENTATION_META, SLIDE_IMAGE_URLS } from './data.js';
import { audio } from './audio.js';

export class Presentation {
  constructor(morphEngine, scene3d) {
    this.morph = morphEngine;
    this.scene3d = scene3d;
    this.currentIndex = 0;
    this.totalSlides = SLIDES_DATA.length;
    this.isTransitioning = false;

    // DOM Elements
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.counterCurrent = document.querySelector('.counter-current');
    this.counterTotal = document.querySelector('.counter-total');
    this.progressBar = document.querySelector('.progress-bar-fill');
    this.chapterBadge = document.querySelector('.hud-chapter-badge');
    this.overviewModal = document.querySelector('#overview-modal');
    this.overviewGrid = document.querySelector('.overview-grid');

    this.initHUD();
    this.buildOverviewGrid();

    // Khởi chạy animation ngay lập tức cho slide đầu tiên
    if (this.morph && this.slides[0]) {
      this.morph.playStaggerAnimations(this.slides[0]);
    }
  }

  initHUD() {
    if (this.counterTotal) {
      this.counterTotal.textContent = String(this.totalSlides).padStart(2, '0');
    }
    this.updateHUD(0);
  }

  updateHUD(index) {
    const data = SLIDES_DATA[index];
    if (!data) return;

    if (this.counterCurrent) {
      this.counterCurrent.textContent = String(index + 1).padStart(2, '0');
    }

    if (this.progressBar) {
      const pct = ((index + 1) / this.totalSlides) * 100;
      this.progressBar.style.width = `${pct}%`;
    }

    if (this.chapterBadge) {
      this.chapterBadge.textContent = data.chapter;
    }

    document.body.setAttribute('data-chapter-accent', data.accent || 'cyan');

    // Update Overview Cards Active State
    const cards = document.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      card.classList.toggle('is-current', idx === index);
    });

    // Update Thematic Atmospheric Background Backdrops (1 to 17)
    const backdrops = document.querySelectorAll('.bg-backdrop-item');
    backdrops.forEach((item, idx) => {
      item.classList.toggle('is-active', idx === index);
    });
  }

  async goTo(index) {
    if (index === this.currentIndex || index < 0 || index >= this.totalSlides) return;
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    const fromSlide = this.slides[this.currentIndex];
    const toSlide = this.slides[index];
    const direction = index > this.currentIndex ? 'next' : 'prev';
    const oldIndex = this.currentIndex;
    this.currentIndex = index;

    // 1. Cập nhật HUD & Theme
    this.updateHUD(index);

    // 2. Âm thanh phản hồi
    if (index === this.totalSlides - 1) {
      audio.playFinale();
    } else {
      audio.playMorph(index);
    }

    // 3. Đồng bộ 3D Scene
    if (this.scene3d) {
      this.scene3d.setSlide(index);
    }

    // 4. Thực thi Morph Transition an toàn tuyệt đối
    try {
      if (this.morph) {
        await this.morph.transition(fromSlide, toSlide, direction);
      } else {
        fromSlide.classList.remove('active');
        toSlide.classList.add('active');
      }
    } catch (err) {
      console.warn('Transition fallback triggered:', err);
      fromSlide.classList.remove('active');
      toSlide.classList.add('active');
    } finally {
      this.isTransitioning = false;
    }
  }

  next() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.goTo(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.goTo(this.currentIndex - 1);
    }
  }

  first() {
    this.goTo(0);
  }

  last() {
    this.goTo(this.totalSlides - 1);
  }

  toggleOverview() {
    if (!this.overviewModal) return;
    const isOpen = this.overviewModal.classList.toggle('open');
    if (isOpen) {
      audio.playClick(750, 0.04);
    }
  }

  closeOverview() {
    if (this.overviewModal) {
      this.overviewModal.classList.remove('open');
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  togglePresentationMode() {
    document.body.classList.toggle('presentation-mode');
  }

  buildOverviewGrid() {
    if (!this.overviewGrid) return;
    this.overviewGrid.innerHTML = '';

    SLIDES_DATA.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = `overview-card ${idx === this.currentIndex ? 'is-current' : ''}`;
      card.setAttribute('data-index', idx);

      const numStr = String(idx + 1).padStart(2, '0');
      const imgSrc = slide.image || SLIDE_IMAGE_URLS[idx] || SLIDE_IMAGE_URLS[0];

      card.innerHTML = `
        <div class="overview-card-thumb">
          <img src="${imgSrc}" alt="${slide.title}" loading="lazy" onerror="this.style.display='none'">
          <span class="overview-card-badge">${numStr}</span>
        </div>
        <div class="overview-card-info">
          <div class="overview-card-title">${slide.title}</div>
          <div class="overview-card-chapter">${slide.chapter}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.goTo(idx);
        this.closeOverview();
      });

      this.overviewGrid.appendChild(card);
    });
  }
}
