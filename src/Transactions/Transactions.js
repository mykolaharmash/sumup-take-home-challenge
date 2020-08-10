import React, { useState } from 'react'
import { TransactionsList } from '../TransactionsList/TransactionsList'
import styles from './Transactions.module.css'
import { useTransactions } from '../useTransactions.hook'
import { Spinner } from '../Spinner/Spinner'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { Filters } from '../Filters/Filters'
import { useFilters } from '../useFilters.hook'
import { toLocalDate } from '../utils'
import { TransactionsGroup } from '../TransactionsGroup/TransactionsGroup'

function groupTransactions(transactions) {
  return transactions.reduce((result, transaction) => {
    const dateString = toLocalDate(new Date(transaction.createdAt))

    if (!result.has(dateString)) {
      result.set(dateString, [])
    }

    result.get(dateString).push(transaction)

    return result
  }, new Map())
}

export function Transactions() {
  const [page, setPage] = useState(0)
  const [filters, toggleFilter] = useFilters()
  const [transactions, error, loading] = useTransactions(filters, page)

  if (loading) {
    return <Spinner />
  }

  if (error !== null) {
    return (
      <ErrorMessage
        title="Could not load transactions 😥"
        message={error.message}
      />
    )
  }

  const onFiltersChange = (...filterParams) => {
    setPage(0)
    toggleFilter(...filterParams)
  }

  const groupedTransactions = groupTransactions(transactions)
  const groups = Array.from(groupedTransactions.keys()).map((date) => {
    return (
      <TransactionsGroup
        key={date}
        date={date}
        transactions={groupedTransactions.get(date)}
      />
    )
  })

  return (
    <div className={styles.transactions}>
      <div className={styles.content}>
        <div className={styles.list}>{groups}</div>

        <div className={styles.filters}>
          <Filters {...filters} onChange={onFiltersChange} />
        </div>
      </div>

      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
  )
}
