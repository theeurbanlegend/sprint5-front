import React, { useState } from 'react';
import Receiver from './Receiver';
import '../css/notifications.css'
import useAuth from '../../hooks/useAuth';
import {useGetMessagesQuery}from './chatApiSlice'
const Notifications = () => {
    const {data:messages,isLoading,isSuccess,isError,error}=useGetMessagesQuery()

    const {username}=useAuth()

    const handleClose=()=>{
      console.log("closed")
    }
let content
if (isLoading){
  content= <Spinner/>
}
if(isSuccess){
  console.log(messages)
  content= <Receiver messages={messages} onClose={handleClose} user={username} /> 
  
}
if (isError){
  content= <p>{error.data.status}</p>
}

  
  return (
    <div className='body mes-body'>
    <div className='container'>
      <h1 className='heading'>Notifications</h1>
      {content}
    </div>
    </div>
  );
};

export default Notifications;
