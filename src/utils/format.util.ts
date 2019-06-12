import Quill from 'quill'

export function format(quill: Quill, type: string) {
  const selection = quill.getSelection()
  console.log('TCL: format -> selection', selection)
  const currentFormat = quill.getFormat(selection)
  const isFormatted = currentFormat[type]

  console.log('TCL: format -> currentFormat', currentFormat)

  if (isFormatted) {
    quill.format(type, false)
  } else {
    quill.format(type, true)
  }
}

export function formatTextColor(quill: Quill, type: string, value: string) {
  const selection = quill.getSelection()
  console.log('TCL: formatTextColor -> selection bbb', selection)
  // const currentFormat = quill.getFormat(selection)
  // console.log('TCL: formatTextColor -> currentFormat', currentFormat)

  // if (isFormatted) {
  // quill.format(type, value)
  // } else {
  //   quill.format(type, '')
  // }
}
