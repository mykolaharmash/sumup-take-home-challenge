import { language } from './globals'
const { toLocalDate, initFormatter, toLocalCurrency } = require('./utils')

jest.mock('./globals')

describe('toLocalDate() formats a date to a current locale', () => {
  it('formats to English locale', () => {
    language.mockReturnValue('en')

    initFormatter()

    const date = new Date(2020, 6, 28, 12, 30, 0, 0)

    expect(toLocalDate(date)).toEqual('7/28/2020')
  })

  it('formats to German locale', () => {
    language.mockReturnValue('de')

    initFormatter()

    const date = new Date(2020, 6, 28, 12, 30, 0, 0)

    expect(toLocalDate(date)).toEqual('28.7.2020')
  })
})

describe('toLocalCurrency() formats a currency to a current locale', () => {
  it('formats to English locale', () => {
    language.mockReturnValue('en')

    initFormatter()

    expect(toLocalCurrency(45.788)).toEqual('€45.79')
  })

  it('formats to German locale', () => {
    language.mockReturnValue('de')

    initFormatter()

    expect(toLocalCurrency(45.788)).toEqual('45,79 €')
  })
})
