import React, { useState } from 'react';
import '../css/Login.modules.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authService from "../../services/auth.service";
import { Link } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault();

        await authService.login({ email, password })
            .then(res => {
                if (res.data.success) {
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
            <section className="WaveHeaderBox">
                <div className='row  faq-heads'>
                    <div className='row faq-headers p-5 mt-5'>
                        <div className='col-md-12 faq mains '>
                            <h1 className="mt-5  text-white" style={{ fontSize: "80px", marginBottom: "5px", fontWeight: '500' }}>Login</h1>
                            <Link to='/' className='text-white'><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService - Login</Link>
                        </div>
                    </div>
                    <div className='wave wave1'></div>
                    <div className='wave wave5'></div>
                </div>
            </section >

            <section>
                <div className="container" style={{ paddingTop: '10px' }}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='row Form-Container shadow align-item-center p-5'>
                            <div className='col'>
                                <p className='fs-3 fw-bold' >Sign in to your account</p>
                                <form onSubmit={handleSubmit}>
                                    <div className=' mb-3 log-form'>
                                        <label htmlFor='exampleInputEmail1' className='form-label'>Your Email</label>
                                        <input
                                            type='email'
                                            className='form-control'
                                            placeholder='Email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className='mb-3 log-form'>
                                        <label htmlFor='exampleInputEmail1' className='form-label'> Password</label>
                                        <input
                                            type='password'
                                            className='form-control'
                                            placeholder='Password'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    
                                    <button className='btn log-buttons'>Login</button><br/>
                                    <Link to='/register ' className='text-secondary text-center'>Not a member?<span className='text-primary'>Create your new Account</span></Link>
                                </form>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </section >

        </>
    );
}

export default Login;
