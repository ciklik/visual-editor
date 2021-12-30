import type { ReactNode } from 'react'
import { Content, Overlay, Root, Title } from '@radix-ui/react-dialog'

import { IconCross } from 'src/components/ui'
import { ButtonIcon } from './ButtonIcon'
import { prevent } from 'src/functions/functions'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

type ModalProps = {
  children: ReactNode
  visible: boolean
  onVisibilityChange: (visibility: boolean) => void
  title: ReactNode
}

export function Modal({
  children,
  title,
  visible,
  onVisibilityChange,
}: ModalProps) {
  return (
    <Root open={visible} onOpenChange={onVisibilityChange}>
      <ModalOverlay />
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <div>{children}</div>
        <ModalClose onClick={prevent(() => onVisibilityChange(false))}>
          <IconCross size={16} />
        </ModalClose>
      </ModalContent>
    </Root>
  )
}

const FadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

const ContentIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-48%) scale(.96)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(-50%) scale(1)',
  },
})

const ModalOverlay = styled(Overlay)({
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  overflow: 'auto',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  animation: `${FadeIn} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const ModalContent = styled(Content)({
  position: 'fixed',
  top: '50%',
  left: '0',
  right: '0',
  zIndex: 51,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 'calc(100% - 2rem)',
  maxWidth: '1290px',
  borderRadius: '8px',
  backgroundColor: 'var(--ve-background)',
  padding: '1.5rem 2rem',
  transform: 'translateY(-50%)',
  animation: `${ContentIn} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const ModalTitle = styled(Title)({
  fontSize: '1.5rem',
  fontWeight: 500,
  margin: 0,
  padding: 0,
})

const ModalClose = styled(ButtonIcon)({
  position: 'absolute',
  top: '1.2rem',
  right: '1.5rem',
})
