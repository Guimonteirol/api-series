const fs = require('fs')
const { join } = require('path')

const arquivo = join(__dirname, 'series.json')

const getSeries = () => {
    const data = fs.existsSync(arquivo)
    ? fs.readFileSync(arquivo)
    : []
    try{
        return JSON.parse(data)
    }
    catch (error){
        return []
    }
}

const saveSerie = (series) => fs.writeFileSync(arquivo, JSON.stringify(series, null, '\t'))

 const serieRoute = (app) => {
     app.route('/series/:id?')
     .get((req, res) => {
        const series = getSeries()

        res.send({series})
     })
     .post((req, res) =>{
         const series = getSeries()

         series.push(req.body)
         saveSerie(series)

         res.status(201).send('OK')
     })
     .put((req, res) =>{
        const series = getSeries();

        saveSerie(series.map(serie =>{
            if( serie.id === req.params.id){
                return{
                    ...serie,
                    ...req.body
                }
            }
            return serie
        }))

        res.status(200).send('OK')
     })
     .delete((req, res) =>{
         const series = getSeries();

         saveSerie(series.filter(serie => serie.id !== req.params.id))
        res.status(200).send('OK')
   })
 }

 module.exports = serieRoute