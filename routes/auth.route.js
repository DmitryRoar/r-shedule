const {Router} = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const {validate, Joi} = require('express-validation')

const userSchema = require('../schemas/user.schema')

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
    const candidate = await userSchema.findOne({email})
  
    if (!candidate) {
      throw new Error('Email exists')
    }
  
    const areSame = await bcrypt.compare(password, candidate.password)
    if (areSame) {
      req.session.user = candidate,
      req.session.isAuth = true
      req.session.save(err => {
        if (err) throw new Error(err)
      })
    } else {
      res.status(406).send('Где-то вы соврали')
    }

    res.json({
      email: candidate.email, 
      name: candidate.name,
      id: candidate._id
    })
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
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new userSchema({
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
  req.session.destroy(err => {
    if (err) console.log('[LOGOUT_ROUTE]', err)

    res.json({msg: 'Logout!'})
  })
})

module.exports = router