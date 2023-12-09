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

//Manipulação do carrinho de produtos
const productsArray = [];

function increaseQuantity(event) {
  const quatityElement =
    event.target.parentElement.querySelector(".number-quantity");
  const quantity = parseInt(quatityElement.textContent); //valor dentro do .number-quantity e convertendo p int
  quatityElement.textContent = quantity + 1;
}

function decreaseQuantity(event) {
  const quatityElement =
    event.target.parentElement.querySelector(".number-quantity");
  const quantity = parseInt(quatityElement.textContent);

  if (quantity > 0) {
    quatityElement.textContent = quantity - 1;
  }
}

function updateCards() {
  const cart = document.querySelector(".item-cart");
  cart.textContent = productsArray.length;
}

function addProductTocart(event) {
  const productCard = event.target.closest(".card-new-products"); //antecesor mais perto onde está o click
  const productName = productCard.querySelector(".info-product h3").textContent;
  const priceText = productCard.querySelector(".new-price").textContent;
  const price = parseFloat(priceText.replace("R$", ""));

  const quantityElement = productCard.querySelector(".number-quantity");

  let quantity = parseInt(quantityElement.textContent);

  const existingProductIndex = productsArray.findIndex(
    (product) => product.productName === productName
  );

  if (quantity > 0) {
    if (existingProductIndex !== -1) {
      productsArray[existingProductIndex].quantity - quantity;
    } else {
      productsArray.push({
        productName: productName,
        price: price,
        quantity: quantity,
      });
    }
  } else {
    if (existingProductIndex !== -1) {
      productsArray.splice(existingProductIndex, 1);
    }
  }
  updateCards();
}

const increaseButtons = document.querySelectorAll(".increase-quantity");
const decreaseButtons = document.querySelectorAll(".decrease-quantity");
const addCardButtons = document.querySelectorAll(".confirm-add-cart");

increaseButtons.forEach((button) => {
  button.addEventListener("click", increaseQuantity);
});

decreaseButtons.forEach((button) => {
  button.addEventListener("click", decreaseQuantity);
});

addCardButtons.forEach((button) => {
  button.addEventListener("click", addProductTocart);
});
