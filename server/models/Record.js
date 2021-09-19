// import Schema function from the Mongoose library. 
const {Schema, model}=require('mongoose');

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
    image: {
        type:String
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref:'Genre',
        required: true
    }
});

// Create the Record model using RecordSchema
const Record = model('Record',RecordSchema);

// export the Record Schema
module.exports=Record;