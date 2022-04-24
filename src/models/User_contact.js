const mongoose = require('mongoose');
const validator = require('validator');


const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        require:true,
        minLength: 3
    },
    phone: {
        type: Number,
        require:true,
        min: 10
    },
    email: {
        type: String,
        require:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Invalid Email Id')
            }
        }

    },
    message: {
        type: String,
        require:true,
        minLength: 3
    }

})

const User_contact = mongoose.model('Contactdetail', UserSchema);
module.exports = User_contact;