import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, loadHeaderFooter, getParam } from "./utils.mjs";

const actualCategory = getParam("category");

const dataSource = new ProductData(actualCategory);

const listElement = document.querySelector(".product-list");

const productTitle = document.querySelector("h2");
productTitle.textContent = "Top Products: " + actualCategory;

const productList = new ProductList(actualCategory, dataSource, listElement);

productList.init();
updateCartCount();
loadHeaderFooter();