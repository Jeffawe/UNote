import React from 'react'
import './Modal.css'
import SignUp from './SignUp'
import SignIn from './SignIn'
import AddNote from './AddNote/AddNote'

const Modal = ({ accountManager }) => {
    return (
        <div className='darkBG'>
            <div className='modal_background'>
                <div>
                    {accountManager === 1 &&
                        <SignUp />
                    }

                    {accountManager === 2 &&
                        <SignIn />
                    }
                    {accountManager === 3 &&
                        <AddNote />
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal