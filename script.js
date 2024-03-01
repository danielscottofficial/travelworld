(function() {
  var $slides = document.querySelectorAll('.slide');
  var $controls = document.querySelectorAll('.slider__control');
  var numOfSlides = $slides.length;
  var slidingAT = 1300; // sync this with scss variable
  var slidingBlocked = false;

  [].slice.call($slides).forEach(function($el, index) {
    var i = index + 1;
    $el.classList.add('slide-' + i);
    $el.dataset.slide = i;
  });

  [].slice.call($controls).forEach(function($el) {
    $el.addEventListener('click', controlClickHandler);
  });

  function controlClickHandler() {
    if (slidingBlocked) return;
    slidingBlocked = true;

    var $control = this;
    var isRight = $control.classList.contains('m--right');
    var $curActive = document.querySelector('.slide.s--active');
    var index = +$curActive.dataset.slide;
    (isRight) ? index++ : index--;
    if (index < 1) index = numOfSlides;
    if (index > numOfSlides) index = 1;
    var $newActive = document.querySelector('.slide-' + index);

    $control.classList.add('a--rotation');
    $curActive.classList.remove('s--active', 's--active-prev');
    document.querySelector('.slide.s--prev').classList.remove('s--prev');
    
    $newActive.classList.add('s--active');
    if (!isRight) $newActive.classList.add('s--active-prev');
    

    var prevIndex = index - 1;
    if (prevIndex < 1) prevIndex = numOfSlides;

    document.querySelector('.slide-' + prevIndex).classList.add('s--prev');

    setTimeout(function() {
      $control.classList.remove('a--rotation');
      slidingBlocked = false;
    }, slidingAT*0.75);
  };
}());

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
      0: {
          slidesPerView: 1,
      },
      520: {
          slidesPerView: 2,
      },
      950: {
          slidesPerView: 3,
      },
  },
});
// Check if it's a touch device
const isTouchDevice = 'ontouchstart' in window;
const createCursorFollower = () => {
const $el = document.querySelector('.cursor-follower');
// Each time the mouse coordinates are updated,
// we need to pass the values to gsap in order
// to animate the element
window.addEventListener('mousemove', (e) => {
  const { target, x, y } = e;
  // Check if target is inside a link or button
  const isTargetLinkOrBtn = target?.closest('a') || target?.closest('button');
 


  // GSAP config
  gsap.to($el, {
    x: x + 3,
    y: y + 3,
    duration: 0.7,
    ease: 'power4', // More easing options here: https://gsap.com/docs/v3/Eases/
    opacity: isTargetLinkOrBtn ? 0.6 : 1,
    transform: `scale(${isTargetLinkOrBtn ? 3 : 1})`,
  });
});
// Hidding the cursor element when the mouse cursor
// is moved out of the page
document.addEventListener('mouseleave', (e) => {
  gsap.to($el, {
    duration: 0.7,
    opacity: 0,
  });
});
};

// Only invoke the function if isn't a touch device
if (!isTouchDevice) {
createCursorFollower();
}
