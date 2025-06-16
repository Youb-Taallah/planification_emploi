import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/admin/layout/main-layout';
// import { BlankPage } from '../pages/public/BlankPage';
import Dashboard from '../pages/admin/Dashboard';
import SelectionPage from '../pages/admin/SelectionPage';
import CalendarPage from '../pages/admin/CalendarPage';
import Enseignants from '../pages/admin/Enseignants';
import Historique from '../pages/admin/Historique';
import { useEffect } from 'react';
import SeanceService from "../services/SeanceService";
import { useSeanceStore } from '../stores/seanceStore';
import { useTdStore } from '../stores/tdStore';
import TdService from '../services/TdService';

function AdminRouter() {

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
      <div className="min-h-screen bg-gray-50">
        <main>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/emploi-du-temps" element={<SelectionPage />} />
              <Route path="/emploi-du-temps/professeur/:id" element={<CalendarPage />} />
              <Route path="/emploi-du-temps/classe/:id" element={<CalendarPage />} />
              <Route path="/professeurs" element={<Enseignants />} />
              <Route path="/historique/:id" element={<Historique/>} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </MainLayout>
        </main>
      </div>
    </>
  );
}

export default AdminRouter;