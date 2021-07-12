import { EditorComponentData } from 'src/types'
import { prevent } from 'src/functions/functions'
import { IconCopy } from 'src/components/Icons'
import { copyToClipboard } from 'src/functions/browser'
import { stringifyFields } from 'src/functions/object'

type CopyActionProps = {
  data: EditorComponentData
}

export function CopyAction({ data }: CopyActionProps) {
  const handleCopy = async () => {
    try {
      await copyToClipboard(stringifyFields(data))
      // TODO : Afficher une alerte de copy
    } catch (e) {
      // TODO : Afficher une alerte de pas copy
    }
  }
  return (
    <button onClick={prevent(handleCopy)}>
      <IconCopy />
    </button>
  )
}
