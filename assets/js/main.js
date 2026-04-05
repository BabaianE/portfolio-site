/* ============================================================
   CloudAxis — Main JavaScript
   Author:  Alex Müller
   Updated: 2025
   ============================================================ */

'use strict';

/* ── Custom Cursor ─────────────────────────────────────────── 
(function initCursor() {
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  const interactiveEls = document.querySelectorAll('a, button, .srv-card, .step, .stat-card');
  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cur.style.width    = '16px';
      cur.style.height   = '16px';
      ring.style.width   = '56px';
      ring.style.height  = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width    = '10px';
      cur.style.height   = '10px';
      ring.style.width   = '36px';
      ring.style.height  = '36px';
    });
  });
})();
*/
/* ── Scroll Reveal ─────────────────────────────────────────── */
(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      // Animate FinOps bars when they scroll into view
      entry.target.querySelectorAll('.fbar-fill').forEach((bar) => {
        bar.style.width = bar.dataset.width + '%';
      });
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Trigger bars already in the viewport on page load
  document.querySelectorAll('.fbar-fill').forEach((bar) => {
    const track = bar.closest('.finops-bars');
    if (track && track.getBoundingClientRect().top < window.innerHeight) {
      bar.style.width = bar.dataset.width + '%';
    }
  });
})();

/* ── Contact Form (mailto:) ────────────────────────────────── */
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs  = form.querySelectorAll('input');
    const name    = inputs[0]?.value.trim() ?? '';
    const company = inputs[1]?.value.trim() ?? '';
    const email   = inputs[2]?.value.trim() ?? '';
    const service = form.querySelector('select')?.value  ?? '';
    const message = form.querySelector('textarea')?.value.trim() ?? '';
    const btn     = form.querySelector('.btn-submit');

    // Basic validation
    if (!name || !email) {
      setButtonState(btn, '⚠ Please fill in name & email', '#c0392b');
      setTimeout(() => resetButton(btn), 2500);
      return;
    }

    // Build mailto URL
    const subject = encodeURIComponent(
      service
        ? `[CloudAxis] Enquiry: ${service}`
        : `[CloudAxis] New Enquiry from ${name}`
    );
    const body = encodeURIComponent(
`Name:     ${name}
Company:  ${company || '—'}
Email:    ${email}
Service:  ${service || '—'}

Message:
${message || '—'}`
    );

    // ⚠️  Replace with your real email address
    const recipient = 'hello@cloudaxis.dev';
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    setButtonState(btn, 'Opening your email client… ✓', '#00c853');
    setTimeout(() => { resetButton(btn); form.reset(); }, 3500);
  });

  function setButtonState(btn, text, color) {
    btn.textContent       = text;
    btn.style.background  = color;
    btn.style.borderColor = color;
  }
  function resetButton(btn) {
    btn.textContent       = 'Send Message →';
    btn.style.background  = '';
    btn.style.borderColor = '';
  }
})();
