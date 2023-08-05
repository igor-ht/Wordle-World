import './userStats.scss';

export default function UserStatsLoadingSkeleton() {
	return (
		<div className="user-stats-container">
			<div className="user-points-container">
				<h2>Total Points:</h2>
				<span
					style={{
						width: '100%',
						height: '60px',
						opacity: '0.7',
						animation: 'points-skeleton-loading 1s linear infinite alternate',
						margin: '0.5rem',
						borderRadius: '5px',
					}}></span>
			</div>
			<div className="title-search-section">
				<h3>Discovered Words:</h3>
				<input
					type="search"
					name="search"
					id="search-discovered-word"
					placeholder="search for a discovered word"
				/>
			</div>
			<div
				className="user-discovered-words-container"
				style={{ overflow: 'hidden' }}>
				<table>
					<tbody>
						<tr className="tr-grid">
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
							<td style={{ animation: 'ranking-skeleton-loading 1s linear infinite alternate' }}>
								<p style={{ height: '30px' }}></p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
