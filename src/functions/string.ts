export function uniqId(): string {
  return `_${Math.random().toString(36).substr(2, 9)}`
}

export function textContent(str: string): string {
  return new DOMParser().parseFromString(str, 'text/html').body.textContent!
}
