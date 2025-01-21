document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for section reveal animations
  const sections = document.querySelectorAll('section');

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('nav ul li a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - document.querySelector('nav').offsetHeight,
        behavior: 'smooth'
      });
    });
  });

  // Button click effect
  const buttons = document.querySelectorAll('button');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.add('clicked');
      setTimeout(() => this.classList.remove('clicked'), 200);
    });
  });

  // Toggle navigation menu for mobile
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('show');
  });

  // Smooth scroll polyfill for better cross-browser compatibility
  (function () {
    if ('scrollBehavior' in document.documentElement.style) {
      return;
    }

    function scrollTo(element, options) {
      const start = element.scrollTop;
      const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

      const defaults = {
        top: 0,
        left: 0,
        behavior: 'auto'
      };

      const config = { ...defaults, ...options };

      if (config.behavior !== 'smooth') {
        element.scrollTop = config.top;
        element.scrollLeft = config.left;
        return;
      }

      const duration = 468;
      const easing = t => t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1;

      const animateScroll = function () {
        const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((currentTime - startTime) / duration));
        const timeFunction = easing(time);

        element.scrollTop = Math.ceil(timeFunction * (config.top - start) + start);

        if (element.scrollTop === config.top) {
          return;
        }

        requestAnimationFrame(animateScroll);
      };

      animateScroll();
    }

    const originalScrollTo = window.scrollTo;
    window.scrollTo = function (options) {
      if (typeof options === 'number') {
        originalScrollTo.apply(window, arguments);
        return;
      }

      scrollTo(document.documentElement, options);
    };
  }());

  // Initialize Swiper for news section
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
});

// Example: Toggle Social Sidebar Visibility
const sidebar = document.querySelector('.social-sidebar');
window.addEventListener('scroll', () => {
if (window.scrollY > 200) {
  sidebar.style.opacity = '1';
} else {
  sidebar.style.opacity = '0';
}
sidebar.style.transition = 'opacity 0.5s ease';
});

// Dark Mode Toggle
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
body.classList.toggle('dark-mode');
document.querySelectorAll('nav, header, .social-sidebar a').forEach(el => {
  el.classList.toggle('dark-mode');
});

// Update button text
if (body.classList.contains('dark-mode')) {
  toggleButton.textContent = 'Light Mode';
} else {
  toggleButton.textContent = 'Dark Mode';
}
});

