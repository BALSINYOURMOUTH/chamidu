export const CONTACT = Object.freeze({
  whatsapp: "94741722573",
  phones: ["94741572093", "94741722573"]
});

export function createWhatsAppUrl(message) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function createProductMessage(product, { quantity, receivingMethod }) {
  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    throw new RangeError("Order quantity must be a positive whole number.");
  }
  if (!["delivery", "pickup"].includes(receivingMethod)) {
    throw new TypeError("Choose delivery or pickup for the order.");
  }

  const unit = product.unit === "piece" ? "piece" : product.unit;
  const method = receivingMethod === "delivery" ? "Delivery" : "Pickup";
  return [
    "Hello! I would like to order:",
    "",
    `Product: ${product.name}`,
    `Price: Rs. ${Number(product.price).toLocaleString("en-LK")} per ${unit}`,
    `Quantity: ${quantity}`,
    "",
    `Receiving method: ${method}`,
    receivingMethod === "delivery"
      ? "I will share my delivery address in this WhatsApp chat."
      : "Please confirm the pickup location and available time.",
    "",
    "Thank you!"
  ].join("\n");
}
