import React, { useEffect, useState } from 'react'
import './page.css'

const Page = ({ width, data, deleteNote, saveNote, editNote, isLoggedIn }) => {
  const [value, setValue] = useState("")
  const [isEmpty, setisEmpty] = useState(true)

  const [newname, setnewname] = useState("")

  //Checks if content of the note has changed
  const [contentChanged, setcontentChanged] = useState(false)

  //Checks if the user is editing the title or name of the note
  const [edit, setedit] = useState(false)

  const handleChange = (event) => {
    if (value !== data.content) {
      setcontentChanged(true)
    } else {
      setcontentChanged(false)
    }
    setValue(event.target.value);
  }

  const handleDelete = () => {
    deleteNote(data.email, data.name)
  }

  const handleSave = () => {
    saveNote(value, data.name, data.id)
    setcontentChanged(false)
  }

  const handleEdit = () => {
    if (edit) {
      setedit(false)
      editNote(newname, data.name, data.id)
    } else {
      setedit(true)
    }
  }

  const handleEditChange = (event) => {
    setnewname(event.target.value);
  }

  useEffect(() => {
    if (JSON.stringify(data) !== '{}') {
      setValue(data.content)
      setnewname(data.name)
      setisEmpty(false)
    } else {
      setisEmpty(true)
    }
    setedit(false)
  }, [data])

  return (
    <div className='page_background' style={{ width: `${width}` }}>
      {!isEmpty &&
        <div>
          <div className='page_header'>
            {!edit &&
              <h1>{newname}</h1>
            }
            {edit &&
              <textarea value={newname} onChange={handleEditChange} />
            }
            <div className='page_buttons'>
              {contentChanged ? <p>Not Saved</p> : <p>Saved</p>}
              <button onClick={handleEdit}>{edit ? <p>Save Title</p> : <p>Edit Title</p>}</button>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>

          <textarea value={value} onChange={handleChange} />
        </div>
      }

      {isEmpty &&
        <div className='page_emptytext'>
          {!isLoggedIn &&
            <div>
              <h1>Welcome To Unote</h1>
              <h1>Please Sign in to View your notes</h1>
            </div>
          }
          {isLoggedIn &&
            <div>
              <h1>Welcome To Unote</h1>
              <h1>Add a new note and start writing</h1>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Page