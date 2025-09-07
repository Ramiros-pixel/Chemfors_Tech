import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../auth'

const Documentation = () => {
  const [hasilHitung, setHasilHitung] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHasilHitung = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await axios.get('https://web-production-939b.up.railway.app/hasil_hitung', {
            withCredentials: false,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Full response:', response.data);
          console.log('Response data:', response.data.data);
          console.log('Data length:', response.data.data ? response.data.data.length : 0);
          console.log('Is array?', Array.isArray(response.data.data));
          
          const responseData = response.data.data || response.data;
          console.log('Final data to set:', responseData);
          setHasilHitung(Array.isArray(responseData) ? responseData : []);
        } catch (error) {
          console.log('Error fetching hasil hitung:', error);
        }
      }
      setLoading(false);
    };
    fetchHasilHitung();
  }, []);

  return (
    <div className='documentation-container' style={{marginTop: '80px', padding: window.innerWidth < 768 ? '0.5rem' : '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh'}}>
      <div className='container'>
        <h1 className='title has-text-black' style={{fontSize: window.innerWidth < 768 ? '1.5rem' : '2rem', textAlign: window.innerWidth < 768 ? 'center' : 'left'}}>Documentation</h1>
        <div className='content'>
          <h2 className='subtitle has-text-black' style={{fontSize: window.innerWidth < 768 ? '1.2rem' : '1.5rem', textAlign: window.innerWidth < 768 ? 'center' : 'left'}}>Hasil Perhitungan</h2>
          {loading ? (
            <p style={{textAlign: 'center'}}>Loading...</p>
          ) : (
            <div style={{overflowX: 'auto'}}>
            <table className='table is-striped is-fullwidth' style={{backgroundColor: 'white', border: '1px solid #000', minWidth: window.innerWidth < 768 ? '600px' : 'auto', fontSize: window.innerWidth < 768 ? '0.8rem' : '1rem'}}>
              <thead style={{backgroundColor: '#000', color: '#fff'}}>
                <tr>
                  <th style={{color: '#fff', border: '1px solid #000'}}>ID</th>
                  <th style={{color: '#fff', border: '1px solid #000'}}>Efisiensi</th>
                  <th style={{color: '#fff', border: '1px solid #000'}}>Efisiensi (%)</th>
                  <th style={{color: '#fff', border: '1px solid #000'}}>Energi Masuk</th>
                  <th style={{color: '#fff', border: '1px solid #000'}}>Kerja Aktual</th>
                  <th style={{color: '#fff', border: '1px solid #000'}}>Created At</th>
                </tr>
              </thead>
              <tbody>
                {hasilHitung.length > 0 ? (
                  hasilHitung.map((item, index) => (
                    <tr key={index} style={{backgroundColor: index % 2 === 0 ? '#fff' : '#f0f0f0'}}>
                      <td style={{border: '1px solid #000', color: '#000'}}>{item.id}</td>
                      <td style={{border: '1px solid #000', color: '#000'}}>{item.efisiensi}</td>
                      <td style={{border: '1px solid #000', color: '#000'}}>{item.efisiensi_persen}%</td>
                      <td style={{border: '1px solid #000', color: '#000'}}>{item.energi_masuk}</td>
                      <td style={{border: '1px solid #000', color: '#000'}}>{item.kerja_aktual}</td>
                      <td style={{border: '1px solid #000', color: '#000'}}>{item.created_at}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{textAlign: 'center', border: '1px solid #000', color: '#000'}}>No calculation results available</td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Documentation