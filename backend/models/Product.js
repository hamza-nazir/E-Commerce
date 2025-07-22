const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  discount: Number,
  category: String,
  gender: String,
  colors: String,
  material: String,
  tags: String,
  size: {
    XS: Boolean,
    S: Boolean,
    M: Boolean,
    L: Boolean,
    XL: Boolean,
    XXL: Boolean,
  },
  image: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, 
  reviews:[
    {
      comment:String,
      rating:Number,
      commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
    }
  ]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
