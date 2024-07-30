import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/database/model/user';
import sequelize from '@/database/model';
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/libs/logger';

const JWT_SECRET = process.env.JWT_SECRET ?? 'your_jwt_secret';
const expired = process.env.EXPIRED_IN ?? '24h';
User.initialize(sequelize);

const handleResponse = (statusCode: number, data: any) => {
    return NextResponse.json(data, { status: statusCode });
};

export async function POST(req: NextRequest) {
    const body = await req.json();
    if(body.type_login === 'guest') {
        const token = jwt.sign({ id: "guest", email: "", fullname: "Guest" }, JWT_SECRET, { expiresIn: `${expired}h` });
        return handleResponse(200, { token, user: { id: "guest", email: "", fullname: "Guest"} });
    } else {
        try {
            const { email, password } = body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return handleResponse(404, { error: 'User not found' });
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return handleResponse(401, { error: 'Invalid password' });
            }
            const usr = { id: user.id, email: user.email, fullname: user.fullname }
            const token = jwt.sign(usr, JWT_SECRET, { expiresIn: `${expired}h` });
            return handleResponse(200, { token, user: usr });
        } catch (error: any) {
            logger.error(error, 'error');
            console.log(error);
            return handleResponse(500, { error: 'Internal server error' });
        }
    }
}