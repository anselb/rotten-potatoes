var express = require('express')
var app = express()
var exphbs = require('express-handlebars')
var mongoose = require('mongoose')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true, })

//mock array of porjects
// var reviews = [
//     { title: "Great Review" },
//     { title: "Next Review" },
//     { title: "Final Review"}
// ]

var Review = mongoose.model('Review', {
    title: String
})

// app.get('/', function(req, res) {
//     res.render('home', {msg: 'Hello World!'})
// })

app.get('/', function (req,res) {
    Review.find(function(err, reviews) {
        if (err) {
            console.log(err)
            return
        }
        res.render('reviews-index', {reviews: reviews})
    })
})

app.get('/reviews/new', function (req, res) {
    res.render('reviews-new', {})
})

app.listen(3000, function(){
    console.log('Portfolio App listening on port 3000!')
})
