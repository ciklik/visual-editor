import { cast } from 'src/functions/object'

test('Cast value correctly', () => {
  // Boolean casting
  expect(cast(undefined, true)).toBe(false)
  expect(cast(null, true)).toBe(false)
  expect(cast({ }, true)).toBe(true)
  expect(cast([], true)).toBe(true)

  // String casting
  expect(cast(undefined, '')).toBe('')
  expect(cast(null, '')).toBe('')
  expect(cast(false, '')).toBe('')
  expect(cast(true, '')).toBe('')
  expect(cast(1, '')).toBe('1')
  expect(cast({ }, '')).toBe("[object Object]")
  expect(cast([], '')).toBe("")
});
