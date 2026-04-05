/* ============================================================
   CloudAxis — Main JavaScript
   Author:  Alex Müller
   Updated: 2025
   ============================================================ */

'use strict';

/* ── Hamburger Menu ── */
(function initHamburger() {
  var btn   = document.querySelector('.nav-hamburger');
  var links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  function toggleMenu(open) {
    btn.classList.toggle('open', open);
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', function () {
    toggleMenu(!links.classList.contains('open'));
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { toggleMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') toggleMenu(false);
  });
})();

/* ── Scroll Reveal ── */
(function initScrollReveal() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.fbar-fill').forEach(function (bar) {
        bar.style.width = bar.dataset.width + '%';
      });
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  // Trigger bars already visible on load
  document.querySelectorAll('.fbar-fill').forEach(function (bar) {
    var track = bar.closest('.finops-bars');
    if (track && track.getBoundingClientRect().top < window.innerHeight) {
      bar.style.width = bar.dataset.width + '%';
    }
  });
})();

/* ── Contact Form (mailto:) ── */
(function initContactForm() {
  var form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = document.getElementById('contact-name').value.trim();
    var company = document.getElementById('contact-company').value.trim();
    var email   = document.getElementById('contact-email').value.trim();
    var service = document.getElementById('contact-service').value;
    var message = document.getElementById('contact-message').value.trim();
    var btn     = form.querySelector('.btn-submit');

    if (!name || !email) {
      btn.textContent      = 'Please fill in name & email';
      btn.style.background = '#c0392b';
      setTimeout(function () { btn.textContent = 'Send Message'; btn.style.background = ''; }, 2500);
      return;
    }

    var subject = encodeURIComponent(service
      ? '[CloudAxis] Enquiry: ' + service
      : '[CloudAxis] New Enquiry from ' + name
    );
    var body = encodeURIComponent(
      'Name:     ' + name    + '\n' +
      'Company:  ' + (company || '-') + '\n' +
      'Email:    ' + email   + '\n' +
      'Service:  ' + (service || '-') + '\n\n' +
      'Message:\n' + (message || '-')
    );

    // ⚠️ Replace with your real email address
    window.location.href = 'mailto:hello@cloudaxis.dev?subject=' + subject + '&body=' + body;

    btn.textContent      = 'Opening email client...';
    btn.style.background = '#00c853';
    setTimeout(function () { btn.textContent = 'Send Message'; btn.style.background = ''; form.reset(); }, 3500);
  });
})();
