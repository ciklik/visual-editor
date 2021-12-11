import Styles from './BlocSelector.module.scss'
import React, { useEffect, useMemo, useState } from 'react'
import {
  useAddBlock,
  useBlocSelectionVisible,
  useFieldDefinitions,
  useHiddenCategories,
  useSetBlockIndex,
} from 'src/store'
import {
  EditorComponentDefinition,
  EditorComponentDefinitions,
} from '../../types'
import { prevent } from 'src/functions/functions'
import { Modal } from 'src/components/ui/Modal'
import { Tabs } from 'src/components/ui/Tabs'
import { IconSearch } from '../ui/Icons'

const ALL_TAB = 'Tous les blocs'

type BlocSelectorProps = {
  iconsUrl: string
}

export function BlocSelector({ iconsUrl }: BlocSelectorProps) {
  const isVisible = useBlocSelectionVisible()
  const setBlockIndex = useSetBlockIndex()
  const [search, setSearch] = useState('')
  const definitions = useFieldDefinitions()
  const hiddenCategories = useHiddenCategories()
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
    setBlockIndex(null)
  }

  return (
    <Modal
      visible={isVisible}
      onVisibilityChange={handleVisibilityChange}
      title="Ajouter un bloc"
    >
      <div className={Styles.BlocSelectorSearchWrapper}>
        <input
          type="search"
          placeholder="Rechercher un bloc"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={Styles.BlocSelectorSearch}
        />
        <IconSearch size={14} />
      </div>
      <Tabs className={Styles.BlocSelectorTabs}>
        {categories.map((category) => (
          <Tabs.Tab key={category} title={category}>
            <div className={Styles.BlocSelectorGrid}>
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
            </div>
          </Tabs.Tab>
        ))}
      </Tabs>
    </Modal>
  )
}

function BlocSelectorItem({
  definition,
  name,
  iconsUrl,
  onClick,
}: {
  name: string
  definition: EditorComponentDefinition
  iconsUrl: string
  onClick: () => void
}) {
  console.log({ iconsUrl })
  const icon = iconsUrl.replace('[name]', name)
  const title = definition.title

  return (
    <button className={Styles.BlocSelectorItem} onClick={prevent(onClick)}>
      <div className={Styles.BlocSelectorItemImage}>
        <img src={icon} />
      </div>
      <div>{title}</div>
    </button>
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
