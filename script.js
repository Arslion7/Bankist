'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelectorAll('.btn--show-modal');
const closeModalBtn = document.querySelectorAll('.btn--close-modal');
const scrollToBtn = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

openModalBtn.forEach(element => {
  element.addEventListener('click', openModal);
});

closeModalBtn.forEach(element => {
  element.addEventListener('click', closeModal);
});

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

scrollToBtn.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabs.addEventListener('click', function (e) {
  const fullBtn = e.target.closest('.operations__tab');

  if (!fullBtn) return;

  document.querySelectorAll('.operations__tab').forEach(element => {
    element.classList.remove('operations__tab--active');
  });
  document.querySelectorAll('.operations__content').forEach(element => {
    element.classList.remove('operations__content--active');
  });

  fullBtn.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${fullBtn.dataset.tab}`)
    .classList.add('operations__content--active');
});

const fade = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const logo = e.target.closest('.nav').querySelector('.nav__logo');
    const navLinksToFade = e.target
      .closest('.nav')
      .querySelectorAll('.nav__link');
    navLinksToFade.forEach(element => {
      if (element !== e.target) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', fade.bind(0.5));
nav.addEventListener('mouseout', fade.bind(1));

const navHeight = nav.getBoundingClientRect().height;

const navOptions = {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
};

const navCallback = function (entries, observer) {
  const [entry] = entries;
  nav.classList.toggle('sticky', !entry.isIntersecting);
};

const navObserver = new IntersectionObserver(navCallback, navOptions);

const navTarget = document.querySelector('.header');
navObserver.observe(navTarget);

const secOptions = {
  root: null,
  threshold: 0.15,
};

const secCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const secObserver = new IntersectionObserver(secCallback, secOptions);

document.querySelectorAll('.section').forEach(element => {
  element.classList.add('section--hidden');
  secObserver.observe(element);
});

const imgOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
};

const imgCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgCallback, imgOptions);

document.querySelectorAll('img[data-src]').forEach(element => {
  imgObserver.observe(element);
});

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  let currSlide = 0;

  const relocate = function () {
    slides.forEach((element, i) => {
      element.style.transform = `translateX(${(i - currSlide) * 100}%)`;
    });
  };

  const btnLeft = function () {
    currSlide--;
    if (currSlide < 0) currSlide = slides.length - 1;
    update();
  };

  const btnRight = function () {
    currSlide++;
    if (currSlide >= slides.length) currSlide = 0;
    update();
  };

  const update = function () {
    relocate();
    activeBtn();
  };

  document
    .querySelector('.slider__btn--left')
    .addEventListener('click', btnLeft);

  document
    .querySelector('.slider__btn--right')
    .addEventListener('click', btnRight);

  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeBtn = function () {
    document.querySelectorAll('.dots__dot').forEach(element => {
      element.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${currSlide}"]`)
      .classList.add('dots__dot--active');
  };

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      currSlide = e.target.dataset.slide;
      update();
    }
  });

  createDots();
  update();
};
slider();
