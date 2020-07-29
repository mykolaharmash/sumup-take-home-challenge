import React from 'react'
import { shallow } from 'enzyme'

import { Amount } from './Amount'

describe('Amount renders transaction amount with appropriate sign', () => {
  it('renders plus sign for positive amount', () => {
    const list = shallow(<Amount amount={555} />)

    expect(list.find('[data-test-id="sign"]').text()).toEqual('+')
  })

  it('renders minus sign for negative amount', () => {
    const list = shallow(<Amount amount={-555} />)

    expect(list.find('[data-test-id="sign"]').text()).toEqual('-')
  })

  it('renders amount number without a sign when amount is negative', () => {
    const list = shallow(<Amount amount={-555} />)

    expect(list.find('[data-test-id="amount"]').text()[0]).not.toEqual('-')
  })
})
