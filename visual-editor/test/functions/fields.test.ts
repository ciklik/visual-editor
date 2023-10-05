import { fillDefaults } from 'src/functions/fields'
import { Text, Row } from 'src/VisualEditor'
import type { FieldDefinition } from 'src/types'
import { it, describe, expect } from 'vitest'

describe('fillDefaults', () => {
  it('fill undefined value with default', () => {
    const newData = fillDefaults({}, [
      Text('name', { default: 'Hello' }),
      Text('name2'),
    ] as FieldDefinition[])
    expect(newData.name).toBe('Hello')
    expect(newData.name2).toBe('')
  })
  it('keep the filled value', () => {
    const newData = fillDefaults({ name: 'Goodbye' }, [
      Text('name', { default: 'Hello' }),
      Text('name2'),
    ] as FieldDefinition[])
    expect(newData.name).toBe('Goodbye')
    expect(newData.name2).toBe('')
  })
  it('Works with layout Fields', () => {
    const newData = fillDefaults({}, [
      Row([Text('name', { default: 'Hello' }), Text('name2')]),
    ] as FieldDefinition[])
    expect(newData.name).toBe('Hello')
    expect(newData.name2).toBe('')
  })
})
