const mongoose = require("mongoose");
const validator = require("validator");
const brcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email Id already exists"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email Invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validatePass(value) {
            if (!Validator.isAlphanumeric(value, 'en-US')) {
                console.log("Please Enter AlphaNumeric Password");
            }
        }
    },
    cpassword: {
        type: String,
        required: true
    },

    tokens: [{
       token:{
        type: String,
        required: true
       } 
    }]
})

//Generate token 
userSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY, {expiresIn: '1h'});
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}



//Password Hashing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await brcrypt.hash(this.password, 10)
        this.cpassword = await brcrypt.hash(this.password, 10)
    }
    next();
})


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;