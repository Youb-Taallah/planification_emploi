import React from 'react';
import { TimeSlot } from '../../types/calendar';

interface TimeSlotHeaderProps {
  timeSlots: TimeSlot[];
}

const TimeSlotHeader: React.FC<TimeSlotHeaderProps> = ({ timeSlots }) => {
  return (
    <div className="grid grid-cols-7 gap-2 mb-2">
      <div className="font-medium text-xs text-gray-700 p-2 bg-gray-100 rounded-md shadow-sm flex items-center justify-center">
        Horaire
      </div>
      {timeSlots.map((slot, index) => (
        <div 
          key={index} 
          className="font-medium text-[10px] text-gray-700 p-2 bg-white rounded-md shadow-sm flex items-center justify-center"
        >
          <span className='whitespace-nowrap'>{slot.start.replace(':', 'h')} - {slot.end.replace(':', 'h')}</span>
        </div>
      ))}
    </div>
  );
};

export default TimeSlotHeader;