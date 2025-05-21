import React, { useContext, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import Header from "./Header";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



const Profile = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const { userData, setUserData, updateUser } = useContext(AuthContext);
    const toggleModal = () => setIsOpen(!isOpen);

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put("https://ems-full-stack.onrender.com/auth/api/changepassword", {
                userId: userData._id,
                oldPassword,
                newPassword
            });

            if (response.data.success) {
                toast.success(response.data.message || "Password changed successfully!");
                setNewPassword("");
                setOldPassword("");
                setIsOpen(false);

            } else {
                toast.error(response.data.message || "Something went wrong!");
            }

        }
        catch (error) {
            toast.error(error.response.data.message);

        }



    };


    return (
        <div className="p-10 bg-[#1C1C1C] h-screen text-white flex flex-col items-center">
            <Header Heading="Dashboard" Path="/employeedashboard" />

            {userData && <div className="bg-emerald-800 p-6 rounded-lg shadow-lg w-full max-w-2xl mt-6">
                <div className="flex flex-col items-center">
                    <FaUserCircle className="text-6xl text-white" />
                    <h2 className="text-xl font-semibold mt-2">{userData.name}</h2>
                    <p className="text-sm text-gray-300"></p>
                </div>

                <div className="mt-6 border-t border-gray-500 pt-4">
                    <div className="flex justify-between py-2">
                        <span className="text-gray-300">Name:</span>
                        <span>{userData.name}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-300">Email:</span>
                        <span>{userData.email}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-300">Role:</span>
                        <span>{userData.role}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-300">Joined:</span>
                        <span>{userData.joinedDate}</span>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button onClick={toggleModal} className="flex items-center bg-emerald-600 px-4 py-2 rounded-lg shadow-md hover:bg-emerald-700 transition">
                        <FiEdit3 className="mr-2" />
                        Edit Profile
                    </button>
                </div>
            </div>}

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

                        <form onSubmit={(e) => handleSave(e)}>
                            <label className="block text-gray-700">Old Password:</label>
                            <input required
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full text-gray-700   p-2 border rounded mb-4"
                            />
                            <label className="block text-gray-700">New Password:</label>
                            <input required
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border rounded mb-4 text-gray-700"
                            />
                            <div className="flex justify-end space-x-2">
                                <button onClick={toggleModal} className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
