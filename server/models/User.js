// import the Schema constructor and the model function from the mongoose library
const {Schema, model}=require('mongoose');
const bcrypt = require('bcrypt');

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

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // custom method to compare and validate password for logging in
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

// Create the User model using UserSchema
const User = model('User',UserSchema);

// export the User model
module.exports=User;