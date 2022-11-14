const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const employeesRouter = require('./routers/employeesRouter')
const clientRouter = require('./routers/clientRouter')
const moviesRouter = require('./routers/moviesRouter')
const authRouter = require('./routers/authRouter')

const app = express()

require('./connection/database')

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

app.use(express.json())

app.use(cookieParser());

dotenv.config()

app.use('/employees', employeesRouter)
app.use('/clients', clientRouter)
app.use('/movies', moviesRouter)
app.use('/auth', authRouter)

app.listen(8000)