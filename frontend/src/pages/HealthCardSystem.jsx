import React, { useState, useEffect } from 'react';
import { 
  Heart, UserPlus, Search, BarChart3, Shield, Calendar, 
  Activity, Award, FileText, PlusCircle, AlertTriangle, ArrowLeft 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './HealthCardSystem.css';

const HealthCardSystem = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [regData, setRegData] = useState({
    name: '', dob: '', gender: 'Male', bloodGroup: 'A+',
    phone: '', email: '', emergencyContactName: '', emergencyContactPhone: '',
    allergies: '', chronicDiseases: '', medications: ''
  });
  const [searchId, setSearchId] = useState('');
  const [activeCard, setActiveCard] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  
  // Doctor form state
  const [doctorForm, setDoctorForm] = useState({
    doctorName: '', hospitalName: '', diagnosis: '', prescription: '', notes: ''
  });

  // Global system stats
  const [stats, setStats] = useState({
    totalCards: 0,
    bloodGroupStats: {},
    genderStats: { Male: 0, Female: 0, Other: 0 },
    recentPatients: []
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, text: '' });
  const [docFeedback, setDocFeedback] = useState({ type: null, text: '' });

  // Fetch Stats on load
  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health-cards/stats/summary');
      if (response.ok) {
        const json = await response.json();
        setStats(json.data);
      }
    } catch (err) {
      console.error('Failed to load database stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Handle registration
  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: null, text: '' });
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/health-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData)
      });
      const data = await response.json();

      if (response.ok) {
        setFeedback({ type: 'success', text: `Health card created successfully! Card ID: ${data.data.id}` });
        setActiveCard(data.data);
        setMedicalRecords([]); // New card has no records
        setActiveTab('viewcard');
        fetchStats(); // refresh statistics
        // Reset form
        setRegData({
          name: '', dob: '', gender: 'Male', bloodGroup: 'A+',
          phone: '', email: '', emergencyContactName: '', emergencyContactPhone: '',
          allergies: '', chronicDiseases: '', medications: ''
        });
      } else {
        setFeedback({ type: 'error', text: data.error || 'Registration failed' });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Error connecting to backend database.' });
    } finally {
      setLoading(false);
    }
  };

  // Search card
  const handleSearchCard = async (e, directId = null) => {
    if (e) e.preventDefault();
    const queryId = directId || searchId;
    if (!queryId) return;

    setFeedback({ type: null, text: '' });
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/health-cards/${queryId}`);
      const data = await response.json();

      if (response.ok) {
        setActiveCard(data.data);
        // Load medical history records
        const recResponse = await fetch(`http://localhost:5000/api/health-cards/${queryId}/records`);
        const recData = await recResponse.json();
        setMedicalRecords(recData.data || []);
        
        if (directId) {
          // If searching from stats, set tab to view
          setActiveTab('viewcard');
        }
      } else {
        setFeedback({ type: 'error', text: data.error || 'Health card not found' });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Error querying records from backend.' });
    } finally {
      setLoading(false);
    }
  };

  // Add consult records from Doctor Portal
  const handleDocSubmit = async (e) => {
    e.preventDefault();
    setDocFeedback({ type: null, text: '' });
    
    if (!activeCard) {
      setDocFeedback({ type: 'error', text: 'Please search and select a patient first.' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/health-cards/${activeCard.id}/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorForm)
      });
      const data = await response.json();

      if (response.ok) {
        setDocFeedback({ type: 'success', text: 'Prescription/Consultation log appended!' });
        setMedicalRecords(prev => [data.data, ...prev]);
        setDoctorForm({ doctorName: '', hospitalName: '', diagnosis: '', prescription: '', notes: '' });
      } else {
        setDocFeedback({ type: 'error', text: data.error || 'Failed to add log.' });
      }
    } catch (err) {
      console.error(err);
      setDocFeedback({ type: 'error', text: 'Failed to post prescription to server.' });
    } finally {
      setLoading(false);
    }
  };

  // Calculate age from date of birth
  const getAge = (dobString) => {
    if (!dobString) return '';
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="health-page">
      <div className="health-hero">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to Portfolio</Link>
          <div className="health-title-row">
            <Activity className="health-icon" />
            <div>
              <h1>Centralized Health Card System</h1>
              <p>Secure, decentralized-style unified clinical record matching patient cards to live logs.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container main-content-layout">
        {/* Navigation Sidebar / Tabs */}
        <div className="health-sidebar">
          <button 
            className={`side-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            <UserPlus size={18} /> Generate New Card
          </button>
          <button 
            className={`side-tab-btn ${activeTab === 'viewcard' ? 'active' : ''}`}
            onClick={() => setActiveTab('viewcard')}
          >
            <Shield size={18} /> View Digital Card
          </button>
          <button 
            className={`side-tab-btn ${activeTab === 'doctor' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctor')}
          >
            <Search size={18} /> Doctor Consult Portal
          </button>
          <button 
            className={`side-tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <BarChart3 size={18} /> System Analytics
          </button>
        </div>

        {/* Action Area */}
        <div className="health-action-card glass-card">
          {feedback.text && (
            <div className={`feedback-alert ${feedback.type}`}>
              <span>{feedback.text}</span>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="tab-pane">
              <h2>Patient Registration</h2>
              <p className="pane-desc">Generate a secure Digital Health Card. An encrypted unique card ID will be created.</p>
              
              <form onSubmit={handleRegSubmit} className="register-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" name="name" value={regData.name} onChange={handleRegChange}
                      placeholder="Jane Doe" className="form-control" required 
                    />
                  </div>

                  <div className="form-grid-inner">
                    <div className="form-group">
                      <label className="form-label">Date of Birth *</label>
                      <input 
                        type="date" name="dob" value={regData.dob} onChange={handleRegChange}
                        className="form-control" required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender *</label>
                      <select name="gender" value={regData.gender} onChange={handleRegChange} className="form-control">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-inner">
                    <div className="form-group">
                      <label className="form-label">Blood Group *</label>
                      <select name="bloodGroup" value={regData.bloodGroup} onChange={handleRegChange} className="form-control">
                        <option>A+</option><option>A-</option>
                        <option>B+</option><option>B-</option>
                        <option>AB+</option><option>AB-</option>
                        <option>O+</option><option>O-</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input 
                        type="tel" name="phone" value={regData.phone} onChange={handleRegChange}
                        placeholder="9999988888" className="form-control" required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" name="email" value={regData.email} onChange={handleRegChange}
                      placeholder="jane@example.com" className="form-control" 
                    />
                  </div>

                  <div className="form-grid-inner">
                    <div className="form-group">
                      <label className="form-label">Emergency Contact Name *</label>
                      <input 
                        type="text" name="emergencyContactName" value={regData.emergencyContactName} onChange={handleRegChange}
                        placeholder="John Doe (Spouse)" className="form-control" required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Emergency Contact Phone *</label>
                      <input 
                        type="tel" name="emergencyContactPhone" value={regData.emergencyContactPhone} onChange={handleRegChange}
                        placeholder="9988776655" className="form-control" required 
                      />
                    </div>
                  </div>
                </div>

                <hr className="divider" />
                <h3>Medical Background (Encrypted Fields)</h3>
                
                <div className="form-group">
                  <label className="form-label">Allergies (Food, Meds, Environmental)</label>
                  <input 
                    type="text" name="allergies" value={regData.allergies} onChange={handleRegChange}
                    placeholder="e.g. Penicillin, Peanuts (or 'None')" className="form-control" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Chronic Illnesses / Diseases</label>
                  <input 
                    type="text" name="chronicDiseases" value={regData.chronicDiseases} onChange={handleRegChange}
                    placeholder="e.g. Asthma, Hypertension (or 'None')" className="form-control" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Current Medications</label>
                  <input 
                    type="text" name="medications" value={regData.medications} onChange={handleRegChange}
                    placeholder="e.g. Albuterol Inhaler (or 'None')" className="form-control" 
                  />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary justify-center">
                  {loading ? 'Creating...' : 'Register Patient & Issue Card'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'viewcard' && (
            <div className="tab-pane">
              <h2>Digital Card Wallet</h2>
              <p className="pane-desc">Search or preview the Patient card. Keep your card ID to show at clinical checkups.</p>

              <form onSubmit={handleSearchCard} className="search-bar-row">
                <input 
                  type="text" 
                  value={searchId} 
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Card ID (e.g. HC-2026-A1B2)" 
                  className="form-control search-input" 
                />
                <button type="submit" className="btn btn-primary"><Search size={16} /> Search</button>
              </form>

              {activeCard ? (
                <div className="card-viewer-layout">
                  {/* Digital Wallet Card */}
                  <div className="digital-wallet-card">
                    <div className="card-top-accent"></div>
                    <div className="card-watermark"><Activity /></div>
                    <div className="card-header-row">
                      <div>
                        <h3>HEALTH CARD</h3>
                        <p className="id-sub">ISSUED BY CLINIC NETWORK</p>
                      </div>
                      <span className="blood-badge">{activeCard.bloodGroup}</span>
                    </div>

                    <div className="card-name-row">
                      <div className="name-block">
                        <label>PATIENT NAME</label>
                        <div className="val">{activeCard.name}</div>
                      </div>
                      <div className="id-block">
                        <label>CARD IDENTIFIER</label>
                        <div className="val code-font">{activeCard.id}</div>
                      </div>
                    </div>

                    <div className="card-meta-row">
                      <div>
                        <label>AGE / GENDER</label>
                        <div className="val">{getAge(activeCard.dob)} yrs / {activeCard.gender}</div>
                      </div>
                      <div>
                        <label>EMERGENCY CONTACT</label>
                        <div className="val">{activeCard.emergencyContactPhone} ({activeCard.emergencyContactName})</div>
                      </div>
                    </div>

                    <div className="card-footer-row">
                      <div className="barcode-mock">
                        <svg className="barcode-svg" viewBox="0 0 100 40">
                          {/* simple mock QR code graphic / lines */}
                          <rect x="0" y="0" width="8" height="8" fill="white" />
                          <rect x="2" y="2" width="4" height="4" fill="black" />
                          <rect x="92" y="0" width="8" height="8" fill="white" />
                          <rect x="94" y="2" width="4" height="4" fill="black" />
                          <rect x="0" y="32" width="8" height="8" fill="white" />
                          <rect x="2" y="34" width="4" height="4" fill="black" />
                          
                          <rect x="15" y="5" width="20" height="2" fill="white" />
                          <rect x="40" y="5" width="10" height="2" fill="white" />
                          <rect x="20" y="12" width="40" height="2" fill="white" />
                          <rect x="70" y="12" width="15" height="2" fill="white" />
                          <rect x="15" y="20" width="25" height="2" fill="white" />
                          <rect x="45" y="20" width="30" height="2" fill="white" />
                          <rect x="10" y="28" width="50" height="2" fill="white" />
                          
                          <rect x="40" y="32" width="4" height="4" fill="white" />
                          <rect x="52" y="34" width="4" height="4" fill="white" />
                          <rect x="68" y="32" width="4" height="4" fill="white" />
                        </svg>
                        <span>SCAN MEDICAL DETAILS</span>
                      </div>
                      <Heart className="footer-heart" />
                    </div>
                  </div>

                  <div className="card-extra-details">
                    <div className="detail-group">
                      <h4>Allergy Logs</h4>
                      <p className="danger-text"><AlertTriangle size={14} /> {activeCard.allergies}</p>
                    </div>
                    <div className="detail-group">
                      <h4>Chronic Diagnoses</h4>
                      <p>{activeCard.chronicDiseases}</p>
                    </div>
                    <div className="detail-group">
                      <h4>Regular Medications</h4>
                      <p>{activeCard.medications}</p>
                    </div>
                    <button onClick={() => window.print()} className="btn btn-secondary"><FileText size={16} /> Print/Save Card</button>
                  </div>
                </div>
              ) : (
                <div className="empty-prompt">
                  <Heart className="heart-pulse-icon" />
                  <p>No active card selected. Enter a card ID or register above to view patient details.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'doctor' && (
            <div className="tab-pane">
              <h2>Doctor Consultation Portal</h2>
              <p className="pane-desc">Doctors search card IDs to view clinical histories and append new checkup logs.</p>

              <form onSubmit={handleSearchCard} className="search-bar-row">
                <input 
                  type="text" 
                  value={searchId} 
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Card ID (e.g. HC-2026-C8B9)" 
                  className="form-control search-input" 
                />
                <button type="submit" className="btn btn-primary"><Search size={16} /> Retrieve Card</button>
              </form>

              {activeCard ? (
                <div className="doctor-workspace">
                  <div className="patient-banner">
                    <div>
                      <h3>Patient: {activeCard.name}</h3>
                      <p>ID: {activeCard.id} | Age: {getAge(activeCard.dob)} | Blood Group: {activeCard.bloodGroup}</p>
                    </div>
                    <span className="allergy-flag">Allergies: {activeCard.allergies}</span>
                  </div>

                  <div className="doctor-forms-grid">
                    {/* Add prescription */}
                    <div className="form-column">
                      <h4>Append Diagnostic Visit</h4>
                      {docFeedback.text && (
                        <div className={`feedback-alert ${docFeedback.type}`}>
                          <span>{docFeedback.text}</span>
                        </div>
                      )}
                      
                      <form onSubmit={handleDocSubmit} className="doctor-visit-form">
                        <div className="form-group">
                          <label className="form-label">Doctor Name</label>
                          <input 
                            type="text" 
                            value={doctorForm.doctorName}
                            onChange={(e) => setDoctorForm({...doctorForm, doctorName: e.target.value})}
                            placeholder="Dr. Sarthak Gite" 
                            className="form-control" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Hospital/Clinic Name</label>
                          <input 
                            type="text" 
                            value={doctorForm.hospitalName}
                            onChange={(e) => setDoctorForm({...doctorForm, hospitalName: e.target.value})}
                            placeholder="SPPU Medical Hub" 
                            className="form-control" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Diagnosis / Assessment *</label>
                          <input 
                            type="text" 
                            value={doctorForm.diagnosis}
                            onChange={(e) => setDoctorForm({...doctorForm, diagnosis: e.target.value})}
                            placeholder="Acute Bronchitis" 
                            className="form-control" 
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Prescription (Meds & Dosage) *</label>
                          <textarea 
                            value={doctorForm.prescription}
                            onChange={(e) => setDoctorForm({...doctorForm, prescription: e.target.value})}
                            placeholder="1. Amoxicillin 500mg - 3x daily (5 days)&#10;2. Cough Syrup - 10ml night" 
                            className="form-control text-area" 
                            required
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Clinical Notes</label>
                          <input 
                            type="text" 
                            value={doctorForm.notes}
                            onChange={(e) => setDoctorForm({...doctorForm, notes: e.target.value})}
                            placeholder="Follow up in 7 days if symptoms persist" 
                            className="form-control" 
                          />
                        </div>
                        <button type="submit" className="btn btn-accent"><PlusCircle size={16} /> Append Visit Log</button>
                      </form>
                    </div>

                    {/* Historical logs */}
                    <div className="history-column">
                      <h4>Consultation History ({medicalRecords.length})</h4>
                      <div className="records-scroll-area">
                        {medicalRecords.length > 0 ? (
                          medicalRecords.map((rec, idx) => (
                            <div key={idx} className="record-log-item">
                              <div className="log-header">
                                <span className="doc-name">{rec.doctorName}</span>
                                <span className="log-date"><Calendar size={12} /> {new Date(rec.timestamp).toLocaleDateString()}</span>
                              </div>
                              <p className="log-hosp">{rec.hospitalName}</p>
                              <div className="log-field">
                                <label>Diagnosis:</label>
                                <span>{rec.diagnosis}</span>
                              </div>
                              <div className="log-field">
                                <label>Prescription:</label>
                                <pre className="presc-pre">{rec.prescription}</pre>
                              </div>
                              {rec.notes && (
                                <div className="log-notes">
                                  <strong>Notes:</strong> {rec.notes}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="empty-prompt small">
                            <FileText size={24} />
                            <p>No historical visit logs found for this patient.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-prompt">
                  <Search className="search-pulse-icon" />
                  <p>Retrieve patient file first to review diagnostics history and issue prescriptions.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="tab-pane">
              <h2>Clinical Register Analytics</h2>
              <p className="pane-desc">Consolidated real-time stats of cards registered and clinic distributions.</p>

              <div className="stats-cards-row">
                <div className="anal-card">
                  <h3>Total Registrations</h3>
                  <div className="num">{stats.totalCards}</div>
                  <p>Digital wallets active</p>
                </div>

                <div className="anal-card">
                  <h3>Genders Group</h3>
                  <div className="gender-split">
                    <div><span>Male:</span> <strong>{stats.genderStats?.Male || 0}</strong></div>
                    <div><span>Female:</span> <strong>{stats.genderStats?.Female || 0}</strong></div>
                    <div><span>Other:</span> <strong>{stats.genderStats?.Other || 0}</strong></div>
                  </div>
                </div>
              </div>

              <div className="analytics-details-layout">
                {/* Blood Distribution */}
                <div className="detail-box">
                  <h4>Blood Types Active</h4>
                  <div className="blood-bar-chart">
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => {
                      const count = stats.bloodGroupStats[bg] || 0;
                      const max = Math.max(...Object.values(stats.bloodGroupStats), 1);
                      const percent = (count / max) * 100;
                      return (
                        <div key={bg} className="bar-row">
                          <span className="bar-label">{bg}</span>
                          <div className="bar-container">
                            <div className="bar-fill" style={{ width: `${percent}%` }}></div>
                          </div>
                          <span className="bar-val">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Patients */}
                <div className="detail-box">
                  <h4>Recently Generated Cards</h4>
                  <div className="recent-list">
                    {stats.recentPatients?.length > 0 ? (
                      stats.recentPatients.map((pat, pIdx) => (
                        <div key={pIdx} className="recent-patient-item" onClick={() => handleSearchCard(null, pat.id)}>
                          <div>
                            <strong>{pat.name}</strong>
                            <p className="code-font">{pat.id} | {pat.bloodGroup}</p>
                          </div>
                          <button className="btn btn-secondary btn-small">Load</button>
                        </div>
                      ))
                    ) : (
                      <p className="no-rec-p">No patients registered in the database.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthCardSystem;
