import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import App from './App';

describe('Enzyme testing', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});

describe('react-testing-library', () => {
  it('renders welcome message', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome to the SumUp task!')).toBeInTheDocument();
  });
});
