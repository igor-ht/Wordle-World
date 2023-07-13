'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function MainContainer({ children }: { children: React.ReactNode }) {
	return (
		<main
			className="main-container"
			id="main-container">
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</main>
	);
}
