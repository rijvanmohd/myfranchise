import React from 'react'
import { Router } from 'react-router-dom'
import {render, cleanup, fireEvent, screen} from '@testing-library/react'
import { createMemoryHistory } from 'history'
import renderer from 'react-test-renderer';
import App from './App'

afterEach(cleanup)

describe('Take a snapshot', () => {
  afterEach(cleanup)
    it('should take a snapshot', () => {
    const { asFragment } = render(<App />)
    
    expect(asFragment(<App />)).toMatchSnapshot()
   })
});

// test('landing on a bad page', () => {
//   const history = createMemoryHistory()
//   history.push('/some/bad/route')
//   render(
//     <Router history={history}>
//       <App />
//     </Router>
//   )

//   expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
// })

