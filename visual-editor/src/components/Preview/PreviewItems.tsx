import { EditorComponentData } from 'src/types'
import { useFieldDefinitions, useSetBlockIndex } from 'src/store'
import { Flipper } from 'react-flip-toolkit'
import { PreviewAddFloating } from 'src/components/Preview/PreviewAddFloating'
import { PreviewItem } from 'src/components/Preview/PreviewItem'
import { PreviewAddButton } from 'src/components/Preview/PreviewAddButton'
import React from 'react'

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
  const definitions = useFieldDefinitions()

  return (
    <>
      <Flipper flipKey={data.map((d) => d._id).join('_')}>
        {data.map((v, k) => (
          <div key={v._id}>
            <PreviewAddFloating position={k} />
            <PreviewItem
              title={definitions[v._name]?.title || ''}
              data={v}
              initialHTML={initialHTML[v._id] || ''}
              previewUrl={previewUrl}
            />
          </div>
        ))}
      </Flipper>
      <PreviewAddButton position={data.length} />
    </>
  )
}
