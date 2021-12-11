import type { ReactNode } from 'react'
import React from 'react'
import { Flash } from './ui/Flash'
import { useRollbackMessage } from '../store'

type RollbackMessageProps = {
  children?: ReactNode
}

export function RollbackMessage({ children }: RollbackMessageProps) {
  const { message: rollbackMessage, rollback } = useRollbackMessage()

  if (!rollbackMessage) {
    return null
  }

  return (
    <Flash action="Rétablir" onClick={rollback}>
      {rollbackMessage}
    </Flash>
  )
}
