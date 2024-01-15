import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.modules.css';
export default function Register() {

    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        rePassword: '',
        termsAccepted: false,
    });

    const [formErrors, setFormErrors] = useState({});
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    useEffect(() => {
        if (registrationSuccess) {
            const redirectTimer = setTimeout(() => {
                // Redirect to the login page after 5 seconds
                // You should replace '/login' with the actual login route
                // You may use the react-router Redirect component for navigation
                window.location.replace('/login');
            }, 5000);

            // Clear the timer when the component unmounts
            return () => clearTimeout(redirectTimer);
        }
    }, [registrationSuccess]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: inputValue });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }
        if (formData.password !== formData.rePassword) {
            errors.rePassword = 'Passwords do not match';
        }
        if (!formData.termsAccepted) {
            errors.termsAccepted = 'You must accept the terms and privacy policy';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            try {
                const response = await fetch('http://localhost:8000/api/Registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        // Send only the necessary data to the server
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                if (response.ok) {
                    setRegistrationSuccess(true);
                } else {
                    console.log('Failed to submit form data.');
                }
            } catch (error) {
                console.error('Error submitting form data:', error);
            }
        } else {
            console.log('Form is invalid. Please fix errors.');
        }
    };

    if (registrationSuccess) {
        return (
            <div className="registration-success">
                <p>Registration successful! Redirecting to login page in 5 seconds...</p>
            </div>
        );
    }


    return (
        <>
            <section className="WaveHeaderBox">
                <div className='row  faq-heads'>
                    <div className='row faq-headers p-5 mt-5'>
                        <div className='col-md-12 faq mains '>
                            <h1 className="mt-5  text-white" style={{ fontSize: "80px", marginBottom: "5px", fontWeight: '500' }}>Register</h1>
                            <Link to='/' className='text-white'><i class="fa-solid fa-house" style={{ "color": "#719dea;" }}></i> CuService - Register</Link>
                        </div>
                    </div>
                    <div className='wave wave1'></div>
                    <div className='wave wave5'></div>
                </div>
            </section >


            <section style={{ padddingTop: '140px', paddingBottom: '300px' }}>
                <div className='container '>
                    <div className='row '>
                        <div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12  border border-1 shadow-lg bg-light form-container'>
                            <form className='p-2 mt-5 mb-5' onSubmit={handleSubmit}>
                                <h3 className='text-bold text-center'>Sign-Up</h3>
                                <p className='text-center'>
                                    Already have an account?{' '}
                                    <Link className='sign-lnk' to='/login'>
                                        Log-In
                                    </Link>
                                </p>
                                <hr />
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputFirstName' className='form-label'>
                                            FIRST NAME
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                                            placeholder='First name'
                                            id='exampleInputFirstName'
                                            name='firstName'
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.firstName && (
                                            <div className='invalid-feedback'>{formErrors.firstName}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputLastName' className='form-label'>
                                            LAST NAME
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                                            placeholder='Last name'
                                            id='exampleInputLastName'
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.lastName && (
                                            <div className='invalid-feedback'>{formErrors.lastName}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputUsername' className='form-label'>
                                            USERNAME
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                                            placeholder='Username'
                                            id='exampleInputUsername'
                                            name='username'
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.username && (
                                            <div className='invalid-feedback'>{formErrors.username}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputEmail' className='form-label'>
                                            EMAIL
                                        </label>
                                        <input
                                            type='email'
                                            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                            placeholder='Email'
                                            id='exampleInputEmail'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.email && (
                                            <div className='invalid-feedback'>{formErrors.email}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputPassword' className='form-label'>
                                            PASSWORD
                                        </label>
                                        <input
                                            type='password'
                                            className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                                            placeholder='Password'
                                            id='exampleInputPassword'
                                            name='password'
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.password && (
                                            <div className='invalid-feedback'>{formErrors.password}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputRePassword' className='form-label'>
                                            RE-ENTER PASSWORD
                                        </label>
                                        <input
                                            type='password'
                                            className={`form-control ${formErrors.rePassword ? 'is-invalid' : ''}`}
                                            placeholder='Re-entered password'
                                            id='exampleInputRePassword'
                                            name='rePassword'
                                            value={formData.rePassword}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.rePassword && (
                                            <div className='invalid-feedback'>{formErrors.rePassword}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='mb-3 justify-content-between form-check d-flex align-items-center'>
                                    <div>
                                        <input
                                            type='checkbox'
                                            className=''
                                            id='exampleCheck1'
                                            name='termsAccepted'
                                            checked={formData.termsAccepted}
                                            onChange={handleInputChange}
                                        />
                                        <label className='form-check-label' htmlFor='exampleCheck1'>
                                            Accept the Terms and Privacy Policy
                                        </label>
                                    </div>
                                    {formErrors.termsAccepted && (
                                        <div className='invalid-feedback'>{formErrors.termsAccepted}</div>
                                    )}
                                </div>
                                <button type='submit' className='btn btn-success'>
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
