import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_PERMISSIONS } from '@/types';
import {
  LayoutDashboard,
  Users,
  Shield,
  LogOut,
  Briefcase,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const perms = ROLE_PERMISSIONS[user.role];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, visible: perms.canViewDashboard },
    { to: '/candidates', label: 'Candidates', icon: Users, visible: perms.canViewCandidates },
    { to: '/role-management', label: 'Roles', icon: Shield, visible: perms.canManageRoles },
  ];

  const roleBadgeColors: Record<string, string> = {
    admin: 'bg-primary/20 text-primary',
    ta_member: 'bg-info/20 text-info',
    panelist: 'bg-warning/20 text-warning',
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-gradient border-r border-sidebar-border flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Interview Hub</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Main navigation">
          {navItems.filter((n) => n.visible).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-white'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <img src={user.image} alt="" className="w-9 h-9 rounded-full bg-sidebar-accent" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.firstName} {user.lastName}</p>
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${roleBadgeColors[user.role] || ''}`}>
                {user.role.replace('_', ' ')}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-slate-400 hover:text-white" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-card">
          <button className="lg:hidden p-2 rounded-md hover:bg-muted" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="hidden lg:block" />
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
