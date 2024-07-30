import User from '@/database/model/user';
import sequelize from '@/database/model';
import authMiddleware from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/libs/logger';

User.initialize(sequelize);

const handleResponse = (statusCode: number, data: any) => {
    return NextResponse.json(data, { status: statusCode });
};

export async function GET(req: NextRequest) {
    const response = authMiddleware(req as any);
    if (response) {
        return NextResponse.redirect('/auth');
    }

    try {
        let id = (req as any).user.id
        if (id) {
            const user = await User.findByPk(id as string);
            if (user) {
                delete user.dataValues.password
                return handleResponse(200, user);
            } else {
                return handleResponse(404, { error: 'User not found' });
            }
        } else {
            const users = await User.findAll();
            return handleResponse(200, users);
        }
    } catch (error:any) {
        logger.error(error, 'error');
        return handleResponse(500, { error: 'Internal server error' });
    }
}
