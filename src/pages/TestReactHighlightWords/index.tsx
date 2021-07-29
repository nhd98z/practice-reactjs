import React from 'react'
import Highlighter from 'react-highlight-words'

export default function TestReactHighlightWords() {
  return (
    <div>
      <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={['and', 'or', 'the']}
        textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
      />
    </div>
  )
}
