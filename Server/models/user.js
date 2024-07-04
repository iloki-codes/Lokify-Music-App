const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passComp = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        // select: false
    },
    gender: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    likedSongs: {
        type: [String],
        default: []
    },
    playlists: {
        type: [String],
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { 
            _id: this._id,
            name: this.name,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    )
        console.log(token);
        return token;
}

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required(),
        email: Joi.string().email().required(),
        password: passComp().required(),
        month: Joi.number().required(),
        date: Joi.number().required(),
        year: Joi.number().required(),
        gender: Joi.string().valid("male", "female", "non-binary").required()
    });
    return schema.validate(user)
}

const User = mongoose.model("user", userSchema);

module.exports = {User, validate}