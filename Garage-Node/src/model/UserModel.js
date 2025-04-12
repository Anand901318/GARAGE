const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    register:{ type: String,
              require: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {  
        type: String,
        enum: ["Customer", "ServiceProvider", "Admin"],
        default: "Customer",
        required: true
    }
   
});
module.exports = mongoose.model("users", userSchema);      