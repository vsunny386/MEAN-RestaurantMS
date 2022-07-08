const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer")
const userModel = require("../model/userModel")
const menuModel = require("../model/menuModel")
const orderModel = require("../model/order")
const path = require('path')
const verifyToken = require('../middlewares/auth');
const stripe = require("stripe")("sk_test_51LC750SIxNJvGMRtv2Mn2rsBeJcgaSFTIYlYfC2nXZhQmKEVgdnJAwx1aiOjg9ejYSJm6i4tuv38imMPX2mBV39G00cqQ0LVpo");
const nodemailer = require("nodemailer");
const Razorpay = require('razorpay');
const completedOrderModel = require("../model/completedOrderModel");
var easyinvoice = require('easyinvoice');
var fs = require('fs');


const rpinstance = new Razorpay({
  key_id: process.env.razorKeyId,
  key_secret: process.env.razorKeySecret
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./assets/images/menu-images")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const upload = multer({ storage: storage }).single('file');

router.get("/sunny", (req, res) => {
    res.send("Hello Sunny");
})

//Fetch Users
router.get("/users", verifyToken, async (req, res, next) => {
    try {
        const user = await userModel.find();
        res.status(200).send(user)
    } catch (error) {
        res.send(error)
    }
})

//Fetch Orders
router.get("/customer/orderList", async (req,res)=>{
    try {
      const orderList = await orderModel.find({}).populate('user')  
      res.status(200).send(orderList)
    } catch (error) {
        res.send(error)
    }
})



//Registration
router.post("/register", async (req, res) => {
    try {
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cpassword: req.body.cpassword
        })

        const token = await user.generateAuthToken();
        console.log(token)

        res.cookie('jwt', token, {
            expires  : new Date(Date.now() + 9999999),
            httpOnly : false
          });

         
        const createUser = await user.save();
        console.log("User Created")
        res.status(201).jsonp({
            message: "User Registered Successfully"
        })

    } catch (e) {
        res.status(400).send(e);
    }
})


//login
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await userModel.findOne({ email: email });
        const compare = await bcrypt.compare(password,useremail.password);
        console.log(`Password Comparison ${compare}`)

        const token = await useremail.generateAuthToken();
        console.log(token)

        if (compare) {
            res.status(201).jsonp({ 
                message: 'User Logged In',
                token: token,
                username: useremail.name,
                emailID: useremail.email,
                id: useremail._id
            })
           
            console.log("User Logged In")
        }
        else {
            res.status(400).send("password not matching")
            console.log("Password not Matching")
        }
    } catch (error) {
        res.status(400).jsonp({ 
            message: 'Invalid Email'
        })
        console.log("Invalid Email");
    }
})


//Update
router.put("/update/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateUser = await userModel.findByIdAndUpdate(_id, {$set: req.body});
        console.log(req.body)
        res.send(updateUser)
    }catch(e){
        res.status(404).send(e)
        console.log(e)
    }
})

//delete
router.delete("/delete/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        const deleteUser = await userModel.findByIdAndDelete(_id);
        res.send(deleteUser);
         console.log(`User Deleted with id ${_id}`)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get("/users/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        console.log(req.params.id)
     const userDataById = await userModel.findById(_id)
     console.log(userDataById)
     res.send(userDataById)
    }catch(e){
        res.status(500).send(e)
    }
})

//delete
router.delete("/delete/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        const deleteUser = await userModel.findByIdAndDelete(_id);
        res.send(deleteUser);
         console.log(`User Deleted with id ${_id}`)
    } catch (e) {
        res.status(404).send(e)
    }
})

//////////////For Menus/////////////////////
router.post("/addMenu", upload, async (req,res)=>{
    try {
        const menu = new menuModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: 1,
            image: req.file.filename
        })

        const createMenu = await menu.save();
        res.status(201).send(createMenu);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.put("/updateMenu/:id", upload, async (req,res)=>{
    try {
        const _id = req.params.id;
        const updateData = Object.assign({},req.body); // Copy req.body in order not to change it
        updateData.image = req.file.filename
        console.log(updateData.image);
        const updateMenu = await menuModel.findByIdAndUpdate(_id, {$set: req.body ,image:req.file.filename});
        res.status(200).send(updateMenu);
    } catch (error) {
        res.status(400).send(error);
    }
})
////////////////Get Menu By ID////////////////
router.get("/menus/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        console.log(req.params.id)
     const userMenuById = await menuModel.findById(_id)
     console.log(userMenuById)
     res.send(userMenuById)
    }catch(e){
        res.status(500).send(e)
    }
})


//////////////Delete Menu Item//////////////////////
router.delete("/order/menu/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        const deleteMenu = await menuModel.findByIdAndDelete(_id);
        res.send(deleteMenu);
         console.log(`Menu Deleted with id ${_id}`)
    } catch (e) {
        res.status(404).send(e)
    }
})


/////////////////Get Menu List///////////
router.get("/getMenuList", async(req,res)=>{
    try {
        const menuList = await menuModel.find()
      res.status(200).send(menuList)
    } catch (error) {
        res.status(400).send(error);
    }
})

