import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.email || !formData.password) {
    setError('Please enter email and password');
    return;
  }

  setError('');

  try {
    const { loginUser } = await import('../services/api');
    const result = await loginUser(formData.email, formData.password, role);

    if (result.success) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      if (role === 'student') navigate('/student');
      else if (role === 'faculty') navigate('/faculty');
      else navigate('/admin');
    } else {
      setError(result.message || 'Invalid credentials');
    }
  } catch (err) {
    setError('Cannot connect to server. Make sure backend is running!');
  }
};

  return (
    <div style={styles.page}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.brandTag}>● IIAE</div>
        <h1 style={styles.heroTitle}>
          Intelligent<br />
          <span style={styles.highlight}>Institutional</span><br />
          Analytics Engine
        </h1>
        <p style={styles.heroSub}>
          A unified platform for universities to track, analyze,
          and act on academic performance data — for UG & PG alike.
        </p>
        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <span style={styles.statNum}>5000+</span>
            <span style={styles.statLabel}>Students</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <span style={styles.statNum}>150+</span>
            <span style={styles.statLabel}>Faculty</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <span style={styles.statNum}>20+</span>
            <span style={styles.statLabel}>Departments</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Welcome Back</h2>
          <p style={styles.cardSub}>Sign in to your dashboard</p>

          {/* Role Tabs */}
          <div style={styles.roleTabs}>
            {[
              { id: 'student', icon: '🎓', label: 'Student' },
              { id: 'faculty', icon: '🏫', label: 'Faculty' },
              { id: 'admin',   icon: '🛡️', label: 'Admin'   },
            ].map((r) => (
              <button
                key={r.id}
                style={{ ...styles.roleTab, ...(role === r.id ? styles.roleTabActive : {}) }}
                onClick={() => setRole(r.id)}
              >
                {r.icon} {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@university.edu"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                onFocus={e => e.target.style.borderColor = '#63b3ed'}
                onBlur={e => e.target.style.borderColor = 'rgba(99,179,237,0.15)'}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                onFocus={e => e.target.style.borderColor = '#63b3ed'}
                onBlur={e => e.target.style.borderColor = 'rgba(99,179,237,0.15)'}
              />
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button
              type="submit"
              style={{
                ...styles.submitBtn,
                background:
                  role === 'admin'
                    ? 'linear-gradient(135deg, #9a75ea, #63b3ed)'
                    : role === 'faculty'
                    ? 'linear-gradient(135deg, #f6ad55, #fc8181)'
                    : 'linear-gradient(135deg, #63b3ed, #9a75ea)',
              }}
              onMouseEnter={e => e.target.style.opacity = '0.9'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>

          <p style={styles.footer}>University of Excellence · Academic Portal</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'grid',
    gridTemplateColumns: '1fr 480px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a2236 0%, #1e2d45 100%)',
  },
  leftPanel: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '60px 80px',
    borderRight: '1px solid rgba(99,179,237,0.1)',
  },
  brandTag: {
    display: 'inline-block', fontSize: '11px', fontWeight: '600',
    letterSpacing: '0.2em', textTransform: 'uppercase', color: '#63b3ed',
    marginBottom: '40px', padding: '6px 14px',
    border: '1px solid rgba(99,179,237,0.2)', borderRadius: '20px',
    background: 'rgba(99,179,237,0.05)', width: 'fit-content',
  },
  heroTitle: {
    fontSize: '52px', fontWeight: '800', lineHeight: '1.1',
    letterSpacing: '-0.02em', marginBottom: '24px', color: '#e8edf5',
  },
  highlight: {
    background: 'linear-gradient(135deg, #63b3ed, #9a75ea)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    fontSize: '16px', lineHeight: '1.7', color: '#7a8aaa',
    maxWidth: '420px', marginBottom: '56px',
  },
  statsRow: { display: 'flex', gap: '40px', alignItems: 'center' },
  stat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  statNum: { fontSize: '28px', fontWeight: '700', color: '#e8edf5' },
  statLabel: { fontSize: '12px', color: '#7a8aaa', textTransform: 'uppercase', letterSpacing: '0.05em' },
  statDivider: { width: '1px', height: '40px', background: 'rgba(99,179,237,0.15)' },
  rightPanel: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '60px 48px',
  },
  card: { width: '100%', maxWidth: '360px' },
  cardTitle: {
    fontSize: '26px', fontWeight: '700', marginBottom: '8px',
    letterSpacing: '-0.01em', color: '#e8edf5',
  },
  cardSub: { fontSize: '14px', color: '#7a8aaa', marginBottom: '32px' },
  roleTabs: {
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px',
    background: '#0d1220', borderRadius: '12px', padding: '6px',
    border: '1px solid rgba(99,179,237,0.1)', marginBottom: '28px',
  },
  roleTab: {
    padding: '10px 6px', border: '1px solid transparent', borderRadius: '8px',
    fontSize: '12px', fontWeight: '500', cursor: 'pointer',
    background: 'transparent', color: '#7a8aaa', transition: 'all 0.25s',
  },
  roleTabActive: {
    background: 'rgba(99,179,237,0.1)', color: '#63b3ed',
    border: '1px solid rgba(99,179,237,0.25)',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '13px', color: '#7a8aaa', fontWeight: '500' },
  input: {
    padding: '12px 16px', background: '#0d1220',
    border: '1px solid rgba(99,179,237,0.15)', borderRadius: '10px',
    color: '#e8edf5', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s',
  },
  error: { color: '#fc8181', fontSize: '13px' },
  submitBtn: {
    marginTop: '8px', padding: '13px',
    border: 'none', borderRadius: '10px', color: '#fff',
    fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'opacity 0.2s',
  },
  footer: { textAlign: 'center', fontSize: '12px', color: '#7a8aaa', marginTop: '24px' },
};

export default Login;