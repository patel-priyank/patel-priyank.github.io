const mainBody = document.querySelector('.main');
const logo = document.querySelector('.logo');
const themeSwitch = document.querySelector('.theme-switch');
const menu = document.querySelector('.navbar .menu');
const menuBtn = document.querySelector('.menu-btn');

// hide slide out menu when clicking logo
logo.addEventListener('click', () => {
  if (menuBtn.classList.contains('active')) {
    menuBtn.click();
  }
});

// toggle navbar menu
menuBtn.addEventListener('click', () => {
  menu.classList.toggle('active'); // slide out menu
  menuBtn.classList.toggle('active'); // toggle bars/cross icon
  mainBody.classList.toggle('active'); // toggle dark overlay behind slide out menu
});

// switch theme
themeSwitch.addEventListener('click', () => {
  themeSwitch.classList.toggle('night'); // change sun/moon icon
});
