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
  if (slider) {
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
  }
});

//Slider Depoimentos
window.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial");
  if (testimonials.length > 0) {
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
  }
});

//Manipulação do carrinho de produtos
const productsArray = [];
const neighborhoodShipment = [
  {
    neighborhood: "Centro",
    shipment: 100,
  },
  {
    neighborhood: "Joaquim Tavora",
    shipment: 100,
  },
  {
    neighborhood: "Papicu",
    shipment: 180,
  },
  {
    neighborhood: "Montese",
    shipment: 150,
  },
];

let dataCartIsEmpty = true;

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
//updateCards
function updateCart(quantityProducts) {
  const cart = document.querySelector(".item-cart");
  cart.textContent = quantityProducts;
}

function addProductTocart(event) {
  const productCard = event.target.closest(".card-new-products"); //antecesor mais perto onde está o click
  const productName = productCard.querySelector(".info-product h3").textContent;
  const priceText = productCard.querySelector(".new-price").textContent;
  const productimg = productCard.querySelector(".img-product");
  const srcProduct = productimg.getAttribute("src");
  const price = parseFloat(priceText.replace("R$", ""));

  const quantityElement = productCard.querySelector(".number-quantity");

  let quantity = parseInt(quantityElement.textContent);

  const existingProductIndex = productsArray.findIndex(
    (product) => product.productName === productName
  );

  if (quantity > 0) {
    if (existingProductIndex !== -1) {
      productsArray[existingProductIndex].quantity = quantity;
    } else {
      productsArray.push({
        productName: productName,
        price: price,
        productimg: srcProduct,
        quantity: quantity,
      });
    }
  } else {
    if (existingProductIndex !== -1) {
      productsArray.splice(existingProductIndex, 1);
    }
  }

  localStorage.setItem("productsArray", JSON.stringify(productsArray));

  updateCart(productsArray ? productsArray.length : 0);
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

// PG carrinho de compra

const inputCep = document.querySelector("#cep");
const inputStreet = document.querySelector("#street");
const inputCity = document.querySelector("#city");
const inputState = document.querySelector("#state");
const inputNeighborhood = document.querySelector("#neighborhood");
const inputNumber = document.querySelector("#number");
const savedProductsArray = JSON.parse(localStorage.getItem("productsArray"));
//faz o valor total do pedido no acumulador
const totalOrder = savedProductsArray
  ? savedProductsArray.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.quantity * currentProduct.price;
    }, 0)
  : 0;

const subtotal = document.querySelector("#subtotal-value");
const shipmentInput = document.querySelector("#shipment-value");
const totalOrderField = document.querySelector("#total-order-value");

window.addEventListener("DOMContentLoaded", function () {
  updateCart(
    //Add cupom

    savedProductsArray ? savedProductsArray.length : 0
  );
});

function searchCEP() {
  //trim() remove espaço do início e do final
  const typedCep = inputCep.value.trim().replace(/\D/g, "");

  //Macha a api com o cep que foi digitado pelo usuário
  fetch(`https://viacep.com.br/ws/${typedCep}/json/`)
    .then((response) => {
      if (!response.ok) {
        console.erro("Não foi possível obter os dados do CEP");
      }
      return response.json();
    })
    .then((data) => {
      inputCity.value = data.localidade;
      inputState.value = data.uf;
      if (data.bairro) {
        inputNeighborhood.value = data.bairro;
        let changeEvent = new Event("change", { bubbles: true });
        inputNeighborhood.dispatchEvent(changeEvent);
      }

      inputStreet.value = data.logradouro;
    })
    .catch((erro) => {
      console.erro("Erro:", erro);
    });
}
//

window.addEventListener("DOMContentLoaded", function () {
  const tbody = document.querySelector(".info-product-order tbody");

  if (tbody && savedProductsArray) {
    for (const product of savedProductsArray) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.innerHTML = `<div class="product-cart">
        <img src="${product.productimg}" alt="${product.productName}" width="100px"/>
        ${product.productName}
      </div>`;

      const priceCell = document.createElement("td");
      priceCell.textContent = `R$ ${product.price.toFixed(2)}`;

      const quantityCell = document.createElement("td");
      quantityCell.textContent = product.quantity;

      const subtotalCell = document.createElement("td");
      const subtotal = product.price * product.quantity;
      subtotalCell.textContent = `R$${subtotal.toFixed(2)}`;

      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(quantityCell);
      row.appendChild(subtotalCell);
      tbody.appendChild(row);
    }
  }
});

