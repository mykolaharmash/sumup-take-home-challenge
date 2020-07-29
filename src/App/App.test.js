import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('Enzyme testing', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })
})
