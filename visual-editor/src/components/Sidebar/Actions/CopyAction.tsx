import { EditorComponentData } from 'src/types'
import { prevent } from 'src/functions/functions'
import { copyToClipboard } from 'src/functions/browser'
import { stringifyFields } from 'src/functions/object'
import { ButtonIcon, IconCheck, IconCode, Tooltip } from 'src/components/ui'
import React, { useEffect, useRef, useState } from 'react'
import { t } from 'src/functions/i18n'
import { useGetData } from 'src/store'

type CopyActionProps = {
  data?: EditorComponentData
  size?: number
}

export function CopyAction({ data, size, ...props }: CopyActionProps) {
  const [success, setSuccess] = useState(false)
  const getData = useGetData()
  const timer = useRef<number>()
  const handleCopy = async () => {
    try {
      await copyToClipboard(stringifyFields(data ?? getData()))
      setSuccess(true)
      timer.current = window.setTimeout(() => {
        setSuccess(false)
      }, 4000)
    } catch (e) {
      alert(e)
    }
  }
  const tooltipLabel =  data ? t('copyComponent') : t('copyPage')

  useEffect(() => {
    clearTimeout(timer.current)
  }, [])

  return (
    <Tooltip
      content={
        success ? (
          <>
            {t('copySuccess')}
            <br />
            {t('copyInstructions')}
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
