import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                productId: { type: Number, required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true, min: 0 },
                name: { type: String, required: true },
                image: { type: String },
                size: { type: String, default: 'M' },
                color: { type: String, default: 'Default' }
            }
        ],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true }
        },
        paymentMethod: { type: String, required: true },
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String
        },
        itemsPrice: { type: Number, required: true, min: 0 },
        taxPrice: { type: Number, required: true, min: 0 },
        shippingPrice: { type: Number, required: true, min: 0 },
        totalPrice: { type: Number, required: true, min: 0 },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date }
    }, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema);