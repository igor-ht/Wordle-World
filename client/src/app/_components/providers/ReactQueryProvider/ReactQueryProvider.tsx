'use client';

import client from '@/utils/general/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
