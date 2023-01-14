import React, { useContext } from 'react'
import './Modal.css'
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';
import { UserContext } from '../context'

const SignUp = () => {
    const { LoginOrCreate, CloseModal, addTodb } = useContext(UserContext);

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const submitButton = () => {
        console.log("Submitted");
        addTodb(firstname, lastname, email, password);
        CloseModal();
    }

    return (
        <div className='account_background'>
            <div className='close_button'>
                <AiOutlineClose size={20} className='exit_icon' onClick={CloseModal}/>
            </div>
            <div className='signin_header'>
                <h1>CREATE AN ACCOUNT</h1>
                {/* <hr class="solid"></hr> */}
            </div>
            <div>
                <div className='account_name'>
                    <div className='account_input firstname'>
                        <label>First Name</label>
                        <input type="text" id="firstname" placeholder='Enter your Firstname...' onChange={(event) => { setfirstname(event.target.value) }} />
                    </div>
                    <div className='account_input lastname'>
                        <label>Last Name</label>
                        <input type="text" id="lastname" placeholder='Enter your Lastname...' onChange={(event) => { setlastname(event.target.value) }} />
                    </div>
                </div>

                <div className='account_input'>
                    <label>Email Address</label>
                    <input type="text" id="email" placeholder='Enter your Email Address...' onChange={(event) => { setemail(event.target.value) }} />
                </div>

                <div className='account_input'>
                    <label>Password</label>
                    <input type="password" id="password" placeholder='Enter your Password...' onChange={(event) => { setpassword(event.target.value) }} />
                </div>
                <div className='account_button'>
                    <button id="submit" onClick={submitButton}>Submit </button>
                </div>
                <div className='account_change_form'>
                    <p>Have an account? <span onClick={LoginOrCreate} className='underline'>Login</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp