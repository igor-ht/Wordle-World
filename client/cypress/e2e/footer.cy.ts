import cypress from 'cypress';

describe('Footer testing', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});
	it('footer div exists', () => {
		cy.get('.footer').should('be.visible');
	});
	it('toggle theme button', () => {
		cy.get('.toggle-theme button img').should('be.visible');
		cy.get('.toggle-theme button img').should('have.attr', 'src', './dark-theme.svg').should('have.attr', 'alt', 'Light/Dark Mode');
		cy.get('[data-theme="light"]').should('exist');
		cy.get('.toggle-theme button').click({ force: true });
		cy.get('[data-theme="dark"]').should('exist');
		cy.get('.toggle-theme').click({ force: false });
		cy.get('[data-theme="light"]').should('exist');
	});
	it('toggle sound button', () => {
		cy.get('.toggle-sound button img').should('be.visible');
		cy.get('.toggle-sound button img').should('have.attr', 'src', './mute.svg').should('have.attr', 'alt', 'mute');
		cy.get('.toggle-sound').click({ force: false });
		cy.get('.toggle-sound button img').should('have.attr', 'src', './sound.svg').should('have.attr', 'alt', 'sound');
		cy.get('.toggle-sound').click({ force: false });
		cy.get('.toggle-sound button img').should('have.attr', 'src', './mute.svg').should('have.attr', 'alt', 'mute');
	});
});
