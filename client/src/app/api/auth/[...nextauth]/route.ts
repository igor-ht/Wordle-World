import NextAuth from 'next-auth';
import { NextAuthOptions } from './next-auth';

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
