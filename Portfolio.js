// simple behaviors: year, smooth in-page scroll, form handling with email validation
document.addEventListener('DOMContentLoaded', () => {
  // 1) Year insertion
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) Smooth in-page scroll for anchors that link to IDs
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // update hash without jumping
      history.pushState(null, '', `#${id}`);
    }
  });

  // 3) Contact form handling (with simple email validation)
  const form = document.getElementById('contactForm');
  if (!form) return;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const messageEl = document.getElementById('message');
    const msgEl = document.getElementById('formMsg');
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const message = messageEl ? messageEl.value.trim() : '';

    if (!name || !email || !message) {
      if (msgEl) msgEl.textContent = 'Please fill in all fields.';
      return;
    }

    if (!validateEmail(email)) {
      if (msgEl) msgEl.textContent = 'Please enter a valid email address.';
      if (emailEl) emailEl.focus();
      return;
    }

    // Build mailto link and open user's email client
    const subject = encodeURIComponent('Portfolio message from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');

    if (submitBtn) submitBtn.disabled = true;
    if (msgEl) msgEl.textContent = 'Opening your email client...';

    window.location.href = `mailto:dariusjerry9@gmail.com?subject=${subject}&body=${body}`;

    // fallback: re-enable and clear after a short delay
    setTimeout(() => {
      if (submitBtn) submitBtn.disabled = false;
      if (msgEl) msgEl.textContent = '';
      form.reset();
    }, 2000);
  });
});