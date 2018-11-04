import React from 'react'
import './CalculatorApp.module.css'
import CalculatorButton from './CalculatorButton'
import CalculatorDisplay from './CalculatorDisplay'
export default class CalculatorApp extends React.Component {
  constructor() {
    super()
    this.state = {
      buttons: ['c',7,4,1,0,'/',8,5,2,'.','x',9,6,3,null,'-','+','=']
    }
  }
     
  
  render() {
    return (
      <div className="calc-app">
        <CalculatorDisplay displayNum={4}/>
        <div className="calc-buttons">
          {
            this.state.buttons.map((button, i) => (
              <CalculatorButton key={i} buttonValue={button}/>
            ))
          }
        </div>
      </div>
    )
  }
}