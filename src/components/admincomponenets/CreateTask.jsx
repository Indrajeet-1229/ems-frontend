import React, { useContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTask = ({ allUsers, setAllUsers, updateUser }) => {

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [newTaskdata, setNewTaskData] = useState("");


  useEffect(() => {

    if (allUsers && allUsers.length) {
      const updatedUsers = allUsers.map((user) => {
        if (user.email == email) {
          const updateduser = { ...user, tasks: [newTaskdata, ...(user.tasks || [])], taskCounts: { ...user.taskCounts, pending: user.taskCounts.pending + 1 } }
          updateUser(updateduser);
          toast.success("Task Created Successful!");
          return updateduser;

        }
        else {
          return user;
        }
      }
      )
      setAllUsers(updatedUsers);


    }
    setEmail("");
    setTitle("");
    setDate("");
    setCategory("");
    setDesc("");

  }, [newTaskdata]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setNewTaskData({ taskTitle: title, taskDate: date, category, taskDescription: desc, status: "pending" });

  }

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create New Task</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <select value={email} required onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-300  rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value='' className='text-gray-500' disabled>User Mail</option>
            {
              allUsers && allUsers.map((user, index) => {
                return <option key={index} value={user.email} className='text-gray-700'>{user.email}</option>
              })
            }
          </select>
          <input value={title} required onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Title"
            className="w-full p-4 border border-gray-300 rounded-lg placeholder:text-gray-700 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <input value={date} required onChange={(e) => setDate(e.target.value)}
            type="date"
            className="w-full p-4 border border-gray-300   rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <select value={category} required onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 border border-gray-300  rounded-lg bg-gray-100 text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="" className='text-gray-500' disabled>Category</option>
            <option value="Development" className='text-gray-700'>Development</option>
            <option value="Writing" className='text-gray-700'>Writing</option>
            <option value="Testing" className='text-gray-700'>Testing</option>
            <option value="Meeting" className='text-gray-700'>Meeting</option>
          </select>


          <div className="md:col-span-2 flex flex-col space-y-4 md:items-center">
            <textarea value={desc} required onChange={(e) => setDesc(e.target.value)}
              placeholder="Task Description"
              className="w-full md:w-3/4 p-4 border border-gray-300 rounded-lg placeholder:text-gray-700 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none h-32"
            ></textarea>
            <button type='submit' className="w-full md:w-3/4 p-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-md hover:opacity-90 transition-all duration-300 transform hover:scale-105">
              🚀 Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
