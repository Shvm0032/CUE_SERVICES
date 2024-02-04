import React from 'react'

function Error() {
  return (
    <div className='mt-5 d-flex align-items-center justify-content-center '>
      <div className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 class="display-1 fw-bold">404</h1>
          <p className="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
          <p className="lead">
            The page you’re looking for doesn’t exist.
          </p>
          <a href="index.html" class="btn btn-primary">Go Home</a>
        </div>
      </div>

    </div>
  )
}

export default Error
