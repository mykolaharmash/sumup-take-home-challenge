export function transactionsRoute(req, res) {
  const {offset, limit, filters} = req

  const transactions = req.transactions
    .filter((transaction) =>
      filters.paymentMethods.includes(transaction.method)
    )
    .filter((transaction) => filters.statuses.includes(transaction.status))
    .slice(offset, offset + limit)

  res.send({ transactions })
}
