// src/quiz.js — Interactive Gamified Quiz Engine (5 Questions before Finale)
import { audio } from './audio.js';

// Lightweight celebratory confetti particle system
function spawnConfetti(originX, originY) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const colors = ['#38bdf8', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#fb7185', '#60a5fa'];
  const particles = [];
  const startX = originX || window.innerWidth / 2;
  const startY = originY || window.innerHeight / 2;

  for (let i = 0; i < 70; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      opacity: 1,
      shape: Math.random() > 0.4 ? 'rect' : 'circle'
    });
  }

  let animationFrame;
  const startTime = performance.now();

  function render(now) {
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.98; // air resistance
      p.rotation += p.vRot;
      p.opacity = Math.max(0, 1 - elapsed / 1800);

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }

      ctx.restore();
    });

    if (elapsed < 1800) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    }
  }

  animationFrame = requestAnimationFrame(render);
}

export class QuizEngine {
  constructor(presentation) {
    this.pres = presentation;
    this.init();
  }

  init() {
    const quizContainers = document.querySelectorAll('.interactive-quiz-wrap');
    quizContainers.forEach((container) => {
      const options = container.querySelectorAll('.quiz-option-btn');
      const feedback = container.querySelector('.quiz-feedback-box');
      const nextBtn = container.querySelector('.quiz-next-btn');

      options.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const isCorrect = btn.getAttribute('data-correct') === 'true';
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          if (isCorrect) {
            // Đúng: ăn mừng, confetti, âm thanh tươi vui
            audio.playCorrect();
            spawnConfetti(centerX, centerY);

            options.forEach(b => {
              b.classList.remove('is-wrong', 'is-active-choice');
              b.disabled = true; // Khóa sau khi đã chọn đúng
            });
            btn.classList.add('is-correct');

            if (feedback) {
              feedback.className = 'quiz-feedback-box is-correct-feedback visible';
              feedback.innerHTML = `
                <div class="feedback-badge">🎉 CHÍNH XÁC! TUYỆT VỜI</div>
                <div class="feedback-text">${btn.getAttribute('data-explanation') || 'Bạn đã chọn đáp án hoàn toàn chính xác!'}</div>
              `;
            }

            if (nextBtn) {
              nextBtn.classList.add('visible');
              nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          } else {
            // Sai: âm thanh vui nhộn, rung lắc, khích lệ thử lại
            audio.playWrong();
            btn.classList.remove('is-wrong');
            void btn.offsetWidth; // Reflow to re-trigger shake animation
            btn.classList.add('is-wrong');

            if (feedback) {
              feedback.className = 'quiz-feedback-box is-wrong-feedback visible';
              feedback.innerHTML = `
                <div class="feedback-badge">🤔 CHƯA CHÍNH XÁC RỒI</div>
                <div class="feedback-text">Đừng lo lắng, hãy suy nghĩ thêm một chút và <strong>chọn lại đáp án khác</strong> nhé! ✨</div>
              `;
            }
          }
        });
      });

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          // Ưu tiên target chỉ định cụ thể nếu có (VD: data-target="13")
          const explicitTarget = parseInt(nextBtn.getAttribute('data-target'), 10);
          if (!isNaN(explicitTarget) && explicitTarget >= 1 && explicitTarget <= this.pres.totalSlides) {
            this.pres.goTo(explicitTarget - 1); // 1-indexed to 0-indexed
            return;
          }

          // Tự động tìm vị trí của slide hiện tại trong danh sách slides
          const currentSlide = container.closest('.slide');
          const currentIndex = this.pres.slides.indexOf(currentSlide);

          if (currentIndex !== -1 && currentIndex < this.pres.totalSlides - 1) {
            this.pres.goTo(currentIndex + 1);
          } else {
            this.pres.next();
          }
        });
      }
    });
  }
}
