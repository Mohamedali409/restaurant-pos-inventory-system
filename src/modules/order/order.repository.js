//createOrder;
//findOrders;
// findOrderById;
// updateOrder;
// deleteOrder;
// change status



import order from "./order.model.js";


export  const createOrder=(orderData)=>{
    return order.create(orderData);
}
export const findOrders =()=>{
return order.find()
}
export const findOrderById=(orderid)=>{
    return order.findById(orderid)

}
export const updateOrder=(orderid,orderdata)=>{
    return order.findByIdAndUpdate(orderid,orderdata)

}
export const deleteOrder= (orderid)=>{
    return order.findByIdAndDelete(orderid)

}
export const changeStatus=(orderid,status)=>{
    return order.findByIdAndUpdate(orderid,{status})
}