const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPAth = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPAth)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jack' 
    })
})

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About',
        name: 'Jack' 
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
        title: 'Help',
        helpMsg: 'Message for the help page',
        name: 'Jack' 
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a address"
        })
    } 

    geocode(req.query.address,(error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error:error})
            } 
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    } 
    res.send({
        products: []
    })
})

// app.com
app.get('/help/*', (req, res) => {
    res.render('error',{
        title: 'Error 404',
        name: 'Jack C',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'Jack C',
        errorMsg: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})