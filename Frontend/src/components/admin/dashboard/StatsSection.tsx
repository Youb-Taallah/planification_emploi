import React, { useEffect, useState } from 'react';
import StatCard from './ui/StatCard';
import { ProfessorService } from '../../../services/ProfessorService';

const StatsSection: React.FC = () => {
  const [professors, setProfessors] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(0);
  const [sections, setSections] = useState<number>(0);
  const [students, setStudents] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const professorsData = await ProfessorService.getAllProfessors();
        const roomsData = await ProfessorService.getAllRooms();
        const sectionsData = await ProfessorService.getAllSections();
        const studentsData = await ProfessorService.getAllStudents();

        setProfessors(professorsData.length);
        setRooms(roomsData.length);
        setSections(sectionsData.length);
        setStudents(studentsData.length);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard type="students" count={students} />
      <StatCard type="professors" count={professors} />
      <StatCard type="sections" count={sections} />
      <StatCard type="rooms" count={rooms} />
    </div>
  );
};

export default StatsSection;
