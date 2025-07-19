// Mock user data for LMS
// Roles: admin, manager, instructor, learner
// manager_id: null for top-level, otherwise points to manager's user id
// instructor_flag: true if user is an instructor
// username and password fields are added for demo login

export const users = [
  { id: 1, name: 'Alice Admin', role: 'admin', manager_id: null, instructor_flag: false, username: 'admin', password: 'admin123' },
  { id: 2, name: 'Bob Manager', role: 'manager', manager_id: 1, instructor_flag: true, username: 'instructor', password: 'instructor123' }, // instructor
  { id: 3, name: 'Carol Manager', role: 'manager', manager_id: 1, instructor_flag: true, username: 'manager', password: 'manager123' }, // manager-level learner
  { id: 4, name: 'Dave Manager', role: 'manager', manager_id: 2, instructor_flag: false, username: 'manager2', password: 'manager2123' },
  { id: 5, name: 'Eve Manager', role: 'manager', manager_id: 2, instructor_flag: false, username: 'manager3', password: 'manager3123' },
  { id: 6, name: 'Frank Manager', role: 'manager', manager_id: 3, instructor_flag: false, username: 'manager4', password: 'manager4123' },
  { id: 7, name: 'Grace Learner', role: 'learner', manager_id: 4, instructor_flag: false, username: 'learner', password: 'learner123' }, // regular learner
  { id: 8, name: 'Heidi Learner', role: 'learner', manager_id: 4, instructor_flag: false, username: 'learner2', password: 'learner2123' },
  { id: 9, name: 'Ivan Learner', role: 'learner', manager_id: 5, instructor_flag: false, username: 'learner3', password: 'learner3123' },
  { id: 10, name: 'Judy Learner', role: 'learner', manager_id: 6, instructor_flag: false, username: 'learner4', password: 'learner4123' },
]; 