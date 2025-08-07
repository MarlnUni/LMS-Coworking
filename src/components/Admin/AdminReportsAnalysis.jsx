import { useState, useEffect } from 'react';

export default function AdminReportsAnalysis() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState('30days');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock learning analytics data
  const [learningData, setLearningData] = useState({
    totalUsers: 2847,
    activeLearners: 1892,
    totalCourses: 156,
    completionRate: 87.3,
    averageScore: 82.5,
    totalHours: 15420,
    certificatesIssued: 1247,
    feedbackScore: 4.2
  });

  // Mock feedback data
  const [feedbackData, setFeedbackData] = useState([
    {
      id: 1,
      user: 'Sarah Johnson',
      department: 'HR',
      course: 'Leadership Development',
      rating: 5,
      comment: 'Excellent course content and practical exercises. The leadership scenarios were very relevant to my role.',
      category: 'positive',
      date: '2024-03-25',
      tags: ['leadership', 'practical', 'relevant']
    },
    {
      id: 2,
      user: 'Mike Chen',
      department: 'IT',
      course: 'Technical Skills Enhancement',
      rating: 3,
      comment: 'Content was good but the pace was too fast. Need more hands-on practice sessions.',
      category: 'improvement',
      date: '2024-03-24',
      tags: ['technical', 'pace', 'hands-on']
    },
    {
      id: 3,
      user: 'Lisa Thompson',
      department: 'Sales',
      course: 'Sales Excellence Program',
      rating: 4,
      comment: 'Great sales techniques but would benefit from more real-world case studies.',
      category: 'positive',
      date: '2024-03-23',
      tags: ['sales', 'techniques', 'case-studies']
    },
    {
      id: 4,
      user: 'David Rodriguez',
      department: 'Operations',
      course: 'Compliance Training',
      rating: 2,
      comment: 'The compliance module was confusing and needs better organization. Some sections were unclear.',
      category: 'issue',
      date: '2024-03-22',
      tags: ['compliance', 'confusing', 'organization']
    },
    {
      id: 5,
      user: 'Emma Wilson',
      department: 'Marketing',
      course: 'Digital Marketing Fundamentals',
      rating: 5,
      comment: 'Outstanding course! The digital marketing strategies are cutting-edge and immediately applicable.',
      category: 'positive',
      date: '2024-03-21',
      tags: ['marketing', 'strategies', 'applicable']
    }
  ]);

  // Mock issue tracking data
  const [issuesData, setIssuesData] = useState([
    {
      id: 1,
      title: 'Platform Performance Issues',
      description: 'Users experiencing slow loading times during peak hours',
      severity: 'high',
      status: 'in-progress',
      department: 'IT',
      reportedBy: 'System Monitor',
      date: '2024-03-25',
      affectedUsers: 45,
      priority: 'urgent'
    },
    {
      id: 2,
      title: 'Course Content Accessibility',
      description: 'Some video content not accessible for users with disabilities',
      severity: 'medium',
      status: 'open',
      department: 'HR',
      reportedBy: 'Accessibility Team',
      date: '2024-03-24',
      affectedUsers: 12,
      priority: 'high'
    },
    {
      id: 3,
      title: 'Mobile App Crashes',
      description: 'Mobile learning app crashes on iOS devices',
      severity: 'high',
      status: 'resolved',
      department: 'IT',
      reportedBy: 'Mobile Team',
      date: '2024-03-23',
      affectedUsers: 23,
      priority: 'urgent'
    },
    {
      id: 4,
      title: 'Certificate Generation Delay',
      description: 'Certificate generation taking longer than expected',
      severity: 'low',
      status: 'open',
      department: 'Operations',
      reportedBy: 'Admin Team',
      date: '2024-03-22',
      affectedUsers: 8,
      priority: 'medium'
    }
  ]);

  // Mock Q&A data
  const [qaData, setQaData] = useState([
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
      category: 'technical',
      department: 'IT',
      asker: 'John Smith',
      responder: 'IT Support',
      date: '2024-03-25',
      helpful: 15,
      views: 45
    },
    {
      id: 2,
      question: 'Can I access courses offline?',
      answer: 'Currently, offline access is not available. We are working on implementing this feature.',
      category: 'feature',
      department: 'Product',
      asker: 'Maria Garcia',
      responder: 'Product Team',
      date: '2024-03-24',
      helpful: 8,
      views: 32
    },
    {
      id: 3,
      question: 'How do I request a course certificate?',
      answer: 'Certificates are automatically generated upon course completion. You can download them from your profile.',
      category: 'certification',
      department: 'Operations',
      asker: 'Alex Brown',
      responder: 'Admin Team',
      date: '2024-03-23',
      helpful: 22,
      views: 67
    },
    {
      id: 4,
      question: 'Are there group learning options?',
      answer: 'Yes, we offer group learning sessions and collaborative projects. Contact your manager for details.',
      category: 'learning',
      department: 'HR',
      asker: 'Sarah Wilson',
      responder: 'Learning Team',
      date: '2024-03-22',
      helpful: 12,
      views: 38
    }
  ]);

  // Mock advisory recommendations
  const [advisoryData, setAdvisoryData] = useState([
    {
      id: 1,
      title: 'Increase Mobile Learning Engagement',
      description: 'Mobile usage is 40% lower than desktop. Consider mobile-first course design.',
      impact: 'high',
      effort: 'medium',
      priority: 'urgent',
      category: 'engagement',
      department: 'Product',
      estimatedROI: '25%',
      timeline: '3 months'
    },
    {
      id: 2,
      title: 'Implement AI-Powered Learning Paths',
      description: 'Personalized learning recommendations could improve completion rates by 30%.',
      impact: 'high',
      effort: 'high',
      priority: 'high',
      category: 'personalization',
      department: 'Technology',
      estimatedROI: '30%',
      timeline: '6 months'
    },
    {
      id: 3,
      title: 'Enhance Feedback Collection System',
      description: 'Current feedback system is underutilized. Implement real-time feedback collection.',
      impact: 'medium',
      effort: 'low',
      priority: 'medium',
      category: 'feedback',
      department: 'Operations',
      estimatedROI: '15%',
      timeline: '2 months'
    },
    {
      id: 4,
      title: 'Optimize Course Content for Accessibility',
      description: 'Improve accessibility features to support users with disabilities.',
      impact: 'medium',
      effort: 'medium',
      priority: 'high',
      category: 'accessibility',
      department: 'HR',
      estimatedROI: '20%',
      timeline: '4 months'
    }
  ]);

  const departments = ['all', 'HR', 'IT', 'Sales', 'Marketing', 'Operations', 'Finance', 'Legal'];
  const categories = ['all', 'positive', 'improvement', 'issue', 'technical', 'feature', 'certification', 'learning'];

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-600',
      medium: 'bg-yellow-600',
      low: 'bg-green-600'
    };
    return colors[severity] || 'bg-gray-600';
  };

  const getStatusColor = (status) => {
    const colors = {
      'in-progress': 'bg-blue-600',
      'open': 'bg-yellow-600',
      'resolved': 'bg-green-600',
      'closed': 'bg-gray-600'
    };
    return colors[status] || 'bg-gray-600';
  };

  const getImpactColor = (impact) => {
    const colors = {
      high: 'bg-red-600',
      medium: 'bg-yellow-600',
      low: 'bg-green-600'
    };
    return colors[impact] || 'bg-gray-600';
  };

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesSearch = feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || feedback.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const filteredIssues = issuesData.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || issue.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Learning Analytics & Reports Dashboard</h2>
        <p className="text-gray-300">Comprehensive insights into learning performance, feedback analysis, issue tracking, and strategic recommendations</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-400">{learningData.totalUsers.toLocaleString()}</p>
          <p className="text-gray-400 text-sm">{learningData.activeLearners} active learners</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Completion Rate</h3>
          <p className="text-3xl font-bold text-green-400">{learningData.completionRate}%</p>
          <p className="text-gray-400 text-sm">Course completion</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Average Score</h3>
          <p className="text-3xl font-bold text-yellow-400">{learningData.averageScore}%</p>
          <p className="text-gray-400 text-sm">Learning performance</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Feedback Score</h3>
          <p className="text-3xl font-bold text-purple-400">{learningData.feedbackScore}/5</p>
          <p className="text-gray-400 text-sm">User satisfaction</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'overview' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'feedback' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Feedback Analysis
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'issues' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Issue Tracking
        </button>
        <button
          onClick={() => setActiveTab('qa')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'qa' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Q&A Insights
        </button>
        <button
          onClick={() => setActiveTab('advisory')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'advisory' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Advisory
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reports, feedback, issues, or Q&A..."
            className="w-full px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
          ))}
        </select>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Learning Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Courses</span>
                  <span className="text-white font-medium">{learningData.totalCourses}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Hours</span>
                  <span className="text-white font-medium">{learningData.totalHours.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Certificates Issued</span>
                  <span className="text-white font-medium">{learningData.certificatesIssued}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Learners</span>
                  <span className="text-white font-medium">{learningData.activeLearners}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Feedback Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Feedback</span>
                  <span className="text-white font-medium">{feedbackData.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Positive Reviews</span>
                  <span className="text-white font-medium">{feedbackData.filter(f => f.category === 'positive').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Issues Reported</span>
                  <span className="text-white font-medium">{feedbackData.filter(f => f.category === 'issue').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Avg Rating</span>
                  <span className="text-white font-medium">{(feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length).toFixed(1)}/5</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Issues</span>
                  <span className="text-white font-medium">{issuesData.filter(i => i.status === 'open' || i.status === 'in-progress').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Resolved Issues</span>
                  <span className="text-white font-medium">{issuesData.filter(i => i.status === 'resolved').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">High Priority</span>
                  <span className="text-white font-medium">{issuesData.filter(i => i.priority === 'urgent').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Q&A Responses</span>
                  <span className="text-white font-medium">{qaData.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Department Performance</h3>
              <div className="space-y-3">
                {Object.entries(
                  feedbackData.reduce((acc, feedback) => {
                    acc[feedback.department] = (acc[feedback.department] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([dept, count]) => (
                  <div key={dept} className="flex justify-between items-center">
                    <span className="text-gray-300">{dept}</span>
                    <span className="text-white font-medium">{count} feedback</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Top Advisory Recommendations</h3>
              <div className="space-y-3">
                {advisoryData.slice(0, 3).map(advisory => (
                  <div key={advisory.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{advisory.title}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(advisory.impact)}`}>
                      {advisory.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Analysis Tab */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Feedback Sentiment Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Positive Feedback</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-600 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-white text-sm">60%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Improvement Requests</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-600 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-white text-sm">25%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Issues Reported</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-600 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-white text-sm">15%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Top Feedback Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(
                  feedbackData.reduce((acc, feedback) => {
                    feedback.tags.forEach(tag => {
                      acc[tag] = (acc[tag] || 0) + 1;
                    });
                    return acc;
                  }, {})
                )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8)
                .map(([tag, count]) => (
                  <span key={tag} className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full">
                    {tag} ({count})
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Feedback</h3>
            <div className="space-y-4">
              {filteredFeedback.map(feedback => (
                <div key={feedback.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium">{feedback.user}</h4>
                      <p className="text-gray-400 text-sm">{feedback.course}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feedback.category === 'positive' ? 'bg-green-600' :
                        feedback.category === 'improvement' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}>
                        {feedback.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{feedback.comment}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {feedback.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-600/20 text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs">{feedback.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Issue Tracking Tab */}
      {activeTab === 'issues' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <h3 className="text-white font-medium mb-2">Open Issues</h3>
              <p className="text-3xl font-bold text-yellow-400">
                {issuesData.filter(i => i.status === 'open').length}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <h3 className="text-white font-medium mb-2">In Progress</h3>
              <p className="text-3xl font-bold text-blue-400">
                {issuesData.filter(i => i.status === 'in-progress').length}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <h3 className="text-white font-medium mb-2">Resolved</h3>
              <p className="text-3xl font-bold text-green-400">
                {issuesData.filter(i => i.status === 'resolved').length}
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Issue Tracking</h3>
            <div className="space-y-4">
              {filteredIssues.map(issue => (
                <div key={issue.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium">{issue.title}</h4>
                      <p className="text-gray-400 text-sm">{issue.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Department:</span>
                      <span className="text-white ml-2">{issue.department}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Reported By:</span>
                      <span className="text-white ml-2">{issue.reportedBy}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Affected Users:</span>
                      <span className="text-white ml-2">{issue.affectedUsers}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Priority:</span>
                      <span className="text-white ml-2">{issue.priority}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Reported: {issue.date}</span>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">Update</button>
                      <button className="text-green-400 hover:text-green-300 text-sm">Resolve</button>
                      <button className="text-red-400 hover:text-red-300 text-sm">Escalate</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Q&A Insights Tab */}
      {activeTab === 'qa' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <h3 className="text-white font-medium mb-2">Total Questions</h3>
              <p className="text-3xl font-bold text-blue-400">{qaData.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <h3 className="text-white font-medium mb-2">Total Views</h3>
              <p className="text-3xl font-bold text-green-400">{qaData.reduce((sum, qa) => sum + qa.views, 0)}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <h3 className="text-white font-medium mb-2">Helpful Votes</h3>
              <p className="text-3xl font-bold text-yellow-400">{qaData.reduce((sum, qa) => sum + qa.helpful, 0)}</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Q&A Database</h3>
            <div className="space-y-4">
              {qaData.map(qa => (
                <div key={qa.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-medium">{qa.question}</h4>
                      <p className="text-gray-400 text-sm">Asked by {qa.asker}</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">
                      {qa.category}
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="text-gray-300 text-sm"><strong>Answer:</strong> {qa.answer}</p>
                    <p className="text-gray-400 text-xs mt-1">Answered by {qa.responder}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4 text-sm">
                      <span className="text-gray-400">Views: {qa.views}</span>
                      <span className="text-gray-400">Helpful: {qa.helpful}</span>
                      <span className="text-gray-400">Department: {qa.department}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{qa.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Advisory Tab */}
      {activeTab === 'advisory' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Strategic Recommendations</h3>
              <div className="space-y-4">
                {advisoryData.map(advisory => (
                  <div key={advisory.id} className="border border-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{advisory.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(advisory.impact)}`}>
                        {advisory.impact} impact
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{advisory.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Effort:</span>
                        <span className="text-white ml-2">{advisory.effort}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Priority:</span>
                        <span className="text-white ml-2">{advisory.priority}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">ROI:</span>
                        <span className="text-white ml-2">{advisory.estimatedROI}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Timeline:</span>
                        <span className="text-white ml-2">{advisory.timeline}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-gray-400 text-xs">{advisory.department}</span>
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Implement</button>
                        <button className="text-green-400 hover:text-green-300 text-sm">Review</button>
                        <button className="text-yellow-400 hover:text-yellow-300 text-sm">Schedule</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Performance Insights</h3>
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Learning Trends</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Mobile Usage</span>
                      <span className="text-white">40% (↓ 5%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Completion Rate</span>
                      <span className="text-white">87.3% (↑ 2.1%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">User Engagement</span>
                      <span className="text-white">92% (↑ 3.5%)</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Department Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">IT Department</span>
                      <span className="text-white">94% completion</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Sales Team</span>
                      <span className="text-white">89% completion</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">HR Department</span>
                      <span className="text-white">82% completion</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">System Health</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Uptime</span>
                      <span className="text-green-400">99.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Response Time</span>
                      <span className="text-green-400">1.2s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Error Rate</span>
                      <span className="text-green-400">0.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 