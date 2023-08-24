import Image from 'next/image';

export default function LoadingSkeleton() {
	return (
		<div style={{ position: 'absolute', bottom: '35%' }}>
			<Image
				src="/loading.svg"
				alt="loading"
				width={100}
				height={100}
				style={{ pointerEvents: 'none', userSelect: 'none', objectFit: 'contain', width: '100px', height: '100px' }}
				quality={1}
				priority
				loading="eager"
			/>
		</div>
	);
}
