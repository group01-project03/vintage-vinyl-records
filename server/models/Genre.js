// import Schema function from the Mongoose library. 
const {Schema, model}=require('mongoose');

const GenreSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim:true
    }
});

// Create the Genre model using GenreSchema
const Genre = model('Genre',GenreSchema);

// export the Genre Schema
module.exports=Genre;