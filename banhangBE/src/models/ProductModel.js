const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        countinstock: { type: String, required: true },
        price: { type: String, required: true },
        description: { type: String },
        discount: { type: String },
        selled: { type: String },
        cpu: { type: String, required: true },
        screen: { type: String, required: true },
        ram: { type: String, required: true },
        memory: {type: String,require: true}
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;