import { useState, useRef } from 'react';

export default function AdminProgramManagement() {
  const [activeTab, setActiveTab] = useState('programs');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingProgram, setEditingProgram] = useState(null);
  const fileInputRef = useRef(null);

  // Mock program data
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: 'New Employee Onboarding',
      description: 'Comprehensive onboarding program for new hires covering company culture, policies, and role-specific training.',
      category: 'Onboarding',
      status: 'active',
      duration: '4 weeks',
      participants: 45,
      completionRate: 87,
      modules: 8,
      createdDate: '2024-01-15',
      lastUpdated: '2024-03-20',
      targetAudience: ['New Hires', 'HR Staff'],
      skills: ['Company Culture', 'Policies', 'Role Training'],
      compliance: ['HR Compliance', 'Safety Training'],
      budget: 15000,
      roi: 125,
      instructor: 'Sarah Johnson',
      department: 'HR',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Leadership Development Program',
      description: 'Advanced leadership training for managers and potential leaders focusing on team management and strategic thinking.',
      category: 'Leadership',
      status: 'active',
      duration: '12 weeks',
      participants: 23,
      completionRate: 92,
      modules: 15,
      createdDate: '2024-02-01',
      lastUpdated: '2024-03-15',
      targetAudience: ['Managers', 'Team Leads'],
      skills: ['Leadership', 'Strategic Thinking', 'Team Management'],
      compliance: ['Management Standards'],
      budget: 25000,
      roi: 180,
      instructor: 'Dr. Michael Chen',
      department: 'Management',
      priority: 'high'
    },
    {
      id: 3,
      name: 'Technical Skills Enhancement',
      description: 'Technical training program for IT and engineering teams covering latest technologies and best practices.',
      category: 'Technical',
      status: 'draft',
      duration: '8 weeks',
      participants: 67,
      completionRate: 78,
      modules: 12,
      createdDate: '2024-02-20',
      lastUpdated: '2024-03-10',
      targetAudience: ['IT Staff', 'Engineers'],
      skills: ['Programming', 'Cloud Computing', 'DevOps'],
      compliance: ['Technical Standards'],
      budget: 30000,
      roi: 200,
      instructor: 'Alex Rodriguez',
      department: 'IT',
      priority: 'medium'
    },
    {
      id: 4,
      name: 'Compliance & Safety Training',
      description: 'Mandatory compliance training covering workplace safety, data protection, and regulatory requirements.',
      category: 'Compliance',
      status: 'active',
      duration: '2 weeks',
      participants: 156,
      completionRate: 95,
      modules: 6,
      createdDate: '2024-01-10',
      lastUpdated: '2024-03-25',
      targetAudience: ['All Employees'],
      skills: ['Safety', 'Compliance', 'Data Protection'],
      compliance: ['OSHA', 'GDPR', 'Industry Standards'],
      budget: 8000,
      roi: 110,
      instructor: 'Legal Team',
      department: 'Legal',
      priority: 'critical'
    },
    {
      id: 5,
      name: 'Sales Excellence Program',
      description: 'Sales training program focusing on customer relationship management and advanced selling techniques.',
      category: 'Sales',
      status: 'active',
      duration: '6 weeks',
      participants: 34,
      completionRate: 89,
      modules: 10,
      createdDate: '2024-02-15',
      lastUpdated: '2024-03-18',
      targetAudience: ['Sales Team', 'Account Managers'],
      skills: ['Sales Techniques', 'CRM', 'Negotiation'],
      compliance: ['Sales Standards'],
      budget: 18000,
      roi: 165,
      instructor: 'Lisa Thompson',
      department: 'Sales',
      priority: 'high'
    }
  ]);

  const categories = [
    'Onboarding', 'Leadership', 'Technical', 'Compliance', 'Sales', 
    'Marketing', 'Finance', 'Operations', 'Customer Service', 'Innovation'
  ];

  const statuses = ['active', 'draft', 'archived', 'scheduled'];
  const priorities = ['critical', 'high', 'medium', 'low'];
  const departments = ['HR', 'IT', 'Sales', 'Marketing', 'Finance', 'Operations', 'Legal', 'Management'];

  const handleCreateProgram = (programData) => {
    const newProgram = {
      id: programs.length + 1,
      ...programData,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      participants: 0,
      completionRate: 0,
      modules: 0
    };
    setPrograms([...programs, newProgram]);
    setShowCreateModal(false);
  };

  const handleUpdateProgram = (updatedProgram) => {
    setPrograms(prev => prev.map(program => 
      program.id === updatedProgram.id 
        ? { ...updatedProgram, lastUpdated: new Date().toISOString().split('T')[0] }
        : program
    ));
    setShowEditModal(false);
    setEditingProgram(null);
  };

  const handleDeleteProgram = (programId) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(prev => prev.filter(program => program.id !== programId));
    }
  };

  const handleDuplicateProgram = (program) => {
    const duplicatedProgram = {
      ...program,
      id: programs.length + 1,
      name: `${program.name} (Copy)`,
      status: 'draft',
      participants: 0,
      completionRate: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPrograms([...programs, duplicatedProgram]);
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || program.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || program.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-600',
      draft: 'bg-yellow-600',
      archived: 'bg-gray-600',
      scheduled: 'bg-blue-600'
    };
    return colors[status] || 'bg-gray-600';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-600',
      high: 'bg-orange-600',
      medium: 'bg-yellow-600',
      low: 'bg-green-600'
    };
    return colors[priority] || 'bg-gray-600';
  };

  const totalBudget = programs.reduce((sum, program) => sum + program.budget, 0);
  const totalROI = programs.reduce((sum, program) => sum + program.roi, 0);
  const activePrograms = programs.filter(p => p.status === 'active').length;

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Corporate Learning Program Management</h2>
        <p className="text-gray-300">Design, track, and optimize learning programs for corporate employee development</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Programs</h3>
          <p className="text-3xl font-bold text-blue-400">{programs.length}</p>
          <p className="text-gray-400 text-sm">{activePrograms} active</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Budget</h3>
          <p className="text-3xl font-bold text-green-400">${totalBudget.toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Allocated</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Avg. ROI</h3>
          <p className="text-3xl font-bold text-yellow-400">{Math.round(totalROI / programs.length)}%</p>
          <p className="text-gray-400 text-sm">Return on investment</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Participants</h3>
          <p className="text-3xl font-bold text-purple-400">{programs.reduce((sum, p) => sum + p.participants, 0)}</p>
          <p className="text-gray-400 text-sm">Enrolled employees</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('programs')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'programs' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Programs
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'analytics' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('compliance')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'compliance' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Compliance
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'templates' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Templates
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
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
          <option value="scheduled">Scheduled</option>
        </select>
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
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
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
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{program.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{program.description}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                    {program.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(program.priority)}`}>
                    {program.priority}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs">Category</p>
                  <p className="text-white text-sm font-medium">{program.category}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Duration</p>
                  <p className="text-white text-sm font-medium">{program.duration}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Participants</p>
                  <p className="text-white text-sm font-medium">{program.participants}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Completion Rate</p>
                  <p className="text-white text-sm font-medium">{program.completionRate}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Budget</p>
                  <p className="text-white text-sm font-medium">${program.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">ROI</p>
                  <p className="text-white text-sm font-medium">{program.roi}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-2">Skills Covered</p>
                <div className="flex flex-wrap gap-1">
                  {program.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {program.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600/20 text-gray-300 text-xs rounded">
                      +{program.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  Updated: {program.lastUpdated}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingProgram(program);
                      setShowEditModal(true);
                    }}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDuplicateProgram(program)}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => handleDeleteProgram(program.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics View */}
      {activeTab === 'analytics' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Program Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Program Performance</h4>
              <div className="space-y-3">
                {programs.slice(0, 5).map(program => (
                  <div key={program.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{program.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${program.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{program.completionRate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Budget Allocation</h4>
              <div className="space-y-3">
                {programs.slice(0, 5).map(program => (
                  <div key={program.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{program.name}</span>
                    <span className="text-white text-sm">${program.budget.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">ROI by Category</h4>
              <div className="space-y-3">
                {Object.entries(
                  programs.reduce((acc, program) => {
                    acc[program.category] = (acc[program.category] || 0) + program.roi;
                    return acc;
                  }, {})
                ).map(([category, totalRoi]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{category}</span>
                    <span className="text-white text-sm">{Math.round(totalRoi)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Department Distribution</h4>
              <div className="space-y-2">
                {Object.entries(
                  programs.reduce((acc, program) => {
                    acc[program.department] = (acc[program.department] || 0) + 1;
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
              <h4 className="text-white font-medium mb-4">Status Distribution</h4>
              <div className="space-y-2">
                {Object.entries(
                  programs.reduce((acc, program) => {
                    acc[program.status] = (acc[program.status] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-gray-300 capitalize">{status}</span>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compliance View */}
      {activeTab === 'compliance' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Compliance Management</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Required Compliance Programs</h4>
              <div className="space-y-3">
                {programs.filter(p => p.compliance.length > 0).map(program => (
                  <div key={program.id} className="border border-gray-600 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-white font-medium">{program.name}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                        {program.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{program.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {program.compliance.map(comp => (
                        <span key={comp} className="px-2 py-1 bg-red-600/20 text-red-300 text-xs rounded">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Compliance Tracking</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">OSHA Compliance</span>
                  <span className="text-green-400 font-medium">✓ Complete</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">GDPR Training</span>
                  <span className="text-green-400 font-medium">✓ Complete</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Industry Standards</span>
                  <span className="text-yellow-400 font-medium">⚠ In Progress</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Safety Protocols</span>
                  <span className="text-green-400 font-medium">✓ Complete</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-4">Compliance Calendar</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">15</div>
                <div className="text-gray-300 text-sm">Days until next audit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">95%</div>
                <div className="text-gray-300 text-sm">Compliance rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">3</div>
                <div className="text-gray-300 text-sm">Pending certifications</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates View */}
      {activeTab === 'templates' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Program Templates</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'New Hire Onboarding',
                category: 'Onboarding',
                description: 'Standard onboarding template for all new employees',
                modules: 6,
                duration: '2 weeks',
                skills: ['Company Culture', 'Policies', 'Role Training']
              },
              {
                name: 'Leadership Development',
                category: 'Leadership',
                description: 'Comprehensive leadership training program',
                modules: 12,
                duration: '8 weeks',
                skills: ['Leadership', 'Management', 'Strategy']
              },
              {
                name: 'Technical Skills',
                category: 'Technical',
                description: 'Technical training for IT and engineering teams',
                modules: 10,
                duration: '6 weeks',
                skills: ['Programming', 'Cloud', 'DevOps']
              },
              {
                name: 'Sales Training',
                category: 'Sales',
                description: 'Sales techniques and customer relationship management',
                modules: 8,
                duration: '4 weeks',
                skills: ['Sales', 'CRM', 'Negotiation']
              },
              {
                name: 'Compliance Training',
                category: 'Compliance',
                description: 'Mandatory compliance and safety training',
                modules: 5,
                duration: '1 week',
                skills: ['Safety', 'Compliance', 'Regulations']
              },
              {
                name: 'Customer Service',
                category: 'Customer Service',
                description: 'Customer service excellence training',
                modules: 7,
                duration: '3 weeks',
                skills: ['Communication', 'Problem Solving', 'Empathy']
              }
            ].map((template, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <h4 className="text-white font-medium mb-2">{template.name}</h4>
                <p className="text-gray-300 text-sm mb-3">{template.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white">{template.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Modules:</span>
                    <span className="text-white">{template.modules}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{template.duration}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Use Template
                </button>
              </div>
            ))}
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
                name: formData.get('name'),
                description: formData.get('description'),
                category: formData.get('category'),
                status: formData.get('status'),
                duration: formData.get('duration'),
                budget: parseInt(formData.get('budget')),
                priority: formData.get('priority'),
                department: formData.get('department'),
                instructor: formData.get('instructor'),
                targetAudience: formData.get('targetAudience').split(',').map(s => s.trim()),
                skills: formData.get('skills').split(',').map(s => s.trim()),
                compliance: formData.get('compliance').split(',').map(s => s.trim()).filter(s => s)
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Program Name</label>
                  <input
                    name="name"
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                  <select
                    name="priority"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
                  <input
                    name="duration"
                    type="text"
                    placeholder="e.g., 4 weeks"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Budget ($)</label>
                  <input
                    name="budget"
                    type="number"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Target Audience (comma-separated)</label>
                  <input
                    name="targetAudience"
                    type="text"
                    placeholder="e.g., New Hires, Managers"
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Skills Covered (comma-separated)</label>
                  <input
                    name="skills"
                    type="text"
                    placeholder="e.g., Leadership, Communication"
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Compliance (comma-separated, optional)</label>
                  <input
                    name="compliance"
                    type="text"
                    placeholder="e.g., OSHA, GDPR"
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
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
                name: formData.get('name'),
                description: formData.get('description'),
                category: formData.get('category'),
                status: formData.get('status'),
                duration: formData.get('duration'),
                budget: parseInt(formData.get('budget')),
                priority: formData.get('priority'),
                department: formData.get('department'),
                instructor: formData.get('instructor'),
                targetAudience: formData.get('targetAudience').split(',').map(s => s.trim()),
                skills: formData.get('skills').split(',').map(s => s.trim()),
                compliance: formData.get('compliance').split(',').map(s => s.trim()).filter(s => s)
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Program Name</label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={editingProgram.name}
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                  <select
                    name="priority"
                    defaultValue={editingProgram.priority}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">Budget ($)</label>
                  <input
                    name="budget"
                    type="number"
                    defaultValue={editingProgram.budget}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                  <select
                    name="department"
                    defaultValue={editingProgram.department}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Target Audience (comma-separated)</label>
                  <input
                    name="targetAudience"
                    type="text"
                    defaultValue={editingProgram.targetAudience.join(', ')}
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Skills Covered (comma-separated)</label>
                  <input
                    name="skills"
                    type="text"
                    defaultValue={editingProgram.skills.join(', ')}
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Compliance (comma-separated, optional)</label>
                  <input
                    name="compliance"
                    type="text"
                    defaultValue={editingProgram.compliance.join(', ')}
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
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