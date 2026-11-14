export const CONTACT = Object.freeze({
  whatsapp: "94741722573",
  phones: ["94741572093", "94741722573"]
});

export function createWhatsAppUrl(message) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function createProductMessage(product) {
  const unit = product.unit === "piece" ? "piece" : product.unit;
  return [
    "Hello! I would like to order:",
    "",
    `Product: ${product.name}`,
    `Price: Rs. ${Number(product.price).toLocaleString("en-LK")} per ${unit}`,
    "Quantity:",
    "",
    "Receiving method: Delivery / Pickup",
    "",
    "Thank you!"
  ].join("\n");
}
