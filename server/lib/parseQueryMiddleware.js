import {PAYMENT_METHOD_LIST} from '../lib/paymentMethods'
import {STATUS_LIST} from '../lib/statuses'

function parseOffset(req) {
  const offset = parseInt(req.query.offset || 0, 10)

  if (isNaN(offset) || offset < 0) {
    throw new Error(
      `'offset' parameter should be positive numbers. Provided offset=${req.query.offset}.`
    )
  }

  return offset
}

function parseLimit(req) {
  const limit = parseInt(req.query.limit || 100, 10)

  if (isNaN(limit) || limit < 0) {
    throw new Error(
      `'limit' parameter should be positive numbers. Provided limit=${req.query.limit}.`
    )
  }

  return limit
}

// paymentMethod=cash,card

function parsePaymentMethodFilter(req) {
  const paymentMethods = (req.query.paymentMethods || '')
    .split(',')
    .filter((s) => s !== '')

  if (paymentMethods.length === 0) {
    return PAYMENT_METHOD_LIST
  }

  return paymentMethods
}

function parseStatusesFilter(req) {
  const statuses = (req.query.statuses || '')
    .split(',')
    .filter((s) => s !== '')

  if (statuses.length === 0) {
    return STATUS_LIST
  }

  return statuses
}

export function parseQuery(req, res, next) {
  req.offset = parseOffset(req)
  req.limit = parseLimit(req)
  req.filters = {
    paymentMethods: parsePaymentMethodFilter(req),
    statuses: parseStatusesFilter(req)
  }
  
  next()
}