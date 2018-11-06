import React from 'react'
import ReactDOM from 'react-dom'
import './CalculatorApp.module.css'
import Buttons from './Buttons'
import Display from './Display'

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
    // get calculator display value from state
    let newDisplayValue = this.state.displayValue

    // depending on what button is clicked perform different actions
    if(buttonValue !== 'A/C') {
      // When any key on the calculator is pressed besides 'A/C' (all-clear, which clears the whole state), 'A/C' becomes the 'C' (clear) button
      // which just clears the current display value
      this.setState((state) => {
        return { buttons: ['C'].concat(state.buttons.slice(1,))}
      })
      // this.setState((state) => {
      //   return {displayValue: newDisplayValue}
      // })
    }
    // when a number or decimal key is pressed concat display string with key
    // unless an operation button has been clicked right before 
    if(typeof buttonValue === 'number' || buttonValue === '.') {
      if(this.state.newOperation) {
        newDisplayValue = ''
        this.setState({newOperation: false})
      }
      newDisplayValue += String(buttonValue)
    } else {
      switch (buttonValue) {
        case 'A/C':
          // reset state
          newDisplayValue = '' 
          this.setState({currOperation: null, activeBtn: null})
          break
        case 'C':
          // clear current display value and toggle button back to 'A/C'
          newDisplayValue = ''
          this.setState((state) => {
            return {
              buttons: ['A/C'].concat(state.buttons.slice(1,))
            }
          })
          break
        case '+/-':
          // handle switching numbers from + to -
          if (newDisplayValue !== 'Not a Number') {
            if (newDisplayValue === '.') newDisplayValue = ''
            else if (newDisplayValue !== '0') newDisplayValue = ' -' + newDisplayValue
          }
          break
        case '=':
          // clean up display value before evaluating expression
          if (newDisplayValue === '.') newDisplayValue = '.0'
          if (newDisplayValue[0] === '-') newDisplayValue = ` ${newDisplayValue}`
          if (newDisplayValue.length === 0) newDisplayValue = 0

          // handle case of calculator returning a non-number, i.e. infinity
          if (newDisplayValue === 'Not a Number' || this.state.currOperation.includes('Not a Number')) {
            newDisplayValue = 'Not a Number'
          } else {
            newDisplayValue = eval(this.state.currOperation+newDisplayValue)
            if (newDisplayValue === Infinity) newDisplayValue = 'Not a Number' 
          }
          this.setState({currOperation: null, newOperation: false, activeBtn: null})
          break
        case '%':
          // calculator % sign works in a non-intuitive way
          // i.e: 10 + 10% = 10(1+10/100) = 11
          // i.e: 10% = 10/100 = 1
          // i.e: 100 - 10% = 100(1-10/100) = 90
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
            }
          }
          break
        // for cases: '/', 'x', '+', '-'
        default:
          // this state var is used to denote on calculator keypad which operation key (x,/,+,-) user pressed last
          // in case they forgot
          this.setState({
            activeBtn: buttonValue
          })
          // if user is chaining operations, return intermediate value between operatoins
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
          // change 'x' button to JS expected '*' sign for multiplications
          if (buttonValue === 'x') buttonValue = '*'
          // if just '.' entered before operation, need to reformat it to be .0 before evaluation
          if(newDisplayValue === '.') buttonValue = '0' + buttonValue

          // if you click an operation key before entering any values, treat display value as 0
          // i.e: +9 == 0 + 9, *9 == 0*9
          if (!!newDisplayValue) {
            this.setState({
              currOperation: newDisplayValue + buttonValue,
              newOperation: true
            })
          } else {
            this.setState({
              currOperation: '0' + buttonValue,
              newOperation: true
            })
          }
      }
    }
    // after all key presses update the calculator display value
    this.setState((state) => {
      return {displayValue: newDisplayValue}
    })
  }
  
  handleKeyPress = (event) => {
    // get the key code
    let key = event.key
    // format key press keys to expected calculator format
    if (!!Number(key) || key === '0') key = Number(key)
    if(key === 'Enter') key = '='
    if(this.state.buttons.indexOf(key) !== -1) {
      this.handleBtnClick(key)
      // find key's corresponding button and simulate click animation/styling by adding then removing a class
      const node = ReactDOM.findDOMNode(this)
      if (node instanceof HTMLElement) {
        const button = node.querySelectorAll('.calculator-btn')[this.state.buttons.indexOf(key)]
        button.classList.add('simulateBtnClick')
        setTimeout(()=> {
          button.classList.remove('simulateBtnClick')
        }, 100)
      }
    }
  }

  componentWillMount() {
    // listen to key presses to pass to calculator
    document.addEventListener('keydown', this.handleKeyPress.bind(this))
  }
  componentWillUnmount() {
    // remove event listener
    document.removeEventListener('keydown', this.handleKeyPress.bind(this))
  }

  render() {
    return (
      <div className="calc-app" onKeyPress={this.handleKeyPress}>
        <Display displayNum={this.state.displayValue}/>
        <Buttons buttons={this.state.buttons} handleBtnClick={this.handleBtnClick} activeBtn={this.state.activeBtn}/>
      </div>
    )
  }
}