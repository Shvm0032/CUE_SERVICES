import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import ReactHtmlParser from 'html-react-parser';
import { selectCartItems } from '../../redux/cartSlice';
import { Toaster, toast } from 'react-hot-toast';

export default function CourseDetail() {
    const cartItems = useSelector(selectCartItems);
    const [showToast, setShowToast] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [mins, setMinutes] = useState(0);
    const [secs, setSeconds] = useState(0);
    const [pr, setPrice] = useState(0);
    const deadline = "October,21,2023";
    const { id } = useParams();
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.course.courses);
    const course = courses.find((c) => c.id.toString() === id);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    console.log(cartItems)
    // ...
    

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor(time / (1000 * 60 * 60) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        // const interval = setInterval(getTime, 1000);
        // return () => clearInterval(interval);
    }, []);



    const ItemComponent = ({ id, name, price, selected, onSelect }) => (
        <table className='table table-success table-hover '>
            <tbody>
                <tr>
                    <td className='col border-0'>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            style={{ width: '30px', height: '30px' }}
                            onChange={() => onSelect(id, price)} // Use onChange instead of onClick
                            checked={selected}
                        />
                    </td>
                    <td className='col border-0'>{name}</td>
                    <td className='col border-0 text-primary fs-4'>${price}</td>
                </tr>
            </tbody>
        </table>
    );
    // ...


    // ...

    const addData = (id, price) => {
        const isSelected = selectedItems.includes(id);

        if (isSelected) {
            setSelectedItems((prevItems) => prevItems.filter((item) => item !== id));
            setPrice((prevPrice) => prevPrice - parseInt(price));
        } else {
            setSelectedItems((prevItems) => [...prevItems, id]);
            setPrice((prevPrice) => prevPrice + parseInt(price));
        }
    };


    const handleCheckboxSelect = (id, price) => {
        addData(id, price);
        setSelectedCourseId(id);
    };

    // ...



    const handleAddToCart = () => {

        if (course) {
            const data = JSON.parse(course.selling_option);
            const courseInfo = courses.find((c) => c.id.toString() === course.id);
            let itemsInfo = [];
            let totalPrice = 0;
            Object.keys(selectedItems).map(selectedItem => {
                console.log(data, selectedItem);
                let priceItem = data.find(element => element.id === selectedItems[selectedItem]);
                itemsInfo.push(
                    {
                        "itemId": selectedItems[selectedItem],
                        "itemName": priceItem.name,
                        "itemPrice": priceItem.price,
                    }
                )
                totalPrice = totalPrice + parseInt(priceItem.price);
            });
            console.log(course, 's');
            let resource = {
                course_id: course.id,
                course_title: course.title,
                totalPrice: totalPrice,
                items: itemsInfo
            };
            console.log(resource, 'resource');
            dispatch(addToCart(resource));
            toast.success('Your Course has been added to the cart!');
        }
    };

    if (!course) {
        return <div>Course not found</div>;
    }

    const data = JSON.parse(course.selling_option);
    const categoryMap = {};

    data.forEach((item) => {
        const { category } = item;

        if (!categoryMap[category]) {
            categoryMap[category] = [];
        }
        categoryMap[category].push(item);
    });



    const toggleToast = () => {
        setShowToast(true);
        // Hide the Toast after 3 seconds (adjust the timeout as needed)
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };


    // your selected course
    const YourSelectedIitem = (optionId) => {
        const { id } = useParams();
        let course = cartItems.find(item => item.course_id == id);
        if (course) {
            let itemid = course.courseItems.find(item => item.itemId === optionId);
            if (itemid) {
                return true;
            }
            else {
                return false;
            }
        }

    }


    return (
        <div>
            <section className='Cource-Detail'>
                <div className='container-fluid' >
                    <div className='container  p-5'>
                        <div className='row Course-title p-lg-5 p-2'>
                            <div className='col-12'>
                                <h3 className=' mt-5' style={{ fontSize: '36px', fontStyle: 'normal' }}>
                                    {course.title}
                                </h3>
                            </div>
                            <div className='col-lg-6 col-12'>
                                <div className='d-flex gap-5 flex-row align-item-center justify-content-start mt-4'>
                                    <div className='d-flex align-item-center justify-content-start'>
                                        <i class="far fa-clock fa-2x"></i>&emsp;<span className='fs-5'>{course.time} min</span>
                                    </div>
                                    <div className='d-flex align-item-center justify-content-start'>
                                        <i class="far fa-user fa-2x"></i>&emsp;<span className='fs-5'>{course.name}</span>
                                    </div>
                                </div>
                                <div className='d-flex gap-lg-5 gap-5 align-item-center justify-content-start mt-4'>
                                    <div className='d-flex align-item-center justify-content-start'><i class="fas fa-stopwatch fa-2x"></i>&emsp;<span className='fs-5'>{course.duration} </span></div>
                                    <div className='d-flex align-item-center justify-content-start'><i class="fas fa-calendar-alt fa-2x"></i>&emsp;<span className='fs-5'>{course.date} </span></div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-12'>
                                <div className='col-lg-12 col-12 mt-3 d-flex   text-center align-item-center justify-content-lg-around justify-content-sm-start p-lg-3  gap-2 p-3' style={{ borderRadius: '10px', color: '#fff' }}>
                                    <div className='Clock-box d-flex flex-column  justify-content-center align-items-center border border-4  border-danger  shadow-lg' ><span className='text'>Days</span><span>{days < 10 ? "0" + days : days}</span></div>
                                    <div className='Clock-box d-flex  flex-column justify-content-center align-items-center border  border-4 border-primary  shadow-lg'><span className='text'>Hours</span><span>{days < 10 ? "0" + hours : hours}</span></div>
                                    <div className='Clock-box d-flex  flex-column justify-content-center align-items-center border border-4 border-warning  shadow-lg'><span className='text'>Mins</span><span>{days < 10 ? "0" + mins : mins}</span></div>
                                    <div className='Clock-box d-flex  flex-column justify-content-center align-items-center border border-4 border-white  shadow-lg'><span className='text'>Sec</span><span>{days < 10 ? "0" + secs : secs}</span></div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row  start-50  position-absolute top-100 translate-middle" style={{ width: '100%', height: '40px' }}>
                            <img src="/imgs/wave-section-break.webp" className="img-fluid" width={"100%"}></img>
                        </div> */}


                    </div>
                </div>

            </section>

            {/* second section */}
            <section >
                <div className='container-fluid ' >
                    <div className='container'>
                        <div className='d-flex flex-lg-row flex-column gap-5 mt-5'>
                            <div className='col-lg-7 col-12 '>
                                <div className='row' >
                                    <nav >
                                        <div class="nav nav-tabs p-2" id="nav-tab" role="tablist" style={{ background: '#d7f8e9' }}>
                                            <button class="nav-link fs-5 active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Overview</button>
                                            <button class="nav-link fs-5" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Speaker</button>
                                            <button class="nav-link fs-5" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Certification</button>
                                            <button class="nav-link fs-5" id="nav-FAQ-tab" data-bs-toggle="tab" data-bs-target="#nav-FAQ" type="button" role="tab" aria-controls="nav-FAQ" aria-selected="false">FAQ</button>
                                        </div>
                                    </nav>
                                </div>

                                <div class="tab-content" id="nav-tabContent" >
                                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <div className='row p-2  fs-5'>
                                            <div className='col-12 p-3 mt-2' style={{ textAlign: 'justify' }} >
                                                {/* course description page */}
                                                {/* <ReactParser html={course.description} /> */}
                                                {/* {parse(course.description)} */}
                                               
                                                {ReactHtmlParser(course.description)}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <div className='row p-3' >

                                            <div className='col-lg-12 col-12 p-3'>
                                                <div className='float-left w-25 bg-info '>
                                                    <img src='img/img2.jpg' alt="/" style={{ width: '300px', height: '300px', float: 'left', borderRadius: '50%' }} />
                                                </div>
                                                <div className='float-none'>
                                                    <h4 className='my-2'>{course.name}</h4>
                                                    <h6 className='my-1'>Speaker</h6>
                                                    <p className=' text-dark'>
                                                        {/* {parse(course.bio)} */}
                                                    </p>
                                                </div>
                                                <div className='d-flex gap-2 p-'>
                                                    <div className='p-2'>
                                                        <span >Follow Me:</span>
                                                    </div>
                                                    <div className=' rounded-circle p-2' style={{ width: '40px', height: '40px', background: '#00bbae' }}>
                                                        <i class="fab fa-facebook fa-lg text-white" ></i>
                                                    </div>
                                                    <div className=' rounded-circle p-2' style={{ width: '40px', height: '40px', background: '#00bbae' }}>
                                                        <i class="fab fa-instagram fa-lg text-center     text-white" ></i>
                                                    </div>

                                                    <div className=' rounded-circle p-2' style={{ width: '40px', height: '40px', background: '#00bbae' }}>
                                                        <i class="fab fa-youtube fa-lg text-white" ></i>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='col-12 mt-3 p-3' >
                                                <table className='table'>
                                                    <h3 className='p-2'>Personal Info :</h3>
                                                    <tr>
                                                        <td className='p-2'>Email</td>
                                                        <td className='text-end'>annadbrown@kindedo.com</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='p-2'>Education</td>
                                                        <td className='text-end'>University of California, Los Angeles</td>
                                                    </tr>
                                                    <tr className='p-2'>
                                                        <td className='p-2'>Speakers since</td>
                                                        <td className='text-end'>2016</td>
                                                    </tr>
                                                    <tr className='p-2'>
                                                        <td className='p-2'>At Clears Since:</td>
                                                        <td className='text-end'>2018</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='p-2'>What i love more</td>
                                                        <td className=' text-end'>The Kids with Creative Mind</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        <div className='row p-5' >
                                            <h3 className=' py-4 text-center'>Credits</h3>
                                            <div className='row ' >
                                                <div className=' col-4'>
                                                    <img src='images/img6.jpg' alt='' />
                                                </div>
                                                <div className=' col-8'>
                                                    <p className=' mt-3 text-dark'>
                                                        <span className='text-bold'> Clatid </span>is recognized by SHRM to offer Professional Development Credits (PDCs) for the SHRM-CPSM or SHRM-SCPSM. This program is valid for 1.5 PDCs for the SHRM-CPSM or SHRM-SCPSM. For more information about certification or recertification, please portal.shrm.org.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='row mt-3 ' >
                                                <div className=' col-4'>
                                                    <img src='images/img6.jpg' alt='' />
                                                </div>
                                                <div className=' col-8'>
                                                    <p className=' my-4 text-dark'>
                                                        Clatid is recognized by SHRM to offer Professional Development Credits (PDCs) for the SHRM-CPSM or SHRM-SCPSM. This program is valid for 1.5 PDCs for the SHRM-CPSM or SHRM-SCPSM. For more information about certification or recertification, please portal.shrm.org.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-FAQ" role="tabpanel" aria-labelledby="nav-FAQ-tab">..4.</div>
                                </div>
                            </div>

                            <div className='col-lg-4 col-12  fs-5'  >

                                <div className='row  ps-2'> <h3 className='fw-4 text-center p-3' style={{ background: '#d7f8e9' }}> Registration Options</h3>
                                    <div className='row  p-2'>
                                        {Object.keys(categoryMap).map(category => (
                                            <div className='col-12 mt-4 p-2 ' key={category}>
                                                <h3 className='mt-4 mb-5 fw-bold text-center'>{category}</h3>
                                                <form>
                                                    {categoryMap[category]?.map((item, index) => (
                                                        <ItemComponent
                                                            key={index}
                                                            {...item}
                                                            id={item.id}
                                                            selected={selectedItems.includes(item.id)}
                                                            onSelect={(id, price) => handleCheckboxSelect(id, price)}
                                                        />
                                                    ))}
                                                </form>
                                            </div>
                                        ))}

                                        <div className='col-12 p-2 mt-3'>

                                            <div className='col-12 my-2'>
                                                <h3 className=' p-3  rounded text-white text-center mt-2 ' style={{ background: '#ff9b24' }}>
                                                    Total Fee: <span className='fw-bold text-danger'> ${pr}</span>
                                                </h3>
                                                <center>
                                                    <Link to=''>
                                                        <button onClick={handleAddToCart} className=' btn btn-primary btn-lg text-center mt-4 my-4'>
                                                            Add to Cart
                                                        </button>
                                                    </Link> &emsp;
                                                </center>
                                                <p className='lh-base fs-5 text-primary text-start'>
                                                    <span className='text-danger fs-4 mt-5'>*</span>
                                                    Couldn't find the option you're looking for? Don't worry, let us know your requirements and we will get back to you SOON!<br />
                                                    <span className='text-danger text-decoration-underline fs-4 p-2'>Contact Us Now</span>
                                                </p>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
