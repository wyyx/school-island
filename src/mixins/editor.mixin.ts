import * as formatUtil from '@/utils/format.util'
import Quill, { RangeStatic } from 'quill'

export const editorMixin = {
  methods: {
    formatBold() {
      const that: any = this
      formatUtil.toggleFormat(that.editor, 'bold')
    },
    formatItalic() {
      const that: any = this
      formatUtil.toggleFormat(that.editor, 'italic')
    },
    formatColor(color: string, currentSelection: RangeStatic) {
      const that: any = this
      const quill: Quill = that.editor

      quill.format('color', color)
    },
    formatClearColor(currentSelection: RangeStatic) {
      const that: any = this
      const quill: Quill = that.editor

      quill.format('color', '')
    },
    formatUnderline() {
      const that: any = this
      formatUtil.toggleFormat(that.editor, 'underline')
    },
    insertImage(imageUrl: string, currentSelection: RangeStatic) {
      if (!currentSelection) {
        return
      }

      const that: any = this
      const quill: Quill = that.editor

      quill.insertEmbed(currentSelection.index, 'image', imageUrl)
    },
    removeFormat(currentSelection: RangeStatic) {
      if (!currentSelection) {
        return
      }

      const that: any = this
      const quill: Quill = that.editor

      quill.removeFormat(currentSelection.index, currentSelection.length)
    }
  }
}
