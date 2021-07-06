export function prevent(callback: Function) {
  return (e: Event) => {
    e.preventDefault()
    callback(e)
  }
}
