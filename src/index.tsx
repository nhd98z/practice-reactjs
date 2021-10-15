import ReactDOM from 'react-dom'
import 'inter-ui/inter.css'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { io } from 'socket.io-client'

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL

if (SOCKET_URL === undefined) {
  throw new Error('REACT_APP_SOCKET_URL not found.')
}

// Run project express-socketio-tutorial.
export const socket = io(SOCKET_URL, {
  autoConnect: false,
})

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
