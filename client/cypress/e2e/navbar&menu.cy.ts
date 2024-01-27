import cypress from 'cypress';

describe('Navbar and Menu testing', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});
	it('Wordle logo and menu icon', () => {
		cy.get('.navbar').should('be.visible');
		cy.get('.wordle-icon img').should('have.attr', 'src', '/wordle-logo.svg');
		cy.get('#menu-icon img').should('have.attr', 'src', '/menu.svg');
	});
	it('opens the menu when menu icon is clicked', () => {
		cy.get('.menu-container').should('not.be.visible');
		cy.get('#menu-icon').click();
		cy.get('.menu-container').should('be.visible');
	});
	it('closes the menu when menu icon is clicked again', () => {
		cy.get('#menu-icon').click();
		cy.get('.menu-container').should('be.visible');
		cy.get('#menu-icon').click();
		cy.get('.menu-container').should('not.be.visible');
	});
	it('closes the menu when link in menu is clicked', () => {
		cy.get('#menu-icon').click();
		cy.get('.menu-container').should('be.visible');
		cy.get('.menu-container a').click({ force: false, multiple: true });
		cy.get('.menu-container').should('not.be.visible');
	});
	it('goes to "/" when clicking wordle logo', () => {
		cy.get('.wordle-icon img').click({ force: true });
		cy.url().should('eq', 'http://localhost:3000/');
	});
	it('goes to right router when clicking menu link', () => {
		//home page
		cy.get('.menu-container').click({ force: true });
		cy.get('.menu-container ul a[href="/"]').click({ force: true });
		cy.url().should('eq', 'http://localhost:3000/');
		//play page
		cy.get('.menu-container').click({ force: true });
		cy.get('.menu-container ul a[href="/play"]').click({ force: true });
		cy.url().should('eq', 'http://localhost:3000/play');
		//signin page
		cy.get('.menu-container').click({ force: true });
		cy.get('.menu-container ul a[href="/signin"]').click({ force: true });
		cy.url().should('eq', 'http://localhost:3000/signin');
		//signup page
		cy.get('.menu-container').click({ force: true });
		cy.get('.menu-container ul a[href="/signup"]').click({ force: true });
		cy.url().should('eq', 'http://localhost:3000/signup');
	});
});
