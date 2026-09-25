import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        this.list.forEach((item) => {
            this.itemTotal += item.FinalPrice;
        });
        const itemTotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
        itemTotalElement.innerText = `Subtotal: $${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        this.shipping = (this.list.length * 2) + 8;
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.shipping + this.tax + this.itemTotal;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        tax.innerText = `Tax: $${this.tax.toFixed(2)}`;

        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        shipping.innerText = `Shipping: $${this.shipping.toFixed(2)}`;

        const orderTotalElement = document.querySelector(`${this.outputSelector} #orderTotal`);
        orderTotalElement.innerText = `Order Total: $${this.orderTotal.toFixed(2)}`;
    }

    packageItems(items) {
        const packageitem = items.map((item) => {
            return {
                id: item.Id,
                name: item.Name,
                price: item.FinalPrice,
                quantity: 1
            }
        });
        return packageitem;
    }
    async checkout(formElement) {
        const formData = formDataToJSON(formElement);

        formData.orderTotal = this.orderTotal;
        formData.shipping = this.shipping;
        formData.tax = this.tax;
    
        formData.orderDate = new Date().toISOString();
        formData.items = this.packageItems(this.list);

        const response = await services.checkout(formData);
    }
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}