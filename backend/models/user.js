// import mongoose module
const mongoose = require("mongoose");

// create user schema
const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email: String,
    tel:Number,
    password: String,
    role: String,

    task:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }    
});

// create user model
const user= mongoose.model("User",userSchema);

// export user
module.exports= user;