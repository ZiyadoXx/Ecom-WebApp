const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    Image: String,
    CountInStock: {
        type: Number,
    required: true
}
})

exports.Product = mongoose.model('Products',productSchema);
