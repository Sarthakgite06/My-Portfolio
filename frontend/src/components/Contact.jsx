import React, { useState } from 'react';
import { Send, Phone, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, text: '' });

  const validate = () => {
    if (!formData.email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Email format is invalid';
    if (!formData.subject) return 'Subject is required';
    if (formData.subject.length > 100) return 'Subject must be under 100 characters';
    if (!formData.message) return 'Message is required';
    if (formData.message.length < 10) return 'Message must be at least 10 characters';
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, text: '' });

    const err = validate();
    if (err) {
      setStatus({ type: 'error', text: err });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resJson = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', text: 'Thank you! Your message has been saved in the system.' });
        setFormData({ email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', text: resJson.error || 'Failed to submit message.' });
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      setStatus({ type: 'error', text: 'Could not connect to the backend server. Using mailto fallback...' });
      
      // Fallback to mailto link if backend is down
      const mailto = `mailto:sarthakgite006@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
      setTimeout(() => {
        window.location.href = mailto;
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="info-title">Let's Connect</h3>
            <p className="info-desc">
              Have a project in mind, an opportunity, or just want to chat about AI and Data Science? Feel free to drop a message or contact me directly.
            </p>

            <div className="info-cards">
              <div className="info-item glass-card">
                <Mail className="info-icon" />
                <div>
                  <h4>Email Me</h4>
                  <a href="mailto:sarthakgite006@gmail.com">sarthakgite006@gmail.com</a>
                </div>
              </div>
              <div className="info-item glass-card">
                <Phone className="info-icon" />
                <div>
                  <h4>Call Me</h4>
                  <a href="tel:9130383513">+91 9130383513</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper glass-card">
            <form onSubmit={handleSubmit} className="contact-form">
              {status.text && (
                <div className={`status-banner ${status.type}`}>
                  {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                  <span>{status.text}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="name@example.com" 
                  className="form-control"
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Mobile Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="+91 XXXXXXXXXX" 
                  className="form-control" 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject *</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject} 
                  onChange={handleInputChange} 
                  placeholder="Consultation Proposal" 
                  className="form-control"
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message} 
                  onChange={handleInputChange} 
                  placeholder="Write your message here..." 
                  className="form-control text-area"
                  required
                ></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary full-width justify-center">
                {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
