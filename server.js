const mongoose = require('mongoose')
const config = require('config')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const app = express()

const passportMiddleware = require('./middlewares/passport.middleware')
const userMiddleware = require('./middlewares/user.middleware')

const authRouter = require('./routes/auth.route')
const projectRouter = require('./routes/project.route')

const PORT = process.env.PORT || 4315
const mongoName = config.get('MONGO_NAME')
const mongoPassword = config.get('MONGO_PASSWORD')
const mongoUri = `mongodb+srv://${mongoName}:${mongoPassword}@cluster0.jy9hi.mongodb.net/shedule`

app.use(passport.initialize())
passportMiddleware(passport)

app
  .use(morgan('dev'))
  .use(express.json({extended: true}))
  .use(cors({
    original: config.get('CLIENT_URL'),
    credentials: true,
    origin: true
  }))
  .use(cookieParser())
  .use(helmet())
  .use('/api/auth', authRouter)
  .use('/api/project', userMiddleware, projectRouter)

const start = async () => {
  try {
    await mongoose.connect(mongoUri, {
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