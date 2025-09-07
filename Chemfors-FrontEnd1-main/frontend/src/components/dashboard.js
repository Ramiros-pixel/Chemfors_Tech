import React from 'react'
import backgroundVideo from '../media/background.mp4'

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <video 
        autoPlay 
        muted 
        loop 
        className='background-video'
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className='content-overlay'>
        <div className='container' style={{marginTop: '80px', paddingTop: window.innerWidth < 768 ? '4rem' : '2rem', padding: window.innerWidth < 768 ? '1rem' : '2rem'}}>
          <div className="columns is-mobile">
            <div className="column is-full-mobile is-6-desktop">
              <div className="has-text-left">
                <h1 className="title has-text-white" style={{
                  fontFamily: 'Aileron Heavy, Arial, sans-serif', 
                  fontSize: window.innerWidth < 768 ? '2.5rem' : '4rem', 
                  marginBottom: window.innerWidth < 768 ? '2rem' : '3rem',
                  lineHeight: '1.2'
                }}>Welcome to ChemFors</h1>
                <p className="subtitle has-text-white" style={{
                  fontSize: window.innerWidth < 768 ? '1.2rem' : '1.5rem', 
                  fontWeight: 'normal', 
                  marginBottom: '1rem'
                }}>Solution data for your industry</p>
                <p className="has-text-white" style={{
                  fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem', 
                  fontWeight: 'normal',
                  marginTop: window.innerWidth < 768 ? '2rem' : '0'
                }}>ChemFor is a web-based platform that helps industries improve energy efficiency through enthalpy-based thermodynamic calculations. With its simple and accurate tools, ChemFor makes complex energy analysis easier, enabling smarter decisions, cost savings, and sustainable operations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .dashboard-container {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .dashboard-container {
            height: 100vh;
          }
          .content-overlay .container {
            padding: 1rem !important;
          }
          .title {
            font-size: 2.5rem !important;
            text-align: left !important;
            line-height: 1.2 !important;
          }
          .subtitle {
            font-size: 1.2rem !important;
            text-align: left !important;
          }
          .columns {
            margin: 0 !important;
          }
          .column {
            padding: 0.5rem !important;
          }
        }
        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }
        .content-overlay {
          position: relative;
          z-index: 1;
          height: 100%;
          background: rgba(0, 0, 5, 0.6);
        }
      `}</style>
    </div>
  )
}

export default Dashboard
