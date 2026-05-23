// aggregateSalesData
// aggregateProductsData
// aggregatePaymentData

import Order from "../order/order.model.js";

const aggregateSalesData = async ({ startDate, endDate }) => {
  const matchStage = { status: "completed" };
  if (startDate && endDate) {
    matchStage.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  return Order.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        totalSales: { $sum: "$total" },
        orderCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

const aggregateTopProducts = async (limit = 10) => {
  return Order.aggregate([
    { $match: { status: "completed" } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productId",
        productName: { $first: "$items.nameSnapshot" },
        totalQuantity: { $sum: "$items.quantity" },
        totalRevenue: { $sum: "$items.subtotal" },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: limit },
  ]);
};

const aggregatePaymentData = async () => {
  return Order.aggregate([
    { $match: { status: "completed" } },
    {
      $group: {
        _id: "$paymentMethod",
        count: { $sum: 1 },
        totalAmount: { $sum: "$total" },
      },
    },
  ]);
};

const aggregateSummary = async () => {
  const result = await Order.aggregate([
    {
      $facet: {
        totalOrders: [{ $count: "count" }],
        completedOrders: [
          { $match: { status: "completed" } },
          { $count: "count" },
        ],
        totalRevenue: [
          { $match: { status: "completed" } },
          { $group: { _id: null, total: { $sum: "$total" } } },
        ],
        todayOrders: [
          {
            $match: {
              createdAt: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lte: new Date(new Date().setHours(23, 59, 59, 999)),
              },
            },
          },
          { $count: "count" },
        ],
        todayRevenue: [
          {
            $match: {
              status: "completed",
              createdAt: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lte: new Date(new Date().setHours(23, 59, 59, 999)),
              },
            },
          },
          { $group: { _id: null, total: { $sum: "$total" } } },
        ],
      },
    },
  ]);

  const data = result[0];

  return {
    totalOrders: data.totalOrders[0]?.count || 0,
    completedOrders: data.completedOrders[0]?.count || 0,
    totalRevenue: data.totalRevenue[0]?.total || 0,
    todayOrders: data.todayOrders[0]?.count || 0,
    todayRevenue: data.todayRevenue[0]?.total || 0,
  };
};

export {
  aggregateSalesData,
  aggregateTopProducts,
  aggregatePaymentData,
  aggregateSummary,
};
