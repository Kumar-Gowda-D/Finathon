const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const familySchema = new Schema({
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

const Family = mongoose.model("Family",familySchema);
module.exports = Family;