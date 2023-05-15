'use client';

import './ranking.scss';
import useRanking from '@/src/utils/dashboard/useRanking';

export default function Ranking() {
	const { ranking } = useRanking();

	return (
		<div className="ranking-container">
			<h1>Wordle World Ranking</h1>
			<table className="user-rank">
				<thead>
					<tr>
						<th colSpan={3}>Your ranking</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{ranking.user.place.toLocaleString()}</td>
						<td>{ranking.user.name}</td>
						<td>{ranking.user.points.toLocaleString()}</td>
					</tr>
				</tbody>
			</table>
			<table className="ranking">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Name</th>
						<th>Points</th>
					</tr>
				</thead>
				<tbody>
					{ranking.ranking.map((user, i) => {
						return (
							<tr key={i + 1}>
								<td key={i + 1 * Math.random()}>{(i + 1).toLocaleString()}</td>
								<td key={i + 1 * Math.random()}>{user.name}</td>
								<td key={i + 1 * Math.random()}>{user.points.toLocaleString()}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
