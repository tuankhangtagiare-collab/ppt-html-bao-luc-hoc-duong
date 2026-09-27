// src/morph.js — Master Cinema-Grade Morph Engine (Keynote / PowerPoint Magic Move + 3D Arc Physics)

function clearDuplicateIds(root) {
  if (root.id) root.removeAttribute("id");
  root.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
}

export class MorphEngine {
  constructor(stageSelector = "#morph-stage", options = {}) {
    this.stage = document.querySelector(stageSelector);
    this.duration = options.duration ?? 660;
    this.easing = options.easing ?? "cubic-bezier(0.16, 1, 0.3, 1)";
    this.isTransitioning = false;
    this.onTransitionStart = typeof options.onTransitionStart === "function" ? options.onTransitionStart : () => {};
    this.onTransitionEnd = typeof options.onTransitionEnd === "function" ? options.onTransitionEnd : () => {};
  }

  resetStaggerAnimations(slide) {
    if (!slide) return;
    slide.classList.remove('play-stagger');
    // Force reflow to reset CSS animation
    void slide.offsetWidth;
  }

  playStaggerAnimations(slide) {
    if (!slide) return;
    // Bật class để kích hoạt CSS keyframes animations
    slide.classList.add('play-stagger');
  }

  getMorphPairs(fromSlide, toSlide) {
    const fromMap = new Map();
    const toMap = new Map();

    fromSlide.querySelectorAll("[data-morph]").forEach(el => {
      const key = el.getAttribute("data-morph");
      if (key) fromMap.set(key, el);
    });

    toSlide.querySelectorAll("[data-morph]").forEach(el => {
      const key = el.getAttribute("data-morph");
      if (key) toMap.set(key, el);
    });

    const pairs = [];
    for (const [key, fromEl] of fromMap) {
      const toEl = toMap.get(key);
      if (toEl) pairs.push({ key, fromEl, toEl });
    }
    return pairs;
  }

