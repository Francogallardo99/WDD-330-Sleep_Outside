import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const myshoppingCart = new ShoppingCart("so-cart", ".product-list");

loadHeaderFooter();
myshoppingCart.start();