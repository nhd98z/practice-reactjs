import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'

// Model the application state.
class Timer {
  secondsPassed = 0

  constructor() {
    makeAutoObservable(this)
  }

  increase() {
    this.secondsPassed += 1
  }

  reset() {
    this.secondsPassed = 0
  }
}

const myTimer1 = new Timer()
const myTimer2 = new Timer()

setInterval(() => {
  myTimer1.increase()
}, 1000)

setInterval(() => {
  myTimer2.increase()
}, 2000)

const TimerView = observer((props: any) => {
  return <button onClick={() => props.timer?.reset()}>Seconds passed: {props.timer?.secondsPassed}</button>
})

export default function PracticeMobX() {
  return (
    <>
      <TimerView timer={myTimer1} />
      <TimerView timer={myTimer2} />
    </>
  )
}
