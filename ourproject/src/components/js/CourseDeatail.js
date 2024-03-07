import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import parse from 'html-react-parser';
import { selectCartItems } from '../../redux/cartSlice';
import { Toaster, toast } from 'react-hot-toast';

export default function CourseDetail() {
    const IMGurl = process.env.REACT_APP_IMG_URL;
    const cartItems = useSelector(selectCartItems);
    const [showToast, setShowToast] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [mins, setMinutes] = useState(0);
    const [secs, setSeconds] = useState(0);
    const [pr, setPrice] = useState(0);
    
    const { slug } = useParams();
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.course.courses);
    const course = courses.find((c) => c.slug.toString() === slug);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
   // console.log(course);



    
    const getTime = () => {
        //console.log(course,'course');
        const deadline = course.date + ' '+ course.est_time;
        const time = Date.parse(deadline) - Date.now();
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor(time / (1000 * 60 * 60) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(getTime, 1000);
        return () => clearInterval(interval);
    }, []);



    const ItemComponent = ({ id, name, price, selected, onSelect }) => (
        <table className='table table-striped table-hover '>
            <tbody>
                <tr>
                    <td className='col text-start border-0'>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            style={{ width: '30px', height: '30px' }}
                            onChange={() => onSelect(id, price)} // Use onChange instead of onClick
                            checked={selected}
                        />
                    </td>
                    <td className='col-12 border-0' style={{ textAlign: 'justify' }}>{name}</td>
                    <td className='col border-0 text-danger text-end fs-4'>${price}</td>
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
        let course = cartItems.find(item => item.course_id === id);
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
                    <div className='container p-2'>
                        <div className='row  p-2'>
                            <div className='col-12'>
                                <h3 className=' mt-5' style={{ fontSize: '36px', fontStyle: 'normal' }}>
                                    {course.title}
                                </h3>

                            </div>
                            <div className='col-lg-6'>
                                <div className='row d-flex justify'>
                                    <div className='col-12 mt-3'>
                                        <div className='d-flex gap-5 flex-row align-item-center justify-content-center mt-4'>
                                            <div className='d-flex align-item-center justify-content-start'><i className="far fa-user fa-2x"></i>&emsp;<span className='fs-5'>{course.name}</span></div>
                                            <div className='d-flex align-item-center justify-content-start'><i className="fas fa-stopwatch fa-2x"></i>&emsp;<span className='fs-5'>{course.duration}min</span></div>
                                            <div className='d-flex align-item-center justify-content-start'><i className="fas fa-calendar-alt fa-2x"></i>&emsp;<span className='fs-5'>{course.date} </span></div>
                                        </div>
                                        <div className='d-flex gap-lg-5 gap-5 align-item-center justify-content-center mt-4'>
                                            <div className='d-flex align-item-center justify-content-start'>
                                                <i class="far fa-clock fa-2x"></i>&emsp;<span className='fs-5'> {course.est_time} (EST) | {course.cst_time} (CST) | {course.mst_time} (MST) | {course.pst_time} (PST)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 '>
                                        <div className='col-lg-12 col-12 mt-3 d-flex   text-center align-item-center justify-content-lg-around justify-content-sm-start p-lg-3  gap-2 p-3' style={{ borderRadius: '10px', color: '#fff' }}>
                                            <div className='Clock-box d-flex flex-column  justify-content-center align-items-center border border-4 border-danger  shadow-lg'><span className='text-dark' style={{ color: 'black', fontSize: '27px!important', fontWeight: '600' }}>Days</span><span className='text-dark' style={{ color: 'black', fontSize: '27px !important', fontWeight: '600' }}>{days < 10 ? "0" + days : days}</span></div>
                                            <div className='Clock-box d-flex  flex-column justify-content-center align-items-center border border-4 border-danger  shadow-lg'><span className='text-dark' style={{ color: 'black', fontSize: '27px!important', fontWeight: '600' }}>Hours</span><span className='text-dark' style={{ color: 'black', fontSize: '27px !important', fontWeight: '600' }}>{days < 10 ? "0" + hours : hours}</span></div>
                                            <div className='Clock-box d-flex  flex-column justify-content-center align-items-center border border-4 border-danger  shadow-lg'><span className='text-dark' style={{ color: 'black', fontSize: '27px!important', fontWeight: '600' }}>Mins</span><span className='text-dark' style={{ color: 'black', fontSize: '27px !important', fontWeight: '600' }}>{days < 10 ? "0" + mins : mins}</span></div>
                                            <div className='Clock-box d-flex  flex-column justify-content-center align-items-center border border-4 border-danger  shadow-lg'><span className='text-dark' style={{ color: 'black', fontSize: '27px!important', fontWeight: '600' }}>Sec</span><span className='text-dark' style={{ color: 'black', fontSize: '27px !important', fontWeight: '600' }}>{days < 10 ? "0" + secs : secs}</span></div>
                                        </div>
                                    </div>
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
                                <div className='row ' >
                                    <ul class="nav fs-5 gap-5 justify-content-center nav-pills mb-4 " id="pills-tab" role="tablist" style={{ fontWeight: '500', borderBottom: '2px solid #ff9b24' }}>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Overview</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Speaker</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Certification</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-faq-tab" data-bs-toggle="pill" data-bs-target="#pills-faq" type="button" role="tab" aria-controls="pills-faq" aria-selected="false">FAQ</button>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" style={{ textAlign: 'justify' }}>{parse(course?.description)}</div>
                                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"><div className='row p-3' >

                                            <div className='col-lg-12 col-12 p-3'>
                                                <div className='float-left w-25'>
                                                    <img src={`${IMGurl}/${course.images}`} alt="Speaker" style={{ width: '270px', height: '270px', float: 'left', borderRadius: '50%' }} />
                                                </div>
                                                <div className='float-none'>
                                                    <h4 className='my-2'>{course.name}</h4>
                                                    <h5 className='my-2'>Speaker</h5>
                                                    <p className='my-2 text-dark ' style={{ textAlign: 'justify' }}>
                                                        {course?.bio ? parse(course.bio) : ''}
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
                                        </div></div>
                                        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">Certification</div>
                                        <div class="tab-pane fade" id="pills-faq" role="tabpanel" aria-labelledby="pills-faq-tab">FAQ</div>
                                    </div>
                                    {/* OLD ONE  */}

                                </div>


                            </div>

                            <div className='col-lg-5  col-12 p-5 fs-5' style={{ marginTop: '-370px' }}>
                                <div className='row'>
                                    <img src={`${IMGurl}/${course.course_thumbail}`} className='course-img' style={{ borderRadius: "32px" }} height={330} width={100} alt="Course_thumnail" />
                                </div>
                                <div className='row bg-light  p-2 shadow-lg '>
                                    <h3 className=' display-6 text-center p-3 mt-2 ' style={{ fontWeight: '600', color: '#ff9b24', borderBottom: '2px solid #ff9b24' }}>Registration Options</h3>
                                    <div className='row  p-2'>
                                        {Object.keys(categoryMap).map(category => (
                                            <div className='col-12 p-2 ' key={category}>
                                                <h3 className='mt-2 mb-2 fw-bold text-center'>{category}</h3>
                                                <form>
                                                    {categoryMap[category].map((item, index) => (
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

                                        <div className='col-12 p-2 mt-1'>

                                            <div className='col-12 my-2'>
                                                <h3 className=' p-3  rounded text-dark text-center mt-2 ' >
                                                    Total Fee: <span className='fw-bold text-danger'> ${pr}</span>
                                                </h3>
                                                <center>
                                                    <Link to=''>
                                                        <button onClick={handleAddToCart} className=" button2addtocark">
                                                            Add to Cart
                                                        </button>
                                                    </Link> &emsp;
                                                </center>
                                                <p className='lh-base mt-5 p-2 fs-5 text-primary text-start'>
                                                    <span className='text-danger fs-4 mt-5'>*</span>
                                                    Couldn't find the option you're looking for? Don't worry, let us know your requirements and we will get back to you SOON!
                                                    <Link to='/Contactus' className='text-danger text-decoration-underline fs-5 p-2'>Contact Us Now</Link>
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
