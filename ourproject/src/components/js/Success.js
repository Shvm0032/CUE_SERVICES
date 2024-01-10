import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Success() {
  const {courseId, userId, payment} = useParams();
  
  useEffect(()=>{
    fetch(`http://127.0.1:8000/api/course_added`, {
      method: "post", 
      body: JSON.stringify({
        userId: userId,
        courseId: courseId,
        payment: payment
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
       console.logg(data)
    })
    .catch(error => console.error('Error fetching user information:', error));
  
  },[])
 
  return (
    <div >
      <h1>Success</h1>
    </div>
  )
}
