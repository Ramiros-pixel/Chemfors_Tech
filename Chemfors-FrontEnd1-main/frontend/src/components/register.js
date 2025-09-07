import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../media/background2.mp4'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [alamat, setAlamat] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [msg] = useState('')
    
    const handleRegister = async(e) =>{
        e.preventDefault();
        console.log('Sending data:', { name, email, alamat, password });
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('alamat', alamat);
            formData.append('password', password);

            const response = await axios.post("https://web-production-939b.up.railway.app/signUp", formData, {
                withCredentials: false,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Registration successful:', response.data);
            navigate("/login")
        }catch (error){
            if(error.response){
                console.log('Error response:', error.response.data);
                console.log('Error status:', error.response.status);
            } else {
                console.log('Error:', error.message);
            }
        }
    }

    return (
        <div className='register-container'>
            <div className="columns is-gapless is-mobile" style={{height: '100vh', flexDirection: window.innerWidth < 768 ? 'column' : 'row'}}>
                <div className="column is-half-desktop is-full-mobile" style={{minHeight: window.innerWidth < 768 ? '40vh' : '100vh'}}>
                    <video 
                        autoPlay 
                        muted 
                        loop 
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    >
                        <source src={backgroundVideo} type="video/mp4" />
                    </video>
                </div>
                <div className="column is-half-desktop is-full-mobile" style={{backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: window.innerWidth < 768 ? '60vh' : '100vh'}}>
                    <div style={{width: '90%', maxWidth: '400px', padding: window.innerWidth < 768 ? '1rem' : '0'}}>
                        <form onSubmit={handleRegister} className='box' style={{backgroundColor: '#000', border: '2px solid #fff'}}>
                            <div className="has-text-centered mb-4">
                                <h1 className="title" style={{color: '#fff'}}>Register</h1>
                            </div>
                            <div className="field mt-5">
                                <label className="label" style={{color: '#fff'}}>Name</label>
                                <div className="controls">
                                    <input 
                                        type="text" 
                                        className="input" 
                                        placeholder='name'
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        style={{backgroundColor: '#fff', color: '#000', border: '1px solid #000'}}
                                    />
                                </div>
                            </div>

                            <div className="field mt-5">
                                <label className="label" style={{color: '#fff'}}>Email</label>
                                <div className="controls">
                                    <input 
                                        type="email" 
                                        className="input" 
                                        placeholder='email'
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{backgroundColor: '#fff', color: '#000', border: '1px solid #000'}}
                                    />
                                </div>
                            </div>

                            <div className="field mt-5">
                                <label className="label" style={{color: '#fff'}}>Alamat</label>
                                <div className="controls">
                                    <input 
                                        type="text" 
                                        className="input" 
                                        placeholder='alamat'
                                        value={alamat} 
                                        onChange={(e) => setAlamat(e.target.value)}
                                        required
                                        style={{backgroundColor: '#fff', color: '#000', border: '1px solid #000'}}
                                    />
                                </div>
                            </div>

                            <div className="field mt-5">
                                <label className="label" style={{color: '#fff'}}>Password</label>
                                <div className="controls">
                                    <input 
                                        type="password" 
                                        className="input" 
                                        placeholder='******'
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{backgroundColor: '#fff', color: '#000', border: '1px solid #000'}}
                                    />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <button type="submit" className="button is-fullwidth" style={{backgroundColor: '#fff', color: '#000', border: '2px solid #000'}}>Register</button>
                            </div>
                            <div className="has-text-centered mt-4">
                                <p style={{color: '#fff'}}>
                                    Already have an account?{' '}
                                    <a href="/login" style={{color: '#fff', textDecoration: 'underline'}}>
                                        Login
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register