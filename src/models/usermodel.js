const mongoose = require('mongoose')
const masterSchema = require('./mastermodel')

const userSSchema = new mongoose.Schema({      //userinu venda fields ezhuthunnu

    ...masterSchema.obj,    //...spread operator           //obj varumbo master scemayilulla fieldsine inherit cheyunnu
    //userinu venda models aanu next

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'mover'], required: true },
    profileImage: { type: String, },
    profileImageUrl: { type: String }
})

module.exports = mongoose.model('user', userSSchema)