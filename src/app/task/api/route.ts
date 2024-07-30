import { v4 as uuidv4 } from 'uuid';
import Task from '@/database/model/task';
import sequelize from '@/database/model';
import authMiddleware from '@/middleware/auth';
import { NextRequest, NextResponse } from 'next/server';
import logger from '@/libs/logger';

const handleResponse = (statusCode: number, data: any) => {
    return NextResponse.json(data, { status: statusCode });
};

Task.initialize(sequelize);
export async function GET(req: NextRequest) {
    try {
        const response = authMiddleware(req as any);
        if (response) {
            return NextResponse.redirect('/auth');
        }
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        let userId = (req as any).user.id
        if (userId) {
            let task : any = [];
            if(id){
                task =  await Task.findOne({
                    where: {
                        id: id,
                        user_input: userId,
                    },
                });
            }else {

                const taskList =  await Task.findAll({
                    where: {
                        user_input: userId,
                    },
                });

                const taskDone = taskList.filter((item: any) => {
                    return item.status === 'DONE';
                });

                const taskProgress = taskList.filter((item: any) => {
                    return item.status === 'PROGRESS';
                });

                task = {
                    'done': taskDone,
                    'progress': taskProgress
                }
            }
            return handleResponse(200, task);
        } else {
            return handleResponse(400, { message: 'User not found' });
        }
    } catch (error: any) {
        logger.error(error, 'error');
        return handleResponse(500, { error: 'Failed to fetch tasks' });
    }
}

export async function POST(req: NextRequest) {
    try {
        const response = authMiddleware(req as any);
        if (response) {
            return handleResponse(401, { error: 'Unauthorized' });
        }

        const body = await req.json();
        let userId = (req as any).user.id
        const { task, status } = body;
        const newTask = await Task.create({ id: uuidv4(), task, status, user_input: userId });
        return handleResponse(201, newTask);
    } catch (error: any) {
        logger.error(error, 'error');
        console.log(error)
        return handleResponse(500, { error: 'Failed to create task' });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const response = authMiddleware(req as any);
        if (response) {
            return NextResponse.redirect('/auth');
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        let userId = (req as any).user.id
        const body = await req.json();
        const { task, status } = body;
        const find = await Task.findOne({
            where: { id: id as string, user_input: userId },
        });
        if(!find) {
            return handleResponse(404, { error: 'Task not found' });
        }

        const [updatedRows] = await Task.update({ task, status }, { where: { id: id as string } });
        if (updatedRows > 0) {
            const updatedTask = await Task.findByPk(id as string);
            return handleResponse(200, updatedTask);
        } else {
            return handleResponse(404, { error: 'Task not found' });
        }
    } catch (error:any) {
        logger.error(error, 'error');
        return handleResponse(500, { error: 'Failed to update task' });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const response = authMiddleware(req as any);
        if (response) {
            return NextResponse.redirect('/auth');
        }
        
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        let userId = (req as any).user.id
        const find = await Task.findOne({
            where: { id: id as string, user_input: userId },
        });
        if(!find) {
            return handleResponse(404, { error: 'Task not found' });
        }

        const deletedRows = await Task.destroy({ where: { id: id as string } });
        if (deletedRows > 0) {
            return handleResponse(200, {});
        } else {
            return handleResponse(404, { error: 'Task not found' });
        }
    } catch (error:any) {
        logger.error(error, 'error');
        return handleResponse(500, { error: 'Failed to delete task' });
    }
}
