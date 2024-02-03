import React from 'react';

export default function Success() {
  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-center align-items-center'>
        <div className="card text-center shadow d-flex justify-content-center align-items-center" style={{ background: 'white', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 3px #C8D0D8' }}>
          <div className='d-flex justify-content-center align-items-center mb-4' style={{ borderRadius: '50%', height: '150px', width: '150px', background: '#F8FAF5' }}>
            <i style={{ color: '#9ABC66', fontSize: '60px', lineHeight: '150px' }}>✓</i>
          </div>
          <h1 className='mb-3' style={{ color: '#88B04B', fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif', fontWeight: '900', fontSize: '24px' }}>Success</h1>
          <p style={{ color: '#404F5E', fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif', fontSize: '16px', margin: '0' }}>
            We received your purchase request;<br /> we'll be in touch shortly!
          </p>
        </div>
      </div>
    </div>
  );
}
