const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, lowercase: true, required: true, unique: true },
    passward: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        default: false
    },
    img: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt0yboM1y3PKIke01cHJpc0V7j-LAmoZ4PkQ&usqp=CAU' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);