const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agriSchema = new Schema({
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

const Agri = mongoose.model("Agri",agriSchema);
module.exports = Agri;