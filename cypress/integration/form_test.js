describe('test form', function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000/Pizza");
    });
    it('add test', function(){
        cy.get('input[name="name"]')
            .type("ace")
            .should("have.value", "ace");
        cy.get('input[name="name"]')
            .clear()
        cy.contains('name must be at least 2 characters');
        cy.get('button')
        .should('be.disabled');
        cy.get('input[name="name"]')
            .type("ace")
            .should("have.value", "ace");
        cy.get('#size')
            .select('large')
            .should("have.value", "large");
        cy.get(':nth-child(3) > :nth-child(3) > :nth-child(2) > input')
            .check()
            .should('be.checked');
        cy.get('[type="checkbox"]')
            .check(['cheese', 'peps'])
            .should('be.checked');
        cy.get("textarea")
            .type('banana')
            .should('have.value', 'banana');
        cy.get('button').click();
    });
});