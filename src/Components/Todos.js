import db from "../firebase";
import React, { useEffect, useState } from 'react'
import "../App.css";
import { useStateValue } from "./userContext";
import "./Todos.css"
const Todos = ({todo, setTodo}) => {
    const [todosCopy, setTodoCopy] = useState([todo]);
    const [{ user }, dispatch] = useStateValue(); 
    const [done, setDone] = useState(false);
   useEffect(() => {
    const test = () => {
      db.collection('todos').doc(user.uid).collection('todo').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
        snapshot.docs.map(val => {
          if(val.data().val === "") {
            db.collection('todos').doc(user.uid).collection('todo').doc(val.id).delete();
          }
        })
        setTodoCopy(snapshot.docs.map(todo => todo.data()));
        //console.log(snapshot.docs.map(todo => todo.data().done));
      })
    }
    test()
   }, [todo])
    const cut = (id) => {
        todosCopy.map(item => {
          if(id === item.uuid) {
            db.collection('todos').doc(user.uid).collection('todo').onSnapshot(snapshot => {
              snapshot.docs.map(val => {
                if(val.data().uuid === item.uuid) {
                  db.collection('todos').doc(user.uid).collection('todo').doc(val.id).delete();
                }
              })
            })
            return setTodoCopy(todosCopy.filter( val => val.uuid !== id));
          }
          else {
            return todosCopy;
          }
        })
      }
      const btn1 = (id, index) => {
        todosCopy.map(item => {
          if(id === item.uuid) {
            return db.collection('todos').doc(user.uid).collection('todo').onSnapshot(snapshot => {
              snapshot.docs.map(val => {
                if(val.data().uuid === item.uuid) {
                  return db.collection('todos').doc(user.uid).collection('todo').doc(val.id).update({
                    done: true,
                  })
                  //console.log(val.data().done);
                }
              })
            })
          }
        })
      }
    return (
        <div>
            {todosCopy?.map((val, index) => (
                <div className = "group" key = {val.uuid} >
                  <div className = "todo_group">
                    <button className = "btn2" onClick = {() => btn1(val.uuid, index)} >Done</button>
                      <h1 style = {{
                        textDecoration: val.done ?  "line-through" : "none"
                    }} className = "todo_list"> {val.val} </h1>
                    <button className = "btn1" onClick = {() => cut(val.uuid)} >X</button>
                  </div>
                </div>
            ))}
            
        </div>
    )
}

export default Todos
