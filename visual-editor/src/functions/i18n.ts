import type { TranslationKey } from 'src/types'
import { VisualEditor } from 'src/VisualEditor'

export function t(key: TranslationKey): string {
  return VisualEditor.i18n[key]
}
