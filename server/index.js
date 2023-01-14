import express from "express";
import mysql2 from 'mysql2'
import cors from 'cors'

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3001;
}

app.use(cors())
app.use(express.json())

const db = mysql2.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'jeffery',
    database: 'unote'
})

//req (request) is for sending to the frontend, res (response) is for getting a response from the frontend
app.post('/signup', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    db.query('INSERT INTO user_table (firstname, lastname, email, password) VALUES(?,?,?,?)', 
    //err stands for error and res for result
    [firstname, lastname, email, password], (err, result) => {
        //This catches error when inputting into the database and prints the error
        if(err){
            console.log(err);
            res.send({message: "Duplicate Entry"})
        }else{
            res.send("Values Inserted");
        }
    })
})

app.post('/signin', (req , res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM unote.user_table WHERE email = ? AND password = ?', [email, password] , 
    (err, result) => {
        if(err){
            res.send({error: err});
        }
        
        if(res){
           result.length > 0 ? res.send(result) : res.send([]) 
        }
    })

})

app.post('/delete', (req, res) => {
    const email = req.body.email;

    db.query('DELETE FROM unote.user_table WHERE email = ?', 
    //err stands for error and res for result
    [email], (err, result) => {
        //This catches error when inputting into the database and prints the error
        if(err){
            console.log(err);
        }else{
            res.send("Values Deleted");
        }
    })
})

app.post('/addnote', (req, res) => {
    const name = req.body.name;
    const content = req.body.content;
    const email = req.body.email;

    db.query('INSERT INTO notes (name, content, email) VALUES(?, ?, ?);', 
    //err stands for error and res for result
    [name, content, email], (err, result) => {
        //This catches error when inputting into the database and prints the error
        if(err){
            console.log(err);
        }else{
            res.send("Values Inserted");
        }
    })
})

app.post('/getnotes', (req , res) => {
    const email = req.body.email;

    db.query('SELECT user_table.email, name, content, notes.id  FROM unote.user_table, unote.notes WHERE user_table.email = notes.email AND user_table.email = ?', 
    [email] , 
    (err, result) => {
        if(err){
            res.send({error: err});
        }
        
        if(res){
           res.send(result)
        }
    })
})

app.post('/savenote', (req, res) => {
    const content = req.body.content;
    const name = req.body.name;
    const id = req.body.id;

    db.query('UPDATE unote.notes SET content = ? WHERE name = ? AND id = ?', 
    //err stands for error and res for result
    [content, name, id], (err, result) => {
        //This catches error when inputting into the database and prints the error
        if(err){
            console.log(err);
        }else{
            res.send("Values Inserted");
        }
    })
})

app.post('/editname', (req, res) => {
    const newname = req.body.newname
    const name = req.body.name;
    const id = req.body.id;

    db.query('UPDATE unote.notes SET name = ? WHERE name = ? AND id = ?', 
    //err stands for error and res for result
    [newname, name, id], (err, result) => {
        //This catches error when inputting into the database and prints the error
        if(err){
            console.log(err);
        }else{
            res.send("Values Inserted");
        }
    })
})

app.post('/deletenote', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;

    db.query('DELETE FROM unote.notes WHERE email = ? AND name = ?', 
    //err stands for error and res for result
    [email, name], (err, result) => {
        //This catches error when inputting into the database and prints the error
        if(err){
            console.log(err);
        }else{
            res.send("Values Deleted");
        }
    })
})

app.listen(port, () => {
    "Listening on Port 3000"
})