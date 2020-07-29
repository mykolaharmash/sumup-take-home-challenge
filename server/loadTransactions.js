import fs from 'fs'
import { generateTransactions } from './generateTransactions'

const CACHE_PATH = `${__dirname}/transactions-cache.json`

export function loadTransactions() {
  console.log('\nLoading Transactions:')

  if (fs.existsSync(CACHE_PATH)) {
    console.log(`• Reading transactions from cache "${CACHE_PATH}"\n`)

    return JSON.parse(fs.readFileSync(CACHE_PATH))
  }

  const count = 500
  const fromDate = new Date()
  fromDate.setMonth(fromDate.getMonth() - 6)
  const toDate = new Date()
  const minAmount = 0
  const maxAmount = 1000

  console.log(`• Generating ${count} new transactions`)
  console.log(`• From date: ${fromDate}`)
  console.log(`• To date: ${toDate}`)
  console.log(`• Minimum amount: ${minAmount}`)
  console.log(`• Maximum amount: ${maxAmount}`)

  const transactions = generateTransactions(count, fromDate, toDate, minAmount, maxAmount)

  console.log(`• Saving transactions cache "${CACHE_PATH}"\n`)

  fs.writeFileSync(CACHE_PATH, JSON.stringify(transactions, null, 2))

  return transactions
}
