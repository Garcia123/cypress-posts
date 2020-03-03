


describe('Pruebas de login', () =>{

    beforeEach(() => {
        cy.fixture('users.json').as('userData');
        cy.visit('/login');
        cy.contains('h1','Bienvenido').should('be.visible');
    });
    // skip
    it.skip('crear una cuenta', async ()=> {
        cy.get('@userData').then(user => {
            cy.get('.extras > :nth-child(2)').click();
            cy.get('#name').type(user.name);
            cy.get('#title').type(user.conpany);
            cy.get('#email2').type(user.email);
            cy.get('#password2').type(user.psswrod);
            cy.contains('.button', "Registrarse").click();
            cy.wait(3000);
            cy.get('.error-msg').should('not.exist');
        });
        // cy.contains("Crear una cuenta")
        
    });

    it('debe fallar con un usuario erroneo', ()=> {

        // cy.contains("Crear una cuenta")
        cy.get('#email1').type("jose@jose.com");
        cy.get('#password1').type("test1234");
        cy.contains('.button',"Ingresar").click();
        cy.wait(3000);
        cy.get('.error-msg').should('be.visible');
        
    });

    it('debe logearse un usuario', ()=> {
        cy.get('@userData').then(user => {
            cy.get('#email1').type(user.email);
            cy.get('#password1').type(user.psswrod);
            cy.contains('.button',"Ingresar").click();
            cy.wait(3000);
            cy.contains('a', 'Dashboard').should('be.visible');
        });
        // cy.contains("Crear una cuenta")
        
        
    });

    after(() => {
        cy.log('Test finalizado');
    })
});