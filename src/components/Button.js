import React from 'react'
import './Button.module.css'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }
  buttonClass = () => {
    let buttonValue = this.props.buttonValue
    let buttonClass = 'calculator-btn'
    if (buttonValue === 0) {
      buttonClass += ' bigger-btn'
    }
    if (this.props.activeBtn) {
      buttonClass += ' active-btn'
    }
    if (buttonValue === 'A/C' || buttonValue === 'C' || buttonValue === '+/-' || buttonValue === '%') {
      buttonClass += ' operation-btn'
    }
    if (buttonValue === '/' || buttonValue === 'x' || buttonValue === '+' || buttonValue === '-' || buttonValue === '=') {
      buttonClass += ' operator-btn'
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