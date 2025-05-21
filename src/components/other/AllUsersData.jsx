import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Header from "./Header";
import { AuthContext } from "../../context/AuthProvider";

const AllUsersData = () => {
    const { allUsers, setAllUsers, deleteUser } = useContext(AuthContext);
    const [visiblePasswords, setVisiblePasswords] = useState({});


    const togglePasswordVisibility = (index) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };
  
    return (
        <div className='bg-emerald-900 min-h-screen text-white p-6'>
            <Header Heading="Dashboard" Path="/admindashboard" />

            <div className="container mx-auto mt-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-emerald-300">All User Profiles</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allUsers && allUsers.length > 0 ? (
                        allUsers.map((user, index) => (
                            <div key={index} className="bg-gradient-to-r from-emerald-700 to-emerald-500 p-6 rounded-xl shadow-lg text-center border border-emerald-300">
                                <FaUserCircle className="text-6xl mx-auto text-white mb-4" />
                                <h3 className="text-2xl font-semibold text-white">{user.name}</h3>
                                <p className="text-gray-100 text-lg">{user.email}</p>
                                <p className="mt-2 text-md text-gray-200">{user.role}</p>
                                <p className="text-md text-gray-300">Joined: {user.joinedDate}</p>


                                <div className="mt-3">
                                    <label className="block text-sm text-gray-300">Password:</label>
                                    <input
                                        type={visiblePasswords[index] ? "text" : "password"}
                                        value={user.password}
                                        readOnly
                                        className="w-full bg-gray-200 text-black px-3 py-1 rounded-md"
                                    />
                                    <button
                                        onClick={() => togglePasswordVisibility(index)}
                                        className="mt-2 text-sm text-blue-400 hover:underline"
                                    >
                                        {visiblePasswords[index] ? "Hide" : "Show"} Password
                                    </button>
                                </div>


                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="bg-blue-500 p-3 rounded-lg text-black font-bold">Active: {user.taskCounts.active}</div>
                                    <div className="bg-yellow-500 p-3 rounded-lg text-black font-bold">Pending: {user.taskCounts.pending}</div>
                                    <div className="bg-green-500 p-3 rounded-lg text-black font-bold">Completed: {user.taskCounts.completed}</div>
                                    <div className="bg-red-500 p-3 rounded-lg text-black font-bold">Failed: {user.taskCounts.failed}</div>
                                </div>


                                <button
                                    className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                                    onClick={() => deleteUser(user._id)}>
                                    Delete User
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="mt-5 text-center text-xl text-white">Users Not Found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllUsersData;
