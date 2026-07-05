import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Shield, Calendar, Terminal, RefreshCw, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sysStats, setSysStats] = useState({
    totalMessages: 0,
    serverStatus: 'checking',
    lastUpdated: '-'
  });

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`);
      if (response.ok) {
        const json = await response.json();
        setMessages(json.data || []);
        setSysStats(prev => ({
          ...prev,
          totalMessages: json.data?.length || 0,
          serverStatus: 'Online',
          lastUpdated: new Date().toLocaleTimeString()
        }));
      } else {
        setError('Server responded with an error when fetching messages.');
        setSysStats(prev => ({ ...prev, serverStatus: 'Error' }));
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to the Express server API. Make sure the backend is running.');
      setSysStats(prev => ({ ...prev, serverStatus: 'Offline' }));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
        setSysStats(prev => ({ ...prev, totalMessages: prev.totalMessages - 1 }));
      } else {
        alert('Failed to delete message.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error when deleting message.');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-hero">
        <div className="container">
          <Link to="/" className="back-link">&larr; Back to Portfolio</Link>
          <div className="admin-title-row">
            <Shield className="admin-icon" />
            <div>
              <h1>Portfolio Administration</h1>
              <p>System dashboards monitoring message mailboxes and active server configurations.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container admin-grid-layout">
        {/* Status board */}
        <div className="admin-status-board">
          <div className="status-item glass-card">
            <h3>Server API Node</h3>
            <div className={`status-badge ${sysStats.serverStatus.toLowerCase()}`}>
              {sysStats.serverStatus}
            </div>
            <p>Port: 5000</p>
          </div>

          <div className="status-item glass-card">
            <h3>Inbox Volume</h3>
            <div className="stat-number">{sysStats.totalMessages}</div>
            <p>Messages saved</p>
          </div>

          <div className="status-item glass-card refresh-card" onClick={fetchMessages}>
            <RefreshCw size={24} className={loading ? 'spin' : ''} />
            <h4>Refresh Data</h4>
            <p>Last checked: {sysStats.lastUpdated}</p>
          </div>
        </div>

        {/* Message logs */}
        <div className="admin-logs-card glass-card">
          <div className="logs-header">
            <h2>Feedback Mailbox Inbox</h2>
            <button onClick={fetchMessages} className="btn btn-secondary btn-small">
              <RefreshCw size={12} /> Sync
            </button>
          </div>

          {error && (
            <div className="error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <RefreshCw className="spin" size={32} />
              <p>Fetching database messages...</p>
            </div>
          ) : messages.length > 0 ? (
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className="message-item-card">
                  <div className="msg-header">
                    <div>
                      <span className="msg-email">{msg.email}</span>
                      {msg.phone && <span className="msg-phone"> | Phone: {msg.phone}</span>}
                    </div>
                    <button onClick={() => handleDelete(msg.id)} className="delete-btn" title="Delete Message">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="msg-subject">
                    <strong>Subject:</strong> {msg.subject}
                  </div>
                  <p className="msg-body">{msg.message}</p>
                  <div className="msg-footer">
                    <span className="msg-date"><Calendar size={12} /> {new Date(msg.timestamp).toLocaleString()}</span>
                    <span className="msg-id"><Terminal size={12} /> ID: {msg.id}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-inbox">
              <Mail size={48} />
              <p>No feedback messages exist in the database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
