import Quill from 'quill'

export function format(quill: Quill, type: string) {
  const selection = quill.getSelection()
  const format = quill.getFormat(selection)
  const isFormatted = format[type]

  console.log('TCL: format -> format', format)

  if (isFormatted) {
    quill.format(type, false)
  } else {
    quill.format(type, true)
  }
}
