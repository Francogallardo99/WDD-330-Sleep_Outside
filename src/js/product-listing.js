import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, loadHeaderFooter, getParam } from "./utils.mjs";

const actualCategory = getParam("category");

const dataSource = new ExternalServices();

const listElement = document.querySelector(".product-list");

const productTitle = document.querySelector("h2");
productTitle.textContent = "Top Products: " + actualCategory.charAt(0).toUpperCase() + actualCategory.slice(1);

const productList = new ProductList(actualCategory, dataSource, listElement);

productList.init();
updateCartCount();
loadHeaderFooter();