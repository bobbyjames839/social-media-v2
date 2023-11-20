import { Link } from "react-router-dom";
import '../styles/Nav.css';
import { auth, provider } from "../config/Firebase";
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { useState } from "react";

export const Nav = () => {

  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  }

  const [user] = useAuthState(auth);

  const signOutt = async () => {
    await signOut(auth);
    setDropdown(false);
  }

  const signIn = async () => {
    await signInWithPopup(auth, provider);
  }

  return (
    <div className="nav">
      <div className="nav-left">
        <h3>svell<span>Co</span></h3>
        <Link className="nav-left-link" to='/'>Home</Link>
        <Link className="nav-left-link" to='/profile'>Profile</Link>
      </div>

      {user ? 
      <>
      <div className="nav-right-signed-in">
        <img className='profile-pic' src={user?.photoURL}/>
        <i className={dropdown ? "fa fa-times" : "fa fa-chevron-down"} onClick={toggleDropdown}></i>
      </div>
      {dropdown && <div className="dropdown-menu">
        <div className="dropdown-menu-inner">
          <img className='profile-pic profile-pic-small' src={user?.photoURL}/>
          <p>{user?.displayName}</p>
        </div>
        <button onClick={signOutt}>Sign Out</button>
      </div>}
      </>
      :

      <div className="nav-right-signed-out">
        <button onClick={signIn}>Sign in</button>
      </div>}

    </div>
  )
}