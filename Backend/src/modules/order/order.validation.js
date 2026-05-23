import { body, param, query } from "express-validator";

export const createOrderValidation = () => [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Order must have at least one item"),

  body("items.*.productId")
    .notEmpty()
    .withMessage("Product ID is required for each item")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("items.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required for each item")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["cash", "card", "wallet"])
    .withMessage("Payment method must be cash, card, or wallet"),

  body("orderType")
    .optional()
    .isIn(["dine-in", "takeaway", "delivery"])
    .withMessage("Order type must be dine-in, takeaway, or delivery"),

  body("tableNumber")
    .if(body("orderType").equals("dine-in"))
    .notEmpty()
    .withMessage("Table number is required for dine-in orders")
    .isInt({ min: 1 })
    .withMessage("Table number must be a positive integer"),

  body("deliveryAddress")
    .if(body("orderType").equals("delivery"))
    .notEmpty()
    .withMessage("Delivery address is required for delivery orders"),

  body("phone")
    .if(body("orderType").equals("delivery"))
    .notEmpty()
    .withMessage("Phone is required for delivery orders")
    .matches(/^01[0125][0-9]{8}$/)
    .withMessage("Invalid Egyptian phone number"),

  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be a non-negative number"),

  body("tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax must be a non-negative number"),
];

export const getOrderByIdValidation = () => [
  param("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID"),
];

export const updateOrderStatusValidation = () => [
  param("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "preparing", "completed", "cancelled"])
    .withMessage("Status must be pending, preparing, completed, or cancelled"),
];

export const refundOrderValidation = () => [
  param("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid order ID"),
];

export const orderFilterValidation = () => [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];
