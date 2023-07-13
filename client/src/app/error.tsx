'use client';

import Link from 'next/link';

export default function Error() {
	return (
		<div>
			<h2>Something went wrong!</h2>
			<p>
				Go to the <Link href={'/'}>Home</Link> page and try again.
			</p>
		</div>
	);
}
