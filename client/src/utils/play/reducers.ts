export type playStateType = {
	play: boolean;
	victory: boolean;
	defeat: boolean;
};
export type stateActionType = {
	type: 'setPlay' | 'setVictory' | 'setDefeat';
	payload: boolean;
};
export const playStateInitialState: playStateType = {
	play: false,
	victory: false,
	defeat: false,
};
export const playStateReducer = (state: playStateType, action: stateActionType) => {
	switch (action.type) {
		case 'setPlay':
			return { ...state, play: action.payload };
		case 'setVictory':
			return { ...state, victory: action.payload };
		case 'setDefeat':
			return { ...state, defeat: action.payload };
		default:
			throw new Error();
	}
};

export type gameSettingsType = {
	language: string;
	wordLength: number;
	totalChances: number;
};
type setLanguageType = { type: 'setLanguage'; payload: 'eng' | 'spa' };
type setWordLengthType = { type: 'setWordLength'; payload: number };
type setTotalChancesType = { type: 'setTotalChances'; payload: number };
type resetStateType = { type: 'resetState' };
export type gameSettingsActionType = setLanguageType | setWordLengthType | setTotalChancesType | resetStateType;
export const gameSettingsInitialState: gameSettingsType = {
	language: 'eng',
	wordLength: 5,
	totalChances: 6,
};
export const gameSettingsReducer = (state: gameSettingsType, action: gameSettingsActionType) => {
	switch (action.type) {
		case 'setLanguage':
			return { ...state, language: action.payload };
		case 'setWordLength':
			return { ...state, wordLength: action.payload };
		case 'setTotalChances':
			return { ...state, totalChances: action.payload };
		case 'resetState':
			return { language: 'eng', wordLength: 5, totalChances: 6 };
		default:
			throw new Error();
	}
};

export type gameStateType = {
	word: string;
	currentLetter: string;
	currentGuess: string;
	guessNumber: number;
};
type setRandomWordType = { type: 'setRandomWord'; payload: string };
type setCurrentLetterActionType = { type: 'setCurrentLetter'; payload: string };
type setCurrentGuessActionType = { type: 'setCurrentGuess'; payload: string };
type setGuessNumberActionType = { type: 'setGuessNumber'; payload: number };
type resetStateActionType = { type: 'resetState' };
export type gameStateActionType =
	| setRandomWordType
	| setCurrentLetterActionType
	| setCurrentGuessActionType
	| setGuessNumberActionType
	| resetStateActionType;
export const gameStateInitialState: gameStateType = {
	word: '',
	currentLetter: '',
	currentGuess: '',
	guessNumber: 1,
};
export const gameStateReducer = (state: gameStateType, action: gameStateActionType) => {
	switch (action.type) {
		case 'setRandomWord':
			return { ...state, word: action.payload };
		case 'setCurrentLetter':
			return { ...state, currentLetter: action.payload };
		case 'setCurrentGuess':
			return { ...state, currentGuess: action.payload };
		case 'setGuessNumber':
			return { ...state, guessNumber: action.payload };
		case 'resetState':
			return { word: '', currentLetter: '', currentGuess: '', guessNumber: 1 };
		default:
			throw new Error();
	}
};
