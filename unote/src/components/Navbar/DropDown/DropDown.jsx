import React, { useContext } from 'react'
import './DropDown.css'
import { NavbarContext } from '../../context';

const DropDown = ({ email }) => {
  const { LogOut, DeleteAccount } = useContext(NavbarContext);

  return (
    <div className='dropdown_background'>
        <div className='dropdown_menu'>
          <div>
            <span onClick={LogOut}>Log Out</span>
          </div>
          <hr className="solid"></hr>
          <div>
            <span onClick={() => {DeleteAccount(email)}}>Delete Account</span>
          </div>
        </div>
    </div>
  )
}

export default DropDown