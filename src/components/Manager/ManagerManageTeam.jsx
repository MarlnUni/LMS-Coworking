import { useState, useRef } from 'react';

export default function ManagerManageTeam() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [showCoachingModal, setShowCoachingModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingMember, setEditingMember] = useState(null);

  // Mock team data
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Senior Developer',
      department: 'Engineering',
      status: 'active',
      avatar: '👩‍💻',
      joinDate: '2022-03-15',
      performance: {
        overall: 4.8,
        communication: 4.5,
        technical: 4.9,
        leadership: 4.2,
        teamwork: 4.7
      },
      skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
      learningProgress: 87,
      currentProjects: ['E-commerce Platform', 'Mobile App'],
      workload: 85,
      goals: [
        { id: 1, title: 'Lead technical architecture', progress: 75, dueDate: '2024-06-30' },
        { id: 2, title: 'Mentor junior developers', progress: 90, dueDate: '2024-05-15' }
      ],
      feedback: [
        { id: 1, type: 'positive', message: 'Excellent problem-solving skills', date: '2024-03-20' },
        { id: 2, type: 'improvement', message: 'Could improve documentation', date: '2024-03-15' }
      ],
      availability: 'available',
      timezone: 'EST',
      preferences: {
        communication: 'slack',
        meetings: 'afternoon',
        feedback: 'weekly'
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'Product Manager',
      department: 'Product',
      status: 'active',
      avatar: '👨‍💼',
      joinDate: '2021-08-22',
      performance: {
        overall: 4.6,
        communication: 4.8,
        technical: 4.2,
        leadership: 4.7,
        teamwork: 4.9
      },
      skills: ['Product Strategy', 'User Research', 'Agile', 'Data Analysis', 'Stakeholder Management'],
      learningProgress: 92,
      currentProjects: ['Product Roadmap', 'User Experience'],
      workload: 78,
      goals: [
        { id: 1, title: 'Launch new product feature', progress: 60, dueDate: '2024-07-15' },
        { id: 2, title: 'Improve user satisfaction', progress: 85, dueDate: '2024-06-30' }
      ],
      feedback: [
        { id: 1, type: 'positive', message: 'Great stakeholder communication', date: '2024-03-18' },
        { id: 2, type: 'improvement', message: 'Need more technical depth', date: '2024-03-10' }
      ],
      availability: 'available',
      timezone: 'PST',
      preferences: {
        communication: 'email',
        meetings: 'morning',
        feedback: 'bi-weekly'
      }
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      role: 'UX Designer',
      department: 'Design',
      status: 'active',
      avatar: '👩‍🎨',
      joinDate: '2023-01-10',
      performance: {
        overall: 4.4,
        communication: 4.3,
        technical: 4.6,
        leadership: 4.1,
        teamwork: 4.5
      },
      skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Design Systems'],
      learningProgress: 95,
      currentProjects: ['UI Redesign', 'Design System'],
      workload: 92,
      goals: [
        { id: 1, title: 'Complete design system', progress: 80, dueDate: '2024-05-30' },
        { id: 2, title: 'Improve user flows', progress: 70, dueDate: '2024-06-15' }
      ],
      feedback: [
        { id: 1, type: 'positive', message: 'Creative design solutions', date: '2024-03-22' },
        { id: 2, type: 'improvement', message: 'Timeline management', date: '2024-03-12' }
      ],
      availability: 'busy',
      timezone: 'CST',
      preferences: {
        communication: 'slack',
        meetings: 'flexible',
        feedback: 'monthly'
      }
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'Data Analyst',
      department: 'Analytics',
      status: 'active',
      avatar: '👨‍💻',
      joinDate: '2022-11-05',
      performance: {
        overall: 4.3,
        communication: 4.0,
        technical: 4.8,
        leadership: 3.9,
        teamwork: 4.2
      },
      skills: ['SQL', 'Python', 'Tableau', 'Machine Learning', 'Statistics'],
      learningProgress: 78,
      currentProjects: ['Data Pipeline', 'Analytics Dashboard'],
      workload: 88,
      goals: [
        { id: 1, title: 'Build predictive models', progress: 45, dueDate: '2024-08-30' },
        { id: 2, title: 'Improve data accuracy', progress: 90, dueDate: '2024-05-20' }
      ],
      feedback: [
        { id: 1, type: 'positive', message: 'Strong analytical skills', date: '2024-03-19' },
        { id: 2, type: 'improvement', message: 'Presentation skills', date: '2024-03-08' }
      ],
      availability: 'available',
      timezone: 'EST',
      preferences: {
        communication: 'email',
        meetings: 'afternoon',
        feedback: 'weekly'
      }
    }
  ]);

  const departments = ['Engineering', 'Product', 'Design', 'Analytics', 'Marketing', 'Sales', 'HR'];
  const roles = ['Senior Developer', 'Product Manager', 'UX Designer', 'Data Analyst', 'Marketing Specialist', 'Sales Representative', 'HR Specialist'];
  const statuses = ['active', 'inactive', 'on-leave', 'terminated'];

  const handleAddMember = (memberData) => {
    const newMember = {
      id: teamMembers.length + 1,
      ...memberData,
      joinDate: new Date().toISOString().split('T')[0],
      performance: {
        overall: 4.0,
        communication: 4.0,
        technical: 4.0,
        leadership: 4.0,
        teamwork: 4.0
      },
      skills: memberData.skills.split(',').map(s => s.trim()),
      learningProgress: 0,
      currentProjects: [],
      workload: 0,
      goals: [],
      feedback: [],
      availability: 'available',
      preferences: {
        communication: 'email',
        meetings: 'morning',
        feedback: 'weekly'
      }
    };
    setTeamMembers([...teamMembers, newMember]);
    setShowAddModal(false);
  };

  const handleUpdateMember = (updatedMember) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
    setShowEditModal(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getPerformanceColor = (score) => {
    if (score >= 4.5) return 'text-green-400';
    if (score >= 4.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getWorkloadColor = (workload) => {
    if (workload >= 90) return 'text-red-400';
    if (workload >= 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getAvailabilityColor = (availability) => {
    const colors = {
      available: 'text-green-400',
      busy: 'text-yellow-400',
      unavailable: 'text-red-400'
    };
    return colors[availability] || 'text-gray-400';
  };

  const totalMembers = teamMembers.length;
  const activeMembers = teamMembers.filter(m => m.status === 'active').length;
  const averagePerformance = teamMembers.length > 0 ? 
    (teamMembers.reduce((sum, member) => sum + member.performance.overall, 0) / teamMembers.length).toFixed(1) : 0;
  const averageWorkload = teamMembers.length > 0 ? 
    (teamMembers.reduce((sum, member) => sum + member.workload, 0) / teamMembers.length).toFixed(0) : 0;

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Team Management Hub</h2>
        <p className="text-gray-300">Lead, develop, and support your team members with comprehensive management tools and personalized coaching features.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Team Size</h3>
          <p className="text-3xl font-bold text-blue-400">{totalMembers}</p>
          <p className="text-gray-400 text-sm">{activeMembers} active members</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Avg Performance</h3>
          <p className="text-3xl font-bold text-green-400">{averagePerformance}/5</p>
          <p className="text-gray-400 text-sm">Team excellence</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Avg Workload</h3>
          <p className="text-3xl font-bold text-yellow-400">{averageWorkload}%</p>
          <p className="text-gray-400 text-sm">Capacity utilization</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Learning Progress</h3>
          <p className="text-3xl font-bold text-purple-400">{Math.round(teamMembers.reduce((sum, m) => sum + m.learningProgress, 0) / teamMembers.length)}%</p>
          <p className="text-gray-400 text-sm">Skill development</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'overview' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Team Overview
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'performance' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Performance
        </button>
        <button
          onClick={() => setActiveTab('development')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'development' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Development
        </button>
        <button
          onClick={() => setActiveTab('collaboration')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'collaboration' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Collaboration
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search team members..."
            className="w-full px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white"
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white"
        >
          <option value="all">All Status</option>
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Add Member
        </button>
      </div>

      {/* Team Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <div key={member.id} className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl mb-2">{member.avatar}</div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    {member.status}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600">
                    {member.department}
                  </span>
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
              <p className="text-gray-300 text-sm mb-2">{member.role}</p>
              <p className="text-gray-400 text-xs mb-4">{member.email}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs">Performance</p>
                  <p className={`text-sm font-medium ${getPerformanceColor(member.performance.overall)}`}>
                    {member.performance.overall}/5
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Workload</p>
                  <p className={`text-sm font-medium ${getWorkloadColor(member.workload)}`}>
                    {member.workload}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Learning</p>
                  <p className="text-white text-sm font-medium">{member.learningProgress}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Availability</p>
                  <p className={`text-sm font-medium ${getAvailabilityColor(member.availability)}`}>
                    {member.availability}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-2">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {member.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600/20 text-gray-300 text-xs rounded">
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  Joined: {member.joinDate}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingMember(member);
                      setShowEditModal(true);
                    }}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setShowPerformanceModal(true);
                    }}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    Performance
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setShowCoachingModal(true);
                    }}
                    className="text-yellow-400 hover:text-yellow-300 text-sm"
                  >
                    Coach
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Performance View */}
      {activeTab === 'performance' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Performance Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Performance Distribution</h4>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{member.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(member.performance.overall / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getPerformanceColor(member.performance.overall)}`}>
                        {member.performance.overall}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Skill Assessment</h4>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{member.name}</span>
                    <span className="text-white text-sm">{member.skills.length} skills</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Workload Balance</h4>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{member.name}</span>
                    <span className={`text-sm font-medium ${getWorkloadColor(member.workload)}`}>
                      {member.workload}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Development View */}
      {activeTab === 'development' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Team Development</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Learning Progress</h4>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{member.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${member.learningProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{member.learningProgress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Goal Tracking</h4>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{member.name}</span>
                    <span className="text-white text-sm">{member.goals.length} goals</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collaboration View */}
      {activeTab === 'collaboration' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Team Collaboration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Project Assignments</h4>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{member.name}</span>
                    <span className="text-white text-sm">{member.currentProjects.length} projects</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Communication Preferences</h4>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{member.name}</span>
                    <span className="text-white text-sm capitalize">{member.preferences.communication}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Add Team Member</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddMember({
                name: formData.get('name'),
                email: formData.get('email'),
                role: formData.get('role'),
                department: formData.get('department'),
                status: formData.get('status'),
                avatar: formData.get('avatar'),
                skills: formData.get('skills')
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <select
                    name="role"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                  <select
                    name="department"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    name="status"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Avatar Emoji</label>
                  <input
                    name="avatar"
                    type="text"
                    placeholder="👨‍💻"
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Skills (comma-separated)</label>
                <input
                  name="skills"
                  type="text"
                  placeholder="React, Node.js, Python"
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Add Member
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && editingMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Edit Team Member</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUpdateMember({
                ...editingMember,
                name: formData.get('name'),
                email: formData.get('email'),
                role: formData.get('role'),
                department: formData.get('department'),
                status: formData.get('status'),
                avatar: formData.get('avatar'),
                skills: formData.get('skills').split(',').map(s => s.trim())
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={editingMember.name}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={editingMember.email}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <select
                    name="role"
                    defaultValue={editingMember.role}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                  <select
                    name="department"
                    defaultValue={editingMember.department}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingMember.status}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Avatar Emoji</label>
                  <input
                    name="avatar"
                    type="text"
                    defaultValue={editingMember.avatar}
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Skills (comma-separated)</label>
                <input
                  name="skills"
                  type="text"
                  defaultValue={editingMember.skills.join(', ')}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Update Member
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Performance Modal */}
      {showPerformanceModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Performance Review - {selectedMember.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Overall Performance</span>
                    <span className={`font-medium ${getPerformanceColor(selectedMember.performance.overall)}`}>
                      {selectedMember.performance.overall}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Communication</span>
                    <span className={`font-medium ${getPerformanceColor(selectedMember.performance.communication)}`}>
                      {selectedMember.performance.communication}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Technical Skills</span>
                    <span className={`font-medium ${getPerformanceColor(selectedMember.performance.technical)}`}>
                      {selectedMember.performance.technical}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Leadership</span>
                    <span className={`font-medium ${getPerformanceColor(selectedMember.performance.leadership)}`}>
                      {selectedMember.performance.leadership}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Teamwork</span>
                    <span className={`font-medium ${getPerformanceColor(selectedMember.performance.teamwork)}`}>
                      {selectedMember.performance.teamwork}/5
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Recent Feedback</h4>
                <div className="space-y-3">
                  {selectedMember.feedback.map(feedback => (
                    <div key={feedback.id} className={`p-3 rounded-lg ${
                      feedback.type === 'positive' ? 'bg-green-600/20' : 'bg-yellow-600/20'
                    }`}>
                      <div className="text-sm text-gray-300">{feedback.message}</div>
                      <div className="text-xs text-gray-400 mt-1">{feedback.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                Schedule Review
              </button>
              <button 
                onClick={() => setShowPerformanceModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coaching Modal */}
      {showCoachingModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Coaching Session - {selectedMember.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Development Goals</h4>
                <div className="space-y-3">
                  {selectedMember.goals.map(goal => (
                    <div key={goal.id} className="border border-gray-600 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-white font-medium">{goal.title}</h5>
                        <span className="text-gray-400 text-sm">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Due: {goal.dueDate}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Coaching Actions</h4>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
                    📅 Schedule 1-on-1
                  </button>
                  <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700">
                    🎯 Set New Goals
                  </button>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700">
                    📚 Recommend Training
                  </button>
                  <button className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700">
                    🤝 Mentorship Program
                  </button>
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">
                    📊 Performance Review
                  </button>
                  <button className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700">
                    🎉 Recognition
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                Save Coaching Notes
              </button>
              <button 
                onClick={() => setShowCoachingModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 