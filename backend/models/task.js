// import mongoose module
const mongoose = require("mongoose");

// create user schema
const taskSchema = mongoose.Schema({
    title:String,
    description:String,
    timing:Number,
    status:String,
    
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }    
});

// create user model
const task= mongoose.model("Task",taskSchema);

// export user
module.exports= task;