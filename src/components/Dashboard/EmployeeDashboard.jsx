import React, { useContext, useEffect } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../employeecomponents/TaskListNumbers';
import TaskList from '../employeecomponents/TaskList';
import { AuthContext } from '../../context/AuthProvider';


const EmployeeDashboard = () => {

 const { userData, allUsers, setAllUsers, setUserData,updateUser } = useContext(AuthContext);

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        
        <Header Heading="Profile" Path="/profile"/>
        <TaskListNumbers userData={userData} />
        <TaskList userData={userData} allUsers={allUsers} setAllUsers={setAllUsers}  setUserData={setUserData} updateUser={updateUser}/>
    </div>
  )
}

export default EmployeeDashboard