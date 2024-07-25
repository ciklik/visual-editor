import { Action } from 'src/types'
import { ButtonIcon } from 'src/components/ui'
import { prevent } from 'src/functions/functions'

/**
 * Generic action button imported using registerButton() method
 */
export function ActionButton({
  icon,
  title,
  action,
}: Omit<Action, 'position'>) {
  return (
    <ButtonIcon onClick={prevent(action)} title={title}>
      <span dangerouslySetInnerHTML={{ __html: icon }} />
    </ButtonIcon>
  )
}
