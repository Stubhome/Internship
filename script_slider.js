document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('[data-slider="itc-slider"]');
  const items = slider.querySelector('.itc-slider__items');
  const slides = slider.querySelectorAll('.itc-slider__item');
  const prevBtn = slider.querySelector('.itc-slider__btn_prev');
  const nextBtn = slider.querySelector('.itc-slider__btn_next');
  const dotsContainer = slider.querySelector('.itc-slider__dots');
  let currentSlide = 0;
  let isAnimating = false;

  // Создание точек
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('itc-slider__dot');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.itc-slider__dot');

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function goToSlide(index, direction = 1) {
    if (isAnimating) return;
    isAnimating = true;

    const totalSlides = slides.length;
    const targetIndex = (index + totalSlides) % totalSlides;

    const startOffset = -currentSlide * 100;
    let endOffset = -targetIndex * 100;

    // Обработка анимации при переходе с последнего слайда на первый и наоборот
    if (direction === 1 && currentSlide === totalSlides - 1 && targetIndex === 0) {
      endOffset = -totalSlides * 100;
    } else if (direction === -1 && currentSlide === 0 && targetIndex === totalSlides - 1) {
      endOffset = 100;
    }

    const totalSteps = 50;
    let currentStep = 0;

    items.style.transform = `translateX(${startOffset}%)`;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;

      const currentTranslateX = startOffset + (endOffset - startOffset) * progress;
      items.style.transform = `translateX(${currentTranslateX}%)`;

      if (currentStep >= totalSteps) {
        clearInterval(interval);

        // Если был переход с последнего на первый или с первого на последний,
        // мгновенно перенести слайды на корректную позицию без анимации
        if (direction === 1 && currentSlide === totalSlides - 1 && targetIndex === 0) {
          items.style.transform = `translateX(0%)`;
        } else if (direction === -1 && currentSlide === 0 && targetIndex === totalSlides - 1) {
          items.style.transform = `translateX(${-(totalSlides - 1) * 100}%)`;
        }

        currentSlide = targetIndex;
        updateDots();
        isAnimating = false;
      }
    }, 10);
  }

  prevBtn.addEventListener('click', () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(newIndex, -1);
  });

  nextBtn.addEventListener('click', () => {
    const newIndex = (currentSlide + 1) % slides.length;
    goToSlide(newIndex, 1);
  });

  updateDots();
});
