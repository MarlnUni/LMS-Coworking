import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const adminMenu = [
  { label: 'My Learning', path: '/admin/my-learning' },
  { label: 'Enroll Users', path: '/admin/enroll-users' },
  { label: 'Manage Users', path: '/admin/manage-users' },
  { label: 'Program Management', path: '/admin/program-management' },
  { label: 'Grade Setup', path: '/admin/grade-setup' },
  { label: 'Reports & Analysis', path: '/admin/reports-analysis' },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(true);

  if (collapsed) {
    return (
      <button
        className="fixed top-1/2 left-0 z-50 transform -translate-y-1/2 bg-red-900 dark:bg-gray-800 text-white p-2 rounded-r-xl shadow-lg hover:bg-red-800 dark:hover:bg-gray-700 focus:outline-none"
        onClick={() => setCollapsed(false)}
        aria-label="Expand sidebar"
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  return (
    <aside
      className="fixed left-0 top-1/2 z-50 transform -translate-y-1/2 w-44 bg-red-900 dark:bg-gray-800 text-white shadow-2xl rounded-2xl flex flex-col border border-red-800 dark:border-gray-700"
      style={{ minHeight: '0', maxHeight: '90vh' }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-red-800 dark:border-gray-700">
        <span className="font-bold text-base">Admin</span>
        <button
          className="ml-2 p-1 rounded hover:bg-red-800 dark:hover:bg-gray-700 focus:outline-none"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 mt-2">
        <ul className="space-y-1 px-1">
          {adminMenu.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `w-full block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? 'bg-red-700 dark:bg-gray-700' : 'hover:bg-red-800 dark:hover:bg-gray-700'}`
                }
                title={item.label}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 