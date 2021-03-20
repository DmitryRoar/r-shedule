import React from 'react'

export const Input = React.forwardRef(({
  className, 
  text, 
  type = 'text',
  ...rest
}, ref) => (
    <div className={className}>
      <label>{text}</label>
      <input {...rest} type={type} ref={ref} />
    </div>
))