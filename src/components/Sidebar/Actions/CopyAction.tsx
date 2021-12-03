import { EditorComponentData } from 'src/types'
import { prevent } from 'src/functions/functions'
import { IconCheck, IconCopy } from 'src/components/ui/Icons'
import { copyToClipboard } from 'src/functions/browser'
import { stringifyFields } from 'src/functions/object'
import { Tooltip } from 'src/components/Tooltip'
import React, { useEffect, useRef, useState } from 'react'

type CopyActionProps = {
  data: EditorComponentData | EditorComponentData[]
  className?: string
}

export function CopyAction({ data, className }: CopyActionProps) {
  const [success, setSuccess] = useState(false)
  const timer = useRef<number>()
  const handleCopy = async () => {
    try {
      await copyToClipboard(stringifyFields(data))
      setSuccess(true)
      timer.current = window.setTimeout(() => {
        setSuccess(false)
      }, 1000)
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    clearTimeout(timer.current)
  }, [])

  return (
    <Tooltip content="Le code a bién été copié" visible={success}>
      <button
        onClick={prevent(handleCopy)}
        className={className || 've-sidebar-action-hover'}
        style={{ color: success ? 'green' : 'currentcolor' }}
      >
        {success ? <IconCheck /> : <IconCopy />}
      </button>
    </Tooltip>
  )
}
