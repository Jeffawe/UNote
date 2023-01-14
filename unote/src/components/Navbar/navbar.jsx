import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import './navbar.css'
import DropDown from './DropDown/DropDown';

const Navbar = ({ loggedIn, accountManager, data }) => {
  const [dropDown, setdropDown] = useState(false)

  const handleDropDown = () => {
    dropDown ? setdropDown(false) : setdropDown(true);
  }

  return (
    <div className='navbar_home'>
      <div className='navbar_text'>
        <h1>UNOTE</h1>
      </div>
      {!loggedIn &&
        <div className='navbar_sidebutton'>
          <button onClick={() => { accountManager(1) }}>Sign Up</button>
          <button onClick={() => { accountManager(2) }}>Sign In</button>
        </div>
      }

      {loggedIn &&
        <div className='navbar_profile'>
          <div onClick={handleDropDown}>
            <span><p>{data[0].firstname}</p></span>
          </div>
          <CgProfile size={35} />
          {dropDown &&
            <div>
              <DropDown email={data[0].email}/>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Navbar