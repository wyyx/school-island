import { format } from '@/utils/format.util'

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
    formatUnderline() {
      const that: any = this
      format(that.editor, 'underline')
    }
  }
}
