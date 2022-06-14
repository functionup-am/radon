const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const orderModelSchema = new mongoose.Schema  ({
userId: {
    type: ObjectId,
    ref: 'UserModel'
},
productId: {
    type: ObjectId,
    ref: 'Product'
},
amount: Number,
date: {
    type: String,
    required: true
}
}, {timestamps: true });

module.exports = mongoose.model('Order', orderModelSchema)