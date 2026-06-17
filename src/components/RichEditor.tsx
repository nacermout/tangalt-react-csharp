import { useEffect, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import Highlight from '@tiptap/extension-highlight'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { FontFamily } from '@tiptap/extension-font-family'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { Typography } from '@tiptap/extension-typography'

interface RichEditorProps {
  content: string
  onChange: (html: string) => void
}

export default function RichEditor({ content, onChange }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      FontFamily,
      Subscript,
      Superscript,
      CharacterCount.configure({
        limit: 20000,
      }),
      Placeholder.configure({
        placeholder: 'Rédigez votre article ici...',
      }),
      Typography,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [content, editor])

  const setLink = useCallback(() => {
    const url = window.prompt('URL du lien :')
    if (url) editor?.chain().focus().setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    const url = window.prompt('URL de l\'image :')
    if (url) editor?.chain().focus().setImage({ src: url }).run()
  }, [editor])

  const addYoutube = useCallback(() => {
    const url = window.prompt('URL de la vidéo YouTube :')
    if (url) editor?.chain().focus().setYoutubeVideo({ src: url }).run()
  }, [editor])

  const addTable = useCallback(() => {
    const size = window.prompt('Taille du tableau (Lignes x Colonnes, ex: 3x3 ou 4x4) :', '3x3')
    if (size) {
      // Sépare "4x3" ou "4 x 3" ou "4,3"
      const match = size.match(/(\d+)\s*[xX,]\s*(\d+)/)
      let rowCount = 3
      let colCount = 3
      
      if (match) {
        rowCount = parseInt(match[1], 10) || 3
        colCount = parseInt(match[2], 10) || 3
      } else {
        // Au cas où ils tapent juste un chiffre comme "4", on fait un 4x4
        const single = parseInt(size, 10)
        if (single) {
          rowCount = single
          colCount = single
        }
      }

      editor?.chain().focus().insertTable({ rows: rowCount, cols: colCount, withHeaderRow: true }).run()
    }
  }, [editor])

  if (!editor) return null

  return (
    <div className="rich-editor">
      <div className="toolbar">

        {/* Historique */}
        <button type="button" title="Annuler" onClick={() => editor.chain().focus().undo().run()}>↩</button>
        <button type="button" title="Refaire" onClick={() => editor.chain().focus().redo().run()}>↪</button>
        <span className="sep">|</span>

        {/* Titres */}
        <button type="button" title="Titre 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}>H1</button>
        <button type="button" title="Titre 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}>H2</button>
        <button type="button" title="Titre 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}>H3</button>
        <span className="sep">|</span>

        {/* Formatage basique */}
        <button type="button" title="Gras" onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'active' : ''}><strong>G</strong></button>
        <button type="button" title="Italique" onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'active' : ''}><em>I</em></button>
        <button type="button" title="Souligné" onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'active' : ''}><u>S</u></button>
        <button type="button" title="Barré" onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'active' : ''}><s>Ab</s></button>
        <button type="button" title="Surligner" onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? 'active' : ''}>🖍</button>
        
        {/* Exposant/Indice */}
        <button type="button" title="Exposant" onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={editor.isActive('superscript') ? 'active' : ''}>X²</button>
        <button type="button" title="Indice" onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={editor.isActive('subscript') ? 'active' : ''}>X₂</button>
        <span className="sep">|</span>

        {/* Alignement */}
        <button type="button" title="Aligner à gauche" onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}>⬛</button>
        <button type="button" title="Centrer" onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}>▪️</button>
        <button type="button" title="Aligner à droite" onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'active' : ''}>▪</button>
        <button type="button" title="Justifier" onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'active' : ''}>≡</button>
        <span className="sep">|</span>

        {/* Listes */}
        <button type="button" title="Liste à puces" onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'active' : ''}>• Liste</button>
        <button type="button" title="Liste numérotée" onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'active' : ''}>1. Liste</button>
        <button type="button" title="Liste de tâches" onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive('taskList') ? 'active' : ''}>☑ Tâches</button>
        <span className="sep">|</span>

        {/* Tableaux */}
        <button type="button" title="Ajouter un tableau" onClick={addTable}>
          Créer Tableau
        </button>
        <button type="button" title="Effacer le tableau" onClick={() => editor.chain().focus().deleteTable().run()}>
          🗑 Effacer Tableau
        </button>
        
        {editor.isActive('table') && (
          <>
            <button type="button" title="Ajouter une ligne" onClick={() => editor.chain().focus().addRowAfter().run()}>+Ligne</button>
            <button type="button" title="Supprimer la ligne" onClick={() => editor.chain().focus().deleteRow().run()}>-Ligne</button>
            <button type="button" title="Ajouter une colonne" onClick={() => editor.chain().focus().addColumnAfter().run()}>+Col</button>
            <button type="button" title="Supprimer la colonne" onClick={() => editor.chain().focus().deleteColumn().run()}>-Col</button>
            <button type="button" title="Fusionner les cellules" onClick={() => editor.chain().focus().mergeCells().run()}>Fusionner</button>
          </>
        )}
        <span className="sep">|</span>

        {/* Extras / Medias */}
        <button type="button" title="Citation" onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'active' : ''}>" Citation</button>
        <button type="button" title="Code" onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'active' : ''}>&lt;/&gt;</button>
        <button type="button" title="Lien" onClick={setLink}
          className={editor.isActive('link') ? 'active' : ''}>🔗 Lien</button>
        <button type="button" title="Image" onClick={addImage}>🖼 Image</button>
        <button type="button" title="YouTube" onClick={addYoutube}>▶ YouTube</button>
        <button type="button" title="Ligne de séparation" onClick={() => editor.chain().focus().setHorizontalRule().run()}>— Sépar.</button>
        <span className="sep">|</span>

        {/* Polices et Couleurs */}
        <button type="button" onClick={() => editor.chain().focus().setFontFamily('EB Garamond').run()}
          className={editor.isActive('textStyle', { fontFamily: 'EB Garamond' }) ? 'active' : ''}>Serif</button>
        <button type="button" onClick={() => editor.chain().focus().setFontFamily('Fira Sans').run()}
          className={editor.isActive('textStyle', { fontFamily: 'Fira Sans' }) ? 'active' : ''}>Sans</button>
        
        <input type="color" title="Couleur du texte"
          onChange={e => editor.chain().focus().setColor(e.target.value).run()}
          style={{ width: '28px', height: '28px', padding: '0', border: 'none',
            cursor: 'pointer', background: 'none' }} />
      </div>

      <EditorContent editor={editor} />
      
      <div className="editor-footer">
        {editor.storage.characterCount.words()} mots | {editor.storage.characterCount.characters()} caractères
      </div>
    </div>
  )
}