document.addEventListener('DOMContentLoaded', () => {

  const screens = {
    menu: document.getElementById('menu-screen'),
    main: document.getElementById('main-interface')
  };

  const btns = {
    start: document.getElementById('start-btn'),
    explore: document.getElementById('explore-btn'),
    random: document.getElementById('random-btn'),
    menu: document.getElementById('menu-btn')
  };

  const slider = document.getElementById('slider');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  let index = 0;
  let enlargedSlide = null;

  // --- Screen navigation ---
  btns.start.onclick = btns.explore.onclick = () => {
    screens.menu.classList.remove('active');
    screens.main.classList.add('active');
    index = 0; enlargedSlide = null; updateSlider();
  };

  btns.random.onclick = () => {
    screens.menu.classList.remove('active');
    screens.main.classList.add('active');
    index = Math.floor(Math.random() * slides.length);
    enlargedSlide = null;
    updateSlider();
  };

  btns.menu.onclick = () => {
    screens.main.classList.remove('active');
    screens.menu.classList.add('active');
  };

  // --- Update slider ---
  function updateSlider() {
    const slidesInView = window.innerWidth <= 768 ? 1 : 3;
    slides.forEach(s => s.classList.remove('active-slide', 'shrink-slide'));

    if (enlargedSlide) {
      enlargedSlide.classList.add('active-slide');
      slides.forEach(s => { if (s !== enlargedSlide) s.classList.add('shrink-slide'); });

      const sliderRect = slider.getBoundingClientRect();
      const slideRect = enlargedSlide.getBoundingClientRect();
      let offset = slideRect.left - sliderRect.left - (sliderRect.width - slideRect.width) / 2;

      const maxOffset = slider.scrollWidth - sliderRect.width;
      if (offset < 0) offset = 0;
      if (offset > maxOffset) offset = maxOffset;

      slider.style.transition = 'transform 0.8s ease';
      slider.style.transform = `translateX(-${offset}px)`;

      nextBtn.style.display = 'none';
      prevBtn.style.display = 'none';
    } else {
      slides.forEach(s => s.style.flex = `0 0 calc((100% - ${(slidesInView - 1) * 20}px)/${slidesInView})`);
      const slideWidth = slides[0].offsetWidth + 20;
      slider.style.transition = "transform 0.5s ease";
      slider.style.transform = `translateX(-${index * slideWidth}px)`;

      nextBtn.style.display = (index >= slides.length - slidesInView) ? 'none' : 'block';
      prevBtn.style.display = (index === 0) ? 'none' : 'block';
    }
  }

  // --- Slide click ---
  slides.forEach(slide => {
    slide.onclick = e => {
      e.stopPropagation();
      enlargedSlide = (enlargedSlide === slide) ? null : slide;
      updateSlider();
    };
  });

  // --- Click outside ---
  document.addEventListener('click', e => {
    if (enlargedSlide && !e.target.classList.contains('slide')) {
      enlargedSlide = null;
      updateSlider();
    }
  });

  // --- Navigation buttons ---
  nextBtn.onclick = () => {
    const slidesInView = window.innerWidth <= 768 ? 1 : 3;
    if (index < slides.length - slidesInView) index++;
    updateSlider();
  };

  prevBtn.onclick = () => {
    if (index > 0) index--;
    updateSlider();
  };

  // --- Floating sparkles ---
  const menuScreen = document.getElementById('menu-screen');
  for (let i=0; i<30; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random()*100+'vw';
    sparkle.style.top = Math.random()*100+'vh';
    sparkle.style.animationDuration = 5+Math.random()*5+'s';
    menuScreen.appendChild(sparkle);
  }

  // --- Floating golden circles ---
  for (let i=0; i<20; i++) {
    const circle = document.createElement('div');
    circle.classList.add('floating-circle');
    circle.style.left = Math.random()*100+'vw';
    circle.style.top = Math.random()*100+'vh';
    circle.style.animationDuration = 8+Math.random()*7+'s';
    menuScreen.appendChild(circle);
  }

  window.addEventListener('resize', updateSlider);
  updateSlider();
});
