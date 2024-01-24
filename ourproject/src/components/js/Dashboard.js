import '../css/Dashboard.modules.css';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { Button } from 'react-bootstrap';

const deafaultImg = "img/friend.jpg";



function Dashboard() {
  const navigate = useNavigate();
  const authUser = authService.getAuthUser();
  console.log(authUser)
  const userId = authUser ? authUser.userId : null;
  console.log(userId)
  

  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    uname: '',
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
  });
  
  const [showModal, setShowModal] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(deafaultImg); // Default avatar source

  const handleSave = async (newAvatarSrc) => {
    console.log(newAvatarSrc,'newAvatarSrc');
    // Handle the save logic, for example, updating the avatar source in the state t
    try {
      let data = {
        image_content: newAvatarSrc
      };
      await authService.updateProfileImage(data);
      toast.success('Profile image updated successfully');
    } catch (error) {
      toast.error('Failed to update profile image');
    }
    setAvatarSrc(newAvatarSrc);
  };

  const onClose = () => {
  //  setAvatarSrc(deafaultImg);
    setShowModal(false)
  };
  
  console.log(user)
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const result = await authService.profile(authUser);
      setUser(result.data)
      let userInfo = result.data[0]
      setFormData({
        fname: userInfo.fname,
        lname: userInfo.lname,
        uname: userInfo.uname,
        email: userInfo.email,
        phone: userInfo.phone,
        gender: userInfo.gender,
        pincode: userInfo.pincode,
        address1: userInfo.address1,
        address2: userInfo.address2,
        country: userInfo.country,
        state: userInfo.state,
        city: userInfo.city,
        password: userInfo.password,
        image: userInfo.image,

      });
      if(userInfo?.image){
        setAvatarSrc(userInfo?.image);
      }
      
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/');
    } catch (error) {
      toast.error(error.data.message);
    }
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData, 'formData')
      let data = {
        fname: formData.fname,
        lname: formData.lname,
        uname: formData.uname,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        pincode: formData.pincode,
        address1: formData.address1,
        address2: formData.address2,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        password: formData.password
      };
      await authService.updateProfile(data);

    //  fetchProfile(' http://127.0.1:8000/api/save-image');
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  
  





  const countries = ['india', 'spain', 'france', 'argentina', 'pakistan', 'russia'];





  return (

    <section style={{ paddingBottom: '120px', paddingTop: '120px', background: '#e9ecf6' }}>
      <div className='container-fluid'>
        <div className='row text-center'>
        </div>
        <div className='d-flex flex-lg-row flex-column gap-4 ' >
          <div className="col-md-12 col-lg-3  col-12 pb-2  border shadow" style={{ borderRadius: '14px', background: '#fff' }}>
            <div className='row p-3 border-bottom'>
              <h5 className='mt-2 ms-2'> My Dashboard</h5>
            </div>
            <div className='row p-2'>
              <div className=' d-flex border-bottom flex-column justify-content-center align-items-center mt-3 mb-3 '>
                <img src={avatarSrc} className='  rounded-circle' style={{ width: '150px', height: '150px' }} />
                <h4 className='mt-3'>{user[0]?.uname}</h4>
              </div>
            </div>
            <div class="nav dashboard flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button class="nav-link text-start border-bottom active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="fa-solid fa-address-book"></i> &emsp;My orders</button>
              <button class="nav-link text-start border-bottom" id="v-pills-Address-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Address" type="button" role="tab" aria-controls="v-pills-Address" aria-selected="false"><i class="fas fa-map-marker-alt"></i>&emsp;Address</button>
              <button class="nav-link text-start border-bottom" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i class="fa-solid fa-heart"></i>&emsp;Wishlist</button>
              <button class="nav-link text-start border-bottom" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fa-solid fa-user"></i>&emsp;Profile </button>
              {/* <button class="nav-link text-start border-bottom" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"onClick={handleLogout} ><i class="fa-solid fa-right-from-bracket"></i>&emsp;Logout</button> */}
              <button className='nav-link ' onClick={handleLogout} >Logout</button>
            </div>


          </div>

          <div className="col-md-12 col-lg-9 col-12" >
            <div class="tab-content  border shadow overflow-scroll p-4 " id="v-pills-tabContent" style={{ borderRadius: '14px', background: '#fff' }}>
              <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab ">
                <div className='d-flex justify-content-between align-items-center p-4'>
                  <h5>ALL ORDERS</h5>
                  <a to="/" class="btn btn-success ">Invoice</a>
                </div>
                <table class="table table-responsive  border  table-hover  table-light mt-3   ">
                  <thead className='border-bottom'>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">PHOTO</th>
                      <th scope="col">PRODUCT</th>
                      <th scope="col">QTY</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td><img src="img/course.jpg" alt='' style={{ height: "70px", width: "70px" }} /></td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td><img src="img/course.jpg" alt='' style={{ height: "70px", width: "70px" }} /></td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>@fat</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td><img src="img/course.jpg" alt='' style={{ height: "70px", width: "70px" }} /></td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                    </tr>

                    <tr>
                      <th scope="row">3</th>
                      <td><img src="img/course.jpg" alt='' style={{ height: "70px", width: "70px" }} /></td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td><img src="img/course.jpg" alt='' style={{ height: "70px", width: "70px" }} /></td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td><img src="img/course.jpg" alt='' style={{ height: "70px", width: "70px" }} /></td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* //Profile form // */}

              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">

                <form onSubmit={handleSubmit} encType='multipart/form-data' method='post'>
                  <div className='container'>

                    <div className='d-flex gap-3'>
                      <div className='mt-2 d-flex justify-content-center' style={{ width: '90px', height: '90px', borderRadius: '50%' }}>
                        <img src={avatarSrc} width={"100%"} alt='' className='rounded-circle' />
                      </div>
                      <div className='d-flex flex-column align-item-center justify-content-center'>
                        <h6 className='mt-3'></h6>
                        <p className='text-secondary'>Accepted file type .png. Less than 1MB</p>
                        <Button className="w-5" variant="primary" onClick={() => setShowModal(true)}>
                            Change Profile
                          </Button>
                          {
                            user[0] && 
                            <ProfileModal
                            showModal={showModal}
                            onClose={onClose}
                            onSave={handleSave}
                            avatarSrc={avatarSrc}
                          />
                          }
                          
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col p-5'>

                        <label className='mb-2'>First name</label><br />
                        <input type='text' placeholder='First name' className='form-control' name='fname' value={formData.fname} onChange={handleInputChange} /><br />

                        <label className='mb-2'>Email</label>
                        <input type='text' placeholder='Email' className='form-control' disabled name='email' value={formData.email} onChange={handleInputChange} /><br />
                        <label className='mb-2'> Username</label>
                        <input type='text' placeholder='Username' className='form-control' disabled name='uname' value={formData.uname} onChange={handleInputChange} /><br />
                        <label className='mb-2'> Address1</label>
                        <input type='text' placeholder='Address1' className='form-control' name='address1' value={formData.address1} onChange={handleInputChange} /><br />

                        <label className='mb-2'>Country</label>
                        <select placeholder='Country' className='form-control' name='country' value={formData.country} onChange={handleInputChange}>
                          {countries.map((country, index) => (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          ))}
                        </select><br />

                        <label className='mb-2'> City</label>
                        <input type='text' placeholder='City' className='form-control' name='city' value={formData.city} onChange={handleInputChange} /><br />

                        <label className='mb-2'> Password</label>
                        <input type='password' placeholder='password' className='form-control' name='password' value={formData.password} onChange={handleInputChange} /><br /><br />


                      </div>
                      <div className='col p-5'>
                        <label className='mb-2'> Last name</label>
                        <input type='text' placeholder='Last name' className='form-control' name='lname' value={formData.lname} onChange={handleInputChange} /><br />
                        <label className='mb-2'>Phone Number</label>
                        <input type='text' placeholder='Phone No.' className='form-control' name='phone' value={formData.phone} onChange={handleInputChange} /><br />
                        <label className='mb-2'> Gender</label>
                        <input type='text' placeholder='Gender' className='form-control' name='gender' value={formData.gender} onChange={handleInputChange} /><br />
                        <label className='mb-2'> Address2</label>
                        <input type='text' placeholder='Address2' className='form-control' name='address2' value={formData.address2} onChange={handleInputChange} /><br />
                        <label className='mb-2'> State</label>
                        <input type='text' placeholder='State' className='form-control' name='state' value={formData.state} onChange={handleInputChange} /><br />
                        <label className='mb-2'> Pincode</label>
                        <input type='text' placeholder='Pincode' className='form-control' name='pincode' value={formData.pincode} onChange={handleInputChange} /><br />
                      </div>

                      {/* //Submit buttons// */}
                      <input type='submit' className='btn btn-success' name='submit' value='Update' ></input>

                    </div>

                  </div>
                </form>

              </div>


              <div class="tab-pane fade p-4" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                <div className='d-flex justify-content-between align-items-center p-4'>
                  <h5>
                    <>WISHLIST</></h5>

                </div>
                <table class="table table-responsive table-striped table-border table-hover table-light mt-3 ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">PHOTO</th>
                      <th scope="col">PRODUCT</th>
                      <th scope="col">QTY</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">Total</th>
                      <th scope="col">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td><img src="img/course.jpg" alt='' style={{ height: "70px", width: "70px" }} /></td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>
                        <button type='submit' className='btn btn-success'><i class="fas fa-shopping-cart"></i>&emsp;Move to cart</button> &emsp;
                        <button type='submit' className='btn btn-danger'><i class="fas fa-trash-alt"></i>&emsp;Remove</button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td><img src="img/course.jpg" alt='' style={{ height: "70px", width: "70px" }} /></td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>@fat</td>
                      <td>@fat</td>
                      <td>
                        <button type='submit' className='btn btn-success'><i class="fas fa-shopping-cart"></i>&emsp;Move to cart</button> &emsp;
                        <button type='submit' className='btn btn-danger'><i class="fas fa-trash-alt"></i>&emsp;Remove</button>
                      </td>

                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td><img src="img/course.jpg" alt='' style={{ height: "70px", width: "70px" }} /></td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                      <td>
                        <button type='submit' className='btn btn-success'><i class="fas fa-shopping-cart"></i>&emsp;Move to cart</button> &emsp;
                        <button type='submit' className='btn btn-danger'><i class="fas fa-trash-alt"></i>&emsp;Remove</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tab-pane fade" id="v-pills-Address" role="tabpanel" aria-labelledby="v-pills-Address-tab">
                <div className='container p-5 '>
                  <button type='submit' className='btn btn-success'><i class="fas fa-plus-circle"></i>&emsp; Add New Address</button>
                  <div class="row mt-2">
                    <div class="col-sm-6 col-lg-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title"><i class="fa-solid fa-house"></i>&emsp;Default Address</h5>
                          <hr />
                          <p> + {user[0]?.phone}</p>
                          <p class="card-text">{user[0]?.address1}.</p>
                          <p>{user[0]?.email}</p>
                          <hr />
                          <a href="#" class="btn btn-primary "><i class="fa-solid fa-pencil"></i></a>&emsp;
                          <a href="#" class="btn btn-primary"><i class="fa-solid fa-trash"></i></a>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title"><i class="fa-solid fa-house"></i>&emsp;Office Address</h5><hr />
                          <p>{user[0]?.phone}</p>
                          <p class="card-text">{user[0]?.address2}</p>
                          <p>john54@gmail.com</p>
                          <hr />
                          <a href="#" class="btn btn-primary"><i class="fa-solid fa-pencil"></i></a>&emsp;
                          <a href="#" class="btn btn-primary"><i class="fa-solid fa-trash"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;