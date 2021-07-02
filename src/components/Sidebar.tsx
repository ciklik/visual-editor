import { EditorComponentData, EditorComponentDefinition, EditorComponentDefinitions, EditorField } from '../types'
import { useToggle } from '../hooks/useToggle'

export function Sidebar ({
                           content,
                           definitions
                         }: { content: EditorComponentData[], definitions: EditorComponentDefinitions }) {
  console.log(content)
  return <div class="ve-sidebar">
    {content.map((c, k) => <SidebarItem key={k} content={c} definition={definitions[c.name]}/>)}
  </div>
}

function SidebarItem ({
                        content,
                        definition
                      }: { content: EditorComponentData, definition: EditorComponentDefinition }) {
  const [isCollapsed, toggleCollapsed] = useToggle(false)
  return <div class="ve-sidebar-item">
    <button onClick={toggleCollapsed}>
      <h2 class="ve-sidebar-title">{definition.title}</h2>
      <div class="ve-sidebar-collapse">{isCollapsed ? '+' : '-'}</div>
    </button>
    {!isCollapsed && <div className="ve-sidebar-fields">
      {definition.fields.map((field) => <Field field={field} value={content.data[field.name]}/>)}
    </div>}
  </div>
}

function Field ({ field, value }: { field: EditorField, value: string }) {
  const Component = field.field
  return <Component value={value}/>
}
