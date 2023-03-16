import { createRoot } from 'react-dom/client'
import { PreviewItemTitle, PreviewItemWrapper } from 'src/components/Preview/PreviewItem'
import { PreviewAddFloating } from 'src/components/Preview/PreviewAddFloating'
import React, { SyntheticEvent } from 'react'
import { Reset } from 'src/components/BaseStyles'
import { EditorMessageEvents } from 'src/components/Preview/PreviewPostMessage'

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
export class PreviewWrapper extends HTMLElement {

  isFocused = false
  root: ReturnType<typeof createRoot> | undefined

  referrer = () => {
    return new URL(document.location.toString()).searchParams.get('referrer') ?? ''
  }

  onWrapperClick = () => {
    window.parent.postMessage({ type: 've-focus', payload: { id: this.dataset.id, parent: true } }, this.referrer())
  }

  onAddClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    window.parent.postMessage({ type: 've-add', payload: { id: this.dataset.id } }, this.referrer())
  }

  render () {
    if (!this.root) {
      return
    }
    this.root.render(<Reset complete={false}>
      <PreviewAddFloating onClick={this.onAddClick} style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
      <PreviewItemWrapper
        isFocused={this.isFocused}
        style={{ position: 'absolute', inset: 0 }}
        onClick={this.onWrapperClick}
      >
        {this.dataset.name && <PreviewItemTitle isFocused={this.isFocused}>{this.dataset.name}</PreviewItemTitle>}
      </PreviewItemWrapper>
    </Reset>)
  }

  onFocusChange = (e: MessageEvent<EditorMessageEvents>) => {
    if (e.data.type === 've-focus') {
      const isFocused = e.data.payload.id === this.dataset.id;
      if (isFocused !== this.isFocused) {
        this.isFocused = e.data.payload.id === this.dataset.id
        this.render()
      }
    }
  }

  connectedCallback () {
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

  disconnectedCallback () {
    window.removeEventListener('message', this.onFocusChange)
  }

}

