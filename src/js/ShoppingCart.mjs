import { getLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.elementEstante = document.querySelector(parentSelector);
  }

  start() {
    const cardItems = getLocalStorage(this.key);
    this.renderizarLista(cardItems);
    this.addRemoveItemListeners(cardItems);
  }

  renderizarLista(list) {
    const htmlItems = list.map((item) => cartItemTemplate(item));
    this.elementEstante.innerHTML = htmlItems.join("");
  }
  addRemoveItemListeners(list) {
    const removeButtons = this.elementEstante.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemId = e.target.getAttribute("data-id");
        const cartItems = getLocalStorage(this.key);
        const updatedCartItems = cartItems.filter((item) => item.Id !== itemId);
        localStorage.setItem(this.key, JSON.stringify(updatedCartItems));
        this.start();
      });
    });
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <span class="remove-item" data-id="${item.Id}">X</span>
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;


  return newItem;
}