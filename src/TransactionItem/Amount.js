import React from 'react'
import styles from './Amount.module.css'
import { toLocalCurrency } from '../utils'

export function Amount({ amount, status }) {
  return (
    <div className={`${styles.amount} ${styles[status] || ''}`}>
      <div className={styles.sign} data-test-id="sign">
        {amount >= 0 ? '+' : '-'}
      </div>
      <div data-test-id="amount">{toLocalCurrency(Math.abs(amount))}</div>
    </div>
  )
}
