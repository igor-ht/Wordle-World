import './ranking.scss';
import { rankType } from '@/src/utils/dashboard/type';

export default function Ranking(rank: rankType) {
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
						<td>{rank?.user?.place.toLocaleString()}</td>
						<td>{rank?.user?.name}</td>
						<td>{rank?.user?.points.toLocaleString()}</td>
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
					{rank?.ranking?.map((user, i) => {
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
