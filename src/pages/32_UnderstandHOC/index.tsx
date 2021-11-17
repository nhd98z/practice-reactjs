import { Component } from 'react'

const state = { msg: 'Hello HOC.' }

function mapStateToProps(state: { msg: string }) {
  return { msg: state.msg }
}

function connect(mapStateToPropsFn: any) {
  return (WrappedComponent: any) => {
    return class Connect extends Component {
      render() {
        return <WrappedComponent {...this.props} {...mapStateToPropsFn(state)} />
      }
    }
  }
}

class Alice extends Component<{ msg: string }> {
  render() {
    return <h1>{this.props.msg ?? ''}</h1>
  }
}

class Bob extends Component<{ msg: string }> {
  render() {
    return <h3>{this.props.msg ?? ''}</h3>
  }
}

const ConnectedAlice = connect(mapStateToProps)(Alice)
const ConnectedBob = connect(mapStateToProps)(Bob)

export default class UnderstandHOC extends Component {
  render() {
    return (
      <>
        <ConnectedAlice />
        <ConnectedBob />
      </>
    )
  }
}
