import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/public/login';
import { SignupPage } from '../pages/public/signup';
import { UseAuthStore } from '../Auth/AuthStore';
import { useSeanceStore } from '../stores/seanceStore';
import { useTdStore } from '../stores/tdStore';
import SeanceService from '../services/SeanceService';
import TdService from '../services/TdService';
import { useEffect } from 'react';

function PublicRouter() {

  const { setSeances } = useSeanceStore();
  const { setTds } = useTdStore();

  useEffect(() => {

    const fetchData = async () => {
      try{
        const schedule = await SeanceService.getSchedule();
        const tds = await TdService.getAllTDs();
        
      setSeances(schedule);
      setTds(tds);
      
      }catch(error){
        console.error(error);
      }
    }

    fetchData();
    
  }, [setSeances, setTds]);

  const { isAuthenticated, role } = UseAuthStore();

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-arabic">
        <main>
          <Routes>
            <Route path="/" element={ <>Hi</> } />
            <Route path="/login" element={ isAuthenticated && role === "ADMIN" ? <Navigate to="/admin" /> : isAuthenticated && role === "STUDENT" ? <Navigate to="/student" /> : <LoginPage />} />
            <Route path="/signup" element={ isAuthenticated && role === "ADMIN" ? <Navigate to="/admin" /> : isAuthenticated && role === "STUDENT" ? <Navigate to="/student" /> : <SignupPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default PublicRouter;