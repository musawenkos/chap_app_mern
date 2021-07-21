const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const UsersSchema = new mongoose.Schema(
    {
        _id:{
            type:String,
            required: true,
        },
        password: { 
            type: String,
            required: true,
        },
        first_name:{
            type:String,
        },
        last_name:{
            type:String,
        },
        email: {
            type:String,
        },
        gender:{
            type:String,
        },
        img_src:{
            type:String,
        }
    },
);


module.exports = mongoose.model("Users",UsersSchema);