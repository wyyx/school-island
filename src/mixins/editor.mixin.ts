import { format, formatTextColor } from '@/utils/format.util'

export const editorMixin = {
  methods: {
    formatBold() {
      const that: any = this
      format(that.editor, 'bold')
    },
    formatItalic() {
      const that: any = this
      console.log('TCL: formatItalic -> that.editor', that.editor)

      format(that.editor, 'italic')
    },
    formatColor(color: string) {
      const that: any = this

      const selection = that.editor.getSelection()
      console.log('TCL: formatColor -> selection aaa', selection)

      formatTextColor(that.editor, 'color', color)
    },
    formatUnderline() {
      const that: any = this
      format(that.editor, 'underline')
    }
  }
}
