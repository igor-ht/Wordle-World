/** @type {import('next').NextConfig} */

const nextConfig = {
	async headers() {
		return {
			headers: [
				{
					key: 'X-Robots-Tag',
					value: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'all' : 'noindex',
				},
			],
			source: '/:path*',
		};
	},
};

module.exports = nextConfig;
