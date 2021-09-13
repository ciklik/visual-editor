import { useEffect, useRef } from 'preact/hooks'
import {
  Delta,
  lineBreakHandler,
  lineBreakMatcher,
  Quill,
} from 'src/libs/Quill'
import type { DeltaOperation } from 'quill'
import clsx from 'clsx'

export enum QuillEditorMode {
  SINGLE_LINE,
  BASIC,
  DEFAULT,
  FULL,
}

const toolbars: Record<QuillEditorMode, (string | Record<string, any>)[]> = {
  [QuillEditorMode.SINGLE_LINE]: [
    ['bold', 'italic', 'underline'],
    ['background', 'link', 'clean'],
  ],
  [QuillEditorMode.BASIC]: [
    ['bold', 'italic', 'underline'],
    ['background', 'link', 'clean'],
  ],
  [QuillEditorMode.DEFAULT]: [
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'background', 'link', 'clean'],
  ],
  [QuillEditorMode.FULL]: [
    [{ header: [2, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'background', 'link', 'clean'],
  ],
}

type QuillEditorProps = {
  value: string
  onChange: (v: string) => void
  mode?: QuillEditorMode
  placeholder?: string
  colors?: string[]
}

export function QuillEditor({
  value,
  onChange,
  mode = QuillEditorMode.BASIC,
  placeholder,
  colors,
}: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    let toolbar = toolbars[mode]
    if (colors) {
      toolbar = [...toolbar, [{ color: colors.map((c) => `var(${c})`) }]]
    }
    const quill = new Quill(editorRef.current!, {
      modules: {
        clipboard: {
          matchers: [['BR', lineBreakMatcher]],
        },
        history: true,
        keyboard: {
          bindings: {
            linbreak: lineBreakHandler(quillRef),
          },
        },
        toolbar: toolbar,
      },
      // debug: 'info',
      placeholder,
      theme: 'bubble',
    })
    quill.clipboard.dangerouslyPasteHTML(value || '')
    quill.on('text-change', () => {
      onChangeRef.current(
        mode === QuillEditorMode.SINGLE_LINE
          ? (quillRef.current!.root.firstChild as HTMLParagraphElement)
              .innerHTML
          : cleanHTML(quillRef.current!.root.innerHTML)
      )
    })
    quill.clipboard.addMatcher(Node.ELEMENT_NODE, function (node, delta) {
      return cleanDelta(delta, mode)
    })

    // En mode simple ligne, on désactive la possibilité de passer à la ligne
    if (mode === QuillEditorMode.SINGLE_LINE) {
      // Annule la touche "Enter"
      quill.keyboard.bindings[13] = [
        {
          key: 'Enter',
          handler: () => {},
        },
        {
          key: 'Enter',
          shiftKey: true,
          handler: () => {},
        },
      ]
      // Empêche le copié / collé de paragraph
      quill.clipboard.addMatcher('P', (node, delta) => {
        const newDelta = new Delta()
        newDelta.ops = delta.ops.map((d) => {
          if (typeof d.insert === 'string') {
            d.insert = d.insert.replaceAll('\n', '')
          }
          return d
        })
        return newDelta
      })
    }

    quill.getModule('toolbar').addHandler('background', function () {
      quill.format('mark', true)
    })

    quillRef.current = quill
  }, [])

  return (
    <div
      class={clsx(
        mode === QuillEditorMode.SINGLE_LINE && 'ql-container-oneline'
      )}
      ref={editorRef}
    />
  )
}

function cleanDelta<T extends { ops: DeltaOperation[] }>(
  delta: T,
  mode: QuillEditorMode
): T {
  for (const d of delta.ops) {
    if (d.insert && d.attributes) {
      delete d.attributes.align
      delete d.attributes.color
      delete d.attributes.background
      if ([QuillEditorMode.BASIC, QuillEditorMode.SINGLE_LINE].includes(mode)) {
        delete d.attributes.link
        delete d.attributes.list
      }
      if (mode !== QuillEditorMode.FULL) {
        delete d.attributes.header
      }
      if (
        mode === QuillEditorMode.SINGLE_LINE &&
        typeof d.insert === 'string'
      ) {
        d.insert = d.insert.replaceAll('\n', '')
      }
    }
  }
  return delta
}

/**
 * Nettoie le code en sortie de QuillEditor car il a des préférences particulières
 */
function cleanHTML(html: string): string {
  if (html === '<p><br></p>') {
    return ''
  }
  return html
}
