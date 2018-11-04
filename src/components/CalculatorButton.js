import React from 'react'
import './CalculatorButton.module.css'

export default class CalculatorButton extends React.Component {
  constructor(props) {
    super(props)
  }
  buttonClass = () => {
    let buttonValue = this.props.buttonValue
    let buttonClass = 'calculator-btn'
    if (buttonValue === '+' || buttonValue === '=') {
      buttonClass += ' bigger-btn'
    }
    return buttonClass
  }
  render () {
    
    return (
      <div className={this.buttonClass()}>{this.props.buttonValue}</div>
    )
  }
} 