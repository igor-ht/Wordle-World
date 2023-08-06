import './ranking.scss';

export default function RankingLoadingSkeleton() {
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
					<tr style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
						<td></td>
						<td></td>
						<td></td>
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
				<tbody style={{ overflow: 'hidden' }}>
					{new Array(15).fill(null).map((cell, index) => {
						return (
							<tr
								key={index}
								style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
