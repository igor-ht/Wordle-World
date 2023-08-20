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
	return currentInputElement;
};

export const handleRowChange = async (currentInputElement: HTMLInputElement | null) => {
	currentInputElement?.parentElement?.classList.remove('span-complete');
	const nextRow = currentInputElement?.parentElement?.nextElementSibling as HTMLSpanElement;
	const firstInput = nextRow.firstElementChild as HTMLInputElement;
	currentInputElement?.classList.remove('current-input');
	firstInput.classList.add('current-input');
	return firstInput;
};

export const resetGameComponents = async (
	keyboardContainerElement: HTMLDivElement | null,
	currentInputElement: HTMLInputElement | null
) => {
	const keysButtons = keyboardContainerElement?.querySelectorAll('button');
	keysButtons?.forEach((button) => {
		button.classList.remove('bull');
		button.classList.remove('cow');
		button.classList.remove('wrong');
	});
	const inputContainer = currentInputElement?.parentElement?.parentElement as HTMLDivElement;
	const inputCells = inputContainer.querySelectorAll('input');
	let firstInput = inputContainer.querySelector('#1') as HTMLInputElement;
	inputCells.forEach((input, j) => {
		input.value = '';
		input.blur();
		input.className = '';
		if (input.id === '1') {
			input.className = 'current-input';
			firstInput = input;
		}
	});
	return firstInput;
};

export const handleInputCellsUpdate = async (guessAnswer: [string], currentInputElement: HTMLInputElement | null) => {
	const currentRow = currentInputElement?.parentElement as HTMLSpanElement;
	const inputCells = currentRow?.childNodes as NodeListOf<HTMLInputElement>;
	inputCells.forEach((input, index) => {
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

export const handleKeyboardUpdate = async (guessAnswer: [string], keyboardContainer: HTMLDivElement | null, currentGuess: string) => {
	guessAnswer.map((letterAnswer: string, i: number) => {
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
