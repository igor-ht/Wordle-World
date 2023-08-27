// game state
export type PlayStateType = 'start' | 'play' | 'victory' | 'defeat' | 'guestLimit';
export type StateActionType = { type: 'setState'; payload: PlayStateType };
export const playStateReducer = (state: PlayStateType, action: StateActionType) => {
	switch (action.type) {
		case 'setState':
			return action.payload;
		default:
			return state;
	}
};

// game settings
type LanguagesType = 'EN' | 'ES' | 'PT' | 'HE';
export type GameSettingsType = {
	language: LanguagesType;
	wordLength: number;
	totalChances: number;
};

// current match
export type GameStateType = {
	word: string;
	currentGuess: string;
	guessNumber: number;
};
type SetRandomWordType = { type: 'setRandomWord'; payload: string };
type SetCurrentGuessActionType = { type: 'setCurrentGuess'; payload: string };
type SetGuessNumberActionType = { type: 'setGuessNumber'; payload: number };
type ResetStateActionType = { type: 'resetState' };
export type gameStateActionType = SetRandomWordType | SetCurrentGuessActionType | SetGuessNumberActionType | ResetStateActionType;

export const gameStateReducer = (state: GameStateType, action: gameStateActionType) => {
	switch (action.type) {
		case 'setRandomWord':
			return { ...state, word: action.payload };
		case 'setCurrentGuess':
			return { ...state, currentGuess: action.payload };
		case 'setGuessNumber':
			return { ...state, guessNumber: action.payload };
		case 'resetState':
			return { word: '', currentGuess: '', guessNumber: 1 };
		default:
			return state;
	}
};
