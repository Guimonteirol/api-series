const express = require('express')
const bodyParse = require('body-parser')

const serieRoute = require('./routes/serieRoute')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParse.urlencoded( {extended: false}))

serieRoute(app)

app.get('/', (req, res) => res.send("Funcionou"))

app.listen(port, ()=> console.log("Porta Funcionando"))