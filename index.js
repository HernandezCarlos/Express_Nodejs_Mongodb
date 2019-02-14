const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true })
        .then(() => console.log('db esta conectada'))
        .catch((err) => console.log(err))

const indexRutas = require('./routes/index')

//settings
app.set('port',process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views')) /* Especifica la ruta para las vistas */ 
app.set('view engine','ejs')

//middleware
app.use(bodyParser.json()) /* parse application/json */
app.use(bodyParser.urlencoded({ extended: false })) /* parse application/x-www-form-urlencoded */


//routes
app.use(indexRutas)


app.listen(app.get('port'), () => console.log('Servidor corriendo en el puerto ' + app.get('port')))
