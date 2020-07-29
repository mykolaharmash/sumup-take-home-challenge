export function transactionsRoute(req, res) {
  const offset = parseInt(req.query.offset || 0, 10)
  const limit = parseInt(req.query.limit || 100, 10)

  if (isNaN(offset) || isNaN(limit) || offset < 0 || limit < 0) {
    throw new Error(
      `'offset' and 'limit' parameters should be positive numbers. Provided offset=${req.query.offset}, limit=${req.query.limit}.`
    )
  }

  res.send({
    transactions: req.transactions.slice(offset, offset + limit),
  })
}
