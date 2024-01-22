import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Register.modules.css';
export default function Register() {


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        gender: '',
        pincode: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
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
                window.location.replace('/Login');
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
        if (!formData.phone.trim()) {
            errors.phone = 'Phone no. is required';
        }
        if (!formData.gender.trim()) {
            errors.gender = 'Gender is required';
        }
        if (!formData.pincode.trim()) {
            errors.pincode = 'Pincode is required';
        }
        if (!formData.address1.trim()) {
            errors.address1 = 'Address1 is required';
        }
        if (!formData.address2.trim()) {
            errors.address2 = 'Address2 is required';
        }
        if (!formData.country.trim()) {
            errors.country = 'Country is required';
        }
        if (!formData.state.trim()) {
            errors.state = 'State is required';
        }
        if (!formData.city.trim()) {
            errors.city = 'City is required';
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
                const response = await fetch('http://localhost:8000/api/NewRegistration', {
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
                        phone: formData.phone,
                        gender: formData.gender,
                        pincode: formData.pincode,
                        address1: formData.address1,
                        address2: formData.address2,
                        country: formData.country,
                        state: formData.state,
                        city: formData.city,
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
                    <div className='row  '>
                        <div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 shadow-lg Form-Container'>
                            <form className='p-2 mt-5 mb-5' onSubmit={handleSubmit}>
                                
                                <p className='text-center fs-3 fw-bold'>
                                Sign Up to your account{' '}
                                   
                                </p>
                                <hr />
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputFirstName' className='form-label sign-form'>
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
                                        <label htmlFor='exampleInputLastName' className=' sign-form form-label'>
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
                                        <label htmlFor='exampleInputUsername' className=' form-label'>
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
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputPhone' className='form-label'>
                                            Phone No.
                                        </label>
                                        <input
                                            type='number'
                                            className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                                            placeholder='Phone'
                                            id='exampleInputPhone'
                                            name='phone'
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.phone && (
                                            <div className='invalid-feedback'>{formErrors.phone}</div>
                                        )}
                                    </div>

                                </div>
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label className='form-label'>Gender</label>

                                        <div>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name='gender'
                                                    id='male'
                                                    value='male'
                                                    checked={formData.gender === 'male'}
                                                    onChange={handleInputChange}
                                                />
                                                <label className='form-check-label' htmlFor='male'>
                                                    Male
                                                </label>
                                            </div>

                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    name='gender'
                                                    id='female'
                                                    value='female'
                                                    checked={formData.gender === 'female'}
                                                    onChange={handleInputChange}
                                                />
                                                <label className='form-check-label' htmlFor='female'>
                                                    Female
                                                </label>
                                            </div>
                                        </div>

                                        {formErrors.gender && (
                                            <div className='invalid-feedback'>{formErrors.gender}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputPincode' className='form-label'>
                                            Pincode
                                        </label>
                                        <input
                                            type='number'
                                            className={`form-control ${formErrors.pincode ? 'is-invalid' : ''}`}
                                            placeholder='Pincode'
                                            id='exampleInputPincode'
                                            name='pincode'
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.pincode && (
                                            <div className='invalid-feedback'>{formErrors.pincode}</div>
                                        )}
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputAddress1' className='form-label'>
                                            Address1
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${formErrors.address1 ? 'is-invalid' : ''}`}
                                            placeholder='Address1'
                                            id='exampleInputAddress1'
                                            name='address1'
                                            value={formData.address1}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.address1 && (
                                            <div className='invalid-feedback'>{formErrors.address1}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputAddress2' className='form-label'>
                                            Address2
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${formErrors.address2 ? 'is-invalid' : ''}`}
                                            placeholder='Address2'
                                            id='exampleInputAddress2'
                                            name='address2'
                                            value={formData.address2}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.address2 && (
                                            <div className='invalid-feedback'>{formErrors.address2}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputCountry' className='form-label'>
                                            Country
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${formErrors.country ? 'is-invalid' : ''}`}
                                            placeholder='Country'
                                            id='exampleInputCountry'
                                            name='country'
                                            value={formData.country}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.country && (
                                            <div className='invalid-feedback'>{formErrors.country}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputState' className='form-label'>
                                            State
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${formErrors.state ? 'is-invalid' : ''}`}
                                            placeholder='State'
                                            id='exampleInputState'
                                            name='state'
                                            value={formData.state}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.state && (
                                            <div className='invalid-feedback'>{formErrors.state}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputCity' className='form-label'>
                                            City
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                                            placeholder='City'
                                            id='exampleInputCity'
                                            name='city'
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                        {formErrors.city && (
                                            <div className='invalid-feedback'>{formErrors.city}</div>
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
                                <div className='mb-3 justify-content-between form-check d-flex align-items-center sign-form'>
                                    <div>
                                        <input
                                            type='checkbox'
                                            className=''
                                            id='exampleCheck1'
                                            name='termsAccepted'
                                            checked={formData.termsAccepted}
                                            onChange={handleInputChange}
                                        />&emsp;
                                        <label className='form-check-label' htmlFor='exampleCheck1'>
                                            Accept the Terms and Privacy Policy
                                        </label>
                                    </div>
                                    {formErrors.termsAccepted && (
                                        <div className='invalid-feedback'>{formErrors.termsAccepted}</div>
                                    )}
                                </div>
                                <div className='col flex-column text-center'>
                                <button type='submit' className='  btn sign-buttons '> Register </button><br/>
                                <Link  className='text-secondary text-center' to='/login'>
                                        Already have account?<span className='text-primary'>LogIn</span>
                                    </Link>
                                </div>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
