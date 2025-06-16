
export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
  }
  
  export interface Student {
    id: string;
    name: string;
    avatar?: string;
  }
  
  export interface OptionCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    link?: string;
  }



// Current user data
export const currentStudent: Student = {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  };
  
  // Mock notifications
  export const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Nouveau planning disponible',
      message: 'Le planning du semestre à venir a été publié.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // il y a 30 minutes
      read: false
    }
  ];
  
  // Cartes d’options
  export const optionCards: OptionCard[] = [
    {
      id: 'schedule',
      title: 'Aperçu du planning',
      description: 'Consultez votre emploi du temps actuel et les événements à venir',
      icon: 'calendar',
      link: '/student/emploi'
    },
    {
      id: 'reclamation',
      title: 'Réclamation',
      description: 'Soumettez des demandes ou des plaintes concernant vos cours',
      icon: 'file-edit',
      link: '/student/reclamation'
    }
  ];
  