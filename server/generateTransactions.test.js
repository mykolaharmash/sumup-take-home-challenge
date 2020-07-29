import {
  randomDateBetween,
  randomArrayItem,
  generateTransactionItem,
  generateAmount,
  generateTransactions,
} from './generateTransactions'
import { SUCCESSFUL, FAILED, REFUNDED } from './lib/statuses'

test('randomDateBetween() generates date between two given dates', () => {
  const from = new Date(2020, 5, 29, 12, 15)
  const to = new Date(2020, 6, 5, 17, 30)
  const date = new Date(randomDateBetween(from, to))

  expect(date >= from && date <= to).toEqual(true)
})

describe('randomArrayItem() randomly selects one of the items within array', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random')
  })

  afterEach(() => {
    Math.random.mockRestore()
  })

  it('selects the first item when random is at minimum value', () => {
    Math.random.mockImplementation(() => 0)

    const array = [1, 2, 3, 4, 5]

    expect(randomArrayItem(array)).toEqual(1)
  })

  it('selects the last item when random is at maximum value', () => {
    Math.random.mockImplementation(() => 1 - Number.EPSILON)

    const array = [1, 2, 3, 4, 5]

    expect(randomArrayItem(array)).toEqual(5)
  })

  it('selects the first item when random is in the middle', () => {
    Math.random.mockImplementation(() => 0.5)

    const array = [1, 2, 3, 4, 5]

    expect(randomArrayItem(array)).toEqual(3)
  })
})

test('generateTransactionItem() generates a single transaction item', () => {
  const from = new Date(2020, 5, 29, 12, 15)
  const to = new Date(2020, 6, 5, 17, 30)
  const item = generateTransactionItem(0, from, to, 0, 500)

  expect(item).toHaveProperty('id')
  expect(item).toHaveProperty('createdAt')
  expect(item).toHaveProperty('status')
  expect(item).toHaveProperty('method')
  expect(item).toHaveProperty('amount')
})

describe('generateAmount() generates a float number in a given range while also considering status of a transaction', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random')
  })

  afterEach(() => {
    Math.random.mockRestore()
  })

  it('generates a positive amount between provided values when status is "successful"', () => {
    Math.random.mockImplementation(() => 0.5)

    const min = 0
    const max = 555
    const status = SUCCESSFUL

    expect(generateAmount(min, max, status)).toEqual(277.5)
  })

  it('generates a positive amount between provided values when status is "failed"', () => {
    Math.random.mockImplementation(() => 0.5)

    const min = 0
    const max = 555
    const status = FAILED

    expect(generateAmount(min, max, status)).toEqual(277.5)
  })

  it('generates a negative amount between provided values when status is "refunded"', () => {
    Math.random.mockImplementation(() => 0.5)

    const min = 0
    const max = 555
    const status = REFUNDED

    expect(generateAmount(min, max, status)).toEqual(-277.5)
  })
})

describe('generateTransactions() generates an array of transactions', () => {
  it('generates a given number of elements', () => {
    const from = new Date(2020, 5, 29, 12, 15)
    const to = new Date(2020, 6, 5, 17, 30)

    expect(generateTransactions(100, from, to, 0, 555).length).toEqual(100)
  })

  it('sorts transactions by date DESC', () => {
    const from = new Date(2020, 5, 29, 12, 15)
    const to = new Date(2020, 6, 5, 17, 30)

    const transactionDates = generateTransactions(10, from, to, 0, 555).map(
      (t) => new Date(t.createdAt)
    )
    const isSortedDESC = (array) =>
      array.every((item, index) => index === 0 || array[index - 1] > item)

    expect(isSortedDESC(transactionDates)).toEqual(true)
  })
})
