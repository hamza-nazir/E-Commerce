const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
main()
.then((res)=>{
    console.log('Connection Succesfull');
})
.catch((err) =>{
    console.log(err)
});

async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/E-COMMERNCE');
}
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
      resetToken: String,
  resetTokenExpiry: Date
})
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports=User;