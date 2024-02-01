import { createRoot } from 'react-dom/client'
import {
  type EditorMessageEvents,
  PreviewWrapper,
  AddButton,
} from '../src/VisualEditor'
import { useEffect, useState } from 'react'

customElements.define('ve-wrapper', PreviewWrapper)
customElements.define('ve-add', AddButton)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      've-wrapper': any
      've-add': any
    }
  }
}

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    const listener = (message: MessageEvent<EditorMessageEvents>) => {
      if (message.data.type === 've-data') {
        setData(message.data.payload)
      }
    }
    window.addEventListener('message', listener, false)
    return () => window.removeEventListener('message', listener)
  }, [])

  return (
    <div>
      {data.map((item) => (
        <ve-wrapper data-id={item._id} key={item._id}>
          <div style={{ height: 150 }}>Bloc name: {item._name}</div>
        </ve-wrapper>
      ))}
      <ve-add data-index={data.length} />
    </div>
  )
}

createRoot(document.querySelector('#app')).render(<App />)
