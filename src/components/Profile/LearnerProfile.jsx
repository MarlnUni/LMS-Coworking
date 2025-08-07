import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export default function LearnerProfile({ user, onBack }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || 'learner@marln.com',
    phone: user?.phone || '+1 (555) 456-7890',
    headline: 'Enthusiastic Learner & Skill Developer',
    biography: 'Passionate learner committed to continuous growth and skill development. Always eager to explore new technologies and methodologies, with a strong focus on practical application and real-world problem solving.',
    language: 'English, Portuguese, Japanese',
    department: 'Learning',
    position: 'Student',
    coursesEnrolled: 6,
    coursesCompleted: 4,
    certificatesEarned: 3,
    learningHours: 120,
    avatar: user?.avatar || null,
    // Social & Website Links
    website: 'https://learner-portfolio.com',
    facebook: 'learner.user',
    instagram: 'learner.user',
    linkedin: 'in/learner-user-profile',
    tiktok: 'learner.user',
    x: 'learner_user',
    youtube: 'learner.user'
  });

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ').slice(1).join(' ') || '',
      email: user?.email || 'learner@marln.com',
      phone: user?.phone || '+1 (555) 456-7890',
      headline: 'Enthusiastic Learner & Skill Developer',
      biography: 'Passionate learner committed to continuous growth and skill development. Always eager to explore new technologies and methodologies, with a strong focus on practical application and real-world problem solving.',
      language: 'English, Portuguese, Japanese',
      department: 'Learning',
      position: 'Student',
      coursesEnrolled: 6,
      coursesCompleted: 4,
      certificatesEarned: 3,
      learningHours: 120,
      avatar: user?.avatar || null,
      website: 'https://learner-portfolio.com',
      facebook: 'learner.user',
      instagram: 'learner.user',
      linkedin: 'in/learner-user-profile',
      tiktok: 'learner.user',
      x: 'learner_user',
      youtube: 'learner.user'
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getFullName = () => `${profileData.firstName} ${profileData.lastName}`.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-700 to-yellow-400 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-amber-200 transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <span className="material-icons">arrow_back</span>
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-white">Learner Profile</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800 p-8 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center gap-8">
              <div className="relative group">
                {profileData.avatar ? (
                  <img 
                    src={profileData.avatar} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-amber-200 flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <span className="text-4xl font-bold text-amber-900">{getInitials(getFullName())}</span>
                  </div>
                )}
                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-amber-600 rounded-full p-3 cursor-pointer hover:bg-amber-700 transition-colors shadow-lg">
                    <span className="material-icons text-white">edit</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{getFullName()}</h2>
                <p className="text-xl text-amber-100 mb-2">{profileData.headline}</p>
                <p className="text-amber-100">{profileData.position} • {profileData.department}</p>
              </div>
              <div className="flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span className="material-icons">edit</span>
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300"
                    >
                      <span className="material-icons">save</span>
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300"
                    >
                      <span className="material-icons">cancel</span>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Information */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <span className="material-icons text-amber-600 text-3xl">person</span>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <p className="text-gray-900 text-lg">{profileData.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <p className="text-gray-900 text-lg">{profileData.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <p className="text-gray-900 text-lg">{profileData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <p className="text-gray-900 text-lg">{profileData.phone}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.headline}
                          onChange={(e) => setProfileData(prev => ({ ...prev, headline: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <p className="text-gray-900 text-lg">{profileData.headline}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.language}
                          onChange={(e) => setProfileData(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          placeholder="e.g., English, Portuguese, Japanese"
                        />
                      ) : (
                        <p className="text-gray-900 text-lg">{profileData.language}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Biography */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <span className="material-icons text-amber-600 text-3xl">description</span>
                    Biography
                  </h3>
                  {isEditing ? (
                    <textarea
                      value={profileData.biography}
                      onChange={(e) => setProfileData(prev => ({ ...prev, biography: e.target.value }))}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-lg">{profileData.biography}</p>
                  )}
                </div>

                {/* Learner Specific Features */}
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <span className="material-icons text-amber-600 text-3xl">trending_up</span>
                    Learning Progress
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <span className="material-icons text-amber-600 text-4xl mb-3">book</span>
                      <h4 className="font-semibold text-gray-800 text-lg">Enrolled</h4>
                      <p className="text-3xl font-bold text-amber-600">{profileData.coursesEnrolled}</p>
                      <p className="text-sm text-gray-600 mt-2">Courses</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <span className="material-icons text-amber-600 text-4xl mb-3">check_circle</span>
                      <h4 className="font-semibold text-gray-800 text-lg">Completed</h4>
                      <p className="text-3xl font-bold text-amber-600">{profileData.coursesCompleted}</p>
                      <p className="text-sm text-gray-600 mt-2">Courses</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <span className="material-icons text-amber-600 text-4xl mb-3">card_membership</span>
                      <h4 className="font-semibold text-gray-800 text-lg">Certificates</h4>
                      <p className="text-3xl font-bold text-amber-600">{profileData.certificatesEarned}</p>
                      <p className="text-sm text-gray-600 mt-2">Earned</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <span className="material-icons text-amber-600 text-4xl mb-3">schedule</span>
                      <h4 className="font-semibold text-gray-800 text-lg">Hours</h4>
                      <p className="text-3xl font-bold text-amber-600">{profileData.learningHours}</p>
                      <p className="text-sm text-gray-600 mt-2">Learning time</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <span className="material-icons text-gray-600 text-3xl">history</span>
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <span className="material-icons text-green-600 text-2xl">check_circle</span>
                      <div>
                        <p className="font-medium text-gray-800 text-lg">Completed "Advanced JavaScript"</p>
                        <p className="text-sm text-gray-600">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <span className="material-icons text-blue-600 text-2xl">play_circle</span>
                      <div>
                        <p className="font-medium text-gray-800 text-lg">Started "React Fundamentals"</p>
                        <p className="text-sm text-gray-600">1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <span className="material-icons text-purple-600 text-2xl">card_membership</span>
                      <div>
                        <p className="font-medium text-gray-800 text-lg">Earned "Web Development" certificate</p>
                        <p className="text-sm text-gray-600">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Learning Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="material-icons text-amber-600">school</span>
                    Learning Info
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <p className="text-gray-900">{profileData.position}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <p className="text-gray-900">{profileData.department}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <p className="text-gray-900 capitalize">{user?.role}</p>
                    </div>
                  </div>
                </div>

                {/* Social & Website Links */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="material-icons text-amber-600">link</span>
                    Social & Website
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                          placeholder="https://your-website.com"
                        />
                      ) : (
                        <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 text-sm break-all">
                          {profileData.website}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.facebook}
                          onChange={(e) => setProfileData(prev => ({ ...prev, facebook: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                          placeholder="username"
                        />
                      ) : (
                        <a href={`https://facebook.com/${profileData.facebook}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 text-sm">
                          facebook.com/{profileData.facebook}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.instagram}
                          onChange={(e) => setProfileData(prev => ({ ...prev, instagram: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                          placeholder="username"
                        />
                      ) : (
                        <a href={`https://instagram.com/${profileData.instagram}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 text-sm">
                          instagram.com/{profileData.instagram}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                          placeholder="in/username"
                        />
                      ) : (
                        <a href={`https://linkedin.com/${profileData.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 text-sm">
                          linkedin.com/{profileData.linkedin}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.tiktok}
                          onChange={(e) => setProfileData(prev => ({ ...prev, tiktok: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                          placeholder="username"
                        />
                      ) : (
                        <a href={`https://tiktok.com/@${profileData.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 text-sm">
                          tiktok.com/@{profileData.tiktok}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">X (Twitter)</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.x}
                          onChange={(e) => setProfileData(prev => ({ ...prev, x: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                          placeholder="username"
                        />
                      ) : (
                        <a href={`https://x.com/${profileData.x}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 text-sm">
                          x.com/{profileData.x}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.youtube}
                          onChange={(e) => setProfileData(prev => ({ ...prev, youtube: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                          placeholder="username"
                        />
                      ) : (
                        <a href={`https://youtube.com/${profileData.youtube}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 text-sm">
                          youtube.com/{profileData.youtube}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 