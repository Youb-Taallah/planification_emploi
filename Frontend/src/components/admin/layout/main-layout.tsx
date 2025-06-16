import { ReactNode, useState } from 'react';
import { cn } from '../../utils';
import { Menu, AlertCircle } from 'lucide-react';
import { Sidebar } from './sidebar';
import { logout } from '../../../Auth/AuthService'; // Import the logout function

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State for logout confirmation
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  // Open logout confirmation
  const openLogoutConfirmation = () => {
    setShowLogoutConfirmation(true);
  };

  // Close confirmation without logging out
  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout(); // Call the logout function from your service
    setShowLogoutConfirmation(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-900/30 to-black-900 overflow-hidden">
      {/* Mobile sidebar backdrop with blur effect */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ease-in-out" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 lg:relative transition-all duration-300 ease-in-out",
        "transform",
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <Sidebar onLogoutClick={openLogoutConfirmation} />
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-y-auto transition-all duration-300 ease-in-out lg:p-10"
      )}>
        {/* Mobile sidebar toggle button */}
        <div className="sticky top-0 z-10 lg:hidden">
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center shadow-sm">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 ease-in-out"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="overflow-y-visible">
          {children}
        </div>
      </main>

      {/* Logout confirmation popup */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-gray-900 to-black-900 border border-white/10 rounded-lg shadow-xl max-w-sm w-full p-6 m-4 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-red-500/20 p-2">
                <AlertCircle size={22} className="text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Confirmation de déconnexion</h3>
            </div>
            
            <p className="text-white/80 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 rounded-md border border-white/10 text-white/80 hover:bg-white/5 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
