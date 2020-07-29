import { transactionsRoute } from './transactionsRoute'

describe('transactionsRoute sends back a slice of transactions list', () => {
  let req
  let res

  beforeEach(() => {
    req = {
      transactions: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
      ],
      query: {},
    }
    res = {
      send: jest.fn(),
    }
  })

  it('sends back list transactions based on offset and limit parameters', () => {
    req.query.offset = 0
    req.query.limit = 5

    transactionsRoute(req, res)

    expect(res.send).toHaveBeenCalledWith({
      transactions: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    })
  })

  it('handles non-zero offset correctly', () => {
    req.query.offset = 3
    req.query.limit = 3

    transactionsRoute(req, res)

    expect(res.send).toHaveBeenCalledWith({
      transactions: [{ id: 3 }, { id: 4 }, { id: 5 }],
    })
  })

  it('handles limit which is greater than the number of transactions', () => {
    req.query.offset = 0
    req.query.limit = 100

    transactionsRoute(req, res)

    expect(res.send).toHaveBeenCalledWith({
      transactions: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
      ],
    })
  })

  it('falls back to default offset and limit if they are not present in the request', () => {
    transactionsRoute(req, res)

    expect(res.send).toHaveBeenCalledWith({
      transactions: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
      ],
    })
  })

  it('throws if offset is less then zero', () => {
    req.query.offset = -1
    req.query.limit = 100

    expect(() => transactionsRoute(req, res)).toThrow()
  })

  it('throws if offset is not a number', () => {
    req.query.offset = 'hello'
    req.query.limit = 100

    expect(() => transactionsRoute(req, res)).toThrow()
  })

  it('throws if limit is less then zero', () => {
    req.query.offset = 0
    req.query.limit = -1

    expect(() => transactionsRoute(req, res)).toThrow()
  })

  it('throws if limit is not a number', () => {
    req.query.offset = 0
    req.query.limit = 'hello'

    expect(() => transactionsRoute(req, res)).toThrow()
  })
})
