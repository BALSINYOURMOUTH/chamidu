import { CONTACT, createWhatsAppUrl } from "./whatsapp.js";

const orderMessages = {
  delivery: "Hello! I would like to ask about delivery around Kahawatha, Godakawela, or Palmadulla. My area/address is: ",
  pickup: "Hello! I would like to ask about placing an order for pickup."
};

document.querySelectorAll("[data-order-option]").forEach((link) => {
  link.href = createWhatsAppUrl(orderMessages[link.dataset.orderOption]);
});

document.querySelectorAll("[data-phone-link]").forEach((link, index) => {
  const phone = CONTACT.phones[index];
  if (phone) link.href = `tel:+${phone}`;
});

document.querySelector("#year").textContent = new Date().getFullYear();

const heroImage = document.querySelector("#heroImage");
heroImage.addEventListener("error", () => {
  heroImage.hidden = true;
  heroImage.parentElement.classList.add("image-missing");
}, { once: true });
