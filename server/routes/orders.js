import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a new order (purchase)
router.post('/', auth, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    // Validate required fields
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in order'
      });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing shipping address or payment method'
      });
    }

    // Validate and calculate prices
    let calculatedItemsPrice = 0;
    const orderItems = [];

    for (const item of items) {
      // Get product from database to verify price and availability
      const product = await Product.findOne({ productId: item.productId });
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.productId} not found`
        });
      }

      // Calculate item total
      const itemTotal = product.price * item.quantity;
      calculatedItemsPrice += itemTotal;

      orderItems.push({
        product: product._id,
        productId: product.productId, // Store the custom productId as well
        quantity: item.quantity,
        price: product.price,
        name: product.name,
        image: product.image,
        size: item.size || 'M',
        color: item.color || 'Default'
      });
    }

    // Calculate tax (10% for example)
    const calculatedTaxPrice = calculatedItemsPrice * 0.1;
    
    // Calculate shipping (free for orders over $100, otherwise $10)
    const calculatedShippingPrice = calculatedItemsPrice > 100 ? 0 : 10;
    
    // Calculate total
    const calculatedTotalPrice = calculatedItemsPrice + calculatedTaxPrice + calculatedShippingPrice;

    // Create order
    const order = new Order({
      user: req.user.userId, // Use userId from JWT payload
      items: orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult: {},
      itemsPrice: calculatedItemsPrice,
      taxPrice: calculatedTaxPrice,
      shippingPrice: calculatedShippingPrice,
      totalPrice: calculatedTotalPrice,
      isPaid: false,
      isDelivered: false
    });

    const savedOrder = await order.save();

    // Populate the order with product and user details
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate('user', 'name email')
      .populate('items.product', 'name price image');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order: populatedOrder
      }
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order',
      error: error.message
    });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product', 'name price image')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        orders
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders',
      error: error.message
    });
  }
});

// Get specific order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name price image');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      data: {
        order
      }
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order',
      error: error.message
    });
  }
});

// Update order payment status (for payment integration)
router.put('/:id/pay', auth, async (req, res) => {
  try {
    const { paymentResult } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = paymentResult;

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: 'Order payment updated successfully',
      data: {
        order: updatedOrder
      }
    });

  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating payment',
      error: error.message
    });
  }
});

export default router;