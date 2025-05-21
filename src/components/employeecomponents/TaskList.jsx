import React, { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = ({ userData, setUserData, updateUser }) => {
    const [notes, setNotes] = useState({});


    const updateTaskStatus = (taskIndex, updatedStatus) => {
        const updatedTasks = userData.tasks.map((task, index) =>
            index === taskIndex
                ? { ...task, status: updatedStatus }
                : task
        );


        const taskCounts = {
            active: updatedTasks.filter(task => task.status === "active").length,
            pending: updatedTasks.filter(task => task.status === "pending").length,
            completed: updatedTasks.filter(task => task.status === "completed").length,
            failed: updatedTasks.filter(task => task.status === "failed").length,
        };


        const updatedUser = {
            ...userData,
            tasks: updatedTasks,
            taskCounts,
        };
        updateUser(updatedUser);
        setUserData(updatedUser);

        toast.success("Status Updated successfully!");
    };



    const addNote = (taskIndex) => {
        const note = notes[taskIndex]?.trim();
        if (!note) {
            toast.error("Note cannot be empty!");
            return;
        }

        const updatedUser = {
            ...userData,
            tasks: userData.tasks.map((task, index) =>
                index === taskIndex
                    ? {
                        ...task,
                        notes: [...(task.notes || []), note]
                    }
                    : task
            ),
        };
        updateUser(updatedUser);
        setUserData(updatedUser);

   
        setNotes(prev => ({ ...prev, [taskIndex]: "" }));
        toast.success("Note added successfully!");
    };


    const deleteNote = (taskIndex, noteIndex) => {
        const updatedUser = {
            ...userData,
            tasks: userData.tasks.map((task, index) =>
                index === taskIndex
                    ? {
                        ...task,
                        notes: task.notes.filter((_, index) => index !== noteIndex)
                    }
                    : task
            ),
        };
        updateUser(updatedUser);
        setUserData(updatedUser);
        toast.success("Note deleted successfully!");
    };

    return (
        <div className="flex flex-wrap lg:flex-wrap mt-10 justify-center gap-6 sm:justify-start mb-10">
            {userData && userData.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="flex flex-col w-full lg:w-[32%] p-6 backdrop-blur-lg bg-white/80 border border-gray-200 rounded-2xl shadow-md transition hover:shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs px-4 py-1 rounded-full font-semibold">
                            {task.category}
                        </h3>
                        <h4 className="text-xs text-gray-500">{task.taskDate}</h4>
                        <span className={`text-xs font-semibold py-1 px-4 rounded-full text-white 
                            ${task.status === "completed" ? "bg-green-600" :
                                task.status === "failed" ? "bg-red-500" :
                                    task.status === "pending" ? "bg-yellow-500" : "bg-blue-500"}`}>
                            {task.status}
                        </span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">{task.taskTitle}</h2>
                    <p className="text-sm text-gray-700 mt-2">{task.taskDescription}</p>
                    <div className="flex items-center justify-between mt-4">
                        <select
                            className="border border-gray-300 text-sm font-medium text-red-500 bg-white py-2 px-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            value={task.status}
                            onChange={(e) => updateTaskStatus(taskIndex, e.target.value)}
                        >
                            <option className='text-red-500' value="" disabled>Select</option>
                            <option className='text-red-500' value="pending">Pending</option>
                            <option className='text-red-500' value="completed">Completed</option>
                            <option className='text-red-500' value="failed">Failed</option>
                            <option className='text-red-500' value="active">Active</option>
                        </select>
                    </div>
                    <textarea
                        className="w-full mt-4 p-3 border border-gray-300 text-gray-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        placeholder="Write a note..."
                        value={notes[taskIndex] || ""}
                        onChange={(e) =>
                            setNotes(prev => ({ ...prev, [taskIndex]: e.target.value }))
                        }
                    />
                    <button
                        className="mt-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                        onClick={() => addNote(taskIndex)}
                    >
                        Add Note
                    </button>
                    {task.notes && task.notes.length > 0 ? (
                        <div className="mt-4">
                            <h4 className="font-semibold text-gray-800">Notes:</h4>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {task.notes.map((note, noteIndex) => (
                                    <div key={noteIndex} className="flex items-center bg-gray-100 text-gray-700 text-sm p-2 rounded-md cursor-pointer hover:bg-gray-200 transition">
                                        {note}
                                        <button onClick={() => deleteNote(taskIndex, noteIndex)} className="ml-2 text-red-500 hover:text-red-700">❌</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : <h4 className="mt-4 font-semibold text-gray-800">Notes:</h4>}
                </div>
            ))}
        </div>
    );
}

export default TaskList;
