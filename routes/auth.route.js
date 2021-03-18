const {Router} = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const {validate, Joi} = require('express-validation')

const UserSchema = require('../schemas/user.schema')

const loginValidation = {
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{6,30}/)
      .required()
  })
}

router.post('/login', validate(loginValidation, {}, {}), async (req, res) => {
  try {
    const {email, password} = req.body
    const candidate = await UserSchema.findOne({email})
  
    if (!candidate) {
      throw new Error('Такой Email не зарегестрирован в системе')
    }
  
    const areSame = await bcrypt.compare(password, candidate.password)
    if (areSame) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, config.get('JWT_SECRET'), {expiresIn: 60 * 60})

      res.header('Authorization', `Bearer ${token}`)

      res.cookie('user', '321313213321', {
        httpOnly: false
      })

      // req.session.user = {
      //   email: candidate.email, 
      //   date: candidate.date,
      //   id: candidate._id
      // }
      // req.session.isAuth = true 
      // req.session.save(err => {
      //   if (err) throw err
      // }) 



      res.json({
        email: candidate.email, 
        name: candidate.name,
        id: candidate._id,
        token: `Bearer ${token}`
      })
    } else {
      res.status(406).send('Где-то вы соврали')
    }
  } catch (err) {
    console.log('[LOGIN_ROUTE]: ', err)
  }
})

router.post('/sign-up', validate(loginValidation, {}, {}), async (req, res) => {
  try {
    const {email, password, name} = req.body
    if (req.body === undefined) {
      res.status(411).send('Для регистрации необходимо заполнить все поля')
    }
    const candidate = await UserSchema.findOne({email})
    if (candidate) {
      res.status(409).send('Такой Email уже занят. Попробуйте другой.')
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new UserSchema({
      email, 
      name,
      password: hashPassword,
      date: new Date().toLocaleDateString()
    })
    await user.save()
    res.json({msg: 'Sign-Up!'})
  } catch (err) {
    console.log('[SIGNUP_ROUTE]: ', err)
  }
})

router.get('/logout', (req, res) => {
  // req.session.destroy(err => {
  //   if (err) console.log('[LOGOUT_ROUTE]', err)

  //   res.json({msg: 'Logout!'})
  // })
  res.json({msg: 'Logout!'})
})

module.exports = router