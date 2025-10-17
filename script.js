const body = document.querySelector('body');
const nav = document.querySelector('nav');
const navLinks = document.querySelector('#nav-links');
const navMenu = document.querySelector('#nav-menu');
const navDrawer = document.querySelector('#nav-drawer');
const navCloseContainer = document.querySelector('#nav-close-container');
const navClose = document.querySelector('#nav-close');
const navDrawerLinks = document.querySelector('#nav-drawer-links');
const themeDrawer = document.querySelector('#theme-drawer');
const themeCloseContainer = document.querySelector('#theme-close-container');
const themeClose = document.querySelector('#theme-close');
const themes = document.querySelector('#themes');
const toggleCRT = document.querySelector('#toggle-crt');
const overlay = document.querySelector('#overlay');
const heroContainer = document.querySelector('#hero-container');
const secondarySkillsContainer = document.querySelector('#secondary-skills-container');
const secondarySkills = document.querySelector('#secondary-skills');
const toggleSecondarySkills = document.querySelector('#toggle-secondary-skills');
const youtube = document.querySelector('#youtube');

navDrawerLinks.innerHTML = navLinks.innerHTML; // nav drawer links mirror nav links

const themeSwitcherBtns = document.querySelectorAll('.theme-switcher');

let lastScrollY = window.scrollY; // default scroll position

// update heights for elements based on nav
const updateHeights = () => {
  navCloseContainer.style.height = `${nav.clientHeight}px`;
  themeCloseContainer.style.height = `${nav.clientHeight}px`;
  heroContainer.style.marginTop = `${nav.clientHeight / 2}px`;
};

// open nav drawer on click of menu
navMenu.addEventListener('click', () => {
  body.classList.add('nav-drawer-open');
});

// close nav drawer on click of close
navClose.addEventListener('click', () => {
  body.classList.remove('nav-drawer-open');
});

// open theme drawer on click of theme switcher
themeSwitcherBtns.forEach(button =>
  button.addEventListener('click', () => {
    // hide nav drawer and add delay before opening theme drawer
    if (navDrawer.contains(button)) {
      themeDrawer.style.transitionDelay = '0.3s';
      body.classList.remove('nav-drawer-open');
    }

    body.classList.add('theme-drawer-open');
  })
);

// remove transition delay for theme drawer when closed
new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (mutation.attributeName === 'class') {
      const body = mutation.target;

      if (!body.classList.contains('theme-drawer-open')) {
        themeDrawer.style.transitionDelay = '';
      }
    }
  }
}).observe(document.body, { attributes: true });

// close theme drawer on click of close
themeClose.addEventListener('click', () => {
  body.classList.remove('theme-drawer-open');
});

// close nav drawer on click of overlay
overlay.addEventListener('click', () => {
  body.classList.remove('nav-drawer-open', 'theme-drawer-open');
});

// close nav drawer on window resize
window.addEventListener('resize', () => {
  body.classList.remove('nav-drawer-open', 'theme-drawer-open');
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
    if (navDrawer.contains(anchor)) {
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
  } else {
    secondarySkillsContainer.style.maxHeight = `calc(
      ${secondarySkills.clientHeight}px +
      ${secondarySkillsStyles.marginTop} +
      ${secondarySkillsStyles.marginBottom})
    `;
    secondarySkillsContainer.classList.add('secondary-skills-shown');
  }
});

// prevent default action for youtube link
youtube.addEventListener('click', e => {
  e.preventDefault();
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

// add theme radios on load
THEMES.forEach((theme, index) => {
  const label = document.createElement('label');
  label.classList.add('theme');

  const input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('name', 'theme');
  input.value = index;

  const themeImg = document.createElement('div');
  themeImg.classList.add('theme-img');

  const spanBg = document.createElement('span');
  spanBg.style.backgroundColor = theme.bg;

  const spanAccent = document.createElement('span');
  spanAccent.style.backgroundColor = theme.accent;

  themeImg.appendChild(spanBg);
  themeImg.appendChild(spanAccent);

  label.appendChild(input);
  label.appendChild(themeImg);

  themes.insertBefore(label, toggleCRT);

  input.addEventListener('change', () => {
    document.documentElement.style.setProperty('--bg', theme.bg);
    document.documentElement.style.setProperty('--shadow', theme.shadow);
    document.documentElement.style.setProperty('--text', theme.text);
    document.documentElement.style.setProperty('--text-muted', theme.textMuted);
    document.documentElement.style.setProperty('--accent', theme.accent);

    localStorage.setItem('theme', index);
  });
});

// toggle CRT effect
toggleCRT.addEventListener('click', () => {
  body.classList.toggle('crt');

  if (body.classList.contains('crt')) {
    localStorage.setItem('crt', 'on');
  } else {
    localStorage.removeItem('crt');
  }
});

// apply theme on load
const themeValue = Number(localStorage.getItem('theme')) || 0;
const selectedTheme = themes.querySelector(`input[value="${themeValue}"]`);
selectedTheme.checked = true;
selectedTheme.dispatchEvent(new Event('change'));

// apply CRT on load
if (localStorage.getItem('crt') === 'on') {
  body.classList.add('crt');
}

// update heights when fonts are loaded
document.fonts.ready.then(() => updateHeights());
