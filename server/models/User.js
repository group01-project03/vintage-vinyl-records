// import the Schema constructor and the model function from the mongoose library
const {Schema, model}=require('mongoose');

// import RecordSchema from Record.js
const RecordSchema = require('./Record');
// Create the User Schema to include username, email, password and an array of records
const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
        required:true,
    },
    savedRecords:[RecordSchema]
});

// Create the User model using UserSchema
const User = model('User',UserSchema);

// export the User model
module.exports=User;