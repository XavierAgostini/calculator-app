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
          if (newDisplayValue !== 'Not a Number') {
            if (newDisplayValue === '.') newDisplayValue = ''
            else newDisplayValue = ' -' + newDisplayValue
          }
          break
        case '=':
          if (newDisplayValue === '.') newDisplayValue = '.0'
          if (newDisplayValue[0] === '-') newDisplayValue = ` ${newDisplayValue}`
          if (newDisplayValue.length === 0) newDisplayValue = 0

          if (newDisplayValue === 'Not a Number' || this.state.currOperation.includes('Not a Number')) {
            newDisplayValue = 'Not a Number'
          } else {
            newDisplayValue = eval(this.state.currOperation+newDisplayValue)
            if (newDisplayValue === Infinity) newDisplayValue = 'Not a Number' 
          }
          this.setState({currOperation: null, newOperation: false})
          break
        case '%':
          if (newDisplayValue === 'Not a Number') {
            newDisplayValue = 'Not a Number'
          } else {
            if(!!this.state.currOperation) {
              console.log('test',this.state.currOperation)
              if (newDisplayValue === '.') newDisplayValue = 0
              newDisplayValue = this.state.currOperation.slice(0,-1) + '*' + newDisplayValue + '/100'
              
              newDisplayValue = String(eval(newDisplayValue))
            } else {
              newDisplayValue /= 100
              // newDisplayValue = eval(this.state.currOperation+newDisplayValue)
            }
          }
          break
        // for cases: '/', 'x', '+', '-'
        default:
          if(!!this.state.currOperation && !this.newOperation) {
            if (newDisplayValue === 'Not a Number' || this.state.currOperation.includes('Not a Number')) {
              newDisplayValue = 'Not a Number'
            } else {
              if (newDisplayValue.length === 0) newDisplayValue = 0
              if (newDisplayValue[0] === '-') newDisplayValue = ` ${newDisplayValue}`
              if(newDisplayValue === '.') newDisplayValue = 0
              newDisplayValue =  eval(this.state.currOperation+newDisplayValue)
              if (newDisplayValue === Infinity) newDisplayValue = 'Not a Number' 
            }
          }
          if (buttonValue === 'x') buttonValue = '*'
          if(newDisplayValue === '.') buttonValue = '0' + buttonValue

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