import { EditorField, EditorFieldProps } from '../types'
import { deepSet } from '../functions/object'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { moveItem } from '../functions/array'
import { DragEndEvent } from '@dnd-kit/core/dist/types'
import { uniqId } from '../functions/string'
import {
  restrictToParentElement,
  restrictToVerticalAxis
} from '@dnd-kit/modifiers';
import { AbstractField } from './AbstractField'

type FieldArgs = {
  label?: string,
  min?: number,
  max?: number,
  addLabel?: string,
  fields: EditorField<any>[],
  title?: string,
}

type RepeaterLine = { _index: string, [key: string]: unknown };

/**
 * Permet de créer une liste de champs imbriqués
 */
export class Repeater extends AbstractField<FieldArgs, RepeaterLine[]> {

  defaultArgs = {addLabel: 'Ajouter un élément'}

  public field = ({ value: valueProps, onChange }: EditorFieldProps<RepeaterLine[]>) => {
    const value: RepeaterLine[] = valueProps ?? [];
    const canAdd = !this.args.max || value.length < this.args.max
    const items = value.map((line) => line._index.toString()) // Liste des index de nos champs (utilisé par le drag'n drop)

    const add = () => {
      onChange([...value, { _index: uniqId() }])
    }

    const remove = (line: Object) => {
      onChange(value.filter(v => v !== line))
    }

    const updateProperty = (path: string, v: unknown) => {
      onChange(deepSet(value, path, v))
    }

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
      })
    );

    function handleDragEnd (event: DragEndEvent) {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        onChange(moveItem(value, items.indexOf(active.id), items.indexOf(over.id)))
      }
    }

    return <div>
      {this.args.title && <label>{this.args.title}</label>}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <div class="ve-repeater">
            {value.map((line, k) => <this.fieldLine key={line._index} id={line._index} line={line} index={k}
                                                    onUpdate={updateProperty} onRemove={remove}/>)}
            {canAdd && <div class="ve-repeater-footer">
              <button className="ve-repeater-add" onClick={add}>{this.args.addLabel}</button>
            </div>}
          </div>
        </SortableContext>
      </DndContext></div>;
  }

  private fieldLine = ({
                         line,
                         index,
                         onRemove,
                         onUpdate,
                         id
                       }: { line: RepeaterLine, index: number, onRemove: (line: RepeaterLine) => void, onUpdate: (path: string, v: unknown) => void, id: string }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
    } = useSortable({ id: id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition
    };

    const handleRemove = () => onRemove(line)
    const handleUpdate = (path:string) => (value: unknown) => onUpdate(path, value)

    return <div
      class="ve-repeater-item"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div class="ve-repeater-handle"
           {...listeners}/>
      {this.args.fields.map(field => <field.field value={line[field.name]}
                                                  onChange={handleUpdate(`${index}.${field.name}`)}/>)}
      <button class="ve-repeater-remove" onClick={handleRemove}
              title="Supprimer l'élément">&times;</button>
    </div>
  }

}

