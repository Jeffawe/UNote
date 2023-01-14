import React from 'react'
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css'
import { GrAdd } from "react-icons/gr";
import { GiNotebook } from "react-icons/gi";

const Sidebar = ({ width, ChangeSize, data, Clicked, isOpen, accountManager, isLoggedIn }) => {

    const isMenuOpen = (state) => {
        if(state.isOpen){
            ChangeSize()
            if (typeof window != 'undefined' && window.document) {
                document.body.style.overflow = 'hidden';
            }
        }else{
            ChangeSize()
            document.body.style.overflow = 'unset';
        }
    }

    return (
        <Menu isOpen={isOpen} width={width} onStateChange={isMenuOpen} disableAutoFocus>
            {isLoggedIn &&
                <span className='add-menu' onClick={() => accountManager(3)}>
                    <GrAdd size={30} className='add'/>
                </span>
            }
            <span className="menu-item" onClick={() => { Clicked(0) }}>
                Home
            </span>
            {data.map((datum, index) => {
                return (
                    <span className="menu-item" key={datum.id} onClick={() => { Clicked(index + 1) }}>
                        <p className='name'>{datum.name}</p>
                        <p className='mobile-name'><GiNotebook size={30}/></p>
                    </span>
                )
            })}
        </Menu>
    )
}

export default Sidebar