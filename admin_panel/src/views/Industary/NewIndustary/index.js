import React from 'react'

export default function NewIndustary() {
  return <div>

    <div className='container'>
      <div className='row'>
        <div className='col-6 offset-3 border p-4 shadow'>
          <form action="">
            <h3>Add New Industary</h3>
            <div className='row mt-5'>
              <div className='col-4'>
                <label htmlFor='name'>Industary Name: </label>
              </div>
              <div className='col'>
                <input type='text' className='form-control' name='name' id='name' />
              </div>
            </div><br/>
            <div className='row'>
              <div className='col text-center'>
                <input type='submit' name='Submit' className='btn btn-success' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
}
