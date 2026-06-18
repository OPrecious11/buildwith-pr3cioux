/* ============================================================
   MAIN JS — Buildwith_Pr3cioux
   ============================================================ */

/* ── 1. SCROLL SPY — Active nav on scroll ── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.sidebar__nav-link');

const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      // Desktop sidebar
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });

      // Mobile bottom nav
      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  rootMargin: '-20% 0px -20% 0px',
  threshold: 0.1
});

sections.forEach(section => spyObserver.observe(section));


/* ── 2. TESTIMONIALS CAROUSEL ── */
const track = document.getElementById('testimonials-track');
const prevBtn = document.getElementById('testimonials-prev');
const nextBtn = document.getElementById('testimonials-next');
const dots = document.querySelectorAll('.testimonials__dot');

let current = 0;
const total = dots.length;

function goTo(index) {
  current = Math.max(0, Math.min(index, total - 1));

  const cardWidth = track.children[0].offsetWidth;
  const gap = 24;
  track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
}

dots.forEach(dot => {
  dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
});

let autoplay = setInterval(() => {
  goTo(current < total - 1 ? current + 1 : 0);
}, 5000);

if (track) {
  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      goTo(current < total - 1 ? current + 1 : 0);
    }, 5000);
  });
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */

   const cursor = document.createElement('div');
   const cursorDot = document.createElement('div');
   
   cursor.classList.add('cursor');
   cursorDot.classList.add('cursor__dot');
   
   document.body.appendChild(cursor);
   document.body.appendChild(cursorDot);
   
   let mouseX = 0, mouseY = 0;
   let cursorX = 0, cursorY = 0;
   
   // Track mouse position
   document.addEventListener('mousemove', (e) => {
     mouseX = e.clientX;
     mouseY = e.clientY;
   
     // Dot follows instantly
     cursorDot.style.left = mouseX + 'px';
     cursorDot.style.top = mouseY + 'px';
   });
   
   // Outer ring follows with lerp smoothing
   function animateCursor() {
     cursorX += (mouseX - cursorX) * 0.12;
     cursorY += (mouseY - cursorY) * 0.12;
   
     cursor.style.left = cursorX + 'px';
     cursor.style.top = cursorY + 'px';
   
     requestAnimationFrame(animateCursor);
   }
   animateCursor();
   
   // Hover states
   const hoverTargets = document.querySelectorAll(
     'a, button, .work__featured, .work__card, .blog__card, .skills__item, .skills__tool, .testimonials__btn'
   );
   
   hoverTargets.forEach(el => {
     el.addEventListener('mouseenter', () => {
       cursor.classList.add('cursor--hover');
       cursorDot.classList.add('cursor__dot--hover');
     });
     el.addEventListener('mouseleave', () => {
       cursor.classList.remove('cursor--hover');
       cursorDot.classList.remove('cursor__dot--hover');
     });
   });
   
   // Hide on mouse leave
   document.addEventListener('mouseleave', () => {
     cursor.style.opacity = '0';
     cursorDot.style.opacity = '0';
   });
   
   document.addEventListener('mouseenter', () => {
     cursor.style.opacity = '1';
     cursorDot.style.opacity = '1';
   });