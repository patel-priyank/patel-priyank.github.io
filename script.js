const mainBody = document.querySelector('.main');
const logo = document.querySelector('.logo a');
const navLinks = document.querySelectorAll('.logo a, .menu a');
const themeSwitch = document.querySelector('.theme-switch');
const menu = document.querySelector('.navbar .menu');
const menuBtn = document.querySelector('.menu-btn');
const scrollUpBtn = document.querySelector('.scroll-up-btn');
const homeSection = document.querySelector('.home');

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const NIGHT_CLASS = 'night';
const THEME_SWITCH_CLASS = 'theme-switch';

const themeConfig = {
  light: {
    classes: [],
    imageUrl: './images/banner.jpg'
  },
  dark: {
    classes: [NIGHT_CLASS],
    imageUrl: './images/banner-dark.jpg'
  }
};

navLinks.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();

    // prevent section id from appearing in url
    document.querySelector(item.getAttribute('href')).scrollIntoView();

    // hide slide out menu when clicking navbar links
    if (menuBtn.classList.contains('active')) {
      menuBtn.click();
    }
  });
});

// show scroll up button
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
});

// scroll to top
scrollUpBtn.addEventListener('click', () => {
  logo.click();
});

// toggle navbar menu
menuBtn.addEventListener('click', () => {
  menu.classList.toggle('active'); // slide out menu
  menuBtn.classList.toggle('active'); // toggle bars/cross icon
  mainBody.classList.toggle('active'); // toggle dark overlay behind slide out menu
});

// hide slide out menu when tapping on body
mainBody.addEventListener('click', () => {
  if (menuBtn.classList.contains('active')) {
    menuBtn.click();
  }
});

// switch theme
function setTheme(theme) {
  const currentThemeSwitchClasses = Array.from(themeSwitch.classList);
  currentThemeSwitchClasses.forEach((className) => themeSwitch.classList.remove(className));

  themeSwitch.classList.add(THEME_SWITCH_CLASS);
  themeConfig[theme].classes.forEach((className) => themeSwitch.classList.add(className));
  homeSection.style.backgroundImage = `url(${themeConfig[theme].imageUrl}`;

  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

themeSwitch.addEventListener('click', () => {
  let theme = themeSwitch.classList.contains(NIGHT_CLASS) ? LIGHT_THEME : DARK_THEME;
  setTheme(theme);
});

//#region page load

let currentTheme = localStorage.getItem('theme');

// set theme on page load
if (currentTheme === null) {
  currentTheme = LIGHT_THEME;
  localStorage.setItem('theme', currentTheme);
}

if (currentTheme === DARK_THEME) {
  themeSwitch.classList.add(NIGHT_CLASS);
}

setTheme(currentTheme);

// remove section id from url on page load
if (location.href.includes('#')) {
  location = location.href.substring(0, location.href.indexOf('#'));
}

//#endregion
