// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('createUser', user => {
    cy.get('#login > section > div.col2 > form > div > a:nth-child(2)')
        .click();
    cy.get('#name').type(user.name);
    cy.get('#title').type(user.conpany);
    cy.get('#email2').type(user.email);
    cy.get('#password2').type(user.psswrod);
    cy.contains('.button', "Registrarse").click();
    cy.wait(3000);
    cy.get('.error-msg').should('not.exist');
});

Cypress.Commands.add('loginUser', (userName, password) => {
    cy.get('#email1').type(userName);
    cy.get('#password1').type(password);
    cy.contains('.button',"Ingresar").click();
    cy.wait(3000);
});