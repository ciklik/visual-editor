import { arrayMove } from '@dnd-kit/sortable'

export function moveItem<T extends Array<unknown>>(items: T, from: number, to: number): T {
  return arrayMove(items, from, to) as T
}
