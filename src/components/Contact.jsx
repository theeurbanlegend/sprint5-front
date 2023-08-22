import React from 'react'
import phone from '../features/img/phone.jpg'
import email from '../features/img/email.jpg'
import location from '../features/img/location.jpg'
import Header from './Header'
import '../features/css/contact.css'
import Spinner from '../features/spinner/Spinner'

const Contact = () => {
    const address=(
        <>
        <img src={location}/>
            <p>We are located at Kagumo, near Delta Petrol Station</p> 
            <p>Wanna see us? <a href='https://goo.gl/maps/9fUkjP5FgSFysUsi8'>Here we are!</a></p>
            <p>We are planning to expand our branches. Stay Tuned!</p>
        
        </>
    )
    const tel=(
        <>
        <img src={phone}/>
        <p>Call us on:</p>
        <ul>
            <li>+254045476396</li>
            <li>+254262643645</li>
            <li>+254486539645</li>
        </ul>
        <p>We are open from 8:00am to 8:00pm</p>
        </>
    )
    const mail=(
        <>
        <img src={email}/>
        <p>Email us on <a href='muvasshop@gmail.com'>muvasshop@gmail.com</a></p>
        <p>We look forward to hearing from you.</p>
        <p>You can also place orders from here!</p>
        </>
    )
  return (
    <div className='cont'>
    <Header/>
        <h1 className='head'>GET IN TOUCH</h1>
        <div className='cont-body'>
            <div className='cont-details'>{address}</div>
            <div className='cont-details'>{mail}</div>
            <div className='cont-details'>{tel}</div>
            
        </div>
    </div>
  )
}

export default Contact