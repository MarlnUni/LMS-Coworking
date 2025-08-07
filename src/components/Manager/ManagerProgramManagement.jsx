import { useState, useRef } from 'react';

export default function ManagerProgramManagement() {
  const [activeTab, setActiveTab] = useState('programs');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock team data (manager's team)
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Sarah Johnson', role: 'Senior Developer', department: 'Engineering', email: 'sarah.johnson@company.com' },
    { id: 2, name: 'Michael Chen', role: 'Product Manager', department: 'Product', email: 'michael.chen@company.com' },
    { id: 3, name: 'Emily Rodriguez', role: 'UX Designer', department: 'Design', email: 'emily.rodriguez@company.com' },
    { id: 4, name: 'David Kim', role: 'Data Analyst', department: 'Analytics', email: 'david.kim@company.com' }
  ]);

  // Mock programs data (manager can oversee these programs)
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: 'Technical Leadership Development',
      description: 'Comprehensive program to develop technical leadership skills for senior developers and architects.',
      category: 'Leadership',
      status: 'active',
      duration: '12 weeks',
      totalCourses: 8,
      assignedMembers: [1, 2],
      completionRate: 75,
      budget: 15000,
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      instructor: 'Dr. Sarah Johnson',
      courses: [
        { id: 1, title: 'System Architecture Design', duration: '6 hours', status: 'completed' },
        { id: 2, title: 'Team Leadership Skills', duration: '8 hours', status: 'in-progress' },
        { id: 3, title: 'Technical Mentoring', duration: '4 hours', status: 'not-started' }
      ],
      requirements: ['5+ years experience', 'Team lead role', 'Technical background'],
      outcomes: ['Lead technical teams', 'Design system architecture', 'Mentor junior developers'],
      managerNotes: 'Focus on practical application and real-world projects'
    },
    {
      id: 2,
      title: 'Product Management Excellence',
      description: 'Advanced product management skills for experienced PMs and aspiring product leaders.',
      category: 'Product',
      status: 'active',
      duration: '10 weeks',
      totalCourses: 6,
      assignedMembers: [2],
      completionRate: 90,
      budget: 12000,
      startDate: '2024-02-01',
      endDate: '2024-04-10',
      instructor: 'Jane Smith',
      courses: [
        { id: 1, title: 'Advanced Product Strategy', duration: '8 hours', status: 'completed' },
        { id: 2, title: 'User Research Methods', duration: '6 hours', status: 'completed' },
        { id: 3, title: 'Stakeholder Management', duration: '4 hours', status: 'in-progress' }
      ],
      requirements: ['3+ years PM experience', 'Cross-functional collaboration', 'Data analysis skills'],
      outcomes: ['Lead product strategy', 'Conduct user research', 'Manage stakeholders'],
      managerNotes: 'Emphasize stakeholder communication and data-driven decision making'
    },
    {
      id: 3,
      title: 'UX Design Mastery',
      description: 'Comprehensive UX design program covering advanced design principles and tools.',
      category: 'Design',
      status: 'active',
      duration: '8 weeks',
      totalCourses: 5,
      assignedMembers: [3],
      completionRate: 60,
      budget: 8000,
      startDate: '2024-03-01',
      endDate: '2024-04-26',
      instructor: 'Alex Johnson',
      courses: [
        { id: 1, title: 'Advanced Prototyping', duration: '6 hours', status: 'completed' },
        { id: 2, title: 'User Testing Methods', duration: '4 hours', status: 'in-progress' },
        { id: 3, title: 'Design Systems', duration: '6 hours', status: 'not-started' }
      ],
      requirements: ['2+ years UX experience', 'Figma proficiency', 'User research background'],
      outcomes: ['Create advanced prototypes', 'Conduct user testing', 'Build design systems'],
      managerNotes: 'Focus on practical design challenges and portfolio building'
    },
    {
      id: 4,
      title: 'Data Science Fundamentals',
      description: 'Introduction to data science concepts and tools for analysts and developers.',
      category: 'Analytics',
      status: 'active',
      duration: '6 weeks',
      totalCourses: 4,
      assignedMembers: [4],
      completionRate: 85,
      budget: 6000,
      startDate: '2024-02-15',
      endDate: '2024-03-28',
      instructor: 'Dr. Robert Chen',
      courses: [
        { id: 1, title: 'Python for Data Analysis', duration: '8 hours', status: 'completed' },
        { id: 2, title: 'Statistical Analysis', duration: '6 hours', status: 'completed' },
        { id: 3, title: 'Machine Learning Basics', duration: '8 hours', status: 'in-progress' }
      ],
      requirements: ['Basic programming knowledge', 'Mathematics background', 'Analytical thinking'],
      outcomes: ['Analyze data with Python', 'Apply statistical methods', 'Build ML models'],
      managerNotes: 'Emphasize practical data analysis and real-world applications'
    }
  ]);

  const categories = ['Leadership', 'Product', 'Design', 'Analytics', 'Technical', 'Soft Skills'];
  const statuses = ['active', 'completed', 'paused', 'draft'];

  const handleCreateProgram = (programData) => {
    const newProgram = {
      id: programs.length + 1,
      ...programData,
      assignedMembers: [],
      completionRate: 0,
      courses: [],
      managerNotes: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setPrograms([...programs, newProgram]);
    setShowCreateModal(false);
  };

  const handleUpdateProgram = (updatedProgram) => {
    setPrograms(prev => prev.map(program => 
      program.id === updatedProgram.id ? updatedProgram : program
    ));
    setShowEditModal(false);
    setEditingProgram(null);
  };

  const handleAssignMembers = (programId, memberIds) => {
    setPrograms(prev => prev.map(program => 
      program.id === programId 
        ? { ...program, assignedMembers: memberIds }
        : program
    ));
    setShowAssignModal(false);
    setSelectedProgram(null);
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || program.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || program.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-600',
      completed: 'bg-blue-600',
      paused: 'bg-yellow-600',
      draft: 'bg-gray-600'
    };
    return colors[status] || 'bg-gray-600';
  };

  const getCompletionColor = (rate) => {
    if (rate >= 80) return 'text-green-400';
    if (rate >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === 'active').length;
  const totalAssignedMembers = programs.reduce((sum, program) => sum + program.assignedMembers.length, 0);
  const averageCompletion = programs.length > 0 ? 
    (programs.reduce((sum, program) => sum + program.completionRate, 0) / programs.length).toFixed(0) : 0;

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Program Management Hub</h2>
        <p className="text-gray-300">Oversee learning programs, assign courses to your team members, and track program progress and completion rates.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Programs</h3>
          <p className="text-3xl font-bold text-blue-400">{totalPrograms}</p>
          <p className="text-gray-400 text-sm">{activePrograms} active programs</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Team Members</h3>
          <p className="text-3xl font-bold text-green-400">{teamMembers.length}</p>
          <p className="text-gray-400 text-sm">Available for assignment</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Avg Completion</h3>
          <p className="text-3xl font-bold text-yellow-400">{averageCompletion}%</p>
          <p className="text-gray-400 text-sm">Program success rate</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Budget</h3>
          <p className="text-3xl font-bold text-purple-400">${programs.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Program investments</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('programs')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'programs' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          My Programs
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'assignments' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Team Assignments
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'progress' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Progress Tracking
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'analytics' 
              ? 'bg-green-600 text-white' 
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
            placeholder="Search programs..."
            className="w-full px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
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
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Create Program
        </button>
      </div>

      {/* Programs View */}
      {activeTab === 'programs' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPrograms.map(program => (
            <div key={program.id} className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                    {program.status}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600">
                    {program.category}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {program.duration}
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg mb-2">{program.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{program.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs">Completion</p>
                  <p className={`text-sm font-medium ${getCompletionColor(program.completionRate)}`}>
                    {program.completionRate}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Courses</p>
                  <p className="text-white text-sm font-medium">{program.totalCourses}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Assigned</p>
                  <p className="text-white text-sm font-medium">{program.assignedMembers.length} members</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Budget</p>
                  <p className="text-white text-sm font-medium">${program.budget.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-2">Instructor</p>
                <p className="text-white text-sm">{program.instructor}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  {program.startDate} - {program.endDate}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedProgram(program);
                      setShowAssignModal(true);
                    }}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Assign
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProgram(program);
                      setShowProgressModal(true);
                    }}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    Progress
                  </button>
                  <button
                    onClick={() => {
                      setEditingProgram(program);
                      setShowEditModal(true);
                    }}
                    className="text-yellow-400 hover:text-yellow-300 text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Team Assignments View */}
      {activeTab === 'assignments' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Team Program Assignments</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Team Members</h4>
              <div className="space-y-3">
                {teamMembers.map(member => {
                  const assignedPrograms = programs.filter(p => p.assignedMembers.includes(member.id));
                  return (
                    <div key={member.id} className="border border-gray-600 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-white font-medium">{member.name}</h5>
                        <span className="text-gray-400 text-sm">{member.role}</span>
                      </div>
                      <div className="text-gray-300 text-sm mb-2">{member.department}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-xs">Assigned Programs</span>
                        <span className="text-white text-sm">{assignedPrograms.length}</span>
                      </div>
                      {assignedPrograms.length > 0 && (
                        <div className="mt-2">
                          <div className="text-gray-400 text-xs mb-1">Current Programs:</div>
                          {assignedPrograms.map(program => (
                            <div key={program.id} className="text-xs text-gray-300">
                              • {program.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Program Distribution</h4>
              <div className="space-y-3">
                {programs.map(program => (
                  <div key={program.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{program.title}</span>
                    <span className="text-white text-sm">{program.assignedMembers.length} assigned</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Tracking View */}
      {activeTab === 'progress' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Program Progress Tracking</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(program => (
              <div key={program.id} className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">{program.title}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Overall Progress</span>
                    <span className={`text-sm font-medium ${getCompletionColor(program.completionRate)}`}>
                      {program.completionRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${program.completionRate}%` }}
                    ></div>
                  </div>
                  
                  <div className="space-y-2">
                    {program.courses.map(course => (
                      <div key={course.id} className="flex justify-between items-center">
                        <span className="text-gray-300 text-xs">{course.title}</span>
                        <span className={`text-xs ${
                          course.status === 'completed' ? 'text-green-400' :
                          course.status === 'in-progress' ? 'text-yellow-400' : 'text-gray-400'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics View */}
      {activeTab === 'analytics' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Program Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Completion Rates</h4>
              <div className="space-y-3">
                {programs.map(program => (
                  <div key={program.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{program.title}</span>
                    <span className={`text-sm font-medium ${getCompletionColor(program.completionRate)}`}>
                      {program.completionRate}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Budget Allocation</h4>
              <div className="space-y-3">
                {programs.map(program => (
                  <div key={program.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{program.title}</span>
                    <span className="text-white text-sm">${program.budget.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Team Engagement</h4>
              <div className="space-y-3">
                {programs.map(program => (
                  <div key={program.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{program.title}</span>
                    <span className="text-white text-sm">{program.assignedMembers.length} members</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Program Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Create New Program</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleCreateProgram({
                title: formData.get('title'),
                description: formData.get('description'),
                category: formData.get('category'),
                status: formData.get('status'),
                duration: formData.get('duration'),
                totalCourses: parseInt(formData.get('totalCourses')),
                budget: parseFloat(formData.get('budget')),
                instructor: formData.get('instructor'),
                requirements: formData.get('requirements').split(',').map(s => s.trim()),
                outcomes: formData.get('outcomes').split(',').map(s => s.trim())
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Program Title</label>
                  <input
                    name="title"
                    type="text"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    name="category"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
                  <input
                    name="duration"
                    type="text"
                    placeholder="8 weeks"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Total Courses</label>
                  <input
                    name="totalCourses"
                    type="number"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Budget ($)</label>
                  <input
                    name="budget"
                    type="number"
                    step="0.01"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Instructor</label>
                  <input
                    name="instructor"
                    type="text"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  required
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Requirements (comma-separated)</label>
                <input
                  name="requirements"
                  type="text"
                  placeholder="Experience level, skills, background"
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Expected Outcomes (comma-separated)</label>
                <input
                  name="outcomes"
                  type="text"
                  placeholder="Skills gained, capabilities developed"
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Create Program
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Members Modal */}
      {showAssignModal && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Assign Team Members - {selectedProgram.title}</h3>
            
            <div className="mb-4">
              <p className="text-gray-300 mb-4">Select team members to assign to this program:</p>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <label key={member.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={selectedProgram.assignedMembers.includes(member.id)}
                      className="rounded"
                    />
                    <div>
                      <div className="text-white font-medium">{member.name}</div>
                      <div className="text-gray-400 text-sm">{member.role} - {member.department}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  const selectedMembers = teamMembers
                    .filter((_, index) => document.querySelectorAll('input[type="checkbox"]')[index].checked)
                    .map(member => member.id);
                  handleAssignMembers(selectedProgram.id, selectedMembers);
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
              >
                Assign Members
              </button>
              <button 
                onClick={() => setShowAssignModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgressModal && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Program Progress - {selectedProgram.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Course Progress</h4>
                <div className="space-y-3">
                  {selectedProgram.courses.map(course => (
                    <div key={course.id} className="border border-gray-600 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-white font-medium">{course.title}</h5>
                        <span className={`text-xs px-2 py-1 rounded ${
                          course.status === 'completed' ? 'bg-green-600' :
                          course.status === 'in-progress' ? 'bg-yellow-600' : 'bg-gray-600'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                      <div className="text-gray-400 text-sm">{course.duration}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Assigned Team Members</h4>
                <div className="space-y-3">
                  {selectedProgram.assignedMembers.map(memberId => {
                    const member = teamMembers.find(m => m.id === memberId);
                    return member ? (
                      <div key={member.id} className="border border-gray-600 rounded-lg p-3">
                        <div className="text-white font-medium">{member.name}</div>
                        <div className="text-gray-400 text-sm">{member.role}</div>
                        <div className="text-gray-400 text-sm">{member.department}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                Update Progress
              </button>
              <button 
                onClick={() => setShowProgressModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Program Modal */}
      {showEditModal && editingProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Edit Program</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUpdateProgram({
                ...editingProgram,
                title: formData.get('title'),
                description: formData.get('description'),
                category: formData.get('category'),
                status: formData.get('status'),
                duration: formData.get('duration'),
                totalCourses: parseInt(formData.get('totalCourses')),
                budget: parseFloat(formData.get('budget')),
                instructor: formData.get('instructor'),
                requirements: formData.get('requirements').split(',').map(s => s.trim()),
                outcomes: formData.get('outcomes').split(',').map(s => s.trim())
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Program Title</label>
                  <input
                    name="title"
                    type="text"
                    defaultValue={editingProgram.title}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingProgram.category}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingProgram.status}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
                  <input
                    name="duration"
                    type="text"
                    defaultValue={editingProgram.duration}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Total Courses</label>
                  <input
                    name="totalCourses"
                    type="number"
                    defaultValue={editingProgram.totalCourses}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Budget ($)</label>
                  <input
                    name="budget"
                    type="number"
                    step="0.01"
                    defaultValue={editingProgram.budget}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Instructor</label>
                  <input
                    name="instructor"
                    type="text"
                    defaultValue={editingProgram.instructor}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  defaultValue={editingProgram.description}
                  required
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Requirements (comma-separated)</label>
                <input
                  name="requirements"
                  type="text"
                  defaultValue={editingProgram.requirements.join(', ')}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Expected Outcomes (comma-separated)</label>
                <input
                  name="outcomes"
                  type="text"
                  defaultValue={editingProgram.outcomes.join(', ')}
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Update Program
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
    </div>
  );
} 