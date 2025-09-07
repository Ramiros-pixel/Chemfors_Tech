import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../auth'

const Account = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken()
      if (token) {
        try {
          const response = await axios.get('https://web-production-939b.up.railway.app/protected', {
            withCredentials: false,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUserData(response.data.data)
        } catch (error) {
          console.log('Error fetching user data:', error)
        }
      }
      setLoading(false)
    }
    fetchUserData()
  }, [])

  return (
    <div className='account-container' style={{marginTop: '80px', padding: window.innerWidth < 768 ? '0.5rem' : '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh'}}>
      <div className='container'>
        <h1 className='title has-text-black' style={{fontSize: window.innerWidth < 768 ? '1.5rem' : '2rem', textAlign: window.innerWidth < 768 ? 'center' : 'left'}}>Account Information</h1>
        
        {loading ? (
          <p style={{textAlign: 'center'}}>Loading...</p>
        ) : userData ? (
          <div className='box' style={{backgroundColor: 'white', border: '2px solid #000', maxWidth: '600px', margin: '0 auto'}}>
            <div className='field'>
              <label className='label has-text-black'>Name</label>
              <div className='control'>
                <input 
                  className='input' 
                  type='text' 
                  value={userData.name || ''} 
                  readOnly
                  style={{backgroundColor: '#f0f0f0', border: '1px solid #000'}}
                />
              </div>
            </div>
            
            <div className='field'>
              <label className='label has-text-black'>Email</label>
              <div className='control'>
                <input 
                  className='input' 
                  type='email' 
                  value={userData.email || ''} 
                  readOnly
                  style={{backgroundColor: '#f0f0f0', border: '1px solid #000'}}
                />
              </div>
            </div>
            

          </div>
        ) : (
          <div className='box' style={{backgroundColor: 'white', border: '2px solid #000', textAlign: 'center'}}>
            <p className='has-text-black'>No user data available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Account