import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllTask = ({ allUsers, updateUser }) => {

  const handleDeleteTask = (userIndex, taskIndex) => {

    const findUser = allUsers.find((_, index) => index === userIndex);
    const filteredTasks = findUser.tasks.filter((_, index) => index !== taskIndex);

    const taskCounts = {
      active: filteredTasks.filter(task => task.status === "active").length,
      pending: filteredTasks.filter(task => task.status === "pending").length,
      completed: filteredTasks.filter(task => task.status === "completed").length,
      failed: filteredTasks.filter(task => task.status === "failed").length,
    }
    const updatedUser = {
      ...findUser,
      tasks: filteredTasks,
      taskCounts,
    };

 
    updateUser(updatedUser);
    toast.success("Task deleted successfully!");


  }

  return (
    <div className="bg-white p-4 sm:p-8 rounded-md shadow-md w-full mx-auto mt-3">
      <h2 className="text-2xl sm:text-3xl font-semibold text-emerald-600 mb-6 text-center">All Tasks</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-500 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-emerald-600 text-white text-sm sm:text-base">
              <th className="px-3 sm:px-6 py-3 text-left font-medium uppercase whitespace-nowrap">User</th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium uppercase whitespace-nowrap">Task Title</th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium uppercase whitespace-nowrap">Due Date</th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium uppercase whitespace-nowrap">User Note</th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium uppercase whitespace-nowrap">Status</th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium uppercase whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers && allUsers.length ? allUsers.map((user, userIndex) => {
              return user.tasks.map((task, taskIndex) => (
                <tr key={taskIndex} className="border border-gray-500 hover:bg-gray-100 transition text-sm sm:text-base">
                  {taskIndex === 0 && (
                    <td className="px-3 sm:px-6 py-4 text-gray-800 font-medium" rowSpan={user.tasks.length}>
                      {user.name}

                    </td>
                  )}
                  <td className="px-3 sm:px-6 py-4 text-gray-900 font-semibold">{task.taskTitle}</td>
                  <td className="px-3 sm:px-3 py-4 text-gray-800">{task.taskDate}</td>
                  <td className="px-3 sm:px-6 py-4 text-gray-800">
                    {task.notes && task.notes.length > 0 ? task.notes.map((note, index) => (
                      <p key={index} className="text-gray-800">{`${index + 1}. ${note}`}</p>
                    )) : <p className="text-gray-800">No Note Available</p>}
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md 
                    ${task.status === "completed" ? "bg-green-500 text-white" :
                        task.status === "failed" ? "bg-red-500 text-white" :
                          task.status === "pending" ? "bg-yellow-500" : "bg-blue-500"}`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <button className='px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md bg-red-500 text-white flex items-center' onClick={() => handleDeleteTask(userIndex, taskIndex)}>
                      Delete Task
                    </button>
                  </td>
                </tr>
              ))
            }

            ) : <tr className='text-black text-center text-sm sm:text-base'><td className='px-3 py-4 text-black' colSpan="6">User not Available. Add User First</td></tr>}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default AllTask;
