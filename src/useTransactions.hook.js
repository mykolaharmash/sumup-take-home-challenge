import { useState, useEffect } from 'react'

const API_ORIGIN = process.env.REACT_APP_API_ORIGIN || 'http://localhost:5000'

function fetchTransactions(offset, limit, filters) {
  const serializedFilters = new URLSearchParams({
    paymentMethods: Array.from(filters.paymentMethods.values()),
    statuses: Array.from(filters.statuses.values()),
  })

  return fetch(`${API_ORIGIN}/api/transactions?offset=${offset}&limit=${limit}&${serializedFilters}`)
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

const PER_PAGE = 10

export function useTransactions(filters, page) {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTransactions(page * PER_PAGE, PER_PAGE, filters)
      .then((nextTransactions) => {
        setTransactions(page === 0 ? nextTransactions : transactions.concat(nextTransactions))
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [filters, page])

  return [transactions, error, loading]
}
