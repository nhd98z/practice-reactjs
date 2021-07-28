import React, { useState } from 'react'
import faker from 'faker'

import useDebounceByMyself from './useDebounceMyself'

export const fakeNames = Array.from(Array(400), () => {
  return faker.name.findName()
})

export default function ImplementDebounceByMyself() {
  const [text, setText] = useState<string>('')
  const [filteredNames, setFilteredNames] = useState<string[]>(fakeNames)

  const [isReady, cancel] = useDebounceByMyself(
    () => {
      setFilteredNames(fakeNames.filter((name) => name.includes(text)))
    },
    1000,
    [text]
  )

  return (
    <div>
      <p>is ready: {isReady()}</p>
      <button onClick={cancel}>cancel debounce</button>
      <input value={text} onChange={({ currentTarget }) => setText(currentTarget.value)} />
      {filteredNames.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
    </div>
  )
}
