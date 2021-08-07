// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { PureComponent } from 'react'

let renderCountCon = 0
class Con extends PureComponent<any> {
  render() {
    const { count } = this.props
    console.log('Con render time:', ++renderCountCon)
    return (
      <div>
        <p>Con count: {count}</p>
      </div>
    )
  }
}

let renderCountBo = 0
class Bố extends PureComponent {
  constructor(props: any) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  aFunction = () => {
    // nothing
  }

  render() {
    console.log('Bố render time:', ++renderCountBo)
    return (
      <div>
        <p>Bố count: {this.state.count}</p>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 })
          }}
        >
          inc count
        </button>
        <hr />
        {/*<Con count={this.state.count} />*/}
        <Con aFunction={this.aFunction} />
      </div>
    )
  }
}

export default function TestClassComponentRerender() {
  return (
    <div>
      <h1>TestClassComponentRerender</h1>
      <h4>Test khi nào class component bị re-render.</h4>
      <hr />
      <Bố />
    </div>
  )
}