  async transition(fromSlide, toSlide, direction = "next") {
    if (!fromSlide || !toSlide || fromSlide === toSlide) return false;
    if (this.isTransitioning) return false;
    this.isTransitioning = true;

    const sign = direction === "next" ? -1 : 1;
    const duration = 800; // Tăng duration để mượt mà hơn, không bị "đập vô mặt"
    const easing = "cubic-bezier(0.25, 1, 0.5, 1)"; // Easing nhẹ nhàng, thanh lịch hơn

    try {
      try {
        this.onTransitionStart({ fromSlide, toSlide, direction });
      } catch (cbErr) {
        console.warn('onTransitionStart callback notice:', cbErr);
      }

      const pairs = this.getMorphPairs(fromSlide, toSlide);

      // Nếu không có phần tử Morph hoặc màn hình nhỏ: Chuyển cảnh slide chuẩn mượt mà
      if (pairs.length === 0 || window.innerWidth < 768) {
        fromSlide.style.transition = `transform ${duration * 0.7}ms ease, opacity ${duration * 0.5}ms ease`;
        fromSlide.style.transform = `translate3d(${sign * 40}px, 0, 0)`; // Giảm quãng đường trượt
        fromSlide.style.opacity = "0";

        toSlide.style.transition = "none";
        toSlide.style.transform = `translate3d(${-sign * 40}px, 0, 0)`;
        toSlide.style.opacity = "0";
        toSlide.classList.add("active");

        void toSlide.offsetHeight;

        toSlide.style.transition = `transform ${duration}ms ${easing}, opacity ${duration * 0.6}ms ease`;
        toSlide.style.transform = "translate3d(0, 0, 0)";
        toSlide.style.opacity = "1";

        this.playStaggerAnimations(toSlide);

        await new Promise(r => setTimeout(r, duration));

        fromSlide.classList.remove("active");
        fromSlide.style.cssText = "";
        toSlide.style.cssText = "";
        return true;
      }

      // TRƯỜNG HỢP CÓ MORPH (Hero Image/Card): Tạo chuyển động bay mượt, tự nhiên
      if (this.stage) this.stage.replaceChildren();

      // 1. Lấy toạ độ phần tử nguồn & đích
      const fromRects = pairs.map(({ fromEl }) => fromEl.getBoundingClientRect());
      toSlide.classList.add("morph-measuring");
      void toSlide.offsetHeight;
      const toRects = pairs.map(({ toEl }) => toEl.getBoundingClientRect());
      toSlide.classList.remove("morph-measuring");

      const morphAnimations = [];

      pairs.forEach(({ key, fromEl, toEl }, i) => {
        const fromRect = fromRects[i];
        const toRect = toRects[i];
        if (fromRect.width <= 0 || toRect.width <= 0) return;

        // Container bay mượt mà từ vị trí cũ sang mới
        const clone = toEl.cloneNode(true);
        clearDuplicateIds(clone);
        clone.className = "morph-floating-item";
        clone.style.position = "fixed";
        clone.style.left = `${fromRect.left}px`;
        clone.style.top = `${fromRect.top}px`;
        clone.style.width = `${fromRect.width}px`;
        clone.style.height = `${fromRect.height}px`;
        clone.style.zIndex = "99999";
        clone.style.pointerEvents = "none";
        clone.style.margin = "0";
        clone.style.borderRadius = "20px";
        clone.style.overflow = "hidden";
        clone.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)"; // Giảm shadow cho thanh lịch

        const cloneImg = clone.querySelector('.slide-external-img');
        if (cloneImg) {
          cloneImg.classList.add('is-loaded');
          cloneImg.style.opacity = '1';
        }

        if (this.stage) this.stage.appendChild(clone);

        fromEl.style.visibility = "hidden";
        toEl.style.visibility = "hidden";

        // Morph bay mượt, bỏ bounce scale để tránh cảm giác giật
        const anim = clone.animate([
          {
            left: `${fromRect.left}px`,
            top: `${fromRect.top}px`,
            width: `${fromRect.width}px`,
            height: `${fromRect.height}px`,
            transform: 'scale(1)'
          },
          {
            left: `${toRect.left}px`,
            top: `${toRect.top}px`,
            width: `${toRect.width}px`,
            height: `${toRect.height}px`,
            transform: 'scale(1)'
          }
        ], {
          duration: duration,
          easing: easing,
          fill: "forwards"
        });

        morphAnimations.push(anim.finished.catch(() => {}));
      });

      // Slide nền chuyển cảnh: CHỈ fade opacity tại chỗ (crossfade) để tôn lên hiệu ứng Morph bay lơ lửng, tạo cảm giác Magic Move đẹp nhất.
      fromSlide.style.transition = `opacity ${duration * 0.7}ms ease`;
      fromSlide.style.transform = "translate3d(0, 0, 0)";
      fromSlide.style.opacity = "0";

      toSlide.style.transition = "none";
      toSlide.style.transform = "translate3d(0, 0, 0)";
      toSlide.style.opacity = "0";
      toSlide.classList.add("active");

      void toSlide.offsetHeight;

      toSlide.style.transition = `opacity ${duration * 0.8}ms ease`;
      toSlide.style.transform = "translate3d(0, 0, 0)";
      toSlide.style.opacity = "1";

      // Chạy ngay animation chi tiết nhỏ của toSlide
      this.playStaggerAnimations(toSlide);

      // Chờ hoàn thành
      await Promise.all([...morphAnimations, new Promise(r => setTimeout(r, duration))]);

      // Hiện lại phần tử thật ngay lập tức không bị chớp giật
      pairs.forEach(({ toEl }) => {
        toEl.style.visibility = "visible";
      });

      if (this.stage) this.stage.replaceChildren();

      fromSlide.classList.remove("active");
      fromSlide.style.cssText = "";
      toSlide.style.cssText = "";

      return true;
    } finally {
      if (this.stage) this.stage.replaceChildren();
      fromSlide.querySelectorAll("[data-morph]").forEach(el => {
        el.style.visibility = "";
      });
      toSlide.querySelectorAll("[data-morph]").forEach(el => {
        el.style.visibility = "";
      });
      this.resetStaggerAnimations(fromSlide);
      this.isTransitioning = false;
      try {
        this.onTransitionEnd({ fromSlide, toSlide, direction });
      } catch (cbErr) {
        console.warn('onTransitionEnd callback notice:', cbErr);
      }
    }
  }
}
