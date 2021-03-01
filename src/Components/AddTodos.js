import React, { useState } from 'react'
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import {v4} from "uuid"
import { useStateValue } from "../Components/userContext";
import db from "../firebase";
import "./AddTodos.css";
import firebase from "firebase";
let todoCopy = [];
const AddTodos = () => {
    const [val, setVal] = useState("");
    const [todo, setTodo] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const addTodo = (e) => {
      e.preventDefault();
      if( val !== "") {
        const uid = v4();
        const obj = {
          val: val,
          uuid: uid,
          done: false
        }
        console.log(user.uid);
        db.collection('todos').doc(user.uid).collection('todo').add({
          val: val,
          uuid: uid,
          done: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setTodo(prev => [...prev, obj]);
        console.log(todoCopy);
        todoCopy.push(obj)
        console.log(prev => [...prev, obj]);
        dispatch ({
            type: "SET_TODOS",
            todos: todoCopy,
        },
        )
        dispatch ({
            type: "SET_TODOSSTATE",
            setTodo: setTodo
        })
        setVal("")
      }
    }

    return (
        <div>
            <form className = "add_todo_form" >
                <input placeholder = "Add todo here" value = {val} onChange = {e => setVal(e.target.value)} className = "add_todo_input" />
                <button onClick = {addTodo} className = "add_todo_btn" >Add</button>
            </form>
        </div>
    )
}

export default AddTodos