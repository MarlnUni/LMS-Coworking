import { useState, useEffect } from 'react';
import { users } from '../../mock/users';

export default function AdminManageUsers() {
  const [activeView, setActiveView] = useState('hierarchy');
  const [selectedUser, setSelectedUser] = useState(null);
  const [draggedUser, setDraggedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Enhanced user data with hierarchy information
  const [hierarchyData, setHierarchyData] = useState(() => {
    const enhancedUsers = users.map(user => ({
      ...user,
      department: getDepartment(user.role),
      position: getPosition(user.role),
      status: 'active',
      joinDate: getRandomDate(),
      directReports: users.filter(u => u.manager_id === user.id).length,
      learningPath: getLearningPath(user.role)
    }));
    return enhancedUsers;
  });

  function getDepartment(role) {
    const departments = {
      admin: 'Executive',
      manager: 'Management',
      instructor: 'Education',
      learner: 'Operations'
    };
    return departments[role] || 'General';
  }

  function getPosition(role) {
    const positions = {
      admin: 'System Administrator',
      manager: 'Team Manager',
      instructor: 'Learning Instructor',
      learner: 'Team Member'
    };
    return positions[role] || 'Employee';
  }

  function getRandomDate() {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
  }

  function getLearningPath(role) {
    const paths = {
      admin: 'Leadership & Administration',
      manager: 'Management & Leadership',
      instructor: 'Teaching & Development',
      learner: 'Professional Development'
    };
    return paths[role] || 'General Skills';
  }

  // Build organizational hierarchy
  const buildHierarchy = () => {
    const hierarchy = {};
    const managers = hierarchyData.filter(user => user.role === 'manager' || user.role === 'admin');
    
    managers.forEach(manager => {
      hierarchy[manager.id] = {
        ...manager,
        children: hierarchyData.filter(user => user.manager_id === manager.id)
      };
    });
    
    return hierarchy;
  };

  const handleDragStart = (e, user) => {
    setDraggedUser(user);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetManager) => {
    e.preventDefault();
    if (draggedUser && targetManager && draggedUser.id !== targetManager.id) {
      // Update the dragged user's manager
      setHierarchyData(prev => prev.map(user => 
        user.id === draggedUser.id 
          ? { ...user, manager_id: targetManager.id }
          : user
      ));
      
      // Update direct reports count for both managers
      setHierarchyData(prev => prev.map(user => {
        if (user.id === draggedUser.manager_id) {
          return { ...user, directReports: user.directReports - 1 };
        }
        if (user.id === targetManager.id) {
          return { ...user, directReports: user.directReports + 1 };
        }
        return user;
      }));
    }
    setDraggedUser(null);
  };

  const handleUserEdit = (user) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleUserUpdate = (updatedUser) => {
    setHierarchyData(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setShowUserModal(false);
    setEditingUser(null);
  };

  const filteredUsers = hierarchyData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const hierarchy = buildHierarchy();

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Organizational Hierarchy Management</h2>
        <p className="text-gray-300">Manage organizational structure, reassign employees, and track reporting relationships</p>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveView('hierarchy')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeView === 'hierarchy' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Organizational Chart
        </button>
        <button
          onClick={() => setActiveView('list')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeView === 'list' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          User List
        </button>
        <button
          onClick={() => setActiveView('analytics')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeView === 'analytics' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="instructor">Instructor</option>
          <option value="learner">Learner</option>
        </select>
      </div>

      {/* Organizational Chart View */}
      {activeView === 'hierarchy' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Organizational Structure</h3>
          <div className="space-y-6">
            {Object.values(hierarchy).map(manager => (
              <div key={manager.id} className="bg-white/5 rounded-lg p-4">
                {/* Manager Card */}
                <div
                  className={`p-4 rounded-lg border-2 border-dashed ${
                    draggedUser ? 'border-blue-400 bg-blue-900/20' : 'border-gray-600'
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, manager)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        manager.role === 'admin' ? 'bg-red-600' :
                        manager.role === 'manager' ? 'bg-blue-600' :
                        'bg-green-600'
                      }`}>
                        {manager.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{manager.name}</h4>
                        <p className="text-gray-300 text-sm">{manager.position}</p>
                        <p className="text-gray-400 text-xs">{manager.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        manager.role === 'admin' ? 'bg-red-600' :
                        manager.role === 'manager' ? 'bg-blue-600' :
                        'bg-green-600'
                      }`}>
                        {manager.role}
                      </span>
                      <p className="text-gray-300 text-sm mt-1">
                        {manager.directReports} direct reports
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Reports */}
                {manager.children && manager.children.length > 0 && (
                  <div className="mt-4 ml-8">
                    <div className="border-l-2 border-gray-600 pl-4 space-y-3">
                      {manager.children.map(employee => (
                        <div
                          key={employee.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, employee)}
                          className={`p-3 rounded-lg bg-white/5 border cursor-move hover:bg-white/10 transition-colors ${
                            draggedUser?.id === employee.id ? 'border-blue-400 bg-blue-900/20' : 'border-gray-600'
                          }`}
                          onClick={() => setSelectedUser(employee)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                employee.role === 'learner' ? 'bg-gray-600' : 'bg-green-600'
                              }`}>
                                {employee.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <h5 className="text-white text-sm font-medium">{employee.name}</h5>
                                <p className="text-gray-300 text-xs">{employee.position}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                employee.role === 'learner' ? 'bg-gray-600' : 'bg-green-600'
                              }`}>
                                {employee.role}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUserEdit(employee);
                                }}
                                className="text-blue-400 hover:text-blue-300 text-xs"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User List View */}
      {activeView === 'list' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">User Management</h3>
          <div className="bg-white/5 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-300 font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-medium">Role</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-medium">Department</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-medium">Manager</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-gray-600 hover:bg-white/5">
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
                    <td className="px-4 py-3 text-gray-300">{user.department}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {hierarchyData.find(u => u.id === user.manager_id)?.name || 'None'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-600">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUserEdit(user)}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Edit
                        </button>
                        <button className="text-yellow-400 hover:text-yellow-300 text-sm">
                          Reset Password
                        </button>
                        <button className="text-red-400 hover:text-red-300 text-sm">
                          Deactivate
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics View */}
      {activeView === 'analytics' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Organizational Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Total Users</h4>
              <p className="text-3xl font-bold text-blue-400">{hierarchyData.length}</p>
              <p className="text-gray-400 text-sm">Active members</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Managers</h4>
              <p className="text-3xl font-bold text-green-400">
                {hierarchyData.filter(u => u.role === 'manager' || u.role === 'admin').length}
              </p>
              <p className="text-gray-400 text-sm">Team leaders</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Learners</h4>
              <p className="text-3xl font-bold text-yellow-400">
                {hierarchyData.filter(u => u.role === 'learner').length}
              </p>
              <p className="text-gray-400 text-sm">Team members</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Department Distribution</h4>
              <div className="space-y-2">
                {Object.entries(
                  hierarchyData.reduce((acc, user) => {
                    acc[user.department] = (acc[user.department] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([dept, count]) => (
                  <div key={dept} className="flex justify-between items-center">
                    <span className="text-gray-300">{dept}</span>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Learning Paths</h4>
              <div className="space-y-2">
                {Object.entries(
                  hierarchyData.reduce((acc, user) => {
                    acc[user.learningPath] = (acc[user.learningPath] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([path, count]) => (
                  <div key={path} className="flex justify-between items-center">
                    <span className="text-gray-300">{path}</span>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Edit Modal */}
      {showUserModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">Edit User</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUserUpdate(editingUser);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                >
                  <option value="learner">Learner</option>
                  <option value="instructor">Instructor</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Manager</label>
                <select
                  value={editingUser.manager_id || ''}
                  onChange={(e) => setEditingUser({...editingUser, manager_id: e.target.value || null})}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                >
                  <option value="">No Manager</option>
                  {hierarchyData.filter(u => u.role === 'manager' || u.role === 'admin').map(manager => (
                    <option key={manager.id} value={manager.id}>{manager.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Update User
                </button>
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Drag and Drop Instructions */}
      {draggedUser && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <p>Drag {draggedUser.name} to a new manager</p>
        </div>
      )}
    </div>
  );
} 