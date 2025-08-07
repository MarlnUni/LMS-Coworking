import { useState, useRef } from 'react';

export default function AdminGradeSetup() {
  const [activeTab, setActiveTab] = useState('schemes');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock grade schemes data
  const [gradeSchemes, setGradeSchemes] = useState([
    {
      id: 1,
      name: 'Standard Corporate Grading',
      description: 'Standard A-F grading system for corporate learning programs',
      category: 'General',
      status: 'active',
      grades: [
        { letter: 'A+', minScore: 97, maxScore: 100, points: 4.0, color: '#10B981' },
        { letter: 'A', minScore: 93, maxScore: 96, points: 4.0, color: '#10B981' },
        { letter: 'A-', minScore: 90, maxScore: 92, points: 3.7, color: '#34D399' },
        { letter: 'B+', minScore: 87, maxScore: 89, points: 3.3, color: '#60A5FA' },
        { letter: 'B', minScore: 83, maxScore: 86, points: 3.0, color: '#60A5FA' },
        { letter: 'B-', minScore: 80, maxScore: 82, points: 2.7, color: '#93C5FD' },
        { letter: 'C+', minScore: 77, maxScore: 79, points: 2.3, color: '#FBBF24' },
        { letter: 'C', minScore: 73, maxScore: 76, points: 2.0, color: '#FBBF24' },
        { letter: 'C-', minScore: 70, maxScore: 72, points: 1.7, color: '#FCD34D' },
        { letter: 'D+', minScore: 67, maxScore: 69, points: 1.3, color: '#F87171' },
        { letter: 'D', minScore: 63, maxScore: 66, points: 1.0, color: '#F87171' },
        { letter: 'D-', minScore: 60, maxScore: 62, points: 0.7, color: '#FCA5A5' },
        { letter: 'F', minScore: 0, maxScore: 59, points: 0.0, color: '#EF4444' }
      ],
      passingScore: 70,
      maxScore: 100,
      createdDate: '2024-01-15',
      lastUpdated: '2024-03-20',
      usedBy: 12
    },
    {
      id: 2,
      name: 'Competency-Based Assessment',
      description: 'Pass/Fail system for competency-based learning programs',
      category: 'Competency',
      status: 'active',
      grades: [
        { letter: 'Exceeds', minScore: 90, maxScore: 100, points: 3.0, color: '#10B981' },
        { letter: 'Meets', minScore: 80, maxScore: 89, points: 2.0, color: '#60A5FA' },
        { letter: 'Developing', minScore: 70, maxScore: 79, points: 1.0, color: '#FBBF24' },
        { letter: 'Needs Improvement', minScore: 0, maxScore: 69, points: 0.0, color: '#EF4444' }
      ],
      passingScore: 80,
      maxScore: 100,
      createdDate: '2024-02-01',
      lastUpdated: '2024-03-15',
      usedBy: 8
    },
    {
      id: 3,
      name: 'Leadership Development Scale',
      description: 'Specialized grading for leadership and management programs',
      category: 'Leadership',
      status: 'active',
      grades: [
        { letter: 'Outstanding', minScore: 95, maxScore: 100, points: 5.0, color: '#10B981' },
        { letter: 'Excellent', minScore: 85, maxScore: 94, points: 4.0, color: '#34D399' },
        { letter: 'Good', minScore: 75, maxScore: 84, points: 3.0, color: '#60A5FA' },
        { letter: 'Satisfactory', minScore: 65, maxScore: 74, points: 2.0, color: '#FBBF24' },
        { letter: 'Needs Work', minScore: 0, maxScore: 64, points: 1.0, color: '#EF4444' }
      ],
      passingScore: 75,
      maxScore: 100,
      createdDate: '2024-02-10',
      lastUpdated: '2024-03-10',
      usedBy: 5
    },
    {
      id: 4,
      name: 'Technical Skills Assessment',
      description: 'Grading system for technical and IT training programs',
      category: 'Technical',
      status: 'draft',
      grades: [
        { letter: 'Master', minScore: 90, maxScore: 100, points: 4.0, color: '#10B981' },
        { letter: 'Proficient', minScore: 80, maxScore: 89, points: 3.0, color: '#60A5FA' },
        { letter: 'Competent', minScore: 70, maxScore: 79, points: 2.0, color: '#FBBF24' },
        { letter: 'Basic', minScore: 60, maxScore: 69, points: 1.0, color: '#F87171' },
        { letter: 'Novice', minScore: 0, maxScore: 59, points: 0.0, color: '#EF4444' }
      ],
      passingScore: 70,
      maxScore: 100,
      createdDate: '2024-03-01',
      lastUpdated: '2024-03-05',
      usedBy: 0
    }
  ]);

  // Mock achievement badges
  const [achievementBadges, setAchievementBadges] = useState([
    {
      id: 1,
      name: 'Learning Champion',
      description: 'Awarded for completing 10 courses with 90%+ scores',
      icon: '🏆',
      color: '#F59E0B',
      criteria: 'Complete 10 courses with 90%+ scores',
      points: 100,
      category: 'Achievement',
      status: 'active',
      awardedTo: 15
    },
    {
      id: 2,
      name: 'Skill Master',
      description: 'Mastered 5 different skill categories',
      icon: '⭐',
      color: '#10B981',
      criteria: 'Achieve mastery in 5 skill categories',
      points: 150,
      category: 'Skills',
      status: 'active',
      awardedTo: 8
    },
    {
      id: 3,
      name: 'Leadership Excellence',
      description: 'Completed all leadership development modules',
      icon: '👑',
      color: '#8B5CF6',
      criteria: 'Complete all leadership modules with 85%+',
      points: 200,
      category: 'Leadership',
      status: 'active',
      awardedTo: 12
    },
    {
      id: 4,
      name: 'Technical Expert',
      description: 'Advanced technical skills certification',
      icon: '💻',
      color: '#3B82F6',
      criteria: 'Complete technical courses with 95%+ scores',
      points: 175,
      category: 'Technical',
      status: 'active',
      awardedTo: 6
    },
    {
      id: 5,
      name: 'Compliance Champion',
      description: 'Perfect compliance training completion',
      icon: '🛡️',
      color: '#EF4444',
      criteria: 'Complete all compliance courses with 100%',
      points: 125,
      category: 'Compliance',
      status: 'active',
      awardedTo: 25
    }
  ]);

  // Mock competency frameworks
  const [competencyFrameworks, setCompetencyFrameworks] = useState([
    {
      id: 1,
      name: 'Leadership Competencies',
      description: 'Core leadership skills and behaviors',
      levels: ['Novice', 'Developing', 'Proficient', 'Expert', 'Master'],
      competencies: [
        { name: 'Strategic Thinking', weight: 20 },
        { name: 'Team Management', weight: 25 },
        { name: 'Communication', weight: 20 },
        { name: 'Decision Making', weight: 15 },
        { name: 'Innovation', weight: 20 }
      ],
      status: 'active',
      usedBy: 8
    },
    {
      id: 2,
      name: 'Technical Competencies',
      description: 'Technical skills and knowledge areas',
      levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      competencies: [
        { name: 'Programming', weight: 30 },
        { name: 'System Design', weight: 25 },
        { name: 'Problem Solving', weight: 25 },
        { name: 'Technology Trends', weight: 20 }
      ],
      status: 'active',
      usedBy: 12
    }
  ]);

  const categories = ['General', 'Competency', 'Leadership', 'Technical', 'Sales', 'Customer Service'];
  const badgeCategories = ['Achievement', 'Skills', 'Leadership', 'Technical', 'Compliance', 'Innovation'];

  const handleCreateScheme = (schemeData) => {
    const newScheme = {
      id: gradeSchemes.length + 1,
      ...schemeData,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      usedBy: 0
    };
    setGradeSchemes([...gradeSchemes, newScheme]);
    setShowCreateModal(false);
  };

  const handleUpdateScheme = (updatedScheme) => {
    setGradeSchemes(prev => prev.map(scheme => 
      scheme.id === updatedScheme.id 
        ? { ...updatedScheme, lastUpdated: new Date().toISOString().split('T')[0] }
        : scheme
    ));
    setShowEditModal(false);
    setEditingScheme(null);
  };

  const handleDeleteScheme = (schemeId) => {
    if (window.confirm('Are you sure you want to delete this grade scheme?')) {
      setGradeSchemes(prev => prev.filter(scheme => scheme.id !== schemeId));
    }
  };

  const handleDuplicateScheme = (scheme) => {
    const duplicatedScheme = {
      ...scheme,
      id: gradeSchemes.length + 1,
      name: `${scheme.name} (Copy)`,
      status: 'draft',
      usedBy: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setGradeSchemes([...gradeSchemes, duplicatedScheme]);
  };

  const filteredSchemes = gradeSchemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || scheme.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-600',
      draft: 'bg-yellow-600',
      archived: 'bg-gray-600'
    };
    return colors[status] || 'bg-gray-600';
  };

  const totalSchemes = gradeSchemes.length;
  const activeSchemes = gradeSchemes.filter(s => s.status === 'active').length;
  const totalBadges = achievementBadges.length;
  const totalCompetencies = competencyFrameworks.length;

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Learning Achievement & Grade Management</h2>
        <p className="text-gray-300">Configure grading schemes, achievement badges, and competency frameworks for employee development</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Grade Schemes</h3>
          <p className="text-3xl font-bold text-blue-400">{totalSchemes}</p>
          <p className="text-gray-400 text-sm">{activeSchemes} active</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Achievement Badges</h3>
          <p className="text-3xl font-bold text-yellow-400">{totalBadges}</p>
          <p className="text-gray-400 text-sm">Available badges</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Competency Frameworks</h3>
          <p className="text-3xl font-bold text-green-400">{totalCompetencies}</p>
          <p className="text-gray-400 text-sm">Active frameworks</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Awards</h3>
          <p className="text-3xl font-bold text-purple-400">{achievementBadges.reduce((sum, badge) => sum + badge.awardedTo, 0)}</p>
          <p className="text-gray-400 text-sm">Badges awarded</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('schemes')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'schemes' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Grade Schemes
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'badges' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Achievement Badges
        </button>
        <button
          onClick={() => setActiveTab('competencies')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'competencies' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Competency Frameworks
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
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search schemes, badges, or competencies..."
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
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Scheme
        </button>
      </div>

      {/* Grade Schemes View */}
      {activeTab === 'schemes' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchemes.map(scheme => (
            <div key={scheme.id} className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{scheme.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{scheme.description}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scheme.status)}`}>
                    {scheme.status}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600">
                    {scheme.category}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs">Passing Score</p>
                  <p className="text-white text-sm font-medium">{scheme.passingScore}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Max Score</p>
                  <p className="text-white text-sm font-medium">{scheme.maxScore}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Grade Levels</p>
                  <p className="text-white text-sm font-medium">{scheme.grades.length}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Used By</p>
                  <p className="text-white text-sm font-medium">{scheme.usedBy} programs</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-2">Grade Scale</p>
                <div className="flex flex-wrap gap-1">
                  {scheme.grades.slice(0, 6).map(grade => (
                    <span 
                      key={grade.letter} 
                      className="px-2 py-1 text-xs rounded font-medium"
                      style={{ backgroundColor: grade.color + '20', color: grade.color }}
                    >
                      {grade.letter}
                    </span>
                  ))}
                  {scheme.grades.length > 6 && (
                    <span className="px-2 py-1 bg-gray-600/20 text-gray-300 text-xs rounded">
                      +{scheme.grades.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  Updated: {scheme.lastUpdated}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingScheme(scheme);
                      setShowEditModal(true);
                    }}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDuplicateScheme(scheme)}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => handleDeleteScheme(scheme.id)}
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

      {/* Achievement Badges View */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementBadges.map(badge => (
            <div key={badge.id} className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors">
              <div className="text-center mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"
                  style={{ backgroundColor: badge.color + '20' }}
                >
                  {badge.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{badge.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{badge.description}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Criteria</span>
                  <span className="text-white text-sm">{badge.criteria}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Points</span>
                  <span className="text-white text-sm font-medium">{badge.points}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Awarded To</span>
                  <span className="text-white text-sm font-medium">{badge.awardedTo} employees</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Category</span>
                  <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">
                    {badge.category}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                  Edit Badge
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors text-sm">
                  View Awards
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Competency Frameworks View */}
      {activeTab === 'competencies' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {competencyFrameworks.map(framework => (
            <div key={framework.id} className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">{framework.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{framework.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(framework.status)}`}>
                  {framework.status}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-2">Competency Levels</p>
                <div className="flex flex-wrap gap-1">
                  {framework.levels.map(level => (
                    <span key={level} className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">
                      {level}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-2">Competencies</p>
                <div className="space-y-2">
                  {framework.competencies.map(competency => (
                    <div key={competency.name} className="flex justify-between items-center">
                      <span className="text-white text-sm">{competency.name}</span>
                      <span className="text-gray-300 text-sm">{competency.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  Used by {framework.usedBy} programs
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                  <button className="text-green-400 hover:text-green-300 text-sm">Duplicate</button>
                  <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics View */}
      {activeTab === 'analytics' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Achievement Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Most Popular Badges</h4>
              <div className="space-y-3">
                {achievementBadges
                  .sort((a, b) => b.awardedTo - a.awardedTo)
                  .slice(0, 5)
                  .map(badge => (
                    <div key={badge.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{badge.icon}</span>
                        <span className="text-gray-300 text-sm">{badge.name}</span>
                      </div>
                      <span className="text-white text-sm font-medium">{badge.awardedTo}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Grade Distribution</h4>
              <div className="space-y-3">
                {gradeSchemes[0]?.grades.slice(0, 5).map(grade => (
                  <div key={grade.letter} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{grade.letter}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-600 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${((grade.maxScore - grade.minScore + 1) / 100) * 100}%`,
                            backgroundColor: grade.color
                          }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{grade.maxScore - grade.minScore + 1}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Competency Usage</h4>
              <div className="space-y-3">
                {competencyFrameworks.map(framework => (
                  <div key={framework.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{framework.name}</span>
                    <span className="text-white text-sm font-medium">{framework.usedBy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Achievement Categories</h4>
              <div className="space-y-2">
                {Object.entries(
                  achievementBadges.reduce((acc, badge) => {
                    acc[badge.category] = (acc[badge.category] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-gray-300">{category}</span>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Grade Scheme Categories</h4>
              <div className="space-y-2">
                {Object.entries(
                  gradeSchemes.reduce((acc, scheme) => {
                    acc[scheme.category] = (acc[scheme.category] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-gray-300">{category}</span>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Grade Scheme Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Create Grade Scheme</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleCreateScheme({
                name: formData.get('name'),
                description: formData.get('description'),
                category: formData.get('category'),
                status: formData.get('status'),
                passingScore: parseInt(formData.get('passingScore')),
                maxScore: parseInt(formData.get('maxScore')),
                grades: [
                  { letter: 'A+', minScore: 97, maxScore: 100, points: 4.0, color: '#10B981' },
                  { letter: 'A', minScore: 93, maxScore: 96, points: 4.0, color: '#10B981' },
                  { letter: 'A-', minScore: 90, maxScore: 92, points: 3.7, color: '#34D399' },
                  { letter: 'B+', minScore: 87, maxScore: 89, points: 3.3, color: '#60A5FA' },
                  { letter: 'B', minScore: 83, maxScore: 86, points: 3.0, color: '#60A5FA' },
                  { letter: 'B-', minScore: 80, maxScore: 82, points: 2.7, color: '#93C5FD' },
                  { letter: 'C+', minScore: 77, maxScore: 79, points: 2.3, color: '#FBBF24' },
                  { letter: 'C', minScore: 73, maxScore: 76, points: 2.0, color: '#FBBF24' },
                  { letter: 'C-', minScore: 70, maxScore: 72, points: 1.7, color: '#FCD34D' },
                  { letter: 'D+', minScore: 67, maxScore: 69, points: 1.3, color: '#F87171' },
                  { letter: 'D', minScore: 63, maxScore: 66, points: 1.0, color: '#F87171' },
                  { letter: 'D-', minScore: 60, maxScore: 62, points: 0.7, color: '#FCA5A5' },
                  { letter: 'F', minScore: 0, maxScore: 59, points: 0.0, color: '#EF4444' }
                ]
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Scheme Name</label>
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
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Passing Score (%)</label>
                  <input
                    name="passingScore"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue="70"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Maximum Score (%)</label>
                  <input
                    name="maxScore"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue="100"
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

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Create Scheme
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

      {/* Edit Grade Scheme Modal */}
      {showEditModal && editingScheme && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Edit Grade Scheme</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUpdateScheme({
                ...editingScheme,
                name: formData.get('name'),
                description: formData.get('description'),
                category: formData.get('category'),
                status: formData.get('status'),
                passingScore: parseInt(formData.get('passingScore')),
                maxScore: parseInt(formData.get('maxScore'))
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Scheme Name</label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={editingScheme.name}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingScheme.category}
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
                    defaultValue={editingScheme.status}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Passing Score (%)</label>
                  <input
                    name="passingScore"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={editingScheme.passingScore}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Maximum Score (%)</label>
                  <input
                    name="maxScore"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={editingScheme.maxScore}
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
                  defaultValue={editingScheme.description}
                  required
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                ></textarea>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Update Scheme
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