const BASE_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

// ── AUTH ─────────────────────────────────────────────────────────────────────
export const loginUser = async (email, password, role) => {
  try {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    // Verify role matches
    if (data.role !== role) {
      return { success: false, message: `This account is not a ${role} account` };
    }
    return { success: true, token: data.token, user: data.profile, role: data.role };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// ── STUDENT ──────────────────────────────────────────────────────────────────
export const getStudentProfile = async (id) => {
  try {
    const data = await request(`/students/${id}`);
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// ── ANALYTICS ────────────────────────────────────────────────────────────────
export const getOverview = async () => {
  try {
    const data = await request('/analytics/overview');
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const getDropoutRisk = async () => {
  try {
    const data = await request('/analytics/dropout-risk');
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const getHeatmap = async () => {
  try {
    const data = await request('/analytics/heatmap');
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const getPlacementFunnel = async () => {
  try {
    const data = await request('/analytics/placement-funnel');
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const getAlerts = async () => {
  try {
    const data = await request('/analytics/alerts');
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// ── ALL STUDENTS / FACULTY ────────────────────────────────────────────────────
export const getAllStudents = async () => {
  try {
    const data = await request('/students');
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const getAllFaculty = async () => {
  try {
    const data = await request('/faculty');
    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};