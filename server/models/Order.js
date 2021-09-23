// import Schema function from the Mongoose library. 
const {Schema, model}=require('mongoose');

const OrderSchema = new Schema({
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    records: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Record'
      }
    ]
  });
  
// Create the Order model using OrderSchema
const Order = model('Order', OrderSchema);
  
// export the Order model   
module.exports = Order;