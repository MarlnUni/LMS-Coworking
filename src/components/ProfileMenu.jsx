import React, { useState, useEffect, useRef } from 'react';

const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export default function ProfileMenu({ user, onLogout, onProfile, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
      });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleProfileClick = () => {
    if (onProfile) {
      onProfile();
    } else {
      // Default profile action - could show a profile modal or navigate
      console.log('Profile clicked');
    }
    setOpen(false);
  };

  const handleThemeToggle = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      // Default theme toggle action
      console.log('Theme toggle clicked');
    }
    setOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-lg border-2 border-blue-300 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <span className="text-xl font-bold text-blue-900">{getInitials(user?.name)}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black/10 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-200 flex items-center gap-3">
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-200 text-blue-900 font-bold text-lg">{getInitials(user?.name)}</span>
            )}
            <div>
              <div className="font-semibold text-blue-900">{user?.name}</div>
              <div className="text-xs text-blue-500 capitalize">{user?.role}</div>
            </div>
          </div>
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-900 flex items-center gap-2 transition-colors"
            onClick={handleThemeToggle}
          >
            <span className="material-icons text-lg">brightness_6</span>
            Light/Dark Mode
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-900 flex items-center gap-2 transition-colors"
            onClick={handleProfileClick}
          >
            <span className="material-icons text-lg">person</span>
            Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-50 text-red-600 flex items-center gap-2 transition-colors"
            onClick={handleLogout}
          >
            <span className="material-icons text-lg">logout</span>
            Log out
          </button>
        </div>
      )}
    </div>
  );
} 