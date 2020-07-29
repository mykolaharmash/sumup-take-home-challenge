import React from 'react'
import styles from './TransactionItem.module.css'
import { Amount } from './Amount'
import { PaymentMethod } from './PaymentMethod'
import { Status } from './Status'
import { CreatedAt } from './CreatedAt'

export function TransactionItem({ transaction }) {
  return (
    <tr className={`${styles.transactionItem} ${styles[transaction.status]}`}>
      <td className={styles.createdAt}>
        <CreatedAt date={new Date(transaction.createdAt)} />
      </td>
      <td className={styles.status}>
        <Status status={transaction.status} />
      </td>
      <td className={styles.payment}>
        <Amount amount={transaction.amount} status={transaction.status} />
        <PaymentMethod
          method={transaction.method}
          status={transaction.status}
        />
      </td>
    </tr>
  )
}
