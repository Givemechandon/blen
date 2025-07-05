document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  let currentIndex = 0;

  const updateSlidePosition = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  };

  const moveToNextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  };

  const moveToPrevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  };

  nextButton.addEventListener('click', moveToNextSlide);
  prevButton.addEventListener('click', moveToPrevSlide);

  // Auto-slide a cada 3 segundos
  setInterval(moveToNextSlide, 5000);

  // Reajusta ao redimensionar
  window.addEventListener('resize', updateSlidePosition);

  // Ajusta posição inicial
  updateSlidePosition();
});
