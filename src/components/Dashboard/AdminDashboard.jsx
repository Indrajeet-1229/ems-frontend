import React, { useContext, useEffect } from 'react'
import Header from '../other/Header'
import CreateTask from '../admincomponenets/CreateTask'
import AllTask from '../admincomponenets/AllTask'
import { AuthContext } from '../../context/AuthProvider';

const AdminDashboard = () => {
  const { allUsers,setAllUsers, updateUser, deleteUser} = useContext(AuthContext);

    return (
      <div className=' w-full p-5 bg-gray-100 flex flex-col gap-5 '>
        <Header Heading="All Users" Path="/allusersdata"/>
        <CreateTask allUsers={allUsers} setAllUsers={setAllUsers} deleteUser={deleteUser}   updateUser={updateUser} />
        <AllTask allUsers={allUsers} setAllUsers={setAllUsers}   updateUser={updateUser}/>
      </div>
    );
  };
  
  export default AdminDashboard;