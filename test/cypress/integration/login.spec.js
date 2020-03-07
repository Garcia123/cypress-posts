

describe('Pruebas de login', () =>{
    
    before(() => {
        cy.exec('npm run test:clean');
    });

    beforeEach(() => {
        cy.fixture('users.json').as('userData');
        cy.visit('/login');
        cy.contains('h1','Bienvenido').should('be.visible');
    });

    // skip
    it('debe registrar un usuario', ()=> {

        cy.get('@userData').then(user => {
            cy.createUser(user);
            cy.screenshot('create-user');
        });
        
    });

    it('debe fallar con un usuario erroneo', ()=> {

        // cy.contains("Crear una cuenta")
        cy.loginUser('falil@test.com','test1234');
        cy.get('.error-msg').should('be.visible');
        cy.screenshot('login-failed', {blackout: ['#email1']});
    });

    it('debe logearse un usuario', ()=> {
        cy.get('@userData').then(user => {
            cy.loginUser(user.email, user.psswrod);
            cy.screenshot('login-user');
            cy.contains('a', 'Dashboard').should('be.visible');
        });
        // cy.contains("Crear una cuenta")
        
        
    });

    after(() => {
        cy.log('Test finalizado');
    })
});