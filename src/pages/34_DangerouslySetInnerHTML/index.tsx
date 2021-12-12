import { useRef } from 'react'

export default function DangerouslySetInnerHTML() {
  const ref = useRef<HTMLDivElement>(null)

  setTimeout(() => {
    if (ref.current) {
      ref.current.innerHTML = `<h1 onmouseenter="(() => {alert('Hacked.')})()">This element rendered by innerHTML. Hover me!</h1>`
    }
  }, 1000)

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: `<script>alert("XSS not work in React App.")</script>`,
        }}
      />
      <div ref={ref} />
    </div>
  )
}
