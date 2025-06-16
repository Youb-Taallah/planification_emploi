import React from 'react';
import { FileDown } from 'lucide-react'; 
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { days, timeSlots } from '../../types/calendar'; 
import TimeSlotHeader from './TimeSlotHeader';
import DayRow from './DayRow';
import { SeanceWithTds } from '../../types/tdo';

interface CalendarProps {
  seances: SeanceWithTds[];
  tittle: string;
}


const Calendar: React.FC<CalendarProps> = ({ seances, tittle}) => {
  
  // Reference for the calendar element to be exported as PDF
  const calendarRef = React.useRef<HTMLDivElement>(null);
  

  // Function to download calendar as PDF
  const downloadCalendarAsPDF = async () => {
    if (!calendarRef.current) return;
    
    // Show loading state (could add a loading spinner here)
    
    try {
      const canvas = await html2canvas(calendarRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      // const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add title
      pdf.setFontSize(16);
      pdf.text(tittle, 105, 15, { align: 'center' });
      
      // Add image
      pdf.addImage(imgData, 'PNG', 0, 25, imgWidth, imgHeight);
      
      // Add date at the bottom
      pdf.setFontSize(10);
      const today = new Date().toLocaleDateString();
      pdf.text(`Generated on ${today}`, 105, 287, { align: 'center' });
      
      // Download the PDF
      pdf.save(`calendar-${today}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Show error message to user
    }
  };

  return (
    <div className="p-4 min-h-screen ">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-black-900/ rounded-xl shadow-md overflow-hidden mb-6 border border-white/10">
          {/* Header Section */}
          <div className="bg-primary-500/20 px-6 py-4 flex justify-between items-center">
            <h1 className="text-white text-xl font-semibold">{tittle}</h1>
            
            {/* Download Button */}
            <button 
              onClick={downloadCalendarAsPDF}
              className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg 
                         hover:bg-white/20 transition-all duration-200 font-medium border border-white/10"
              aria-label="Download as PDF"
            >
              <FileDown size={18} className="text-primary-300" />
              <span>Download PDF</span>
            </button>
          </div>
          
          {/* Calendar Content */}
          <div className="p-6 overflow-x-auto" ref={calendarRef}>
            <div className="backdrop-blur-xl rounded-xl border border-white/10 min-w-[700px] xl:min-w-[850px]  ">
              <TimeSlotHeader timeSlots={timeSlots} />
              
              {days.map((day) => (
                <DayRow 
                  key={day} 
                  day={day}
                  seances={seances.filter(seance => seance.seance.jour === day)} 
                  timeSlots={timeSlots}
                />
              ))}
            </div>
          </div>
        </div>
        
        <footer className="text-center text-sm text-white/60 pb-6">
          <p>Calendar last updated on {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Calendar;