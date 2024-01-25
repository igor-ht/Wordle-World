import { useRef } from 'react';

// custom hook to control and abstract the logic behind input changes and colors update
const useDomHandlers = () => {
	const currentInputElement = useRef<HTMLInputElement | null>(null);
	const keyboardContainerElement = useRef<HTMLDivElement | null>(null);

	const handleInputCellChange = (gameSettingsWordLength: number) => {
		if (currentInputElement.current) {
			// check if is the last input field in the row
			if (+currentInputElement.current.id % gameSettingsWordLength === 0) {
				currentInputElement.current.classList.remove('current-input');
				currentInputElement.current.parentElement?.classList.add('span-complete');
				currentInputElement.current.parentElement?.classList.add('pop');
			} else {
				currentInputElement.current.classList.remove('current-input');
				currentInputElement.current.nextElementSibling?.classList.add('current-input');
				currentInputElement.current = currentInputElement.current.nextElementSibling as HTMLInputElement;
			}
		}
	};

	const handleRowChange = async () => {
		const currentRow = currentInputElement.current?.parentElement as HTMLSpanElement;
		currentInputElement.current?.classList.remove('current-input');
		currentRow?.classList.remove('span-complete');

		const firstCellInNextRow = currentRow?.nextElementSibling?.firstElementChild as HTMLInputElement;
		currentInputElement.current = firstCellInNextRow;
		currentInputElement.current?.classList.add('current-input');
	};

	const handleInputCellsUpdate = async (guessAnswer: [string]) => {
		const currentRow = currentInputElement.current?.parentElement as HTMLSpanElement;
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

	const handleKeyboardUpdate = async (guessAnswer: [string], currentGuess: string) => {
		guessAnswer.map((letterAnswer: string, i: number) => {
			const keyLetterClassList = keyboardContainerElement.current?.querySelector(`#${currentGuess[i]}`)?.classList;
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

	return {
		currentInputElement,
		keyboardContainerElement,
		handleInputCellChange,
		handleRowChange,
		handleInputCellsUpdate,
		handleKeyboardUpdate,
	};
};

export default useDomHandlers;
