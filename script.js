const body = document.querySelector('body');
const nav = document.querySelector('nav');
const navLinks = document.querySelector('#nav-links');
const navMenu = document.querySelector('#nav-menu');
const navCloseContainer = document.querySelector('#nav-close-container');
const navClose = document.querySelector('#nav-close');
const navDrawerLinks = document.querySelector('#nav-drawer-links');
const overlay = document.querySelector('#overlay');
const heroContainer = document.querySelector('#hero-container');
const secondarySkillsContainer = document.querySelector('#secondary-skills-container');
const secondarySkills = document.querySelector('#secondary-skills');
const toggleSecondarySkills = document.querySelector('#toggle-secondary-skills');
const youtube = document.querySelector('#youtube');

let lastScrollY = window.scrollY; // default scroll position

// update heights for elements based on nav
const updateHeights = () => {
  navCloseContainer.style.height = `${nav.clientHeight}px`;
  heroContainer.style.marginTop = `${nav.clientHeight / 2}px`;
};

navDrawerLinks.innerHTML = navLinks.innerHTML; // nav drawer links mirror nav links

// open nav drawer on click of menu
navMenu.addEventListener('click', () => {
  body.classList.add('nav-drawer-open');
});

// close nav drawer on click of close
navClose.addEventListener('click', () => {
  body.classList.remove('nav-drawer-open');
});

// close nav drawer on click of overlay
overlay.addEventListener('click', () => {
  body.classList.remove('nav-drawer-open');
});

// close nav drawer on window resize
window.addEventListener('resize', () => {
  body.classList.remove('nav-drawer-open');
  updateHeights();
});

// update nav styles
window.addEventListener('scroll', () => {
  // hide nav based on scroll position
  if (window.scrollY > nav.clientHeight && window.scrollY > lastScrollY) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }

  // apply shadow to nav based on scroll position
  if (window.scrollY > 0) {
    nav.classList.add('nav-shadow');
  } else {
    nav.classList.remove('nav-shadow');
  }

  // update scroll position
  lastScrollY = window.scrollY;
});

// scroll section into view when clicking on nav links
[...navLinks.querySelectorAll('a'), ...navDrawerLinks.querySelectorAll('a')].forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();

    // hide nav drawer
    if (anchor.closest('#nav-drawer')) {
      body.classList.remove('nav-drawer-open');
    }

    document.querySelector(anchor.getAttribute('href')).scrollIntoView();
  });
});

// show nav if items are focused
[...nav.querySelectorAll('a'), navMenu].forEach(item => {
  item.addEventListener('focus', () => {
    nav.classList.remove('nav-hidden');
  });
});

// toggle secondary skills
toggleSecondarySkills.addEventListener('click', () => {
  const secondarySkillsStyles = getComputedStyle(secondarySkills);

  if (secondarySkillsContainer.classList.contains('secondary-skills-shown')) {
    secondarySkillsContainer.style.maxHeight = '';
    secondarySkillsContainer.classList.remove('secondary-skills-shown');
    toggleSecondarySkills.textContent = 'Show more';
  } else {
    secondarySkillsContainer.style.maxHeight = `calc(
      ${secondarySkills.clientHeight}px +
      ${secondarySkillsStyles.marginTop} +
      ${secondarySkillsStyles.marginBottom})
    `;
    secondarySkillsContainer.classList.add('secondary-skills-shown');
    toggleSecondarySkills.textContent = 'Show less';
  }
});

// prevent default action for youtube link
youtube.addEventListener('click', e => {
  e.preventDefault();
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

updateHeights(); // update heights on load
