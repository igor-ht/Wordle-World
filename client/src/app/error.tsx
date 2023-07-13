'use client';

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<div>
			<h2>Something went wrong!</h2>
			<p>
				Go to the <Link href={'/'}>Home</Link> page.
				<br />
				Or reset the current page.
				<button
					type="button"
					onClick={() => reset()}>
					RESET
				</button>
				.
			</p>
		</div>
	);
}
