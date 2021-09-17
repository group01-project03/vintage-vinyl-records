// import Schema function from the Mongoose library. We'll be creating Record as a subdocument schema only
const {Schema}=require('mongoose');

const RecordSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    year:{
        type:Number,
    },
    condition:{
        type:String
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,/* To be determined*/
        required:true
    },
});

// export the Record Schema
module.exports=RecordSchema;