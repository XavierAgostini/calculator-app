import React from 'react'
import './CalculatorButton.module.css'

export default class CalculatorButton extends React.Component {
  constructor(props) {
    super(props)
  }
  buttonClass = () => {
    let buttonValue = this.props.buttonValue
    let buttonClass = 'calculator-btn'
    if (buttonValue === 0) {
      buttonClass += ' bigger-btn'
    }
    return buttonClass
  }
  btnClicked = () => {
    this.props.handleBtnClick(this.props.buttonValue)
  }
  render () {
    
    return (
      <div className={this.buttonClass()} onClick={this.btnClicked}>
        {this.props.buttonValue}
      </div>
    )
  }
} 