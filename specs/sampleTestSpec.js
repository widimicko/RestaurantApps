/* eslint-disable no-undef */
const sum = (a, b) => a + b

describe('A Sample Test for Sum', () => {
  it('should return a + b value', () => {
    expect(sum(3, 3))
      .toEqual(6)
  })
})
