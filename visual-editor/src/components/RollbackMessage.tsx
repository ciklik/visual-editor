import { Flash } from 'src/components/ui'
import { useRollbackMessage } from 'src/store'
import { t } from 'src/functions/i18n'

export function RollbackMessage() {
  const {
    message: rollbackMessage,
    rollback,
    voidRollback,
  } = useRollbackMessage()

  return (
    <Flash
      action={t('rollback')}
      onClick={rollback}
      duration={3}
      onHide={voidRollback}
      children={rollbackMessage}
    />
  )
}
