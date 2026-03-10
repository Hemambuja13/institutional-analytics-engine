CREATE DATABASE IF NOT EXISTS iiae_db;
USE iiae_db;

CREATE TABLE IF NOT EXISTS departments (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  code     VARCHAR(20)  NOT NULL,
  hod      VARCHAR(100),
  type     ENUM('UG','PG','Both') DEFAULT 'UG'
);

CREATE TABLE IF NOT EXISTS batches (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  dept_id     INT NOT NULL,
  year_range  VARCHAR(20) NOT NULL,
  current_sem VARCHAR(20) NOT NULL,
  type        ENUM('UG','PG') NOT NULL,
  FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS students (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  reg_no          VARCHAR(20) UNIQUE NOT NULL,
  name            VARCHAR(100) NOT NULL,
  email           VARCHAR(100) UNIQUE NOT NULL,
  dept_id         INT,
  batch_id        INT,
  current_sem     VARCHAR(20),
  cgpa            DECIMAL(4,2) DEFAULT 0.00,
  attendance      INT DEFAULT 0,
  arrears         INT DEFAULT 0,
  placement_status ENUM('Placed','Not Placed','In Progress') DEFAULT 'Not Placed',
  phone           VARCHAR(15),
  address         TEXT,
  FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE SET NULL,
  FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS faculty (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  emp_id      VARCHAR(20) UNIQUE NOT NULL,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(100) UNIQUE NOT NULL,
  dept_id     INT,
  designation VARCHAR(100),
  phone       VARCHAR(15),
  experience  INT DEFAULT 0,
  FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS users (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  email    VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role     ENUM('student','faculty','admin') NOT NULL,
  ref_id   INT
);

CREATE TABLE IF NOT EXISTS subjects (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  student_id         INT NOT NULL,
  subject_name       VARCHAR(100) NOT NULL,
  subject_code       VARCHAR(20)  NOT NULL,
  marks              INT DEFAULT 0,
  max_marks          INT DEFAULT 100,
  subject_attendance INT DEFAULT 0,
  semester           VARCHAR(20),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS arrear_details (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  student_id   INT NOT NULL,
  subject_code VARCHAR(20)  NOT NULL,
  subject_name VARCHAR(100) NOT NULL,
  semester     VARCHAR(20),
  attempts     INT DEFAULT 1,
  status       ENUM('Cleared','Pending') DEFAULT 'Pending',
  cleared_on   VARCHAR(30),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS placement_details (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  student_id   INT NOT NULL,
  company      VARCHAR(100) NOT NULL,
  role         VARCHAR(100),
  applied_date VARCHAR(30),
  package      VARCHAR(30),
  status       ENUM('Offer','Shortlisted','Applied','Rejected') DEFAULT 'Applied',
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS events (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  batch_id    INT NOT NULL,
  title       VARCHAR(200) NOT NULL,
  event_date  VARCHAR(50),
  FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
);