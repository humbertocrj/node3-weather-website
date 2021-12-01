const path = require('path')
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();
const port = process.env.PORT || 3000;

// console.log(__dirname)
// console.log(__filename)

// Define path to express config
const publicDiretoryPath = path.join(__dirname, '../public/')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDiretoryPath))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Andrew'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew'
    })
})
app.get('/weather', (req, res) => {

    // if(!req.query.address){
    //     return res.send({error: 'You must provide an address'})
    // }

    // res.send({
    //     forecast: "Sunny. It feels like 32°C",
    //     location:"Brasilia",
    //     address: req.query.address
    // })

    let address = req.query.address


    if (!address) {
        return res.send({ error: "You must provide a word to search." })
    }

    geocode(address, (error, {lat, lon, location} = {}) => {

        if (error) {
            return res.send({ error: error })
        }
        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 - Help article not found..",
        name: 'Humberto C. Ramos',
        message: "Try another one."
    })
})

app.get('/product', (req, res) => {

    if (!req.query.search) {
        return res.send({ 'error': 'You must provide a search term!' })

    }

    res.send({ products: [] })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 - Page not found.",
        name: 'Humberto C. Ramos',
        message: "Try another URL."
    })
})
app.listen(port, () => {
    console.log('Server is up on port 3000.')
})