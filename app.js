const path = require('path')

const express = require('express')

const app = express()

app.use(express.static(public))

app.get('/', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'index.html')
    res.sendFile(htmlFilePath)
})

app.get('/about', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'about.html')
    res.sendFile(htmlFilePath)
})

app.get('/aml-kyc', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'aml-kyc.html')
    res.sendFile(htmlFilePath)
})

app.get('/contact-us', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'contact-us.html')
    res.sendFile(htmlFilePath)
})

app.get('/dashboard', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'dashboard.html')
    res.sendFile(htmlFilePath)
})

app.get('/deposit', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'deposit.html')
    res.sendFile(htmlFilePath)
})

app.get('/education', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'education.html')
    res.sendFile(htmlFilePath)
})

app.get('/faq', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'FAQ.html')
    res.sendFile(htmlFilePath)
})

app.get('/help', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'help.html')
    res.sendFile(htmlFilePath)
})

app.get('/history', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'history.html')
    res.sendFile(htmlFilePath)
})

app.get('/login', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'login.html')
    res.sendFile(htmlFilePath)
})

app.get('/markets', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'markets.html')
    res.sendFile(htmlFilePath)
})

app.get('/news', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'news.html')
    res.sendFile(htmlFilePath)
})

app.get('/packages', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'packages.html')
    res.sendFile(htmlFilePath)
})

app.get('/settings', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'settings.html')
    res.sendFile(htmlFilePath)
})

app.get('/signal', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'signal.html')
    res.sendFile(htmlFilePath)
})

app.get('/signup', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'signup.html')
    res.sendFile(htmlFilePath)
})

app.get('/transfer', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'transfer.html')
    res.sendFile(htmlFilePath)
})

app.get('/withdraw', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'withdraw.html')
    res.sendFile(htmlFilePath)
})

app.get('/404', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', '404.html')
    res.sendFile(htmlFilePath)
})

app.listen(3000)