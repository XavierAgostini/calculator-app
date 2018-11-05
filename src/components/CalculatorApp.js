import React from 'react'
import './CalculatorApp.module.css'
import CalculatorButton from './CalculatorButton'
import CalculatorDisplay from './CalculatorDisplay'

export default class CalculatorApp extends React.Component {
  constructor() {
    super()
    this.state = {
      buttons: ['A/C','+/-','%','/',7,8,9,'x',4,5,6,'-',1,2,3,'+',0,'.','='],
      displayValue: '',
      currOperation: null,
      newOperation: false,
      activeBtn: null
    }
  }

  handleBtnClick = (buttonValue) => {
    let newDisplayValue = this.state.displayValue
    console.log(buttonValue, typeof buttonValue)
    if(buttonValue !== 'A/C') {
      this.setState((state) => {
        return { buttons: ['C'].concat(state.buttons.slice(1,)) }
      })
      this.setState((state) => {
        return {displayValue: newDisplayValue}
      })
    }
    if(typeof buttonValue === 'number' || buttonValue === '.') {
      if(this.state.newOperation) {
        newDisplayValue = ''
        this.setState({newOperation: false})
      }
      newDisplayValue += String(buttonValue)
    } else {
      switch (buttonValue) {
        case 'A/C':
          newDisplayValue = '' 
          this.setState({currOperation: null})
          break
        case 'C':
          newDisplayValue = ''
          this.setState((state) => {
            return {
              buttons: ['A/C'].concat(state.buttons.slice(1,)),
              activeBtn: null
            }
          })
          break
        case '+/-':
          if (newDisplayValue !== 'Not a Number') {
            if (newDisplayValue === '.') newDisplayValue = ''
            else if (newDisplayValue !== '0') newDisplayValue = ' -' + newDisplayValue
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
          this.setState({currOperation: null, newOperation: false, activeBtn: null})
          break
        case '%':
          if (newDisplayValue === 'Not a Number') {
            newDisplayValue = 'Not a Number'
          } else {
            if(!!this.state.currOperation) {
              console.log('test',this.state.currOperation)
              if (newDisplayValue === '.') newDisplayValue = '0'
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
          this.setState({
            activeBtn: buttonValue
          })
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

          if (!!newDisplayValue) {
            console.log('a')
            this.setState({
              currOperation: newDisplayValue + buttonValue,
              newOperation: true
            })
          } else {
            console.log('b')
            this.setState({
              currOperation: '0' + buttonValue,
              newOperation: true
            })
          }
      }
    }
    
    this.setState((state) => {
      return {displayValue: newDisplayValue}
    })
  }
  handleKeyPress = (event) => {
    console.log(event.key)
    let key = event.key
    if (!!Number(key)) key = Number(key)
    if(key === 'Enter') key = '='
    if(this.state.buttons.indexOf(key) !== -1) {
      this.handleBtnClick(key)
    }
  }
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this))
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress.bind(this))
  }
  render() {
    return (
      <div className="calc-app" onKeyPress={this.handleKeyPress}>
        <CalculatorDisplay displayNum={this.state.displayValue}/>
        <div className="calc-buttons">
          {
            this.state.buttons.map((button, i) => (
              <CalculatorButton key={i} activeBtn={this.state.activeBtn===button} buttonValue={button} handleBtnClick={this.handleBtnClick}/>
            ))
          }
        </div>
      </div>
    )
  }
}