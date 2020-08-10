import { language } from './globals'

let dateFormat
let currencyFormat
let timeFormat

export function initFormatter() {
  dateFormat = new Intl.DateTimeFormat(language(), {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })

  timeFormat = new Intl.DateTimeFormat(language(), {
    hour: 'numeric',
    minute: 'numeric'
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

export const toLocalTime = (date) => timeFormat.format(date)

export const toLocalCurrency = (value) => currencyFormat.format(value)

initFormatter()
