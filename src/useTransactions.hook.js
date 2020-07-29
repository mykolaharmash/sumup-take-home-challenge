import { useState, useEffect } from 'react'

const API_ORIGIN = process.env.REACT_APP_API_ORIGIN || 'http://localhost:5000'

function fetchTransactions(offset = 0, limit = 100) {
  return fetch(`${API_ORIGIN}/api/transactions?offset=${offset}&limit=${limit}`)
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

export function useTransactions() {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTransactions()
      .then(setTransactions)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return [transactions, error, loading]
}
