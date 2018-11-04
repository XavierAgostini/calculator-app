import React from 'react'
import './CalculatorDisplay.module.css'

const CalculatorDisplay = (props) => (
  <div className="calc-display">{props.displayNum}</div>
)
export default CalculatorDisplay