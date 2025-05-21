import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {   adminLogin } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        if (email == "admin@gmail.com" && password == "123") {
            adminLogin(email);
        }
        else{
          toast.error("Wrong Credentials.");
        }
    };

    return (
        <div className='flex h-screen w-screen items-center justify-center px-4'>
            <div className='border-2 rounded-xl border-emerald-600 p-10 md:p-16 lg:p-20 w-full max-w-md'>
                <h2 className='text-2xl font-bold text-center text-emerald-600 mb-6'>Admin Login </h2>
                <form onSubmit={handleLogin} className='flex flex-col items-center justify-center'>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400'
                        type="email"
                        placeholder='Email Address*'
                    />


                  
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 mt-3 px-6 pr-12 rounded-full placeholder:text-gray-400'
                       
                            placeholder='Password*'
                        />
              

                    <button
                        className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full'>
                        Login
                    </button>

                   
                </form>

                <button
                                    type="button"
                            
                                    className='mt-6 text-white w-full'>
                                   <Link className='border-none  outline-none hover:bg-red-700 font-semibold bg-red-600 text-lg py-2 px-8  rounded-full' to="/login"> User Panel Login</Link>
                                </button>
            </div>
        </div>
    )
}

export default AdminLogin;
