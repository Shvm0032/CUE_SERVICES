import React, { useState } from 'react';
import '../css/Login.modules.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault();

        axios.post('http://127.0.1:8000/api/getLogin', { email, password })
            .then(res => {
                if (res.data.status === "success") {

                    navigate('/Dashboard');
                } else {
                    alert("Login failed. " + res.data.message);
                }

                console.log(res.data.status)
            })
            .catch(err => console.log(err));
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-3 log-form'>
                    <label htmlFor='exampleInputEmail1' className='form-label'> Email</label>
                    <input
                        type='email'
                        className='form-control'
                        placeholder='Username or Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='mb-3 log-form'>
                    <label htmlFor='exampleInputEmail1' className='form-label'> Password</label>
                    <input
                        type='password'
                        className='form-control'
                        placeholder='Username or Email'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button className='btn btn-success'>Login</button>
            </form>
        </>
    );
}

export default Login;
