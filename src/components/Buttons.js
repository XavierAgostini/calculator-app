import React from 'react'
import Button from './Button'

export default class Buttons extends React.Component {
  render () {
    return (
      <div className="calc-buttons">
        {
          this.props.buttons.map((button, i) => (
            <Button key={i} activeBtn={this.props.activeBtn===button} buttonValue={button} handleBtnClick={this.props.handleBtnClick}/>
          ))
        }
      </div>
    )
  }
}