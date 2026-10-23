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
  const allTab = t('allBlocks')
  const categories = useMemo(() => {
    return [
      allTab,
      ...Object.values(definitions)
        .filter((d) => d.category)
        .filter((d) => !hiddenCategories.includes(d.category ?? ''))
        .reduce(
          (acc, d) => (acc.includes(d.category!) ? acc : [...acc, d.category!]),
          [] as string[]
        ),
    ]
  }, [definitions, allTab])

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
              .filter(
                searchDefinition(
                  search ?? '',
                  category === allTab,
                  category,
                  definitions
                )
              )
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
  allCategories: boolean,
  category: string,
  definitions: EditorComponentDefinitions
) {
  return (key: string) => {
    const categoryFilter = allCategories
      ? true
      : definitions[key]!.category === category
    const searchFilter =
      search === ''
        ? true
        : definitions[key]!.title.toLowerCase().includes(search.toLowerCase())
    return categoryFilter && searchFilter
  }
}
