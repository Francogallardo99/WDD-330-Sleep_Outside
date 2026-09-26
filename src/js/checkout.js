import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { alertMessage } from "./utils.mjs";

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
    event.preventDefault();
    const valid = checkoutForm.checkValidity()
    if (valid == true) {
            await checkout.checkout(checkoutForm);
    }
    else {
        checkoutForm.reportValidity()
    }
}); 

loadHeaderFooter();