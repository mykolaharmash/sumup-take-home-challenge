import React from 'react'
import { useTransactions } from '../useTransactions.hook'
import styles from './TransactionsList.module.css'
import { TransactionItem } from '../TransactionItem/TransactionItem'
import { Spinner } from '../Spinner/Spinner'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'

export function TransactionsList() {
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

  const items = transactions.map((transaction) => {
    return <TransactionItem key={transaction.id} transaction={transaction} />
  })

  return (
    <table className={styles.transactionsList}>
      <tbody>{items}</tbody>
    </table>
  )
}
