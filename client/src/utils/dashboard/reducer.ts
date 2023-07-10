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
type userStatsActionType = setPointsType | setDiscoveredWordsType | setFollowingType;

export type rankType = {
	ranking: userRankType[];
	user: userRankType;
};
type userRankType = {
	place: number;
	name: string;
	points: number;
};
type setRankingActionType = {
	type: 'setRanking';
	payload: userRankType[];
};
type setUserRankActionType = {
	type: 'setUserRanking';
	payload: userRankType;
};
type rankActionType = setRankingActionType | setUserRankActionType;

export type dashboardDataType = {
	rank: rankType;
	userStats: userStatsType;
};
export type dashboardDataActionType = rankActionType | userStatsActionType;

export const dashboardDataInitialState: dashboardDataType = {
	rank: {
		ranking: [],
		user: {
			name: '',
			place: 0,
			points: 0,
		},
	},
	userStats: {
		points: 0,
		discoveredWords: [],
		following: [],
	},
};

export const dashboardDataReducer = (state: dashboardDataType, action: dashboardDataActionType) => {
	switch (action.type) {
		case 'setPoints':
			state.userStats.points = action.payload;
			return { ...state };
		case 'setDiscoveredWords':
			state.userStats.discoveredWords = action.payload;
			return { ...state };
		case 'setFollowing':
			state.userStats.following = action.payload;
			return { ...state };
		case 'setRanking':
			state.rank.ranking = action.payload;
			return { ...state };
		case 'setUserRanking':
			state.rank.user = action.payload;
			return { ...state };
		default:
			return { ...state };
	}
};
