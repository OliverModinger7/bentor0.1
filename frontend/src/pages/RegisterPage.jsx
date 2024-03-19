import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';



function RegisterPage() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await signup(data);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/tasks');
        }
    }, [isAuthenticated]);
    
    return (
        <div className="bg-zinc-800 max-w-md mx-auto p-8 rounded-md">
            {RegisterErrors.map((error, index) => (
                <div className='bg-red-500 text-white p-2 rounded-md my-2' key={index}>
                    {error}
                </div>
            ))
            }
            <h2 className="text-3xl text-white font-semibold mb-4">Register</h2>
            <form 
            onSubmit= {handleSubmit(onSubmit)}>
                <input type="text" {...register('username', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder='username'
                />
                {errors.username && (<p className="text-red-500">{errors.username.message}</p>)}
                <input type="email" {...register('email', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder='email'
                />
                {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
                <input type="password" {...register('password', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder='password'
                />
                {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}
                <button type="submit">Register</button>
            </form>
            <p 
        className="flex gap-x-2 justify-between">
            Ya tienes cuenta?
            <Link to="/login"
            className="text-sky-500"
            >Login</Link>
        </p>
        </div>
    );
}

export default RegisterPage;