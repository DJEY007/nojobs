const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine, views and partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setting up static directory to serve static content
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Nojobs',
        name: 'Dhiraj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dhiraj Jha'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Dhiraj Jha',
        msg: 'How to get Help!'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dhiraj Jha',
        msg: 'Help article not found!'
    })
})


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({ error: 'You must provide a serch keywork'})
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dhiraj Jha',
        msg: 'The page you are looking for is not found!'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})