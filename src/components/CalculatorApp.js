import React from 'react'
import './CalculatorApp.module.css'
import CalculatorButton from './CalculatorButton'
import CalculatorDisplay from './CalculatorDisplay'
export default class CalculatorApp extends React.Component {
  constructor() {
    super()
    this.state = {
      buttons: ['C','+/-','%','/',7,8,9,'x',4,5,6,'-',1,2,3,'+',0,'.','='],
      displayValue: '',
      currOperation: null,
      newOperation: false
    }
  }
  handleBtnClick = (buttonValue) => {
    let newDisplayValue = this.state.displayValue
    if(typeof buttonValue === 'number' || buttonValue === '.') {
      if(this.state.newOperation) {
        newDisplayValue = ''
        this.setState({newOperation: false})
      }
      newDisplayValue += String(buttonValue)
    } else {
      switch (buttonValue) {
        case 'C':
          newDisplayValue = '' 
          this.setState({currOperation: null})
          break
        case '+/-':
          if (newDisplayValue[0] === '-') {
           newDisplayValue = newDisplayValue.substr(1)
          } else {
            console.log()
            newDisplayValue = '-' + newDisplayValue
          } 
          break
        case '=':
          newDisplayValue = eval(this.state.currOperation+newDisplayValue)
          this.setState({currOperation: null, newOperation: false})
        case '%':
          break
        // for cases: '/', 'x', '+', '-'
        default:
          if(!!this.state.currOperation && !this.newOperation) {
            newDisplayValue = eval(this.state.currOperation+newDisplayValue)
          }
          this.setState({
            currOperation: newDisplayValue + buttonValue,
            newOperation: true
          })   
      }
    }
    this.setState((state) => {
      return {displayValue: newDisplayValue}
    })
      
  }
  render() {
    return (
      <div className="calc-app">
        <CalculatorDisplay displayNum={this.state.displayValue}/>
        <div className="calc-buttons">
          {
            this.state.buttons.map((button, i) => (
              <CalculatorButton key={i} buttonValue={button} handleBtnClick={this.handleBtnClick}/>
            ))
          }
        </div>
      </div>
    )
  }
}