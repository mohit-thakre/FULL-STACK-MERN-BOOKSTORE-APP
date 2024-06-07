const express = require('express');
const router = express.Router();
const User = require('../model/user');
const {authenticateToken} = require('./userAuth')


router.put('/addbooktocart',authenticateToken,async(req,res)=>{
  try {
    
    const {bookid,id}= req.headers;
    const userdata = await User.findById(id)
    const isbookincart = userdata.cart.includes(bookid)
    if(isbookincart){
      return res.status(200).json({message:"book is already in cart"})
    }
     userdata.cart.push(bookid)
    await userdata.save();
    return res.status(200).json({message:"book is added in cart"})
  } catch (error) {
    console.log(error)
  }
})

router.put('/removebookfromcart',authenticateToken,async(req,res)=>{
  try {
    
    const {bookid,id}= req.headers;
    const userdata = await User.findById(id)
    const isbookincart = userdata.cart.includes(bookid)
    if(!isbookincart){
      return res.status(200).json({message:"book is not in cart"})
    }
    userdata.cart.pull(bookid);
    await userdata.save(); 
    return res.status(200).json({message:"book is removed from cart"})
  } catch (error) {
    console.log(error)
  }
})


router.get('/getbookincart',authenticateToken,async(req,res)=>{
  try {
    const {id} = req.headers;
    const userdata = await User.findById(id).populate('cart').sort({ createdAt: -1 });
    if(!userdata){
      return res.status(200).json({message:"no book in cart"})
    }
    return res.status(200).json({message:"successfully get the data",data:userdata.cart})
    
  } catch (error) {
    console.log(error)
    
  }
})

module.exports = router