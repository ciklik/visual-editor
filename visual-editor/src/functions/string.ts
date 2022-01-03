export function uniqId(): string {
  return `_${Math.random().toString(36).substr(2, 9)}`
}

export function textContent(str: string): string {
  return new DOMParser().parseFromString(str, 'text/html').body.textContent!
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
