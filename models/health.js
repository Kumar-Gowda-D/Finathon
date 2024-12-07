const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const healthSchema = new Schema({
    date:{
        type:Date,
    },
    amount:{
        type:String,
    },
    spent:{
        type:String,
    }
})

const Health = mongoose.model("Health",healthSchema);
module.exports = Health;