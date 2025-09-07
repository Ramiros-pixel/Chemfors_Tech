import React, { useState } from 'react'
import axios from 'axios'
import { getToken } from '../auth'

const Calculate = () => {
  const [posisi, setPosisi] = useState('')
  const [suhu, setSuhu] = useState('')
  const [tekanan, setTekanan] = useState('')
  const [entalpi, setEntalpi] = useState('')
  const [massa, setMassa] = useState('')
  const [msg, setMsg] = useState('')
  const [hasilHitung, setHasilHitung] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      setMsg('Please login first');
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('posisi', posisi);
      formData.append('suhu', suhu);
      formData.append('tekanan', tekanan);
      formData.append('entalpi', entalpi);
      formData.append('massa', massa);
      
      await axios.post('https://web-production-939b.up.railway.app/data', formData, {
  withCredentials: false,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
});

      
      setMsg('Data berhasil disimpan');
      setPosisi('');
      setSuhu('');
      setTekanan('');
      setEntalpi('');
      setMassa('');
    } catch (error) {
      setMsg(error.response?.data?.message || 'Error saving data');
    }
  }

  const handleHasilHitung = async() => {
    const token = getToken();
    if (!token) {
      setMsg('Please login first');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post('https://web-production-939b.up.railway.app/calculate', {}, {
        withCredentials: false,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setHasilHitung(response.data);
      setMsg('Calculation completed successfully');
    } catch (error) {
      setMsg(error.response?.data?.message || 'Error calculating');
    }
    setLoading(false);
  }

  return (
    <div className='calculate-container' style={{marginTop: '80px', padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh'}}>
      <div className='container'>
        <h1 className='title has-text-black'>Calculate Chemistry Data</h1>
        
        <div className='columns is-mobile is-multiline'>
          <div className='column is-half-desktop is-full-mobile'>
            <div className='box' style={{backgroundColor: 'white', border: '2px solid #000'}}>
              <h2 className='subtitle has-text-black'>Add Chemistry Data</h2>
              <form onSubmit={handleSubmit}>
                <div className='field'>
                  <label className='label has-text-black'>Posisi</label>
                  <p className='help has-text-grey-dark'>Input dengan "inlet" untuk percobaan awal dan "outlet" untuk hasil</p>
                  <div className='control'>
                    <input 
                      className='input' 
                      type='text' 
                      placeholder='inlet atau outlet'
                      value={posisi}
                      onChange={(e) => setPosisi(e.target.value)}
                      required
                      style={{border: '1px solid #000'}}
                    />
                  </div>
                </div>
                
                <div className='field'>
                  <label className='label has-text-black'>Suhu</label>
                  <div className='control'>
                    <input 
                      className='input' 
                      type='number' 
                      placeholder='Suhu'
                      value={suhu}
                      onChange={(e) => setSuhu(e.target.value)}
                      required
                      style={{border: '1px solid #000'}}
                    />
                  </div>
                </div>
                
                <div className='field'>
                  <label className='label has-text-black'>Tekanan</label>
                  <div className='control'>
                    <input 
                      className='input' 
                      type='number' 
                      placeholder='Tekanan'
                      value={tekanan}
                      onChange={(e) => setTekanan(e.target.value)}
                      required
                      style={{border: '1px solid #000'}}
                    />
                  </div>
                </div>
                
                <div className='field'>
                  <label className='label has-text-black'>Entalpi</label>
                  <div className='control'>
                    <input 
                      className='input' 
                      type='number' 
                      placeholder='Entalpi'
                      value={entalpi}
                      onChange={(e) => setEntalpi(e.target.value)}
                      required
                      style={{border: '1px solid #000'}}
                    />
                  </div>
                </div>
                
                <div className='field'>
                  <label className='label has-text-black'>Massa</label>
                  <div className='control'>
                    <input 
                      className='input' 
                      type='number' 
                      placeholder='Massa'
                      value={massa}
                      onChange={(e) => setMassa(e.target.value)}
                      required
                      style={{border: '1px solid #000'}}
                    />
                  </div>
                </div>
                
                <div className='field'>
                  <div className='control'>
                    <button className='button is-black is-fullwidth' type='submit'>
                      Add Data
                    </button>
                  </div>
                </div>
              </form>
              
              {msg && (
                <div className={`notification ${msg.includes('berhasil') ? 'is-success' : 'is-danger'}`}>
                  {msg}
                </div>
              )}
            </div>
          </div>
          
          <div className='column is-half-desktop is-full-mobile'>
            <div className='box' style={{backgroundColor: 'white', border: '2px solid #000'}}>
              <h2 className='subtitle has-text-black'>Hasil Perhitungan</h2>
              <button 
                className='button is-black is-fullwidth mb-4' 
                onClick={handleHasilHitung}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Calculate Result'}
              </button>
              
              {hasilHitung && (
                <div className='content' style={{backgroundColor: '#f0f0f0', padding: '1rem', border: '1px solid #000'}}>
                  <pre style={{color: '#000', backgroundColor: 'transparent'}}>
                    {JSON.stringify(hasilHitung, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculate
