import React from 'react'
import styles from './TransactionsGroup.module.css'
import { TransactionsList } from '../TransactionsList/TransactionsList'

export function TransactionsGroup({ date, transactions }) {
  return (
    <div className={styles.transactionsGroup}>
      <div className={styles.header}>{date}</div>

      <div className={styles.list}>
        <TransactionsList transactions={transactions} />
      </div>
    </div>
  )
}
