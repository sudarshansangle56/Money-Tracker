const mongoose = require('mongoose');

const moneySchema = new mongoose.Schema({
    product: String,
    desc: String,
    price: Number,
    Date: Date
});

module.exports = mongoose.model('Money', moneySchema);
