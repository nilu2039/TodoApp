import React, { useState } from 'react';
import firebase from "firebase"
import "./App.css"
import Todos from './Components/Todos';
import { useStateValue } from "./Components/userContext"
import AddTodos from './Components/AddTodos';
import Login from './Components/Login';
import "bootstrap/dist/css/bootstrap.min.css"
const App = () => {
  const [{todos, setTodo, user, loading}, dispatch] = useStateValue();
  console.log(loading);
  return (
    <div className = "app" >
      {loading ? (
        <div>
          <AddTodos />
          <div className = "todo" >
            <Todos todo = {todos} setTodo = {setTodo} />
          </div>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  )
}

export default App