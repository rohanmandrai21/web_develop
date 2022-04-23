require('dotenv').config();
const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
const auth=require('./middleware/auth');
require("./db/conn");
const User = require('./models/web_develop');
const UserRegister = require('./models/web_develop')
const port = process.env.PORT || 3000;
const static_path = (path.join(__dirname, "../css_img"));
const template_path = (path.join(__dirname, "../tamplates/views"));
const partial_path = (path.join(__dirname, "../tamplates/partials"));

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partial_path);

app.use(express.static(static_path));
//rounting
app.get('/', (req, res) => {
    res.render('index')
});
app.get('/about', auth,  (req, res) => {
    res.render('about')
});
app.get('/contact', (req, res) => {
    res.render('contact')
});
app.get('/registration', (req, res) => {
    res.render('register')
});
app.post('/registration', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (password == cpassword) {
            const NewUser = new UserRegister({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                cpassword: cpassword
            });
            const token= await NewUser.generate();
            res.cookie("webcookie",token, {
                expires:new Date(Date.now() + 100000),
                httpOnly:true
            });
           
            const NewUsered = await NewUser.save();
            res.status(201).render('index');
        } else {
            res.status(400).send('password is not same')
        }


    } catch (error) {
        res.status(501).send(error)
    }
});
app.post('/contact', async (req, res) => {
    try {
        // res.send(req.body);
        const NewUser1 = new User({
            firstname: req.body.firstname,
            phone: req.body.phone,
            email: req.body.email,
            message: req.body.message
        })
        const NewUser1ed = await NewUser1.save();
        console.log('2nd')
        res.render('index')
    } catch (error) {
        res.status(501).send(error)
    }
});

app.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = await UserRegister.findOne({ email: email });
        // console.log(username)
        const ismatch = await bcrypt.compare(password, username.password);
        // console.log(ismatch)
        console.log('hello bhai2')
        const token= await username.generate();
        // console.log(token)
        res.cookie("webcookie",token, {
            expires:new Date(Date.now() + 100000),
            httpOnly:true
        });
        // console.log('hello bhai')
        if (ismatch) {
            res.render('about')
        } else {
            res.send('you have enter invalide data')
        }
    } catch (error) {
        res.status(501).send(error)
    }
});


app.listen(port, ()=>{
    console.log(`connection on http://localhost:${port}`)
})
// app.listen(port, '192.168.0.107', ()=>{
//     console.log(`connection on http://192.168.0.107:${port}`)
// })