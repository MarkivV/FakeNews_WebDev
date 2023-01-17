import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
    },
    emailVerified:{
        type:Boolean,
        require: true,
        default: false
    }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);