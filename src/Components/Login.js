import React from 'react'
import { auth, provider} from "../firebase"
import { useStateValue } from "../Components/userContext"
import { actionTypes } from './reducer';
import db from "../firebase";
import {v4} from "uuid"
const Login = () => {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
            dispatch({
                type: actionTypes.SET_LOADING,
                loading: true
            })
            console.log(result.user.uid);
            db.collection('todos').doc(result.user.uid).collection('todo').doc('text').set({
                val: "",
                uuid: v4(),
                done: false
            })
        }
        )
    }
    const log = () => {
        
    }
    return (
        <div>
            <button onClick = {signIn} >Login</button>
        </div>
    )
}

export default Login