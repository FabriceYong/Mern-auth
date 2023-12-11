import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        lowercase: true
    }
}, {timestamps: true})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = bcrypt.hashSync(this.password, salt)
})

// validate user by comparing entered password with saved password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User