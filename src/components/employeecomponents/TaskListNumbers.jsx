import React from 'react';

const TaskListNumbers = ({ userData }) => {
  


  return (
    userData && <div className='flex flex-wrap lg:flex-nowrap mt-5 justify-center gap-5 sm:justify-between screen'>
      <div className='rounded-xl w-full sm:w-[45%] py-6 px-9 bg-purple-500 text-white shadow-lg'>
        <h2 className='text-3xl font-bold'>{userData.tasks.length}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>All Tasks</h3>
      </div>
      <div className='rounded-xl w-full sm:w-[45%] py-6 px-9 bg-yellow-500 text-white shadow-lg'>
        <h2 className='text-3xl font-bold'>{userData.taskCounts.pending}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>Pending Task</h3>
      </div>
      <div className='rounded-xl w-full sm:w-[45%] py-6 px-9 bg-green-500 text-white shadow-lg'>
        <h2 className='text-3xl font-bold'>{userData.taskCounts.completed}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>Completed Task</h3>
      </div>
      <div className='rounded-xl w-full sm:w-[45%] py-6 px-9 bg-blue-500 text-black shadow-lg'>
        <h2 className='text-3xl font-bold'>{userData.taskCounts.active}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>Active Task</h3>
      </div>
      <div className='rounded-xl w-full sm:w-[45%] py-6 px-9 bg-red-500 text-white shadow-lg'>
        <h2 className='text-3xl font-bold'>{userData.taskCounts.failed}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>Failed Task</h3>
      </div>
    </div>
  );
};

export default TaskListNumbers;
