const themeSwitchBtn = document.querySelector('#theme-switch-button');
const scrollDownBtn = document.querySelector('#scroll-down-button');
const aboutSection = document.querySelector('#about-section');
const aboutPhoto = document.querySelector('#about-photo');
const image = document.querySelector('#about-photo img');
const aboutText = document.querySelector('#about-text');
const skillCardsContainer = document.querySelector('#skill-cards-container');
const skillCards = document.querySelectorAll('#skill-cards-container .skill-card');
const contactSectionLinks = document.querySelectorAll('#contact-section a');
const projectCards = document.querySelectorAll('#project-cards-container .project-card');

const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

// Set theme
const setTheme = theme => {
  switch (theme) {
    case DARK_THEME:
      document.documentElement.setAttribute('data-theme', DARK_THEME);
      themeSwitchBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
      themeSwitchBtn.setAttribute('title', 'Switch to light mode');
      localStorage.setItem('theme', DARK_THEME);
      break;

    case LIGHT_THEME:
      document.documentElement.setAttribute('data-theme', LIGHT_THEME);
      themeSwitchBtn.querySelector('i').classList.replace('fa-sun', 'fa-moon');
      themeSwitchBtn.setAttribute('title', 'Switch to dark mode');
      localStorage.setItem('theme', LIGHT_THEME);
      break;
  }
};

// Switch theme dynamically
const switchTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  currentTheme ? setTheme(currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME) : setTheme(DARK_THEME);
};

// Scroll to About section
const showAboutSection = () => aboutSection.scrollIntoView();

// Update height and width of photo in About section
const updatePhotoSize = () => {
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  image.style.height = 0;
  image.style.width = 0;

  // Fixed height for smaller devices since grid layout uses 1 column only
  if (viewportWidth <= 576) {
    aboutPhoto.style.maxHeight = '200px';
    aboutPhoto.style.maxWidth = '';
  } else if (viewportWidth <= 768) {
    aboutPhoto.style.maxHeight = '250px';
    aboutPhoto.style.maxWidth = '';
  } else {
    aboutPhoto.style.maxHeight = aboutText.clientHeight + 'px';
    aboutPhoto.style.maxWidth = '';
  }

  if (aboutPhoto.clientHeight > aboutPhoto.clientWidth) {
    image.style.height = '100%';
    image.style.width = 'unset';
  } else {
    image.style.height = 'unset';
    image.style.width = '100%';
  }
};

// Apply same style to multiple elements with exceptions
const applyStyleToMultipleElements = (style, value, allElements, exceptions = []) => {
  // Disable for touchscreen devices
  if (document.body.classList.contains('touch')) return;

  switch (style) {
    case 'blur':
      allElements.forEach(el => {
        if (!exceptions.includes(el)) el.style.filter = `blur(${value}px)`;
      });
      break;

    case 'opacity':
      allElements.forEach(el => {
        if (!exceptions.includes(el)) el.style.opacity = value;
      });
      break;

    case 'scale':
      allElements.forEach(el => {
        if (!exceptions.includes(el)) el.style.transform = `scale(${value})`;
      });
      break;
  }
};

// Set up page on load
const init = () => {
  // Set theme
  const currentTheme = localStorage.getItem('theme');
  currentTheme ? setTheme(currentTheme) : setTheme(LIGHT_THEME);

  // Show scroll down button after delay
  setTimeout(() => scrollDownBtn.classList.remove('hide'), 5000);

  // Update photo height after slight delay
  setTimeout(() => updatePhotoSize(), 500);
};

// Event Listeners
themeSwitchBtn.addEventListener('click', switchTheme);
scrollDownBtn.addEventListener('click', showAboutSection);
window.addEventListener('resize', updatePhotoSize);

// Move skill cards gradient
skillCardsContainer.addEventListener('mousemove', event => {
  // Disable for touchscreen devices
  if (document.body.classList.contains('touch')) return;

  for (const card of skillCards) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
});

skillCards.forEach(card => {
  // Blur/scale all cards except current one
  card.addEventListener('mouseenter', event => {
    applyStyleToMultipleElements('blur', 2.5, skillCards, [event.currentTarget]);
    applyStyleToMultipleElements('scale', 0.995, skillCards, [event.currentTarget]);
  });

  // Reset blur/scale
  card.addEventListener('mouseleave', () => {
    applyStyleToMultipleElements('blur', 0, skillCards);
    applyStyleToMultipleElements('scale', 1, skillCards);
  });
});

// Rotate project cards, shadows and glares
document.querySelectorAll('.project-card').forEach(card => {
  // Disable for touchscreen devices
  if (document.body.classList.contains('touch')) return;

  card.addEventListener('mousemove', event => {
    const rect = card.querySelector('a').getBoundingClientRect();

    const x = Math.abs(rect.x - event.clientX);
    const y = Math.abs(rect.y - event.clientY);

    card.style.perspective = `${(rect.width / 2) * 6}px`;

    const rotateX = (y - rect.height / 2) / 50;
    const rotateY = (x - rect.width / 2) / 25;
    card.style.setProperty('--rotate-x', `${-rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);

    const shadowX = (x - rect.width / 2) / 3;
    const shadowY = (y - rect.height / 2) / 6;
    card.style.setProperty('--shadow-x', `${-shadowX}px`);
    card.style.setProperty('--shadow-y', `${-shadowY}px`);

    const glareX = (1 - x / rect.width) * 100;
    const glareY = (1 - y / rect.height) * 100;
    card.style.setProperty('--glare-x', `${glareX}%`);
    card.style.setProperty('--glare-y', `${glareY}%`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--shadow-x', '0px');
    card.style.removeProperty('--shadow-y', '10px');
    card.style.removeProperty('--rotate-x', '0deg');
    card.style.removeProperty('--rotate-y', '0deg');
  });
});

projectCards.forEach(card => {
  // Blur/scale all cards except current one
  card.addEventListener('mouseenter', event => {
    applyStyleToMultipleElements('blur', 5, projectCards, [event.currentTarget]);
    applyStyleToMultipleElements('scale', 0.995, projectCards, [event.currentTarget]);
  });

  // Reset blur/scale
  card.addEventListener('mouseleave', () => {
    applyStyleToMultipleElements('blur', 0, projectCards);
    applyStyleToMultipleElements('scale', 1, projectCards);
  });
});

contactSectionLinks.forEach(link => {
  // Blur/scale all links except current one
  link.addEventListener('mouseenter', event => {
    applyStyleToMultipleElements('blur', 5, contactSectionLinks, [event.currentTarget]);
    applyStyleToMultipleElements('scale', 0.95, contactSectionLinks, [event.currentTarget]);
  });

  // Reset blur/scale
  link.addEventListener('mouseleave', () => {
    applyStyleToMultipleElements('blur', 0, contactSectionLinks);
    applyStyleToMultipleElements('scale', 1, contactSectionLinks);
  });
});

// On load
init();
