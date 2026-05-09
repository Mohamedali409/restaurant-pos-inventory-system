//createOrder;
//findOrders;
// findOrderById;
// updateOrder;
// deleteOrder;
// change status

import Order from "./order.model.js";

const createOrder = (orderData) => {
  return Order.create(orderData);
};

const findOrders = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments();

  return { orders, total };
};

const findOrderById = (orderId) => {
  return Order.findById(orderId)
    .populate("cashierId")
    .populate("items.productId");
};

const updateOrder = (orderId, data) => {
  return Order.findByIdAndUpdate(orderId, data, {
    new: true,
    runValidators: true,
  });
};

const deleteOrder = (orderId) => {
  return Order.findByIdAndDelete(orderId);
};

const findOrdersByStatus = (status) => {
  return Order.find({ status });
};

const findOrdersByDate = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return Order.find({ createdAt: { $gte: start, $lte: end } });
};

const findTodayOrders = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return Order.find({ createdAt: { $gte: start, $lte: end } });
};

const findOrdersByCashier = (cashierId) => {
  return Order.find({ cashierId });
};

const updateOrderStatus = (orderId, status) => {
  return Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true },
  );
};

const completeOrder = (id) => updateOrderStatus(id, "completed");

const cancelOrder = (id) => updateOrderStatus(id, "cancelled");

const countOrders = () => Order.countDocuments();

const countOrdersByStatus = (status) => Order.countDocuments({ status });

const sumSales = async () => {
  const result = await Order.aggregate([
    { $match: { status: "completed" } },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$total" },
      },
    },
  ]);

  return result[0]?.totalSales || 0;
};

const topSellingProducts = async () => {
  return Order.aggregate([
    { $match: { status: "completed" } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productId",
        totalQuantity: { $sum: "$items.quantity" },
        totalRevenue: { $sum: "$items.subtotal" },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 10 },
  ]);
};

const findByTableNumber = (tableNumber) => {
  return Order.find({
    tableNumber,
    orderType: "dine-in",
  });
};

const findOrdersByType = (type) => {
  return Order.find({ orderType: type });
};

const findDeliveryOrders = () => findOrdersByType("delivery");
const findTakeawayOrders = () => findOrdersByType("takeaway");
const findDineInOrders = () => findOrdersByType("dine-in");

const findOrdersBySearch = (term) => {
  return Order.find({
    $or: [
      { orderNumber: { $regex: term, $options: "i" } },
      { customerName: { $regex: term, $options: "i" } },
    ],
  });
};

export {
  createOrder,
  findOrders,
  findOrderById,
  updateOrder,
  deleteOrder,
  findOrdersByStatus,
  findOrdersByDate,
  findTodayOrders,
  findOrdersByCashier,
  updateOrderStatus,
  completeOrder,
  cancelOrder,
  countOrders,
  countOrdersByStatus,
  sumSales,
  topSellingProducts,
  findByTableNumber,
  findOrdersByType,
  findDeliveryOrders,
  findTakeawayOrders,
  findDineInOrders,
  findOrdersBySearch,
};
