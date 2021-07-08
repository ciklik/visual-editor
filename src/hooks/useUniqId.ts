import { useMemo } from 'preact/hooks'
import { uniqId } from 'src/functions/string'

export function useUniqId(prefix: string = ''): string {
  return useMemo(() => prefix + uniqId(), [])
}
