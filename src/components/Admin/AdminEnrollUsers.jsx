import { useState, useRef } from 'react';
import { users } from '../../mock/users';

export default function AdminEnrollUsers() {
  const [activeTab, setActiveTab] = useState('single');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'learner',
    managerId: '',
    instructorFlag: false,
    department: '',
    position: '',
    startDate: '',
    courses: []
  });
  const [bulkUsers, setBulkUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('learner');
  const fileInputRef = useRef(null);

  // Mock courses data
  const availableCourses = [
    { id: 1, name: 'Leadership Fundamentals', category: 'Management' },
    { id: 2, name: 'Project Management', category: 'Management' },
    { id: 3, name: 'Communication Skills', category: 'Soft Skills' },
    { id: 4, name: 'Technical Writing', category: 'Professional Skills' },
    { id: 5, name: 'Data Analysis', category: 'Technical' },
    { id: 6, name: 'Team Collaboration', category: 'Soft Skills' }
  ];

  // Mock departments
  const departments = [
    'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'IT', 'Product'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        const users = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim() || '';
            return obj;
          }, {});
        }).filter(user => user.firstName && user.lastName && user.email);
        setBulkUsers(users);
      };
      reader.readAsText(file);
    }
  };

  const handleSingleEnrollment = (e) => {
    e.preventDefault();
    // Mock enrollment logic
    console.log('Enrolling user:', formData);
    alert('User enrolled successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'learner',
      managerId: '',
      instructorFlag: false,
      department: '',
      position: '',
      startDate: '',
      courses: []
    });
  };

  const handleBulkEnrollment = () => {
    console.log('Enrolling users:', bulkUsers);
    alert(`${bulkUsers.length} users enrolled successfully!`);
    setBulkUsers([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInviteUser = () => {
    console.log('Sending invite to:', inviteEmail, 'with role:', inviteRole);
    alert('Invitation sent successfully!');
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('learner');
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) {
      alert('Please select users first');
      return;
    }
    console.log(`${action} for users:`, selectedUsers);
    alert(`${action} completed for ${selectedUsers.length} users`);
    setSelectedUsers([]);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">User Enrollment Management</h2>
        <p className="text-gray-300">Manage user enrollment, invitations, and bulk operations</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('single')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'single' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Single Enrollment
        </button>
        <button
          onClick={() => setActiveTab('bulk')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'bulk' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Bulk Enrollment
        </button>
        <button
          onClick={() => setActiveTab('invite')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'invite' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Invite Users
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'manage' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Manage Users
        </button>
      </div>

      {/* Single Enrollment Tab */}
      {activeTab === 'single' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Single User Enrollment</h3>
          <form onSubmit={handleSingleEnrollment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                >
                  <option value="learner">Learner</option>
                  <option value="instructor">Instructor</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
                  placeholder="Enter position"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="instructorFlag"
                  checked={formData.instructorFlag}
                  onChange={(e) => handleInputChange('instructorFlag', e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="instructorFlag" className="text-sm font-medium text-gray-300">
                  Instructor Flag
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Enroll in Courses</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {availableCourses.map(course => (
                  <label key={course.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.courses.includes(course.id)}
                      onChange={(e) => {
                        const newCourses = e.target.checked
                          ? [...formData.courses, course.id]
                          : formData.courses.filter(id => id !== course.id);
                        handleInputChange('courses', newCourses);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-300">{course.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Enroll User
              </button>
              <button
                type="button"
                onClick={() => setFormData({
                  firstName: '', lastName: '', email: '', role: 'learner',
                  managerId: '', instructorFlag: false, department: '', position: '',
                  startDate: '', courses: []
                })}
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bulk Enrollment Tab */}
      {activeTab === 'bulk' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Bulk User Enrollment</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Upload CSV File</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleBulkUpload}
              className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
            />
            <p className="text-sm text-gray-400 mt-2">
              CSV should include: firstName, lastName, email, role, department, position
            </p>
          </div>

          {bulkUsers.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-3">Preview ({bulkUsers.length} users)</h4>
              <div className="bg-white/5 rounded-lg p-4 max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-300 border-b border-gray-600">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Role</th>
                      <th className="text-left py-2">Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-600">
                        <td className="py-2 text-gray-300">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="py-2 text-gray-300">{user.email}</td>
                        <td className="py-2 text-gray-300">{user.role}</td>
                        <td className="py-2 text-gray-300">{user.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handleBulkEnrollment}
                className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
              >
                Enroll All Users
              </button>
            </div>
          )}
        </div>
      )}

      {/* Invite Users Tab */}
      {activeTab === 'invite' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Invite Users</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Quick Invite</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    <option value="learner">Learner</option>
                    <option value="instructor">Instructor</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                <button
                  onClick={handleInviteUser}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Invitation
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-3">Invitation Templates</h4>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Learner Invitation</h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Welcome to our learning platform! Complete your profile to get started.
                  </p>
                  <button className="text-blue-400 text-sm hover:text-blue-300">Use Template</button>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Instructor Invitation</h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Join our instructor team and start creating amazing courses.
                  </p>
                  <button className="text-blue-400 text-sm hover:text-blue-300">Use Template</button>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h5 className="font-medium text-white mb-2">Manager Invitation</h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Manage your team's learning journey and track progress.
                  </p>
                  <button className="text-blue-400 text-sm hover:text-blue-300">Use Template</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Users Tab */}
      {activeTab === 'manage' && (
        <div className="bg-white/10 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Manage Users</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
              />
              {selectedUsers.length > 0 && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBulkAction('Activate')}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Activate ({selectedUsers.length})
                  </button>
                  <button
                    onClick={() => handleBulkAction('Deactivate')}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Deactivate ({selectedUsers.length})
                  </button>
                  <button
                    onClick={() => handleBulkAction('Delete')}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Delete ({selectedUsers.length})
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map(user => user.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      className="rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-gray-300 font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-medium">Role</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-gray-600 hover:bg-white/5">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserSelection(user.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-white">{user.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-red-600' :
                        user.role === 'manager' ? 'bg-blue-600' :
                        user.role === 'instructor' ? 'bg-green-600' :
                        'bg-gray-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-600">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-yellow-400 hover:text-yellow-300 text-sm">Reset Password</button>
                        <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
        </div>
      )}
    </div>
  );
} 