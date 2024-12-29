const themeSwitchBtn = document.querySelector('#theme-switch-button');
const santaHat = document.querySelector('#santa-hat');
const scrollDownBtn = document.querySelector('#scroll-down-button');
const aboutSection = document.querySelector('#about-section');
const photo = document.querySelector('#photo');
const image = photo.querySelector('img');
const aboutText = document.querySelector('#about-text');
const skillCardsContainer = document.querySelector('#skill-cards-container');
const skillCards = document.querySelectorAll('.skill-card');
const contactSectionLinks = document.querySelectorAll('#contact-section a');
const projectCards = document.querySelectorAll('.project-card');

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

// Update height of photo in About section
const updatePhotoHeight = () => {
  image.style.height = 0;
  image.style.width = 0;

  photo.style.maxHeight = aboutText.clientHeight + 'px';

  if (photo.clientHeight > photo.clientWidth) {
    image.style.height = '100%';
    image.style.width = 'unset';
  } else {
    image.style.height = 'unset';
    image.style.width = '100%';
  }
};

// Event Listeners
themeSwitchBtn.addEventListener('click', switchTheme);
scrollDownBtn.addEventListener('click', showAboutSection);
window.addEventListener('resize', updatePhotoHeight);

skillCardsContainer.addEventListener('mousemove', event => {
  for (const card of skillCards) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Move card gradient
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
});

skillCards.forEach(card => {
  if (!document.body.classList.contains('touch')) {
    card.addEventListener('mousemove', event => {
      // Fade all card images
      skillCards.forEach(card => (card.querySelector('img').style.opacity = 0.25));

      // Except current one
      event.currentTarget.querySelector('img').style.opacity = 1;
    });

    // Reset fade
    card.addEventListener('mouseleave', () => {
      skillCards.forEach(card => (card.querySelector('img').style.opacity = 1));
    });
  }
});

projectCards.forEach(card => {
  if (!document.body.classList.contains('touch')) {
    card.addEventListener('mousemove', event => {
      // Fade all cards
      projectCards.forEach(card => (card.style.opacity = 0.5));

      // Except current one
      event.currentTarget.style.opacity = 1;
    });

    // Reset fade
    card.addEventListener('mouseleave', () => {
      projectCards.forEach(card => (card.style.opacity = 1));
    });
  }
});

contactSectionLinks.forEach(link => {
  if (!document.body.classList.contains('touch')) {
    link.addEventListener('mousemove', event => {
      // Blur all links
      contactSectionLinks.forEach(link => {
        link.style.filter = 'blur(5px)';
        link.style.transform = 'scale(0.95)';
      });

      // Except current one
      event.currentTarget.style.filter = 'blur(0px)';
      event.currentTarget.style.transform = 'scale(1)';
    });

    // Reset blur
    link.addEventListener('mouseleave', () => {
      contactSectionLinks.forEach(link => {
        link.style.filter = 'blur(0px)';
        link.style.transform = 'scale(1)';
      });
    });
  }
});

// On load - set theme
const currentTheme = localStorage.getItem('theme');
currentTheme ? setTheme(currentTheme) : setTheme(LIGHT_THEME);

// On load - show santa hat in December
santaHat.hidden = new Date().getMonth() !== 11;

// On load - show scroll down button after delay
setTimeout(() => {
  scrollDownBtn.classList.remove('hide');
}, 5000);

// On load - update photo height
updatePhotoHeight();
