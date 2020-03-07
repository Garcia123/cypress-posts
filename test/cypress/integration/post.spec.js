
describe('Pruebas de post', () => {

    before(() => {
        cy.exec('npm run test:clean');
        cy.fixture('users.json').as('user');
        cy.visit('/login');
        cy.get('@user').then(user => {
            cy.createUser(user);
            cy.visit('/dashboard');
            cy.wait(3000);
        });
    });

    it('debe crear un post', () => {
        cy.get('@user').then(user =>{
            cy.get('textarea').type(Cypress.env('postContent'));
            cy.contains('button', 'Crear').as('botonCrear');
            cy.get('@botonCrear').should('be.enabled');
            cy.get('@botonCrear').click();
            cy.contains('.post > h5', user.name).should('be.visible');
            cy.contains('.post > p',Cypress.env('postContent'))
                .should('be.visible');
        });
    });

});