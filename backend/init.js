const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/E-COMMERNCE', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  }
}

async function seedProducts() {
  try {
    await connectDB();

    const ownerId = process.env.OWNER_ID;
    if (!ownerId) {
      throw new Error('OWNER_ID not found in environment variables');
    }

    const products = [
      {
        name: "Classic White Shirt",
        description: "A crisp cotton white shirt perfect for formal events.",
        price: 1500,
        discount: 10,
        stock: 100,
        category: "Shirts",
        subcategory: "Formal",
        colors: "White",
        material: "Cotton",
        tags: "#office #formal",
        size: { XS: true, S: true, M: true, L: true, XL: false, XXL: false },
        image: "https://picsum.photos/id/1005/300/400", // Working image URL
        owner: ownerId,
      },
      {
        name: "Slim Fit Black Jeans",
        description: "Stylish black jeans that fit like a glove.",
        price: 2200,
        discount: 5,
        stock: 75,
        category: "Pants",
        subcategory: "Casual",
        colors: "Black",
        material: "Denim",
        tags: "#trendy #casual",
        size: { XS: false, S: true, M: true, L: true, XL: true, XXL: false },
        image: "https://picsum.photos/id/1025/300/400",
        owner: ownerId,
      },
      {
        name: "Grey Hoodie",
        description: "Comfortable fleece hoodie for cold evenings.",
        price: 1800,
        discount: 15,
        stock: 50,
        category: "Hoodies",
        subcategory: "Casual",
        colors: "Grey",
        material: "Fleece",
        tags: "#winter #cozy",
        size: { XS: false, S: true, M: true, L: true, XL: true, XXL: true },
        image: "https://picsum.photos/id/211/300/400",
        owner: ownerId,
      },
      {
        name: "Navy Blue Suit",
        description: "Elegant navy blue suit for corporate meetings.",
        price: 9000,
        discount: 20,
        stock: 30,
        category: "Suits",
        subcategory: "Formal",
        colors: "Navy",
        material: "Wool",
        tags: "#premium #suitup",
        size: { XS: false, S: false, M: true, L: true, XL: true, XXL: false },
        image: "https://picsum.photos/id/1057/300/400",
        owner: ownerId,
      },
      {
        name: "Casual Polo T-shirt",
        description: "Lightweight polo shirt for sunny days.",
        price: 1200,
        discount: 0,
        stock: 120,
        category: "Shirts",
        subcategory: "Casual",
        colors: "Blue",
        material: "Pique Cotton",
        tags: "#summer #casual",
        size: { XS: true, S: true, M: true, L: false, XL: false, XXL: false },
        image: "https://picsum.photos/id/1006/300/400",
        owner: ownerId,
      },
      {
        name: "Olive Green Cargo Pants",
        description: "Military style cargo pants with deep pockets.",
        price: 2500,
        discount: 12,
        stock: 60,
        category: "Pants",
        subcategory: "Utility",
        colors: "Olive Green",
        material: "Cotton Twill",
        tags: "#outdoors #durable",
        size: { XS: false, S: true, M: true, L: true, XL: false, XXL: false },
        image: "https://picsum.photos/id/1076/300/400",
        owner: ownerId,
      },
      {
        name: "Red Flannel Shirt",
        description: "Classic red flannel shirt for cozy winters.",
        price: 1600,
        discount: 10,
        stock: 45,
        category: "Shirts",
        subcategory: "Casual",
        colors: "Red",
        material: "Flannel",
        tags: "#winter #plaid",
        size: { XS: false, S: true, M: true, L: true, XL: true, XXL: true },
        image: "https://picsum.photos/id/103/300/400",
        owner: ownerId,
      },
      {
        name: "Black Leather Jacket",
        description: "Premium black leather jacket with inner lining.",
        price: 7500,
        discount: 25,
        stock: 25,
        category: "Jackets",
        subcategory: "Biker",
        colors: "Black",
        material: "Leather",
        tags: "#biker #leather",
        size: { XS: false, S: false, M: true, L: true, XL: true, XXL: true },
        image: "https://picsum.photos/id/1011/300/400",
        owner: ownerId,
      },
      {
        name: "Beige Kurta",
        description: "Traditional kurta for cultural occasions.",
        price: 2000,
        discount: 5,
        stock: 80,
        category: "Ethnic",
        subcategory: "Kurta",
        colors: "Beige",
        material: "Linen",
        tags: "#eid #cultural",
        size: { XS: true, S: true, M: true, L: true, XL: true, XXL: true },
        image: "https://picsum.photos/id/1050/300/400",
        owner: ownerId,
      },
      {
        name: "White Sneakers",
        description: "Minimal white sneakers for daily wear.",
        price: 3500,
        discount: 18,
        stock: 90,
        category: "Footwear",
        subcategory: "Sneakers",
        colors: "White",
        material: "Canvas",
        tags: "#shoes #sneakers",
        size: { XS: false, S: false, M: false, L: true, XL: true, XXL: false },
        image: "https://picsum.photos/id/1036/300/400",
        owner: ownerId,
      }
    ];

    await Product.deleteMany({});
    console.log('🧹 Cleared existing products');

    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${insertedProducts.length} products`);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedProducts();