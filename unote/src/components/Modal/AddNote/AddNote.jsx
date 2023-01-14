import React, { useContext, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from '../../context';
import '../Modal.css'

const AddNote = () => {
    const { CloseModal, addNote } = useContext(UserContext);
    
    const [title, settitle] = useState([])
    const [content, setcontent] = useState([])

    const submitButton = () => {
        addNote(title, content)
        CloseModal()
    }

    return (
        <div className='account_background'>
            <div className='close_button'>
                <AiOutlineClose size={20} className='exit_icon' onClick={CloseModal} />
            </div>
            <div className='signin_header'>
                <h1>Add a Note</h1>
                {/* <hr class="solid"></hr> */}
            </div>
            <div>
                <div className='account_input'>
                    <label>Title</label>
                    <input type="text" id="email" placeholder='Enter a Title...' onChange={(e) => { settitle(e.target.value) }} />
                </div>
                <div className='account_input'>
                    <label>Note</label>
                    <p>This can be changed anytime</p>
                    <textarea placeholder='Enter a note...' onChange={(e) => { setcontent(e.target.value) }} />
                </div>
                <div className='account_button'>
                    <button id="submit" onClick={submitButton}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default AddNote