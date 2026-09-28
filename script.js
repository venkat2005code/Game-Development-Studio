/* =====================================================================
   PIXELFORGE STUDIO — SHARED JAVASCRIPT
   ===================================================================== */

(function () {
  'use strict';

  const html = document.documentElement;

  /* -----------------------------------------------------------------------
     1. THEME TOGGLE (Dark / Light)
  ----------------------------------------------------------------------- */
  const themeBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('pf-theme', theme);
  }

  // On load — restore saved theme
  const savedTheme = localStorage.getItem('pf-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* -----------------------------------------------------------------------
     2. RTL / LTR TOGGLE — display only the active mode
        Show 'LTR' when currently in LTR mode
        Show 'RTL' when currently in RTL mode
  ----------------------------------------------------------------------- */
  const rtlBtn   = document.getElementById('rtl-toggle');
  const dirLabel = document.getElementById('dir-label');

  function applyDir(dir) {
    html.setAttribute('dir', dir);
    localStorage.setItem('pf-dir', dir);
    // Show the CURRENT active mode label
    if (dirLabel) {
      dirLabel.textContent = dir.toUpperCase(); // LTR or RTL
    }
  }

  // On load — restore saved direction
  const savedDir = localStorage.getItem('pf-dir') || 'ltr';
  applyDir(savedDir);

  if (rtlBtn) {
    rtlBtn.addEventListener('click', () => {
      const current = html.getAttribute('dir');
      applyDir(current === 'ltr' ? 'rtl' : 'ltr');
    });
  }

  /* -----------------------------------------------------------------------
     3. STICKY HEADER SCROLL EFFECT
  ----------------------------------------------------------------------- */
  const header = document.getElementById('site-header');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------------------------------------------------
     4. SCROLL REVEAL ANIMATION
  ----------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback — show all immediately
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* -----------------------------------------------------------------------
     5. PLATFORM FILTER — Game Cabinet Grid (Home 2)
  ----------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cabinetCards = document.querySelectorAll('.cabinet-card');

  if (filterBtns.length && cabinetCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        cabinetCards.forEach((card) => {
          const platforms = card.getAttribute('data-platform') || '';
          if (filter === 'all' || platforms.includes(filter)) {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              if (!platforms.includes(filter) && filter !== 'all') {
                card.style.display = 'none';
              }
            }, 280);
          }
        });
      });
    });
  }

  /* -----------------------------------------------------------------------
     6. BOOKING FORM — Basic Submission Feedback
  ----------------------------------------------------------------------- */
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('[type="submit"]');
      btn.textContent = '✓ Request Sent! We\'ll contact you shortly.';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      bookingForm.reset();
    });
  }

  /* -----------------------------------------------------------------------
     7. ENQUIRY FORM — Basic Submission Feedback
  ----------------------------------------------------------------------- */
  const enquiryForm = document.getElementById('enquiry-form');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = enquiryForm.querySelector('[type="submit"]');
      btn.textContent = '✓ Brief Received! Expect a reply within 24 hours.';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      enquiryForm.reset();
    });
  }

  /* -----------------------------------------------------------------------
     8. HAMBURGER MENU (Mobile) — toggle nav visibility
  ----------------------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.querySelector('.main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.style.display === 'flex';
      mainNav.style.display  = isOpen ? '' : 'flex';
      mainNav.style.flexDirection = 'column';
      mainNav.style.position = 'fixed';
      mainNav.style.top      = 'var(--header-h)';
      mainNav.style.left     = '0';
      mainNav.style.right    = '0';
      mainNav.style.background = 'var(--bg-base)';
      mainNav.style.padding  = '1.5rem 2rem';
      mainNav.style.borderBottom = '1px solid var(--border)';
      mainNav.style.zIndex   = '899';
      if (isOpen) {
        mainNav.removeAttribute('style');
      }
    });
  }

})();
