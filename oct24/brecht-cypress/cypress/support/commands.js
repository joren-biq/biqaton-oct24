Cypress.Commands.add('validateClick', { prevSubject: true }, (subject) => {
  cy.get(subject).scrollIntoView();
  cy.wrap(subject).should('be.enabled').click({ force: true });
});
