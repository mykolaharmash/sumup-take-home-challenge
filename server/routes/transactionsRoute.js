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

// const totals {

//   'date-1': 200,
//   'date-2': 2000
// }

// transactions.reduce((result, tr) => {
//   if (result[tr.date]) {
//     result[tr.date] = {
//       total: totals[tr.date],
//       transactions: []
//     }

//     result[tr.date].transactions.push(tr)
//   }
// }, new Map())

export function transactionsRoute(req, res) {
  const {offset, limit, filters} = req

  const transactions = filterTransactions(req.transactions, filters)
    .slice(offset, offset + limit)

  res.send({transactions})
}
