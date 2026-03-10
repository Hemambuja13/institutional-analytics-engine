import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ── SERVICE LAYER ─────────────────────────────────────────────────────────────
const analyticsService = {
  getOverview: () => Promise.resolve({
    totalStudents: 1240, totalFaculty: 98, departments: 8,
    activeCourses: 142, placementRate: 78, totalArrears: 312,
    ongoingEvents: 4, internships: 87,
  }),
  getAlerts: () => Promise.resolve([
    { id: 1, type: 'danger',  icon: '🚨', title: 'Critical Attendance',   msg: 'Vikram S (21ME001) — 68% attendance this semester',              time: '2m ago',  dept: 'MECH' },
    { id: 2, type: 'danger',  icon: '⚠️', title: 'High Arrear Count',     msg: 'Arjun K (21CS046) — 5 pending arrears, placement at risk',        time: '8m ago',  dept: 'CSE'  },
    { id: 3, type: 'warning', icon: '📉', title: 'CGPA Drop Detected',    msg: 'Karthik L (22PG002) dropped from 8.1 to 7.5 this semester',       time: '15m ago', dept: 'IT'   },
    { id: 4, type: 'warning', icon: '🎓', title: 'No Placement Activity', msg: '12 final-year students in ECE have not applied anywhere',          time: '1h ago',  dept: 'ECE'  },
    { id: 5, type: 'info',    icon: '🏆', title: 'Top Performer',         msg: 'Preethi M (21CS047) — CGPA 9.1, 0 arrears, Offer received',       time: '2h ago',  dept: 'CSE'  },
    { id: 6, type: 'info',    icon: '📅', title: 'Event Reminder',        msg: 'Hackathon in CSE 2021 batch scheduled for March 2025',            time: '3h ago',  dept: 'CSE'  },
  ]),
  getDropoutRisk: () => Promise.resolve([
    { regNo: '22CS001', name: 'Vikram S',  dept: 'CSE',  batch: '2022-2026', cgpa: 6.8, attendance: 68, arrears: 5, riskScore: 87, trend: 'worsening' },
    { regNo: '21ME001', name: 'Rahul V',   dept: 'MECH', batch: '2021-2025', cgpa: 6.5, attendance: 72, arrears: 6, riskScore: 82, trend: 'worsening' },
    { regNo: '21CS046', name: 'Arjun K',   dept: 'CSE',  batch: '2021-2025', cgpa: 7.2, attendance: 74, arrears: 3, riskScore: 64, trend: 'stable'    },
    { regNo: '22PG002', name: 'Karthik L', dept: 'IT',   batch: '2022-2026', cgpa: 7.5, attendance: 79, arrears: 2, riskScore: 48, trend: 'improving' },
    { regNo: '23EC001', name: 'Sneha T',   dept: 'ECE',  batch: '2023-2027', cgpa: 7.8, attendance: 85, arrears: 1, riskScore: 22, trend: 'improving' },
    { regNo: '21CS045', name: 'Hema S',    dept: 'CSE',  batch: '2021-2025', cgpa: 8.7, attendance: 82, arrears: 1, riskScore: 12, trend: 'improving' },
  ]),
  getHeatmap: () => Promise.resolve([
    { dept: 'CSE',   cgpa: 7.8, attendance: 83, arrears: 32, placement: 85 },
    { dept: 'IT',    cgpa: 7.5, attendance: 80, arrears: 28, placement: 78 },
    { dept: 'ECE',   cgpa: 7.2, attendance: 77, arrears: 45, placement: 70 },
    { dept: 'MECH',  cgpa: 6.9, attendance: 73, arrears: 52, placement: 60 },
    { dept: 'MBA',   cgpa: 7.6, attendance: 86, arrears: 10, placement: 88 },
    { dept: 'MCSE',  cgpa: 8.2, attendance: 88, arrears: 5,  placement: 90 },
    { dept: 'CIVIL', cgpa: 7.0, attendance: 74, arrears: 48, placement: 55 },
    { dept: 'EEE',   cgpa: 7.1, attendance: 75, arrears: 40, placement: 62 },
  ]),
  getPlacementFunnel: () => Promise.resolve([
    { stage: 'Total Students',        count: 1240, color: '#63b3ed' },
    { stage: 'Eligible (CGPA ≥ 6.5)', count: 980,  color: '#9a75ea' },
    { stage: 'Applied',               count: 620,  color: '#f6ad55' },
    { stage: 'Shortlisted',           count: 310,  color: '#68d391' },
    { stage: 'Offer Received',        count: 192,  color: '#4fd1c5' },
  ]),
  getAllStudents: () => Promise.resolve([
    { id: 1,  name: 'Hema S',    regNo: '21CS045', dept: 'CSE',  batch: '2021-2025', year: '4th Year', cgpa: 8.7, attendance: 82, arrears: 1, placement: 'Offer' },
    { id: 2,  name: 'Arjun K',   regNo: '21CS046', dept: 'CSE',  batch: '2021-2025', year: '4th Year', cgpa: 7.2, attendance: 74, arrears: 3, placement: 'Applied' },
    { id: 3,  name: 'Preethi M', regNo: '21CS047', dept: 'CSE',  batch: '2021-2025', year: '4th Year', cgpa: 9.1, attendance: 92, arrears: 0, placement: 'Offer' },
    { id: 4,  name: 'Vikram S',  regNo: '22CS001', dept: 'CSE',  batch: '2022-2026', year: '3rd Year', cgpa: 6.8, attendance: 68, arrears: 5, placement: '-' },
    { id: 5,  name: 'Ravi T',    regNo: '23CS001', dept: 'CSE',  batch: '2023-2027', year: '2nd Year', cgpa: 7.4, attendance: 80, arrears: 2, placement: '-' },
    { id: 6,  name: 'Sneha T',   regNo: '23EC001', dept: 'ECE',  batch: '2023-2027', year: '2nd Year', cgpa: 7.8, attendance: 85, arrears: 1, placement: '-' },
    { id: 7,  name: 'Rahul V',   regNo: '21ME001', dept: 'MECH', batch: '2021-2025', year: '4th Year', cgpa: 6.5, attendance: 72, arrears: 6, placement: 'Rejected' },
    { id: 8,  name: 'Karthik L', regNo: '22PG002', dept: 'IT',   batch: '2022-2026', year: '3rd Year', cgpa: 7.5, attendance: 79, arrears: 2, placement: 'Applied' },
  ]),
  getAllFaculty: () => Promise.resolve([
    { id: 1, name: 'Dr. Priya R',    empId: 'FAC001', dept: 'CSE',  designation: 'Associate Professor', experience: '12 yrs', subjects: 3, email: 'priya@iiae.edu' },
    { id: 2, name: 'Prof. Ramesh K', empId: 'FAC002', dept: 'CSE',  designation: 'Professor',           experience: '20 yrs', subjects: 2, email: 'ramesh@iiae.edu' },
    { id: 3, name: 'Dr. Anitha S',   empId: 'FAC003', dept: 'IT',   designation: 'Assistant Professor', experience: '8 yrs',  subjects: 4, email: 'anitha@iiae.edu' },
    { id: 4, name: 'Prof. Kumar M',  empId: 'FAC004', dept: 'ECE',  designation: 'Professor',           experience: '18 yrs', subjects: 2, email: 'kumar@iiae.edu' },
    { id: 5, name: 'Dr. Lakshmi P',  empId: 'FAC005', dept: 'MECH', designation: 'Associate Professor', experience: '10 yrs', subjects: 3, email: 'lakshmi@iiae.edu' },
  ]),
};

