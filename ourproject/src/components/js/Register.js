import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../css/Register.modules.css';
import http from "../../utils/http-client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    firstName: z.string().nonempty('First name is required'),
    lastName: z.string().nonempty('Last name is required'),
    username: z.string().nonempty('Username is required'),
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    phone: z.string().nonempty('Phone no. is required'),
    gender: z.string().nonempty('Gender is required'),
    pincode: z.string().nonempty('Pincode is required'),
    address1: z.string().nonempty('Address1 is required'),
    address2: z.string().nonempty('Address2 is required'),
    country: z.string().nonempty('Country is required'),
    state: z.string().nonempty('State is required'),
    city: z.string().nonempty('City is required'),
    password: z.string().nonempty('Password is required'),
    rePassword: z.string().nonempty('Re-entered password is required'),
    termsAccepted: z.boolean().refine(val => val === true, {
        message: 'You must accept the terms and privacy policy'
    }),
});

export default function Register() {

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        if (registrationSuccess) {
            const redirectTimer = setTimeout(() => {
                // Redirect to the login page after 5 seconds
                window.location.replace('/login'); // Replace with the actual login route
            }, 5000);

            return () => clearTimeout(redirectTimer);
        }
    }, [registrationSuccess]);

    const onSubmit = async (formData) => {
        try {
            const response = await http.post('/NewRegistration', formData);
            if (response?.data?.success) {
                toast.success('Registration successful! Redirecting to login page...', { duration: 5000 });
                setRegistrationSuccess(true);
            } else {
                toast.error('This email is already registered', { duration: 4000 });
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
            toast.error('An error occurred during registration. Please try again.', { duration: 4000 });
        }
    };
    console.log(registrationSuccess);

    console.log(errors);

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
                    <div className='row mt-5 '>
                        <div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 shadow-lg Form-Container'>
                            <form className='p-5 mt-5 mb-5' onSubmit={handleSubmit(onSubmit)}>

                                <p className='text-center fs-3 fw-bold'>
                                    Sign Up to your account{' '}

                                </p>
                                <hr />
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputFirstName' className='form-label'>
                                            First Name
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                            placeholder='First Name'
                                            id='exampleInputFirstName'
                                            {...register("firstName")}
                                        />
                                        {errors.firstName && (
                                            <div className='invalid-feedback'>{errors.firstName.message}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputLastName' className='form-label'>
                                            Last Name
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                            placeholder='Last Name'
                                            id='exampleInputLastName'
                                            {...register("lastName")}
                                        />
                                        {errors.lastName && (
                                            <div className='invalid-feedback'>{errors.lastName.message}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputUsername' className='form-label'>
                                            Username
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                            placeholder='Username'
                                            id='exampleInputUsername'
                                            {...register("username")}
                                        />
                                        {errors.username && (
                                            <div className='invalid-feedback'>{errors.username.message}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputEmail' className='form-label'>
                                            EMAIL
                                        </label>
                                        <input
                                            type='email'
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder='Email'
                                            id='exampleInputEmail'
                                            {...register("email")}
                                        />
                                        {errors.email && (
                                            <div className='invalid-feedback'>{errors.email.message}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputPhone' className='form-label'>
                                            Phone No.
                                        </label>
                                        <input
                                            type='tel'
                                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                            placeholder='Phone'
                                            id='exampleInputPhone'
                                            {...register("phone")}
                                        />
                                        {errors.phone && (
                                            <div className='invalid-feedback'>{errors.phone.message}</div>
                                        )}
                                    </div>

                                </div>
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputGender' className='form-label'>
                                            Gender
                                        </label>
                                        <div>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    id='male'
                                                    value='male'
                                                    {...register("gender")}
                                                />
                                                <label className='form-check-label' htmlFor='male'>
                                                    Male
                                                </label>
                                            </div>

                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    id='female'
                                                    value='female'
                                                    {...register("gender")}
                                                />
                                                <label className='form-check-label' htmlFor='female'>
                                                    Female
                                                </label>
                                            </div>
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    className='form-check-input'
                                                    type='radio'
                                                    id='others'
                                                    value='others'
                                                    {...register("gender")}
                                                />
                                                <label className='form-check-label' htmlFor='others'>
                                                    Others
                                                </label>
                                            </div>
                                            
                                        </div>
                                        {errors.gender && (
                                            <div className='invalid-feedback'>{errors.gender.message}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputPincode' className='form-label'>
                                            Pincode
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                                            placeholder='Pincode'
                                            id='exampleInputPincode'
                                            {...register("pincode")}
                                        />
                                        {errors.pincode && (
                                            <div className='invalid-feedback'>{errors.pincode.message}</div>
                                        )}
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputAddress1' className='form-label'>
                                            Address 1
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${errors.address1 ? 'is-invalid' : ''}`}
                                            placeholder='Address 1'
                                            id='exampleInputAddress1'
                                            {...register("address1")}
                                        />
                                        {errors.address1 && (
                                            <div className='invalid-feedback'>{errors.address1.message}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputAddress2' className='form-label'>
                                            Address 2
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${errors.address2 ? 'is-invalid' : ''}`}
                                            placeholder='Address 2'
                                            id='exampleInputAddress2'
                                            {...register("address2")}
                                        />
                                        {errors.address2 && (
                                            <div className='invalid-feedback'>{errors.address2.message}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputCountry' className='form-label'>
                                            Country
                                        </label>
                                        <select
                                            className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                                            id='exampleInputCountry'
                                            {...register("country")}
                                        >
                                            <option value="">Select Country</option>
                                            <option value="United Kindom(UK)">United Kindom(UK)</option>
                                            <option value="Australia">Australia</option>
                                            <option value="England">England</option>
                                            <option value="New Zealand">New Zealand</option>
                                            <option value="Switzerland"> Switzerland</option>
                                            <option value="United States">United States</option>
                                           
                                        </select>
                                        {errors.country && (
                                            <div className='invalid-feedback'>{errors.country.message}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputState' className='form-label'>
                                            State
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                            placeholder='State'
                                            id='exampleInputState'
                                            {...register("state")}
                                        />
                                        {errors.state && (
                                            <div className='invalid-feedback'>{errors.state.message}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputCity' className='form-label'>
                                            City
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                            placeholder='City'
                                            id='exampleInputCity'
                                            {...register("city")}
                                        />
                                        {errors.city && (
                                            <div className='invalid-feedback'>{errors.city.message}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputPassword' className='form-label'>
                                            Password
                                        </label>
                                        <input
                                            type='password'
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder='Password'
                                            id='exampleInputPassword'
                                            {...register("password")}
                                        />
                                        {errors.password && (
                                            <div className='invalid-feedback'>{errors.password.message}</div>
                                        )}
                                    </div>
                                    <div className='col mb-3 sign-form'>
                                        <label htmlFor='exampleInputRePassword' className='form-label'>
                                            Re-enter Password
                                        </label>

                                        <input
                                            type='password'
                                            className={`form-control ${errors.rePassword ? 'is-invalid' : ''}`}
                                            placeholder='Re-entered password'
                                            id='exampleInputRePassword'
                                            {...register("rePassword")}
                                        />

                                        {errors.rePassword && (
                                            <div className='invalid-feedback'>{errors.rePassword.message}</div>
                                        )}

                                    </div>
                                </div>
                                <div className='mb-3 justify-content-start gap-3 form-check d-flex align-items-center sign-form'>
                                    <input
                                        type='checkbox'
                                        className='form-check-input'
                                        id='exampleCheck1'
                                        {...register("termsAccepted")}
                                    />
                                    <label className='form-check-label' htmlFor='exampleCheck1'>
                                        Accept the Terms and Privacy Policy
                                    </label>
                                    {errors.termsAccepted && (
                                        <div className='invalid-feedback'>{errors.termsAccepted.message}</div>
                                    )}
                                </div>
                                <div className='col flex-column text-center'>
                                    <button type='submit' className='p-2 btn sign-buttons '> Register </button><br />
                                    <Link className='text-secondary text-center' to='/login'>
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
