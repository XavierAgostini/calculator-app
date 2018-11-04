import React from 'react'
import './CalculatorApp.module.css'
import CalculatorButton from './CalculatorButton'
import CalculatorDisplay from './CalculatorDisplay'
export default class CalculatorApp extends React.Component {
  constructor() {
    super()
    this.state = {
      buttons: ['c',7,4,1,0,'/',8,5,2,'.','x',9,6,3,null,'-','+','='],
      displayValue: null
    }
  }
     
  handleBtnClick = (buttonValue) => {
    console.log(typeof buttonValue)
    if(typeof buttonValue === 'number') {
      if (this.state.displayValue !== null) {
        this.setState((state) => {
          return {displayValue: state.displayValue.concat(String(buttonValue))}
        })
      } else {
        this.setState({displayValue: String(buttonValue)})
      }
    } else if (buttonValue === 'c') {
      this.setState({displayValue: null})
    } else if (buttonValue === 'x') {
      this.setState((state) => {
        return {displayValue: state.displayValue.concat('*')}
      })
    } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '/') {
      this.setState((state) => {
        return {displayValue: state.displayValue.concat(String(buttonValue))}
      })
    } else if (buttonValue === '.') {
      this.setState((state) => {
        return {displayValue: state.displayValue.concat('.')}
      })
    }
    else if (buttonValue === '=') {
      this.setState((state) => {
        return {displayValue: String(eval(state.displayValue))}
      })
    }
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