import React, { useContext } from 'react'
import './Modal.css'
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';
import { UserContext } from '../context';

const SignIn = () => {
    const { LoginOrCreate, CloseModal, getCustomers } = useContext(UserContext);

    const [emailLogin, setemailLogin] = useState([]);
    const [passwordLogin, setpasswordLogin] = useState([]);

    const submitButton = () => {
        console.log("Submitted");
        getCustomers(emailLogin, passwordLogin)
        CloseModal();
    }

    return (
        <div className='account_background'>
            <div className='close_button'>
                <AiOutlineClose size={20} className='exit_icon' onClick={CloseModal}/>
            </div>
            <div className='signin_header'>
                <h1>LOGIN</h1>
                {/* <hr class="solid"></hr> */}
            </div>
            <div>
                <div className='account_input'>
                    <label>Email Address</label>
                    <input type="text" id="email" placeholder='Enter your Username...' onChange={(e) => { setemailLogin(e.target.value) }} />
                </div>
                <div className='account_input'>
                    <label>Password</label>
                    <input type="password" id="password" placeholder='Enter your Password...' onChange={(e) => { setpasswordLogin(e.target.value) }} />
                </div>
                <div className='account_button'>
                    <button id="submit" onClick={submitButton}>Submit</button>
                </div>
                <div className='account_change_form'>
                    <p>Need an account? <span onClick={LoginOrCreate} className='underline'>Create an Account</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignIn