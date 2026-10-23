import type { TranslationKey } from 'src/types'
import { VisualEditor } from 'src/VisualEditor'
import { Translations as EN } from 'src/langs/en'

/**
 * Falls back to English when the host translation lacks a key
 * (translations written for an older version)
 */
export function t(key: TranslationKey): string {
  return VisualEditor.i18n[key] ?? EN[key]
}

const alignmentKeys: Record<string, TranslationKey> = {
  left: 'alignLeft',
  center: 'alignCenter',
  right: 'alignRight',
  justify: 'alignJustify',
  top: 'alignTop',
  bottom: 'alignBottom',
}

/**
 * Label of an alignment value (left, center, right...)
 */
export function alignmentLabel(value: string): string {
  const key = alignmentKeys[value]
  return key ? t(key) : value
}
