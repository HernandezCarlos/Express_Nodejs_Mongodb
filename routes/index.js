const ruta = require('express').Router()
const faker = require('faker')

const producto = require('../models/producto')

ruta.get('/',(req, res) =>{
    res.render('index')
})

ruta.get('/agregar-producto',(req, res) =>{
    res.render('productos/agregar-productos')
})

ruta.post('/agregar-producto',(req, res) => {
    const nuevoProducto = new producto()
    nuevoProducto.categoria = req.body.producto_categoria
    nuevoProducto.nombre = req.body.producto_nombre
    nuevoProducto.precio = req.body.producto_precio
    nuevoProducto.cover = faker.image.food(),
    nuevoProducto.save(err => {
        if (err) { throw err}
            res.redirect('/agregar-producto')
    })
})

ruta.get('/productos/:pagina', (req, res, next) => {
    let itemsPorPagina = 9
    let paginas = req.params.pagina || 1
    
    producto.find({})
            .skip((itemsPorPagina * paginas) - itemsPorPagina)
            .limit(itemsPorPagina)
            .exec((err, productos) => {
                producto.count((err, count) => {
                  if (err) return next(err)
                  res.render('productos/productos', {
                    productos,
                    current: paginas,
                    pages: Math.ceil(count/ itemsPorPagina)    
            })
        })
    })
})

ruta.get('/generar-datos',(req,res,next) =>{
    for (let i = 0; i < 90; i++) 
    {
        let nuevoProducto = new producto()
        nuevoProducto.categoria = faker.commerce.department(),
        nuevoProducto.nombre = faker.commerce.productName(),
        nuevoProducto.precio = faker.commerce.price(),
        nuevoProducto.cover = faker.image.image(),
        
        nuevoProducto.save(err => 
        {
            if(err){return next(err)}
        })
    }
    res.redirect('/agregar-producto')
})

module.exports = ruta