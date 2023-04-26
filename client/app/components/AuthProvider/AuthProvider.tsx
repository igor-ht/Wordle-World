'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({ session, children }: { session: Session; children: React.ReactNode }) {
	return <SessionProvider session={session}>{children}</SessionProvider>;
}