//texto que vai ser enviado por wpp

function finishOrder() {
  const fullName = document.querySelector("#fullName").value;
  const rg = document.querySelector("#rg").value;
  const cpf = document.querySelector("#cpf").value;

  const cep = inputCep.value;
  const street = inputStreet.value;
  const city = inputCity.value;
  const state = inputState.value;
  const neighborhood = inputNeighborhood.value;
  const number = inputNumber.value;

  let textFormatted = `Olá, gostaria de fazer um pedido para a loja.
  Meus dados são:
  Nome: ${fullName}
  RG: ${rg}
  CPF: ${cpf}
  Endereço: Rua: ${street}, cidade: ${city}, Estado: ${state}, Bairro: ${neighborhood},
  Numero/complemento: ${number}, CEP: ${cep}
  Os produtos que eu escolhi são:`;

  savedProductsArray.forEach((product) => {
    textFormatted += `
    Nome do produto: ${product.productName},
    Preço: R$ ${product.price},
    Quantidade: ${product.quantity}`;
  });

  textFormatted += `
  Total do pedido: R$ ${totalOrder}`;

  const textEncoded = encodeURIComponent(textFormatted);
  window.open(`https://wa.me/5585996494013?text=${textEncoded}`);
}

// limpa o carrinho
function clearCart() {
  localStorage.removeItem("productsArray");
  inputCep.value = "";
  inputStreet.value = "";
  inputCity.value = "";
  inputState.value = "";
  inputNeighborhood.value = "";
  inputNumber.value = "";
  dataCartIsEmpty = true;
  location.reload();
}

function updateInfosOrder(discount) {
  if (subtotal) {
    subtotal.textContent = totalOrder - discount;
  }
  if (
    shipmentInput &&
    totalOrderField &&
    savedProductsArray.length > 0 &&
    inputNeighborhood.value !== ""
  ) {
    const foundedNeighborhood = neighborhoodShipment.find(
      (info) => info.neighborhood === inputNeighborhood.value
    );

    const shipmentValue = foundedNeighborhood
      ? foundedNeighborhood.shipment
      : 150;
    shipmentInput.textContent = shipmentValue;

    totalOrderField.textContent =
      Number(subtotal.textContent) + Number(shipmentValue);
  }
}

if (inputNeighborhood) {
  inputNeighborhood.addEventListener("change", function () {
    dataCartIsEmpty = false;
    updateInfosOrder(0);
    updateButtonSendOrder();
  });
}
//Add cupom

const availabelCupons = [
  {
    value: "FREE10",
    discount: 10,
  },
  {
    value: "FREE20",
    discount: 20,
  },
];

function addCupom() {
  const inputCoupon = document.querySelector("#discount");
  const validCoupon = availabelCupons.find(
    (cupom) => cupom.value === inputCoupon.value
  );
  const textCoupon = document.querySelector(".cupom-added span");
  const errorCoupon = document.querySelector(".cupom-erro");
  errorCoupon.style.display = "none";

  if (validCoupon) {
    textCoupon.textContent = validCoupon.value;
    updateInfosOrder(validCoupon.discount);
  } else {
    errorCoupon.style.display = "block";
  }
}

function updateButtonSendOrder() {
  const input = document.querySelector("#send-order");
  if (input && !dataCartIsEmpty) {
    input.classList.remove("disabled-send-order");
  } else {
    input.classList.add("disabled-send-order");
  }
}

//Scroll da tela

function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);

  if (section) {
    let scrollOffset = 0;
    //isso faz com q fica no meio da tela
    scrollOffset =
      section.offsetTop - (window.innerHeight - section.clientHeight) / 2;

    window.scrollTo({
      top: scrollOffset,
      behavior: "smooth", //para ser suave
    });
  }
}

//Para percorrer cada link
window.addEventListener("DOMContentLoaded", function () {
  const links = this.document.querySelectorAll("nav a");

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = link.getAttribute("href");
      scrollToSection(sectionId);
    });
  });
});
