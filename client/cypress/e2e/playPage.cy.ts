import cypress from 'cypress';

describe('Testing /play page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/');
		cy.get('.menu-icon').click();
		cy.get('li').last().click();
		cy.wait(2000);
	});
	describe('InputContainer testing', () => {
		it('Checking elements quantity', () => {
			cy.get('.input-container').then(($inputContainer) => {
				const spanRows = $inputContainer.find('span');
				expect(spanRows.length).equal(6);
				const inputCells = $inputContainer.find('input[type="text"]');
				expect(inputCells.length).equal(30);
			});
		});
		it('First input should have class "current-input"', () => {
			cy.get('.input-container').find('span').first().as('first-row');
			cy.get('@first-row').find('input[type="text"]').first().as('first-input');
			cy.get('@first-input').should('have.class', 'current-input');
		});
		it('All inputs should be disabled', () => {
			cy.get('input[type="text"]').should('be.disabled');
		});
		it('Should insert letter in first input and change to next input with KeyboardEvent', () => {
			cy.get('.input-container input:first').should('have.value', '');
			cy.get('.app').type('a');
			cy.get('input')
				.first()
				.should('have.value', 'A')
				.should('not.have.class', 'current-input')
				.next()
				.should('have.class', 'current-input');
		});
		it.only('Should insert letter and than remove it', () => {
			cy.get('.input-container input:first').should('have.value', '').should('have.class', 'current-input');
			cy.get('.app').type('a');
			cy.get('.input-container input:first').should('have.value', 'A').should('not.have.class', 'current-input');
			cy.get('.app').type('{Backspace}');
			cy.get('.input-container input:first').should('have.value', '').should('have.class', 'current-input');
		});
		it('Should insert full row and goes to next row after pressing "Enter"', () => {
			cy.get('.app').type('tests');
			cy.get('.input-container span:first').should('have.class', 'span-complete');
			cy.get('.app').type('{Enter}');
			cy.get('.input-container span:first').should('not.have.class', 'span-complete');
			cy.get('.input-container span:first').next().as('next-span');
			cy.get('@next-span').find('input:first').should('have.class', 'current-input');
		});
	});
	describe('KeyboardContainer testing', () => {
		it('Checking elements quantity', () => {
			cy.get('.keyboard-container').then(($keyboardContainer) => {
				const rows = $keyboardContainer.find('.container-row');
				expect(rows.length).equal(3);
				const keys = $keyboardContainer.find('button');
				expect(keys.length).equal(28);
			});
		});
		it('Should insert a letter to the first input and goes to the next', () => {
			cy.get('.container-row:first button:first').as('key-q').click();
			cy.get('.input-container span:first input:first').should('have.value', 'Q').next().should('have.class', 'current-input');
		});
		it('Should insert a letter and than delete it', () => {
			cy.get('.container-row:first button:first').as('key-q').click();
			cy.get('.input-container span:first input:first').should('have.value', 'Q').next().should('have.class', 'current-input');
			cy.get('.container-row .backspace').click();
			cy.get('.input-container span:first input:first').should('have.value', '').should('have.class', 'current-input');
		});
		it('Should insert a full row and goes to the next', () => {
			cy.get('.container-row:first button:first').as('key-q').click().click().click().click().click();
			cy.get('.input-container span:first').should('have.class', 'span-complete');
			cy.get('.container-row .enter').click();
			cy.get('.input-container span:first').should('not.have.class', 'span-complete');
			cy.get('.input-container span:first').next().as('next-span');
			cy.get('@next-span').find('input:first').should('have.class', 'current-input');
		});
	});
});
