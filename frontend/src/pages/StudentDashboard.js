import React, { useState } from 'react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const student = {
    name: 'Hema S',
    regNo: '21CS045',
    degree: 'B.Tech CSE',
    semester: '6th Semester',
    cgpa: 8.7,
    attendance: 82,
  };

  const subjects = [
    { name: 'Machine Learning', code: 'CS601', marks: 88, max: 100, attendance: 85 },
    { name: 'Full Stack Dev', code: 'CS602', marks: 92, max: 100, attendance: 90 },
    { name: 'Computer Networks', code: 'CS603', marks: 74, max: 100, attendance: 78 },
    { name: 'Cloud Computing', code: 'CS604', marks: 81, max: 100, attendance: 88 },
    { name: 'Data Analytics', code: 'CS605', marks: 95, max: 100, attendance: 92 },
  ];

  const arrears = [
    { code: 'CS401', name: 'Operating Systems', semester: '4th Sem', attempts: 2, status: 'Cleared', clearedOn: 'Nov 2023' },
    { code: 'CS302', name: 'Digital Electronics', semester: '3rd Sem', attempts: 1, status: 'Cleared', clearedOn: 'Apr 2023' },
    { code: 'MA201', name: 'Engineering Maths II', semester: '2nd Sem', attempts: 3, status: 'Pending', clearedOn: '-' },
  ];

  const placements = [
    { company: 'TCS', role: 'Software Engineer', date: 'Jan 2024', status: 'Offer', package: '7 LPA' },
    { company: 'Infosys', role: 'Systems Engineer', date: 'Feb 2024', status: 'Shortlisted', package: '6.5 LPA' },
    { company: 'Wipro', role: 'Project Engineer', date: 'Dec 2023', status: 'Rejected', package: '-' },
    { company: 'Zoho', role: 'Developer', date: 'Mar 2024', status: 'Applied', package: '-' },
  ];

  const getGrade = (marks) => {
    if (marks >= 90) return { grade: 'O', color: '#68d391' };
    if (marks >= 80) return { grade: 'A+', color: '#63b3ed' };
    if (marks >= 70) return { grade: 'A', color: '#9a75ea' };
    if (marks >= 60) return { grade: 'B+', color: '#f6ad55' };
    return { grade: 'B', color: '#fc8181' };
  };

  const getAttendanceColor = (pct) => {
    if (pct >= 85) return '#68d391';
    if (pct >= 75) return '#f6ad55';
    return '#fc8181';
  };

  const getPlacementColor = (status) => {
    if (status === 'Offer') return '#68d391';
    if (status === 'Shortlisted') return '#63b3ed';
    if (status === 'Applied') return '#f6ad55';
    return '#fc8181';
  };

  const totalArrears = arrears.length;
  const clearedArrears = arrears.filter(a => a.status === 'Cleared').length;
  const pendingArrears = arrears.filter(a => a.status === 'Pending').length;

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarBrand}>● IIAE</div>

        <div style={styles.sidebarProfile}>
          <div style={styles.avatar}>{student.name.charAt(0)}</div>
          <div>
            <div style={styles.profileName}>{student.name}</div>
            <div style={styles.profileReg}>{student.regNo}</div>
          </div>
        </div>

        <nav style={styles.nav}>
          {[
            { id: 'overview', icon: '⬡', label: 'Overview' },
            { id: 'subjects', icon: '📚', label: 'Subjects' },
            { id: 'attendance', icon: '📅', label: 'Attendance' },
            { id: 'results', icon: '📊', label: 'Results' },
            { id: 'arrears', icon: '⚠️', label: 'Arrears' },
            { id: 'placements', icon: '💼', label: 'Placements' },
          ].map((item) => (
            <button
              key={item.id}
              style={{ ...styles.navItem, ...(activeTab === item.id ? styles.navItemActive : {}) }}
              onClick={() => setActiveTab(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.id === 'arrears' && pendingArrears > 0 && (
                <span style={styles.badge}>{pendingArrears}</span>
              )}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <button style={styles.logoutBtn}>↩ Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Top Bar */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.pageTitle}>
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'subjects' && 'My Subjects'}
              {activeTab === 'attendance' && 'Attendance Tracker'}
              {activeTab === 'results' && 'Academic Results'}
              {activeTab === 'arrears' && 'Arrear Status'}
              {activeTab === 'placements' && 'Placement Tracker'}
            </h1>
            <p style={styles.pageSubtitle}>{student.degree} · {student.semester}</p>
          </div>
          <div style={styles.cgpaBadge}>
            <span style={styles.cgpaNum}>{student.cgpa}</span>
            <span style={styles.cgpaLabel}>CGPA</span>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div style={styles.statsGrid}>
              {[
                { label: 'CGPA', value: student.cgpa, icon: '🏆', color: '#63b3ed', sub: 'Out of 10' },
                { label: 'Attendance', value: `${student.attendance}%`, icon: '📅', color: '#68d391', sub: 'This semester' },
                { label: 'Arrears', value: pendingArrears, icon: '⚠️', color: pendingArrears > 0 ? '#fc8181' : '#68d391', sub: `${clearedArrears} cleared` },
                { label: 'Placements', value: placements.filter(p => p.status === 'Offer').length, icon: '💼', color: '#f6ad55', sub: 'Offers received' },
              ].map((card, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${card.color}` }}>
                  <div style={styles.statCardTop}>
                    <span style={styles.statCardIcon}>{card.icon}</span>
                    <span style={{ ...styles.statCardValue, color: card.color }}>{card.value}</span>
                  </div>
                  <div style={styles.statCardLabel}>{card.label}</div>
                  <div style={styles.statCardSub}>{card.sub}</div>
                </div>
              ))}
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Subject Performance</h2>
              <div style={styles.subjectList}>
                {subjects.map((sub, i) => {
                  const { grade, color } = getGrade(sub.marks);
                  return (
                    <div key={i} style={styles.subjectRow}>
                      <div style={styles.subjectInfo}>
                        <span style={styles.subjectCode}>{sub.code}</span>
                        <span style={styles.subjectName}>{sub.name}</span>
                      </div>
                      <div style={styles.progressBarWrap}>
                        <div style={styles.progressBarBg}>
                          <div style={{ ...styles.progressBarFill, width: `${sub.marks}%`, background: color }} />
                        </div>
                        <span style={styles.progressVal}>{sub.marks}%</span>
                      </div>
                      <div style={{ ...styles.gradeBadge, background: `${color}22`, color }}>{grade}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div style={styles.section}>
            <div style={styles.subjectCards}>
              {subjects.map((sub, i) => {
                const { grade, color } = getGrade(sub.marks);
                return (
                  <div key={i} style={{ ...styles.subjectCard, borderLeft: `4px solid ${color}` }}>
                    <div style={styles.subjectCardHeader}>
                      <span style={styles.subjectCardCode}>{sub.code}</span>
                      <span style={{ ...styles.gradeBadge, background: `${color}22`, color }}>{grade}</span>
                    </div>
                    <div style={styles.subjectCardName}>{sub.name}</div>
                    <div style={styles.subjectCardStats}>
                      <div>
                        <div style={styles.subjectCardStatVal}>{sub.marks}/{sub.max}</div>
                        <div style={styles.subjectCardStatLabel}>Marks</div>
                      </div>
                      <div>
                        <div style={{ ...styles.subjectCardStatVal, color: getAttendanceColor(sub.attendance) }}>
                          {sub.attendance}%
                        </div>
                        <div style={styles.subjectCardStatLabel}>Attendance</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Attendance Summary</h2>
            {subjects.map((sub, i) => (
              <div key={i} style={styles.attendanceRow}>
                <div style={styles.attendanceSubject}>{sub.name}</div>
                <div style={styles.attendanceBarWrap}>
                  <div style={styles.progressBarBg}>
                    <div style={{ ...styles.progressBarFill, width: `${sub.attendance}%`, background: getAttendanceColor(sub.attendance) }} />
                  </div>
                </div>
                <div style={{ ...styles.attendancePct, color: getAttendanceColor(sub.attendance) }}>{sub.attendance}%</div>
                <div style={{
                  ...styles.attendanceStatus,
                  background: sub.attendance >= 75 ? 'rgba(104,211,145,0.1)' : 'rgba(252,129,129,0.1)',
                  color: sub.attendance >= 75 ? '#68d391' : '#fc8181',
                }}>
                  {sub.attendance >= 75 ? '✓ Safe' : '⚠ Low'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Semester Results</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Code', 'Subject', 'Marks', 'Grade', 'Status'].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub, i) => {
                  const { grade, color } = getGrade(sub.marks);
                  return (
                    <tr key={i} style={styles.tr}>
                      <td style={styles.td}>{sub.code}</td>
                      <td style={styles.td}>{sub.name}</td>
                      <td style={styles.td}>{sub.marks}/{sub.max}</td>
                      <td style={styles.td}>
                        <span style={{ ...styles.gradeBadge, background: `${color}22`, color }}>{grade}</span>
                      </td>
                      <td style={styles.td}><span style={{ color: '#68d391', fontSize: '13px' }}>✓ Pass</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Arrears Tab */}
        {activeTab === 'arrears' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Arrears', value: totalArrears, color: '#f6ad55' },
                { label: 'Cleared', value: clearedArrears, color: '#68d391' },
                { label: 'Pending', value: pendingArrears, color: '#fc8181' },
              ].map((c, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${c.color}` }}>
                  <div style={{ ...styles.statCardValue, color: c.color, fontSize: '32px' }}>{c.value}</div>
                  <div style={styles.statCardLabel}>{c.label}</div>
                </div>
              ))}
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Arrear Details</h2>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Code', 'Subject', 'Semester', 'Attempts', 'Cleared On', 'Status'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {arrears.map((a, i) => (
                    <tr key={i} style={styles.tr}>
                      <td style={styles.td}>{a.code}</td>
                      <td style={styles.td}>{a.name}</td>
                      <td style={styles.td}>{a.semester}</td>
                      <td style={styles.td}>{a.attempts}</td>
                      <td style={styles.td}>{a.clearedOn}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.gradeBadge,
                          background: a.status === 'Cleared' ? 'rgba(104,211,145,0.1)' : 'rgba(252,129,129,0.1)',
                          color: a.status === 'Cleared' ? '#68d391' : '#fc8181',
                        }}>
                          {a.status === 'Cleared' ? '✓ Cleared' : '⚠ Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Placements Tab */}
        {activeTab === 'placements' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Applied', value: placements.length, color: '#63b3ed' },
                { label: 'Shortlisted', value: placements.filter(p => p.status === 'Shortlisted').length, color: '#9a75ea' },
                { label: 'Offers', value: placements.filter(p => p.status === 'Offer').length, color: '#68d391' },
                { label: 'Rejected', value: placements.filter(p => p.status === 'Rejected').length, color: '#fc8181' },
              ].map((c, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${c.color}` }}>
                  <div style={{ ...styles.statCardValue, color: c.color, fontSize: '32px' }}>{c.value}</div>
                  <div style={styles.statCardLabel}>{c.label}</div>
                </div>
              ))}
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Placement Applications</h2>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Company', 'Role', 'Date', 'Package', 'Status'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {placements.map((p, i) => {
                    const color = getPlacementColor(p.status);
                    return (
                      <tr key={i} style={styles.tr}>
                        <td style={{ ...styles.td, fontWeight: '600' }}>{p.company}</td>
                        <td style={styles.td}>{p.role}</td>
                        <td style={styles.td}>{p.date}</td>
                        <td style={{ ...styles.td, color: p.package !== '-' ? '#68d391' : '#7a8aaa' }}>{p.package}</td>
                        <td style={styles.td}>
                          <span style={{ ...styles.gradeBadge, background: `${color}22`, color }}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { display: 'flex', minHeight: '100vh', background: '#1a2236', color: '#e8edf5' },
  sidebar: {
    width: '240px', minHeight: '100vh', background: '#1e2d45',
    borderRight: '1px solid rgba(99,179,237,0.15)',
    display: 'flex', flexDirection: 'column', padding: '28px 16px',
    position: 'fixed', top: 0, left: 0,
  },
  sidebarBrand: {
    fontSize: '11px', fontWeight: '700', letterSpacing: '0.2em',
    color: '#63b3ed', textTransform: 'uppercase', marginBottom: '32px', paddingLeft: '8px',
  },
  sidebarProfile: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '16px 12px', background: 'rgba(99,179,237,0.07)',
    borderRadius: '12px', marginBottom: '32px',
    border: '1px solid rgba(99,179,237,0.12)',
  },
  avatar: {
    width: '40px', height: '40px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #63b3ed, #9a75ea)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '16px', fontWeight: '700', color: '#fff', flexShrink: 0,
  },
  profileName: { fontSize: '14px', fontWeight: '600', color: '#e8edf5' },
  profileReg: { fontSize: '12px', color: '#7a8aaa', marginTop: '2px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
  navItem: {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '11px 14px', borderRadius: '10px', border: 'none',
    background: 'transparent', color: '#7a8aaa', fontSize: '14px',
    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', position: 'relative',
  },
  navItemActive: { background: 'rgba(99,179,237,0.1)', color: '#63b3ed' },
  badge: {
    marginLeft: 'auto', background: '#fc8181', color: '#fff',
    fontSize: '10px', fontWeight: '700', padding: '2px 6px',
    borderRadius: '99px', minWidth: '18px', textAlign: 'center',
  },
  sidebarFooter: { marginTop: 'auto', paddingTop: '16px' },
  logoutBtn: {
    width: '100%', padding: '10px', border: '1px solid rgba(252,129,129,0.2)',
    borderRadius: '10px', background: 'rgba(252,129,129,0.05)',
    color: '#fc8181', fontSize: '13px', cursor: 'pointer',
  },
  main: { marginLeft: '240px', flex: 1, padding: '36px 40px' },
  topbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: '36px', paddingBottom: '24px',
    borderBottom: '1px solid rgba(99,179,237,0.08)',
  },
  pageTitle: { fontSize: '26px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.01em' },
  pageSubtitle: { fontSize: '14px', color: '#7a8aaa' },
  cgpaBadge: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '16px 24px', background: 'rgba(99,179,237,0.08)',
    borderRadius: '14px', border: '1px solid rgba(99,179,237,0.2)',
  },
  cgpaNum: { fontSize: '28px', fontWeight: '800', color: '#63b3ed' },
  cgpaLabel: { fontSize: '11px', color: '#7a8aaa', textTransform: 'uppercase', letterSpacing: '0.1em' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' },
  statCard: {
    background: '#1e2d45', borderRadius: '14px', padding: '20px',
    border: '1px solid rgba(99,179,237,0.1)',
  },
  statCardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  statCardIcon: { fontSize: '20px' },
  statCardValue: { fontSize: '26px', fontWeight: '800' },
  statCardLabel: { fontSize: '14px', fontWeight: '600', color: '#e8edf5', marginBottom: '4px' },
  statCardSub: { fontSize: '12px', color: '#7a8aaa' },
  section: { background: '#1e2d45', borderRadius: '16px', padding: '28px', border: '1px solid rgba(99,179,237,0.1)' },
  sectionTitle: { fontSize: '17px', fontWeight: '700', marginBottom: '20px', color: '#e8edf5' },
  subjectList: { display: 'flex', flexDirection: 'column', gap: '14px' },
  subjectRow: { display: 'flex', alignItems: 'center', gap: '16px' },
  subjectInfo: { width: '220px', display: 'flex', flexDirection: 'column', gap: '2px' },
  subjectCode: { fontSize: '11px', color: '#7a8aaa', letterSpacing: '0.05em' },
  subjectName: { fontSize: '14px', fontWeight: '500', color: '#e8edf5' },
  progressBarWrap: { flex: 1, display: 'flex', alignItems: 'center', gap: '12px' },
  progressBarBg: { flex: 1, height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: '99px', transition: 'width 0.6s ease' },
  progressVal: { fontSize: '13px', color: '#7a8aaa', width: '36px', textAlign: 'right' },
  gradeBadge: { padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', minWidth: '36px', textAlign: 'center' },
  subjectCards: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  subjectCard: {
    background: '#243552', borderRadius: '14px', padding: '20px',
    border: '1px solid rgba(99,179,237,0.1)',
  },
  subjectCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  subjectCardCode: { fontSize: '11px', color: '#7a8aaa', letterSpacing: '0.05em' },
  subjectCardName: { fontSize: '15px', fontWeight: '600', color: '#e8edf5', marginBottom: '16px' },
  subjectCardStats: { display: 'flex', gap: '24px' },
  subjectCardStatVal: { fontSize: '20px', fontWeight: '700', color: '#e8edf5' },
  subjectCardStatLabel: { fontSize: '11px', color: '#7a8aaa', marginTop: '2px' },
  attendanceRow: {
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '12px 0', borderBottom: '1px solid rgba(99,179,237,0.06)',
  },
  attendanceSubject: { width: '180px', fontSize: '14px', color: '#e8edf5' },
  attendanceBarWrap: { flex: 1 },
  attendancePct: { width: '44px', fontSize: '14px', fontWeight: '600', textAlign: 'right' },
  attendanceStatus: { padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#7a8aaa', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(99,179,237,0.08)' },
  tr: { borderBottom: '1px solid rgba(99,179,237,0.05)' },
  td: { padding: '14px 16px', fontSize: '14px', color: '#e8edf5' },
};

export default StudentDashboard;