import React, {useState} from 'react'
import { TransactionsList } from "../TransactionsList/TransactionsList";
import styles from './Transactions.module.css'
import {useTransactions} from '../useTransactions.hook'
import {Spinner} from '../Spinner/Spinner'
import {ErrorMessage} from '../ErrorMessage/ErrorMessage'
import {Filters} from '../Filters/Filters'
import {useFilters} from '../useFilters.hook'

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

  return (
    <div className={styles.transactions}>
      <div className={styles.content}>
        <div className={styles.list}>
          <TransactionsList transactions={transactions} />
        </div>

        <div className={styles.filters}>
          <Filters {...filters} onChange={onFiltersChange} />
        </div>
      </div>

      <button onClick={() => setPage(page + 1)}>
        Load More
      </button>

    </div>
  )
}