import cypress from 'cypress';

describe('HomePage testing', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});
	it('home-page div exists', () => {
		cy.get('.home-page').should('be.visible');
	});
	it('Has a title', () => {
		cy.get('.title-wrapper').should('be.visible');
		cy.get('.page-title').should('be.visible');
	});
	it('Has a Cube', () => {
		cy.get('.cube-container').should('be.visible');
		cy.get('.cube').should('be.visible');
		cy.get('.cube').should('have.css', 'animation-play-state', 'running');
	});
	// it('Cube animation stops on mouse hover', () => {
	// 	cy.get('.cube').trigger('mouseover').should('have.css', 'animation-play-state', 'paused');
	// });
});
