import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../auth'

const History = () => {
  const [hasilHitung, setHasilHitung] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await axios.get('https://web-production-939b.up.railway.app/hasil_hitung', {
            withCredentials: false,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = response.data.data || [];
          const sortedData = data.sort((a, b) => a.id - b.id);
          setHasilHitung(sortedData);
        } catch (error) {
          console.log('Error:', error);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const maxEfficiency = Math.max(...hasilHitung.map(item => item.efisiensi_persen), 0);
  const minEfficiency = Math.min(...hasilHitung.map(item => item.efisiensi_persen), 0);

  return (
    <div className='history-container' style={{marginTop: '80px', padding: '1rem', backgroundColor: '#000', minHeight: '100vh'}}>
      <div style={{maxWidth: '100%', margin: '0 auto'}}>
        <h1 className='title' style={{color: '#fff'}}>Efficiency History</h1>
        
        {loading ? (
          <p style={{color: '#fff'}}>Loading...</p>
        ) : (
          <>
          <div style={{position: 'relative', height: window.innerWidth < 768 ? '300px' : '350px', width: '100%', backgroundColor: '#000', padding: window.innerWidth < 768 ? '15px' : '20px'}}>
              <svg width="100%" height="100%" viewBox={window.innerWidth < 768 ? "0 0 380 240" : "0 0 700 280"} preserveAspectRatio="xMidYMid meet">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line 
                    key={`grid-${i}`}
                    x1={window.innerWidth < 768 ? "60" : "80"} 
                    y1={window.innerWidth < 768 ? 40 + (i * 35) : 40 + (i * 40)} 
                    x2={window.innerWidth < 768 ? "320" : "620"} 
                    y2={window.innerWidth < 768 ? 40 + (i * 35) : 40 + (i * 40)} 
                    stroke="#444" 
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                ))}
                
                {/* Y-axis labels */}
                {[0, 1, 2, 3, 4].map(i => {
                  const value = maxEfficiency - (i * (maxEfficiency - minEfficiency) / 4);
                  return (
                    <text 
                      key={`y-label-${i}`}
                      x={window.innerWidth < 768 ? "45" : "75"} 
                      y={window.innerWidth < 768 ? 35 + (i * 30) : 45 + (i * 40)} 
                      textAnchor="end" 
                      fontSize={window.innerWidth < 768 ? "9" : "11"} 
                      fill="#fff"
                      fontFamily="Arial, sans-serif"
                    >
                      {value.toFixed(1)}%
                    </text>
                  );
                })}
                
                {/* X-axis labels */}
                {hasilHitung.map((item, index) => {
                  const x = window.innerWidth < 768 ? 60 + (index * 280 / Math.max(hasilHitung.length - 1, 1)) : 90 + (index * 520 / Math.max(hasilHitung.length - 1, 1));
                  return (
                    <text 
                      key={`x-label-${index}`}
                      x={x}
                      y={window.innerWidth < 768 ? 175 : 215}
                      textAnchor="middle" 
                      fontSize={window.innerWidth < 768 ? "8" : "10"} 
                      fill="#fff"
                      fontFamily="Arial, sans-serif"
                    >
                      {item.id}
                    </text>
                  );
                })}
                
                {/* Line chart */}
                {hasilHitung.length > 1 && (
                  <polyline
                    points={hasilHitung.map((item, index) => {
                      const x = window.innerWidth < 768 ? 60 + (index * 280 / Math.max(hasilHitung.length - 1, 1)) : 90 + (index * 520 / Math.max(hasilHitung.length - 1, 1));
                      const normalizedY = ((item.efisiensi_persen - minEfficiency) / (maxEfficiency - minEfficiency)) || 0;
                      const y = window.innerWidth < 768 ? 150 - (normalizedY * 120) : 200 - (normalizedY * 160);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={window.innerWidth < 768 ? "2" : "3"}
                  />
                )}
                
                {/* Data points */}
                {hasilHitung.map((item, index) => {
                  const x = window.innerWidth < 768 ? 60 + (index * 280 / Math.max(hasilHitung.length - 1, 1)) : 90 + (index * 520 / Math.max(hasilHitung.length - 1, 1));
                  const normalizedY = ((item.efisiensi_persen - minEfficiency) / (maxEfficiency - minEfficiency)) || 0;
                  const y = window.innerWidth < 768 ? 150 - (normalizedY * 120) : 200 - (normalizedY * 160);
                  
                  return (
                    <g key={`point-${index}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r={window.innerWidth < 768 ? "3" : "4"}
                        fill="#fff"
                        stroke="#000"
                        strokeWidth={window.innerWidth < 768 ? "1" : "2"}
                      />
                      <text
                        x={x}
                        y={y - (window.innerWidth < 768 ? 6 : 8)}
                        textAnchor="middle"
                        fontSize={window.innerWidth < 768 ? "8" : "7"}
                        fill="#fff"
                        fontFamily="Arial, sans-serif"
                        fontWeight="bold"
                      >
                        {item.efisiensi_persen.toFixed(1)}%
                      </text>
                    </g>
                  );
                })}
                
                {/* Axes */}
                <line x1={window.innerWidth < 768 ? "50" : "80"} y1={window.innerWidth < 768 ? "30" : "40"} x2={window.innerWidth < 768 ? "50" : "80"} y2={window.innerWidth < 768 ? "150" : "200"} stroke="#fff" strokeWidth="2"/>
                <line x1={window.innerWidth < 768 ? "50" : "80"} y1={window.innerWidth < 768 ? "150" : "200"} x2={window.innerWidth < 768 ? "350" : "620"} y2={window.innerWidth < 768 ? "150" : "200"} stroke="#fff" strokeWidth="2"/>
                
                {/* Axis labels */}
                <text x={window.innerWidth < 768 ? "25" : "40"} y={window.innerWidth < 768 ? "90" : "120"} textAnchor="middle" fontSize={window.innerWidth < 768 ? "10" : "13"} fill="#fff" fontFamily="Arial, sans-serif" fontWeight="bold" transform={window.innerWidth < 768 ? "rotate(-90, 25, 90)" : "rotate(-90, 40, 120)"}>
                  Efisiensi (%)
                </text>
                <text x={window.innerWidth < 768 ? "190" : "350"} y={window.innerWidth < 768 ? "220" : "240"} textAnchor="middle" fontSize={window.innerWidth < 768 ? "11" : "13"} fill="#fff" fontFamily="Arial, sans-serif" fontWeight="bold">
                  Data ID
                </text>
              </svg>
          </div>
          
          <div className='mt-4'>
            <p style={{color: '#fff'}}>
              <strong>Total Data:</strong> {hasilHitung.length} | 
              <strong> Efisiensi Tertinggi:</strong> {maxEfficiency.toFixed(2)}% | 
              <strong> Efisiensi Terendah:</strong> {minEfficiency.toFixed(2)}%
            </p>
          </div>
          </>
        )}
      </div>
    </div>
  )
}

export default History