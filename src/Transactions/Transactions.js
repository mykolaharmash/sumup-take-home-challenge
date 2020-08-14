import React, {useState} from 'react'
import { useTransactions } from '../useTransactions.hook'
import { TransactionsList } from "../TransactionsList/TransactionsList";
import { Spinner } from '../Spinner/Spinner'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import {Filters} from '../Filters/Filters'

export function Transactions() {
  const [filters, setFilters] = useState({
    paymentMethods: new Set(),
    statuses: new Set()
  })
  const [transactions, error, loading] = useTransactions()

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

  const toggleFilter = (type, value, toggled) {
    
    
    setFilters({
      ...filters,
      [type]: ...
    })
  }

  return (
    <div>      
      <Filters {...filters} onChange={} />
      <TransactionsList transactions={transactions} />
    </div>
  )

}