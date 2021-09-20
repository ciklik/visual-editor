import { EditorComponentData } from 'src/types'
import { prevent } from 'src/functions/functions'
import { IconCheck, IconCopy } from 'src/components/Icons'
import { copyToClipboard } from 'src/functions/browser'
import { stringifyFields } from 'src/functions/object'
import { Tooltip } from 'src/components/Tooltip'
import { useEffect, useRef, useState } from 'preact/hooks'
import { useData } from '../../../store'
import { CopyAction } from './CopyAction'

export function CopyPage(props: Record<string, any> = {}) {
  const data = useData()
  return <CopyAction data={data} {...props} />
}
