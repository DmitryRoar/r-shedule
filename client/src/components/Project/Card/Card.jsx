import React, {useRef} from 'react'
import classes from './Card.module.scss'

export const Card = ({onCard, id}) => {
  const cardRef = useRef('')

  const submitHandler = event => {
    event.preventDefault()
    const card = cardRef.current.value
    console.log('card input: ', card)
  }

  return (
    <form onSubmit={submitHandler} className={classes.Form}>
      <textarea ref={cardRef}/>
      <div className={classes.Action}>
        <div className={classes.ActionMain}>
          <div className={classes.SubmitButton}>
            <button
              type="submit"
            >
              Добавить карточку
            </button>
          </div>

          <button
            type="button"
            onClick={onCard.bind(null, id)}
            className={classes.Remove}
          >
            &times;
          </button>
        </div>

        <div className={classes.ActionMore}>
          <button>
            <i className="fas fa-ellipsis-h"/>
          </button>
        </div>
      </div>
    </form>
  )
}
