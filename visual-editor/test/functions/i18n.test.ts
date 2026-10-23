import { describe, expect, it } from 'vitest'
import { Translations as EN } from 'src/langs/en'
import { Translations as FR } from 'src/langs/fr'
import { VisualEditor } from 'src/VisualEditor'
import { alignmentLabel, t } from 'src/functions/i18n'

describe('translations', () => {
  it('has the same keys in English and French', () => {
    expect(Object.keys(FR).sort()).toEqual(Object.keys(EN).sort())
  })

  it('uses English by default', () => {
    new VisualEditor()
    expect(t('linkNewTab')).toBe('New tab')
    expect(VisualEditor.devices.map((d) => d.name)).toEqual([
      'Mobile',
      'Desktop',
    ])
  })

  it('uses the language given to the editor', () => {
    new VisualEditor({ lang: FR })
    expect(t('linkNewTab')).toBe('Nouvel onglet')
    expect(alignmentLabel('center')).toBe('Centre')
    expect(VisualEditor.devices.map((d) => d.name)).toEqual([
      'Mobile',
      'Ordinateur',
    ])
  })

  it('falls back to English for a key missing in the host translation', () => {
    const { linkNewTab, ...partial } = FR
    new VisualEditor({ lang: partial as typeof FR })
    expect(t('linkNewTab')).toBe('New tab')
    expect(t('save')).toBe('Sauvegarder')
  })
})
