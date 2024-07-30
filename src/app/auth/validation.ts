import * as Yup from 'yup';
import { Credentials } from './type';
import { ErrorForm } from '@/libs/interfaces/error';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});
  
export const ValidateData = async (form: Credentials): Promise<ErrorForm | null> => {
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