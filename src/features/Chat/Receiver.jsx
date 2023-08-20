import { useState ,useEffect} from 'react'
import io from 'socket.io-client'
import '../css/receiver.css'
import useAuth from '../../hooks/useAuth'
import unread from '../img/unread.jpg'
import { formatDistanceToNow } from 'date-fns';
const socket=io.connect('http://localhost:8080'||'https://back-6xof.onrender.com')



const Receiver = (props) => {
    const [received,setReceived]=useState('')
    
    useEffect(()=>{
        socket.on('receive_message',(data)=>{
          setReceived(data.message)
        })
      },[socket])
    
  
  return (
    <div >
    {!received?<p>"You have no new messages"</p>:<p>"You have new messages"</p>}
    <textarea
    className='note-area'
     value={received}
     readOnly={true}/>
     
      {props.messages.slice().reverse().map((notification) => (
     <div className='message'>
      <p><img src={unread}/></p>
        <div key={notification._id} >
          <p><strong>{notification.sender}</strong> sent a message</p>
          <p>{notification.message}</p>
          <p>{formatDistanceToNow(new Date(notification.createdAt))} ago</p>
        </div>
              <input
          type='checkbox'/>
        <button className="close-button" onClick={() => props.onClose(notification._id)}>
    X
  </button>
      </div>
      ))}
    
     </div>
  )
}

export default Receiver