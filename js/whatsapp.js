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
  const total = product.price * quantity;
  if (!Number.isFinite(total)) {
    throw new RangeError("Order total must be a finite amount.");
  }
  return [
    "Hello! I would like to place an order.",
    "",
    `Product: ${product.name}`,
    `Price: Rs. ${Number(product.price).toLocaleString("en-LK")} per ${unit}`,
    `Quantity: ${quantity}`,
    `Total: Rs. ${total.toLocaleString("en-LK")}`,
    "",
    `Receiving method: ${method}`,
    receivingMethod === "delivery"
      ? "Delivery is available around Kahawatha, Godakawela, and Palmadulla only.\nArea: ___________\n\nPlease confirm availability and delivery charges, if any."
      : "Please confirm availability and pickup details.",
    "",
    "Thank you!"
  ].join("\n");
}
