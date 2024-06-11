import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {
  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */
  describe('sum function', () => {
    test('throws an error "pass valid numbers" when called with no arguments', () => {
      expect(() => sum()).toThrow('pass valid numbers')
    })
    test('throws an error "pass valid numbers" when called with a string argument', () => {
      expect(() => sum(2, 'seven')).toThrow('pass valid numbers')
    })
    test('returns 4 when called with 1 and 3', () => {
      expect(sum(1, 3)).toBe(4)
    })
    test('returns 3 when called with "1" and 2', () => {
      expect(sum('1', 2)).toBe(3)
    })
    test('returns 13 when called with "10" and "3"', () => {
      expect(sum('10', '3')).toBe(13)
    })
  })

  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */

  describe('HelloWorld component', () => {
    test('renders a link that reads "Home"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('Home')).toBeInTheDocument()
    })
    test('renders a link that reads "About"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('About')).toBeInTheDocument()
    })
    test('renders a link that reads "Blog"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('Blog')).toBeInTheDocument()
    })
    test('renders a text that reads "The Truth"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('The Truth')).toBeInTheDocument()
    })
    test('renders a text that reads "JavaScript is pretty awesome"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('JavaScript is pretty awesome')).toBeInTheDocument()
    })
    test('renders a text that includes "javaScript is pretty"', () => {
      render(<HelloWorld />)
      expect(screen.queryByText('javaScript is pretty', { exact: false })).toBeInTheDocument()
    })
  })
})

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}

export default HelloWorld
