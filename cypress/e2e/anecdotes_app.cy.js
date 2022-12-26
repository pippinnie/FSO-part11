describe('Anecdotes', function() {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('11.11.2022')
    cy.contains('Premature optimization is the root of all evil.')
  })
})