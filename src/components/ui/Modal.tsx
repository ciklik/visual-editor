import type { ReactNode } from 'react'
import { Content, Overlay, Root, Title } from '@radix-ui/react-dialog'

import Styles from './Modal.module.scss'
import { Flex } from './Flex'
import { IconCross } from 'src/components/ui/Icons'
import { ButtonIcon } from './ButtonIcon'
import { prevent } from 'src/functions/functions'

type ModalProps = {
  children: ReactNode,
  visible: boolean,
  onVisibilityChange: (visibility: boolean) => void,
  title: ReactNode
}

export function Modal ({ children, title, visible, onVisibilityChange }: ModalProps) {
  return <Root open={visible} onOpenChange={onVisibilityChange}>
    <Overlay className={Styles.ModalOverlay} />
    <Content className={Styles.ModalContent}>
      <Flex between>
        <Title className={Styles.ModalTitle}>{title}</Title>
        <ButtonIcon onClick={prevent(() => onVisibilityChange(false))}>
          <IconCross size={16} />
        </ButtonIcon>
      </Flex>
      {children}
    </Content>
  </Root>
}
