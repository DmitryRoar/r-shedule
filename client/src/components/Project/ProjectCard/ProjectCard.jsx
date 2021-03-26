import React from 'react'
import classes from './ProjectCard.module.scss'

import {Card} from '../Card/Card'

export const ProjectCard = ({card, onCard}) => (
  <div className={classes.Wrap}>
    <div className={classes.Headline}>
      <div className={classes.HeadlineText}>
        <h2>{card.title}</h2>
      </div>
      <div className={classes.More}>
        <button>
          <i className="fas fa-ellipsis-h"/>
        </button>
      </div>
    </div>

    <div className={classes.Action}>
      <div className={classes.Button}>
        <button onClick={onCard.bind(null, card.id)}>
          <i className="fas fa-plus"/>
          Добавить карточку
        </button>
      </div>
      <div className={classes.Picture}>
        <button>
          <i className="far fa-images"/>
        </button>
      </div>
    </div>


    {card.active && <Card/>}
  </div>
)