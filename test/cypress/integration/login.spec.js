

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
            cy.get('#login > section > div.col2 > form > div > a:nth-child(2)').click();
            cy.get('#name').type(user.name);
            cy.get('#title').type(user.conpany);
            cy.get('#email2').type(user.email);
            cy.get('#password2').type(user.psswrod);
            cy.contains('.button', "Registrarse").click();
            cy.wait(3000);
            cy.get('.error-msg').should('not.exist');
        });
        
    });

    it('debe fallar con un usuario erroneo', ()=> {

        // cy.contains("Crear una cuenta")
        cy.loginUser('falil@test.com','test1234');
        cy.get('.error-msg').should('be.visible');
        
    });

    it('debe logearse un usuario', ()=> {
        cy.get('@userData').then(user => {
            cy.loginUser(user.email, user.psswrod);
            cy.contains('a', 'Dashboard').should('be.visible');
        });
        // cy.contains("Crear una cuenta")
        
        
    });

    after(() => {
        cy.log('Test finalizado');
    })
});