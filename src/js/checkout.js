import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", "#orderItems");

checkout.init();

const zipInput = document.querySelector("[name='zip']");
zipInput.addEventListener("input", () => {
    const zip = zipInput.value;
    if (zip.length === 5) {
        checkout.calculateOrderTotal();
    }
});

const checkoutForm = document.querySelector(".form");

checkoutForm.addEventListener("submit", async (event) => {
    try {
        event.preventDefault();
        await checkout.checkout(checkoutForm);
        localStorage.setItem("so-cart", "[]");
        window.location.href = "success.html";
    } catch (error) {
        alert(`Error during checkout: ${error.message}`);    }
});

loadHeaderFooter();