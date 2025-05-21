import React, { createContext, useEffect, useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';



export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

    const [allUsers, setAllUsers] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [isLogin, setIsLogin] = useState(false);


    useEffect(() => {
        fetchAllUsers();
        const loggedUser = getLocalStorage("loggedUser");

        if (loggedUser && loggedUser.length > 0) {
            setLoggedUserId(loggedUser);

        }
        else {
            setLoggedUserId("")
        }


    }, [])

    useEffect(() => {
        if (loggedUserId && allUsers && allUsers.length > 0) {
            const existUser = allUsers.find((user) => user.email === loggedUserId);
            setUserData(existUser);
            setIsLogin(true);
        }

    }, [loggedUserId, allUsers]);


    const deleteUser = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this user? This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`https://ems-full-stack.onrender.com/auth/api/deleteuser/${id}`);
                    toast.success(response.data.message);
                    fetchAllUsers();

                } catch (error) {
                    console.error("Delete error:", error);
                    toast.error("Something went wrong while deleting the user.");
                }
            }
        });
    };



    const updateUser = async (updatedUser) => {
        try {
            const response = await axios.put(`https://ems-full-stack.onrender.com/auth/api/updateuser/${updatedUser._id}`, updatedUser);
            const { data } = response;
            setUserData(data);

            const updateUers = await allUsers.map((user) => {
                return user.email === data.email ? data : user;

            });
            setAllUsers(updateUers);
        }
        catch (error) {
            console.error("Error updating user:", error.message);
            toast.error("Failed to update user!");
        }
    }



    const fetchAllUsers = async () => {
        try {
            const response = await axios.get("https://ems-full-stack.onrender.com/auth/api/allusers");
            setAllUsers(response.data)
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    }


    const register = async (newUser) => {
        try {
            const response = await axios.post("https://ems-full-stack.onrender.com/auth/api/register-newuser", newUser);
            const { data } = response;
            toast.success(data.message);
            setUserData(data.newUser);
            fetchAllUsers();
            setLocalStorage("loggedUser", data.newUser.email);
            setIsLogin(true);
            setLoggedUserId(data.newUser.email);

        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong during registration.");
            }
        }


    }



    const login = async (email, password) => {
        try {
            const response = await axios.post("https://ems-full-stack.onrender.com/auth/api/login-user", { email, password });
            const { data } = response;

            setLocalStorage("loggedUser", data.loggedUser.email);
            setLocalStorage("authToken", data.token);
            setIsLogin(true);
            setUserData(data.loggedUser)
            setLoggedUserId(data.loggedUser.email);
            toast.success(data.message);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }

    }

    const adminLogin = (email) => {

        setLocalStorage("loggedUser", email);
        setIsLogin(true);
        setLoggedUserId(email);
        toast.success("Login Successful!");

    }
    const logout = () => {
        setIsLogin(false);
        localStorage.removeItem("loggedUser");
        setLoggedUserId("");
        setUserData(null)
        toast.success("Logout Successful!");

    }

    const setLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
    const getLocalStorage = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }
    return (
        <div>
            <AuthContext.Provider value={{ setIsLogin, isLogin, userData, setUserData, loggedUserId, allUsers, setAllUsers, logout, register, login, adminLogin, setLocalStorage, getLocalStorage, updateUser, deleteUser }}>

                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider;