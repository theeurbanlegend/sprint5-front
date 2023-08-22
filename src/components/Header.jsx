import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
    <h1>Welcome to Muvas E-Shop</h1>
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
        </ul>
    </nav>
    
</header>
  )
}

export default Header