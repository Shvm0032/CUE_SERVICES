import React, { useState } from 'react';
import '../css/Login.modules.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import authService from "../../services/auth.service";
import { Link } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { login } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();





    const navigate = useNavigate()

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const res = await authService.login({ email, password });
            if (res.data.success) {
                dispatch(login());
                navigate('/Dashboard');
            } else {
                toast.error("Login failed. " + res.data.message);
            }
        } catch (error) {
            toast.error("An error occurred while logging in.");
            console.error(error);
        }
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
                        <div className='row form Form-Container shadow align-item-center p-5'>
                            <div className='col'>
                                <p className='fs-3 fw-bold' >Sign in to your account</p>
                                <form onSubmit={handleSubmit}>
                                    <div className=' mb-3 log-form'>
                                        <label htmlFor='exampleInputEmail1' className='form-label'>Your Email</label>
                                        <input
                                            required
                                            type='email'
                                            className='form-control form-control-lg'
                                            placeholder='Email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className='mb-3 log-form'>
                                        <label htmlFor='exampleInputEmail1' className='form-label'> Password</label>
                                        <div className='input-icon-container'>
                                            <input
                                                required
                                                type={showPassword ? 'text' : 'password'}
                                                className='form-control form-control-lg '
                                                placeholder='Password'
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                            {showPassword ? (
                                                <>

                                                    <i className='fa-solid fa-eye  p-2' icon={faEyeSlash} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />
                                                </>
                                            ) : (
                                                <>

                                                    <i className='fa-solid fa-eye-slash p-2' icon={faEye} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} ></i>
                                                </>
                                            )}
                                            <div>

                                            </div>
                                        </div>
                                    </div>

                                    <button className='log-buttons'>Login</button><br />
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
