import format from 'date-fns/format'

export const dateFilter = date => {
  return format(date, 'YYYY年M月D日')
}
