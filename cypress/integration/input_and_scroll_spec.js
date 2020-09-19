describe('input search keywords and see the result', () => {
  beforeEach(() => {
    cy.exec('yarn start');
    cy.server();
    cy.route('https://api.github.com/search/repositories*').as('getRepos');

  })

  it('successfully loads', () => {
    cy.visit('/');
  })

  it("should have the right initial state", function() {
    cy.window()
      .its("store")
      .invoke("getState")
      .should("deep.equal", { inputReducer: { repos: [] } });
  });

  it('input keywords: redux', () => {
    cy.get('input[aria-label=search]').type('redux');
    cy.wait('@getRepos');
    cy.get('nav').should('not.be.empty');
  })

  it('scroll to bottom, and load more results', () => {
    cy.get('.observer').scrollIntoView({
      duration: 1000,
    }).should('not.be.visible');
    cy.wait('@getRepos');
    cy.get('.observer').should('not.be.visible');
  })
})