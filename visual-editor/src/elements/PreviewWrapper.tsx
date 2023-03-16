import { createRoot } from 'react-dom/client'
import { PreviewItemTitle, PreviewItemWrapper } from 'src/components/Preview/PreviewItem'
import { PreviewAddFloating } from 'src/components/Preview/PreviewAddFloating'
import React, { SyntheticEvent } from 'react'
import { Reset } from 'src/components/BaseStyles'

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

  connectedCallback () {
    this.style.setProperty('position', 'relative')
    this.style.setProperty('display', 'block')
    const div = document.createElement('div')
    this.appendChild(div)
    const referrer = new URL(document.location.toString()).searchParams.get('referrer') ?? ''
    const onWrapperClick = () => {
      window.parent.postMessage({ type: 've-focus', payload: { id: this.dataset.id, parent: true } }, referrer)
    }
    const onAddClick = (e: SyntheticEvent) => {
      e.stopPropagation()
      e.preventDefault()
      window.parent.postMessage({ type: 've-add', payload: { id: this.dataset.id } }, referrer)
    }
    createRoot(div).render(
      <Reset complete={false}>
        <PreviewItemWrapper
        isFocused={false}
        style={{ position: 'absolute', inset: 0 }}
        onClick={onWrapperClick}
      >
        <PreviewAddFloating onClick={onAddClick} />
        <PreviewItemTitle isFocused={false}>
          Mon titre
        </PreviewItemTitle>
      </PreviewItemWrapper>
      </Reset>)
  }

}

