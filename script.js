const themeSwitchBtn = document.querySelector('#theme-switch-button');
const scrollDownBtn = document.querySelector('#scroll-down-button');

const aboutSection = document.querySelector('#about-section');
const contactSectionLinks = document.querySelectorAll('#contact-section a');

const skillCardsContainer = document.querySelector('#skill-cards-container');
const skillCards = document.querySelectorAll('.skill-card');

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

// Card gradient
skillCardsContainer.onmousemove = event => {
  for (const card of skillCards) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
};

// Event Listeners
themeSwitchBtn.addEventListener('click', switchTheme);
scrollDownBtn.addEventListener('click', showAboutSection);
contactSectionLinks.forEach(link => {
  link.onmousemove = event => {
    contactSectionLinks.forEach(link => (link.style.opacity = 0.2));
    event.target.closest('a').style.opacity = 1;
  };

  link.onmouseleave = () => {
    contactSectionLinks.forEach(link => (link.style.opacity = 1));
  };
});

// On load
const currentTheme = localStorage.getItem('theme');
currentTheme ? setTheme(currentTheme) : setTheme(LIGHT_THEME);
