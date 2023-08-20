// game state
export type PlayStateType = 'start' | 'play' | 'victory' | 'defeat' | 'guestLimit';
export type StateActionType = { type: 'setStart' | 'setPlay' | 'setVictory' | 'setDefeat' | 'setGuestLimit' };
export const playStateReducer = (state: PlayStateType, action: StateActionType) => {
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
export type GameSettingsType = {
	language: LanguagesType;
	wordLength: number;
	totalChances: number;
};
type SetLanguageType = { type: 'setLanguage'; payload: LanguagesType };
type SetWordLengthType = { type: 'setWordLength'; payload: number };
type SetTotalChancesType = { type: 'setTotalChances'; payload: number };
export type GameSettingsActionType = SetLanguageType | SetWordLengthType | SetTotalChancesType;
export const gameSettingsReducer = (state: GameSettingsType, action: GameSettingsActionType) => {
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
export type GameStateType = {
	word: string;
	currentLetter: string;
	currentGuess: string;
	guessNumber: number;
};
type SetRandomWordType = { type: 'setRandomWord'; payload: string };
type SetCurrentLetterActionType = { type: 'setCurrentLetter'; payload: string };
type SetCurrentGuessActionType = { type: 'setCurrentGuess'; payload: string };
type SetGuessNumberActionType = { type: 'setGuessNumber'; payload: number };
type ResetStateActionType = { type: 'resetState' };
export type gameStateActionType =
	| SetRandomWordType
	| SetCurrentLetterActionType
	| SetCurrentGuessActionType
	| SetGuessNumberActionType
	| ResetStateActionType;
export const gameStateReducer = (state: GameStateType, action: gameStateActionType) => {
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
