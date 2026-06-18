/* ============================================================
   NUMBER COUNTER ANIMATION
   Triggers when numbers scroll into view
   ============================================================ */

   function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const isDecimal = el.dataset.target.includes('.');
    const suffix = el.dataset.suffix || '';
    const duration = 1800; // ms
    const startTime = performance.now();
  
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
  
      // Ease out expo — fast start, smooth landing
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
  
      const current = eased * target;
  
      el.textContent = isDecimal
        ? current.toFixed(1) + suffix
        : Math.floor(current) + suffix;
  
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }
  
    requestAnimationFrame(update);
  }
  
  /* Observe all counter elements */
  const counters = document.querySelectorAll('[data-target]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));

  /* ============================================================
   SCROLL REVEAL ANIMATION
   Sections fade + slide up as they enter view
   ============================================================ */

const revealElements = document.querySelectorAll(
    '.work__header, .work__featured, .work__card, .skills__item, .skills__tool, .about__photo-wrap, .about__right, .testimonials__card, .resume__item, .resume__edu-item, .resume__extra-item, .blog__card, .contact__link'
  );
  
  revealElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.6s ease ${i % 4 * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i % 4 * 0.1}s`;
  });
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));