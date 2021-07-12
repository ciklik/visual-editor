export function waitEvent(target: Element, event: string): Promise<void> {
  return new Promise((resolve) => {
    target.addEventListener(event, () => resolve(), { once: true })
  })
}

export function strToDom(str: string): HTMLElement {
  return document
    .createRange()
    .createContextualFragment(`<div>${str.trim()}</div>`)
    .firstChild as HTMLElement
}

export function offsetLeft(element: HTMLElement, acc: number = 0): number {
  if (element.offsetParent) {
    return offsetLeft(
      element.offsetParent as HTMLElement,
      acc + element.offsetLeft
    )
  }
  return acc + element.offsetLeft
}
