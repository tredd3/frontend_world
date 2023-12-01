context('Product Description Page', () => {
  it('should go to productDescription page when a product is clicked', () => {
    cy.goToPLPViaCategoryGrid();
    cy.get('[data-testid=plp-results]')
      .children()
      .first()
      .next()
      .next()
      .children()
      .first()
      .click();
    cy.location().should(loc => {
      expect(loc.pathname).contains('/productDescription');
    });
  });
});
