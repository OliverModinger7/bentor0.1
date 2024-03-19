import {z} from 'zod';

export const createTaskSchema = z.object({
    title: z.string({required_error: 'Titulo es requerido'}),
    description: z.string({required_error: 'Descripcion es requerida'}),
    date: z.string().datetime().optional()
    });

