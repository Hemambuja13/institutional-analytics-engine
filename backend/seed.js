require('dotenv').config();
const mysql  = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const config = {
  host:     process.env.DB_HOST || 'localhost',
  port:     process.env.DB_PORT || 3306,
  user:     process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'iiae_db',
  multipleStatements: true
};

const departments = [
  { name: 'Computer Science & Engineering', code: 'CSE', hod: 'Dr. Ramesh Kumar', type: 'Both' },
  { name: 'Information Technology',         code: 'IT',  hod: 'Dr. Priya Nair',   type: 'UG'   },
  { name: 'Electronics & Communication',    code: 'ECE', hod: 'Dr. Anand Raj',    type: 'Both' },
  { name: 'Electrical Engineering',         code: 'EEE', hod: 'Dr. Kavitha S',    type: 'UG'   },
  { name: 'Mechanical Engineering',         code: 'MECH',hod: 'Dr. Suresh P',     type: 'UG'   },
  { name: 'Civil Engineering',              code: 'CIVIL',hod:'Dr. Mala T',        type: 'UG'   },
];

const students = [
  { reg_no:'CS21001', name:'Hema S',     email:'hema@student.iiae.edu',   dept:1, sem:'7th', cgpa:8.2, att:82, arr:0, ps:'Placed'     },
  { reg_no:'CS21002', name:'Vikram R',   email:'vikram@student.iiae.edu', dept:1, sem:'7th', cgpa:6.1, att:65, arr:3, ps:'Not Placed'  },
  { reg_no:'CS21003', name:'Priya M',    email:'priya@student.iiae.edu',  dept:1, sem:'7th', cgpa:7.8, att:78, arr:1, ps:'In Progress' },
  { reg_no:'CS21004', name:'Arjun K',    email:'arjun@student.iiae.edu',  dept:1, sem:'7th', cgpa:5.5, att:58, arr:5, ps:'Not Placed'  },
  { reg_no:'IT21001', name:'Sneha T',    email:'sneha@student.iiae.edu',  dept:2, sem:'7th', cgpa:8.9, att:91, arr:0, ps:'Placed'      },
  { reg_no:'IT21002', name:'Karthik V',  email:'karthik@student.iiae.edu',dept:2, sem:'7th', cgpa:7.2, att:72, arr:2, ps:'In Progress' },
  { reg_no:'EC21001', name:'Divya N',    email:'divya@student.iiae.edu',  dept:3, sem:'7th', cgpa:8.0, att:85, arr:0, ps:'Placed'      },
  { reg_no:'EC21002', name:'Rahul S',    email:'rahul@student.iiae.edu',  dept:3, sem:'7th', cgpa:6.8, att:70, arr:2, ps:'Not Placed'  },
  { reg_no:'EE21001', name:'Meena R',    email:'meena@student.iiae.edu',  dept:4, sem:'7th', cgpa:7.5, att:80, arr:1, ps:'In Progress' },
  { reg_no:'ME21001', name:'Suresh B',   email:'sureshb@student.iiae.edu',dept:5, sem:'7th', cgpa:6.0, att:62, arr:4, ps:'Not Placed'  },
  { reg_no:'CS22001', name:'Aisha F',    email:'aisha@student.iiae.edu',  dept:1, sem:'5th', cgpa:9.0, att:95, arr:0, ps:'Not Placed'  },
  { reg_no:'CS22002', name:'Dev P',      email:'devp@student.iiae.edu',   dept:1, sem:'5th', cgpa:5.2, att:55, arr:6, ps:'Not Placed'  },
  { reg_no:'IT22001', name:'Rani K',     email:'rani@student.iiae.edu',   dept:2, sem:'5th', cgpa:8.4, att:88, arr:0, ps:'Not Placed'  },
  { reg_no:'EC22001', name:'Arun M',     email:'arunm@student.iiae.edu',  dept:3, sem:'5th', cgpa:7.1, att:75, arr:1, ps:'Not Placed'  },
  { reg_no:'CS21005', name:'Lakshmi G',  email:'lakshmi@student.iiae.edu',dept:1, sem:'7th', cgpa:8.7, att:89, arr:0, ps:'Placed'      },
  { reg_no:'ME22001', name:'Bala S',     email:'bala@student.iiae.edu',   dept:5, sem:'5th', cgpa:5.8, att:60, arr:3, ps:'Not Placed'  },
];

