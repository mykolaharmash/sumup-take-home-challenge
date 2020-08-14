import { STATUS_LIST } from '../lib/statuses'
import { PAYMENT_METHOD_LIST } from '../lib/paymentMethods'

function filterTransactions(transactions, filters) {
  let result = transactions
  
  if (filters.paymentMethods.length !== PAYMENT_METHOD_LIST.length)  {
    result = result.filter((transaction) => filters.paymentMethods.includes(transaction.method))
  }

  if (filters.statuses.length !== STATUS_LIST.length)  {
    result = result.filter((transaction) => filters.statuses.includes(transaction.status))  
  }

  return result  
}

export function transactionsRoute(req, res) {
  const {offset, limit, filters} = req

  const transactions = filterTransactions(req.transactions, filters)
    .slice(offset, offset + limit)

  res.send({transactions})
}
