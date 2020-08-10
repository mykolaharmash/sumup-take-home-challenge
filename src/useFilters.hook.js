import {useState} from 'react'
import {PAYMENT_METHOD_LIST} from './lib/paymentMethods'
import {STATUS_LIST} from './lib/statuses'

export function useFilters() {
  const [filters, setFilters] = useState({
    paymentMethods: new Set(PAYMENT_METHOD_LIST),
    statuses: new Set(STATUS_LIST)
  })

  const toggleFilter = (type, filter, enabled) => {
    const updatedFilters = new Set(filters[type])

    if (enabled) {
      updatedFilters.add(filter)
    } else {
      updatedFilters.delete(filter)
    }

    setFilters({...filters, [type]: updatedFilters})
  }

  return [filters, toggleFilter]
}