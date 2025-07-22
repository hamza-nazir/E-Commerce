require('dotenv').config();
const express = require('express');
const User=require('./models/User');
const passport=require('passport');
const session = require('express-session')
const nodemailer = require('nodemailer');
const LocalStrategy=require('passport-local');
const {storage}=require('./Cloudinary')
const cors=require('cors');
const app = express();
const Product=require('./models/Product')
const crypto = require('crypto');
const multer = require('multer');
const upload = multer({ storage });
const Order = require('./models/Order');



app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(session({ secret: 'r5hf#brk', resave: false, saveUninitialized: true, cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true } }));




app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.post('/signup',async (req, res) => {
    try{
        const { username, email, password } = req.body;
const user= await User.register({username,email},password);

req.login(user,()=>{
res.json({success:true,message: 'Login successful', user: req.user._id })
})

    
  }catch(err){
   res.json({message:"Error 404"})
}
});



app.post('/login', passport.authenticate('local'), (req, res) => {

  if(req.user){
 res.json({ message: 'Login successful', user: req.user._id });

  }
 
});


app.get('/auth',(req,res)=>{
    if(req.isAuthenticated()){
        res.send({currentUser:req.user})
    }else{
        res.json({failure:"You are not Logged In"})
    }
})


app.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.json({success:true})
    })
})

app.post('/change-password',async (req,res)=>{
    try{
 const {currentPassword,newPassword,confirmPassword}=req.body.formData

    const userId=req.user._id;
const user=  await User.findById(userId);
await user.changePassword(currentPassword,newPassword);
res.json({success:true});
    }catch(err){
        res.json({failure:true});
    }
   
})

app.get('/products/:id/delete',async(req,res)=>{
  let {id}=req.params;
 await Product.findByIdAndDelete(id);
 res.json({success:true})

})

app.post('/nodemailer',async (req,res)=>{
    const { username, email, password } = req.body;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
       from: `"BESPOKE TAILOR" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to Tailor and Threats',
    html: `<h2>Hello ${username},</h2><p>Thank you for signing up with us!</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false});
  }
})



app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
const username=user.username;
  if (!user) {
    return res.status(404).json({ success: false, message: 'No user found with that email' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; 
  await user.save();

  const link = `http://localhost:5173/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `"Tailor Threads" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `  Reset Your Password`,
    html: `<h3>username:${username}    </h3><p>Click below to reset your password:</p>
           <a href="${link}">${link}</a><br><br>
           <small>This link is valid for 1 hour.</small>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Reset link sent to email' });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Failed to send email' });
  }
});


app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ success: false, message: 'Token is invalid or expired' });
  }

  try {
    await user.setPassword(newPassword); 
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.json({ success: true, message: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error resetting password' });
  }
});



app.post('/add', upload.single('image'), async (req, res) => {

try{
 const imageURL = req.file?.path;
let  size = JSON.parse(req.body.size);
    
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            stock: req.body.stock,
            category: req.body.category,
            gender: req.body.gender,
            colors: req.body.colors,
            material: req.body.material,
            tags: req.body.tags,
            size: size, 
            image: imageURL,
            owner: process.env.OWNER_ID,
        });

        await product.save();
        console.log("Product Saved");
        res.json({ success: true });
}catch(err){
  console.log("Error Found");
}
       

});


app.get('/getData',async (req,res)=>{
let allData=await Product.find({});

res.send(allData)
})


app.get('/products/:id',async (req,res)=>{
  let {id}=req.params;
 let product= await Product.findById(id)
   .populate({
        path: "reviews.commentedBy",
        model: "User", // or whatever your user model is named
        select: "username email" // select the fields you want from User
      });

  res.json(product);
})

app.get('/collections/category/:category',async (req,res)=>{
  let {category}=req.params;

 let response= await Product.find({gender:category});
 res.json(response);
})



app.post('/reviews',async (req,res)=>{
  try{
let{reviews,currentUser,productId}=req.body
let comment=reviews.comment;
let rating=reviews.range;
let commentedBy=currentUser


  let product=await Product.findById(productId);
 
  product.reviews.push({
    comment,
    rating,
    commentedBy
  })
  ;
await product.save();

    res.json({success:true,product})

  }catch(err){
    res.json({success:false})
  }
  
})


app.post('/confirmOrder', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Basic validation
    if (!orderData.buyerDetails || !orderData.products || !orderData.totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order data'
      });
    }

    // Create new order
    const newOrder = new Order({
      buyerDetails: orderData.buyerDetails,
      products: orderData.products,
      totalAmount: orderData.totalAmount,
      paymentMethod: orderData.paymentMethod || 'cashOnDelivery'
    });

    // Save to database
    const savedOrder = await newOrder.save();



  
    res.json({
      success: true,
      message: 'Order confirmed successfully',
      orderId: savedOrder._id,
      orderDetails: {
        buyer: savedOrder.buyerDetails.name,
        total: savedOrder.totalAmount,
        items: savedOrder.products.length
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    
   
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while processing order',
      error: error.message
    });
  }

});

app.listen(3000, () => {
console.log('App listening on port');
});