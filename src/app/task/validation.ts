import * as Yup from 'yup';
import { Task } from './type';
import { ErrorForm } from '@/libs/interfaces/error';

const validationSchema = Yup.object().shape({
    task: Yup.string().required('Task title is required').min(5, 'Enter at least 5 characters'),
});
  
export const ValidateData = async (form: Task): Promise<ErrorForm | null> => {
    try {
        await validationSchema.validate(form, {abortEarly: false})
        return null
    } catch (error) {
        let errData: ErrorForm = {} as any
        if (error instanceof Yup.ValidationError) {
            error.inner.forEach(err => {
                if (err) {
                    errData[err.path as string] = {
                        error: true,
                        msg: err.message
                    }
                }
            });
        } else {
            console.error(error);
        }
        return errData
    }
}