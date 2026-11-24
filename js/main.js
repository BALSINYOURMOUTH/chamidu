import { CONTACT, createWhatsAppUrl } from "./whatsapp.js";

const orderMessages = {
  delivery: "Hello! I would like to ask about delivery around Kahawatha, Godakawela, or Palmadulla. My area/address is: ",
  pickup: "Hello! I would like to ask about placing an order for pickup."
};

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const message = orderMessages[link.dataset.orderOption] ?? "Hello! I would like to contact SP නිෂ්පාදන.";
  link.href = createWhatsAppUrl(message);
});

document.querySelectorAll("[data-phone-link]").forEach((link) => {
  const index = Number(link.dataset.phoneIndex);
  const phone = CONTACT.phones[index];
  if (!phone) return;
  link.href = `tel:+${phone}`;
  if (link.hasAttribute("data-phone-display")) {
    link.textContent = `0${phone.slice(2)}`;
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

const heroImage = document.querySelector("#heroImage");
function showHeroFallback() {
  heroImage.hidden = true;
  heroImage.parentElement.classList.remove("image-loaded");
  heroImage.parentElement.classList.add("image-missing");
}

function showHeroImage() {
  heroImage.parentElement.classList.add("image-loaded");
}

heroImage.addEventListener("error", showHeroFallback, { once: true });
heroImage.addEventListener("load", showHeroImage, { once: true });
if (heroImage.complete) {
  if (heroImage.naturalWidth > 0) showHeroImage();
  else showHeroFallback();
}
