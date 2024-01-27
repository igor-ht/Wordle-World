import cypress from 'cypress';

describe('Common components testing', () => {
	it('LiknsSignInSignUp component testing', () => {
		cy.visit('http://localhost:3000/play');
		cy.get('.links-signin-signup').should('be.visible');
		cy.get('.links-signin-signup a[href="/signin"]').should('be.visible').click({ force: true });
		cy.url().should('include', '/signin');
		cy.visit('http://localhost:3000/play');
		cy.get('.links-signin-signup a[href="/signup"]').should('be.visible').click({ force: true });
		cy.url().should('include', '/signup');
	});
});
