import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const tasks = await prisma.task.findMany({
        });

        return NextResponse.json({ tasks }, { status: 200 });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.description) {
            return NextResponse.json({ error: 'Description is required' }, { status: 400 });
        }

        const task = await prisma.task.create({
            data: { description: body.description },
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.id || !body.description) {
            return NextResponse.json({ error: 'ID and description are required' }, { status: 400 });
        }

        const task = await prisma.task.update({
            where: { id: parseInt(body.id) },
            data: { description: body.description },
        });

        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json({ error: 'Error updating task' }, { status: 500 });
    }
}