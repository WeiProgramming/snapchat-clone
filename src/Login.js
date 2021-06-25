import React from 'react'
import { useDispatch } from 'react-redux'
import {Button} from '@material-ui/core'
import {auth, provider} from './firebase'
import {login} from './features/appSlice'
import './Login.css'

function Login() {
    const dispatch = useDispatch();
    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoUrl,
                id: result.user.uid
            }))
        })
        .catch(err => {
            alert(err.message)
        })
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://cdn.icon-icons.com/icons2/840/PNG/512/Snapchat_icon-icons.com_66936.png" alt=""/>
                <Button variant="outlined" onClick={signIn}>
                    Sign In
                </Button>
            </div>
        </div>
    )
}

export default Login
