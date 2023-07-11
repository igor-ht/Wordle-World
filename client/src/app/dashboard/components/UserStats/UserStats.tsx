import './userStats.scss';
import { ChangeEvent, useRef } from 'react';
import { userStatsType } from '@/src/utils/dashboard/type';

export default function UserStats(userStats: userStatsType) {
	const tableRef = useRef<HTMLTableRowElement | null>(null);

	const filterDiscoveredWords = (event: ChangeEvent<HTMLInputElement>) => {
		const filteredArray = userStats.discoveredWords.filter((word) => {
			if (word.match(event.target.value)) return true;
			return false;
		});
		tableRef.current!.innerHTML = filteredArray
			.map((word) => {
				return `<td key=${word}>
					<p>${word}</p>
				</td>`;
			})
			.join('');
	};

	return (
		<div className="user-stats-container">
			<div className="user-points-container">
				<h2>Total Points:</h2>
				<h1 className="points">{userStats ? userStats?.points?.toLocaleString() : 0}</h1>
			</div>
			<div className="title-search-section">
				<h3>Discovered Words:</h3>
				<input
					type="text"
					name="search"
					id="search-discovered-word"
					placeholder="search for a discovered word"
					onChange={filterDiscoveredWords}
				/>
			</div>
			<div className="user-discovered-words-container">
				<table>
					<tbody>
						<tr
							ref={tableRef}
							className="tr-grid">
							{userStats?.discoveredWords?.map((word) => {
								return (
									<td key={Math.random() * Date.now()}>
										<p>{word}</p>
									</td>
								);
							})}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
