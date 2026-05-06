// createOrder
// getOrders
// getOrderById
// refundOrder
// updateOrderStatus


import * as orderservice from "./order.service.js"
export const createOrder= async(req,res,next)=>{
    const order = await orderservice.createOrderService(req.body)
     
res.status(201).json({message:"" , order})
}


export const getOrders = async (req,res,next)=>{
    const getorder = await orderservice.getOrdersService()
    res.status(200).json({message:"", getorder})

}

export const getOrderById= async (req,res,next)=>{
    const oredrid = await orderservice.getOrderById(req.body)
    res.status(200).json({message:"",oredrid})
}

export const refundOrder =async (req,res,next)=>{
    const oredrrefund = await orderservice.refundOrderService(req.body)
    res.status(200).json({message:"", oredrrefund})

}

export const updateOrderStatus = async (req,res,next)=>{
    const updateorderstatus = await orderservice.updateOrderStatus(req.body)
    res.status(200).json({message:"", updateorderstatus})
}

