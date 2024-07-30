import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from './middleware/auth';

export function middleware(req: NextRequest) {
    const response = authMiddleware(req);
    if (response) {
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'],
};
