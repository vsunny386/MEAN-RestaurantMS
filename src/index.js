require('dotenv').config();
const express  = require("express");
const app = express();
const port = process.env.PORT || 3000;
// Database Connection
require("./Database/dbconnection");
const routing = require("./controllers/routes");
const userModel = require("./model/userModel")
const bodyParser = require('body-parser')
const path = require('path')

app.use('/static', express.static(path.join(__dirname, 'assets/images/menu-images')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
  
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use(routing)






app.get("/", (req,res)=>{
    res.send("Request to page")
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 