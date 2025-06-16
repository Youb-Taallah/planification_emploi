import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Calendar from '../../components/Calendar/Calendar';
import { useSeanceStore } from '../../stores/seanceStore';
import { SeanceWithTds } from '../../types/tdo';
import TdService from '../../services/TdService';
import { TD } from '../../types/entities';

const SchedulePreviewPage: React.FC = () => {
  // Get access to seances
  const seances = useSeanceStore(state => state.seances); 
  const getSeancesByTD = useSeanceStore(state => state.getSeancesByTD);

  const [filteredSeances, setFilteredSeances] = useState<SeanceWithTds[]>([]);
  const [displayName, setDisplayName] = useState<string>("");
  const [selectedTD, setSelectedTD] = useState<string>("");
  
  // Extract unique TD options from all seances
  const [tdOptions, setTdOptions] = useState<TD[]>([]);
  
  useEffect(() => {
    const fetchTds = async () => {
      try {
        const tds = await getAllTds();
        setTdOptions(tds);        
      } catch (error) {
        console.error("Error fetching TDs:", error);
      }
    };
  
    fetchTds();
  }, []);
  
  useEffect(() => {
    if (selectedTD) {
      const tdSeances = getSeancesByTD(selectedTD);
      setFilteredSeances(tdSeances);
  
      // Find TD name for display
      const selectedTdObject = tdOptions.find(td => td.id === selectedTD);
      if (selectedTdObject) {
        setDisplayName(selectedTdObject.id);
      } else {
        setDisplayName(selectedTD);
      }
    } else {
      setFilteredSeances([]);
      setDisplayName("");
    }
  }, [selectedTD, getSeancesByTD, seances, tdOptions]);
  
  const getAllTds = async () => {
    return await TdService.getAllTDs();
  };
  
  const handleTDChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTD(e.target.value);
    const sea = getSeancesByTD(e.target.value);
    setFilteredSeances(sea);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-900 to-primary-900/30 py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <button 
            className="flex items-center text-primary-400 hover:text-primary-300 transition-colors mb-6"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="text-3xl font-bold text-primary-100 mb-3">Class Schedule Preview</h1>
          <p className="text-primary-200/80">
            Select a class to view its detailed schedule and timetable.
          </p>
        </div>

        {/* TD Selection Dropdown */}
        <div className="mb-6">
          <select
            id="td-select"
            className="w-full md:w-1/3 bg-black-800 border border-primary-700 rounded-lg p-3 text-primary-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={selectedTD}
            onChange={handleTDChange}
          >
            {tdOptions.map(tdObject => (
              <option key={tdObject.id} value={tdObject.id}>
                {`${tdObject.id}`}
              </option>
            ))}
          </select>
        </div>

        {/* Calendar with filtered seances */}
        <Calendar 
          seances={filteredSeances} 
          tittle={displayName ? `Schedule for ${displayName}` : 'Select a TD to view schedule'} 
        />
      </div>
    </div>
  );
};

export default SchedulePreviewPage;