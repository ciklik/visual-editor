import { insertItem } from 'src/functions/array'
import { it, expect } from 'vitest'

it('insert a new item in the array', () => {
  const a = [1, 2, 3, 4]
  const b = insertItem(a, 0, 'demo')
  expect(b === a).toBeFalsy()
  expect(b).toHaveLength(5)
  expect(b[0]).toBe('demo')
  expect(b[1]).toBe(1)
})
