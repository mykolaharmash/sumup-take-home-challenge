import React from 'react'
import {CARD, CASH} from '../lib/paymentMethods'
import {SUCCESSFUL, REFUNDED, FAILED} from '../lib/statuses'
import styles from './Filters.module.css'
import {FilterToggle} from '../FIlterToggle/FilterToggle'

export function Filters({ paymentMethods, statuses, onChange }) {
  return (
    <div>
      <div>Payment Method</div>

      <FilterToggle 
        label={'💶'} 
        toggled={paymentMethods.has(CASH)} 
        onClick={(toggled) => onChange('paymentMethods', CASH, toggled)}
      />

      <FilterToggle 
        label={'💳'} 
        toggled={paymentMethods.has(CARD)} 
        onClick={(toggled) => onChange('paymentMethods', CARD, toggled)}
      />

      <div>Statuses</div>

      <FilterToggle 
        label='Successful' 
        toggled={statuses.has(SUCCESSFUL)} 
        onClick={(toggled) => onChange('statuses', SUCCESSFUL, toggled)}
      />

      <FilterToggle 
        label='Failed' 
        toggled={statuses.has(FAILED)} 
        onClick={(toggled) => onChange('statuses', FAILED, toggled)}
      />

      <FilterToggle 
        label='Refunded' 
        toggled={statuses.has(REFUNDED)} 
        onClick={(toggled) => onChange('statuses', REFUNDED, toggled)}
      />
    </div>
  )
}