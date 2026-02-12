import { prevent } from 'src/functions/functions'
import { usePartialStore } from 'src/store'
import {
  Button,
  ButtonIcon,
  Flex,
  IconCirclePlus,
  IconCross,
} from 'src/components/ui'
import { CopyAction } from './Actions/CopyAction'

import styled from '@emotion/styled'
import { t } from 'src/functions/i18n'
import { PropsWithChildren } from 'react'
import { ActionButton } from 'src/components/Sidebar/Actions/ActionButton'

type SidebarHeaderProps = PropsWithChildren<{
  onClose: () => void
}>

export function SidebarHeader({ onClose, children }: SidebarHeaderProps) {
  const { setAddBlockIndex, actions } = usePartialStore(
    'setAddBlockIndex',
    'actions'
  )

  return (
    <Wrapper between>
      <div>
        <ButtonIcon title={t('close')} onClick={prevent(onClose)}>
          <IconCross size={12} />
        </ButtonIcon>
      </div>
      <Flex>
        {actions
          .filter((a) => a.position === 'header')
          .map((a, k) => (
            <ActionButton {...a} key={k} />
          ))}
        {children}
        <CopyAction size={20} />
        <Button
          icon={IconCirclePlus}
          onClick={prevent(() => setAddBlockIndex())}
        >
          {t('addComponent')}
        </Button>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled(Flex)({
  padding: '0 1em',
  flex: 'none',
  backgroundColor: '#FFF',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0',
  height: 64,
})
