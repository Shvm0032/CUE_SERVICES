import React, { useState, useEffect } from 'react';
import '../css/Dashboard.modules.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch user information from the server
    fetch('http://127.0.1:8000/api/Registration')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        }
      })
      .catch(error => console.error('Error fetching user information:', error));
  }, []);



  const handleLogout = () => {
    // Logout request to the server
    fetch('http://127.0.1:8000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Redirect to login page after successful logout
          navigate('/login');
        } else {
          console.error('Logout failed:', data.message);
        }
      })
      .catch(error => console.error('Error during logout:', error));
  };

  

  const countries = ['india', 'spain', 'france', 'argentina', 'pakistan', 'russia'];

  return (

    <section style={{ paddingBottom: '120px', paddingTop: '120px', background: '#e9ecf6' }}>
      <div className='container'>
        <div className='row text-center'>
        </div>
        <div className='d-flex flex-lg-row flex-column gap-4 ' >
          <div className="col-md-12 col-lg-3  col-12 pb-2  border shadow" style={{ borderRadius: '14px', background: '#fff' }}>
            <div className='row p-3 border-bottom'>
              <h5 className='mt-2 ms-2'> My Dashboard</h5>
            </div>
            <div className='row p-2'>
              <div className=' d-flex border-bottom flex-column justify-content-center align-items-center mt-3 mb-3 '>
                <img src='images/img1.jpg' className='  rounded-circle' style={{ width: '150px', height: '150px' }} />
                <h4 className='mt-3'>{user ? user.email : 'Loading...'}</h4>
              </div>
            </div>
            <div class="nav dashboard flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button class="nav-link text-start border-bottom active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="fa-solid fa-address-book"></i> &emsp;My orders</button>
              <button class="nav-link text-start border-bottom" id="v-pills-Address-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Address" type="button" role="tab" aria-controls="v-pills-Address" aria-selected="false"><i class="fas fa-map-marker-alt"></i>&emsp;Address</button>
              <button class="nav-link text-start border-bottom" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i class="fa-solid fa-heart"></i>&emsp;Wishlist</button>
              <button class="nav-link text-start border-bottom" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fa-solid fa-user"></i>&emsp;Profile </button>
              {/* <button class="nav-link text-start border-bottom" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"onClick={handleLogout} ><i class="fa-solid fa-right-from-bracket"></i>&emsp;Logout</button> */}
              <button className='nav-link ' onClick={handleLogout}>Logout</button>
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
              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className='container'>

                 <div className='d-flex gap-3'>
                  <div className='mt-2 d-flex justify-content-center' style={{width:'90px',height:'90px', borderRadius:'50%'}}>
                      <img src='img/friend.jpg ' width={"100%"} alt='' className='rounded-circle' />
                  </div>
                  <div className='d-flex flex-column align-item-center justify-content-center'>
                      <h6 className='mt-3'></h6>
                      <p className='text-secondary'>Accepted file type .png. Less than 1MB</p>
                      <input type='file' className='text-secondary'/>
                  </div>
                 </div>

                  <div className='row'>
                    <div className='col p-5'>
                      <label className='mb-2'>First name</label><br/>
                      <input type='text' placeholder='First name' className='form-control' name='n' /><br />

                      <label className='mb-2'>Email</label>
                      <input type='text' placeholder='First name' className='form-control' name='e' /><br />

                      <label className='mb-2'>Country</label>
                      <select placeholder='First name' className='form-control' name='country'>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select><br />
                    </div>
                    <div className='col p-5'>
                      <label className='mb-2'> Last name</label>
                      <input type='text' placeholder='First name' className='form-control' name='n' /><br />

                      <label className='mb-2'>Phone Number</label>
                      <input type='text' placeholder='First name' className='form-control' name='ph' /><br />

                      <label className='mb-2'> Language</label>
                      <input type='text' placeholder='First name' className='form-control' name='language' /><br />
                    </div>
                  </div>
                </div>
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
                          <p>+91 08023310451</p>
                          <p class="card-text">3-15/10/403 Newark, Street no 5, Next To Pizza Hut, Bangalore, Karnataka, 560003, India.</p>
                          <p>soniataylor344@example.com</p>
                          <hr />
                          <a href="#" class="btn btn-primary "><i class="fa-solid fa-pencil"></i></a>&emsp;
                          <a href="#" class="btn btn-primary"><i class="fa-solid fa-trash"></i></a>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title"><i class="fa-solid fa-house"></i>&emsp;Office Address</h5>  <hr />
                          <p>+91 02228346362</p>
                          <p class="card-text">2-15A-12 , Steriling Chambers, S Radhakrishnana Marg, J B Nagar, Andheri (west), Mumbai , Maharashtra</p>
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