////////////////Orders///////////////////
router.post("/order", async(req,res)=>{
    try {
        
        const _id = req.params.id;
        const order = new orderModel({
            user: req.body.id,
            cart: req.body.cartItems,
            address: req.body.address,
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            amount: req.body.amount,
            paymentMode: req.body.mode_of_payment
        })
        const userInfo = await orderModel.find({}).populate('user') 
        const generateOrder = await order.save();
      
      let orderArray = generateOrder.cart
     
      let products = []
     for (let i = 0; i < orderArray.length; i++) {
        const productsObj = new Object()
        productsObj.quantity = orderArray[i].quantity
        productsObj.price = orderArray[i].price
        productsObj.description = orderArray[i].name
        productsObj['tax-rate'] = generateOrder.tax
        let objects = JSON.stringify(productsObj)
       
        products.push(productsObj)
        


        
     }
     
     const data = new Object()
     const settings = new Object()
     const information = new Object()
     const sender = new Object()
     const images = new Object()
     const client = new Object()
    //  const note = new Object()
     var today = new Date();
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
         /////DATE///////////
     sender.company = "IDOL Restaurant"
     sender.address = "Dr. Shankar Dayal Sharma Bhavan, Kolivery Village, University of Mumbai,Vidya Nagari, Kalina, Santacruz East, Mumbai, Maharashtra 400098"
     images.logo = "https://duresult.in/wp-content/uploads/2021/10/idol-mumbai-university.jpg"
     client.company = generateOrder.name
     client.address = generateOrder.address
     client.custom1 = generateOrder.contact
    //  note['bottom-notice'] = "Thankyou for Ordering, hope you enjoy your meal"
     information.number = generateOrder._id
     information.date = today
     information['due-date'] = today
     settings['tax-notation'] = 'gst'
     data.products = products
     data.settings = settings
     data.information = information
     data.sender = sender
     data.images = images
     data.client = client
     data['bottom-notice'] = "Thankyou for Ordering, hope you enjoy your meal"
     console.log(data ); 
        res.status(201).jsonp({ 
            message: 'Order Placed Successfully',
            payment: generateOrder.paymentMode,
            order: generateOrder
            // data: data
        })
       
        
       
     let invoice = await  easyinvoice.createInvoice(data, function  (result) {
            //The response will contain a base64 encoded PDF file
            console.log('PDF base64 string: ', result.pdf);
            fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
            
        })
console.log(invoice);

          // create reusable transporter object using the default SMTP transport
  if (invoice) {
    
       
  let transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "restaurantidol@gmail.com", // generated ethereal user
      pass: "tkydsdtnjxlmfhtr", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info =  transporter.sendMail({
    from: "restaurantidol@gmail.com", // sender address
    to: generateOrder.email, // list of receivers
    subject: `Order Placed Successfully | Order no. - ${generateOrder._id}`, // Subject line
    text: `Greetings from IDOL Restaurant`, // plain text body
    html: `<b>Hi ${generateOrder.name}</b><br><p>You will be notified once the order is completed</p>`, // html body
    attachments: [
        {
          filename: "invoice.pdf",
          path:  "./invoice.pdf",
        },
      ],
  });

  console.log("Message sent: %s", info.messageId);
}   
//   Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }

    

})



/////////////Update Order Status///////////////////////
//Update
router.put("/update/order/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        const userEmail = req.body.email
        const updateOrder = await orderModel.findByIdAndUpdate(_id, {$set: {status: true}});
        console.log(userEmail)
        res.send(updateOrder)
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "restaurantidol@gmail.com", // generated ethereal user
              pass: "tkydsdtnjxlmfhtr", // generated ethereal password
            },
          });
        
        //   send mail with defined transport object
          let info =  transporter.sendMail({
            from: "restaurantidol@gmail.com", // sender address
            to: req.body.email, // list of receivers
            subject: `Order Completed`, // Subject line
            text: `Your Order is Completed and Out for Delivery Order-${_id}`, // plain text body
            // html: `<b>Hi ${generateOrder.name}</b><br><p>You will be notified once the order is completed</p>`, // html body
        });
        
          console.log("Message sent: %s", info.messageId);
         
          
      
            
    
    }catch(e){
        res.status(404).send(e)
        console.log(e)
    }
})

//////////////////Delete order//////////////////////////////
router.delete("/order/delete/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        const deleteOrder = await orderModel.findByIdAndDelete(_id);
        res.send(deleteOrder);
         console.log(`Order Deleted with id ${_id}`)
    } catch (e) {
        res.status(404).send(e)
    }
})
////////////Payements////////////////////








//////////////////RAZORPAY/////////////////////
router.post('/payment', (req,res,next)=>{
  const options = {
    amount: req.body.amount*100,
    currency: "INR",
    receipt: "Order0141",
    payment_capture: 0
  };

  rpinstance.orders.create(options, (err,order)=>{
    if (err) {
      console.log(err);
      next(err)
    }
    if (order) {
      res.json({
        success: true,
        status: "Order Created Successfully",
        value: order,
        key: process.env.razorKeyId
      })
     
    }
    
  })
})

router.post("/api/payment/verify",(req,res)=>{ 
    let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;  
    var crypto = require("crypto");

    var expectedSignature = crypto.createHmac('sha256', process.env.razorKeySecret).update(body.toString()).digest('hex'); 
    console.log("sig received " ,req.body.razorpay_signature); 
     console.log("sig generated " ,expectedSignature); 
      var response = {"signatureIsValid":"false"}  
      if(expectedSignature === req.body.razorpay_signature)  
       response={"signatureIsValid":"true"} 
        res.send(response);  
});



     





module.exports = router;

  