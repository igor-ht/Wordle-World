'use client';

import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
