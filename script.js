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
const SUN_ICON = 'night';

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

// switch theme
function setTheme(theme) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === LIGHT_THEME) {
    themeSwitch.classList.remove(SUN_ICON);
    homeSection.style.backgroundImage = "url('./images/banner.jpg')";
  } else {
    themeSwitch.classList.add(SUN_ICON);
    homeSection.style.backgroundImage = "url('./images/banner-dark.jpg')";
  }
}

themeSwitch.addEventListener('click', () => {
  const theme = themeSwitch.classList.contains(SUN_ICON) ? LIGHT_THEME : DARK_THEME;
  setTheme(theme);
});

//#region page load

const currentTheme = localStorage.getItem('theme');

// set theme on page load
if (currentTheme === null) {
  currentTheme = LIGHT_THEME;
  localStorage.setItem('theme', currentTheme);
}

if (currentTheme === DARK_THEME) {
  themeSwitch.classList.add(SUN_ICON);
}

setTheme(currentTheme);

// remove section id from url on page load
if (location.href.includes('#')) {
  location = location.href.substring(0, location.href.indexOf('#'));
}

//#endregion
