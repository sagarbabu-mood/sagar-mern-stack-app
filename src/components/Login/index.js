import React, { useState } from "react";
import * as Components from './Components';
import Cookies from 'js-cookie'

import { Redirect } from 'react-router-dom'
import './index.css'

function Login() {
    const [signIn, toggle] = useState(true);
    const [username, onUpdateUsername] = useState('')
    const [email, onUpdateEmail] = useState('')
    const [password, onUpdatePassword] = useState('')
    const [registerErrorMsg, onUpdateRegisterErrorMsg] = useState('')
    const [loginErrorMessage, onUpdateLoginErrorMessage] = useState('')

    const [loginMail, onUpdateLoginMail] = useState('')

    const [loginPassword, onUpdateLoginPassword] = useState('')


    const onSubmitRegisterForm = async (event) => {
        event.preventDefault()

        if (username === "" || email === "" || password === "") {
            onUpdateRegisterErrorMsg('Please provide values in all fields');
        } else {
            onUpdateRegisterErrorMsg('')
            const userDetails = { username, email, password }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(userDetails),
            }
            const url = 'https://mern-stack-backend-k83i.onrender.com/register'
            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                onUpdateRegisterErrorMsg('Registration Successful. Please Login!')
            } else {
                onUpdateRegisterErrorMsg(data.errorMsg)
            }
        }
    }

    const onSubmitLoginForm = async (event) => {
        event.preventDefault()
        if (loginMail === "" || loginPassword === "") {
            onUpdateLoginErrorMessage('Please provide values in all fields');
        } else {
            onUpdateLoginErrorMessage('')
            const userDetails = { loginMail, loginPassword }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(userDetails),
            }
            const url = 'https://mern-stack-backend-k83i.onrender.com/login'
            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                onUpdateLoginErrorMessage('Login Successful. Please Login!')
                const { user_id } = data
                Cookies.set('sagar-mongodb-login', user_id, { expires: 30 })
            } else {
                onUpdateLoginErrorMessage(data.errorMsg)
            }
        }
    }

    const userId = Cookies.get('sagar-mongodb-login')

    if (userId !== undefined) {
        return <Redirect to="/" />
    }

    return (
        <div className="responsive-container">
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form onSubmit={onSubmitRegisterForm}>
                        <Components.Title>Create Account</Components.Title>
                        <Components.Input value={username} onChange={(event) => { onUpdateUsername(event.target.value) }} type='text' placeholder='Name' />
                        <Components.Input value={email} onChange={(event) => { onUpdateEmail(event.target.value) }} type='email' placeholder='Email' />
                        <Components.Input value={password} onChange={(event) => { onUpdatePassword(event.target.value) }} type='password' placeholder='Password' />
                        <Components.Button type="submit">Sign Up</Components.Button>
                        <p>{registerErrorMsg}</p>
                    </Components.Form>
                </Components.SignUpContainer>
                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={onSubmitLoginForm}>
                        <Components.Title>Sign in</Components.Title>
                        <Components.Input value={loginMail} onChange={(event) => { onUpdateLoginMail(event.target.value) }} type='email' placeholder='Email' />
                        <Components.Input value={loginPassword} onChange={(event) => { onUpdateLoginPassword(event.target.value) }} type='password' placeholder='Password' />
                        {/* <Components.Anchor href='#'>Forgot your password?</Components.Anchor> */}
                        <Components.Button type="submit">Sigin In</Components.Button>
                        <p>{loginErrorMessage}</p>
                    </Components.Form>
                </Components.SignInContainer>
                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>

                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter Your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sigin Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    )
}

export default Login;