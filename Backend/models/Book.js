const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true, },
    publisher: { type: String, required: true, },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array},
    price: { type: Number, required: true },
    inStock: {type: Boolean, default:true}
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);