const facultyData = [
  { emp_id:'FAC001', name:'Dr. Priya Nair',    email:'priya@iiae.edu',   dept:1, desig:'Professor',           exp:15 },
  { emp_id:'FAC002', name:'Dr. Kumar R',       email:'kumar@iiae.edu',   dept:1, desig:'Associate Professor', exp:10 },
  { emp_id:'FAC003', name:'Mrs. Anitha S',     email:'anitha@iiae.edu',  dept:1, desig:'Assistant Professor', exp:6  },
  { emp_id:'FAC004', name:'Mr. Rajesh M',      email:'rajesh@iiae.edu',  dept:2, desig:'Assistant Professor', exp:4  },
  { emp_id:'FAC005', name:'Dr. Kavya T',       email:'kavya@iiae.edu',   dept:2, desig:'Associate Professor', exp:8  },
  { emp_id:'FAC006', name:'Dr. Anand Raj',     email:'anand@iiae.edu',   dept:3, desig:'Professor',           exp:18 },
  { emp_id:'FAC007', name:'Mrs. Deepa V',      email:'deepa@iiae.edu',   dept:3, desig:'Assistant Professor', exp:5  },
  { emp_id:'FAC008', name:'Dr. Kavitha S',     email:'kavitha@iiae.edu', dept:4, desig:'Professor',           exp:12 },
  { emp_id:'FAC009', name:'Mr. Ramesh P',      email:'rameshp@iiae.edu', dept:5, desig:'Associate Professor', exp:9  },
  { emp_id:'FAC010', name:'Mrs. Geetha L',     email:'geetha@iiae.edu',  dept:6, desig:'Assistant Professor', exp:3  },
  { emp_id:'FAC011', name:'Dr. Sundar K',      email:'sundar@iiae.edu',  dept:1, desig:'Associate Professor', exp:11 },
  { emp_id:'FAC012', name:'Mrs. Viji M',       email:'viji@iiae.edu',    dept:2, desig:'Assistant Professor', exp:2  },
];

