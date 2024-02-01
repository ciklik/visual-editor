import styled from '@emotion/styled'
import { useSetData, useTemplates } from 'src/store'
import { EditorComponentTemplate } from 'src/types'
import { Card, Spinner } from 'src/components/ui'
import { prevent } from 'src/functions/functions'
import { useCallback, useState } from 'react'

export function SidebarTemplates({ onTemplate }: { onTemplate: () => void }) {
  const templates = useTemplates()
  const setData = useSetData()
  const [loadingTemplate, setLoadingTemplate] =
    useState<EditorComponentTemplate>()
  const callback = useCallback(
    async (t: EditorComponentTemplate) => {
      setLoadingTemplate(t)
      let data: EditorComponentTemplate['data']
      if (typeof t.data === 'function') {
        setLoadingTemplate(t)
        data = await t.data().catch(() => [])
        setLoadingTemplate(t)
      } else {
        data = t.data
      }
      setData(data)
      onTemplate()
    },
    [setData, onTemplate]
  )
  return (
    <Wrapper>
      {templates.map((t) => (
        <TemplateCard
          key={t.name}
          template={t}
          onClick={callback}
          loading={loadingTemplate === t}
        />
      ))}
    </Wrapper>
  )
}

function TemplateCard({
  template,
  onClick,
  loading,
}: {
  template: EditorComponentTemplate
  onClick: (t: EditorComponentTemplate) => void
  loading: boolean
}) {
  return (
    <StyledCard
      hoverable
      onClick={prevent(() => (loading ? null : onClick(template)))}
      loading={loading}
    >
      {loading && <Spinner />}
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

const StyledCard = styled(Card)(
  {
    padding: 0,
    display: 'grid',
    position: 'relative',
    gridTemplateColumns: '150px 1fr',
    gridGap: '1.5em',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer',
  },
  (props: { loading: boolean }) =>
    props.loading
      ? {
          opacity: 0.4,
          cursor: 'inherit',
        }
      : {}
)

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
