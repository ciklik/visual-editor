import { fillDefaults } from 'src/functions/fields'
import { Text } from 'src/VisualEditor'
import { Row } from 'src/fields/Row'

describe('fillDefaults', () => {
  test('fill undefined value with default', () => {
    const newData = fillDefaults({}, [
      new Text('name', {default: 'Hello'}),
      new Text('name2')
    ])
    expect(newData.name).toBe('Hello')
    expect(newData.name2).toBe('')
  });
  test('keep the filled value', () => {
    const newData = fillDefaults({name: 'Goodbye'}, [
      new Text('name', {default: 'Hello'}),
      new Text('name2')
    ])
    expect(newData.name).toBe('Goodbye')
    expect(newData.name2).toBe('')
  });
  test('Works with layout Fields', () => {
    const newData = fillDefaults({}, [
      new Row([
          new Text('name', {default: 'Hello'}),
          new Text('name2')
      ])
    ])
    expect(newData.name).toBe('Hello')
    expect(newData.name2).toBe('')
  });
})
