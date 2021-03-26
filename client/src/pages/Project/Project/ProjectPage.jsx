import React, {useState} from 'react'
import classes from './ProjectPage.module.scss'

import {ProjectCard} from '../../../components/Project/ProjectCard/ProjectCard'

export const ProjectPage = () => {
  const [cards, setCards] = useState([
    {title: 'Нужно сделать', active: false, id: 1},
    {title: 'В процессе', active: false, id: 2},
    {title: 'Готово', active: false, id: 3}
  ])
  const cardHandler = (id) => {
    setCards(prev => prev
      .map(p => {
        p.id === id ? p.active = true : p.active = false 
        return p
      })
    )
  }

  return (
    <div className={classes.Wrap}>
      <div className={classes.CardWrap}>
        {cards.map((card, idx) => (
          <ProjectCard
            key={idx}
            onCard={cardHandler}
            card={card}
          />
        ))}
      </div>
    </div>
  )
}
