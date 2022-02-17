import React, {useState} from 'react'
import { useTransactions } from '../useTransactions.hook'
import { TransactionsList } from "../TransactionsList/TransactionsList";
import { Spinner } from '../Spinner/Spinner'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import {Filters} from '../Filters/Filters'
import styles from './Transactions.module.css'

export function Transactions() {
  const [filters, setFilters] = useState({
    paymentMethods: new Set(),
    statuses: new Set()
  })
  const [page, setPage] = useState(0)
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
  
  const toggleFilter = (type, value, toggled) => {
    const updatedFilters = new Set(filters[type])
    
    if (toggled) {
      updatedFilters.add(value)
    } else {
      updatedFilters.delete(value)
    }
    
    setFilters({
      ...filters,
      [type]: updatedFilters
    })
  }

  const onFiltersChange = (...params) => {
    setPage(0)
    toggleFilter(...params)
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
      
      <button onClick={() => {setPage(page + 1)}}>Load More</button>
    </div>
  )

}