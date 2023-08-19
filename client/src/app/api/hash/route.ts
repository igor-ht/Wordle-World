import { NextRequest, NextResponse } from 'next/server';
import { handleHashing } from '@/utils/forms/hashing';

export async function POST(request: NextRequest) {
	const password = await request.text();
	const hashedPassword = await handleHashing(password);
	return NextResponse.json(hashedPassword);
}
