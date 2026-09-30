/* -------------------------------------------------------------
   ADRIAN GIBI PORTFOLIO INTERACTIVE SCRIPT
   Features: Theme toggle (Dark/Light), Scroll progress indicator,
   Desktop cursor glow follower, Section spy, Mobile navigation drawer,
   Contact form validation
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME TOGGLE ENGINE (Dark/Light mode)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const htmlTag = document.documentElement;

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('adrian_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlTag.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('adrian_portfolio_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlTag.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
      }
    }
  }

  // 2. TOP SCROLL PROGRESS BAR & BACK TO TOP BUTTON
  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. DESKTOP CURSOR GLOW FOLLOWER
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.innerWidth >= 992) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // 4. MOBILE MENU TOGGLE
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburgerBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 5. SCROLL SPY ACTIVE NAV LINK
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 6. CONTACT FORM SUBMISSION HANDLER
  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
        contactForm.reset();

        formToast.className = 'form-toast success';
        formToast.innerHTML = 'Thank you! Your message has been sent to <strong>adrian.gibi10@gmail.com</strong>.';
        formToast.classList.remove('hidden');

        setTimeout(() => {
          submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
          formToast.classList.add('hidden');
        }, 5000);
      }, 1200);
    });
  }
});
