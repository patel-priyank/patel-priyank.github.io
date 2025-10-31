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
const overlay = document.querySelector('#overlay');
const main = document.querySelector('main');
const heroContainer = document.querySelector('#hero-container');
const secondarySkillsContainer = document.querySelector('#secondary-skills-container');
const secondarySkills = document.querySelector('#secondary-skills');
const toggleSecondarySkills = document.querySelector('#toggle-secondary-skills');

navDrawerLinks.innerHTML = navLinks.innerHTML; // nav drawer links mirror nav links

const themeSwitcherBtns = document.querySelectorAll('.theme-switcher');

let lastScrollY = window.scrollY; // default scroll position

// update heights for elements based on nav
const updateHeights = () => {
  navCloseContainer.style.height = `${nav.clientHeight}px`;
  themeCloseContainer.style.height = `${nav.clientHeight}px`;
  heroContainer.style.marginTop = `${nav.clientHeight / 2}px`;
};

// update nav styles based on scroll position
const updateNavStyles = () => {
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
};

// toggle body and drawer keyboard focusability
const updateTabIndices = () => {
  const bodyElements = [...nav.querySelectorAll('a, button, input'), ...main.querySelectorAll('a, button, input')];
  const navDrawerElements = navDrawer.querySelectorAll('a, button, input');
  const themeDrawerElements = themeDrawer.querySelectorAll('a, button, input');

  bodyElements.forEach(el => el.setAttribute('tabindex', '-1'));
  navDrawerElements.forEach(el => el.setAttribute('tabindex', '-1'));
  themeDrawerElements.forEach(el => el.setAttribute('tabindex', '-1'));

  if (body.classList.contains('nav-drawer-open')) {
    navDrawerElements.forEach(el => el.removeAttribute('tabindex'));
  } else if (body.classList.contains('theme-drawer-open')) {
    themeDrawerElements.forEach(el => el.removeAttribute('tabindex'));
  } else {
    bodyElements.forEach(el => el.removeAttribute('tabindex'));
  }
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

// close theme drawer on click of close
themeClose.addEventListener('click', () => {
  body.classList.remove('theme-drawer-open');
});

// observe class changes for body
new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (mutation.attributeName === 'class') {
      const body = mutation.target;

      // remove transition delay for theme drawer when closed
      if (!body.classList.contains('theme-drawer-open')) {
        themeDrawer.style.transitionDelay = '';
      }

      // update tab indices when class changes
      updateTabIndices();
    }
  }
}).observe(body, { attributes: true });

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
  updateNavStyles();
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

// show nav if elements are focused
nav.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('focus', () => {
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

// add theme radios on load
THEMES.forEach(theme => {
  const themeDiv = document.createElement('div');
  themeDiv.classList.add('theme');

  const label = document.createElement('label');
  label.classList.add('theme-label');

  const input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('name', 'theme');
  input.value = theme.name;

  const themeImg = document.createElement('div');
  themeImg.classList.add('theme-img');

  const spanBg = document.createElement('span');
  spanBg.style.backgroundColor = theme.bg;

  const spanAccent = document.createElement('span');
  spanAccent.style.backgroundColor = theme.accent;

  const themeName = document.createElement('span');
  themeName.classList.add('theme-name');
  themeName.textContent = theme.name;

  themeImg.appendChild(spanBg);
  themeImg.appendChild(spanAccent);

  label.appendChild(input);
  label.appendChild(themeImg);

  themeDiv.appendChild(label);
  themeDiv.appendChild(themeName);

  themes.appendChild(themeDiv);

  input.addEventListener('change', () => {
    document.documentElement.style.setProperty('--bg', theme.bg);
    document.documentElement.style.setProperty('--shadow', theme.shadow);
    document.documentElement.style.setProperty('--text', theme.text);
    document.documentElement.style.setProperty('--text-muted', theme.textMuted);
    document.documentElement.style.setProperty('--accent', theme.accent);

    localStorage.setItem('theme', theme.name);
  });
});

// apply theme on load
const storedTheme = THEMES.find(theme => theme.name === localStorage.getItem('theme'));
const themeName = storedTheme ? storedTheme.name : THEMES[0].name;
const selectedTheme = themes.querySelector(`input[value="${themeName}"]`);
selectedTheme.checked = true;
selectedTheme.dispatchEvent(new Event('change'));

const loaderDelay = 2500;
const startTime = Date.now(); // page loaded

// on load
document.fonts.ready.then(() => {
  updateHeights(); // update heights (dependant on font size)
  updateNavStyles(); // update nav styles
  updateTabIndices(); // update tab indices

  // hide loader after loading fonts or loader delay, whichever is larger
  setTimeout(() => {
    body.classList.remove('loading');
  }, Math.max(loaderDelay - Date.now() + startTime, 0));
});
