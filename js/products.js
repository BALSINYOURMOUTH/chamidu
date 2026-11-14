import { createProductMessage, createWhatsAppUrl } from "./whatsapp.js";

const productGrid = document.querySelector("#productGrid");
const productStatus = document.querySelector("#productStatus");

function isProduct(product) {
  return product
    && Number.isInteger(product.id)
    && typeof product.name === "string"
    && typeof product.englishName === "string"
    && Number.isFinite(product.price)
    && typeof product.unit === "string"
    && typeof product.image === "string";
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product";

  const art = document.createElement("div");
  art.className = "product-art";

  const fallback = document.createElement("span");
  fallback.className = "product-fallback";
  fallback.setAttribute("aria-hidden", "true");
  fallback.textContent = product.englishName.charAt(0).toUpperCase();
  art.append(fallback);

  const image = document.createElement("img");
  image.className = "product-photo";
  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    image.hidden = true;
    art.classList.add("image-missing");
  }, { once: true });
  art.append(image);

  const body = document.createElement("div");
  body.className = "product-body";

  const title = document.createElement("h3");
  title.className = "product-title";
  title.textContent = product.name;

  const englishName = document.createElement("div");
  englishName.className = "product-english";
  englishName.textContent = product.englishName;

  const meta = document.createElement("div");
  meta.className = "product-meta";

  const priceBlock = document.createElement("div");
  const price = document.createElement("div");
  price.className = "price";
  price.textContent = `Rs. ${Number(product.price).toLocaleString("en-LK")}`;
  const unit = document.createElement("div");
  unit.className = "unit";
  unit.textContent = product.unit === "piece" ? "per piece" : product.unit;
  priceBlock.append(price, unit);

  const orderLink = document.createElement("a");
  orderLink.className = "order-link";
  orderLink.href = createWhatsAppUrl(createProductMessage(product));
  orderLink.target = "_blank";
  orderLink.rel = "noopener noreferrer";
  orderLink.textContent = "Order on WhatsApp ↗";

  meta.append(priceBlock, orderLink);
  body.append(title, englishName, meta);
  card.append(art, body);
  return card;
}

async function loadProducts() {
  productGrid.setAttribute("aria-busy", "true");
  productStatus.textContent = "Loading products…";
  try {
    const response = await fetch("./data/products.json");
    if (!response.ok) throw new Error(`Product list request failed (${response.status}).`);

    const products = await response.json();
    if (!Array.isArray(products) || !products.every(isProduct)) {
      throw new Error("The product list has an invalid format.");
    }

    productGrid.replaceChildren(...products.map(createProductCard));
    productStatus.textContent = products.length ? "" : "Products are not available right now.";
  } catch (error) {
    productStatus.classList.add("error");
    productStatus.textContent = "We couldn’t load the product list. Please try again later or contact us on WhatsApp.";
    console.error("Unable to load products:", error);
  } finally {
    productGrid.setAttribute("aria-busy", "false");
  }
}

loadProducts();
