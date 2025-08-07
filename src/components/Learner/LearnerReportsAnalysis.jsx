import { useState, useRef } from 'react';

export default function LearnerReportsAnalysis() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [linkedInPost, setLinkedInPost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock learner data
  const [learnerData, setLearnerData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    role: 'Software Developer',
    department: 'Engineering',
    joinDate: '2023-01-15',
    avatar: '👨‍💻',
    totalCourses: 24,
    completedCourses: 18,
    inProgressCourses: 4,
    totalHours: 156,
    averageScore: 87.5,
    certificates: 12,
    badges: 8,
    currentStreak: 15,
    longestStreak: 28,
    totalPoints: 2840,
    level: 'Advanced',
    rank: 'Top 10%'
  });

  // Mock achievements and certificates
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: 'Python Mastery',
      type: 'certificate',
      category: 'Programming',
      date: '2024-03-20',
      score: 95,
      hours: 24,
      instructor: 'Dr. Sarah Chen',
      description: 'Comprehensive Python programming course covering advanced concepts and real-world applications.',
      certificateUrl: '/certificates/python-mastery.pdf',
      badge: '🐍',
      points: 250,
      skills: ['Python', 'Data Structures', 'Algorithms', 'OOP'],
      linkedInShared: false
    },
    {
      id: 2,
      title: 'React Development Expert',
      type: 'certificate',
      category: 'Web Development',
      date: '2024-02-15',
      score: 92,
      hours: 32,
      instructor: 'Mike Rodriguez',
      description: 'Advanced React development with hooks, context, and modern best practices.',
      certificateUrl: '/certificates/react-expert.pdf',
      badge: '⚛️',
      points: 300,
      skills: ['React', 'JavaScript', 'Hooks', 'Context API'],
      linkedInShared: true
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      type: 'certificate',
      category: 'Data Science',
      date: '2024-01-30',
      score: 88,
      hours: 28,
      instructor: 'Dr. Emily Wang',
      description: 'Introduction to data science with Python, statistics, and machine learning.',
      certificateUrl: '/certificates/data-science.pdf',
      badge: '📊',
      points: 280,
      skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning'],
      linkedInShared: false
    },
    {
      id: 4,
      title: 'Leadership Excellence',
      type: 'badge',
      category: 'Soft Skills',
      date: '2024-03-10',
      score: 90,
      hours: 16,
      instructor: 'Lisa Thompson',
      description: 'Leadership skills development program for technical professionals.',
      certificateUrl: null,
      badge: '👑',
      points: 200,
      skills: ['Leadership', 'Communication', 'Team Management'],
      linkedInShared: false
    },
    {
      id: 5,
      title: 'AWS Cloud Practitioner',
      type: 'certificate',
      category: 'Cloud Computing',
      date: '2024-02-28',
      score: 94,
      hours: 20,
      instructor: 'David Kim',
      description: 'AWS Cloud Practitioner certification preparation and exam.',
      certificateUrl: '/certificates/aws-practitioner.pdf',
      badge: '☁️',
      points: 320,
      skills: ['AWS', 'Cloud Computing', 'DevOps'],
      linkedInShared: false
    }
  ]);

  // Mock learning goals
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Complete Machine Learning Course',
      category: 'Data Science',
      targetDate: '2024-06-30',
      progress: 65,
      status: 'in-progress',
      description: 'Master machine learning algorithms and applications'
    },
    {
      id: 2,
      title: 'Earn AWS Solutions Architect Certification',
      category: 'Cloud Computing',
      targetDate: '2024-08-15',
      progress: 25,
      status: 'in-progress',
      description: 'Prepare for and pass AWS Solutions Architect exam'
    },
    {
      id: 3,
      title: 'Learn Kubernetes',
      category: 'DevOps',
      targetDate: '2024-05-20',
      progress: 0,
      status: 'not-started',
      description: 'Master container orchestration with Kubernetes'
    }
  ]);

  // Mock learning analytics
  const [analytics, setAnalytics] = useState({
    monthlyProgress: [
      { month: 'Jan', hours: 12, courses: 2 },
      { month: 'Feb', hours: 18, courses: 3 },
      { month: 'Mar', hours: 24, courses: 4 },
      { month: 'Apr', hours: 16, courses: 2 }
    ],
    categoryBreakdown: [
      { category: 'Programming', hours: 48, percentage: 30 },
      { category: 'Web Development', hours: 32, percentage: 20 },
      { category: 'Data Science', hours: 28, percentage: 18 },
      { category: 'Cloud Computing', hours: 20, percentage: 13 },
      { category: 'Soft Skills', hours: 16, percentage: 10 },
      { category: 'DevOps', hours: 12, percentage: 8 }
    ],
    skillProgress: [
      { skill: 'Python', level: 85, target: 90 },
      { skill: 'React', level: 78, target: 85 },
      { skill: 'AWS', level: 65, target: 80 },
      { skill: 'Machine Learning', level: 45, target: 70 },
      { skill: 'Kubernetes', level: 20, target: 60 }
    ]
  });

  const categories = ['Programming', 'Web Development', 'Data Science', 'Cloud Computing', 'Soft Skills', 'DevOps'];

  const handleShareToLinkedIn = (achievement) => {
    setSelectedAchievement(achievement);
    setLinkedInPost(`I'm excited to share that I've completed the ${achievement.title} course with a score of ${achievement.score}%! 🎉\n\nThis ${achievement.category} course has helped me develop skills in ${achievement.skills.join(', ')}.\n\n#Learning #ProfessionalDevelopment #${achievement.category.replace(' ', '')}`);
    setShowLinkedInModal(true);
  };

  const handleDownloadCertificate = (achievement) => {
    setSelectedCertificate(achievement);
    setShowCertificateModal(true);
  };

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || achievement.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-400';
    if (progress >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const totalAchievements = achievements.length;
  const totalCertificates = achievements.filter(a => a.type === 'certificate').length;
  const totalBadges = achievements.filter(a => a.type === 'badge').length;
  const averageScore = achievements.length > 0 ? 
    (achievements.reduce((sum, achievement) => sum + achievement.score, 0) / achievements.length).toFixed(1) : 0;

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">My Learning Analytics</h2>
        <p className="text-gray-300">Track your achievements, view certificates, and share your accomplishments on LinkedIn.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Achievements</h3>
          <p className="text-3xl font-bold text-cyan-400">{totalAchievements}</p>
          <p className="text-gray-400 text-sm">{totalCertificates} certificates, {totalBadges} badges</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-green-400">{averageScore}%</p>
          <p className="text-gray-400 text-sm">Learning excellence</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Learning Streak</h3>
          <p className="text-3xl font-bold text-yellow-400">{learnerData.currentStreak} days</p>
          <p className="text-gray-400 text-sm">Current streak</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Points</h3>
          <p className="text-3xl font-bold text-purple-400">{learnerData.totalPoints}</p>
          <p className="text-gray-400 text-sm">Level: {learnerData.level}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'overview' 
              ? 'bg-cyan-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'achievements' 
              ? 'bg-cyan-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Achievements
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'goals' 
              ? 'bg-cyan-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Goals
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'analytics' 
              ? 'bg-cyan-600 text-white' 
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
            placeholder="Search achievements..."
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
          onClick={() => setShowGoalModal(true)}
          className="bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition-colors"
        >
          Add Goal
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Learning Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Courses Completed</span>
                <span className="text-white font-medium">{learnerData.completedCourses}/{learnerData.totalCourses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Learning Hours</span>
                <span className="text-white font-medium">{learnerData.totalHours} hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Average Score</span>
                <span className="text-white font-medium">{learnerData.averageScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Current Rank</span>
                <span className="text-white font-medium">{learnerData.rank}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Learning Level</span>
                <span className="text-white font-medium">{learnerData.level}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {achievements.slice(0, 3).map(achievement => (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl">{achievement.badge}</div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{achievement.title}</div>
                    <div className="text-gray-400 text-sm">{achievement.category}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${getScoreColor(achievement.score)}`}>{achievement.score}%</div>
                    <div className="text-gray-400 text-xs">{achievement.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => (
            <div key={achievement.id} className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl mb-2">{achievement.badge}</div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    achievement.type === 'certificate' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}>
                    {achievement.type}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyan-600">
                    {achievement.category}
                  </span>
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg mb-2">{achievement.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs">Score</p>
                  <p className={`text-sm font-medium ${getScoreColor(achievement.score)}`}>
                    {achievement.score}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Hours</p>
                  <p className="text-white text-sm font-medium">{achievement.hours}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Points</p>
                  <p className="text-white text-sm font-medium">{achievement.points}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Instructor</p>
                  <p className="text-white text-sm font-medium">{achievement.instructor}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-2">Skills Gained</p>
                <div className="flex flex-wrap gap-1">
                  {achievement.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-cyan-600/20 text-cyan-300 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  {achievement.date}
                </div>
                <div className="flex space-x-2">
                  {achievement.certificateUrl && (
                    <button
                      onClick={() => handleDownloadCertificate(achievement)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Download
                    </button>
                  )}
                  <button
                    onClick={() => handleShareToLinkedIn(achievement)}
                    className={`text-sm ${
                      achievement.linkedInShared 
                        ? 'text-green-400' 
                        : 'text-yellow-400 hover:text-yellow-300'
                    }`}
                  >
                    {achievement.linkedInShared ? 'Shared' : 'Share'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Learning Goals</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(goal => (
              <div key={goal.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-medium">{goal.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    goal.status === 'completed' ? 'bg-green-600' :
                    goal.status === 'in-progress' ? 'bg-yellow-600' : 'bg-gray-600'
                  }`}>
                    {goal.status}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">{goal.description}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400 text-xs">Progress</span>
                    <span className={`text-xs font-medium ${getProgressColor(goal.progress)}`}>
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-cyan-600 h-2 rounded-full" 
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Target: {goal.targetDate}</span>
                  <span className="text-cyan-400">{goal.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Learning Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Monthly Progress</h4>
              <div className="space-y-3">
                {analytics.monthlyProgress.map((month, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{month.month}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-white text-sm">{month.hours}h</span>
                      <span className="text-cyan-400 text-sm">{month.courses} courses</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Category Breakdown</h4>
              <div className="space-y-3">
                {analytics.categoryBreakdown.map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-cyan-600 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{category.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Skill Progress</h4>
              <div className="space-y-3">
                {analytics.skillProgress.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{skill.skill}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-sm">{skill.level}%</span>
                      <span className="text-gray-400 text-xs">→ {skill.target}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificateModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">Certificate - {selectedCertificate.title}</h3>
            
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{selectedCertificate.badge}</div>
                <div>
                  <h4 className="text-white font-medium">{selectedCertificate.title}</h4>
                  <p className="text-gray-400 text-sm">{selectedCertificate.category}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs">Score</p>
                  <p className={`text-sm font-medium ${getScoreColor(selectedCertificate.score)}`}>
                    {selectedCertificate.score}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Date Earned</p>
                  <p className="text-white text-sm">{selectedCertificate.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Instructor</p>
                  <p className="text-white text-sm">{selectedCertificate.instructor}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Hours</p>
                  <p className="text-white text-sm">{selectedCertificate.hours}</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm">{selectedCertificate.description}</p>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Download Certificate
              </button>
              <button 
                onClick={() => setShowCertificateModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LinkedIn Share Modal */}
      {showLinkedInModal && selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">Share to LinkedIn</h3>
            
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{selectedAchievement.badge}</div>
                <div>
                  <h4 className="text-white font-medium">{selectedAchievement.title}</h4>
                  <p className="text-gray-400 text-sm">{selectedAchievement.category}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Your LinkedIn Post:</p>
                <textarea
                  value={linkedInPost}
                  onChange={(e) => setLinkedInPost(e.target.value)}
                  rows="6"
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white resize-none"
                  placeholder="Write your LinkedIn post here..."
                />
              </div>

              <div className="text-xs text-gray-400">
                <p>💡 Tip: Include relevant hashtags and mention the skills you've learned!</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Share to LinkedIn
              </button>
              <button 
                onClick={() => setShowLinkedInModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">Add Learning Goal</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newGoal = {
                id: goals.length + 1,
                title: formData.get('title'),
                category: formData.get('category'),
                targetDate: formData.get('targetDate'),
                description: formData.get('description'),
                progress: 0,
                status: 'not-started'
              };
              setGoals([...goals, newGoal]);
              setShowGoalModal(false);
            }} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Goal Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">Target Date</label>
                  <input
                    name="targetDate"
                    type="date"
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
                  className="flex-1 bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700"
                >
                  Add Goal
                </button>
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
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