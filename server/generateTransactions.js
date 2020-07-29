import { STATUS_LIST, REFUNDED } from './lib/statuses'
import { PAYMENT_METHOD_LIST } from './lib/paymentMethods'

function randomFloatBetween(min, max) {
  return Math.min(max, Math.random() * (max - min + Number.EPSILON) + min)
}

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomArrayItem(array) {
  return array[randomIntBetween(0, array.length - 1)]
}

export function randomDateBetween(from, to) {
  return new Date(randomIntBetween(from.getTime(), to.getTime())).toISOString()
}

export function generateAmount(min, max, status) {
  return (status === REFUNDED ? -1 : 1) * randomFloatBetween(min, max)
}

export function generateTransactionItem(id, dateFrom, dateTo, amountMin, amountMax) {
  const status = randomArrayItem(STATUS_LIST)

  return {
    id,
    status,
    createdAt: randomDateBetween(dateFrom, dateTo),
    method: randomArrayItem(PAYMENT_METHOD_LIST),
    amount: generateAmount(amountMin, amountMax, status),
  }
}

export function generateTransactions(count, dateFrom, dateTo, amountMin, amountMax) {
  const transactions = []

  for (let i = 0; i < count; i++) {
    transactions.push(generateTransactionItem(i, dateFrom, dateTo, amountMin, amountMax))
  }

  return transactions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}
