import { Button, IconCirclePlus } from 'src/components/ui'
import React, { SyntheticEvent } from 'react'
import styled from '@emotion/styled'

type PreviewAddButtonProps = {
  onClick?: (e: SyntheticEvent) => void
}

export function PreviewAddButton({ onClick }: PreviewAddButtonProps) {

  return (
    <Wrapper>
      <Button
        icon={IconCirclePlus}
        onClick={onClick}
      >
        Ajouter un bloc
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  backgroundColor: 'transparent',
  border: '2px dashed var(--ve-field-border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  color: 'var(--ve-color)',
  width: 'calc(100% - 2rem)',
  margin: '1rem',
  padding: '1rem',
})
