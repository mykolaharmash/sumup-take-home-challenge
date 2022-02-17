import { useState, useEffect } from 'react'

const API_ORIGIN = process.env.REACT_APP_API_ORIGIN || 'http://localhost:5000'

function fetchTransactions(filters, offset, limit) {
  const filtersQuery = new URLSearchParams({
    paymentMethods: Array.from(filters.paymentMethods.values()),
    statuses: Array.from(filters.statuses.values())
  })

  return fetch(`${API_ORIGIN}/api/transactions?offset=${offset}&limit=${limit}&${filtersQuery}`)
    .then((res) => {
      if (!res.ok) {
        return res.json().then(({ error }) => {
          throw new Error(error)
        })
      }

      return res.json()
    })
    .then(({ transactions }) => transactions)
}

const TRANSACTIONS_PER_PAGE = 10

export function useTransactions(filters, page) {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTransactions(filters, page * TRANSACTIONS_PER_PAGE, TRANSACTIONS_PER_PAGE)
      .then((nextTransactions) => setTransactions((transactions) => {
        return page === 0 ? nextTransactions : transactions.concat(nextTransactions)
      }))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [filters, page])

  return [transactions, error, loading]
}
