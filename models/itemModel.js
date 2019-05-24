const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let item = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    nonVeg: {
        type: String
    },
    icon_id: {
        type: String
    },
    isSpecial: {
        type: String
    },
    topping_id: {
        type: String
    },
    isImage: {
        type: Number
    },
    type: {
        type: String
    },
    liked: {
        type: Number
    },
    likes: {
        type: Number
    }
})
module.exports = mongoose.model('Item', item);