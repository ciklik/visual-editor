import { useMemo } from 'react'
import { uniqId } from 'src/functions/string'

export function useUniqId(prefix: string = ''): string {
  return useMemo(() => prefix + uniqId(), [])
}
