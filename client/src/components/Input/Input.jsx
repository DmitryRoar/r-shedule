import React from 'react'

export const Input = React.forwardRef(({
  className, 
  text, 
  type = 'text',
}, ref) => (
    <div className={className}>
      <label>{text}</label>
      <input type={type} ref={ref} />
    </div>
))