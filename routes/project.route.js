const {Router} = require('express')
const router = Router()

const ProjectSchema = require('../schemas/project.schema')
// const UserSchema = require('../schemas/user.schema')

router.post('/create', async (req, res) => {
  if (req.body === undefined) {
    res.status(411).send('Для создания проекта необходимо заполнить все поля')
  }
  const {name, desc, date, users} = req.body

  const project = new ProjectSchema({
    name, desc, date, users
  })
  await project.save()
  res.json({msg: 'Проект успешно создан!'}) 
})

router.get('/', async (req, res) => {
  console.log('cookie: ', req.user)
  if (req.user === undefined) {
    res.json({msg: 'У вас нет проектов'})
  } else {
    return await ProjectSchema.find({email: req.user.email}) 
  }
})

module.exports = router