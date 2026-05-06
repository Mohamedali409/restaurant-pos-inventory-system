// إنشاء الطلبات
// خصم المخزون
// حساب الفاتورة

// أهم Logic هنا:
// calculate total
// apply discount
// deduct stock
// create order
// create stock log

/* Functions */
// createOrderService
// calculateOrderTotal
// deductStockService
// refundOrderService
// getOrdersService


import  Order from './order.model';
import Product from '../product/product.model';
import repo from "./order.repository"
import AppError from '../../shared/utils/AppError';

 export async function createOrderService(orderData) {
    const { items, discount } = orderData;

    const total = await calculateOrderTotal(items, discount);

    const order = await Order.create({ items, discount, total });

    for (const item of items) {
        await deductStockService(item.productId, item.quantity, order._id);
    }
    return order;
}

export async function calculateOrderTotal(items, discount) { 
    let total = 0;
    for (const item of items) {
        const product = await repo.findById(item.productId);
        if(!order){
            throw new AppError(`Product with ID ${item.productId} not found`,404);
        }
    total+=product.price*item.quantity;
    }
    total-=discount;
    return total;
}

export async function deductStockService (productId,quantity,orderid){
    const product=await repo.findById(productId)
    if(product.stock<quantity){
        throw new AppError(`Not enough stock for product ${product.name}`,400)
}

Product.stock-=quantity ;
await product.save();

}

export async function refundOrderService(orderId) {
    const order = await repo.findById(orderId);
    if (!order) {
        throw new AppError('Order not found', 404);
    }
    const orderchange = await repo.changeStatus(order,status)
    

    
}

export async function getOrdersService() {
    const order = await repo.findOrders();
    if(!order){
        throw new AppError ('Order not found',404 )
    }

    return order;
}
     


