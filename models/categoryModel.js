const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let category = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    isImage: {
        type: Number,
        required: true
    },
    isCnt: {
        type: Number,
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
});
module.exports = mongoose.model('Category', category);