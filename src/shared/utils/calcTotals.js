// حساب السعر النهائي

const calculateOrderTotal = ({ items, discount = 0, tax = 0 }) => {
  if (!items || items.length === 0) {
    throw new Error("Items are required");
  }

  const subtotal = items.reduce((sum, item) => {
    return sum + item.priceSnapshot * item.quantity;
  }, 0);

  const total = subtotal - discount + tax;

  return {
    subtotal,
    discount,
    tax,
    total,
  };
};

export { calculateOrderTotal };
