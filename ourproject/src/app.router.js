import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthGuard from './guards/auth.guard';
import { useDispatch } from 'react-redux';
import { fetchCourses } from './redux/courseSlice';
import { fetchSpeakers } from './redux/speakerSlice';

import './App.css';

import Home from './components/js/Home';
import About from './components/js/About';

import Cources from './components/js/Courses';
import CourseDetail from './components/js/CourseDeatail';

import Add_cart from './components/js/Add_cart';
import CardSummary from './components/js/CardSummery';

import Success from './components/js/Success';
import Cancle from './components/js/Cancle';

import Speakers from './components/js/Speakers';
import Speaker from './components/js/Speaker';
import Becomespeaker from './components/js/Becomespeaker';

import Login from './components/js/Login';
import Register from './components/js/Register';
import Dashboard from './components/js/Dashboard';

import Error from './components/js/Error';
import Subscribe from './components/js/Subscribe';

import Faqrear from './components/js/Faqrear';
import Contactus from './components/js/Contactus';

const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(fetchCourses());
        dispatch(fetchSpeakers());

    }, [dispatch]);

    return (

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/About' element={<About />} />

            <Route path='/Speakers' element={<Speakers />} />
            <Route path='/Speaker/:id' element={<Speaker />} />
            <Route path='/Becomespeaker' element={<Becomespeaker />} />

            <Route element={<AuthGuard />}>
                <Route path='/Dashboard' element={<Dashboard />} />
                <Route path='/Payment_Success/:courseId/:userId/:payment' element={<Success />} />
            </Route>


            <Route path='/course' element={<Cources />} />
            <Route path='/Course_Detail/:id' element={<CourseDetail />} />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/Add_cart' element={<Add_cart />} />
            <Route path='/CardSummary/:course/:payment' element={<CardSummary />} />

            <Route path='/Faqrear' element={<Faqrear />} />
            <Route path='/Contactus' element={<Contactus />} />
            <Route path='/Subscribe' element={<Subscribe />} />

            <Route path='/Payment_Cancle' element={<Cancle />} />
            <Route path='*' element={<Error />} />

        </Routes>

    )
}

export default AppRouter;