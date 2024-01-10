import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/js/Home';
import About from './components/js/About';
import Contactus from './components/js/Contactus';
import Dashboard from './components/js/Dashboard';
import Becomespeaker from './components/js/Becomespeaker';
import Webinar from './components/js/Webinar';
import Ourspeaker from './components/js/Ourspeaker';
import Navbar from './components/js/Navbar';
import Login from './components/js/Login';
import Register from './components/js/Register';
import Footer from './components/js/Footer';
import Faqrear from './components/js/Faqrear';
import CourseDetail from './components/js/CourseDeatail';
import Subscribe from './components/js/Subscribe';
import CardSummary from './components/js/CardSummery';
import Success from './components/js/Success';
import Cancle from './components/js/Cancle';
import Speaker from './components/js/Speaker';
import Error from './components/js/Error';
import Add_cart from './components/js/Add_cart';

function App() {
  return (

    <BrowserRouter>

      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Navbar' element={<Navbar />} />
        <Route path='/About' element={<About />} />
        <Route path='/Webinar' element={<Webinar />} />
        <Route path='/Ourspeaker' element={<Ourspeaker />} />
        <Route path='/Becomespeaker' element={<Becomespeaker />} />
        <Route path='/Contactus' element={<Contactus />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/Footer' element={<Footer />} />
        <Route path='/Faqrear' element={<Faqrear />} />
        <Route path='/Course_Detail/:id' element={<CourseDetail/>} />
        <Route path='/Subscribe' element={<Subscribe/>} />
        <Route path='/CardSummary/:course/:payment' element={<CardSummary/>} />
        <Route path='/Payment_Success/:courseId/:userId/:payment' element={<Success/>} />
        <Route path='/Payment_Cancle' element={<Cancle/>} />
        <Route path='/About-Speaker/:id' element={<Speaker/>} />
        <Route path='/Add_cart' element={<Add_cart/>} />
        <Route path='*' element={<Error/>} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
   
export default App;
