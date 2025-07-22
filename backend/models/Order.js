const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyerDetails: {
    name: {
      type: String,
      required: [true, 'Buyer name is required'],
      trim: true
    },
    age: {
      type: Number,
      required: [true, 'Buyer age is required'],
      min: [13, 'Age must be at least 13 years']
    },
    contact: {
      type: String,
      required: [true, 'Contact number is required'],
      validate: {
        validator: function(v) {
          return /^03\d{9}$/.test(v); // Pakistani mobile number format
        },
        message: props => `${props.value} is not a valid Pakistani mobile number!`
      }
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      enum: {
        values: [
          'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 
          'Peshawar', 'Quetta', 'Faisalabad', 'Multan', 
          'Hyderabad', 'Gujranwala'
        ],
        message: '{VALUE} is not a supported city in Pakistan'
      }
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      minlength: [10, 'Address must be at least 10 characters long']
    }
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Product ID is required'],
      ref: 'Product' // Reference to your Product model if you have one
    },
    name: {
      type: String,
      required: [true, 'Product name is required']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    subtotal: {
      type: Number,
      required: [true, 'Subtotal is required'],
      min: [0, 'Subtotal cannot be negative']
    }
  }],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: {
      values: ['cashOnDelivery', 'creditCard', 'jazzcash', 'easypaisa'],
      message: '{VALUE} is not a supported payment method'
    },
    default: 'cashOnDelivery'
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Add index for better query performance
orderSchema.index({ 'buyerDetails.contact': 1 });
orderSchema.index({ 'products.productId': 1 });
orderSchema.index({ status: 1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;