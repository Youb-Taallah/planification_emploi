import React from 'react';
import { Seance } from '../../types/entities';
import { getTypeColor } from '../../types/calendar';
import { SeanceWithTds } from '../../types/tdo';

interface SeanceBlockProps {
  seanceWithTds: SeanceWithTds;
  secondSeanceWithTds: SeanceWithTds;
  onClick?: (seance: Seance) => void;
}

const SeanceBlock: React.FC<SeanceBlockProps> = ({ seanceWithTds, secondSeanceWithTds, onClick }) => {

  const seance = seanceWithTds.seance;
  

  const typeColorClasses = getTypeColor(seance.type.split('-')[0]);
  
  // Calculate end time
  const calculateEndTime = (startTime: string, durationHours: number): string => {
    // Parse the start time (format: "HHhMM")
    const [hours, minutes] = startTime.split(':').map(part => parseInt(part || '0', 10));
    
    // Create a date object for manipulation
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    // Add duration (in hours)
    const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);
    
    // Format the end time back to "HHhMM" format
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
    
    return `${endHours}:${endMinutes === '00' ? '00' : endMinutes}`;
  };
  
  const endTime = calculateEndTime(seance.temps, seance.duree);

  const time = seance.temps +" - "+ endTime
  
  return (
    <div 
      className={`p-2 rounded-md border ${typeColorClasses} h-full cursor-pointer text-[9px]`}
      onClick={() => onClick && onClick(seance)}
    >
      <div className="flex flex-col h-full">
        {seance.temps && !["08:30 - 10:00", "10:15 - 11:45", "12:00 - 13:00", "13:00 - 14:30", "14:45 - 16:15", "16:30 - 18:00"].includes(time) && (
          <div className="font-medium mb-0.5 text-red-700">
            {time}
          </div>
        )}

        {
          seanceWithTds.seance.section && (
            <div className="font-medium mb-0.5 text-gray-700">
              {seanceWithTds.seance.section.id}
            </div>
          )
        }

        {
          seanceWithTds.tds && seanceWithTds.tds.length > 0 && (
            <div className="font-medium mb-0.5 text-gray-700">
              {seanceWithTds.tds.map(td => td.td.id).join(', ')}
            </div>
          )
        }

        {
          seanceWithTds.tps && seanceWithTds.tps.length > 0 && (
            <div className="font-medium mb-0.5 text-gray-700">
              {seanceWithTds.tps.map(tp => tp.tp.id).join(', ')}
            </div>
          )
        }

        <div className='flex-1'></div>
        
        <div className="font-bold">
          {seance.matiere.nom}
        </div>
        
        <div className="mb-0.5 font-medium">
          {seance.professeur.nom}
        </div>

        <div className='flex-1'></div>
        
        <div className="flex items-center justify-between mt-auto gap-1">
          <span className="bg-white/50 px-1 py-0.5 rounded text-[8px]">
            {seance.type}
          </span>

          {seance.nature === "1/15" && <span className="bg-white/50 px-1 py-0.5 rounded text-[8px]">
            {seance.nature}
          </span>}
          
          <span className="px-1 py-0.5 rounded border border-current opacity-75 text-[8px]">
            {seance.salle.id}
          </span>
        </div>

        <div className='flex-1 min-h-2'></div>

        {secondSeanceWithTds && (
          <>
            {seance.temps && !["08:30 - 10:00", "10:15 - 11:45", "12:00 - 13:00", "13:00 - 14:30", "14:45 - 16:15", "16:30 - 18:00"].includes(time) && (
            <div className="font-medium mb-0.5 text-red-700">
              {time}
            </div>
          )}

          {
            secondSeanceWithTds.seance.section && (
                <div className="font-medium mb-0.5 text-gray-700">
                  {secondSeanceWithTds.seance.section.id}
                </div>
              )
            }

          {
            secondSeanceWithTds.tds && secondSeanceWithTds.tds.length > 0 && (
              <div className="font-medium mb-0.5 text-gray-700">
                {secondSeanceWithTds.tds.map(td => td.td.id).join(', ')}
              </div>
            )
          }

          {
            secondSeanceWithTds.tps && secondSeanceWithTds.tps.length > 0 && (
              <div className="font-medium mb-0.5 text-gray-700">
                {secondSeanceWithTds.tps.map(tp => tp.tp.id).join(', ')}
              </div>
            )
          }
          
          <div className="font-bold">
            {seance.matiere.nom}
          </div>
          
          <div className="mb-0.5 font-medium">
            {seance.professeur.nom}
          </div>

          <div className='flex-1'></div>
          
          <div className="flex items-center justify-between mt-auto gap-1 text-[8px]">
            <span className="bg-white/50 px-1 py-0.5 rounded">
              {seance.type}
            </span>
  
            {seance.nature === "1/15" && <span className="bg-white/50 px-1 py-0.5 rounded text-[8px]">
              {seance.nature}
            </span>}
            
            <span className="px-1 py-0.5 rounded border border-current opacity-75 text-[8px]">
              {seance.salle.id}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeanceBlock;