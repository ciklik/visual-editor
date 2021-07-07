import { arrayMove } from '@dnd-kit/sortable'

export function moveItem<T extends Array<unknown>>(
  items: T,
  from: number,
  to: number
): T {
  return arrayMove(items, from, to) as T
}

export function insertItem<T extends Array<any>>(
  items: T,
  index: number,
  value: any
) {
  const clone = [...items]
  clone.splice(index, 0, value)
  return clone
}
