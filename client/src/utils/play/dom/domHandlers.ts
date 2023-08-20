export const handleInputCellChange = (currentInputElement: HTMLInputElement | null, gameSettings_wordLength: number) => {
	if (currentInputElement) {
		if (+currentInputElement.id % gameSettings_wordLength === 0) {
			currentInputElement.classList.remove('current-input');
			currentInputElement.parentElement?.classList.add('span-complete');
			currentInputElement.parentElement?.classList.add('pop');
		} else {
			currentInputElement.classList.remove('current-input');
			currentInputElement.nextElementSibling?.classList.add('current-input');
			return currentInputElement.nextElementSibling as HTMLInputElement;
		}
	}
	return currentInputElement as HTMLInputElement;
};

export const handleRowChange = async () => {
	const currentRow = document.querySelector('.span-complete');
	currentRow?.classList.remove('span-complete');
	currentRow?.lastElementChild?.classList.remove('current-input');
	const nextRow = currentRow?.nextElementSibling as HTMLSpanElement;
	const firstInput = nextRow.firstElementChild as HTMLInputElement;
	firstInput.classList.add('current-input');
	return firstInput;
};

export const handleInputCellsUpdate = async (guessAnswer: [string]) => {
	const currentRow = document.querySelector('.span-complete');
	const inputCells = currentRow?.querySelectorAll('input');
	inputCells?.forEach((input, index) => {
		switch (guessAnswer[index]) {
			case 'bull':
				input.className = 'bull';
				break;
			case 'cow':
				input.className = 'cow';
				break;
			case 'wrong':
				input.className = 'wrong';
				break;
		}
	});
};

export const handleKeyboardUpdate = async (guessAnswer: [string], currentGuess: string) => {
	guessAnswer.map((letterAnswer: string, i: number) => {
		const keyboardContainer = document.querySelector('.keyboard-container');
		const keyLetterClassList = keyboardContainer?.querySelector(`#${currentGuess[i]}`)?.classList;
		switch (letterAnswer) {
			case 'bull':
				if (keyLetterClassList?.contains('cow')) keyLetterClassList?.remove('cow');
				keyLetterClassList?.add('bull');
				break;
			case 'cow':
				if (keyLetterClassList?.contains('bull')) break;
				keyLetterClassList?.add('cow');
				break;
			case 'wrong':
				keyLetterClassList?.add('wrong');
				break;
		}
	});
};
