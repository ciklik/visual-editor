import test from 'japa'
import { insertItem } from '../../src/functions/array'

test('insert a new item in the array', (assert) => {
  const a: Array<string|number> = [1, 2, 3, 4]
  const b = insertItem(a, 0, 'demo');
  assert.isNotTrue(b === a)
  assert.deepEqual(b.length, 5)
  assert.deepEqual(b[0], 'demo')
  assert.deepEqual(b[1], 1)
});
