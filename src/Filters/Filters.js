import React from 'react'
import {CARD, CASH} from '../lib/paymentMethods'
import styles from './Filters.module.css'

export function Filters({ paymentMethods, statuses, onChange }) {
  return (
    <div>
      <button
        className={paymentMethods.includes(CASH) ? styles.toggled : ''} 
        onClick={() => onChange('paymentMethod', CASH)}
      >💶</button>

      <button 
        className={paymentMethods.includes(CARD) ? styles.toggled : ''} 
        onClick={() => onChange('paymentMethod', CARD)}
        >💳</button>
    </div>
  )
}