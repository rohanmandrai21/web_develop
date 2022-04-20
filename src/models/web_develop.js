const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { default: isEmail } = require('validator/lib/isEmail');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 3
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Invalid Email Id')
            }
        }

    },
    message: {
        type: String,
        required: true,
        minLength: 3
    }

})
const SignSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
        minLength: 3
    },
    lname: {
        type: String,
        required: true,
        minLength: 3
    },

    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Invalid Email Id')
            }
        }

    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})
SignSchema.methods.generate = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        console.log('hello bro')
        return token;

    } catch (error) {
        console.log(error)
    }

}

SignSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
    }

    next();

})
const User = mongoose.model('Contactdetail', UserSchema);
const UserRegister = mongoose.model('UserRegister', SignSchema);
module.exports = User;
module.exports = UserRegister;