  import React, { useState } from 'react';
  import SelectionCard from '../../components/admin/Emploi/SelectionCard';
  import SelectModal from '../../components/admin/Emploi/SelectModal';
  import  ProfessorService  from '../../services/ProfessorService';
  import { TdService } from '../../services/TdService';
  import { useEffect } from 'react';
  import { Professeur, TD } from '../../types/entities';
  import { Images } from '../../assets/images';


  const SelectionPage: React.FC = () => {
    const [isProfessorModalOpen, setIsProfessorModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [professors, setProfessors] = useState<Professeur[]>([]);
    const [tds, setTDs] = useState<TD[]>([]);

    useEffect(() => {
      const fetchProfessors = async () => {
        const profs = await ProfessorService.getAllProfessors();
        setProfessors(profs);
      };
      fetchProfessors();
      const fetchTDs = async () => {
        const tds = await TdService.getAllTDs();
        setTDs(tds);
      };
      fetchTDs();
    }, []);

    return (
      <div className="min-h-screen w-full  flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Consulter <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-200">Les emplois</span>
            </h1>
            <p className="text-primary-200 text-xl font-light">
              Veuillez sélectionner l'un des deux choix ci-dessous
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <div className="transform hover:-translate-y-2 transition-all duration-300">
              <SelectionCard
                type="professor"
                image={Images.ProfessorImage}
                hoverText="Accédez au emplois du temps des professeurs"
                onClick={() => setIsProfessorModalOpen(true)}
              />
            </div>
            
            <div className="transform hover:-translate-y-2 transition-all duration-300">
              <SelectionCard
                type="student"
                image={Images.StudentImage}
                hoverText="Accédez au emplois du temps des étudiants"
                onClick={() => setIsStudentModalOpen(true)}
              />
            </div>
          </div>
        </div>

        <SelectModal
          isOpen={isProfessorModalOpen}
          onClose={() => setIsProfessorModalOpen(false)}
          title="Sélection du Professeur"
          professeurs={professors}
          type="professor"
        />

        <SelectModal
          isOpen={isStudentModalOpen}
          onClose={() => setIsStudentModalOpen(false)}
          title="Sélection de la Classe"
          classes={tds}
          type="student"
        />
      </div>
    );
  };

  export default SelectionPage;