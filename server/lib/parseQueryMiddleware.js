import { PAYMENT_METHOD_LIST } from './paymentMethods'
import { STATUS_LIST } from './statuses'

function validatePaymentMethods(paymentMethods) {
  return paymentMethods.map(method => {
    if (!PAYMENT_METHOD_LIST.includes(method)) {
      throw new Error(`Unsupported value for payment method filter: ${method}`)
    }

    return method
  })
}

function validateStatuses(statuses) {
  return statuses.map(status => {
    if (!STATUS_LIST.includes(status)) {
      throw new Error(`Unsupported value for status filter: ${status}`)
    }

    return status
  })
}

function parsePaymentMethodsFilter(req) {
  const paymentMethods = (req.query.paymentMethods || '')
    .split(',')
    .filter(item => item !== '')

  console.log(paymentMethods)

  if (paymentMethods.length === 0) {
    return PAYMENT_METHOD_LIST
  }

  return validatePaymentMethods(paymentMethods)
}

function parseStatusesFilter(req) {
  const statuses = (req.query.statuses || '')
    .split(',')
    .filter(item => item !== '')

  if (statuses.length === 0) {
    return STATUS_LIST
  }

  return validateStatuses(statuses)
}

function parseOffset(req) {
  const offset = parseInt(req.query.offset || 0, 10)

  if (isNaN(offset)|| offset < 0) {
    throw new Error(
      `'offset' parameter should be positive number. Provided offset=${req.query.offset}.`
    )
  }

  return offset
}

function parseLimit(req) {
  const limit = parseInt(req.query.limit || 0, 10)

  if (isNaN(limit)|| limit < 0) {
    throw new Error(
      `'limit' parameter should be positive number. Provided limit=${req.query.limit}.`
    )
  }

  return limit
}

export function parseQuery(req, res, next) {
  req.offset = parseOffset(req)
  req.limit = parseLimit(req)
  req.filters = {
    paymentMethods: parsePaymentMethodsFilter(req),
    statuses: parseStatusesFilter(req)
  }

  next()
}
