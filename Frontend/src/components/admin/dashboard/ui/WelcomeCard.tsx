import React from 'react';

interface WelcomeCardProps {
  username: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ username }) => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('fr-FR', options);

  const getGreeting = () => {
    const hour = today.getHours();
    if (hour > 5 && hour < 12) return 'Bonjour';
    if (hour > 5 && hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className="bg-black-900/60 text-white rounded-xl p-8 shadow-soft mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="text-primary-200 text-sm font-medium">{formattedDate}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{getGreeting()}, {username}</h1>
          <p className="mt-2 text-primary-100 max-w-xl">
            Bienvenue sur votre tableau de bord de gestion des emplois du temps universitaires. Voici un aperçu de votre système.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
