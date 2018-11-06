import React from 'react'
import './Display.module.css'

const Display = (props) => {
  const renderNumber = (num) => {
    if (num.length===0) return '0'
    return num
  }
  return (
    <div className="calc-display">{renderNumber(props.displayNum)}</div>
  )
}
export default Display