// ── API CALLS ──────────────────────────────────────────────────────────────────
const API = 'http://localhost:5000/api';
const getToken = () => localStorage.getItem('token');

const apiAddStudent = async (data) => {
  const res = await fetch(`${API}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data),
  });
  return res.json();
};

const apiDeleteStudent = async (id) => {
  const res = await fetch(`${API}/students/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

const apiAddFaculty = async (data) => {
  const res = await fetch(`${API}/faculty`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data),
  });
  return res.json();
};

const apiDeleteFaculty = async (id) => {
  const res = await fetch(`${API}/faculty/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

// ── MODAL COMPONENT ───────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
  <div style={styles.modalOverlay} onClick={onClose}>
    <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
      <div style={styles.modalHeader}>
        <h2 style={styles.modalTitle}>{title}</h2>
        <button onClick={onClose} style={styles.modalClose}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

const FormInput = ({ label, value, onChange, placeholder, type = 'text', required }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={styles.formLabel}>{label}{required && <span style={{ color: '#fc8181' }}> *</span>}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={styles.formInput}
    />
  </div>
);

const FormSelect = ({ label, value, onChange, options, required }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={styles.formLabel}>{label}{required && <span style={{ color: '#fc8181' }}> *</span>}</label>
    <select value={value} onChange={e => onChange(e.target.value)} style={styles.formInput}>
      <option value="">-- Select --</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

// ── ADD STUDENT MODAL ─────────────────────────────────────────────────────────
const AddStudentModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    reg_no: '', name: '', email: '', dept_id: '', batch_id: '',
    current_sem: '', cgpa: '', attendance: '', phone: '',
    placement_status: 'Not Placed',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.reg_no || !form.name || !form.email) {
      setError('Reg No, Name and Email are required!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await apiAddStudent(form);
      if (res.studentId) {
        onSuccess(`Student "${form.name}" added! Default password: password123`);
        onClose();
      } else {
        setError(res.message || 'Failed to add student');
      }
    } catch {
      setError('Server error. Check if backend is running.');
    }
    setLoading(false);
  };

  return (
    <Modal title="🎓 Add New Student" onClose={onClose}>
      {error && <div style={styles.errorBox}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
        <FormInput label="Reg No"   value={form.reg_no}   onChange={set('reg_no')}   placeholder="e.g. CS21050" required />
        <FormInput label="Full Name" value={form.name}    onChange={set('name')}     placeholder="e.g. Arun Kumar" required />
        <FormInput label="Email"    value={form.email}    onChange={set('email')}    placeholder="student@iiae.edu" type="email" required />
        <FormInput label="Phone"    value={form.phone}    onChange={set('phone')}    placeholder="9876543210" />
        <FormInput label="Dept ID"  value={form.dept_id}  onChange={set('dept_id')}  placeholder="e.g. 1 (CSE)" />
        <FormInput label="Batch ID" value={form.batch_id} onChange={set('batch_id')} placeholder="e.g. 1" />
        <FormInput label="Current Semester" value={form.current_sem} onChange={set('current_sem')} placeholder="e.g. 7th Semester" />
        <FormInput label="CGPA"     value={form.cgpa}     onChange={set('cgpa')}     placeholder="e.g. 7.5" type="number" />
        <FormInput label="Attendance %" value={form.attendance} onChange={set('attendance')} placeholder="e.g. 82" type="number" />
        <FormSelect label="Placement Status" value={form.placement_status} onChange={set('placement_status')}
          options={[
            { value: 'Not Placed',  label: 'Not Placed' },
            { value: 'In Progress', label: 'In Progress' },
            { value: 'Placed',      label: 'Placed' },
          ]}
        />
      </div>
      <div style={styles.infoNote}>
        🔐 A login account will be auto-created with default password: <strong style={{ color: '#68d391' }}>password123</strong>
      </div>
      <div style={styles.modalFooter}>
        <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
        <button onClick={handleSubmit} disabled={loading} style={styles.submitBtn}>
          {loading ? 'Adding...' : '+ Add Student'}
        </button>
      </div>
    </Modal>
  );
};

// ── ADD FACULTY MODAL ─────────────────────────────────────────────────────────
const AddFacultyModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    emp_id: '', name: '', email: '', dept_id: '',
    designation: '', phone: '', experience: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.emp_id || !form.name || !form.email) {
      setError('Emp ID, Name and Email are required!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await apiAddFaculty(form);
      if (res.facultyId) {
        onSuccess(`Faculty "${form.name}" added! Default password: password123`);
        onClose();
      } else {
        setError(res.message || 'Failed to add faculty');
      }
    } catch {
      setError('Server error. Check if backend is running.');
    }
    setLoading(false);
  };

  return (
    <Modal title="👨‍🏫 Add New Faculty" onClose={onClose}>
      {error && <div style={styles.errorBox}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
        <FormInput label="Emp ID"    value={form.emp_id}  onChange={set('emp_id')}  placeholder="e.g. FAC013" required />
        <FormInput label="Full Name" value={form.name}    onChange={set('name')}    placeholder="e.g. Dr. Ravi S" required />
        <FormInput label="Email"     value={form.email}   onChange={set('email')}   placeholder="faculty@iiae.edu" type="email" required />
        <FormInput label="Phone"     value={form.phone}   onChange={set('phone')}   placeholder="9876543210" />
        <FormInput label="Dept ID"   value={form.dept_id} onChange={set('dept_id')} placeholder="e.g. 1 (CSE)" />
        <FormSelect label="Designation" value={form.designation} onChange={set('designation')}
          options={[
            { value: 'Assistant Professor', label: 'Assistant Professor' },
            { value: 'Associate Professor', label: 'Associate Professor' },
            { value: 'Professor',           label: 'Professor' },
          ]}
        />
        <FormInput label="Experience (years)" value={form.experience} onChange={set('experience')} placeholder="e.g. 5" type="number" />
      </div>
      <div style={styles.infoNote}>
        🔐 A login account will be auto-created with default password: <strong style={{ color: '#68d391' }}>password123</strong>
      </div>
      <div style={styles.modalFooter}>
        <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
        <button onClick={handleSubmit} disabled={loading} style={{ ...styles.submitBtn, background: 'linear-gradient(135deg, #9a75ea, #7c5cbf)' }}>
          {loading ? 'Adding...' : '+ Add Faculty'}
        </button>
      </div>
    </Modal>
  );
};

// ── DELETE CONFIRM MODAL ──────────────────────────────────────────────────────
const DeleteConfirmModal = ({ name, type, onClose, onConfirm, loading }) => (
  <Modal title={`🗑️ Delete ${type}`} onClose={onClose}>
    <div style={{ textAlign: 'center', padding: '10px 0 24px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
      <p style={{ fontSize: '15px', color: '#e8edf5', marginBottom: '8px' }}>
        Are you sure you want to delete
      </p>
      <p style={{ fontSize: '18px', fontWeight: '700', color: '#fc8181', marginBottom: '16px' }}>
        "{name}"?
      </p>
      <p style={{ fontSize: '13px', color: '#7a8aaa' }}>
        This will permanently delete their record and login account.
        {type === 'Student' && ' Subjects, arrears and placement records will also be removed.'}
      </p>
    </div>
    <div style={styles.modalFooter}>
      <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
      <button onClick={onConfirm} disabled={loading} style={{ ...styles.submitBtn, background: 'linear-gradient(135deg, #fc8181, #c53030)' }}>
        {loading ? 'Deleting...' : '🗑️ Yes, Delete'}
      </button>
    </div>
  </Modal>
);

// ── TOAST NOTIFICATION ────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => (
  <div style={{
    position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
    padding: '14px 20px', borderRadius: '12px', maxWidth: '380px',
    background: type === 'success' ? 'rgba(104,211,145,0.15)' : 'rgba(252,129,129,0.15)',
    border: `1px solid ${type === 'success' ? '#68d391' : '#fc8181'}`,
    color: type === 'success' ? '#68d391' : '#fc8181',
    fontSize: '13px', fontWeight: '600', display: 'flex', gap: '10px', alignItems: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  }}>
    <span style={{ fontSize: '18px' }}>{type === 'success' ? '✅' : '❌'}</span>
    <span style={{ flex: 1 }}>{message}</span>
    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: '16px' }}>✕</button>
  </div>
);

// ── REUSABLE COMPONENTS ───────────────────────────────────────────────────────
const RiskMeter = ({ score }) => {
  const color = score >= 70 ? '#fc8181' : score >= 40 ? '#f6ad55' : '#68d391';
  const label = score >= 70 ? 'High Risk' : score >= 40 ? 'Medium' : 'Low Risk';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: '99px' }} />
      </div>
      <span style={{ fontSize: '12px', fontWeight: '700', color, minWidth: '28px' }}>{score}</span>
      <span style={{ fontSize: '11px', color, padding: '2px 8px', borderRadius: '4px', background: `${color}20`, minWidth: '70px', textAlign: 'center' }}>{label}</span>
    </div>
  );
};

const HeatCell = ({ value, metric }) => {
  let color;
  if (metric === 'arrears')   color = `rgba(252,129,129,${0.15 + Math.min(value / 60, 1) * 0.7})`;
  else if (metric === 'cgpa') color = `rgba(104,211,145,${0.15 + ((value - 6) / 3) * 0.7})`;
  else                        color = `rgba(99,179,237,${0.15 + (value / 100) * 0.7})`;
  return (
    <td style={{ padding: '12px 16px', textAlign: 'center', background: color, fontSize: '13px', fontWeight: '600', color: '#e8edf5', border: '1px solid rgba(255,255,255,0.04)' }}>
      {metric === 'cgpa' ? value : `${value}${metric === 'arrears' ? '' : '%'}`}
    </td>
  );
};

const PlacementFunnel = ({ data }) => {
  const max = data[0]?.count || 1;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {data.map((stage, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '180px', fontSize: '12px', color: '#7a8aaa', textAlign: 'right' }}>{stage.stage}</div>
          <div style={{ flex: 1, height: '38px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ width: `${(stage.count / max) * 100}%`, height: '100%', background: stage.color, opacity: 0.85, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{stage.count}</span>
            </div>
          </div>
          <div style={{ width: '44px', fontSize: '12px', color: stage.color, fontWeight: '600' }}>{Math.round((stage.count / max) * 100)}%</div>
        </div>
      ))}
    </div>
  );
};

const SearchBar = ({ value, onChange, placeholder }) => (
  <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ padding: '10px 16px', background: '#243552', border: '1px solid rgba(99,179,237,0.15)', borderRadius: '10px', color: '#e8edf5', fontSize: '13px', outline: 'none', width: '260px' }} />
);

const FilterBtn = ({ label, active, onClick, color = '#63b3ed' }) => (
  <button onClick={onClick} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', background: active ? `${color}22` : 'rgba(255,255,255,0.04)', color: active ? color : '#7a8aaa' }}>
    {label}
  </button>
);

// ── MAIN ──────────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab]           = useState('overview');
  const [overview, setOverview]             = useState(null);
  const [alerts, setAlerts]                 = useState([]);
  const [dropoutRisk, setDropoutRisk]       = useState([]);
  const [heatmap, setHeatmap]               = useState([]);
  const [funnel, setFunnel]                 = useState([]);
  const [allStudents, setAllStudents]       = useState([]);
  const [allFaculty, setAllFaculty]         = useState([]);
  const [alertFilter, setAlertFilter]       = useState('all');
  const [studentSearch, setStudentSearch]   = useState('');
  const [studentDeptFilter, setStudentDeptFilter] = useState('all');
  const [facultySearch, setFacultySearch]   = useState('');
  const [facultyDeptFilter, setFacultyDeptFilter] = useState('all');
  const [loading, setLoading]               = useState(true);

  // Modal states
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddFaculty, setShowAddFaculty] = useState(false);
  const [deleteTarget, setDeleteTarget]     = useState(null); // { id, name, type }
  const [deleteLoading, setDeleteLoading]   = useState(false);
  const [toast, setToast]                   = useState(null); // { message, type }

  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [ov, dr, hm, fn, al, stu, fac] = await Promise.all([
          analyticsService.getOverview(),
          analyticsService.getDropoutRisk(),
          analyticsService.getHeatmap(),
          analyticsService.getPlacementFunnel(),
          analyticsService.getAlerts(),
          analyticsService.getAllStudents(),
          analyticsService.getAllFaculty(),
        ]);
        setOverview(ov); setDropoutRisk(dr); setHeatmap(hm);
        setFunnel(fn);   setAlerts(al);      setAllStudents(stu); setAllFaculty(fac);
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── DELETE HANDLERS ──
  const handleDeleteStudent = async () => {
    setDeleteLoading(true);
    try {
      const res = await apiDeleteStudent(deleteTarget.id);
      if (res.message && !res.message.includes('error')) {
        setAllStudents(prev => prev.filter(s => s.id !== deleteTarget.id));
        showToast(`Student "${deleteTarget.name}" deleted successfully`);
      } else {
        showToast(res.message || 'Delete failed', 'error');
      }
    } catch {
      showToast('Server error', 'error');
    }
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  const handleDeleteFaculty = async () => {
    setDeleteLoading(true);
    try {
      const res = await apiDeleteFaculty(deleteTarget.id);
      if (res.message && !res.message.includes('error')) {
        setAllFaculty(prev => prev.filter(f => f.id !== deleteTarget.id));
        showToast(`Faculty "${deleteTarget.name}" deleted successfully`);
      } else {
        showToast(res.message || 'Delete failed', 'error');
      }
    } catch {
      showToast('Server error', 'error');
    }
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  const filteredAlerts   = alertFilter === 'all' ? alerts : alerts.filter(a => a.type === alertFilter);
  const depts            = ['all', ...Array.from(new Set(allStudents.map(s => s.dept)))];
  const facDepts         = ['all', ...Array.from(new Set(allFaculty.map(f => f.dept)))];

  const filteredStudents = allStudents
    .filter(s => studentDeptFilter === 'all' || s.dept === studentDeptFilter)
    .filter(s => studentSearch === '' || s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.regNo.toLowerCase().includes(studentSearch.toLowerCase()));

  const filteredFaculty = allFaculty
    .filter(f => facultyDeptFilter === 'all' || f.dept === facultyDeptFilter)
    .filter(f => facultySearch === '' || f.name.toLowerCase().includes(facultySearch.toLowerCase()) || f.empId.toLowerCase().includes(facultySearch.toLowerCase()));

  const getRiskTrend         = (trend) => trend === 'worsening' ? { icon: '↑', color: '#fc8181' } : trend === 'improving' ? { icon: '↓', color: '#68d391' } : { icon: '→', color: '#f6ad55' };
  const getPlacementColor    = (s) => ({ Offer: '#68d391', Shortlisted: '#63b3ed', Applied: '#f6ad55', Rejected: '#fc8181' }[s] || '#7a8aaa');
  const getAttendanceColor   = (p) => p >= 85 ? '#68d391' : p >= 75 ? '#f6ad55' : '#fc8181';
  const getCgpaColor         = (c) => c >= 8.5 ? '#68d391' : c >= 7.0 ? '#63b3ed' : '#fc8181';
  const getDesignationColor  = (d) => d === 'Professor' ? '#9a75ea' : d === 'Associate Professor' ? '#63b3ed' : '#f6ad55';

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#1a2236', color: '#9a75ea', fontSize: '16px', gap: '12px' }}>
      <span style={{ fontSize: '24px' }}>⬡</span> Loading analytics...
    </div>
  );

  const navItems = [
    { id: 'overview', icon: '⬡',  label: 'Overview' },
    { id: 'students', icon: '🎓', label: 'All Students',    badge: allStudents.length },
    { id: 'faculty',  icon: '👨‍🏫', label: 'All Faculty',     badge: allFaculty.length },
    { id: 'alerts',   icon: '🔔', label: 'Alert Feed',      badge: alerts.filter(a => a.type === 'danger').length, badgeColor: '#fc8181' },
    { id: 'dropout',  icon: '🧠', label: 'Dropout Risk' },
    { id: 'heatmap',  icon: '🗺️', label: 'Dept Heatmap' },
    { id: 'funnel',   icon: '📊', label: 'Placement Funnel' },
  ];

  return (
    <div style={styles.page}>

      {/* ── MODALS ── */}
      {showAddStudent && (
        <AddStudentModal
          onClose={() => setShowAddStudent(false)}
          onSuccess={(msg) => { showToast(msg); }}
        />
      )}
      {showAddFaculty && (
        <AddFacultyModal
          onClose={() => setShowAddFaculty(false)}
          onSuccess={(msg) => { showToast(msg); }}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          name={deleteTarget.name}
          type={deleteTarget.type}
          onClose={() => setDeleteTarget(null)}
          onConfirm={deleteTarget.type === 'Student' ? handleDeleteStudent : handleDeleteFaculty}
          loading={deleteLoading}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarBrand}>● IIAE</div>
        <div style={styles.sidebarProfile}>
          <div style={styles.avatar}>A</div>
          <div>
            <div style={styles.profileName}>Admin</div>
            <div style={styles.profileReg}>Super Admin</div>
          </div>
        </div>
        <nav style={styles.nav}>
          {navItems.map(item => (
            <button key={item.id}
              style={{ ...styles.navItem, ...(activeTab === item.id ? styles.navItemActive : {}) }}
              onClick={() => setActiveTab(item.id)}
            >
              <span>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{ ...styles.badge, background: item.badgeColor || 'rgba(99,179,237,0.25)', color: item.badgeColor ? '#fff' : '#63b3ed' }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div style={styles.sidebarFooter}>
          <button style={styles.logoutBtn} onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); }}>
            ↩ Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={styles.main}>
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.pageTitle}>
              {activeTab === 'overview' && 'Institution Overview'}
              {activeTab === 'students' && 'All Students'}
              {activeTab === 'faculty'  && 'All Faculty'}
              {activeTab === 'alerts'   && 'Live Alert Feed'}
              {activeTab === 'dropout'  && 'Dropout Risk Analysis'}
              {activeTab === 'heatmap'  && 'Department Performance Heatmap'}
              {activeTab === 'funnel'   && 'Placement Funnel'}
            </h1>
            <p style={styles.pageSubtitle}>Super Admin · Full Institution Access</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={styles.adminBadge} onClick={() => setActiveTab('students')}>
              <span style={styles.adminBadgeNum}>{overview?.totalStudents}</span>
              <span style={styles.adminBadgeLabel}>Students</span>
            </div>
            <div style={{ ...styles.adminBadge, background: 'rgba(154,117,234,0.08)', border: '1px solid rgba(154,117,234,0.2)' }} onClick={() => setActiveTab('faculty')}>
              <span style={{ ...styles.adminBadgeNum, color: '#9a75ea' }}>{overview?.totalFaculty}</span>
              <span style={styles.adminBadgeLabel}>Faculty</span>
            </div>
            <div style={{ ...styles.adminBadge, background: 'rgba(252,129,129,0.08)', border: '1px solid rgba(252,129,129,0.2)' }} onClick={() => setActiveTab('alerts')}>
              <span style={{ ...styles.adminBadgeNum, color: '#fc8181' }}>{alerts.filter(a => a.type === 'danger').length}</span>
              <span style={styles.adminBadgeLabel}>Alerts</span>
            </div>
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && overview && (
          <div>
            <div style={styles.statsGrid}>
              {[
                { label: 'Total Students', value: overview.totalStudents, icon: '🎓', color: '#63b3ed', sub: 'All departments',   tab: 'students' },
                { label: 'Total Faculty',  value: overview.totalFaculty,  icon: '👨‍🏫', color: '#9a75ea', sub: 'Teaching staff',    tab: 'faculty'  },
                { label: 'Departments',    value: overview.departments,   icon: '🏛️', color: '#f6ad55', sub: 'UG + PG',           tab: null        },
                { label: 'Active Courses', value: overview.activeCourses, icon: '📚', color: '#68d391', sub: 'This semester',     tab: null        },
                { label: 'Placement Rate', value: `${overview.placementRate}%`, icon: '💼', color: '#68d391', sub: 'Final year avg', tab: 'funnel' },
                { label: 'Total Arrears',  value: overview.totalArrears,  icon: '⚠️', color: '#fc8181', sub: 'Pending clearance', tab: 'dropout'  },
                { label: 'On Internship',  value: overview.internships,   icon: '🏢', color: '#4fd1c5', sub: 'This semester',     tab: null        },
                { label: 'Ongoing Events', value: overview.ongoingEvents, icon: '🎯', color: '#f6ad55', sub: 'Hackathons & more', tab: null        },
              ].map((card, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${card.color}`, cursor: card.tab ? 'pointer' : 'default' }}
                  onClick={() => card.tab && setActiveTab(card.tab)}>
                  <div style={styles.statCardTop}>
                    <span style={styles.statCardIcon}>{card.icon}</span>
                    <span style={{ ...styles.statCardValue, color: card.color }}>{card.value}</span>
                  </div>
                  <div style={styles.statCardLabel}>{card.label}</div>
                  <div style={styles.statCardSub}>{card.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>🚨 Recent Critical Alerts</h2>
                {alerts.filter(a => a.type === 'danger').map((a, i) => (
                  <div key={i} style={styles.alertRow}>
                    <span style={{ fontSize: '20px' }}>{a.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#fc8181' }}>{a.title}</div>
                      <div style={{ fontSize: '12px', color: '#7a8aaa', marginTop: '2px' }}>{a.msg}</div>
                    </div>
                    <span style={{ fontSize: '11px', color: '#7a8aaa', whiteSpace: 'nowrap' }}>{a.time}</span>
                  </div>
                ))}
                <button style={styles.viewAllBtn} onClick={() => setActiveTab('alerts')}>View All Alerts →</button>
              </div>
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>🧠 Top At-Risk Students</h2>
                {dropoutRisk.filter(s => s.riskScore >= 60).map((s, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#e8edf5' }}>{s.name}</span>
                        <span style={{ fontSize: '11px', color: '#7a8aaa', marginLeft: '8px' }}>{s.regNo} · {s.dept}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: getRiskTrend(s.trend).color }}>{getRiskTrend(s.trend).icon} {s.trend}</span>
                    </div>
                    <RiskMeter score={s.riskScore} />
                  </div>
                ))}
                <button style={styles.viewAllBtn} onClick={() => setActiveTab('dropout')}>Full Risk Analysis →</button>
              </div>
            </div>
          </div>
        )}

        {/* ── ALL STUDENTS ── */}
        {activeTab === 'students' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Students', value: allStudents.length,                                       color: '#63b3ed' },
                { label: 'Active Arrears', value: allStudents.reduce((a, s) => a + s.arrears, 0),           color: '#f6ad55' },
                { label: 'Low Attendance', value: allStudents.filter(s => s.attendance < 75).length,        color: '#fc8181' },
                { label: 'Offers Received',value: allStudents.filter(s => s.placement === 'Offer').length,  color: '#68d391' },
              ].map((c, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${c.color}` }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: c.color }}>{c.value}</div>
                  <div style={styles.statCardLabel}>{c.label}</div>
                </div>
              ))}
            </div>

            <div style={styles.section}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Student Directory ({filteredStudents.length})</h2>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <SearchBar value={studentSearch} onChange={setStudentSearch} placeholder="Search name or reg no..." />
                  {depts.map(d => <FilterBtn key={d} label={d === 'all' ? 'All Depts' : d} active={studentDeptFilter === d} onClick={() => setStudentDeptFilter(d)} />)}
                  {/* ── ADD STUDENT BUTTON ── */}
                  <button onClick={() => setShowAddStudent(true)} style={styles.addBtn}>
                    + Add Student
                  </button>
                </div>
              </div>

              <table style={styles.table}>
                <thead>
                  <tr>{['Reg No','Name','Dept','Batch','Year','CGPA','Attendance','Arrears','Placement','Action'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0
                    ? <tr><td colSpan={10} style={{ ...styles.td, textAlign: 'center', color: '#7a8aaa', padding: '32px' }}>No students found</td></tr>
                    : filteredStudents.map((s, i) => (
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
                        {/* ── DELETE BUTTON ── */}
                        <td style={styles.td}>
                          <button onClick={() => setDeleteTarget({ id: s.id, name: s.name, type: 'Student' })} style={styles.deleteBtn}>
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ALL FACULTY ── */}
        {activeTab === 'faculty' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Faculty',    value: allFaculty.length,                                                      color: '#9a75ea' },
                { label: 'Professors',        value: allFaculty.filter(f => f.designation === 'Professor').length,           color: '#63b3ed' },
                { label: 'Assoc. Professors', value: allFaculty.filter(f => f.designation === 'Associate Professor').length, color: '#f6ad55' },
                { label: 'Asst. Professors',  value: allFaculty.filter(f => f.designation === 'Assistant Professor').length, color: '#68d391' },
              ].map((c, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${c.color}` }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: c.color }}>{c.value}</div>
                  <div style={styles.statCardLabel}>{c.label}</div>
                </div>
              ))}
            </div>

            <div style={styles.section}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Faculty Directory ({filteredFaculty.length})</h2>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <SearchBar value={facultySearch} onChange={setFacultySearch} placeholder="Search name or emp ID..." />
                  {facDepts.map(d => <FilterBtn key={d} label={d === 'all' ? 'All Depts' : d} active={facultyDeptFilter === d} onClick={() => setFacultyDeptFilter(d)} color="#9a75ea" />)}
                  {/* ── ADD FACULTY BUTTON ── */}
                  <button onClick={() => setShowAddFaculty(true)} style={{ ...styles.addBtn, background: 'linear-gradient(135deg, #9a75ea, #7c5cbf)' }}>
                    + Add Faculty
                  </button>
                </div>
              </div>

              <table style={styles.table}>
                <thead>
                  <tr>{['Emp ID','Name','Department','Designation','Experience','Subjects','Email','Action'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filteredFaculty.length === 0
                    ? <tr><td colSpan={8} style={{ ...styles.td, textAlign: 'center', color: '#7a8aaa', padding: '32px' }}>No faculty found</td></tr>
                    : filteredFaculty.map((f, i) => (
                      <tr key={i} style={styles.tr}>
                        <td style={{ ...styles.td, color: '#7a8aaa', fontSize: '13px' }}>{f.empId}</td>
                        <td style={{ ...styles.td, fontWeight: '600' }}>{f.name}</td>
                        <td style={{ ...styles.td, color: '#63b3ed' }}>{f.dept}</td>
                        <td style={styles.td}>
                          <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', background: `${getDesignationColor(f.designation)}22`, color: getDesignationColor(f.designation) }}>
                            {f.designation}
                          </span>
                        </td>
                        <td style={{ ...styles.td, color: '#9a75ea' }}>{f.experience}</td>
                        <td style={{ ...styles.td, color: '#f6ad55', fontWeight: '600' }}>{f.subjects}</td>
                        <td style={{ ...styles.td, color: '#7a8aaa', fontSize: '13px' }}>{f.email}</td>
                        {/* ── DELETE BUTTON ── */}
                        <td style={styles.td}>
                          <button onClick={() => setDeleteTarget({ id: f.id, name: f.name, type: 'Faculty' })} style={styles.deleteBtn}>
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ALERT FEED ── */}
        {activeTab === 'alerts' && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {['all', 'danger', 'warning', 'info'].map(f => (
                <button key={f} onClick={() => setAlertFilter(f)} style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', background: alertFilter === f ? 'rgba(154,117,234,0.15)' : 'rgba(255,255,255,0.05)', color: alertFilter === f ? '#9a75ea' : '#7a8aaa' }}>
                  {f === 'all' ? 'All' : f === 'danger' ? '🚨 Critical' : f === 'warning' ? '⚠️ Warning' : 'ℹ️ Info'}
                </button>
              ))}
            </div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Alert Feed — {filteredAlerts.length} alerts</h2>
              {filteredAlerts.map((a, i) => (
                <div key={i} style={{ ...styles.alertRowFull, borderLeft: `3px solid ${a.type === 'danger' ? '#fc8181' : a.type === 'warning' ? '#f6ad55' : '#63b3ed'}` }}>
                  <span style={{ fontSize: '22px' }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: a.type === 'danger' ? '#fc8181' : a.type === 'warning' ? '#f6ad55' : '#63b3ed' }}>{a.title}</span>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(99,179,237,0.1)', color: '#63b3ed' }}>{a.dept}</span>
                        <span style={{ fontSize: '11px', color: '#7a8aaa' }}>{a.time}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: '#b0bcd4' }}>{a.msg}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DROPOUT RISK ── */}
        {activeTab === 'dropout' && (
          <div>
            <div style={{ ...styles.infoBox, marginBottom: '20px' }}>
              <span style={{ fontSize: '22px' }}>🧠</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#fc8181', marginBottom: '4px' }}>How Dropout Risk Score Works</div>
                <div style={{ fontSize: '13px', color: '#b0bcd4', lineHeight: '1.6' }}>
                  Score computed from <strong style={{ color: '#e8edf5' }}>Attendance (40%)</strong> + <strong style={{ color: '#e8edf5' }}>Arrear Count (35%)</strong> + <strong style={{ color: '#e8edf5' }}>CGPA (25%)</strong>.
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'High Risk',   value: dropoutRisk.filter(s => s.riskScore >= 70).length,                    color: '#fc8181' },
                { label: 'Medium Risk', value: dropoutRisk.filter(s => s.riskScore >= 40 && s.riskScore < 70).length,color: '#f6ad55' },
                { label: 'Low Risk',    value: dropoutRisk.filter(s => s.riskScore < 40).length,                     color: '#68d391' },
              ].map((c, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${c.color}` }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: c.color }}>{c.value}</div>
                  <div style={styles.statCardLabel}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Student Risk Analysis</h2>
              <table style={styles.table}>
                <thead>
                  <tr>{['Student','Dept','CGPA','Attendance','Arrears','Risk Score','Trend'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[...dropoutRisk].sort((a, b) => b.riskScore - a.riskScore).map((s, i) => {
                    const { icon, color } = getRiskTrend(s.trend);
                    return (
                      <tr key={i} style={styles.tr}>
                        <td style={styles.td}><div style={{ fontWeight: '600' }}>{s.name}</div><div style={{ fontSize: '11px', color: '#7a8aaa' }}>{s.regNo}</div></td>
                        <td style={{ ...styles.td, color: '#63b3ed' }}>{s.dept}</td>
                        <td style={{ ...styles.td, color: s.cgpa >= 7.5 ? '#68d391' : s.cgpa >= 6.5 ? '#f6ad55' : '#fc8181', fontWeight: '600' }}>{s.cgpa}</td>
                        <td style={{ ...styles.td, color: s.attendance >= 75 ? '#68d391' : '#fc8181', fontWeight: '600' }}>{s.attendance}%</td>
                        <td style={{ ...styles.td, color: s.arrears > 0 ? '#f6ad55' : '#68d391', fontWeight: '600' }}>{s.arrears}</td>
                        <td style={{ ...styles.td, minWidth: '220px' }}><RiskMeter score={s.riskScore} /></td>
                        <td style={{ ...styles.td, color, fontWeight: '700' }}>{icon} {s.trend}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── HEATMAP ── */}
        {activeTab === 'heatmap' && (
          <div>
            <div style={{ ...styles.infoBox, marginBottom: '20px', borderColor: 'rgba(99,179,237,0.15)', background: 'rgba(99,179,237,0.05)' }}>
              <span style={{ fontSize: '20px' }}>🗺️</span>
              <div style={{ fontSize: '13px', color: '#b0bcd4' }}>
                <strong style={{ color: '#e8edf5' }}>How to read:</strong> Green = better · Red = needs attention.
              </div>
            </div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Department Performance Heatmap</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ ...styles.table, borderCollapse: 'separate', borderSpacing: '3px' }}>
                  <thead>
                    <tr>
                      <th style={{ ...styles.th, textAlign: 'left' }}>Department</th>
                      <th style={{ ...styles.th, textAlign: 'center' }}>Avg CGPA</th>
                      <th style={{ ...styles.th, textAlign: 'center' }}>Attendance %</th>
                      <th style={{ ...styles.th, textAlign: 'center' }}>Arrear Count</th>
                      <th style={{ ...styles.th, textAlign: 'center' }}>Placement %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {heatmap.map((row, i) => (
                      <tr key={i}>
                        <td style={{ ...styles.td, fontWeight: '700', color: '#f6ad55' }}>{row.dept}</td>
                        <HeatCell value={row.cgpa} metric="cgpa" />
                        <HeatCell value={row.attendance} metric="attendance" />
                        <HeatCell value={row.arrears} metric="arrears" />
                        <HeatCell value={row.placement} metric="placement" />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── FUNNEL ── */}
        {activeTab === 'funnel' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '12px', marginBottom: '24px' }}>
              {funnel.map((stage, i) => (
                <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${stage.color}` }}>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: stage.color }}>{stage.count}</div>
                  <div style={{ fontSize: '12px', color: '#7a8aaa', marginTop: '4px' }}>{stage.stage}</div>
                </div>
              ))}
            </div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Placement Conversion Funnel</h2>
              <PlacementFunnel data={funnel} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── STYLES ────────────────────────────────────────────────────────────────────
