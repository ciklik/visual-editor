export function strToDom(str: string): HTMLElement {
  return document
    .createRange()
    .createContextualFragment(`<div>${str.trim()}</div>`)
    .firstChild as HTMLElement
}

export function offsetTop(element: HTMLElement, acc: number = 0): number {
  if (element.offsetParent) {
    return offsetTop(
      element.offsetParent as HTMLElement,
      acc + element.offsetTop
    )
  }
  return acc + element.offsetTop
}
