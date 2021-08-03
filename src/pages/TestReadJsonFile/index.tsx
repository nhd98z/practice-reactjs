import React from 'react'
import JSON_DATA from './data.json'

const data: { key: string; value: string }[] = []
for (const i in JSON_DATA) data.push({ key: i, value: (JSON_DATA as any)[i] })

export default function TestReadJsonFile() {
  return (
    <div>
      <p>TestReadJsonFile</p>
      {data.map((item, index) => (
        <div key={index}>
          {item.key}: {item.value}
        </div>
      ))}
    </div>
  )
}
