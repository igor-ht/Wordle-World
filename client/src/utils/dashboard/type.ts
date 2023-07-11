export type userStatsType = {
	points: number;
	discoveredWords: string[];
	following: userStatsType[];
};
export type rankType = {
	ranking: userRankType[];
	user: userRankType;
};
type userRankType = {
	place: number;
	name: string;
	points: number;
};
export type dashboardDataType = {
	rank: rankType;
	userStats: userStatsType;
};
