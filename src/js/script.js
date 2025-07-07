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
    ".card, .depoimento-card, .sobre, .bloco-horizontal, .servicos, .depoimentos, .contato, .portfolio, .carousel-slide, .project-info , .estatisticas, .item-est, .fale-conosco-section, .formulario, .modal-confirm, .modal-content, .btn-fechar-modal"
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

const form = document.getElementById('formFaleConosco');
  const modal = document.getElementById('modalConfirm');
  const btnFecharModal = document.getElementById('btnFecharModal');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Criar objeto com dados do formulário
    const formData = {
      nome: form.nome.value.trim(),
      email: form.email.value.trim(),
      telefone: form.telefone.value.trim(),
      mensagem: form.mensagem.value.trim(),
    };

    // Validação básica (já que tem required no HTML, só para garantir)
    if (!formData.nome || !formData.email) {
      alert('Por favor, preencha os campos obrigatórios: nome e e-mail.');
      return;
    }

    try {
      // Enviar dados para a API do Sheet Monkey via POST
      const response = await fetch('https://api.sheetmonkey.io/form/3UVumqdnc8ANzRV8Yf9wdn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário. Tente novamente mais tarde.');
      }

      // Resetar formulário após sucesso
      form.reset();

      // Mostrar modal de confirmação
      modal.classList.remove('hidden');
    } catch (error) {
      alert(error.message);
    }
  });

  // Fechar modal ao clicar no botão
  btnFecharModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Opcional: fechar modal clicando fora da caixa
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });