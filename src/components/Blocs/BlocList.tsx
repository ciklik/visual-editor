import { EditorComponentDefinition, EditorComponentDefinitions } from 'src/types'
import { prevent } from 'src/functions/functions'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFieldDefinitions, useHiddenCategories } from 'src/store'

const ALL_TAB = 'Tous les blocs'

export function BlocList({
  iconsUrl,
  onAddBloc,
}: {
  iconsUrl: string
  onAddBloc: (name: string) => void
}) {
  const searchInput = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState(ALL_TAB)
  const definitions = useFieldDefinitions()
  const hiddenCategories = useHiddenCategories()

  useEffect(() => {
    searchInput.current!.focus()
  }, [])

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

  return (
    <>
      <ul className="ve-blocs-tabs">
        {categories.map((category) => (
          <li
            onClick={prevent(() => setTab(category))}
            className={category === tab ? 've-active' : undefined}
            key={category}
          >
            {category}
          </li>
        ))}
      </ul>
      {tab === ALL_TAB && (
        <input
          ref={searchInput}
          placeholder="Filtrer..."
          type="text"
          className="ve-bloc-search"
          onChange={prevent((e: InputEvent) =>
            setSearch((e.target as HTMLInputElement).value)
          )}
          value={search}
        />
      )}
      <div className="ve-blocs ve-blocs--preview">
        {Object.keys(definitions)
          .filter(
            (key) => !hiddenCategories.includes(definitions[key]!.category ?? '')
          )
          .filter(searchDefinition(search ?? '', tab, definitions))
          .map((key) => (
            <BlocListItem
              key={key}
              definition={definitions[key]!}
              name={key}
              iconsUrl={iconsUrl}
              onClick={() => onAddBloc(key)}
            />
          ))}
      </div>
    </>
  )
}

function searchDefinition(
  search: string,
  category: string,
  definitions: EditorComponentDefinitions
) {
  if (category !== ALL_TAB) {
    return (key: string) => definitions[key]!.category === category
  }
  if (search === '') {
    return () => true
  }
  return (key: string) =>
    definitions[key]!.title.toLowerCase().includes(search.toLowerCase())
}

function BlocListItem({
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
    <button className="ve-bloc" onClick={prevent(onClick)}>
      <img src={icon} alt=""/>
      <span>{title}</span>
    </button>
  )
}
