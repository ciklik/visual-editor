let renderId = 0

export function useRenderId() {
  return ++renderId
}
