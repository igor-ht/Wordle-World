// game state
export type playStateType = 'start' | 'play' | 'victory' | 'defeat' | 'guestLimit';
export type stateActionType = { type: 'setStart' | 'setPlay' | 'setVictory' | 'setDefeat' | 'setGuestLimit' };
export const playStateReducer = (state: playStateType, action: stateActionType) => {
	switch (action.type) {
		case 'setPlay':
			return 'play';
		case 'setVictory':
			return 'victory';
		case 'setDefeat':
			return 'defeat';
		case 'setGuestLimit':
			return 'guestLimit';
		case 'setStart':
			return 'start';
		default:
			return state;
	}
};

// game settings
type LanguagesType = 'en' | 'es' | 'pt' | 'he';
export type gameSettingsType = {
	language: LanguagesType;
	wordLength: number;
	totalChances: number;
};
type setLanguageType = { type: 'setLanguage'; payload: LanguagesType };
type setWordLengthType = { type: 'setWordLength'; payload: number };
type setTotalChancesType = { type: 'setTotalChances'; payload: number };
export type gameSettingsActionType = setLanguageType | setWordLengthType | setTotalChancesType;
export const gameSettingsReducer = (state: gameSettingsType, action: gameSettingsActionType) => {
	switch (action.type) {
		case 'setLanguage':
			return { ...state, language: action.payload };
		case 'setWordLength':
			return { ...state, wordLength: action.payload };
		case 'setTotalChances':
			return { ...state, totalChances: action.payload };
		default:
			throw new Error();
	}
};

// current match
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
