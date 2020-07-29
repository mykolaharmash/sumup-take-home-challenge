import { language } from './globals'

let dateFormat
let currencyFormat

export function initFormatter() {
  dateFormat = new Intl.DateTimeFormat(language(), {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })

  currencyFormat = new Intl.NumberFormat(language(), {
    currency: 'EUR',
    currencyDisplay: 'narrowSymbol',
    style: 'currency',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
}

export const toLocalDate = (date) => dateFormat.format(date)

export const toLocalCurrency = (value) => currencyFormat.format(value)

initFormatter()
