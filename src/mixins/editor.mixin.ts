import * as formatUtil from '@/utils/format.util'
import { RangeStatic } from 'quill'

export const editorMixin = {
  methods: {
    formatBold() {
      const that: any = this
      formatUtil.format(that.editor, 'bold')
    },
    formatItalic() {
      const that: any = this

      formatUtil.format(that.editor, 'italic')
    },
    formatColor(color: string, currentSelection: RangeStatic) {
      const that: any = this

      that.editor.setSelection(currentSelection)
      formatUtil.formatTextColor(that.editor, 'color', color)
      that.editor.setSelection()
    },
    formatClearColor(currentSelection: RangeStatic) {
      const that: any = this

      that.editor.setSelection(currentSelection)
      formatUtil.formatClearTextColor(that.editor, 'color')
      that.editor.setSelection()
    },
    formatUnderline() {
      const that: any = this
      formatUtil.format(that.editor, 'underline')
    },
    insertImage(imageUrl: string, currentSelection: RangeStatic) {
      console.log('TCL: insertImage -> currentSelection', currentSelection)
      const that: any = this
      formatUtil.insertEmbed(that.editor, 'image', imageUrl, currentSelection)
    },
    removeFormat(currentSelection: RangeStatic) {
      const that: any = this
      formatUtil.removeFormat(that.editor, currentSelection)
    }
  }
}
