import styled from '@emotion/styled'
import { useInsertData, useTemplates } from 'src/store'
import { EditorComponentTemplate } from 'src/types'
import { Card } from 'src/components/ui'
import { prevent } from 'src/functions/functions'
import { useCallback } from 'react'
import { indexify } from 'src/functions/object'

export function SidebarTemplates({ onTemplate }: { onTemplate: () => void }) {
  const templates = useTemplates()
  const insertData = useInsertData()
  const callback = useCallback(
    (t: EditorComponentTemplate) => {
      for (const datum of t.data) {
        insertData(datum._name, 0, indexify(datum))
      }
      onTemplate()
    },
    [insertData, onTemplate]
  )
  return (
    <Wrapper>
      {templates.map((t) => (
        <TemplateCard template={t} onClick={callback} />
      ))}
    </Wrapper>
  )
}

function TemplateCard({
  template,
  onClick,
}: {
  template: EditorComponentTemplate
  onClick: (t: EditorComponentTemplate) => void
}) {
  return (
    <StyledCard hoverable onClick={prevent(() => onClick(template))}>
      <TemplateImage src={template.image} alt="" />
      <Body>
        <Title>{template.name}</Title>
        <div>{template.description}</div>
      </Body>
    </StyledCard>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100%',
  padding: '1em',
  gap: '1em',
  overflow: 'auto',
})

const StyledCard = styled(Card)({
  padding: 0,
  display: 'grid',
  gridTemplateColumns: '150px 1fr',
  gridGap: '1.5em',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
})

const TemplateImage = styled.img({
  width: '100%',
  height: '150px',
  objectFit: 'cover',
})

const Body = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
})

const Title = styled.div({
  color: 'var(--ve-color)',
  fontWeight: 500,
  fontSize: '1.1em',
})
