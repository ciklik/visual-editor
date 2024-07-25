import React, { useEffect, useMemo, useState } from 'react'
import {
  useAddBlock,
  useBlocSelectionVisible,
  usePartialStore,
} from 'src/store'
import { EditorComponentDefinitions } from 'src/types'
import { Modal, Tabs } from 'src/components/ui'
import { BlocSelectorItem } from 'src/components/Blocs/BlocSelectorItem'
import { BlocSelectorSearch } from 'src/components/Blocs/BlocSelectorSearch'
import { BlocSelectorGrid } from 'src/components/Blocs/BlocSelectorGrid'
import { t } from 'src/functions/i18n'

const ALL_TAB = 'Tous les blocs'

type BlocSelectorProps = {
  iconsUrl: string
}

export function BlocSelector({ iconsUrl }: BlocSelectorProps) {
  const isVisible = useBlocSelectionVisible()
  const { setAddBlockIndex } = usePartialStore('setAddBlockIndex')
  const [search, setSearch] = useState('')
  const { definitions, hiddenCategories } = usePartialStore(
    'definitions',
    'hiddenCategories'
  )
  const addBlock = useAddBlock()
  const categories = useMemo(() => {
    return [
      ALL_TAB,
      ...Object.values(definitions)
        .filter((d) => d.category)
        .filter((d) => !hiddenCategories.includes(d.category ?? ''))
        .reduce(
          (acc, d) => (acc.includes(d.category!) ? acc : [...acc, d.category!]),
          [] as string[]
        ),
    ]
  }, [definitions])

  useEffect(() => {
    setSearch('')
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  const handleVisibilityChange = (v: any) => {
    setAddBlockIndex(null)
  }

  return (
    <Modal
      visible={isVisible}
      onVisibilityChange={handleVisibilityChange}
      title={t('addComponent')}
    >
      <BlocSelectorSearch value={search} onChange={setSearch} />
      <Tabs css={{ margin: '1.5rem 0' }}>
        {categories.map((category) => (
          <BlocSelectorGrid key={category} title={category}>
            {Object.keys(definitions)
              .filter(
                (key) =>
                  !hiddenCategories.includes(definitions[key]!.category ?? '')
              )
              .filter(searchDefinition(search ?? '', category, definitions))
              .map((key) => (
                <BlocSelectorItem
                  key={key}
                  definition={definitions[key]!}
                  name={key}
                  iconsUrl={iconsUrl}
                  onClick={() => addBlock(key)}
                />
              ))}
          </BlocSelectorGrid>
        ))}
      </Tabs>
    </Modal>
  )
}

function searchDefinition(
  search: string,
  category: string,
  definitions: EditorComponentDefinitions
) {
  return (key: string) => {
    const categoryFilter =
      category === ALL_TAB ? true : definitions[key]!.category === category
    const searchFilter =
      search === ''
        ? true
        : definitions[key]!.title.toLowerCase().includes(search.toLowerCase())
    return categoryFilter && searchFilter
  }
}
