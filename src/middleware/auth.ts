import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'your_jwt_secret';

const authMiddleware = (req: NextRequest) => {
    const authHeader = req.headers.get('authorization');
    console.log("===========")
    console.log(authHeader)
    if (!authHeader) {
        return NextResponse.json({ error: 'Authorization missing' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return NextResponse.json({ error: 'Token missing' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
    } catch (error) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
};

export default authMiddleware;
