const mongoose = require('mongoose')
const session = require('express-session')
const config = require('config')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {ValidationError} = require('express-validation')
const app = express()

const authRouter = require('./routes/auth.route')

const PORT = process.env.PORT || 4315
const mongoName = config.get('MONGO_NAME')
const mongoPassword = config.get('MONGO_PASSWORD')

app
  .use(morgan('dev'))
  .use(express.json({extended: true}))
  .use(session({
    secret: config.get('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
  }))
  .use(cors({
    original: config.get('CLIENT_URL')
  }))
  .use('/api', authRouter)
  .use((err, _, res) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }
  
    return res.status(500).json(err)
  })

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${mongoName}:${mongoPassword}@cluster0.jy9hi.mongodb.net/shedule`, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  } catch (err) {
    console.log('[MONGOOSE CONNECT]', err)
  }

  app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}`)
  })
}
start()