import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const navigate = useNavigate();

  const faculty = {
    name: 'Dr. Priya R',
    empId: 'FAC-2024-012',
    department: 'Computer Science',
    designation: 'Associate Professor',
  };

  const departments = [
    {
      id: 1, name: 'Computer Science', code: 'CSE', totalStudents: 240, totalFaculty: 18,
      avgCgpa: 7.8, placementRate: 85, arrears: 32,
      batches: [
        { year: '2021-2025', sem: '7th Sem', type: 'UG', students: 60, arrears: 8, placed: 45, internship: 12, events: ['Hackathon - March 2025', 'Code Sprint - April 2025'] },
        { year: '2022-2026', sem: '5th Sem', type: 'UG', students: 62, arrears: 10, placed: 0, internship: 8, events: ['AI Workshop - Feb 2025'] },
        { year: '2023-2027', sem: '3rd Sem', type: 'UG', students: 65, arrears: 9, placed: 0, internship: 0, events: [] },
        { year: '2024-2028', sem: '1st Sem', type: 'UG', students: 53, arrears: 5, placed: 0, internship: 0, events: ['Orientation Hackathon - Jan 2025'] },
      ],
    },
    {
      id: 2, name: 'Information Technology', code: 'IT', totalStudents: 198, totalFaculty: 14,
      avgCgpa: 7.5, placementRate: 78, arrears: 28,
      batches: [
        { year: '2021-2025', sem: '7th Sem', type: 'UG', students: 55, arrears: 6, placed: 40, internship: 10, events: ['Cloud Expo - Feb 2025'] },
        { year: '2022-2026', sem: '5th Sem', type: 'UG', students: 52, arrears: 9, placed: 0, internship: 5, events: [] },
        { year: '2023-2027', sem: '3rd Sem', type: 'UG', students: 48, arrears: 8, placed: 0, internship: 0, events: [] },
        { year: '2024-2028', sem: '1st Sem', type: 'UG', students: 43, arrears: 5, placed: 0, internship: 0, events: [] },
      ],
    },
    {
      id: 3, name: 'Electronics & Comm', code: 'ECE', totalStudents: 210, totalFaculty: 16,
      avgCgpa: 7.2, placementRate: 70, arrears: 45,
      batches: [
        { year: '2021-2025', sem: '7th Sem', type: 'UG', students: 58, arrears: 12, placed: 38, internship: 9, events: ['Circuits Fest - Mar 2025'] },
        { year: '2022-2026', sem: '5th Sem', type: 'UG', students: 54, arrears: 14, placed: 0, internship: 4, events: [] },
        { year: '2023-2027', sem: '3rd Sem', type: 'UG', students: 50, arrears: 11, placed: 0, internship: 0, events: [] },
        { year: '2024-2028', sem: '1st Sem', type: 'UG', students: 48, arrears: 8, placed: 0, internship: 0, events: [] },
      ],
    },
    {
      id: 4, name: 'Mechanical Engg', code: 'MECH', totalStudents: 185, totalFaculty: 15,
      avgCgpa: 6.9, placementRate: 60, arrears: 52,
      batches: [
        { year: '2021-2025', sem: '7th Sem', type: 'UG', students: 50, arrears: 15, placed: 28, internship: 7, events: [] },
        { year: '2022-2026', sem: '5th Sem', type: 'UG', students: 48, arrears: 16, placed: 0, internship: 3, events: ['Design Expo - Apr 2025'] },
        { year: '2023-2027', sem: '3rd Sem', type: 'UG', students: 45, arrears: 12, placed: 0, internship: 0, events: [] },
        { year: '2024-2028', sem: '1st Sem', type: 'UG', students: 42, arrears: 9, placed: 0, internship: 0, events: [] },
      ],
    },
    {
      id: 5, name: 'MBA', code: 'MBA', totalStudents: 120, totalFaculty: 12,
      avgCgpa: 7.6, placementRate: 88, arrears: 10,
      batches: [
        { year: '2023-2025', sem: '3rd Sem', type: 'PG', students: 60, arrears: 5, placed: 48, internship: 20, events: ['B-Plan Competition - Mar 2025'] },
        { year: '2024-2026', sem: '1st Sem', type: 'PG', students: 60, arrears: 5, placed: 0, internship: 10, events: [] },
      ],
    },
    {
      id: 6, name: 'M.Tech CSE', code: 'MCSE', totalStudents: 80, totalFaculty: 10,
      avgCgpa: 8.2, placementRate: 90, arrears: 5,
      batches: [
        { year: '2023-2025', sem: '3rd Sem', type: 'PG', students: 40, arrears: 2, placed: 35, internship: 15, events: ['Research Symposium - Feb 2025'] },
        { year: '2024-2026', sem: '1st Sem', type: 'PG', students: 40, arrears: 3, placed: 0, internship: 5, events: [] },
      ],
    },
    {
      id: 7, name: 'Civil Engg', code: 'CIVIL', totalStudents: 120, totalFaculty: 12,
      avgCgpa: 7.0, placementRate: 55, arrears: 48,
      batches: [
        { year: '2021-2025', sem: '7th Sem', type: 'UG', students: 32, arrears: 14, placed: 18, internship: 5, events: [] },
        { year: '2022-2026', sem: '5th Sem', type: 'UG', students: 30, arrears: 12, placed: 0, internship: 2, events: [] },
        { year: '2023-2027', sem: '3rd Sem', type: 'UG', students: 30, arrears: 12, placed: 0, internship: 0, events: [] },
        { year: '2024-2028', sem: '1st Sem', type: 'UG', students: 28, arrears: 10, placed: 0, internship: 0, events: [] },
      ],
    },
    {
      id: 8, name: 'Electrical Engg', code: 'EEE', totalStudents: 87, totalFaculty: 10,
      avgCgpa: 7.1, placementRate: 62, arrears: 40,
      batches: [
        { year: '2021-2025', sem: '7th Sem', type: 'UG', students: 24, arrears: 11, placed: 15, internship: 4, events: [] },
        { year: '2022-2026', sem: '5th Sem', type: 'UG', students: 22, arrears: 10, placed: 0, internship: 2, events: [] },
        { year: '2023-2027', sem: '3rd Sem', type: 'UG', students: 22, arrears: 10, placed: 0, internship: 0, events: [] },
        { year: '2024-2028', sem: '1st Sem', type: 'UG', students: 19, arrears: 9, placed: 0, internship: 0, events: [] },
      ],
    },
  ];

  const allStudents = [
    { name: 'Hema S',    regNo: '21CS045', dept: 'CSE',      batch: '2021-2025', year: '4th Year', cgpa: 8.7, attendance: 82, arrears: 1, placement: 'Offer' },
    { name: 'Arjun K',   regNo: '21CS046', dept: 'CSE',      batch: '2021-2025', year: '4th Year', cgpa: 7.2, attendance: 74, arrears: 3, placement: 'Applied' },
    { name: 'Preethi M', regNo: '21CS047', dept: 'CSE',      batch: '2021-2025', year: '4th Year', cgpa: 9.1, attendance: 92, arrears: 0, placement: 'Offer' },
    { name: 'Vikram S',  regNo: '22CS001', dept: 'CSE',      batch: '2022-2026', year: '3rd Year', cgpa: 6.8, attendance: 68, arrears: 5, placement: '-' },
    { name: 'Divya R',   regNo: '22PG001', dept: 'M.Tech CSE', batch: '2023-2025', year: '2nd Year', cgpa: 8.9, attendance: 88, arrears: 0, placement: 'Shortlisted' },
    { name: 'Karthik L', regNo: '22PG002', dept: 'IT',       batch: '2022-2026', year: '3rd Year', cgpa: 7.5, attendance: 79, arrears: 2, placement: 'Applied' },
    { name: 'Sneha T',   regNo: '23EC001', dept: 'ECE',      batch: '2023-2027', year: '2nd Year', cgpa: 7.8, attendance: 85, arrears: 1, placement: '-' },
    { name: 'Rahul V',   regNo: '21ME001', dept: 'MECH',     batch: '2021-2025', year: '4th Year', cgpa: 6.5, attendance: 72, arrears: 6, placement: 'Rejected' },
  ];

  const allFaculty = [
    { name: 'Dr. Priya R',   empId: 'FAC001', dept: 'CSE',  designation: 'Associate Professor', experience: '12 yrs', subjects: 3 },
    { name: 'Prof. Ramesh K', empId: 'FAC002', dept: 'CSE',  designation: 'Professor',           experience: '20 yrs', subjects: 2 },
    { name: 'Dr. Anitha S',   empId: 'FAC003', dept: 'IT',   designation: 'Assistant Professor', experience: '8 yrs',  subjects: 4 },
    { name: 'Prof. Kumar M',  empId: 'FAC004', dept: 'ECE',  designation: 'Professor',           experience: '18 yrs', subjects: 2 },
    { name: 'Dr. Lakshmi P',  empId: 'FAC005', dept: 'MECH', designation: 'Associate Professor', experience: '10 yrs', subjects: 3 },
    { name: 'Prof. Suresh N', empId: 'FAC006', dept: 'MBA',  designation: 'Professor',           experience: '22 yrs', subjects: 2 },
  ];

  // ── Stats derived from faculty's OWN department (CSE) ──
  const myDept = departments.find(d => d.name === faculty.department);
  const myStudents = allStudents.filter(s => s.dept === 'CSE');
  const myFaculty  = allFaculty.filter(f => f.dept === 'CSE');
  const lowAttendance = myStudents.filter(s => s.attendance < 75).length;
  const totalArrears  = myStudents.reduce((a, s) => a + s.arrears, 0);
  const placed        = myStudents.filter(s => s.placement === 'Offer').length;

  const getPlacementColor = (s) => {
    if (s === 'Offer')       return '#68d391';
    if (s === 'Shortlisted') return '#63b3ed';
    if (s === 'Applied')     return '#f6ad55';
    if (s === 'Rejected')    return '#fc8181';
    return '#7a8aaa';
  };
  const getAttendanceColor = (p) => p >= 85 ? '#68d391' : p >= 75 ? '#f6ad55' : '#fc8181';
  const getCgpaColor       = (c) => c >= 8.5 ? '#68d391' : c >= 7.0 ? '#63b3ed' : '#fc8181';

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarBrand}>● IIAE</div>
        <div style={styles.sidebarProfile}>
          <div style={styles.avatar}>{faculty.name.charAt(0)}</div>
          <div>
            <div style={styles.profileName}>{faculty.name}</div>
            <div style={styles.profileReg}>{faculty.empId}</div>
          </div>
        </div>
        <nav style={styles.nav}>
          {[
            { id: 'overview',     icon: '⬡',   label: 'Overview' },
            { id: 'departments',  icon: '🏛️',  label: 'Departments' },
            { id: 'students',     icon: '🎓',  label: 'Students' },
            { id: 'faculty',      icon: '👨‍🏫', label: 'Faculty' },
            { id: 'placements',   icon: '💼',  label: 'Placements' },
            { id: 'arrears',      icon: '⚠️',  label: 'Arrears' },
          ].map((item) => (
            <button
              key={item.id}
              style={{ ...styles.navItem, ...(activeTab === item.id ? styles.navItemActive : {}) }}
              onClick={() => { setActiveTab(item.id); setSelectedDept(null); setSelectedBatch(null); }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.id === 'attendance' && lowAttendance > 0 && (
                <span style={styles.badge}>{lowAttendance}</span>
              )}
            </button>
          ))}
        </nav>
        <div style={styles.sidebarFooter}>
          <button style={styles.logoutBtn} onClick={() => navigate('/')}>↩ Logout</button>
        </div>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Topbar — now shows 3 contextual badges for faculty's own dept */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.pageTitle}>
              {activeTab === 'overview'    && 'Faculty Overview'}
              {activeTab === 'departments' && (selectedDept ? (selectedBatch ? `${selectedDept.name} · ${selectedBatch.year}` : selectedDept.name) : 'Departments')}
              {activeTab === 'students'    && 'All Students'}
              {activeTab === 'faculty'     && 'Faculty Members'}
              {activeTab === 'placements'  && 'Placement Analytics'}
              {activeTab === 'arrears'     && 'Arrear Management'}
            </h1>
            <p style={styles.pageSubtitle}>{faculty.department} · {faculty.designation}</p>
          </div>

          {/* ── 3 contextual badges showing faculty's own dept info ── */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={styles.deptBadge}>
              <span style={styles.deptNum}>{myDept?.totalStudents ?? myStudents.length}</span>
              <span style={styles.deptLabel}>My Students</span>
            </div>
            <div style={{ ...styles.deptBadge, background: 'rgba(154,117,234,0.08)', border: '1px solid rgba(154,117,234,0.2)' }}>
              <span style={{ ...styles.deptNum, color: '#9a75ea' }}>{myFaculty.length}</span>
              <span style={styles.deptLabel}>My Faculty</span>
            </div>
            <div style={{ ...styles.deptBadge, background: lowAttendance > 0 ? 'rgba(252,129,129,0.08)' : 'rgba(104,211,145,0.08)', border: `1px solid ${lowAttendance > 0 ? 'rgba(252,129,129,0.2)' : 'rgba(104,211,145,0.2)'}` }}>
              <span style={{ ...styles.deptNum, color: lowAttendance > 0 ? '#fc8181' : '#68d391' }}>{lowAttendance}</span>
              <span style={styles.deptLabel}>Low Attend.</span>
            </div>
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div>
            <div style={styles.statsGrid}>
              {[
                { label: 'Dept Students', value: myDept?.totalStudents ?? myStudents.length, icon: '🎓', color: '#63b3ed', sub: faculty.department },
                { label: 'Dept Faculty',  value: myDept?.totalFaculty  ?? myFaculty.length,  icon: '👨‍🏫', color: '#9a75ea', sub: 'Teaching staff' },
                { label: 'Low Attendance',value: lowAttendance,  icon: '📅', color: '#fc8181', sub: 'Below 75%' },
                { label: 'Total Arrears', value: totalArrears,   icon: '⚠️', color: '#f6ad55', sub: 'Dept pending' },
                { label: 'Placed',        value: placed,         icon: '💼', color: '#68d391', sub: 'Offers received' },
                { label: 'Avg CGPA',      value: myDept?.avgCgpa ?? '—', icon: '🏆', color: '#63b3ed', sub: 'Dept average' },
                { label: 'Placement Rate',value: `${myDept?.placementRate ?? 0}%`, icon: '📊', color: '#68d391', sub: 'Final year' },
                { label: 'Dept Batches',  value: myDept?.batches.length ?? 0, icon: '📚', color: '#f6ad55', sub: 'Active batches' },
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
              <h2 style={styles.sectionTitle}>Department Summary — All Departments</h2>
              <table style={styles.table}>
                <thead>
                  <tr>{['Department', 'Code', 'Students', 'Faculty', 'Avg CGPA', 'Placed %', 'Arrears'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {departments.map((d, i) => (
                    <tr key={i} style={{ ...styles.tr, cursor: 'pointer' }} onClick={() => { setActiveTab('departments'); setSelectedDept(d); }}>
                      <td style={{ ...styles.td, fontWeight: '600', color: d.name === faculty.department ? '#f6ad55' : '#63b3ed' }}>
                        {d.name} {d.name === faculty.department && <span style={{ fontSize: '10px', marginLeft: '6px', color: '#f6ad55' }}>● MY DEPT</span>}
                      </td>
                      <td style={{ ...styles.td, color: '#7a8aaa' }}>{d.code}</td>
                      <td style={styles.td}>{d.totalStudents}</td>
                      <td style={styles.td}>{d.totalFaculty}</td>
                      <td style={{ ...styles.td, color: getCgpaColor(d.avgCgpa) }}>{d.avgCgpa}</td>
                      <td style={{ ...styles.td, color: '#68d391' }}>{d.placementRate}%</td>
                      <td style={{ ...styles.td, color: '#f6ad55' }}>{d.arrears}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── DEPARTMENTS LIST ── */}
        {activeTab === 'departments' && !selectedDept && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {departments.map((d, i) => (
              <div key={i} style={{ ...styles.deptCard, cursor: 'pointer', border: d.name === faculty.department ? '1px solid rgba(246,173,85,0.4)' : '1px solid rgba(99,179,237,0.1)' }} onClick={() => setSelectedDept(d)}>
                <div style={styles.deptCardHeader}>
                  <div style={styles.deptCode}>{d.code}</div>
                  <div style={styles.deptType}>{d.batches[0].type}</div>
                </div>
                <div style={styles.deptName}>
                  {d.name}
                  {d.name === faculty.department && <span style={{ fontSize: '10px', color: '#f6ad55', marginLeft: '8px' }}>● MY DEPT</span>}
                </div>
                <div style={styles.deptCardStats}>
                  <div><div style={{ color: '#63b3ed', fontWeight: '700', fontSize: '18px' }}>{d.totalStudents}</div><div style={styles.deptStatLabel}>Students</div></div>
                  <div><div style={{ color: '#9a75ea', fontWeight: '700', fontSize: '18px' }}>{d.totalFaculty}</div><div style={styles.deptStatLabel}>Faculty</div></div>
                  <div><div style={{ color: '#68d391', fontWeight: '700', fontSize: '18px' }}>{d.placementRate}%</div><div style={styles.deptStatLabel}>Placed</div></div>
                </div>
                <div style={styles.deptCardFooter}>{d.batches.length} Batches · {d.arrears} Arrears</div>
              </div>
            ))}
          </div>
        )}

        {/* ── DEPARTMENT DETAIL ── */}
        {activeTab === 'departments' && selectedDept && !selectedBatch && (
          <div>
            <button style={styles.backBtn} onClick={() => setSelectedDept(null)}>← Back to Departments</button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Students',  value: selectedDept.totalStudents,         color: '#63b3ed' },
                { label: 'Total Faculty',   value: selectedDept.totalFaculty,          color: '#9a75ea' },
                { label: 'Placement Rate',  value: `${selectedDept.placementRate}%`,   color: '#68d391' },
                { label: 'Arrears',         value: selectedDept.arrears,               color: '#f6ad55' },
              ].map((c, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${c.color}` }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: c.color }}>{c.value}</div>
                  <div style={styles.statCardLabel}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Batches — Click to View Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
                {selectedDept.batches.map((batch, i) => (
                  <div key={i} style={{ ...styles.batchCard, cursor: 'pointer' }} onClick={() => setSelectedBatch(batch)}>
                    <div style={styles.batchHeader}>
                      <div>
                        <div style={styles.batchYear}>{batch.year}</div>
                        <div style={styles.batchSem}>{batch.type} · {batch.sem}</div>
                      </div>
                      <div style={styles.batchStudentCount}>{batch.students} Students</div>
                    </div>
                    <div style={styles.batchStats}>
                      <div><span style={{ color: '#f6ad55', fontWeight: '700' }}>{batch.arrears}</span><br /><span style={styles.batchStatLabel}>Arrears</span></div>
                      <div><span style={{ color: '#68d391', fontWeight: '700' }}>{batch.placed}</span><br /><span style={styles.batchStatLabel}>Placed</span></div>
                      <div><span style={{ color: '#63b3ed', fontWeight: '700' }}>{batch.internship}</span><br /><span style={styles.batchStatLabel}>Internship</span></div>
                      <div><span style={{ color: '#9a75ea', fontWeight: '700' }}>{batch.events.length}</span><br /><span style={styles.batchStatLabel}>Events</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BATCH DETAIL ── */}
        {activeTab === 'departments' && selectedDept && selectedBatch && (
          <div>
            <button style={styles.backBtn} onClick={() => setSelectedBatch(null)}>← Back to {selectedDept.name}</button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Students', value: selectedBatch.students,   color: '#63b3ed' },
                { label: 'Arrears',        value: selectedBatch.arrears,    color: '#f6ad55' },
                { label: 'Placed',         value: selectedBatch.placed,     color: '#68d391' },
                { label: 'On Internship',  value: selectedBatch.internship, color: '#9a75ea' },
              ].map((c, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${c.color}` }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: c.color }}>{c.value}</div>
                  <div style={styles.statCardLabel}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Batch Info</h2>
                {[
                  { label: 'Department',        value: selectedDept.name },
                  { label: 'Batch Year',        value: selectedBatch.year },
                  { label: 'Type',              value: selectedBatch.type },
                  { label: 'Current Semester',  value: selectedBatch.sem },
                  { label: 'Total Students',    value: selectedBatch.students },
                ].map((row, i) => (
                  <div key={i} style={styles.infoRow}>
                    <span style={styles.infoLabel}>{row.label}</span>
                    <span style={styles.infoValue}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Events & Hackathons</h2>
                {selectedBatch.events.length === 0
                  ? <p style={{ color: '#7a8aaa', fontSize: '14px' }}>No events scheduled for this batch.</p>
                  : selectedBatch.events.map((ev, i) => (
                    <div key={i} style={styles.eventRow}>
                      <span>🎯</span>
                      <span style={{ fontSize: '14px', color: '#e8edf5' }}>{ev}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )}

        {/* ── STUDENTS ── */}
        {activeTab === 'students' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>All Students</h2>
            <table style={styles.table}>
              <thead>
                <tr>{['Reg No', 'Name', 'Dept', 'Batch', 'Year', 'CGPA', 'Attendance', 'Arrears', 'Placement'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {allStudents.map((s, i) => (
                  <tr key={i} style={styles.tr}>
                    <td style={{ ...styles.td, color: '#7a8aaa', fontSize: '13px' }}>{s.regNo}</td>
                    <td style={{ ...styles.td, fontWeight: '600' }}>{s.name}</td>
                    <td style={{ ...styles.td, color: '#63b3ed' }}>{s.dept}</td>
                    <td style={{ ...styles.td, color: '#7a8aaa', fontSize: '13px' }}>{s.batch}</td>
                    <td style={styles.td}>{s.year}</td>
                    <td style={{ ...styles.td, color: getCgpaColor(s.cgpa), fontWeight: '600' }}>{s.cgpa}</td>
                    <td style={{ ...styles.td, color: getAttendanceColor(s.attendance), fontWeight: '600' }}>{s.attendance}%</td>
                    <td style={{ ...styles.td, color: s.arrears > 0 ? '#f6ad55' : '#68d391', fontWeight: '600' }}>{s.arrears}</td>
                    <td style={styles.td}>
                      <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', background: `${getPlacementColor(s.placement)}22`, color: getPlacementColor(s.placement) }}>{s.placement}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── FACULTY ── */}
        {activeTab === 'faculty' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Faculty Members</h2>
            <table style={styles.table}>
              <thead>
                <tr>{['Emp ID', 'Name', 'Department', 'Designation', 'Experience', 'Subjects'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {allFaculty.map((f, i) => (
                  <tr key={i} style={styles.tr}>
                    <td style={{ ...styles.td, color: '#7a8aaa', fontSize: '13px' }}>{f.empId}</td>
                    <td style={{ ...styles.td, fontWeight: '600' }}>{f.name}</td>
                    <td style={{ ...styles.td, color: '#63b3ed' }}>{f.dept}</td>
                    <td style={styles.td}>{f.designation}</td>
                    <td style={{ ...styles.td, color: '#9a75ea' }}>{f.experience}</td>
                    <td style={{ ...styles.td, color: '#f6ad55', fontWeight: '600' }}>{f.subjects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── PLACEMENTS ── */}
        {activeTab === 'placements' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Eligible', value: allStudents.length,                                        color: '#63b3ed' },
                { label: 'Offers',         value: allStudents.filter(s => s.placement === 'Offer').length,   color: '#68d391' },
                { label: 'Shortlisted',    value: allStudents.filter(s => s.placement === 'Shortlisted').length, color: '#9a75ea' },
                { label: 'Rejected',       value: allStudents.filter(s => s.placement === 'Rejected').length, color: '#fc8181' },
              ].map((c, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${c.color}` }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: c.color }}>{c.value}</div>
                  <div style={styles.statCardLabel}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Placement Status — All Students</h2>
              <table style={styles.table}>
                <thead>
                  <tr>{['Reg No', 'Name', 'Dept', 'Batch', 'CGPA', 'Status'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {allStudents.map((s, i) => {
                    const color = getPlacementColor(s.placement);
                    return (
                      <tr key={i} style={styles.tr}>
                        <td style={{ ...styles.td, color: '#7a8aaa', fontSize: '13px' }}>{s.regNo}</td>
                        <td style={{ ...styles.td, fontWeight: '600' }}>{s.name}</td>
                        <td style={{ ...styles.td, color: '#63b3ed' }}>{s.dept}</td>
                        <td style={{ ...styles.td, color: '#7a8aaa', fontSize: '13px' }}>{s.batch}</td>
                        <td style={{ ...styles.td, color: getCgpaColor(s.cgpa), fontWeight: '600' }}>{s.cgpa}</td>
                        <td style={styles.td}>
                          <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', background: `${color}22`, color }}>{s.placement}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ARREARS ── */}
        {activeTab === 'arrears' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Students',        value: allStudents.length,                                    color: '#63b3ed' },
                { label: 'Students with Arrears', value: allStudents.filter(s => s.arrears > 0).length,         color: '#f6ad55' },
                { label: 'Total Arrear Count',    value: allStudents.reduce((a, s) => a + s.arrears, 0),        color: '#fc8181' },
              ].map((c, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${c.color}` }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: c.color }}>{c.value}</div>
                  <div style={styles.statCardLabel}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Student Arrear Details</h2>
              <table style={styles.table}>
                <thead>
                  <tr>{['Reg No', 'Name', 'Dept', 'Batch', 'Year', 'Arrear Count', 'Status'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {allStudents.map((s, i) => (
                    <tr key={i} style={styles.tr}>
                      <td style={{ ...styles.td, color: '#7a8aaa', fontSize: '13px' }}>{s.regNo}</td>
                      <td style={{ ...styles.td, fontWeight: '600' }}>{s.name}</td>
                      <td style={{ ...styles.td, color: '#63b3ed' }}>{s.dept}</td>
                      <td style={{ ...styles.td, color: '#7a8aaa', fontSize: '13px' }}>{s.batch}</td>
                      <td style={styles.td}>{s.year}</td>
                      <td style={{ ...styles.td, color: s.arrears > 0 ? '#f6ad55' : '#68d391', fontWeight: '700' }}>{s.arrears}</td>
                      <td style={styles.td}>
                        <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', background: s.arrears === 0 ? 'rgba(104,211,145,0.1)' : 'rgba(252,129,129,0.1)', color: s.arrears === 0 ? '#68d391' : '#fc8181' }}>
                          {s.arrears === 0 ? '✓ Clear' : `${s.arrears} Pending`}
                        </span>
                      </td>
                    </tr>
                  ))}
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
    borderRight: '1px solid rgba(246,173,85,0.15)',
    display: 'flex', flexDirection: 'column', padding: '28px 16px',
    position: 'fixed', top: 0, left: 0,
  },
  sidebarBrand: { fontSize: '11px', fontWeight: '700', letterSpacing: '0.2em', color: '#f6ad55', textTransform: 'uppercase', marginBottom: '32px', paddingLeft: '8px' },
  sidebarProfile: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 12px', background: 'rgba(246,173,85,0.07)', borderRadius: '12px', marginBottom: '32px', border: '1px solid rgba(246,173,85,0.12)' },
  avatar: { width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #f6ad55, #fc8181)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#fff', flexShrink: 0 },
  profileName: { fontSize: '14px', fontWeight: '600', color: '#e8edf5' },
  profileReg: { fontSize: '12px', color: '#7a8aaa', marginTop: '2px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#7a8aaa', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' },
  navItemActive: { background: 'rgba(246,173,85,0.1)', color: '#f6ad55' },
  badge: { marginLeft: 'auto', background: '#fc8181', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '99px' },
  sidebarFooter: { marginTop: 'auto', paddingTop: '16px' },
  logoutBtn: { width: '100%', padding: '10px', border: '1px solid rgba(252,129,129,0.2)', borderRadius: '10px', background: 'rgba(252,129,129,0.05)', color: '#fc8181', fontSize: '13px', cursor: 'pointer' },
  main: { marginLeft: '240px', flex: 1, padding: '36px 40px' },
  topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', paddingBottom: '24px', borderBottom: '1px solid rgba(246,173,85,0.1)' },
  pageTitle: { fontSize: '26px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.01em' },
  pageSubtitle: { fontSize: '14px', color: '#7a8aaa' },
  deptBadge: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 18px', background: 'rgba(246,173,85,0.08)', borderRadius: '14px', border: '1px solid rgba(246,173,85,0.2)', minWidth: '80px' },
  deptNum: { fontSize: '22px', fontWeight: '800', color: '#f6ad55' },
  deptLabel: { fontSize: '10px', color: '#7a8aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' },
  statCard: { background: '#1e2d45', borderRadius: '14px', padding: '20px', border: '1px solid rgba(99,179,237,0.1)' },
  statCardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  statCardIcon: { fontSize: '20px' },
  statCardValue: { fontSize: '26px', fontWeight: '800' },
  statCardLabel: { fontSize: '14px', fontWeight: '600', color: '#e8edf5', marginBottom: '4px' },
  statCardSub: { fontSize: '12px', color: '#7a8aaa' },
  section: { background: '#1e2d45', borderRadius: '16px', padding: '28px', border: '1px solid rgba(99,179,237,0.1)' },
  sectionTitle: { fontSize: '17px', fontWeight: '700', marginBottom: '20px', color: '#e8edf5' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#7a8aaa', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(99,179,237,0.08)' },
  tr: { borderBottom: '1px solid rgba(99,179,237,0.05)' },
  td: { padding: '14px 16px', fontSize: '14px', color: '#e8edf5' },
  deptCard: { background: '#1e2d45', borderRadius: '16px', padding: '24px', transition: 'border-color 0.2s' },
  deptCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  deptCode: { fontSize: '11px', fontWeight: '700', color: '#f6ad55', letterSpacing: '0.1em', textTransform: 'uppercase' },
  deptType: { fontSize: '11px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(99,179,237,0.1)', color: '#63b3ed' },
  deptName: { fontSize: '17px', fontWeight: '700', color: '#e8edf5', marginBottom: '16px' },
  deptCardStats: { display: 'flex', gap: '20px', marginBottom: '16px' },
  deptStatLabel: { fontSize: '11px', color: '#7a8aaa', marginTop: '4px' },
  deptCardFooter: { fontSize: '12px', color: '#7a8aaa', borderTop: '1px solid rgba(99,179,237,0.08)', paddingTop: '12px' },
  batchCard: { background: '#243552', borderRadius: '14px', padding: '20px', border: '1px solid rgba(99,179,237,0.1)' },
  batchHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  batchYear: { fontSize: '16px', fontWeight: '700', color: '#e8edf5' },
  batchSem: { fontSize: '12px', color: '#7a8aaa', marginTop: '4px' },
  batchStudentCount: { fontSize: '13px', color: '#63b3ed', fontWeight: '600' },
  batchStats: { display: 'flex', gap: '20px' },
  batchStatLabel: { fontSize: '11px', color: '#7a8aaa', marginTop: '4px' },
  backBtn: { marginBottom: '24px', padding: '8px 16px', background: 'rgba(99,179,237,0.1)', border: '1px solid rgba(99,179,237,0.2)', borderRadius: '8px', color: '#63b3ed', fontSize: '13px', cursor: 'pointer' },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(99,179,237,0.06)' },
  infoLabel: { fontSize: '13px', color: '#7a8aaa' },
  infoValue: { fontSize: '13px', color: '#e8edf5', fontWeight: '600' },
  eventRow: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid rgba(99,179,237,0.06)' },
};

export default FacultyDashboard;