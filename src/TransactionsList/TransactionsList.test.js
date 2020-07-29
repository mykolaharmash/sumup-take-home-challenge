import React from 'react'
import { shallow } from 'enzyme'
import { useTransactions } from '../useTransactions.hook'
import { TransactionsList } from './TransactionsList'
import { Spinner } from '../Spinner/Spinner'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { TransactionItem } from '../TransactionItem/TransactionItem'

jest.mock('../useTransactions.hook')

describe('TransactionsList handles all stages of transactions loading', () => {
  it('renders spinner when transactions are still being loaded', () => {
    useTransactions.mockReturnValue([[], null, true])

    const list = shallow(<TransactionsList />)

    expect(list.find(Spinner).length).toEqual(1)
  })

  it('renders error when could not fetch transactions', () => {
    useTransactions.mockReturnValue([[], new Error('failed'), false])

    const list = shallow(<TransactionsList />)

    expect(list.find(ErrorMessage).length).toEqual(1)
  })

  it('renders list of transactions', () => {
    useTransactions.mockReturnValue([
      [{ id: 0 }, { id: 1 }, { id: 2 }],
      null,
      false,
    ])

    const list = shallow(<TransactionsList />)

    expect(list.find(TransactionItem).length).toEqual(3)
  })
})
