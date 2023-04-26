export type userStatsType = {
	points: number;
	discoveredWords: string[];
	following: userStatsType[];
};
type setPointsType = {
	type: 'setPoints';
	payload: number;
};
type setDiscoveredWordsType = {
	type: 'setDiscoveredWords';
	payload: string[];
};
type setFollowingType = {
	type: 'setFollowing';
	payload: userStatsType[];
};
export type userStateActionType = setPointsType | setDiscoveredWordsType | setFollowingType;
export const userStatsInitialState: userStatsType = {
	points: 0,
	discoveredWords: [],
	following: [],
};
export const userStatsReducer = (state: userStatsType, action: userStateActionType) => {
	switch (action.type) {
		case 'setPoints':
			return { ...state, points: action.payload };
		case 'setDiscoveredWords':
			return { ...state, discoveredWords: action.payload };
		case 'setFollowing':
			return { ...state, following: action.payload };
		default:
			throw new Error();
	}
};

export type rankingType = {
	ranking: userRankType[];
	user: userRankType;
};
export type userRankType = {
	place: number;
	name: string;
	points: number;
};
export type setRankingActionType = {
	type: 'setRanking';
	payload: userRankType[];
};
export type setUserRankActionType = {
	type: 'setUserRanking';
	payload: userRankType;
};
export const rankingReducer = (state: rankingType, action: setRankingActionType | setUserRankActionType) => {
	switch (action.type) {
		case 'setRanking':
			return { ...state, ranking: action.payload };
		case 'setUserRanking':
			return { ...state, user: action.payload };
		default:
			throw new Error();
	}
};
