/* ============================================================
   CloudAxis — Main JavaScript
   Author:  Alex Müller
   Updated: 2025
   ============================================================ */

'use strict';

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
      setButtonState(btn, 'Please fill in name & email', '#c0392b');
      setTimeout(() => resetButton(btn), 2500);
      return;
    }

    // Build mailto URL
    const subject = encodeURIComponent(
      service
        ? '[CloudAxis] Enquiry: ' + service
        : '[CloudAxis] New Enquiry from ' + name
    );
    const body = encodeURIComponent(
      'Name:     ' + name + '\n' +
      'Company:  ' + (company || '-') + '\n' +
      'Email:    ' + email + '\n' +
      'Service:  ' + (service || '-') + '\n\n' +
      'Message:\n' + (message || '-')
    );

    // Replace with your real email address
    const recipient = 'hello@cloudaxis.dev';
    window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;

    setButtonState(btn, 'Opening your email client... Done', '#00c853');
    setTimeout(() => { resetButton(btn); form.reset(); }, 3500);
  });

  function setButtonState(btn, text, color) {
    btn.textContent       = text;
    btn.style.background  = color;
    btn.style.borderColor = color;
  }
  function resetButton(btn) {
    btn.textContent       = 'Send Message';
    btn.style.background  = '';
    btn.style.borderColor = '';
  }
})();

/* ── Hamburger Menu ────────────────────────────────────────── */
(function initHamburger() {
  const btn   = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  function toggleMenu(open) {
    btn.classList.toggle('open', open);
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', () => {
    const isOpen = links.classList.contains('open');
    toggleMenu(!isOpen);
  });

  // Close when a nav link is clicked
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });
})();
