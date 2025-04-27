require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectToMongo = require('./config/mongodb')
const adminRouter = require('./routes/adminRoutes')
const doctorRouter = require('./routes/doctorRoutes')
const userRouter = require('./routes/userRotes')
const cors = require('cors')
const path = require('path');

app.use(cors())

connectToMongo().then(() => console.log('connected to mongoose')).catch((e) => console.log(e))
let port = process.env.PORT || 8080


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(port,() => {
    console.log('listening');
})
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)


app.get('/',(req,res) => {
    res.send('all set')
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "path-to-your-index.html"));
  });
  