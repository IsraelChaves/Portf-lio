const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const backTop = document.getElementById('backTop');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav-link')];

function updateHeader() {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 30);
  backTop?.classList.toggle('show', y > 500);

  let current = 'inicio';
  sections.forEach(section => {
    if (y >= section.offsetTop - 180) current = section.id;
  });
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('mousemove', event => {
  const glow = document.querySelector('.cursor-glow');
  if (glow && window.innerWidth > 760) {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
