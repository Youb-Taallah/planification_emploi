import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Emploi from '../pages/student/Emploi';
import Dashboard from '../pages/student/Dashboard';
import Reclamation from '../pages/student/Reclamation';
import SeanceService from '../services/SeanceService';
import { useSeanceStore } from '../stores/seanceStore';
import { useTdStore } from '../stores/tdStore';
import TdService from '../services/TdService';


const StudentRouter: React.FC = () => {

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

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-arabic">
        <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reclamation" element={<Reclamation />} />
              <Route path="/emploi" element={<Emploi />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </main>
      </div>
    </>
  );
};

export default StudentRouter;