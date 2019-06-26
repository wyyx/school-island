export function getYearSpan(
  referenceYear: number,
  span: number,
  futureYear: number
) {
  const arr = []

  let firstYear = referenceYear - (span - futureYear)

  for (let index = 0; index < span; index++) {
    arr.push(firstYear)
    firstYear++
  }

  return arr
}
