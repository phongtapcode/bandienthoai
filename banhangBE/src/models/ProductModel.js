const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        memoryPrice: [
            {
                memory: { type: String, required: true },
                price: { type: String, required: true }
            }
        ],
        type: { type: String, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String },
        discount: { type: Number },
        selled: { type: Number },
        cpu: { type: String, required: true },
        screen: { type: String, required: true },
        ram: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;