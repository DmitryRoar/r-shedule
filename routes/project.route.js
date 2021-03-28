const {Router} = require('express')
const router = Router()

const ProjectSchema = require('../schemas/project.schema')
const UserSchema = require('../schemas/user.schema')

router.post('/create', async (req, res) => {
  const {name, desc, date, users} = req.body
  if (!users.length) {
    users.push({email: req.user.email, rule: 'Owner'})
  }
  if (
    name === '' ||
    desc === '' ||
    date === ''
  ) {
    res.status(411).send('Для создания проекта необходимо заполнить все поля')
  } else {
    const project = new ProjectSchema({
      name, desc, date, users, ownerId: req.user._id
    })
    await project.save()
    res.json({msg: 'Проект успешно создан!'}) 
  }
})

router.get('/', async (req, res) => {
  if (req.user === undefined) {
    res.send([])
  } else {
    res.send(await ProjectSchema.find({$or: [
      {'users.email': req.user.email}, {ownerId: req.user._id}
    ]}))
  }
})

router.get('/emails', async (req, res) => {
  res.send(await UserSchema.find({}).select('email'))
})

module.exports = router
