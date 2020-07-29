import React from 'react'
import { shallow } from 'enzyme'

import { PaymentMethod } from './PaymentMethod'
import { CASH, CARD } from '../lib/paymentMethods'

describe('PaymentMethod render an icon for cash or card payment', () => {
  it('renders cash icon for cash payment method', () => {
    const list = shallow(<PaymentMethod method={CASH} />)

    expect(list.first().text()).toEqual('💶')
  })

  it('renders card icon for card payment method', () => {
    const list = shallow(<PaymentMethod method={CARD} />)

    expect(list.first().text()).toEqual('💳')
  })
})
