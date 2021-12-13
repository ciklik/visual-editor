import { Flash } from './ui/Flash'
import { useRollbackMessage } from '../store'

export function RollbackMessage() {
  const {
    message: rollbackMessage,
    rollback,
    voidRollback,
  } = useRollbackMessage()

  return (
    <Flash
      action="Rétablir"
      onClick={rollback}
      duration={3}
      onHide={voidRollback}
      children={rollbackMessage}
    />
  )
}
