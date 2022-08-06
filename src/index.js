const express = require('express');
const mongoose = require('mongoose')
const app = express();
const db = require('./app/config/db')
const cors = require("cors")
const bodyParser = require('body-parser')

const route = require("./routes")

const URL = "mongodb+srv://Vinh-051102:Vinh-051102@cluster0.1wsqc.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

route(app) 

db.connect(URL)

app.listen(PORT)

