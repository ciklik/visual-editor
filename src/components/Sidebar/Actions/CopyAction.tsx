import { EditorComponentData } from 'src/types'
import { prevent } from 'src/functions/functions'
import { IconCheck, IconCode, IconCopy } from 'src/components/ui/Icons'
import { copyToClipboard } from 'src/functions/browser'
import { stringifyFields } from 'src/functions/object'
import { Tooltip } from 'src/components/ui/Tooltip'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonIcon } from '../../ui/ButtonIcon'

type CopyActionProps = {
  data: EditorComponentData | EditorComponentData[]
  size?: number
}

export function CopyAction({ data, size, ...props }: CopyActionProps) {
  const [success, setSuccess] = useState(false)
  const timer = useRef<number>()
  const handleCopy = async () => {
    try {
      await copyToClipboard(stringifyFields(data))
      setSuccess(true)
      timer.current = window.setTimeout(() => {
        setSuccess(false)
      }, 4000)
    } catch (e) {
      alert(e)
    }
  }
  const tooltipLabel = Array.isArray(data)
    ? 'Copier le code de la page'
    : 'Copier le  bloc'

  useEffect(() => {
    clearTimeout(timer.current)
  }, [])

  return (
    <Tooltip
      content={
        success ? (
          <>
            Le code a bién été copié
            <br />
            vous pouvez le coller sur une autre page (CTRL + V)
          </>
        ) : (
          tooltipLabel
        )
      }
      trigger="focus"
    >
      <div>
        <ButtonIcon onClick={prevent(handleCopy)} success={success} {...props}>
          {success ? <IconCheck size={size} /> : <IconCode size={size} />}
        </ButtonIcon>
      </div>
    </Tooltip>
  )
}
