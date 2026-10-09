// Compatibility with a production host: the block declarations of the Ciklik
// app (cypress/fixtures/app) must keep registering and behaving the same way.
import { describe, expect, it } from 'vitest'
import { VisualEditor } from 'src/VisualEditor'
import { fillDefaults } from 'src/functions/fields'
import type {
  EditorComponentDefinition,
  FieldDefinition,
  FieldGroupDefinition,
} from 'src/types'
// @ts-expect-error plain JS fixture
import { registerBlocs } from '../../cypress/fixtures/app/blocs.js'

type AnyField = FieldDefinition<any, any> | FieldGroupDefinition<any>

function captureBlocs() {
  const blocs: Record<string, EditorComponentDefinition> = {}
  registerBlocs({
    registerComponent: (name: string, definition: EditorComponentDefinition) =>
      (blocs[name] = definition),
  })
  return blocs
}

// Every field, including the ones inside groups (Row, Tabs) and repeaters
function flatFields(fields: AnyField[]): AnyField[] {
  return fields.flatMap((field) => {
    if (field.group) {
      return [field, ...flatFields(field.fields)]
    }
    const children = (field.options as { fields?: AnyField[] }).fields
    return [field, ...(children ? flatFields(children) : [])]
  })
}

// The conditional field with this name
function findField(bloc: EditorComponentDefinition, name: string) {
  const field = flatFields(bloc.fields as AnyField[]).find(
    (f) => !f.group && f.name === name && f.conditions.length > 0
  )
  expect(field, name).toBeDefined()
  return field!
}

describe('Production host blocks', () => {
  const blocs = captureBlocs()

  it('register on the real editor', () => {
    expect(() => registerBlocs(new VisualEditor())).not.toThrow()
    expect(Object.keys(blocs).length).toBeGreaterThan(50)
  })

  it('support every form of when()', () => {
    // when(field, string)
    const iconsColumns = findField(blocs['icons-columns']!, 'mobileColumns')
    expect(iconsColumns.shouldRender({ layout: 'column' })).toBe(true)
    expect(iconsColumns.shouldRender({ layout: 'row' })).toBe(false)
    // when(field, function)
    const imageEdge = findField(blocs['text-image']!, 'imageEdge')
    expect(imageEdge.shouldRender({ align: 'left' })).toBe(true)
    expect(imageEdge.shouldRender({ align: 'top' })).toBe(false)
    // when(field) defaults to true
    const footerIcon = findField(blocs['products']!, 'footerIcon')
    expect(footerIcon.shouldRender({ hasFooter: true })).toBe(true)
    expect(footerIcon.shouldRender({ hasFooter: false })).toBe(false)
    // when(field, false) and when(field, true)
    const statsTitle = findField(blocs['stats']!, 'title')
    expect(statsTitle.shouldRender({ hasImage: false })).toBe(true)
    expect(statsTitle.shouldRender({})).toBe(true)
    expect(statsTitle.shouldRender({ hasImage: true })).toBe(false)
    const iconColor = findField(blocs['text-image']!, 'iconColor')
    expect(iconColor.shouldRender({ checkicon: true })).toBe(true)
    expect(iconColor.shouldRender({ checkicon: false })).toBe(false)
  })

  it('store Row and Tabs fields flat on the bloc', () => {
    for (const [name, bloc] of Object.entries(blocs)) {
      const data = fillDefaults({}, bloc.fields as FieldDefinition[])
      expect(Object.keys(data), name).not.toContain('undefined')
      for (const value of Object.values(data)) {
        expect(Array.isArray(value) || typeof value !== 'object', name).toBe(
          true
        )
      }
    }
    const data = fillDefaults({}, blocs['newsletter']!.fields as any)
    expect(data).toHaveProperty('title')
    expect(data).toHaveProperty('backgroundColor')
    expect(data).toHaveProperty('paddingY')
  })
})
