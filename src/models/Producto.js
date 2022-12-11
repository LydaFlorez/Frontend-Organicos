const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductoSchema = new Schema({
    palabra: {type: String, required: true},
    tipo: {type: String, required: true},
    significado: {type: String, required: true},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Producto', ProductoSchema);
