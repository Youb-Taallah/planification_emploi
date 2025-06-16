import TopBar from '../../components/Student/index';
import WelcomeSection from '../../components/Student/WelcomSection';
import OptionCards from '../../components/Student/OptionCards';
import { mockNotifications, optionCards } from '../../data/mockData2';
import { UseAuthStore } from '../../Auth/AuthStore';

function App() {
  const {username } = UseAuthStore();
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black-900 to-primary-900/30">
      <TopBar 
        student={username} 
        notifications={mockNotifications} 
      />
      
      <main className="flex-1 flex flex-col">
        <WelcomeSection student={username} />
        
        <OptionCards 
          options={optionCards} 
        />
      </main>
      
      <footer className="py-4 px-6 text-center">
        <p className="text-xs text-primary-200/60">
          © {new Date().getFullYear()} Student Portal • All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default App