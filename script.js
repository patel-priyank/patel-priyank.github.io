const mainBody = document.querySelector('.main');
const logo = document.querySelector('.logo a');
const navbarLinks = document.querySelectorAll('.navbar a');
const themeSwitch = document.querySelector('.theme-switch');
const menu = document.querySelector('.navbar .menu');
const menuBtn = document.querySelector('.menu-btn');
const scrollUpBtn = document.querySelector('.scroll-up-btn');

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';
const SUN_ICON = 'night';

// hide slide out menu when clicking navbar links
navbarLinks.forEach((item) => {
  item.addEventListener('click', () => {
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
    document.querySelector('.home').style.backgroundImage = "url('./images/banner.jpg')";
  } else {
    document.querySelector('.home').style.backgroundImage = "url('./images/banner-dark.jpg')";
  }
}

// toggle sun/moon icon
themeSwitch.addEventListener('click', () => {
  if (themeSwitch.classList.contains(SUN_ICON)) {
    themeSwitch.classList.remove(SUN_ICON);
    setTheme(LIGHT_THEME);
  } else {
    themeSwitch.classList.add(SUN_ICON);
    setTheme(DARK_THEME);
  }
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

//#endregion
