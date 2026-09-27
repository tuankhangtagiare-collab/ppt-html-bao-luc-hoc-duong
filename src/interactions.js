/**
 * INTERACTIONS — Keyboard Controls, Mouse Click Zones, HUD Buttons & Idle Detection
 */

import { audio } from './audio.js';

export class Interactions {
  constructor(presentation) {
    this.pres = presentation;
    this.idleTimer = null;
    this.hud = document.querySelector('.hud-ui');

    this.initKeyboard();
    this.initMouseZones();
    this.initHUDButtons();
    this.initIdleDetector();
  }

  initKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Do not capture if active in input / textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch (e.code) {
        case 'ArrowRight':
        case 'Space':
        case 'PageDown':
        case 'KeyL':
          e.preventDefault();
          this.pres.next();
          break;

        case 'ArrowLeft':
        case 'Backspace':
        case 'PageUp':
        case 'KeyH':
          e.preventDefault();
          this.pres.prev();
          break;

        case 'Home':
          e.preventDefault();
          this.pres.first();
          break;

        case 'End':
          e.preventDefault();
          this.pres.last();
          break;

        case 'KeyF':
          e.preventDefault();
          this.pres.toggleFullscreen();
          break;

        case 'KeyM':
        case 'KeyO':
          e.preventDefault();
          this.pres.toggleOverview();
          break;

        case 'KeyP':
          e.preventDefault();
          this.pres.togglePresentationMode();
          break;

        case 'Escape':
          e.preventDefault();
          this.pres.closeOverview();
          break;
      }
    });
  }

  initMouseZones() {
    const leftZone = document.querySelector('.click-zone.left');
    const rightZone = document.querySelector('.click-zone.right');

    if (leftZone) {
      leftZone.addEventListener('click', (e) => {
        // Không kích hoạt nếu đang mở overview hoặc bấm trúng interactive element
        if (this.pres.overviewModal?.classList.contains('open')) return;
        if (e.target.closest('#slides-stage') || e.target.closest('button') || e.target.closest('a')) return;
        this.pres.prev();
      });
    }

    if (rightZone) {
      rightZone.addEventListener('click', (e) => {
        if (this.pres.overviewModal?.classList.contains('open')) return;
        if (e.target.closest('#slides-stage') || e.target.closest('button') || e.target.closest('a')) return;
        this.pres.next();
      });
    }
  }

  initHUDButtons() {
    const btnPrev = document.querySelector('#btn-prev');
    const btnNext = document.querySelector('#btn-next');
    const btnOverview = document.querySelector('#btn-overview');
    const btnFullscreen = document.querySelector('#btn-fullscreen');
    const btnAudio = document.querySelector('#btn-audio');
    const btnCloseOverview = document.querySelector('#btn-close-overview');

    if (btnPrev) btnPrev.addEventListener('click', () => this.pres.prev());
    if (btnNext) btnNext.addEventListener('click', () => this.pres.next());
    if (btnOverview) btnOverview.addEventListener('click', () => this.pres.toggleOverview());
    if (btnFullscreen) btnFullscreen.addEventListener('click', () => this.pres.toggleFullscreen());
    if (btnCloseOverview) btnCloseOverview.addEventListener('click', () => this.pres.closeOverview());

    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        const isSoundOn = audio.toggle();
        const iconOn = btnAudio.querySelector('.sound-on');
        const iconOff = btnAudio.querySelector('.sound-off');
        if (iconOn && iconOff) {
          iconOn.style.display = isSoundOn ? 'block' : 'none';
          iconOff.style.display = isSoundOn ? 'none' : 'block';
        }
      });
    }
  }

  initIdleDetector() {
    const resetIdle = () => {
      if (this.hud) {
        this.hud.classList.remove('idle-hidden');
      }
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        if (this.hud && !document.querySelector('#overview-modal.open')) {
          this.hud.classList.add('idle-hidden');
        }
      }, 3200);
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('click', resetIdle);
    resetIdle();
  }
}
