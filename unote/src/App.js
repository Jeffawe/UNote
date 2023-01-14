import { useState } from 'react';
import './App.css';
import { Navbar, Page, SideBar, Modal } from './components/index'
import { UserContext, NavbarContext } from './components/context'
import Axios from 'axios';

const App = () => {
  //Helps set the width of the other div
  const [width, setwidth] = useState(80)
  //The different notes the user has, that is sent to the sidebar
  const [notes, setnotes] = useState([])
  //The data that is given to the page when that particular button has been clicked
  const [dataToShow, setdataToShow] = useState({})
  //controls the different modals
  const [account, setaccount] = useState(0)
  //controls if the sidebar is open or not
  const [isOpen, setisOpen] = useState(true)
  //holds the data of the current user
  const [customer, setcustomer] = useState([])
  //Sets if the user is Logged In or not
  const [isLoggedIn, setisLoggedIn] = useState(false)

  //Controls the width of the elements as the sidebar opens and closes
  const ChangeSize = () => {
    width === 80 ? setwidth(100) : setwidth(80)
  }

  //This function switches between the Login and Create an Account Modal
  const LoginOrCreate = () => {
    account === 2 ? setaccount(1) : setaccount(2);
  }

  //Closes the Modal
  const CloseModal = () => {
    setaccount(0)
  }

  //Called when one of the notes on the sidebar is clicked
  const Clicked = (id) => {
    if (id === 0) {
      setdataToShow({})
    } else {
      let dataNeeded = notes[id - 1];
      setdataToShow(dataNeeded);
    }
  }

  //Controls what modal is being shown
  //use accountManager(0) to close the modal
  const accountManager = (number) => {
    //1 is Sign Up
    //2 is Sign In
    setaccount(number);
    setisOpen(false);
  }

  //Checks if an array(arr) is empty
  const isArrayEmpty = (arr) => {
    return Array.isArray(arr) && arr.length === 0;
  }

  //Logs Out of the Current Session
  const LogOut = () => {
    setisLoggedIn(false);
    accountManager(0);
    setcustomer([])
    setnotes([])
    setdataToShow({})
  }

  //Adds the User into the database
  const addTodb = (firstname, lastname, email, password) => {
    Axios.post('http://localhost:3001/signup', {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }).then((response) => {
      if(response.data.message !== null){
        alert("This User already exists")
      }else{
        alert("Account Created");
        console.log("Success");
        getCustomers(email, password)
      }
    })
  }

  //Checks if the email and the password of the user is in the database and returns the customer's details
  const getCustomers = (email, password) => {
    Axios.post('http://localhost:3001/signin', {
      email: email,
      password: password
    }).then((response) => {
      //Checks if the array gotten from the backend is empty or not
      if (isArrayEmpty(response.data)) {
        alert("Wrong Username or Password");
      } else {
        getNotes(email)
        setisLoggedIn(true)
        //sets the customer state to the response from the backend
        setcustomer(response.data);
        alert("Welcome " + response.data[0].firstname);
        //Closes the Modal
        accountManager(0)
      }
    })
  }

  //Adds the Users Note to the Database
  const addNote = (name, content) => {
    //Checks if there is anything in customer
    if (customer[0].email == null || undefined) {
      alert("Sign In In To Add a Note")
      //Add a Refresh Page here. Because an Error has occured here
    } else {
      Axios.post('http://localhost:3001/addnote', {
        name: name,
        content: content,
        email: customer[0].email,
      }).then(() => {
        alert("Note Added");
        console.log("Success");
        getNotes(customer[0].email)
      })
    }
  }

  //Deletes the Note from the database
  const DeleteNote = (email, name) => {
    Axios.post('http://localhost:3001/deletenote', {
      email: email,
      name: name
    }).then(() => {
      alert("Note Deleted");
      console.log("Success");
      getNotes(email)
      setdataToShow({})
    })
  }

  //gets all the notes the user has
  const getNotes = (email) => {
    Axios.post('http://localhost:3001/getnotes', {
      email: email,
    }).then((response) => {
      //Checks if the array gotten from the backend is empty or not
      if (response.data.message != null) {
        alert("Error Getting your Notes");
      } else {
        console.log(response.data)
        setnotes(response.data)
      }
    })
  }

  //Saves the new content the user has put into the database
  const saveNote = (content, name, id) => {
    Axios.post('http://localhost:3001/savenote', {
      content: content,
      name: name,
      id: id,
    }).then(() => {
      console.log("Success");
      getNotes(customer[0].email)
    })
  }

  //Saves the new Title/Name the user has put it in the database
  const editNote = (newname, name, id) => {
    Axios.post('http://localhost:3001/editname', {
      newname: newname,
      name: name,
      id: id,
    }).then(() => {
      console.log("Success");
      getNotes(customer[0].email)
    })
  }

  //Deletes the users account
  const DeleteAccount = (email) => {
    Axios.post('http://localhost:3001/delete', {
      email: email
    }).then(() => {
      alert("Account Deleted");
      console.log("Success");
      LogOut();
    })
  }

  return (
    <div>
      <div className="app" id="outer-container">
        <div className='header'>
          <NavbarContext.Provider value={{ LogOut, DeleteAccount }}>
            <Navbar loggedIn={isLoggedIn} accountManager={accountManager} data={customer} />
          </NavbarContext.Provider>
        </div>
        <div>
          <SideBar outerContainerId={'outer-container'} width={`${100 - width}%`} ChangeSize={ChangeSize} data={notes} Clicked={Clicked} isOpen={isOpen} accountManager={accountManager} isLoggedIn={isLoggedIn} />
        </div>
        <div className='page'>
          <Page width={`${width}%`} data={dataToShow} deleteNote={DeleteNote} saveNote = {saveNote} editNote={editNote} isLoggedIn={isLoggedIn}/>
        </div>
      </div>
      {account > 0 && 
        <UserContext.Provider value={{ LoginOrCreate, CloseModal, addTodb, getCustomers, addNote }}>
          <Modal accountManager={account} />
        </UserContext.Provider>
      }
    </div>
  );
}

export default App;
