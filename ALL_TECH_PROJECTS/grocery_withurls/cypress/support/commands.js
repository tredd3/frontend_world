Cypress.Commands.add('openApp', () => {
  cy.viewport(411, 731);
  cy.visit('/');
});

Cypress.Commands.add('goToPLPViaCategoryWidget1', () => {
  cy.openApp();
  cy
    .get('[data-testid=category1]')
    .first()
    .click()
    .get('#target')
    .contains('Sort/Filter')
    .click()
    .get('[class*=Filter-popper]')
    .contains('Categories')
    .click()
    .get('label')
    .first()
    .click()
    .get('[class*=Filter-backdrop]')
    .click()
    .get('[style="border: 1px solid rgb(0, 102, 192);"]')
    .first()
    .scrollIntoView()
    .click();
});

Cypress.Commands.add('goToPLPViaCategoryGrid', () => {
  cy.openApp();
  cy
    .get('[data-testid=Widget12]')
    .children()
    .next()
    .children()
    .first()
    .click();
  cy.location().should(loc => {
    expect(loc.pathname).contains('/products/categories');
  });
});
