/* eslint-disable */
// @ts-nocheck

import React from 'react'

export default class TestReactClassComponentLifeCycle extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(`getDerivedStateFromProps >> nextProps`, nextProps)
    console.log(`getDerivedStateFromProps >> prevState`, prevState)
    return null
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(`shouldComponentUpdate >> nextProps`, nextProps)
    console.log(`shouldComponentUpdate >> nextState`, nextState)
    return true
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div>
          [Câu hỏi phỏng vấn] Gọi react class ra xem constructor chạy khi nào, những hàm còn lại chạy khi nào (nói chung
          là test react life cycle) để giải thích xem có nên cho side effect vào constructor không
        </div>
        <div>count: {this.state.count}</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>inc</button>
      </div>
    )
  }
}
