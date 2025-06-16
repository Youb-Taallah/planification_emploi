import React from 'react';
import { Seance } from '../../types/entities';
import { TimeSlot } from '../../types/calendar';
import SeanceBlock from './SeanceBlock';
import { SeanceWithTds } from '../../types/tdo';

interface DayRowProps {
  day: string;
  seances: SeanceWithTds[];
  timeSlots: TimeSlot[];
  onSeanceClick?: (seance: Seance) => void;
}

const DayRow: React.FC<DayRowProps> = ({ day, seances, timeSlots }) => {
  
  const dayNames: Record<string, string> = {
    "MONDAY": "Lundi",
    "TUESDAY": "Mardi",
    "WEDNESDAY": "Mercredi",
    "THURSDAY": "Jeudi",
    "FRIDAY": "Vendredi",
    "SATURDAY": "Samedi"
  };

  
  // Helper function to convert time string to minutes
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(part => parseInt(part, 10));
    return hours * 60 + minutes;
  };

  // Helper function to calculate end time in minutes
  const calculateEndTimeMinutes = (startTimeStr: string, durationHours: number): number => {
    const startMinutes = timeToMinutes(startTimeStr);
    return startMinutes + (durationHours * 60);
  };

  // Map time slots to seances or null if empty
  const slotMapping = timeSlots.map((slot, slotIndex) => {
    const slotStartTime = slot.start;
    const slotStartMinutes = timeToMinutes(slotStartTime);
    const slotEndTime = slot.end;
    const slotEndMinutes = timeToMinutes(slotEndTime);
    
    // Find a seance that overlaps with this time slot
    const matchingSeance = seances.filter(seance => {
      const seanceStartTime = seance.seance.temps;
      const seanceStartMinutes = timeToMinutes(seanceStartTime);
      const seanceEndMinutes = calculateEndTimeMinutes(seanceStartTime, seance.seance.duree);
      
      return seanceStartTime === slotStartTime || 
             (seanceStartMinutes < slotStartMinutes && seanceEndMinutes >= slotStartMinutes && (seanceEndMinutes - slotStartMinutes > 30)  && (slotEndMinutes - seanceStartMinutes > 30)) ||
             (seanceStartMinutes >= slotStartMinutes && seanceStartMinutes < slotEndMinutes && (seanceEndMinutes - slotStartMinutes > 30) && (slotEndMinutes - seanceStartMinutes > 30));
    });
    
    return {
      timeSlot: slot,
      seances: matchingSeance || null,
      index: slotIndex
    };
  });
  

  // Calculate colSpan for each seance
  const calculateColSpan = (seance: Seance, startSlotIndex: number): number => {
    if (!seance) return 1;
    
    const seanceStart = new Date(`2000-01-01 ${seance.temps}`);
    const seanceEnd = new Date(seanceStart.getTime() + seance.duree * 60 * 60 * 1000);
    
    let span = 1;
    for (let i = startSlotIndex + 1; i < timeSlots.length; i++) {
      const nextSlotStart = new Date(`2000-01-01 ${timeSlots[i].start}`);
      // Add 30 minutes to nextSlotStart for the comparison
      const nextSlotStartPlus30 = new Date(nextSlotStart.getTime() + 30 * 60 * 1000);
      
      if (seanceEnd >= nextSlotStartPlus30) {
        span++;
      } else {
        break;
      }
    }
    
    return span;
  };

  // Create an array tracking which slots should be rendered based on colSpan
  const slotVisibility = new Array(timeSlots.length).fill(true);
  
  slotMapping.forEach((slot, idx) => {
    if (slot.seances && slot.seances.length > 0) {
      const colSpan = calculateColSpan(slot.seances[0].seance, idx);
      
      // Mark subsequent slots as hidden
      for (let i = 1; i < colSpan && idx + i < timeSlots.length; i++) {
        slotVisibility[idx + i] = false;
      }
    }
  });

  return (
    <div className="grid grid-cols-7 gap-2 mb-2">
      <div className="font-medium text-xs text-gray-700 p-2 bg-gray-100 rounded-md shadow-sm flex items-center justify-center">
        {dayNames[day]}
      </div>
      
      {slotMapping.map((slot, index) => {
        if (!slotVisibility[index]) return null;
        
        const colSpan = slot.seances && slot.seances.length > 0 ? calculateColSpan(slot.seances[0].seance, index) : 1;
        
        return (
          <div 
            key={index} 
            className="min-h-24 bg-white rounded-md shadow-sm overflow-hidden"
            style={{ 
              gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined 
            }}
          >
            {slot.seances && slot.seances.length > 0 ? (
              <div className="h-full">
                <SeanceBlock 
                  seanceWithTds={slot.seances[0]}
                  secondSeanceWithTds={slot.seances[1]}
                  // onClick={onSeanceClick}
                />
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-50 opacity-50"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DayRow;