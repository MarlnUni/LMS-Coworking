import { useState, useRef } from 'react';

export default function InstructorCourseManagement() {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const fileInputRef = useRef(null);

  // Mock course data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Advanced Mathematics for Engineers',
      description: 'Comprehensive course covering advanced mathematical concepts essential for engineering applications.',
      category: 'Mathematics',
      status: 'published',
      price: 89.99,
      students: 156,
      rating: 4.8,
      totalLessons: 24,
      totalDuration: '12 hours',
      lastUpdated: '2024-03-25',
      instructor: 'Dr. Sarah Johnson',
      thumbnail: '📐',
      tags: ['Engineering', 'Mathematics', 'Advanced'],
      modules: [
        { id: 1, title: 'Linear Algebra Fundamentals', lessons: 6, duration: '3 hours' },
        { id: 2, title: 'Calculus Applications', lessons: 8, duration: '4 hours' },
        { id: 3, title: 'Differential Equations', lessons: 10, duration: '5 hours' }
      ],
      settings: {
        certificate: true,
        lifetimeAccess: true,
        downloadable: true,
        discussionEnabled: true,
        autoEnrollment: false
      }
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Learn the basics of data science, statistics, and machine learning with practical projects.',
      category: 'Data Science',
      status: 'draft',
      price: 129.99,
      students: 89,
      rating: 4.6,
      totalLessons: 18,
      totalDuration: '8 hours',
      lastUpdated: '2024-03-20',
      instructor: 'Dr. Sarah Johnson',
      thumbnail: '📊',
      tags: ['Data Science', 'Python', 'Machine Learning'],
      modules: [
        { id: 1, title: 'Introduction to Data Science', lessons: 4, duration: '2 hours' },
        { id: 2, title: 'Python for Data Analysis', lessons: 6, duration: '3 hours' },
        { id: 3, title: 'Machine Learning Basics', lessons: 8, duration: '3 hours' }
      ],
      settings: {
        certificate: true,
        lifetimeAccess: true,
        downloadable: false,
        discussionEnabled: true,
        autoEnrollment: true
      }
    },
    {
      id: 3,
      title: 'Business Strategy & Leadership',
      description: 'Master strategic thinking and leadership skills for modern business environments.',
      category: 'Business',
      status: 'published',
      price: 149.99,
      students: 234,
      rating: 4.9,
      totalLessons: 20,
      totalDuration: '10 hours',
      lastUpdated: '2024-03-22',
      instructor: 'Dr. Sarah Johnson',
      thumbnail: '💼',
      tags: ['Business', 'Leadership', 'Strategy'],
      modules: [
        { id: 1, title: 'Strategic Planning', lessons: 5, duration: '2.5 hours' },
        { id: 2, title: 'Leadership Principles', lessons: 7, duration: '3.5 hours' },
        { id: 3, title: 'Business Case Studies', lessons: 8, duration: '4 hours' }
      ],
      settings: {
        certificate: true,
        lifetimeAccess: true,
        downloadable: true,
        discussionEnabled: true,
        autoEnrollment: false
      }
    }
  ]);

  const categories = ['Mathematics', 'Data Science', 'Business', 'Technology', 'Design', 'Marketing', 'Finance', 'Healthcare'];
  const statuses = ['published', 'draft', 'archived', 'scheduled'];

  const handleCreateCourse = (courseData) => {
    const newCourse = {
      id: courses.length + 1,
      ...courseData,
      students: 0,
      rating: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      instructor: 'Dr. Sarah Johnson',
      modules: [],
      settings: {
        certificate: true,
        lifetimeAccess: true,
        downloadable: false,
        discussionEnabled: true,
        autoEnrollment: false
      }
    };
    setCourses([...courses, newCourse]);
    setShowCreateModal(false);
  };

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(prev => prev.map(course => 
      course.id === updatedCourse.id 
        ? { ...updatedCourse, lastUpdated: new Date().toISOString().split('T')[0] }
        : course
    ));
    setShowEditModal(false);
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(course => course.id !== courseId));
    }
  };

  const handleDuplicateCourse = (course) => {
    const duplicatedCourse = {
      ...course,
      id: courses.length + 1,
      title: `${course.title} (Copy)`,
      status: 'draft',
      students: 0,
      rating: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setCourses([...courses, duplicatedCourse]);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      published: 'bg-green-600',
      draft: 'bg-yellow-600',
      archived: 'bg-gray-600',
      scheduled: 'bg-blue-600'
    };
    return colors[status] || 'bg-gray-600';
  };

  const totalCourses = courses.length;
  const publishedCourses = courses.filter(c => c.status === 'published').length;
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const averageRating = courses.length > 0 ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1) : 0;

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Course Management Hub</h2>
        <p className="text-gray-300">Create, organize, and manage your courses with comprehensive tools for content creation, student enrollment, and course delivery optimization.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Courses</h3>
          <p className="text-3xl font-bold text-blue-400">{totalCourses}</p>
          <p className="text-gray-400 text-sm">{publishedCourses} published</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-green-400">{totalStudents}</p>
          <p className="text-gray-400 text-sm">Enrolled learners</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-yellow-400">{averageRating}/5</p>
          <p className="text-gray-400 text-sm">Student satisfaction</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-400">${courses.reduce((sum, course) => sum + (course.price * course.students), 0).toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Course earnings</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('courses')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'courses' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          My Courses
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'content' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Content Management
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
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'settings' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Settings
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses..."
            className="w-full px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white placeholder-gray-400"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-md bg-white/20 border border-gray-600 text-white"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Course
        </button>
      </div>

      {/* Courses View */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white/10 rounded-lg p-6 hover:bg-white/15 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl mb-2">{course.thumbnail}</div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600">
                    {course.category}
                  </span>
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{course.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs">Students</p>
                  <p className="text-white text-sm font-medium">{course.students}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Rating</p>
                  <p className="text-white text-sm font-medium">{course.rating}/5</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Lessons</p>
                  <p className="text-white text-sm font-medium">{course.totalLessons}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Duration</p>
                  <p className="text-white text-sm font-medium">{course.totalDuration}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Price</p>
                  <p className="text-white text-sm font-medium">${course.price}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Revenue</p>
                  <p className="text-white text-sm font-medium">${(course.price * course.students).toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {course.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  Updated: {course.lastUpdated}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingCourse(course);
                      setShowEditModal(true);
                    }}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowContentModal(true);
                    }}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    Content
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowSettingsModal(true);
                    }}
                    className="text-yellow-400 hover:text-yellow-300 text-sm"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => handleDuplicateCourse(course)}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
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

      {/* Content Management View */}
      {activeTab === 'content' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Content Management</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Content Types</h4>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
                  📹 Upload Video
                </button>
                <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors">
                  📄 Create Document
                </button>
                <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors">
                  📝 Add Assignment
                </button>
                <button className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition-colors">
                  🎯 Create Quiz
                </button>
                <button className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors">
                  💬 Discussion Forum
                </button>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors">
                  📚 Resource Library
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Content Analytics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Videos</span>
                  <span className="text-white">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Documents</span>
                  <span className="text-white">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Assignments</span>
                  <span className="text-white">67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Quizzes</span>
                  <span className="text-white">34</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Discussion Posts</span>
                  <span className="text-white">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Resources</span>
                  <span className="text-white">123</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Recent Activities</h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="text-white">New video uploaded</div>
                  <div className="text-gray-400">Advanced Mathematics - 2 hours ago</div>
                </div>
                <div className="text-sm">
                  <div className="text-white">Assignment created</div>
                  <div className="text-gray-400">Data Science - 1 day ago</div>
                </div>
                <div className="text-sm">
                  <div className="text-white">Quiz published</div>
                  <div className="text-gray-400">Business Strategy - 3 days ago</div>
                </div>
                <div className="text-sm">
                  <div className="text-white">Resource added</div>
                  <div className="text-gray-400">Leadership Course - 1 week ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics View */}
      {activeTab === 'analytics' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Course Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Student Engagement</h4>
              <div className="space-y-3">
                {courses.slice(0, 5).map(course => (
                  <div key={course.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{course.title}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(course.students / 300) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{course.students}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Revenue Analysis</h4>
              <div className="space-y-3">
                {courses.slice(0, 5).map(course => (
                  <div key={course.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{course.title}</span>
                    <span className="text-white text-sm">${(course.price * course.students).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Rating Distribution</h4>
              <div className="space-y-3">
                {courses.slice(0, 5).map(course => (
                  <div key={course.id} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{course.title}</span>
                    <span className="text-white text-sm">{course.rating}/5</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Course Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Average Completion Rate</span>
                  <span className="text-white font-medium">87.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Average Student Rating</span>
                  <span className="text-white font-medium">4.7/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Course Hours</span>
                  <span className="text-white font-medium">30 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Discussions</span>
                  <span className="text-white font-medium">156</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Student Demographics</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">New Students (30 days)</span>
                  <span className="text-white font-medium">+45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Returning Students</span>
                  <span className="text-white font-medium">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Average Study Time</span>
                  <span className="text-white font-medium">2.3 hours/week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Mobile Users</span>
                  <span className="text-white font-medium">34%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings View */}
      {activeTab === 'settings' && (
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Course Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">General Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Auto-enrollment</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Certificate generation</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Lifetime access</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Downloadable content</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Discussion forums</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-4">Notification Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">New student enrollment</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Assignment submissions</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Discussion posts</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Course completion</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">System updates</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Create New Course</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleCreateCourse({
                title: formData.get('title'),
                description: formData.get('description'),
                category: formData.get('category'),
                status: formData.get('status'),
                price: parseFloat(formData.get('price')),
                thumbnail: formData.get('thumbnail'),
                tags: formData.get('tags').split(',').map(s => s.trim())
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Course Title</label>
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">Price ($)</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Thumbnail Emoji</label>
                  <input
                    name="thumbnail"
                    type="text"
                    placeholder="📚"
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
                  <input
                    name="tags"
                    type="text"
                    placeholder="Tag1, Tag2, Tag3"
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  required
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                ></textarea>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Create Course
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

      {/* Edit Course Modal */}
      {showEditModal && editingCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Edit Course</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleUpdateCourse({
                ...editingCourse,
                title: formData.get('title'),
                description: formData.get('description'),
                category: formData.get('category'),
                status: formData.get('status'),
                price: parseFloat(formData.get('price')),
                thumbnail: formData.get('thumbnail'),
                tags: formData.get('tags').split(',').map(s => s.trim())
              });
            }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Course Title</label>
                  <input
                    name="title"
                    type="text"
                    defaultValue={editingCourse.title}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingCourse.category}
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
                    defaultValue={editingCourse.status}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Price ($)</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingCourse.price}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Thumbnail Emoji</label>
                  <input
                    name="thumbnail"
                    type="text"
                    defaultValue={editingCourse.thumbnail}
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
                  <input
                    name="tags"
                    type="text"
                    defaultValue={editingCourse.tags.join(', ')}
                    className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  defaultValue={editingCourse.description}
                  required
                  className="w-full p-3 rounded-md bg-white/20 border border-gray-600 text-white"
                ></textarea>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Update Course
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

      {/* Course Settings Modal */}
      {showSettingsModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Course Settings - {selectedCourse.title}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Certificate Generation</span>
                  <input 
                    type="checkbox" 
                    defaultChecked={selectedCourse.settings.certificate}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Lifetime Access</span>
                  <input 
                    type="checkbox" 
                    defaultChecked={selectedCourse.settings.lifetimeAccess}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Downloadable Content</span>
                  <input 
                    type="checkbox" 
                    defaultChecked={selectedCourse.settings.downloadable}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Discussion Forums</span>
                  <input 
                    type="checkbox" 
                    defaultChecked={selectedCourse.settings.discussionEnabled}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Auto Enrollment</span>
                  <input 
                    type="checkbox" 
                    defaultChecked={selectedCourse.settings.autoEnrollment}
                    className="rounded"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  Save Settings
                </button>
                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Management Modal */}
      {showContentModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Content Management - {selectedCourse.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Course Modules</h4>
                <div className="space-y-3">
                  {selectedCourse.modules.map(module => (
                    <div key={module.id} className="border border-gray-600 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-white font-medium">{module.title}</h5>
                        <span className="text-gray-400 text-sm">{module.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">{module.lessons} lessons</span>
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                          <button className="text-green-400 hover:text-green-300 text-sm">Add Lesson</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    + Add New Module
                  </button>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700">
                    📹 Upload Video
                  </button>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700">
                    📄 Add Document
                  </button>
                  <button className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700">
                    📝 Create Assignment
                  </button>
                  <button className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700">
                    🎯 Add Quiz
                  </button>
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">
                    💬 Discussion Forum
                  </button>
                  <button className="w-full bg-gray-600 text-white py-3 rounded-md hover:bg-gray-700">
                    📚 Resource Library
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Save Changes
              </button>
              <button 
                onClick={() => setShowContentModal(false)}
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