async function seed() {
  const conn = await mysql.createConnection(config);
  console.log('✅ Connected to MySQL\n');

  const hash = async (p) => bcrypt.hash(p, 10);

  // Departments
  await conn.query('DELETE FROM departments');
  for (const d of departments) {
    await conn.query('INSERT INTO departments (name,code,hod,type) VALUES (?,?,?,?)',
      [d.name, d.code, d.hod, d.type]);
  }
  console.log('✅ Departments seeded');

  // Batches
  await conn.query('DELETE FROM batches');
  for (let deptId = 1; deptId <= 6; deptId++) {
    await conn.query('INSERT INTO batches (dept_id,year_range,current_sem,type) VALUES (?,?,?,?)',
      [deptId, '2021-2025', '7th Semester', 'UG']);
    await conn.query('INSERT INTO batches (dept_id,year_range,current_sem,type) VALUES (?,?,?,?)',
      [deptId, '2022-2026', '5th Semester', 'UG']);
  }
  console.log('✅ Batches seeded');

  // Students
  await conn.query('DELETE FROM students');
  for (const s of students) {
    await conn.query(
      `INSERT INTO students (reg_no,name,email,dept_id,batch_id,current_sem,cgpa,attendance,arrears,placement_status)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [s.reg_no, s.name, s.email, s.dept, s.sem==='7th'?(s.dept*2-1):(s.dept*2),
       s.sem+' Semester', s.cgpa, s.att, s.arr, s.ps]
    );
  }
  console.log('✅ Students seeded');

  // Faculty
  await conn.query('DELETE FROM faculty');
  for (const f of facultyData) {
    await conn.query(
      'INSERT INTO faculty (emp_id,name,email,dept_id,designation,experience) VALUES (?,?,?,?,?,?)',
      [f.emp_id, f.name, f.email, f.dept, f.desig, f.exp]
    );
  }
  console.log('✅ Faculty seeded');

  // Users
  await conn.query('DELETE FROM users');
  // Admin
  await conn.query('INSERT INTO users (email,password,role,ref_id) VALUES (?,?,?,?)',
    ['admin@iiae.edu', await hash('admin123'), 'admin', null]);

  // Student users
  const [studentRows] = await conn.query('SELECT id, email FROM students');
  for (const s of studentRows) {
    await conn.query('INSERT INTO users (email,password,role,ref_id) VALUES (?,?,?,?)',
      [s.email, await hash('password123'), 'student', s.id]);
  }

  // Faculty users
  const [facRows] = await conn.query('SELECT id, email FROM faculty');
  for (const f of facRows) {
    await conn.query('INSERT INTO users (email,password,role,ref_id) VALUES (?,?,?,?)',
      [f.email, await hash('password123'), 'faculty', f.id]);
  }
  console.log('✅ Users seeded');

  // Subjects for first student (Hema)
  await conn.query('DELETE FROM subjects');
  const [hema] = await conn.query("SELECT id FROM students WHERE reg_no='CS21001'");
  const hemaId = hema[0]?.id;
  if (hemaId) {
    const subs = [
      ['CS601','Data Mining',88,85],['CS602','Cloud Computing',91,90],
      ['CS603','Machine Learning',76,78],['CS604','Deep Learning',82,80],
      ['CS605','Project Work',95,95],['CS606','Professional Ethics',89,92]
    ];
    for (const [code,name,marks,att] of subs) {
      await conn.query(
        'INSERT INTO subjects (student_id,subject_code,subject_name,marks,max_marks,subject_attendance,semester) VALUES (?,?,?,?,100,?,?)',
        [hemaId, code, name, marks, att, '7th Semester']);
    }
  }
  console.log('✅ Subjects seeded');

  // Arrears for Vikram (CS21002)
  await conn.query('DELETE FROM arrear_details');
  const [vikram] = await conn.query("SELECT id FROM students WHERE reg_no='CS21002'");
  const vikramId = vikram[0]?.id;
  if (vikramId) {
    await conn.query('INSERT INTO arrear_details (student_id,subject_code,subject_name,semester,attempts,status) VALUES (?,?,?,?,?,?)',
      [vikramId,'CS501','Operating Systems','5th Semester',2,'Pending']);
    await conn.query('INSERT INTO arrear_details (student_id,subject_code,subject_name,semester,attempts,status) VALUES (?,?,?,?,?,?)',
      [vikramId,'CS502','DBMS','5th Semester',1,'Pending']);
    await conn.query('INSERT INTO arrear_details (student_id,subject_code,subject_name,semester,attempts,status,cleared_on) VALUES (?,?,?,?,?,?,?)',
      [vikramId,'MA401','Mathematics IV','4th Semester',2,'Cleared','Nov 2023']);
  }
  console.log('✅ Arrears seeded');

  // Placement details
  await conn.query('DELETE FROM placement_details');
  const [hemaP] = await conn.query("SELECT id FROM students WHERE reg_no='CS21001'");
  if (hemaP[0]) {
    await conn.query('INSERT INTO placement_details (student_id,company,role,applied_date,package,status) VALUES (?,?,?,?,?,?)',
      [hemaP[0].id,'TCS','Software Engineer','2024-01-15','7.5 LPA','Offer']);
    await conn.query('INSERT INTO placement_details (student_id,company,role,applied_date,package,status) VALUES (?,?,?,?,?,?)',
      [hemaP[0].id,'Infosys','System Engineer','2024-01-10','6.5 LPA','Offer']);
  }
  const [snehaP] = await conn.query("SELECT id FROM students WHERE reg_no='IT21001'");
  if (snehaP[0]) {
    await conn.query('INSERT INTO placement_details (student_id,company,role,applied_date,package,status) VALUES (?,?,?,?,?,?)',
      [snehaP[0].id,'Wipro','Developer','2024-02-01','8 LPA','Offer']);
  }
  const [priyaP] = await conn.query("SELECT id FROM students WHERE reg_no='CS21003'");
  if (priyaP[0]) {
    await conn.query('INSERT INTO placement_details (student_id,company,role,applied_date,package,status) VALUES (?,?,?,?,?,?)',
      [priyaP[0].id,'Cognizant','Analyst','2024-02-10','6 LPA','Shortlisted']);
    await conn.query('INSERT INTO placement_details (student_id,company,role,applied_date,package,status) VALUES (?,?,?,?,?,?)',
      [priyaP[0].id,'HCL','Developer','2024-01-20','5.5 LPA','Applied']);
  }
  console.log('✅ Placement details seeded');

  await conn.end();
  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📋 Login credentials:');
  console.log('   Admin   → admin@iiae.edu     / admin123');
  console.log('   Student → hema@student.iiae.edu / password123');
  console.log('   Faculty → priya@iiae.edu     / password123');
}

seed().catch(err => { console.error('❌ Seed error:', err.message); process.exit(1); });