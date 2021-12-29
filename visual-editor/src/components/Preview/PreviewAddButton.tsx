import { Button, IconCirclePlus } from 'src/components/ui'
import { prevent } from 'src/functions/functions'
import React from 'react'
import { useSetBlockIndex } from 'src/store'
import styled from '@emotion/styled'

type PreviewAddButtonProps = {
  position: number
}

export function PreviewAddButton({ position }: PreviewAddButtonProps) {
  const setAddBlockIndex = useSetBlockIndex()

  return (
    <Wrapper>
      <Button
        icon={IconCirclePlus}
        onClick={prevent(() => setAddBlockIndex(position))}
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
