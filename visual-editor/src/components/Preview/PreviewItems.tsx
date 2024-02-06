import { EditorComponentData } from 'src/types'
import { usePartialStore } from 'src/store'
import { Flipper } from 'react-flip-toolkit'
import { PreviewItem } from 'src/components/Preview/PreviewItem'
import { PreviewAddButton } from 'src/components/Preview/PreviewAddButton'

/**
 * Gère le rendu dans l'iframe des différents composants
 */
export function PreviewItems({
  data,
  initialHTML = {},
  previewUrl,
}: {
  data: EditorComponentData[]
  initialHTML: Record<string, string>
  previewUrl: string
}) {
  const { definitions, setAddBlockIndex } = usePartialStore(
    'setAddBlockIndex',
    'definitions'
  )

  return (
    <>
      <Flipper flipKey={data.map((d) => d._id).join('_')}>
        {data.map((v, k) => (
          <div key={v._id} style={{ position: 'relative' }}>
            <PreviewItem
              index={k}
              title={definitions[v._name]?.title || ''}
              data={v}
              initialHTML={initialHTML[v._id] || ''}
              previewUrl={previewUrl}
            />
          </div>
        ))}
      </Flipper>
      <PreviewAddButton onClick={() => setAddBlockIndex(data.length)} />
    </>
  )
}
