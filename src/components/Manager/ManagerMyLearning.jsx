import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManagerMyLearning({ user }) {
  console.log('🚀 MANAGER MyLearning component loaded - GREEN THEME');
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedView, setSelectedView] = useState('grid');
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Manager-specific learning path
  const learningPath = [
    {
      id: 1,
      name: "Team Leadership & Management",
      category: "Leadership",
      difficulty: "Intermediate",
      progress: 85,
      stars: 2,
      maxStars: 3,
      status: "in-progress",
      estimatedTime: "16 hours",
      timeSpent: "13.6 hours",
      dueDate: "2024-02-18",
      description: "Develop effective team leadership and management skills",
      mandatory: true,
      department: "Management",
      instructor: "Prof. David Wilson",
      rating: 4.6,
      reviews: 134,
      modules: [
        { name: "Team Building", completed: true, stars: 3, duration: "90 min", type: "video" },
        { name: "Performance Management", completed: true, stars: 2, duration: "120 min", type: "interactive" },
        { name: "Conflict Resolution", completed: false, stars: 0, duration: "100 min", type: "workshop" }
      ],
      resources: [
        { name: "Leadership Handbook", type: "PDF", size: "3.2 MB" },
        { name: "Team Templates", type: "ZIP", size: "2.8 MB" },
        { name: "Performance Review Guide", type: "PDF", size: "1.9 MB" }
      ],
      badges: ["Team Leader", "Performance Coach"],
      xpReward: 250,
      certificate: true
    },
    {
      id: 2,
      name: "Project Management Fundamentals",
      category: "Project Management",
      difficulty: "Intermediate",
      progress: 70,
      stars: 2,
      maxStars: 3,
      status: "in-progress",
      estimatedTime: "20 hours",
      timeSpent: "14 hours",
      dueDate: "2024-02-25",
      description: "Master project planning, execution, and delivery",
      mandatory: true,
      department: "Operations",
      instructor: "Sarah Johnson",
      rating: 4.8,
      reviews: 89,
      modules: [
        { name: "Project Planning", completed: true, stars: 3, duration: "150 min", type: "video" },
        { name: "Resource Management", completed: true, stars: 2, duration: "120 min", type: "interactive" },
        { name: "Risk Management", completed: false, stars: 0, duration: "90 min", type: "case-study" }
      ],
      resources: [
        { name: "Project Templates", type: "ZIP", size: "5.4 MB" },
        { name: "Risk Assessment Tools", type: "PDF", size: "2.1 MB" }
      ],
      badges: ["Project Manager"],
      xpReward: 300,
      certificate: true
    },
    {
      id: 3,
      name: "Business Communication",
      category: "Communication",
      difficulty: "Beginner",
      progress: 100,
      stars: 3,
      maxStars: 3,
      status: "completed",
      estimatedTime: "12 hours",
      timeSpent: "12 hours",
      dueDate: "2024-01-20",
      description: "Enhance professional communication skills",
      mandatory: false,
      department: "HR",
      instructor: "Lisa Chen",
      rating: 4.5,
      reviews: 156,
      modules: [
        { name: "Written Communication", completed: true, stars: 3, duration: "80 min", type: "video" },
        { name: "Presentation Skills", completed: true, stars: 3, duration: "100 min", type: "interactive" },
        { name: "Negotiation Techniques", completed: true, stars: 3, duration: "120 min", type: "workshop" }
      ],
      resources: [
        { name: "Communication Templates", type: "ZIP", size: "3.7 MB" },
        { name: "Presentation Guide", type: "PDF", size: "2.8 MB" }
      ],
      badges: ["Communicator", "Perfect Score"],
      xpReward: 200,
      certificate: true
    },
    {
      id: 4,
      name: "Strategic Planning & Execution",
      category: "Strategy",
      difficulty: "Advanced",
      progress: 40,
      stars: 1,
      maxStars: 3,
      status: "assigned",
      estimatedTime: "18 hours",
      timeSpent: "7.2 hours",
      dueDate: "2024-03-10",
      description: "Develop strategic thinking and execution capabilities",
      mandatory: true,
      department: "Strategy",
      instructor: "Dr. Michael Brown",
      rating: 4.7,
      reviews: 67,
      modules: [
        { name: "Strategic Analysis", completed: true, stars: 2, duration: "120 min", type: "video" },
        { name: "Goal Setting", completed: false, stars: 0, duration: "90 min", type: "interactive" },
        { name: "Execution Planning", completed: false, stars: 0, duration: "150 min", type: "case-study" }
      ],
      resources: [
        { name: "Strategic Framework", type: "PDF", size: "4.2 MB" },
        { name: "Planning Tools", type: "ZIP", size: "6.1 MB" }
      ],
      badges: ["Strategic Thinker"],
      xpReward: 350,
      certificate: true
    }
  ];

  const userStats = {
    totalStars: 8,
    maxStars: 12,
    completionRate: 78,
    learningStreak: 15,
    level: 10,
    xp: 3200,
    nextLevelXp: 4000,
    certificates: 3,
    totalCourses: 4,
    completedCourses: 1,
    teamRank: 2,
    companyRank: 8,
    totalXp: 3200,
    badges: ["Team Leader", "Performance Coach", "Communicator", "Perfect Score", "Project Manager"],
    skills: [
      { name: "Team Leadership", level: 85, category: "Leadership" },
      { name: "Project Management", level: 70, category: "Operations" },
      { name: "Communication", level: 100, category: "Soft Skills" },
      { name: "Strategic Planning", level: 40, category: "Strategy" }
    ],
    managerMetrics: {
      teamSize: 12,
      activeProjects: 8,
      teamPerformance: 92.5,
      projectSuccessRate: 88.0
    }
  };

  const filters = [
    { id: 'all', label: 'All Courses', count: learningPath.length },
    { id: 'assigned', label: 'Assigned', count: learningPath.filter(c => c.status === 'assigned').length },
    { id: 'in-progress', label: 'In Progress', count: learningPath.filter(c => c.status === 'in-progress').length },
    { id: 'completed', label: 'Completed', count: learningPath.filter(c => c.status === 'completed').length }
  ];

  const filteredCourses = learningPath.filter(course => {
    const matchesFilter = activeFilter === 'all' || course.status === activeFilter;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderStars = (stars, maxStars) => {
    return Array.from({ length: maxStars }, (_, i) => (
      <span key={i} className={`text-lg ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'assigned': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderSkillMap = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {userStats.skills.map(skill => (
        <div key={skill.name} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800">{skill.name}</div>
            <div className="text-2xl font-bold text-green-600">{skill.level}%</div>
            <div className="text-xs text-gray-600">{skill.category}</div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div 
                className="h-2 bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCalendar = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Learning Calendar</h3>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const date = new Date(2024, 1, i - 3);
          const course = learningPath.find(c => 
            new Date(c.dueDate).toDateString() === date.toDateString()
          );
          return (
            <div key={i} className={`p-2 text-center text-sm border rounded ${
              course ? 'bg-green-100 border-green-300' : 'bg-gray-50'
            }`}>
              <div className="font-medium">{date.getDate()}</div>
              {course && (
                <div className="text-xs text-green-600 truncate">{course.name}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-400 p-4">
      <div className="w-full max-w-none mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Manager Learning Hub</h1>
            <p className="text-green-100 text-lg">Develop leadership, management, and strategic skills</p>
            <div className="mt-4 p-3 bg-green-800 rounded-lg">
              <p className="text-green-100 text-sm font-semibold">🎯 MANAGER ROLE - Team Leadership & Project Management</p>
              <p className="text-green-200 text-xs mt-1">Component: ManagerMyLearning.jsx</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">Level {userStats.level}</div>
                <div className="text-sm text-green-100">XP: {userStats.xp}/{userStats.nextLevelXp}</div>
                <div className="w-24 h-2 bg-white/20 rounded-full mt-2">
                  <div 
                    className="h-2 bg-yellow-400 rounded-full transition-all duration-300"
                    style={{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">{userStats.totalStars}/{userStats.maxStars}</div>
                <div className="text-sm text-green-100">Stars Total</div>
                <div className="text-yellow-400 text-lg">★</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-8">
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: 'dashboard' },
              { id: 'analytics', label: 'Analytics', icon: 'analytics' },
              { id: 'resources', label: 'Resources', icon: 'folder' },
              { id: 'community', label: 'Community', icon: 'forum' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-green-900'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <span className="material-icons text-sm">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{userStats.completionRate}%</div>
                    <div className="text-green-100">Completion Rate</div>
                  </div>
                  <span className="material-icons text-3xl text-green-400">trending_up</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{userStats.learningStreak}</div>
                    <div className="text-green-100">Day Streak</div>
                  </div>
                  <span className="material-icons text-3xl text-orange-400">local_fire_department</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{userStats.certificates}</div>
                    <div className="text-green-100">Certificates</div>
                  </div>
                  <span className="material-icons text-3xl text-blue-400">card_membership</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{userStats.completedCourses}/{userStats.totalCourses}</div>
                    <div className="text-green-100">Courses Completed</div>
                  </div>
                  <span className="material-icons text-3xl text-purple-400">school</span>
                </div>
              </div>
            </div>

            {/* Manager Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{userStats.managerMetrics.teamSize}</div>
                    <div className="text-green-100">Team Size</div>
                  </div>
                  <span className="material-icons text-3xl text-blue-400">people</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{userStats.managerMetrics.activeProjects}</div>
                    <div className="text-green-100">Active Projects</div>
                  </div>
                  <span className="material-icons text-3xl text-green-400">assignment</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{userStats.managerMetrics.teamPerformance}%</div>
                    <div className="text-green-100">Team Performance</div>
                  </div>
                  <span className="material-icons text-3xl text-yellow-400">trending_up</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{userStats.managerMetrics.projectSuccessRate}%</div>
                    <div className="text-green-100">Success Rate</div>
                  </div>
                  <span className="material-icons text-3xl text-purple-400">check_circle</span>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {filters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        activeFilter === filter.id
                          ? 'bg-white text-green-900'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white/20 text-white placeholder-green-100 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-green-100">
                      search
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSelectedView('grid')}
                      className={`p-2 rounded-lg ${selectedView === 'grid' ? 'bg-white text-green-900' : 'bg-white/20 text-white'}`}
                    >
                      <span className="material-icons">grid_view</span>
                    </button>
                    <button
                      onClick={() => setSelectedView('list')}
                      className={`p-2 rounded-lg ${selectedView === 'list' ? 'bg-white text-green-900' : 'bg-white/20 text-white'}`}
                    >
                      <span className="material-icons">list</span>
                    </button>
                    <button
                      onClick={() => setShowCalendar(!showCalendar)}
                      className={`p-2 rounded-lg ${showCalendar ? 'bg-white text-green-900' : 'bg-white/20 text-white'}`}
                    >
                      <span className="material-icons">calendar_today</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar View */}
            {showCalendar && (
              <div className="mb-8">
                {renderCalendar()}
              </div>
            )}

            {/* Learning Path Map */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Management Learning Path</h2>
                <p className="text-green-100">Your journey to becoming an effective leader</p>
              </div>
              
              <div className="p-8">
                {selectedView === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                      <div key={course.id} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-center mb-4">
                          <div className={`w-16 h-16 mx-auto rounded-full border-4 border-white shadow-lg flex items-center justify-center mb-3 ${
                            course.status === 'completed' ? 'bg-green-500' :
                            course.status === 'in-progress' ? 'bg-blue-500' :
                            'bg-amber-500'
                          }`}>
                            <span className="material-icons text-white text-xl">
                              {course.status === 'completed' ? 'check' :
                               course.status === 'in-progress' ? 'play_arrow' :
                               'schedule'}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-800 text-lg mb-2">{course.name}</h3>
                          <div className="flex justify-center mb-2">
                            {renderStars(course.stars, course.maxStars)}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">{course.category}</div>
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                            {course.difficulty}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>{course.progress}%</span>
                              <span>{course.timeSpent}/{course.estimatedTime}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  course.status === 'completed' ? 'bg-green-500' :
                                  course.status === 'in-progress' ? 'bg-blue-500' :
                                  'bg-amber-500'
                                }`}
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Instructor:</span>
                            <span className="font-medium">{course.instructor}</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Rating:</span>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">★</span>
                              <span>{course.rating}</span>
                              <span className="text-gray-500">({course.reviews})</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">XP Reward:</span>
                            <span className="font-medium text-green-600">{course.xpReward} XP</span>
                          </div>
                          
                          <button className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                            {course.status === 'completed' ? 'Review' :
                             course.status === 'in-progress' ? 'Continue' :
                             'Start'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCourses.map((course) => (
                      <div key={course.id} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                              course.status === 'completed' ? 'bg-green-500' :
                              course.status === 'in-progress' ? 'bg-blue-500' :
                              'bg-amber-500'
                            }`}>
                              <span className="material-icons text-white">
                                {course.status === 'completed' ? 'check' :
                                 course.status === 'in-progress' ? 'play_arrow' :
                                 'schedule'}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 text-lg">{course.name}</h3>
                              <p className="text-gray-600">{course.description}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-gray-500">{course.category}</span>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                                  {course.difficulty}
                                </div>
                                <div className="flex items-center gap-1">
                                  {renderStars(course.stars, course.maxStars)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{course.progress}%</div>
                            <div className="text-sm text-gray-600">{course.timeSpent}/{course.estimatedTime}</div>
                            <button className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                              {course.status === 'completed' ? 'Review' :
                               course.status === 'in-progress' ? 'Continue' :
                               'Start'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Continue Learning Widget */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Continue Learning</h2>
                <p className="text-blue-100">Pick up where you left off</p>
              </div>
              
              <div className="p-6">
                {filteredCourses.filter(c => c.status === 'in-progress').slice(0, 2).map(course => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4 last:mb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="material-icons text-white">play_arrow</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{course.name}</h3>
                        <p className="text-sm text-gray-600">Next: {course.modules.find(m => !m.completed)?.name}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Resume
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Upcoming Deadlines</h2>
                <p className="text-green-100">Stay on track with your learning goals</p>
              </div>
              
              <div className="p-6">
                {filteredCourses
                  .filter(c => c.status !== 'completed')
                  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .slice(0, 3)
                  .map(course => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4 last:mb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="material-icons text-white">schedule</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{course.name}</h3>
                          <p className="text-sm text-gray-600">Due: {new Date(course.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800">{course.progress}% Complete</div>
                        <div className="text-xs text-gray-600">{course.estimatedTime} remaining</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Skill Map */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Management Skill Development</h2>
                <p className="text-purple-100">Track your leadership and management progression</p>
              </div>
              <div className="p-6">
                {renderSkillMap()}
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Performance vs Peers</h3>
                  <p className="text-green-100">Compare your progress with other managers</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Your Completion Rate</span>
                      <span className="font-bold text-green-600">{userStats.completionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Manager Average</span>
                      <span className="font-bold text-blue-600">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Industry Average</span>
                      <span className="font-bold text-purple-600">68%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Your Rank</span>
                      <span className="font-bold text-green-600">#{userStats.teamRank} in Company</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Leadership Milestones</h3>
                  <p className="text-blue-100">Your management development achievements</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{userStats.learningStreak}</div>
                      <div className="text-gray-600">Current Streak (Days)</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">20</div>
                        <div className="text-sm text-gray-600">Best Streak</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">3200</div>
                        <div className="text-sm text-gray-600">Total XP</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            {/* Downloadable Resources */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Management Resources</h2>
                <p className="text-indigo-100">Access leadership materials and management tools</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {learningPath.flatMap(course => 
                    course.resources.map((resource, index) => (
                      <div key={`${course.id}-${index}`} className="bg-gray-50 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="material-icons text-indigo-600">
                            {resource.type === 'PDF' ? 'picture_as_pdf' : 'folder_zip'}
                          </span>
                          <span className="text-xs text-gray-500">{resource.size}</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">{resource.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{course.name}</p>
                        <button className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm">
                          Download
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Certificate Management */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Management Certificates</h2>
                <p className="text-green-100">View and download your leadership certifications</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {learningPath.filter(c => c.certificate && c.status === 'completed').map(course => (
                    <div key={course.id} className="bg-gray-50 rounded-xl p-4 shadow-sm">
                      <div className="text-center mb-4">
                        <span className="material-icons text-green-600 text-4xl mb-2">card_membership</span>
                        <h4 className="font-semibold text-gray-800">{course.name}</h4>
                        <p className="text-sm text-gray-600">Completed on {new Date(course.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
                          Download Certificate
                        </button>
                        <button className="w-full px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm">
                          Share Certificate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-8">
            {/* Discussion Forums */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Management Forums</h2>
                <p className="text-orange-100">Connect with other managers and leadership experts</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {learningPath.slice(0, 3).map(course => (
                    <div key={course.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{course.name} Forum</h4>
                        <span className="text-sm text-gray-500">18 active discussions</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Share management challenges and leadership insights</p>
                      <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm">
                        Join Discussion
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Ratings & Reviews */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Course Ratings & Reviews</h2>
                <p className="text-teal-100">Share your feedback and read peer reviews</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {filteredCourses.map(course => (
                    <div key={course.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">{course.name}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {renderStars(Math.floor(course.rating), 5)}
                          </div>
                          <span className="text-sm text-gray-600">({course.reviews} reviews)</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors text-sm">
                          Rate Course
                        </button>
                        <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm">
                          Read Reviews
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 