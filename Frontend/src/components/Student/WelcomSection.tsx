import React from 'react';



interface WelcomeSectionProps {
  student: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ 
  student, 
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className=" py-12 md:py-16 px-6 overflow-hidden animate-fade-in">
      


      
      {/* Content */}
      <div className=" max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-3 animate-slide-in">
          {getGreeting()}, <span className="text-primary-400">{student}</span>
        </h2>
        <p className="text-lg text-primary-200/80 max-w-2xl mx-auto animate-slide-in" style={{ animationDelay: '0.1s' }}>
          Bienvenue sur votre tableau de bord étudiant. Ici, vous pouvez accéder à votre emploi du temps, 
          soumettre des réclamations et suivre votre parcours académique.
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;