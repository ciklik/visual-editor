import { createRoot } from 'react-dom/client'
import React, { SyntheticEvent } from 'react'
import { PreviewAddButton } from 'src/components/Preview/PreviewAddButton'
import { Reset } from 'src/components/BaseStyles'

/**
 * Custom element usable within an iframe to display a button to add a new bloc
 */
export class AddButton extends HTMLElement {

  connectedCallback () {
    const div = document.createElement('div')
    this.appendChild(div)
    const referrer = new URL(document.location.toString()).searchParams.get('referrer') ?? ''
    const onAddClick = (e: SyntheticEvent) => {
      e.stopPropagation()
      e.preventDefault()
      window.parent.postMessage({type: 've-add', payload: {id: parseInt(this.dataset.index ?? '0')}}, referrer)
    }
    createRoot(div).render(
      <Reset complete={true}>
        <PreviewAddButton onClick={onAddClick} />
      </Reset>
    )
  }

}

