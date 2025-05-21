import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { Eye, EyeOff } from 'lucide-react'

const Registation = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ password: false });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, allUsers } = useContext(AuthContext);

    useEffect(() => {
        setErrors({ password: password !== confirmPassword });
    }, [confirmPassword]);

    const handleRegistation = (e) => {
        e.preventDefault();
        if (errors.password) return;
        const newUser = { name, email, password }
        register(newUser);


    };

    return (
        <div className='flex h-screen w-screen items-center justify-center px-4'>
            <div className='border-2 rounded-xl border-emerald-600 p-10 md:p-16 lg:p-20 w-full max-w-md'>
                <h2 className='text-2xl font-bold text-center text-emerald-600 mb-6'>Register an Account</h2>
                <form onSubmit={handleRegistation} className='flex flex-col items-center justify-center'>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400'
                        type="text"
                        placeholder='Full Name*'
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400'
                        type="email"
                        placeholder='Email Address*'
                    />


                    <div className='relative w-full mt-3'>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={3}
                            required
                            className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 pr-12 rounded-full placeholder:text-gray-400'
                            type={showPassword ? "text" : "password"}
                            placeholder='Password*'
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>


                    <div className='relative w-full mt-3'>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 pr-12 rounded-full placeholder:text-gray-400'
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder='Confirm Password*'
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>

                    {errors.password && <p className='text-red-500 mt-1'>Password Didn't Match</p>}


                    <button className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full'>
                        Register
                    </button>
                    <p className='text-blue-600 mt-2 cursor-pointer text-sm md:text-base'>
                        <Link to="/login">Already have an account? Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Registation;
