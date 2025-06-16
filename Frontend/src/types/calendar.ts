export interface TimeSlot {
    start: string;
    end: string;
  }
  
  export const timeSlots: TimeSlot[] = [
    { start: "08:30", end: "10:00" },
    { start: "10:15", end: "11:45" },
    { start: "12:00", end: "13:00" },
    { start: "13:00", end: "14:30" },
    { start: "14:45", end: "16:15" },
    { start: "16:30", end: "18:00" },
  ];
  
  export const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
  ];
  
  export const getTypeColor = (type: string): string => {
    switch (type) {
      case "CR":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "TD":
        return "bg-green-100 border-green-300 text-green-800";
      case "TP":
        return "bg-purple-100 border-purple-300 text-purple-800";
      case "C.I":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "CR/TD":
        return "bg-orange-100 border-orange-300 text-orange-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };
  
  export const formatTime = (time: string): string => {
    return time.replace('_', '-');
  };