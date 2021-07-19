export function debounce(func: Function, wait: number) {
  let timeout: number | null = null

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null
      func(...args)
    }
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = window.setTimeout(later, wait)
  }
}
