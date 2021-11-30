import { Dialog } from '@reach/dialog'
import Styles from './BlocSelector.module.scss'
import React, { useMemo, useState } from 'react'
import { useBlocSelectionVisible, useFieldDefinitions, useHiddenCategories, useSetBlockIndex } from '../../store'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs'
import { EditorComponentDefinition, EditorComponentDefinitions } from '../../types'
import { prevent } from '../../functions/functions'

const ALL_TAB = 'Tous les blocs'

export function BlocSelector () {
  const isVisible = useBlocSelectionVisible()
  const setBlockIndex = useSetBlockIndex()
  const [tab, setTab] = useState(ALL_TAB)
  const search = ''
  const definitions = useFieldDefinitions()
  const hiddenCategories = useHiddenCategories()
  const categories = useMemo(() => {
    return [
      ALL_TAB,
      ...Object.values(definitions)
        .filter((d) => d.category)
        .filter((d) => !hiddenCategories.includes(d.category ?? ''))
        .reduce(
          (acc, d) => (acc.includes(d.category!) ? acc : [...acc, d.category!]),
          [] as string[],
        ),
    ]
  }, [definitions])

  if (!isVisible) {
    return null;
  }

  const handleOpenChange = (v: any) => {
    setBlockIndex(null)
  }

  return <Dialog isOpen={isVisible} onDismiss={handleOpenChange} className={Styles.BlocSelector}>
    <div className={Styles.BlocSelectorTitle}>Ajouter un bloc</div>

    <Tabs>
      <TabList className={Styles.BlocSelectorTabs}>
        {categories.map(category => <Tab className={Styles.BlocSelectorTab} key={category}>{category}</Tab>)}
      </TabList>

      <TabPanels>
        {categories.map(category => <TabPanel key={category} className={Styles.BlocSelectorGrid}>
          {Object.keys(definitions)
            .filter(
              (key) => !hiddenCategories.includes(definitions[key].category ?? ''),
            )
            .filter(searchDefinition(search ?? '', tab, definitions))
            .map((key) => (
              <BlocSelectorItem
                key={key}
                definition={definitions[key]}
                name={key}
                iconsUrl={'/'}
                onClick={() => console.log(key)}
              />
            ))}
        </TabPanel>)}
      </TabPanels>
    </Tabs>
  </Dialog>
}

function BlocSelectorItem ({
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
  const icon = iconsUrl.replace('[name]', name)
  const title = definition.title

  return (
    <button className={Styles.BlocSelectorItem} onClick={prevent(onClick)}>
      <div className={Styles.BlocSelectorItemImage}>
        <img src={'/html.svg'} />
      </div>
      <div>{title}</div>
    </button>
  )
}


function searchDefinition (
  search: string,
  category: string,
  definitions: EditorComponentDefinitions,
) {
  if (category !== ALL_TAB) {
    return (key: string) => definitions[key].category === category
  }
  if (search === '') {
    return () => true
  }
  return (key: string) =>
    definitions[key].title.toLowerCase().includes(search.toLowerCase())
}

