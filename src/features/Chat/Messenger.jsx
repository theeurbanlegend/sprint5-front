import { useState ,useEffect} from 'react'
import io from 'socket.io-client'
import { useGetMessagesQuery,useAddMessageMutation,useDeleteMessageMutation } from './chatApiSlice'
import Receiver from './Receiver'
import useAuth from '../../hooks/useAuth'
import SmallLoader from '../spinner/SmallLoader'

const socket=io.connect('http://localhost:8080'||'https://back-6xof.onrender.com')
function Message() {
  const [mess,setMess]=useState('')
  const {username}=useAuth()
  
  const {data:messages,isLoading,isSuccess,isError,error}=useGetMessagesQuery()
  const [addMessage]=useAddMessageMutation()
  const [deleteMessage]=useDeleteMessageMutation()
  
  const sendMessage=async()=>{
    socket.emit('send_message',{message:mess})
    const sentMessage={
      message:mess,
      sender:username
    }
    await addMessage(sentMessage).unwrap()
    .then(res=>{
      console.log(res)
      setMess('')
    })
    .catch(err=>{
      console.log(err)
    })
    
  }
  const handleClose = async(id) => {
    console.log('closed',)
    await deleteMessage(id).unwrap()
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  };
  let content
  if (isLoading){
    content= <SmallLoader/>
  }
  if(isSuccess){
    content= <Receiver  messages={messages} onClose={handleClose} />
  }
  if (isError){
    content= <p>{error.data.status}</p>
  }


  return  (
    <div className='sender'>
     <div className='sender-body'>
     <input
     placeholder='Write Message....'
     value={mess}
     onChange={(e)=>{setMess(e.target.value)}}
     /> 
     
     <button className='addButton' onClick={sendMessage}>
        Add Notification
      </button>
      </div>
   
   {content}
   </div>
  )
}

export default Message
