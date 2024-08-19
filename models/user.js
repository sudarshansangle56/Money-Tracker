const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     Name:String ,
     email: {
        type: String,
        required: true,
        trim: true
      },
     passward:String,
     age:Number
});

module.exports = mongoose.model('User', userSchema);