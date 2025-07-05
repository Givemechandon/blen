// SLIDESHOW
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function showSlide(index) {
  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  slides.forEach((slide) => (slide.style.display = "none"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[slideIndex].style.display = "block";
  dots[slideIndex].classList.add("active");
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    slideIndex = i;
    showSlide(slideIndex);
    resetInterval();
  });
});

let slideInterval = setInterval(nextSlide, 6000);

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 6000);
}

showSlide(slideIndex);

// Animação suave ao rolar a página
window.addEventListener("scroll", () => {
  const scrollElements = document.querySelectorAll(
    ".card, .depoimento-card, .sobre, .servicos, .depoimentos, .contato"
  );
  scrollElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "all 0.8s ease-out";
    } else {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
    }
  });
});


document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://api.sheetmonkey.io/form/3UVumqdnc8ANzRV8Yf9wdn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      if (!response.ok) throw new Error("Erro no envio");

      form.reset(); // Limpa o formulário
      mostrarModal(); // Mostra o modal
    } catch (erro) {
      alert("Erro ao enviar o formulário.");
      console.error(erro);
    }
  });

  function mostrarModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    modal.classList.add("show");

    // Fechar automaticamente depois de 4 segundos
    setTimeout(() => {
      modal.classList.remove("show");
      modal.classList.add("hidden");
    }, 5000);
  }

  // Botão fechar manual
  document.querySelector(".close-btn").addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.classList.remove("show");
    modal.classList.add("hidden");
  });