import React from 'react'
import { CASH } from '../lib/paymentMethods'

export function PaymentMethod({ method }) {
  return <span>{method === CASH ? '💶' : '💳'}</span>
}
