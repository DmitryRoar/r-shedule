const {Router} = require('express')
const router = Router()

const ProjectSchema = require('../schemas/project.schema')

router.post('/create', async (req, res) => {
  if (req.body === undefined) {
    res.status(411).send('Для создания проекта необходимо заполнить все поля')
  }
  const {name, desc, date, users} = req.body
  users.forEach(u => u.userId = req.user)

  const project = new ProjectSchema({
    name, desc, date, users
  })
  await project.save()
  res.json({msg: 'Проект успешно создан!'}) 
})

router.get('/', async (req, res) => {
  if (req.user === undefined) {
    res.send([])
  } else {
    res.send(await ProjectSchema.find({'users.email': req.user.email}))
  }
})

module.exports = router