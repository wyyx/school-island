import Quill from 'quill'

export function toggleFormat(quill: Quill, type: string) {
  const selection = quill.getSelection()

  if (!selection) {
    return
  }

  const currentFormat = quill.getFormat(selection)
  const isFormatted = currentFormat[type]

  if (isFormatted) {
    quill.format(type, false)
  } else {
    quill.format(type, true)
  }
}
