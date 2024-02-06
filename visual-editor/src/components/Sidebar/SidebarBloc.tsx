import { memo, useMemo, useRef } from 'react'
import { EditorComponentData, EditorComponentDefinition } from 'src/types'
import { useFieldFocused, usePartialStore } from 'src/store'
import { useToggle } from 'src/hooks/useToggle'
import { useUpdateEffect } from 'src/hooks/useUpdateEffect'
import { strToDom } from 'src/functions/dom'
import { SidebarBlocMissing } from './SidebarBlocMissing'
import { SidebarHeading } from './SidebarHeading'
import { prevent } from 'src/functions/functions'
import { ButtonIcon, Flex, IconDown, IconTrash } from 'src/components/ui'
import { SidebarFields } from './SidebarFields'
import { CopyAction } from './Actions/CopyAction'
import { SidebarBlocWrapper } from 'src/components/Sidebar/SidebarBlocWrapper'
import { t } from 'src/functions/i18n'

type SidebarBlocProps = {
  data: EditorComponentData
  definition?: EditorComponentDefinition
  path: string
}

export const SidebarBloc = memo(function SidebarItem({
  data,
  definition,
  path,
}: SidebarBlocProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isFocused = useFieldFocused(data._id)
  const [isCollapsed, toggleCollapsed, setCollapsed] = useToggle(!isFocused)
  const { removeBloc, setFocusIndex } = usePartialStore(
    'removeBloc',
    'setFocusIndex'
  )
  const label =
    definition?.label && data[definition.label] ? data[definition.label] : null

  // Scroll vers l'élément lorsqu'il a le focus
  useUpdateEffect(() => {
    if (isFocused) {
      setCollapsed(false)
      window.setTimeout(
        () =>
          ref.current!.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        100
      )
    } else {
      setCollapsed(true)
    }
  }, [isFocused])

  const labelHTMLSafe = useMemo(
    () => (label?.includes('<') ? strToDom(label).innerText : label),
    [label]
  )

  const handleRemove = () => {
    removeBloc(data._id)
  }

  const focusBloc = () => {
    if (isCollapsed) {
      setFocusIndex(path)
    }
    toggleCollapsed()
  }

  if (!definition) {
    return <SidebarBlocMissing data={data} />
  }

  return (
    <SidebarBlocWrapper item={data}>
      <SidebarHeading
        ref={ref}
        title={definition.title}
        description={isCollapsed ? labelHTMLSafe : null}
        onClick={prevent(focusBloc)}
      >
        <SidebarHeading.Hover>
          <CopyAction data={data} size={20} />
          <ButtonIcon
            danger
            onClick={handleRemove}
            title={t('deleteComponent')}
          >
            <IconTrash size={20} />
          </ButtonIcon>
        </SidebarHeading.Hover>
        <ButtonIcon
          rotate={isCollapsed ? -90 : 0}
          onClick={prevent(toggleCollapsed)}
        >
          <IconDown size={20} />
        </ButtonIcon>
      </SidebarHeading>
      {!isCollapsed && (
        <Flex column gap={1} css={{ marginTop: '.5em' }}>
          <SidebarFields fields={definition.fields} data={data} path={path} />
        </Flex>
      )}
    </SidebarBlocWrapper>
  )
})
