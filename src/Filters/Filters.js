import React from 'react'
import { CARD, CASH } from '../lib/paymentMethods'
import { SUCCESSFUL, FAILED, REFUNDED } from '../lib/statuses'
import styles from './Filters.module.css'
import { FilterToggle } from '../FilterToggle/FilterToggle'

export function Filters({ paymentMethods, statuses, onChange }) {
  const onPaymentMethodChange = (method, enabled) => {
    onChange('paymentMethods', method, enabled)
  }
  const onStatusChange = (status, enabled) => {
    onChange('statuses', status, enabled)
  }

  return (
    <div className={styles.filters}>
      <div className={styles.section}>
        <div className={styles.title}>Payment Method</div>

        <div className={styles.toggles}>
          <FilterToggle
            label="💶"
            enabled={paymentMethods.has(CASH)}
            onChange={(enabled) => onPaymentMethodChange(CASH, enabled)}
          />
          <FilterToggle
            label="💳"
            enabled={paymentMethods.has(CARD)}
            onChange={(enabled) => onPaymentMethodChange(CARD, enabled)}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.title}>Status</div>

        <div className={styles.toggles}>
          <FilterToggle
            label="Successful"
            enabled={statuses.has(SUCCESSFUL)}
            onChange={(enabled) => onStatusChange(SUCCESSFUL, enabled)}
          />
          <FilterToggle
            label="Failed"
            enabled={statuses.has(FAILED)}
            onChange={(enabled) => onStatusChange(FAILED, enabled)}
          />
          <FilterToggle
            label="Refunded"
            enabled={statuses.has(REFUNDED)}
            onChange={(enabled) => onStatusChange(REFUNDED, enabled)}
          />
        </div>
      </div>
    </div>
  )
}
