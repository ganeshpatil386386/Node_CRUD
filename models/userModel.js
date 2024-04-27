const mongoose = require("mongoose");
const { stringify } = require("querystring");
require("dotenv").config()

mongoose.connect(process.env.mongodb_url)

const userSchema = mongoose.Schema ({
    name: String,
    email: String,
    imageurl: String   

})

const User = mongoose.model("user", userSchema);

module.exports = User;