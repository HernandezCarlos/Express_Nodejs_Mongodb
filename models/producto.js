const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productoSchema = new Schema({
    categoria: String,
    nombre: String ,
    precio: Number,
    cover: String
})

module.exports = mongoose.model('productos' , productoSchema)