const styles = {
  page:           { display: 'flex', minHeight: '100vh', background: '#1a2236', color: '#e8edf5' },
  sidebar:        { width: '240px', minHeight: '100vh', background: '#1e2d45', borderRight: '1px solid rgba(154,117,234,0.2)', display: 'flex', flexDirection: 'column', padding: '28px 16px', position: 'fixed', top: 0, left: 0 },
  sidebarBrand:   { fontSize: '11px', fontWeight: '700', letterSpacing: '0.2em', color: '#9a75ea', textTransform: 'uppercase', marginBottom: '32px', paddingLeft: '8px' },
  sidebarProfile: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 12px', background: 'rgba(154,117,234,0.07)', borderRadius: '12px', marginBottom: '32px', border: '1px solid rgba(154,117,234,0.15)' },
  avatar:         { width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #9a75ea, #63b3ed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#fff', flexShrink: 0 },
  profileName:    { fontSize: '14px', fontWeight: '600', color: '#e8edf5' },
  profileReg:     { fontSize: '12px', color: '#7a8aaa', marginTop: '2px' },
  nav:            { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
  navItem:        { display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#7a8aaa', fontSize: '14px', cursor: 'pointer', textAlign: 'left' },
  navItemActive:  { background: 'rgba(154,117,234,0.12)', color: '#9a75ea' },
  badge:          { fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '99px', marginLeft: 'auto' },
  sidebarFooter:  { marginTop: 'auto', paddingTop: '16px' },
  logoutBtn:      { width: '100%', padding: '10px', border: '1px solid rgba(252,129,129,0.2)', borderRadius: '10px', background: 'rgba(252,129,129,0.05)', color: '#fc8181', fontSize: '13px', cursor: 'pointer' },
  main:           { marginLeft: '240px', flex: 1, padding: '36px 40px' },
  topbar:         { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', paddingBottom: '24px', borderBottom: '1px solid rgba(154,117,234,0.1)' },
  pageTitle:      { fontSize: '26px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.01em' },
  pageSubtitle:   { fontSize: '14px', color: '#7a8aaa' },
  adminBadge:     { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', padding: '12px 18px', background: 'rgba(99,179,237,0.08)', borderRadius: '14px', border: '1px solid rgba(99,179,237,0.2)', cursor: 'pointer', minWidth: '76px' },
  adminBadgeNum:  { fontSize: '22px', fontWeight: '800', color: '#63b3ed' },
  adminBadgeLabel:{ fontSize: '10px', color: '#7a8aaa', textTransform: 'uppercase', letterSpacing: '0.08em' },
  statsGrid:      { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
  statCard:       { background: '#1e2d45', borderRadius: '14px', padding: '20px', border: '1px solid rgba(99,179,237,0.08)' },
  statCardTop:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  statCardIcon:   { fontSize: '20px' },
  statCardValue:  { fontSize: '26px', fontWeight: '800' },
  statCardLabel:  { fontSize: '14px', fontWeight: '600', color: '#e8edf5', marginBottom: '4px' },
  statCardSub:    { fontSize: '12px', color: '#7a8aaa' },
  section:        { background: '#1e2d45', borderRadius: '16px', padding: '28px', border: '1px solid rgba(99,179,237,0.08)' },
  sectionTitle:   { fontSize: '17px', fontWeight: '700', marginBottom: '20px', color: '#e8edf5' },
  alertRow:       { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', borderBottom: '1px solid rgba(99,179,237,0.06)' },
  alertRowFull:   { display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', marginBottom: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' },
  viewAllBtn:     { marginTop: '16px', padding: '8px 16px', background: 'rgba(154,117,234,0.08)', border: '1px solid rgba(154,117,234,0.15)', borderRadius: '8px', color: '#9a75ea', fontSize: '13px', cursor: 'pointer' },
  infoBox:        { display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px 20px', background: 'rgba(252,129,129,0.05)', border: '1px solid rgba(252,129,129,0.15)', borderRadius: '12px' },
  table:          { width: '100%', borderCollapse: 'collapse' },
  th:             { padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#7a8aaa', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(99,179,237,0.08)' },
  tr:             { borderBottom: '1px solid rgba(99,179,237,0.05)' },
  td:             { padding: '14px 16px', fontSize: '14px', color: '#e8edf5' },

  // New styles for add/delete
  addBtn:         { padding: '9px 18px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700', background: 'linear-gradient(135deg, #63b3ed, #3a7bd5)', color: '#fff' },
  deleteBtn:      { padding: '6px 10px', borderRadius: '7px', border: '1px solid rgba(252,129,129,0.2)', background: 'rgba(252,129,129,0.08)', color: '#fc8181', fontSize: '14px', cursor: 'pointer' },

  // Modal styles
  modalOverlay:   { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modalBox:       { background: '#1e2d45', borderRadius: '18px', border: '1px solid rgba(99,179,237,0.15)', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '28px' },
  modalHeader:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  modalTitle:     { fontSize: '18px', fontWeight: '700', color: '#e8edf5' },
  modalClose:     { background: 'none', border: 'none', color: '#7a8aaa', fontSize: '18px', cursor: 'pointer' },
  modalFooter:    { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(99,179,237,0.08)' },
  formLabel:      { display: 'block', fontSize: '12px', fontWeight: '600', color: '#7a8aaa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' },
  formInput:      { width: '100%', padding: '10px 14px', background: '#243552', border: '1px solid rgba(99,179,237,0.15)', borderRadius: '9px', color: '#e8edf5', fontSize: '13px', outline: 'none' },
  cancelBtn:      { padding: '10px 20px', borderRadius: '9px', border: '1px solid rgba(99,179,237,0.15)', background: 'transparent', color: '#7a8aaa', fontSize: '13px', cursor: 'pointer' },
  submitBtn:      { padding: '10px 24px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700', background: 'linear-gradient(135deg, #63b3ed, #3a7bd5)', color: '#fff' },
  errorBox:       { padding: '12px 16px', background: 'rgba(252,129,129,0.1)', border: '1px solid rgba(252,129,129,0.3)', borderRadius: '9px', color: '#fc8181', fontSize: '13px', marginBottom: '16px' },
  infoNote:       { padding: '12px 16px', background: 'rgba(104,211,145,0.06)', border: '1px solid rgba(104,211,145,0.15)', borderRadius: '9px', color: '#68d391', fontSize: '12px', marginTop: '4px' },
};

export default AdminDashboard;