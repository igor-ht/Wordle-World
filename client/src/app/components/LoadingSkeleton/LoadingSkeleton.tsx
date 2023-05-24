import Image from 'next/image';

export default function LoadingSkeleton() {
	return (
		<div>
			<Image
				src="/loading.svg"
				alt="loading"
				width={55}
				height={55}
				style={{ pointerEvents: 'none', userSelect: 'none', objectFit: 'contain' }}
				quality={5}
				priority
				loading="eager"
			/>
		</div>
	);
}
