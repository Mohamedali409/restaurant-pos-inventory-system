// orderNumber
// items: [
//   {
//     productId,
//     nameSnapshot,
//     priceSnapshot,
//     quantity,
//     subtotal
//   }
// ]
// subtotal
// discount
// tax
// total
// paymentMethod (cash | card | wallet)
// status (pending | completed | cancelled)
// cashierId (ref User)
// createdAt

// order → user (cashier)
// order → products (through items)
import mongoose from "mongoose"
const orderschema = new mongoose.Schema({
orderNumber:{type:Number , required:true , unique:true},
customername:{type:String, required:true},
items:{type:[{
    productId:{type:mongoose.Schema.Types.ObjectId, ref: "Product"},
    namesnapshot:{type:String , required:true },
    pricesnapshot:{type:Number , required:true ,min:0},
    quantity:{type:Number , required:true , min:1},
    subtotal:{type:Number , rquired:true , } 

}]} ,
subtotal:{type:Number , required:true , min:0},
discount:{type:Number , default:0},
tax:{type:Number , required:true , default:14/100} , 
total:{type:Number , required:true , min:0}, 
paymentMethod:{type:String , enum:["cash","card","wallet"] , required:true} , 
status:{type:String , enum :["pending", "completed" , "cancelled"], required:true } ,
cashierId:{type:mongoose.Schema.Types.ObjectId ,ref:"User"},
 createdAt:{type:Date , default:Date.now}
})
const Order =mongoose.models.Order ||mongoose.model("Order",orderschema)
export default Order