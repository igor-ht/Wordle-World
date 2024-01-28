import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: '/',
			changeFrequency: 'yearly',
			priority: 1,
			lastModified: new Date(),
		},
		{
			url: '/play',
			changeFrequency: 'yearly',
			priority: 1,
			lastModified: new Date(),
		},
		{
			url: '/signin',
			changeFrequency: 'yearly',
			priority: 0.8,
			lastModified: new Date(),
		},
		{
			url: '/signup',
			changeFrequency: 'yearly',
			priority: 0.8,
			lastModified: new Date(),
		},
		{
			url: '/dashboard',
			changeFrequency: 'yearly',
			priority: 1,
			lastModified: new Date(),
		},
	];
}
