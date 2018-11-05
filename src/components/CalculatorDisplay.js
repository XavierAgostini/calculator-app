import React from 'react'
import './CalculatorDisplay.module.css'

const CalculatorDisplay = (props) => {
  const renderNumber = (num) => {
    if (num.length===0) return '0'
    return num
  }
  return (
    <div className="calc-display">{renderNumber(props.displayNum)}</div>
  )
}
export default CalculatorDisplay