import cypress from 'cypress';

describe('Index Page testing', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});
	describe('Navbar and Menu testing', () => {
		it('Wordle logo and menu icon', () => {
			cy.get('.navbar').should('be.visible');
			cy.get('.wordle-icon img').should('have.attr', 'src', '/wordle.logo.svg');
			cy.get('.menu-icon img').should('have.attr', 'src', '/menu.svg');
		});
		it('opens the menu when menu icon is clicked', () => {
			cy.get('.menu-container').should('not.be.visible');
			cy.get('.menu-icon').click();
			cy.get('.menu-container').should('be.visible');
		});
		it('closes the menu when menu icon is clicked again', () => {
			cy.get('.menu-icon').click();
			cy.get('.menu-container').should('be.visible');
			cy.get('.menu-icon').click();
			cy.get('.menu-container').should('not.be.visible');
		});
		it('closes the menu when link in menu is clicked', () => {
			cy.get('.menu-icon').click();
			cy.get('.menu-container').should('be.visible');
			cy.get('.menu-container a').click({ force: true, multiple: true });
			cy.get('.menu-container').should('not.be.visible');
		});
		it('goes to "/" when clicking wordle logo', () => {
			cy.get('.wordle-icon img').click();
			cy.url().should('eq', 'http://localhost:3000/');
		});
	});
});
