import { createRoot } from 'react-dom/client'
import { Reset } from 'src/components/BaseStyles'
import { EditorMessageEvents } from 'src/components/Preview/PreviewPostMessage'
import { isClientSide } from 'src/functions/browser'
import { PreviewItemWrapper } from 'src/components/Preview/PreviewItemWrapper'

/**
 * Custom element usable within an iframe to get editor capabilities
 *
 * ## Example
 *
 * If you are building the preview using another framework you can wrap with
 * this custom element
 *
 * ```html
 *   <div v-for='bloc in data' :key='bloc._id'>
 *     <bloc-item :data-id='bloc._id'>
 *       <component :is="components[bloc._name]" v-bind='bloc' />
 *     </bloc-item>
 *   </div>
 * ```
 */
export class PreviewWrapper extends (isClientSide()
  ? HTMLElement
  : (class {} as typeof HTMLElement)) {
  isFocused = false
  root: ReturnType<typeof createRoot> | undefined

  referrer = () => {
    return (
      new URL(document.location.toString()).searchParams.get('referrer') ?? ''
    )
  }

  onWrapperClick = () => {
    window.parent.postMessage(
      { type: 've-focus', payload: { id: this.dataset.id, parent: true } },
      this.referrer()
    )
  }

  handleAdd = () => {
    window.parent.postMessage(
      { type: 've-add', payload: { id: this.dataset.id } },
      this.referrer()
    )
  }

  handleDelete = () => {
    window.parent.postMessage(
      { type: 've-remove', payload: { id: this.dataset.id } },
      this.referrer()
    )
  }

  handleMove = (direction: number) => {
    window.parent.postMessage(
      {
        type: 've-move',
        payload: { id: this.dataset.id, direction: direction },
      },
      this.referrer()
    )
  }

  render() {
    if (!this.root) {
      return
    }
    this.root.render(
      <Reset complete={false}>
        <PreviewItemWrapper
          title={this.dataset.name}
          onDelete={this.handleDelete}
          onAdd={this.handleAdd}
          isFocused={this.isFocused}
          style={{ position: 'absolute', inset: 0 }}
          onClick={this.onWrapperClick}
          onMove={this.handleMove}
        />
      </Reset>
    )
  }

  onFocusChange = (e: MessageEvent<EditorMessageEvents>) => {
    if (e.data.type === 've-focus') {
      const isFocused = e.data.payload.id === this.dataset.id
      if (isFocused !== this.isFocused) {
        this.isFocused = e.data.payload.id === this.dataset.id
        this.render()
      }
    }
  }

  connectedCallback() {
    this.style.setProperty('position', 'relative')
    this.style.setProperty('display', 'block')

    // Update the state of the component
    window.addEventListener('message', this.onFocusChange)

    // Build the HTML Structure using react components
    const div = document.createElement('div')
    this.appendChild(div)
    this.root = createRoot(div)
    this.render()
  }

  disconnectedCallback() {
    window.removeEventListener('message', this.onFocusChange)
  }
}
