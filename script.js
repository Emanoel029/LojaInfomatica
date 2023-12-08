//O DOMContentLoaded é disparado assim que o site carrega (menu sanduiche)
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
  const menu = document.querySelector(".menu");

  //escutando o evento o click no menu
  mobileMenuIcon.addEventListener("click", () => {
    menu.classList.toggle("mobile-menu-open"); //a clss menu vai assumir as propriedade da class mobile-menu-open
  });
});

//Filtro de produtos
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".products-code-start");

  sections.forEach((section) => {
    const menuItems = section.querySelectorAll(".product-filter-brands ul li");
    const productCards = section.querySelectorAll(".card-new-products");

    const state = {
      activeBrand: "todos",
      activeType: "todos",
    };

    function updateCards() {
      productCards.forEach((card) => {
        const brand = card.getAttribute("data-brand");
        const type = card.getAttribute("data-products-type");

        if (
          (state.activeBrand === "todos" || state.activeBrand === brand) &&
          (state.activeType === "todos" || state.activeType === type)
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }

    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuItems.forEach((menuItem) => {
          menuItem.classList.remove("product-brand-active");
        });

        item.classList.add("product-brand-active");

        state.activeBrand = item.getAttribute("data-brand");
        state.activeType = item.getAttribute("data-products-type");

        updateCards();
      });
    });
    updateCards();
  });
});

//Siled de patrocinadores (montado no video 2 (54:00))

window.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider-sponsors");
  const images = slider.querySelectorAll("img");

  images.forEach((image) => {
    const clone = image.cloneNode(true);
    slider.appendChild(clone);
  });

  const totalWidth = images.length * (images[0].offsetWidth + 20);

  slider.style.width = `${totalWidth}px`;

  let currentPosition = 0;

  const moveSlider = () => {
    currentPosition -= 1;
    if (currentPosition <= -totalWidth / 2) {
      currentPosition = 0;
    }

    slider.style.transform = `translateX(${currentPosition}px)`;
    requestAnimationFrame(moveSlider);
  };

  requestAnimationFrame(moveSlider);
});

//Slider Depoimentos
window.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial");
  const controls = document.querySelectorAll(".controls-testimonial span");
  const firstTestimonial = testimonials[0];
  const firstControl = controls[0];

  testimonials.forEach((testimonial) => (testimonial.style.display = "none"));
  firstTestimonial.style.display = "block";

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      const targetSlide = control.getAttribute("data-slide");
      controls.forEach((c) => c.classList.remove("active-testimonial"));
      control.classList.add("active-testimonial");

      testimonials.forEach(
        (testimonial) => (testimonial.style.display = "none")
      );

      const testimonialShow = document.querySelector(
        `.testimonial[data-slide="${targetSlide}"]`
      );

      testimonialShow.style.display = "block";
    });
  });
  firstControl.classList.add("active-testimonial");
});
