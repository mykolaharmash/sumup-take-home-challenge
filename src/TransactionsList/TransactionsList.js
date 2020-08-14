import React from 'react'
import styles from './TransactionsList.module.css'
import { TransactionItem } from '../TransactionItem/TransactionItem'

export function TransactionsList({ transactions }) {
  const items = transactions.map((transaction) => {
    return <TransactionItem key={transaction.id} transaction={transaction} />
  })

  return (
    <table className={styles.transactionsList}>
      <tbody>{items}</tbody>
    </table>
  )
}
